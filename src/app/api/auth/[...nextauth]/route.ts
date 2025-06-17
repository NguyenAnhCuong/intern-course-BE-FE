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
    // Credential({

    // })
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn" && account?.provider === "github") {
        // Nếu chưa có token.user thì khởi tạo nó
        token.user = {
          name: user.name,
          email: user.email,
          image: user.image,
        };
        if (token.user.email === "cuong1606x@gmail.com") {
          token.user.role = "ADMIN"; // Gán role tại đây
        } else {
          token.user.role = "USER"; // Gán role tại đây
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      if (token.user) {
        session.user.role = token.user.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
