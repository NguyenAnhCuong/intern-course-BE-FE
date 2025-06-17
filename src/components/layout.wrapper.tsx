"use client";

import React from "react";
import { useLayout } from "@/context/layout.context";
import HeaderUser from "@/components/user/user.header";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const layout = useLayout();

  return (
    <>
      {layout === "default" && <HeaderUser />}
      {children}
    </>
  );
}
