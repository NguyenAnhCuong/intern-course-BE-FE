import { MailProvider } from "./context/mail.context";
import { SidebarProvider } from "./context/sidebar.admin.context";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <MailProvider>{children}</MailProvider>
  </SidebarProvider>
);
