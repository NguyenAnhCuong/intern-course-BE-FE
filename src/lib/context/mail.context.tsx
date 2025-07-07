"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

interface MailContextType {
  listEmail: IMail[];
  counts: { total: number; unread: number; archived: number };
  fetchListMail: () => Promise<void>;
}

const MailContext = createContext<MailContextType | undefined>(undefined);

export const MailProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [listEmail, setListEmail] = useState<IMail[]>([]);
  const [counts, setCounts] = useState({ total: 0, unread: 0, archived: 0 });

  const fetchListMail = async () => {
    if (!session?.access_token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/alerts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setListEmail(data);
        const total = data.length;
        const unread = data.filter((item: IMail) => !item.is_read).length;
        const archived = data.filter((item: IMail) => item.archived).length;
        setCounts({ total, unread, archived });
      } else {
        alert("Fetch mail thất bại");
      }
    } catch (error) {
      console.error("Fetch mail error:", error);
    }
  };

  useEffect(() => {
    if (session) fetchListMail();
  }, [session]);

  return (
    <MailContext.Provider value={{ listEmail, counts, fetchListMail }}>
      {children}
    </MailContext.Provider>
  );
};

export const useMailContext = () => {
  const context = useContext(MailContext);
  if (!context)
    throw new Error("useMailContext phải dùng bên trong MailProvider");
  return context;
};
