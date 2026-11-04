import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { updateProject } from "@/app/(app)/actions";
import { ActivityFeed } from "@/components/app/activity-feed";
import { Badge, Button, Description, Field, Loading, Notice, PageHeader, Panel, input } from "@/components/app/ui";
import { db } from "@/lib/db";
import { date } from "@/lib/format";
import { requireRole } from "@/lib/guard";
import { PROJECT_STATUSES, PROJECT_TYPES, projectStatus } from "@/lib/status";

export const metadata: Metadata = { title: "Project" };

export default function Page(props: PageProps<"/erp/projects/[id]">) {
  return (
    <Suspense fallback={<Loading />}>
      <Content {...props} />
    </Suspense>
  );
}

async function Content({ params, searchParams }: PageProps<"/erp/projects/[id]">) {
  await requireRole(["OPS", "SALES"]);
  const { id } = await params;
  const sp = await searchParams;
  const [project, users] = await Promise.all([
    db.project.findUnique({
      where: { id },
      include: {
        client: { select: { id: true, name: true, contactName: true, phone: true } },
        owner: { select: { id: true, name: true } },
        activities: { orderBy: { createdAt: "desc" }, include: { user: { select: { name: true } } } },
      },
    }),
    db.user.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!project) notFound();
  const s = projectStatus(project.status);
  const returnTo = `/erp/projects/${project.id}`;

  return (
    <>
      <PageHeader
        title={project.name}
        blurb={
          <>
            For{" "}
            <Link href={`/crm/clients/${project.client.id}`} className="underline">
              {project.client.name}
            </Link>
          </>
        }
        actions={
          <>
            <Button href="/erp/projects" variant="ghost">
              Board
            </Button>
            {project.previewUrl && (
              <Button href={project.previewUrl} variant="secondary">
                Open preview
              </Button>
            )}
          </>
        }
      />
      <Notice error={sp.error as string | undefined} ok={sp.ok as string | undefined} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Panel title="Project" actions={<Badge label={s.label} tone={s.tone} />}>
            <form action={updateProject} className="grid gap-3 sm:grid-cols-2">
              <input type="hidden" name="id" value={project.id} />
              <Field name="name" title="Name" className="sm:col-span-2">
                <input id="name" name="name" required defaultValue={project.name} className={input} />
              </Field>
              <Field name="status" title="Status">
                <select id="status" name="status" defaultValue={project.status} className={input}>
                  {PROJECT_STATUSES.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field name="type" title="Type">
                <select id="type" name="type" defaultValue={project.type} className={input}>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field name="ownerId" title="Owner">
                <select id="ownerId" name="ownerId" defaultValue={project.ownerId ?? ""} className={input}>
                  <option value="">Unassigned</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field name="previewUrl" title="Preview URL">
                <input id="previewUrl" name="previewUrl" type="url" defaultValue={project.previewUrl ?? ""} placeholder="https://" className={input} />
              </Field>
              <Field name="liveUrl" title="Live URL">
                <input id="liveUrl" name="liveUrl" type="url" defaultValue={project.liveUrl ?? ""} placeholder="https://" className={input} />
              </Field>
              <Field name="notes" title="Notes" className="sm:col-span-2">
                <textarea id="notes" name="notes" rows={5} defaultValue={project.notes ?? ""} className={input} placeholder="Scope, decisions, access details, anything the next person needs." />
              </Field>
              <div className="sm:col-span-2">
                <Button small>Save project</Button>
              </div>
            </form>
          </Panel>

          <ActivityFeed entity="project" entityId={project.id} activities={project.activities} returnTo={returnTo} />
        </div>

        <div className="space-y-6">
          <Panel title="Timeline">
            <Description
              items={[
                { k: "Created", v: date(project.createdAt) },
                { k: "Build started", v: date(project.startedAt) },
                { k: "Preview sent", v: date(project.previewAt) },
                { k: "Approved", v: date(project.approvedAt) },
                { k: "Went live", v: date(project.liveAt) },
                { k: "Last update", v: date(project.updatedAt) },
              ]}
            />
            <p className="mt-4 text-xs text-ink-muted">Dates fill in automatically when the status changes.</p>
          </Panel>
          <Panel title="Client">
            <Description
              items={[
                { k: "Business", v: <Link href={`/crm/clients/${project.client.id}`} className="underline">{project.client.name}</Link> },
                { k: "Contact", v: project.client.contactName },
                { k: "Phone", v: project.client.phone },
              ]}
            />
          </Panel>
        </div>
      </div>
    </>
  );
}
