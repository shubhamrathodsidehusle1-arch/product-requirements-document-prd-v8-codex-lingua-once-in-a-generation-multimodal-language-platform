import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db";
import { users } from "@/db/schema";

const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const existingUser = await db
          .select()
          .from(users)
          .limit(1);

        const user = existingUser.find(u => u.email === email);
        
        if (user) {
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.displayName,
          };
        }

        const [newUser] = await db
          .insert(users)
          .values({
            email,
            authProvider: "credentials",
            displayName: email.split("@")[0],
          })
          .returning();

        return {
          id: newUser.id.toString(),
          email: newUser.email,
          name: newUser.displayName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
});

export { handlers, signIn, signOut, auth };