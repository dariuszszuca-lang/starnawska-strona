import nodemailer from "nodemailer";

/**
 * Wysyłka e-maili przez SMTP (IQ.pl / własny hosting starnawska.pl).
 *
 * Wymagane env:
 *   SMTP_HOST   np. mail.starnawska.pl
 *   SMTP_PORT   465 (SSL) lub 587 (STARTTLS)
 *   SMTP_USER   pełny adres e-mail (np. kontakt@starnawska.pl)
 *   SMTP_PASS   hasło do skrzynki
 *   SMTP_FROM   (opcj.) nadawca w nagłówku From, default = SMTP_USER
 */

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const portStr = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !portStr || !user || !pass) {
    throw new Error("SMTP env nieskonfigurowany (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)");
  }

  const port = Number(portStr);
  const secure = port === 465; // 465 = SSL, 587 = STARTTLS

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  return cachedTransporter;
}

export type SendOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, html, text, replyTo }: SendOptions): Promise<void> {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
    text: text || stripHtml(html),
    replyTo,
  });
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
