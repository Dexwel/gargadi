import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";
import { getSender } from "@/lib/senders";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminDashboard senderMode={getSender().mode} />;
}
