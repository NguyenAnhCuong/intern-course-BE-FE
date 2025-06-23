// app/layout.tsx
import * as React from "react";
import "./layout.css";
import HeaderUser from "@/components/user/user.header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {<HeaderUser />}
      {children}
    </>
  );
}
