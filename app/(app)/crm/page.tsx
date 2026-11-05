import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Badge, Button, Loading, Notice, PageHeader, Table, td } from "@/components/app/ui";
import { db } from "@/lib/db";
import { timeAgo } from "@/lib/format";
import { requireRole } from "@/lib/guard";
import { LEAD_STATUSES, leadStatus, needLabel } from "@/lib/status";
import type { LeadStatus } from "@/generated/prisma/enums";

export const metadata: Metadata = { title: "Leads" };

export default function Page(props: PageProps<"/crm">) {
  return (
    <Suspense fallback={<Loading />}>
      <Content {...props} />
    </Suspense>
  );
}

async function Content({ searchParams }: PageProps<"/crm">) {
  const user = await requireRole(["SALES"]);
  const sp = await searchParams;
  const status = typeof sp.status === "string" && LEAD_STATUSES.some((s) => s.value === sp.status) ? (sp.status as LeadStatus) : undefined;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const mine = sp.mine === "1";

  const where = {
    ...(status ? { status } : {}),
    ...(mine ? { assignedToId: user.id } : {}),
    ...(q ? { OR: [{ businessName: { contains: q } }, { name: { contains: q } }, { email: { contains: q } }, { phone: { contains: q } }] } : {}),
  };

  const [leads, counts] = await Promise.all([
    db.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: 200, include: { assignedTo: { select: { name: true } } } }),
    db.lead.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);
  const count = (s: string) => counts.find((c) => c.status === s)?._count._all ?? 0;
  const total = counts.reduce((n, c) => n + c._count._all, 0);
  const link = (params: Record<string, string | undefined>) => {
    const u = new URLSearchParams();
    const merged = { status: status ?? "", q, mine: mine ? "1" : "", ...params };
    Object.entries(merged).forEach(([k, v]) => v && u.set(k, v));
    const s = u.toString();
    return s ? `/crm?${s}` : "/crm";
  };

  return (
    <>
      <PageHeader
        title="Leads"
        blurb="Inbound inquiries from the website, sorted by most recent."
        actions={
          <div className="flex gap-6 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">Total</p>
              <p className="font-heading text-xl font-extrabold text-ink">{total}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">Awaiting contact</p>
              <p className="font-heading text-xl font-extrabold text-brand-text">{count("NEW")}</p>
            </div>
            {(status || q || mine) && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">In view</p>
                <p className="font-heading text-xl font-extrabold text-ink">{leads.length}</p>
              </div>
            )}
          </div>
        }
      />
      <Notice error={sp.error as string | undefined} ok={sp.ok as string | undefined} />

      <div className="mb-4 rounded-lg border border-line bg-paper">
        <div className="flex flex-col gap-3 border-b border-line px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <form className="flex gap-2">
            {status && <input type="hidden" name="status" value={status} />}
            {mine && <input type="hidden" name="mine" value="1" />}
            <input name="q" defaultValue={q} placeholder="Search by name, business, or phone" className="w-72 rounded-md border border-line bg-cream px-3 py-2 text-sm" />
            <Button small variant="ghost">
              Search
            </Button>
          </form>
          <Link
            href={link({ mine: mine ? "" : "1" })}
            className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold ${
              mine ? "border-brand-text bg-brand-tint text-brand-text" : "border-line text-ink-soft hover:border-ink"
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${mine ? "bg-brand" : "bg-line"}`} aria-hidden="true" />
            Assigned to me
          </Link>
        </div>
        <nav aria-label="Filter by stage" className="flex overflow-x-auto px-2">
          {[{ value: "", label: "All", n: total }, ...LEAD_STATUSES.map((s) => ({ value: s.value, label: s.label, n: count(s.value) }))].map((f) => {
            const on = (status ?? "") === f.value;
            return (
              <Link
                key={f.value || "all"}
                href={link({ status: f.value })}
                aria-current={on ? "page" : undefined}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-semibold transition-colors ${
                  on ? "border-brand text-ink" : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {f.label}
                <span className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${on ? "bg-ink text-cream" : "bg-cream text-ink-muted"}`}>{f.n}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <Table head={["Business", "Contact", "Industry", "Needs", "Status", "Assigned", "Received"]} empty={leads.length === 0}>
        {leads.map((l) => {
          const s = leadStatus(l.status);
          const needs = Array.isArray(l.needs) ? (l.needs as string[]) : [];
          return (
            <tr key={l.id} className="hover:bg-cream/60">
              <td className={td}>
                <Link href={`/crm/leads/${l.id}`} className="font-semibold text-ink hover:text-brand-text">
                  {l.businessName}
                </Link>
                {l.sourcePage && <span className="block text-xs text-ink-muted">{l.sourcePage}</span>}
              </td>
              <td className={td}>
                {l.name}
                <span className="block text-xs text-ink-muted">{l.phone}</span>
              </td>
              <td className={td}>{l.industry}</td>
              <td className={td}>
                <span className="text-xs">{needs.length ? needs.map(needLabel).join(", ") : "—"}</span>
              </td>
              <td className={td}>
                <Badge label={s.label} tone={s.tone} />
              </td>
              <td className={td}>{l.assignedTo?.name ?? <span className="text-ink-muted">—</span>}</td>
              <td className={`${td} whitespace-nowrap`}>{timeAgo(l.createdAt)}</td>
            </tr>
          );
        })}
      </Table>
    </>
  );
}
