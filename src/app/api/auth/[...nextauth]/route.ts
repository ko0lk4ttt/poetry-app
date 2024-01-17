import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import z from "zod";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ name: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { name, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { name: name },
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.sub = user.id;
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      session.user.id = token.sub;
      console.log('session', session)
      console.log('token', token)
      console.log('user', user)
      return session;
    }
  }
});

export { handler as GET, handler as POST };
