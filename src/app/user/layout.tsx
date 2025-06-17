// app/layout.tsx
import * as React from "react";
import { LayoutProvider } from "@/context/layout.context";
import LayoutWrapper from "@/components/layout.wrapper"; // <-- tách phần client ra

export const metadata = {
  title: "Next.js App Router + Material UI v5",
  description: "Next.js App Router + Material UI v5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutProvider layout="default">
      <LayoutWrapper>{children}</LayoutWrapper>
    </LayoutProvider>
  );
}
