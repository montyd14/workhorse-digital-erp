import "server-only";
import nodemailer from "nodemailer";

/**
 * SMTP transport configured entirely from env vars. If SMTP is not configured
 * the send is skipped and logged, so a missing mail server never blocks a lead.
 * Hostinger blocks port 25; use 465 (secure) or 587 (STARTTLS).
 */
function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendMail(input: { subject: string; text: string; html?: string; replyTo?: string }) {
  const transport = getTransport();
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  if (!transport || !to || !from) {
    console.warn("[mail] SMTP not configured; skipping email:", input.subject);
    return { sent: false as const };
  }
  await transport.sendMail({ from, to, ...input });
  return { sent: true as const };
}
