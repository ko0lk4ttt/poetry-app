import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import z from "zod";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        
        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
          return null;
        }

        return { id: user.id, email: user.email, name: user.name };
      },
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    jwt: true,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn", user, account, profile, email, credentials);
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect", url, baseUrl);
      return baseUrl
    },
    async session({ session, user, token }) {
      console.log("session", session, user, token);
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwt", token, user, account, profile, isNewUser);
      return token
    }
  }
});

export { handler as GET, handler as POST };
