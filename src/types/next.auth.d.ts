import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    access_token: string;
    refresh_token: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "ADMIN" | "USER";
      password?: string | null;
    };
  }
}

declare module "next-auth" {
  interface Session {
    access_token: string;
    refresh_token: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "ADMIN" | "USER";
      password?: string | null;
    };
  }
}
