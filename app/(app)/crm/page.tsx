import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Leads / CRM" };

export default function Page() {
  return <ComingSoon title="Leads / CRM" description="Lead pipeline, activities, follow-ups, and client records." />;
}
