import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Guess",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = {
        //   id: "1",
        //   name: "JS Smith",
        //   email: "jsmith@example.com",
        //   password: "123456",
        // };

        // if (
        //   credentials &&
        //   credentials.username === user.name &&
        //   credentials.password === user.password
        // ) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email, // CHỖ NÀY PHẢI TRÙNG VỚI BACKEND
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();

        if (res.ok && data) {
          // Trả lại thông tin user để lưu vào JWT
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            token: data.token,
          };
        }

        // Nếu login thất bại
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.access_token = token.access_token;
        session.user = token.user; // 👈 cập nhật đúng từ token
      }
      return session;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "signIn" && account?.provider !== "credentials") {
        token.user = {
          name: user.name,
          email: user.email,
          image: user.image,
          password: "123456",
          role: user.email === "cuong1606x@gmail.com" ? "ADMIN" : "USER",
        };
      }

      if (trigger === "signIn" && account?.provider === "credentials") {
        //@ts-ignore
        token.access_token = user.token;
        token.user = {
          name: user.name,
          email: user.email,
          //@ts-ignore
          role: user.role,
        };
      }

      if (trigger === "update" && session?.user) {
        token.user = {
          ...token.user,
          ...session.user,
        };
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
