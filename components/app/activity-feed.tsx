import { addActivity, completeTask } from "@/app/(app)/actions";
import { ACTIVITY_TYPES } from "@/lib/status";
import { dateTime, date } from "@/lib/format";
import { Button, Field, input, Panel } from "./ui";

type Activity = {
  id: string;
  type: string;
  body: string;
  dueAt: Date | null;
  done: boolean;
  createdAt: Date;
  user: { name: string } | null;
};

const TYPE_LABEL: Record<string, string> = {
  note: "Note",
  call: "Call",
  email: "Email",
  task: "Task",
  status_change: "Status",
};

/** Log of notes, calls, emails, and tasks for a lead, client, or project, plus the add form. */
export function ActivityFeed({
  entity,
  entityId,
  activities,
  returnTo,
}: {
  entity: "lead" | "client" | "project";
  entityId: string;
  activities: Activity[];
  returnTo: string;
}) {
  return (
    <Panel title="Activity">
      <form action={addActivity} className="grid gap-3 rounded-md border border-line bg-cream p-4 sm:grid-cols-[10rem_1fr_10rem]">
        <input type="hidden" name="entity" value={entity} />
        <input type="hidden" name="entityId" value={entityId} />
        <input type="hidden" name="returnTo" value={returnTo} />
        <Field name="type" title="Type">
          <select id="type" name="type" className={input} defaultValue="note">
            {ACTIVITY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field name="body" title="Details">
          <input id="body" name="body" required placeholder="What happened, or what needs doing" className={input} />
        </Field>
        <Field name="dueAt" title="Due (tasks)">
          <input id="dueAt" name="dueAt" type="date" className={input} />
        </Field>
        <div className="sm:col-span-3">
          <Button small>Add</Button>
        </div>
      </form>

      <ul className="mt-4 divide-y divide-line">
        {activities.length === 0 && <li className="py-6 text-center text-sm text-ink-muted">No activity logged yet.</li>}
        {activities.map((a) => (
          <li key={a.id} className="flex items-start gap-3 py-3 text-sm">
            <span className="mt-0.5 w-14 shrink-0 rounded bg-cream px-1.5 py-0.5 text-center text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
              {TYPE_LABEL[a.type] ?? a.type}
            </span>
            <div className="flex-1">
              <p className={a.done ? "text-ink-muted line-through" : "text-ink"}>{a.body}</p>
              <p className="mt-0.5 text-xs text-ink-muted">
                {a.user?.name ?? "System"} · {dateTime(a.createdAt)}
                {a.type === "task" && a.dueAt && <> · due {date(a.dueAt)}</>}
              </p>
            </div>
            {a.type === "task" && !a.done && (
              <form action={completeTask}>
                <input type="hidden" name="id" value={a.id} />
                <input type="hidden" name="returnTo" value={returnTo} />
                <Button small variant="ghost">
                  Done
                </Button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
