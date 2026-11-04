import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { assignLead, convertLead, updateLeadStatus } from "@/app/(app)/actions";
import { ActivityFeed } from "@/components/app/activity-feed";
import { Badge, Button, Description, Field, Loading, Notice, PageHeader, Panel, input } from "@/components/app/ui";
import { db } from "@/lib/db";
import { date, dateTime } from "@/lib/format";
import { requireRole } from "@/lib/guard";
import { LEAD_STATUSES, leadStatus, needLabel } from "@/lib/status";

export const metadata: Metadata = { title: "Lead" };

export default function Page(props: PageProps<"/crm/leads/[id]">) {
  return (
    <Suspense fallback={<Loading />}>
      <Content {...props} />
    </Suspense>
  );
}

async function Content({ params, searchParams }: PageProps<"/crm/leads/[id]">) {
  await requireRole(["SALES"]);
  const { id } = await params;
  const sp = await searchParams;
  const [lead, users] = await Promise.all([
    db.lead.findUnique({
      where: { id },
      include: {
        assignedTo: { select: { id: true, name: true } },
        client: { select: { id: true, name: true } },
        activities: { orderBy: { createdAt: "desc" }, include: { user: { select: { name: true } } } },
      },
    }),
    db.user.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!lead) notFound();
  const needs = Array.isArray(lead.needs) ? (lead.needs as string[]) : [];
  const status = leadStatus(lead.status);
  const returnTo = `/crm/leads/${lead.id}`;

  return (
    <>
      <PageHeader
        title={lead.businessName}
        blurb={`${lead.name} · ${lead.industry} · received ${dateTime(lead.createdAt)}`}
        actions={
          <>
            <Button href="/crm" variant="ghost">
              Back to leads
            </Button>
            {lead.client ? (
              <Button href={`/crm/clients/${lead.client.id}`} variant="secondary">
                Open client
              </Button>
            ) : (
              <form action={convertLead}>
                <input type="hidden" name="leadId" value={lead.id} />
                <Button>Convert to client</Button>
              </form>
            )}
          </>
        }
      />
      <Notice error={sp.error as string | undefined} ok={sp.ok as string | undefined} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Panel title="Contact">
            <Description
              items={[
                { k: "Contact", v: lead.name },
                { k: "Business", v: lead.businessName },
                { k: "Phone", v: <a href={`tel:${lead.phone}`} className="text-rust underline">{lead.phone}</a> },
                { k: "Email", v: lead.email ? <a href={`mailto:${lead.email}`} className="text-rust underline">{lead.email}</a> : "" },
                { k: "Industry", v: lead.industry },
                { k: "Needs", v: needs.length ? needs.map(needLabel).join(", ") : "" },
                { k: "Website", v: lead.websiteUrl ? <a href={lead.websiteUrl} className="text-rust underline" target="_blank" rel="noopener">{lead.websiteUrl}</a> : "" },
                { k: "Message", v: lead.message },
              ]}
            />
          </Panel>

          <ActivityFeed entity="lead" entityId={lead.id} activities={lead.activities} returnTo={returnTo} />
        </div>

        <div className="space-y-6">
          <Panel title="Pipeline">
            <div className="mb-4">
              <Badge label={status.label} tone={status.tone} />
            </div>
            <form action={updateLeadStatus} className="flex items-end gap-2">
              <input type="hidden" name="leadId" value={lead.id} />
              <Field name="status" title="Status" className="flex-1">
                <select id="status" name="status" defaultValue={lead.status} className={input}>
                  {LEAD_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Button small>Update</Button>
            </form>
            <form action={assignLead} className="mt-4 flex items-end gap-2">
              <input type="hidden" name="leadId" value={lead.id} />
              <Field name="userId" title="Assigned to" className="flex-1">
                <select id="userId" name="userId" defaultValue={lead.assignedToId ?? ""} className={input}>
                  <option value="">Unassigned</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Button small variant="ghost">
                Assign
              </Button>
            </form>
          </Panel>

          <Panel title="Where this lead came from">
            <Description
              items={[
                { k: "Source page", v: lead.sourcePage },
                { k: "Referrer", v: lead.referrer },
                { k: "UTM source / medium", v: [lead.utmSource, lead.utmMedium].filter(Boolean).join(" / ") },
                { k: "UTM campaign", v: lead.utmCampaign },
                { k: "Received", v: date(lead.createdAt) },
                { k: "Lead ID", v: <code className="text-xs">{lead.id}</code> },
              ]}
            />
          </Panel>

          <p className="text-xs text-ink-muted">
            Converting creates a client record and one project per requested tool. See{" "}
            <Link href="/crm/clients" className="underline">
              Clients
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
