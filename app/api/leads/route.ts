import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { leadSchema } from "@/lib/lead-schema";
import { rateLimit } from "@/lib/rate-limit";
import { sendMail } from "@/lib/mail";
import { site } from "@/lib/site";

/** Short-form submissions omit email and industry; fill sensible placeholders. */
const incomingSchema = leadSchema.extend({
  email: z.email().optional(),
  industry: z.string().trim().max(80).optional(),
  short: z.boolean().optional(),
});

function clientIp(req: NextRequest) {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const { allowed } = rateLimit(`leads:${ip}`);
  if (!allowed) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = incomingSchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: issue?.message ?? "Please check the form", field: issue?.path?.[0] },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Honeypot: pretend success so bots stop retrying, but store nothing.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  if (!data.short && !data.email) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email", field: "email" }, { status: 400 });
  }

  const ipHash = createHash("sha256").update(`${ip}:${process.env.AUTH_SECRET ?? "salt"}`).digest("hex").slice(0, 32);

  const lead = await db.lead.create({
    data: {
      name: data.name,
      businessName: data.businessName,
      phone: data.phone,
      email: data.email ?? "",
      industry: data.industry ?? "unknown",
      needs: data.needs,
      websiteUrl: data.websiteUrl,
      message: data.message,
      sourcePage: data.sourcePage,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      utmTerm: data.utmTerm,
      utmContent: data.utmContent,
      referrer: data.referrer,
      ipHash,
    },
    select: { id: true },
  });

  const lines = [
    `Name: ${data.name}`,
    `Business: ${data.businessName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email ?? "(not provided)"}`,
    `Industry: ${data.industry ?? "(not provided)"}`,
    `Needs: ${data.needs.length ? data.needs.join(", ") : "(none selected)"}`,
    `Website: ${data.websiteUrl ?? "-"}`,
    `Message: ${data.message ?? "-"}`,
    "",
    `Source page: ${data.sourcePage ?? "-"}`,
    `UTM: ${[data.utmSource, data.utmMedium, data.utmCampaign].filter(Boolean).join(" / ") || "-"}`,
    `Referrer: ${data.referrer ?? "-"}`,
    `Lead ID: ${lead.id}`,
  ];

  // Email failures must never fail the lead.
  try {
    await sendMail({
      subject: `New lead: ${data.businessName} (${data.industry ?? "short form"})`,
      text: lines.join("\n"),
      replyTo: data.email,
    });
  } catch (err) {
    console.error("[leads] email failed", err);
  }

  return NextResponse.json({ ok: true, id: lead.id, site: site.name });
}
