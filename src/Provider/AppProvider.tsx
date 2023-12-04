"use client";
import React from "react";
// import NextProgressBar from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <NextProgressBar color="rgb(126 34 206)" /> */}
      <ToastContainer/>
      {children}
    </>
  );
}
