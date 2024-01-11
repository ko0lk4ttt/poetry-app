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

        console.log(user);

        if (!user || !bcrypt.compareSync(password, user.password)) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    jwt: true,
  },
});

export { handler as GET, handler as POST };
