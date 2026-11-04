import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { createProject } from "@/app/(app)/actions";
import { Badge, Button, Field, Loading, Notice, PageHeader, input } from "@/components/app/ui";
import { db } from "@/lib/db";
import { date } from "@/lib/format";
import { requireRole } from "@/lib/guard";
import { PROJECT_STATUSES, PROJECT_TYPES, projectTypeLabel } from "@/lib/status";

export const metadata: Metadata = { title: "Projects" };

export default function Page(props: PageProps<"/erp/projects">) {
  return (
    <Suspense fallback={<Loading />}>
      <Content {...props} />
    </Suspense>
  );
}

async function Content({ searchParams }: PageProps<"/erp/projects">) {
  const user = await requireRole(["OPS", "SALES"]);
  const sp = await searchParams;
  const showClosed = sp.closed === "1";
  const [projects, clients, users] = await Promise.all([
    db.project.findMany({
      where: showClosed ? undefined : { status: { notIn: ["live", "cancelled"] } },
      orderBy: { updatedAt: "desc" },
      include: { client: { select: { id: true, name: true } }, owner: { select: { name: true } } },
    }),
    db.client.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    db.user.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  const columns = PROJECT_STATUSES.filter((s) => showClosed || !["live", "cancelled"].includes(s.value));

  return (
    <>
      <PageHeader
        title="Projects"
        blurb="Every build, from planned to live. Click a card to update it."
        actions={
          <Button href={showClosed ? "/erp/projects" : "/erp/projects?closed=1"} variant="ghost">
            {showClosed ? "Hide live and cancelled" : "Show live and cancelled"}
          </Button>
        }
      />
      <Notice error={sp.error as string | undefined} ok={sp.ok as string | undefined} />

      <details className="mb-6 rounded-md border border-line bg-paper">
        <summary className="cursor-pointer px-4 py-2 text-sm font-semibold">New project</summary>
        <form action={createProject} className="grid gap-3 border-t border-line p-4 sm:grid-cols-4">
          <Field name="clientId" title="Client">
            <select id="clientId" name="clientId" required className={input} defaultValue="">
              <option value="" disabled>
                Choose a client
              </option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field name="name" title="Project name">
            <input id="name" name="name" required className={input} />
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
          <div className="sm:col-span-4">
            <Button small>Create project</Button>
          </div>
        </form>
        {clients.length === 0 && <p className="px-4 pb-4 text-xs text-ink-muted">No clients yet. Convert a lead or add a client first.</p>}
      </details>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((col) => {
          const items = projects.filter((p) => p.status === col.value);
          return (
            <section key={col.value} className="rounded-lg border border-line bg-cream-dark/40 p-3">
              <header className="mb-3 flex items-center justify-between px-1">
                <Badge label={col.label} tone={col.tone} />
                <span className="text-xs font-semibold text-ink-muted">{items.length}</span>
              </header>
              <ul className="space-y-2">
                {items.length === 0 && <li className="rounded-md border border-dashed border-line p-4 text-center text-xs text-ink-muted">Empty</li>}
                {items.map((p) => (
                  <li key={p.id}>
                    <Link href={`/erp/projects/${p.id}`} className="block rounded-md border border-line bg-paper p-3 transition-colors hover:border-brand">
                      <p className="text-sm font-semibold text-ink">{p.name}</p>
                      <p className="mt-0.5 text-xs text-ink-muted">
                        {p.client.name} · {projectTypeLabel(p.type)}
                      </p>
                      <p className="mt-2 flex items-center justify-between text-[0.7rem] text-ink-muted">
                        <span>{p.owner?.name ?? "Unassigned"}</span>
                        <span>{date(p.updatedAt)}</span>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
