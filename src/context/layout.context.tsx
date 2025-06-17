// context/LayoutContext.tsx
"use client";

import React, { createContext, useContext, ReactNode } from "react";

type LayoutType = "default" | "admin";

const LayoutContext = createContext<LayoutType>("default");

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({
  children,
  layout = "default",
}: {
  children: ReactNode;
  layout?: LayoutType;
}) => {
  return (
    <LayoutContext.Provider value={layout}>{children}</LayoutContext.Provider>
  );
};
