import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Operations" };

export default function Page() {
  return <ComingSoon title="Operations" description="Projects, billing records, team, and settings." />;
}
