const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const users = [
  { name: "chris", password: "logburner", isAdmin: true },
  { name: "richie", password: "logburner", isAdmin: false },
];

async function main() {
  for (const user of users) {
    const password = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { name: user.name },
      update: {},
      create: {
        name: user.name,
        password: password,
        isAdmin: user.isAdmin,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
