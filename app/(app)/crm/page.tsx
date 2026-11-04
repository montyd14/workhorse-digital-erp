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
      <PageHeader title="Leads" blurb={`${total} total · showing ${leads.length}`} />
      <Notice error={sp.error as string | undefined} ok={sp.ok as string | undefined} />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link href={link({ status: "" })} className={`rounded-full px-3 py-1 text-xs font-bold ${!status ? "bg-ink text-cream" : "bg-paper text-ink border border-line"}`}>
          All {total}
        </Link>
        {LEAD_STATUSES.map((s) => (
          <Link
            key={s.value}
            href={link({ status: s.value })}
            className={`rounded-full px-3 py-1 text-xs font-bold ${status === s.value ? "bg-ink text-cream" : `${s.tone} border border-transparent`}`}
          >
            {s.label} {count(s.value)}
          </Link>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-line sm:block" />
        <Link href={link({ mine: mine ? "" : "1" })} className={`rounded-full px-3 py-1 text-xs font-bold ${mine ? "bg-brand text-white" : "border border-line bg-paper text-ink"}`}>
          Assigned to me
        </Link>
        <form className="ml-auto flex gap-2">
          {status && <input type="hidden" name="status" value={status} />}
          {mine && <input type="hidden" name="mine" value="1" />}
          <input name="q" defaultValue={q} placeholder="Search name, business, phone" className="w-64 rounded-md border border-line bg-paper px-3 py-1.5 text-sm" />
          <Button small variant="ghost">
            Search
          </Button>
        </form>
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
