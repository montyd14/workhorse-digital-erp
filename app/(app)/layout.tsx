import type { Metadata } from "next";
import { Suspense } from "react";
import { Sidebar, SidebarSkeleton } from "@/components/app/sidebar";

export const metadata: Metadata = {
  title: { default: "Workhorse ERP", template: "%s | Workhorse ERP" },
  robots: { index: false, follow: false },
};

/** Private area shell. The sidebar reads the session, so it streams in behind Suspense. */
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cream md:flex-row">
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
