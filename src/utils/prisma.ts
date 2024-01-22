import { PrismaClient } from "@prisma/client";

let client: PrismaClient | undefined;

const getClient = () => {
  if (!client) {
    client = new PrismaClient();
  }

  return client;
}

const prisma = getClient();

export default prisma;
