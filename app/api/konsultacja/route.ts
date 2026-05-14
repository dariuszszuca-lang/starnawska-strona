import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email/send";
import { getMemberBySlug } from "@/lib/team";

const schema = z.object({
  intent: z.enum(["sprzedaj", "kup", "wynajmij", "szukam-najmu", "inne"]),
  name: z.string().min(2).max(80),
  phone: z.string().min(9).max(20),
  email: z.string().email().or(z.literal("")).optional(),
  message: z.string().max(2000).optional(),
  agentka: z.string().optional(),
  rodo: z.literal(true),
});

const intentLabels: Record<string, string> = {
  sprzedaj: "Chcę sprzedać",
  kup: "Szukam do kupna",
  wynajmij: "Chcę wynająć (właściciel)",
  "szukam-najmu": "Szukam wynajmu",
  inne: "Inna sprawa",
};

const FALLBACK_TO = process.env.CONSULTATION_TO_EMAIL || "biuro@starnawska.pl";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Wybór adresatów:
  // - jeśli klient wybrał agentkę → maila do niej (+ kopia na biuro)
  // - inaczej → tylko biuro/fallback
  const recipients: string[] = [];
  let agentName: string | undefined;
  if (data.agentka) {
    const m = getMemberBySlug(data.agentka);
    if (m?.email) {
      recipients.push(m.email);
      agentName = m.fullName;
    }
  }
  if (recipients.length === 0) {
    recipients.push(FALLBACK_TO);
  } else if (!recipients.includes(FALLBACK_TO)) {
    recipients.push(FALLBACK_TO);
  }

  const subject = `Konsultacja: ${intentLabels[data.intent]} — ${data.name}`.replace(/—/g, "·");
  const html = renderHtml(data, intentLabels[data.intent], agentName);

  try {
    await sendEmail({
      to: recipients,
      subject,
      html,
      replyTo: data.email || undefined,
    });
  } catch (e) {
    // Loguj ale nie wywalaj formularza klientowi — zapisz w logach, potem ręcznie obsłużymy
    console.error("[konsultacja] sendmail failed", e);
    return NextResponse.json(
      {
        ok: false,
        error: "send_failed",
        details: e instanceof Error ? e.message : "unknown",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

function renderHtml(
  data: z.infer<typeof schema>,
  intentLabel: string,
  agentName: string | undefined
): string {
  const safe = (s: string | undefined) => (s || "").replace(/[<>&]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"
  );
  const message = safe(data.message).replace(/\n/g, "<br>");
  const target = agentName ? `Bezpośrednio do: <strong>${safe(agentName)}</strong>` : "";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f8f7f3;margin:0;padding:24px;color:#1a1a1a;">
  <table style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8e4dc;">
    <tr><td style="padding:24px 28px;background:#1a2e14;color:#fff;">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#a3c733;text-transform:uppercase;font-weight:700;">Nowe zgłoszenie ze strony</p>
      <h1 style="margin:0;font-size:20px;font-weight:700;letter-spacing:-0.3px;">${safe(intentLabel)}</h1>
      ${target ? `<p style="margin:8px 0 0;font-size:13px;color:#c8d3a8;">${target}</p>` : ""}
    </td></tr>
    <tr><td style="padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Imię i nazwisko</td></tr>
        <tr><td style="padding:0 0 14px;font-size:16px;font-weight:600;">${safe(data.name)}</td></tr>

        <tr><td style="padding:8px 0;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;border-top:1px solid #f0ece5;">Telefon</td></tr>
        <tr><td style="padding:0 0 14px;font-size:16px;font-weight:600;"><a href="tel:${safe(data.phone)}" style="color:#1a2e14;text-decoration:none;">${safe(data.phone)}</a></td></tr>

        ${data.email ? `
        <tr><td style="padding:8px 0;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;border-top:1px solid #f0ece5;">E-mail</td></tr>
        <tr><td style="padding:0 0 14px;font-size:16px;"><a href="mailto:${safe(data.email)}" style="color:#1a2e14;">${safe(data.email)}</a></td></tr>
        ` : ""}

        ${data.message ? `
        <tr><td style="padding:8px 0;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;border-top:1px solid #f0ece5;">Wiadomość</td></tr>
        <tr><td style="padding:0 0 14px;font-size:15px;line-height:1.55;">${message}</td></tr>
        ` : ""}
      </table>
    </td></tr>
    <tr><td style="padding:18px 28px;background:#f8f7f3;border-top:1px solid #e8e4dc;font-size:12px;color:#888;">
      Aby odpowiedzieć, użyj przycisku "Odpowiedz" (idzie wprost do klienta).
    </td></tr>
  </table>
</body></html>`;
}
