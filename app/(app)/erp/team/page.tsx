import type { Metadata } from "next";
import { Suspense } from "react";
import { createUser, updateUser } from "@/app/(app)/actions";
import { Badge, Button, Field, Loading, Notice, PageHeader, Panel, input } from "@/components/app/ui";
import { db } from "@/lib/db";
import { date } from "@/lib/format";
import { requireRole } from "@/lib/guard";
import { ROLES } from "@/lib/status";

export const metadata: Metadata = { title: "Team" };

export default function Page(props: PageProps<"/erp/team">) {
  return (
    <Suspense fallback={<Loading />}>
      <Content {...props} />
    </Suspense>
  );
}

async function Content({ searchParams }: PageProps<"/erp/team">) {
  const me = await requireRole(["ADMIN"]);
  const sp = await searchParams;
  const users = await db.user.findMany({
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
    include: { _count: { select: { leads: true, projects: true } } },
  });

  return (
    <>
      <PageHeader title="Team" blurb="Who can sign in, and what they can see." />
      <Notice error={sp.error as string | undefined} ok={sp.ok as string | undefined} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          {users.map((u) => (
            <form key={u.id} action={updateUser} className="grid gap-3 rounded-lg border border-line bg-paper p-4 sm:grid-cols-[1.3fr_1fr_1fr_auto_auto] sm:items-end">
              <input type="hidden" name="id" value={u.id} />
              <div>
                <p className="font-semibold text-ink">
                  {u.name}
                  {u.id === me.id && <span className="ml-2 text-xs text-ink-muted">(you)</span>}
                </p>
                <p className="text-xs text-ink-muted">{u.email}</p>
                <p className="mt-1 text-xs text-ink-muted">
                  {u._count.leads} leads · {u._count.projects} projects · since {date(u.createdAt)}
                </p>
                {!u.isActive && (
                  <div className="mt-1">
                    <Badge label="Deactivated" tone="bg-[#f3dede] text-[#8a2a2a]" />
                  </div>
                )}
              </div>
              <Field name={`role-${u.id}`} title="Role">
                <select id={`role-${u.id}`} name="role" defaultValue={u.role} className={input}>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field name={`pw-${u.id}`} title="New password">
                <input id={`pw-${u.id}`} name="password" type="password" autoComplete="new-password" placeholder="Leave blank to keep" className={input} />
              </Field>
              <label className="flex items-center gap-2 pb-2 text-sm">
                <input type="checkbox" name="isActive" defaultChecked={u.isActive} className="h-4 w-4 accent-brand" />
                Active
              </label>
              <Button small>Save</Button>
            </form>
          ))}
        </div>

        <div className="space-y-6">
          <Panel title="Add a team member">
            <form action={createUser} className="grid gap-3">
              <Field name="name" title="Name">
                <input id="name" name="name" required className={input} />
              </Field>
              <Field name="email" title="Work email">
                <input id="email" name="email" type="email" required className={input} />
              </Field>
              <Field name="password" title="Temporary password">
                <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className={input} />
              </Field>
              <Field name="role" title="Role">
                <select id="role" name="role" defaultValue="SALES" className={input}>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </Field>
              <div>
                <Button small>Add member</Button>
              </div>
            </form>
          </Panel>
          <Panel title="What each role sees">
            <ul className="space-y-2 text-sm">
              {ROLES.map((r) => (
                <li key={r.value}>
                  <span className="font-semibold">{r.label}:</span> <span className="text-ink-soft">{r.blurb}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
