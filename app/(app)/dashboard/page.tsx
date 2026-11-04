import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { completeTask } from "@/app/(app)/actions";
import { Badge, Button, Loading, Notice, PageHeader, Panel, Stat } from "@/components/app/ui";
import { db } from "@/lib/db";
import { date, money, timeAgo } from "@/lib/format";
import { can, requireUser } from "@/lib/guard";
import { LEAD_STATUSES, leadStatus, projectStatus } from "@/lib/status";

export const metadata: Metadata = { title: "Dashboard" };

export default function Page(props: PageProps<"/dashboard">) {
  return (
    <Suspense fallback={<Loading />}>
      <Content {...props} />
    </Suspense>
  );
}

/** Not a component, so it may read the clock. */
function clock() {
  const now = new Date();
  return { now, weekAgo: new Date(now.getTime() - 7 * 24 * 3600 * 1000) };
}

async function Content({ searchParams }: PageProps<"/dashboard">) {
  const user = await requireUser();
  const sp = await searchParams;
  const { now, weekAgo } = clock();

  const [newLeads, byStatus, activeProjects, outstanding, recentLeads, tasks, recentActivity, projectsByStatus] = await Promise.all([
    db.lead.count({ where: { createdAt: { gte: weekAgo } } }),
    db.lead.groupBy({ by: ["status"], _count: { _all: true } }),
    db.project.count({ where: { status: { in: ["planned", "building", "preview", "approved"] } } }),
    db.invoice.aggregate({ where: { status: "sent" }, _sum: { amountCents: true } }),
    db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 6, include: { assignedTo: { select: { name: true } } } }),
    db.activity.findMany({
      where: { type: "task", done: false },
      orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }],
      take: 8,
      include: { lead: { select: { id: true, businessName: true } }, client: { select: { id: true, name: true } }, project: { select: { id: true, name: true } }, user: { select: { name: true } } },
    }),
    db.activity.findMany({
      where: { type: { not: "task" } },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { lead: { select: { id: true, businessName: true } }, client: { select: { id: true, name: true } }, project: { select: { id: true, name: true } }, user: { select: { name: true } } },
    }),
    db.project.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);
  const count = (s: string) => byStatus.find((b) => b.status === s)?._count._all ?? 0;
  const openPipeline = ["NEW", "CONTACTED", "DISCOVERY_BOOKED", "BUILDING", "PREVIEW_SENT"].reduce((n, s) => n + count(s), 0);

  const target = (a: (typeof tasks)[number]) =>
    a.lead ? { href: `/crm/leads/${a.lead.id}`, name: a.lead.businessName } : a.client ? { href: `/crm/clients/${a.client.id}`, name: a.client.name } : a.project ? { href: `/erp/projects/${a.project.id}`, name: a.project.name } : null;

  return (
    <>
      <PageHeader title={`Good ${now.getHours() < 12 ? "morning" : now.getHours() < 18 ? "afternoon" : "evening"}, ${user.name.split(" ")[0]}`} blurb="Here is where things stand." />
      <Notice error={sp.denied ? "You do not have access to that area." : undefined} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="New leads, 7 days" value={newLeads} href="/crm?status=NEW" />
        <Stat label="Open pipeline" value={openPipeline} hint={`${count("NEW")} untouched`} href="/crm" />
        <Stat label="Active projects" value={activeProjects} href="/erp/projects" />
        {can.billing(user.role) ? (
          <Stat label="Outstanding invoices" value={money(outstanding._sum.amountCents ?? 0)} href="/erp/billing" />
        ) : (
          <Stat label="Won clients" value={count("WON")} href="/crm/clients" />
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Panel title="Pipeline">
            <ul className="grid gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {LEAD_STATUSES.map((s) => (
                <li key={s.value}>
                  <Link href={`/crm?status=${s.value}`} className="block rounded-md border border-line p-3 text-center hover:border-brand">
                    <p className="font-heading text-2xl font-extrabold">{count(s.value)}</p>
                    <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">{s.label}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Latest leads" actions={<Button href="/crm" small variant="ghost">All leads</Button>}>
            <ul className="divide-y divide-line">
              {recentLeads.length === 0 && <li className="py-6 text-center text-sm text-ink-muted">No leads yet. They arrive here from the website form.</li>}
              {recentLeads.map((l) => {
                const s = leadStatus(l.status);
                return (
                  <li key={l.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <div className="min-w-0">
                      <Link href={`/crm/leads/${l.id}`} className="font-semibold text-ink hover:text-brand-text">
                        {l.businessName}
                      </Link>
                      <p className="truncate text-xs text-ink-muted">
                        {l.name} · {l.industry} · {timeAgo(l.createdAt)}
                        {l.assignedTo && <> · {l.assignedTo.name}</>}
                      </p>
                    </div>
                    <Badge label={s.label} tone={s.tone} />
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title="Projects by stage" actions={<Button href="/erp/projects" small variant="ghost">Board</Button>}>
            <ul className="flex flex-wrap gap-2">
              {projectsByStatus.length === 0 && <li className="text-sm text-ink-muted">No projects yet.</li>}
              {projectsByStatus.map((p) => {
                const s = projectStatus(p.status);
                return (
                  <li key={p.status} className="flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-sm">
                    <Badge label={s.label} tone={s.tone} /> <span className="font-semibold">{p._count._all}</span>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Follow-ups due">
            <ul className="divide-y divide-line">
              {tasks.length === 0 && <li className="py-6 text-center text-sm text-ink-muted">Nothing due. Add tasks from any lead, client, or project.</li>}
              {tasks.map((t) => {
                const tg = target(t);
                const late = t.dueAt && t.dueAt < now;
                return (
                  <li key={t.id} className="flex items-start gap-3 py-2.5 text-sm">
                    <div className="min-w-0 flex-1">
                      <p className="text-ink">{t.body}</p>
                      <p className="text-xs text-ink-muted">
                        {tg && (
                          <Link href={tg.href} className="underline">
                            {tg.name}
                          </Link>
                        )}
                        {t.dueAt && <span className={late ? " font-semibold text-brand-text" : ""}> · due {date(t.dueAt)}</span>}
                      </p>
                    </div>
                    <form action={completeTask}>
                      <input type="hidden" name="id" value={t.id} />
                      <input type="hidden" name="returnTo" value="/dashboard" />
                      <Button small variant="ghost">
                        Done
                      </Button>
                    </form>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title="Recent activity">
            <ul className="divide-y divide-line">
              {recentActivity.length === 0 && <li className="py-6 text-center text-sm text-ink-muted">Nothing logged yet.</li>}
              {recentActivity.map((a) => {
                const tg = target(a);
                return (
                  <li key={a.id} className="py-2.5 text-sm">
                    <p className="text-ink">{a.body}</p>
                    <p className="text-xs text-ink-muted">
                      {a.user?.name ?? "System"}
                      {tg && (
                        <>
                          {" "}
                          on{" "}
                          <Link href={tg.href} className="underline">
                            {tg.name}
                          </Link>
                        </>
                      )}{" "}
                      · {timeAgo(a.createdAt)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
