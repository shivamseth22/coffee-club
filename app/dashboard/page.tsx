import type { Metadata } from "next";
import { DashboardView } from "@/modules/dashboard";

export const metadata: Metadata = { title: "Dashboard" };

export default function Page() {
  return <DashboardView />;
}
