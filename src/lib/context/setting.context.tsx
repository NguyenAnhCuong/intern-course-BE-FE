"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface SettingContextType {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

const SettingContext = createContext<SettingContextType | undefined>(undefined);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <SettingContext.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
    </SettingContext.Provider>
  );
};

export const useSettingContext = () => {
  const context = useContext(SettingContext);
  if (!context) throw new Error("useContext phải dùng bên trong Provider");
  return context;
};
