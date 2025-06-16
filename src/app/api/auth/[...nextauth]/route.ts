import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn" && account?.provider === "github") {
        console.log(">>>user", user);
        console.log(">>>token", token);
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log(">>>session", session);
      console.log(">>>token", token);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
