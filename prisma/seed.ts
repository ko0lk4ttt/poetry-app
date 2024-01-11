const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("logburner", 10);
  
  const u = await prisma.user.upsert({
    where: { email: "chris@giffgaff.co.uk" },
    update: {},
    create: {
      name: "Chris",
      email: "chris@giffgaff.co.uk",
      password: password,
      isAdmin: true,
    },
  });

  console.log(await bcrypt.compare('logburner', u.password))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })