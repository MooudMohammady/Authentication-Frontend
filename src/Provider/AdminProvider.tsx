"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AdminProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await axios.get("/api/users/get-id").catch(() => {
        router.push("/auth");
      });
    })();
  }, []);

  return <>{children}</>;
}
