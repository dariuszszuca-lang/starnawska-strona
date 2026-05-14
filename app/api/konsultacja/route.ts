import { NextResponse } from "next/server";
import { z } from "zod";

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

  // TODO: Po dorzuceniu RESEND_API_KEY do env w Vercelu. Odkomentować
  // i wysłać e-mail do biura. Na razie tylko logujemy w serverless logs.
  //
  // const resendKey = process.env.RESEND_API_KEY;
  // const toEmail = process.env.CONSULTATION_TO_EMAIL || "biuro@starnawska.pl";
  // if (resendKey) {
  //   await fetch("https://api.resend.com/emails", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${resendKey}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       from: "Strona Starnawska <strona@starnawska.pl>",
  //       to: toEmail,
  //       reply_to: data.email || undefined,
  //       subject: `Konsultacja: ${intentLabels[data.intent]} . ${data.name}`,
  //       html: renderEmailHtml(data),
  //     }),
  //   });
  // }

  console.log("[konsultacja] received", {
    intent: intentLabels[data.intent],
    name: data.name,
    phone: data.phone,
    email: data.email || "-",
    agentka: data.agentka || "-",
    msgPreview: data.message?.slice(0, 80) || "-",
  });

  return NextResponse.json({ ok: true });
}
