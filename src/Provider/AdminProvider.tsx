"use client";
import AdminContext from "@/contexts/AdminContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AdminProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string>("userid");
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await axios
        .get("/api/users/get-id")
        .then((res) => {
          setUserId(res.data.data.user_id);
        })
        .catch(() => {
          router.push("/auth");
        });
    })();
  }, []);

  return (
    <>
      <AdminContext.Provider value={{ userId }}>
        {children}
      </AdminContext.Provider>
    </>
  );
}
