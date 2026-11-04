import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/app/(app)/actions";
import { Button, Field, Loading, Notice, PageHeader, Table, input, td } from "@/components/app/ui";
import { industries } from "@/content/industries";
import { db } from "@/lib/db";
import { date, money } from "@/lib/format";
import { requireRole } from "@/lib/guard";

export const metadata: Metadata = { title: "Clients" };

export default function Page(props: PageProps<"/crm/clients">) {
  return (
    <Suspense fallback={<Loading />}>
      <Content {...props} />
    </Suspense>
  );
}

async function Content({ searchParams }: PageProps<"/crm/clients">) {
  await requireRole(["SALES", "OPS"]);
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const clients = await db.client.findMany({
    where: q ? { OR: [{ name: { contains: q } }, { contactName: { contains: q } }, { email: { contains: q } }] } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      projects: { select: { status: true } },
      invoices: { select: { status: true, amountCents: true } },
    },
  });

  return (
    <>
      <PageHeader title="Clients" blurb={`${clients.length} client${clients.length === 1 ? "" : "s"}`} />
      <Notice error={sp.error as string | undefined} ok={sp.ok as string | undefined} />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form className="flex gap-2">
          <input name="q" defaultValue={q} placeholder="Search clients" className="w-64 rounded-md border border-line bg-paper px-3 py-2 text-sm" />
          <Button small variant="ghost">
            Search
          </Button>
        </form>
        <details className="rounded-md border border-line bg-paper">
          <summary className="cursor-pointer px-4 py-2 text-sm font-semibold">Add client manually</summary>
          <form action={createClient} className="grid gap-3 border-t border-line p-4 sm:grid-cols-2">
            <Field name="name" title="Business name">
              <input id="name" name="name" required className={input} />
            </Field>
            <Field name="industry" title="Industry">
              <select id="industry" name="industry" className={input} defaultValue="">
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
              <input id="contactName" name="contactName" className={input} />
            </Field>
            <Field name="phone" title="Phone">
              <input id="phone" name="phone" className={input} />
            </Field>
            <Field name="email" title="Email" className="sm:col-span-2">
              <input id="email" name="email" type="email" className={input} />
            </Field>
            <div className="sm:col-span-2">
              <Button small>Create client</Button>
            </div>
          </form>
        </details>
      </div>

      <Table head={["Client", "Contact", "Industry", "Projects", "Open invoices", "Since"]} empty={clients.length === 0}>
        {clients.map((c) => {
          const active = c.projects.filter((p) => !["live", "cancelled"].includes(p.status)).length;
          const open = c.invoices.filter((i) => i.status === "sent").reduce((s, i) => s + i.amountCents, 0);
          return (
            <tr key={c.id} className="hover:bg-cream/60">
              <td className={td}>
                <Link href={`/crm/clients/${c.id}`} className="font-semibold text-ink hover:text-brand-text">
                  {c.name}
                </Link>
              </td>
              <td className={td}>
                {c.contactName ?? "—"}
                {c.phone && <span className="block text-xs text-ink-muted">{c.phone}</span>}
              </td>
              <td className={td}>{c.industry ?? "—"}</td>
              <td className={td}>
                {c.projects.length} total{active > 0 && <span className="text-ink-muted"> · {active} active</span>}
              </td>
              <td className={td}>{open ? money(open) : "—"}</td>
              <td className={td}>{date(c.createdAt)}</td>
            </tr>
          );
        })}
      </Table>
    </>
  );
}
