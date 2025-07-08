"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface SidebarContextType {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useContext phải dùng bên trong Provider");
  return context;
};
