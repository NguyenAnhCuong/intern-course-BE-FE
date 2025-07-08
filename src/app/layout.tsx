// app/layout.tsx
import * as React from "react";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import { AppProviders } from "@/lib/context.wrapper";

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
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            <AppProviders>{children}</AppProviders>
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
