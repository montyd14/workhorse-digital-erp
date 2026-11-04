import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { createInvoice, updateInvoiceStatus } from "@/app/(app)/actions";
import { Badge, Button, Field, Loading, Notice, PageHeader, Stat, Table, input, td } from "@/components/app/ui";
import { db } from "@/lib/db";
import { date, money } from "@/lib/format";
import { requireRole } from "@/lib/guard";
import { INVOICE_KINDS, INVOICE_STATUSES, invoiceStatus } from "@/lib/status";

export const metadata: Metadata = { title: "Billing" };

export default function Page(props: PageProps<"/erp/billing">) {
  return (
    <Suspense fallback={<Loading />}>
      <Content {...props} />
    </Suspense>
  );
}

async function Content({ searchParams }: PageProps<"/erp/billing">) {
  await requireRole(["MANAGER"]);
  const sp = await searchParams;
  const [invoices, clients] = await Promise.all([
    db.invoice.findMany({ orderBy: { createdAt: "desc" }, include: { client: { select: { id: true, name: true } } } }),
    db.client.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const outstanding = invoices.filter((i) => i.status === "sent").reduce((s, i) => s + i.amountCents, 0);
  const overdue = invoices.filter((i) => i.status === "sent" && i.dueAt && i.dueAt < now).reduce((s, i) => s + i.amountCents, 0);
  const paidThisMonth = invoices.filter((i) => i.status === "paid" && i.paidAt && i.paidAt >= monthStart).reduce((s, i) => s + i.amountCents, 0);
  const monthlyRecurring = invoices
    .filter((i) => i.kind === "monthly" && i.status !== "void")
    .reduce((m, i) => m.set(i.clientId, i.amountCents), new Map<string, number>());
  const mrr = [...monthlyRecurring.values()].reduce((s, v) => s + v, 0);

  return (
    <>
      <PageHeader title="Billing" blurb="Invoice records. Card charges happen in Square; log them here so the books match." />
      <Notice error={sp.error as string | undefined} ok={sp.ok as string | undefined} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Outstanding" value={money(outstanding)} hint="Sent, not yet paid" />
        <Stat label="Overdue" value={money(overdue)} hint="Past due date" />
        <Stat label="Paid this month" value={money(paidThisMonth)} />
        <Stat label="Monthly recurring" value={money(mrr)} hint="Latest monthly fee per client" />
      </div>

      <details className="mb-6 rounded-md border border-line bg-paper">
        <summary className="cursor-pointer px-4 py-2 text-sm font-semibold">New invoice record</summary>
        <form action={createInvoice} className="grid gap-3 border-t border-line p-4 sm:grid-cols-5">
          <Field name="clientId" title="Client">
            <select id="clientId" name="clientId" required className={input} defaultValue="">
              <option value="" disabled>
                Choose
              </option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
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
          <Field name="description" title="Description" className="sm:col-span-4">
            <input id="description" name="description" className={input} />
          </Field>
          <div className="flex items-end">
            <Button small>Add</Button>
          </div>
        </form>
      </details>

      <Table head={["Client", "Kind", "Description", "Amount", "Status", "Issued", "Due", "Paid", ""]} empty={invoices.length === 0}>
        {invoices.map((i) => {
          const s = invoiceStatus(i.status);
          const late = i.status === "sent" && i.dueAt && i.dueAt < now;
          return (
            <tr key={i.id} className={late ? "bg-brand/5" : undefined}>
              <td className={td}>
                <Link href={`/crm/clients/${i.client.id}`} className="font-semibold hover:text-brand-text">
                  {i.client.name}
                </Link>
              </td>
              <td className={td}>{INVOICE_KINDS.find((k) => k.value === i.kind)?.label ?? i.kind}</td>
              <td className={td}>{i.description ?? "—"}</td>
              <td className={`${td} font-semibold`}>{money(i.amountCents)}</td>
              <td className={td}>
                <Badge label={s.label} tone={s.tone} />
              </td>
              <td className={td}>{date(i.issuedAt)}</td>
              <td className={`${td} ${late ? "font-semibold text-brand-text" : ""}`}>{date(i.dueAt)}</td>
              <td className={td}>{date(i.paidAt)}</td>
              <td className={td}>
                <form action={updateInvoiceStatus} className="flex items-center gap-1">
                  <input type="hidden" name="id" value={i.id} />
                  <select name="status" defaultValue={i.status} className="rounded-md border border-line bg-paper px-2 py-1 text-xs" aria-label="Change status">
                    {INVOICE_STATUSES.map((st) => (
                      <option key={st.value} value={st.value}>
                        {st.label}
                      </option>
                    ))}
                  </select>
                  <Button small variant="ghost">
                    Set
                  </Button>
                </form>
              </td>
            </tr>
          );
        })}
      </Table>
    </>
  );
}
