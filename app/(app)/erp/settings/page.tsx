import type { Metadata } from "next";
import { Suspense } from "react";
import { Description, Loading, PageHeader, Panel } from "@/components/app/ui";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/guard";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Settings" };

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Content />
    </Suspense>
  );
}

async function Content() {
  await requireRole(["MANAGER"]);
  const [leads, clients, projects, users] = await Promise.all([db.lead.count(), db.client.count(), db.project.count(), db.user.count()]);
  const smtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

  return (
    <>
      <PageHeader title="Settings" blurb="Configuration comes from the server environment. Change it in the hosting panel, then redeploy." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Site">
          <Description
            items={[
              { k: "Public URL", v: site.url },
              { k: "Phone", v: site.phoneDisplay },
              { k: "Email", v: site.email },
              { k: "Booking link", v: site.bookingUrl },
              { k: "Analytics", v: site.gaId ? `GA4 ${site.gaId}` : "Not set" },
            ]}
          />
        </Panel>
        <Panel title="Lead notifications">
          <Description
            items={[
              { k: "SMTP", v: smtp ? `Configured (${process.env.SMTP_HOST})` : "Not configured. Leads are saved but no email is sent." },
              { k: "Notify address", v: process.env.LEAD_NOTIFY_EMAIL ?? "Not set" },
              { k: "From address", v: process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "Not set" },
            ]}
          />
        </Panel>
        <Panel title="Access">
          <Description
            items={[
              { k: "Team login", v: process.env.ENABLE_APP_LOGIN === "true" ? "Enabled" : "Disabled" },
              { k: "Client portal", v: "Not built yet" },
              { k: "Team members", v: users },
            ]}
          />
        </Panel>
        <Panel title="Database">
          <Description
            items={[
              { k: "Leads", v: leads },
              { k: "Clients", v: clients },
              { k: "Projects", v: projects },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
