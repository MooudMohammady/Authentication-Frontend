import AdminProvider from "@/Provider/AdminProvider";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>;
}
