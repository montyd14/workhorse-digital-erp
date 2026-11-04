import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { createInvoice, createProject, updateClient } from "@/app/(app)/actions";
import { ActivityFeed } from "@/components/app/activity-feed";
import { Badge, Button, Field, Loading, Notice, PageHeader, Panel, Table, input, td } from "@/components/app/ui";
import { industries } from "@/content/industries";
import { db } from "@/lib/db";
import { date, money } from "@/lib/format";
import { can, requireRole } from "@/lib/guard";
import { INVOICE_KINDS, INVOICE_STATUSES, PROJECT_TYPES, invoiceStatus, projectStatus, projectTypeLabel } from "@/lib/status";

export const metadata: Metadata = { title: "Client" };

export default function Page(props: PageProps<"/crm/clients/[id]">) {
  return (
    <Suspense fallback={<Loading />}>
      <Content {...props} />
    </Suspense>
  );
}

async function Content({ params, searchParams }: PageProps<"/crm/clients/[id]">) {
  const user = await requireRole(["SALES", "OPS"]);
  const { id } = await params;
  const sp = await searchParams;
  const [client, users] = await Promise.all([
    db.client.findUnique({
      where: { id },
      include: {
        lead: { select: { id: true } },
        projects: { orderBy: { createdAt: "desc" }, include: { owner: { select: { name: true } } } },
        invoices: { orderBy: { createdAt: "desc" } },
        activities: { orderBy: { createdAt: "desc" }, include: { user: { select: { name: true } } } },
      },
    }),
    db.user.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!client) notFound();
  const returnTo = `/crm/clients/${client.id}`;
  const outstanding = client.invoices.filter((i) => i.status === "sent").reduce((s, i) => s + i.amountCents, 0);

  return (
    <>
      <PageHeader
        title={client.name}
        blurb={[client.industry, client.contactName].filter(Boolean).join(" · ")}
        actions={
          <>
            <Button href="/crm/clients" variant="ghost">
              All clients
            </Button>
            {client.lead && (
              <Button href={`/crm/leads/${client.lead.id}`} variant="ghost">
                Original lead
              </Button>
            )}
          </>
        }
      />
      <Notice error={sp.error as string | undefined} ok={sp.ok as string | undefined} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Panel title="Projects" actions={<span className="text-xs text-ink-muted">{client.projects.length} total</span>}>
            <Table head={["Project", "Type", "Status", "Owner", "Preview"]} empty={client.projects.length === 0}>
              {client.projects.map((p) => {
                const s = projectStatus(p.status);
                return (
                  <tr key={p.id}>
                    <td className={td}>
                      <Link href={`/erp/projects/${p.id}`} className="font-semibold hover:text-brand-text">
                        {p.name}
                      </Link>
                    </td>
                    <td className={td}>{projectTypeLabel(p.type)}</td>
                    <td className={td}>
                      <Badge label={s.label} tone={s.tone} />
                    </td>
                    <td className={td}>{p.owner?.name ?? "—"}</td>
                    <td className={td}>
                      {p.previewUrl ? (
                        <a href={p.previewUrl} target="_blank" rel="noopener" className="text-rust underline">
                          Open
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                );
              })}
            </Table>
            <details className="mt-4 rounded-md border border-line bg-cream">
              <summary className="cursor-pointer px-4 py-2 text-sm font-semibold">Add a project</summary>
              <form action={createProject} className="grid gap-3 border-t border-line p-4 sm:grid-cols-3">
                <input type="hidden" name="clientId" value={client.id} />
                <Field name="name" title="Project name">
                  <input id="name" name="name" required defaultValue={`${client.name} Website`} className={input} />
                </Field>
                <Field name="type" title="Type">
                  <select id="type" name="type" className={input} defaultValue="website">
                    {PROJECT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field name="ownerId" title="Owner">
                  <select id="ownerId" name="ownerId" className={input} defaultValue={user.id}>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-3">
                  <Button small>Create project</Button>
                </div>
              </form>
            </details>
          </Panel>

          <Panel title="Invoices" actions={outstanding > 0 ? <span className="text-xs font-semibold text-brand-text">{money(outstanding)} outstanding</span> : undefined}>
            <Table head={["Kind", "Description", "Amount", "Status", "Issued", "Due"]} empty={client.invoices.length === 0}>
              {client.invoices.map((i) => {
                const s = invoiceStatus(i.status);
                return (
                  <tr key={i.id}>
                    <td className={td}>{INVOICE_KINDS.find((k) => k.value === i.kind)?.label ?? i.kind}</td>
                    <td className={td}>{i.description ?? "—"}</td>
                    <td className={td}>{money(i.amountCents)}</td>
                    <td className={td}>
                      <Badge label={s.label} tone={s.tone} />
                    </td>
                    <td className={td}>{date(i.issuedAt)}</td>
                    <td className={td}>{date(i.dueAt)}</td>
                  </tr>
                );
              })}
            </Table>
            {can.billing(user.role) && (
              <details className="mt-4 rounded-md border border-line bg-cream">
                <summary className="cursor-pointer px-4 py-2 text-sm font-semibold">Add an invoice record</summary>
                <form action={createInvoice} className="grid gap-3 border-t border-line p-4 sm:grid-cols-4">
                  <input type="hidden" name="clientId" value={client.id} />
                  <input type="hidden" name="returnTo" value={returnTo} />
                  <Field name="kind" title="Kind">
                    <select id="kind" name="kind" className={input} defaultValue="setup">
                      {INVOICE_KINDS.map((k) => (
                        <option key={k.value} value={k.value}>
                          {k.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field name="amount" title="Amount (USD)">
                    <input id="amount" name="amount" type="number" min="1" step="1" required className={input} />
                  </Field>
                  <Field name="status" title="Status">
                    <select id="status" name="status" className={input} defaultValue="sent">
                      {INVOICE_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field name="dueAt" title="Due">
                    <input id="dueAt" name="dueAt" type="date" className={input} />
                  </Field>
                  <Field name="description" title="Description" className="sm:col-span-3">
                    <input id="description" name="description" className={input} placeholder="e.g. Website setup fee" />
                  </Field>
                  <div className="flex items-end">
                    <Button small>Add invoice</Button>
                  </div>
                </form>
              </details>
            )}
          </Panel>

          <ActivityFeed entity="client" entityId={client.id} activities={client.activities} returnTo={returnTo} />
        </div>

        <div className="space-y-6">
          <Panel title="Client details">
            <form action={updateClient} className="grid gap-3">
              <input type="hidden" name="id" value={client.id} />
              <Field name="name" title="Business name">
                <input id="name" name="name" required defaultValue={client.name} className={input} />
              </Field>
              <Field name="industry" title="Industry">
                <select id="industry" name="industry" className={input} defaultValue={client.industry ?? ""}>
                  <option value="">Choose</option>
                  {industries.map((i) => (
                    <option key={i.slug} value={i.slug}>
                      {i.name}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </Field>
              <Field name="contactName" title="Contact name">
                <input id="contactName" name="contactName" defaultValue={client.contactName ?? ""} className={input} />
              </Field>
              <Field name="phone" title="Phone">
                <input id="phone" name="phone" defaultValue={client.phone ?? ""} className={input} />
              </Field>
              <Field name="email" title="Email">
                <input id="email" name="email" type="email" defaultValue={client.email ?? ""} className={input} />
              </Field>
              <Field name="address" title="Address">
                <input id="address" name="address" defaultValue={client.address ?? ""} className={input} />
              </Field>
              <Field name="notes" title="Notes">
                <textarea id="notes" name="notes" rows={4} defaultValue={client.notes ?? ""} className={input} />
              </Field>
              <div>
                <Button small>Save client</Button>
              </div>
            </form>
          </Panel>
        </div>
      </div>
    </>
  );
}
