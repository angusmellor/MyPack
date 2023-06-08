import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

const categories: Prisma.CategoryNameCreateInput[] = [
  {category: 'Big Four'},
  {category: 'Cook System'},
  {category: 'Electronics'},
  {category: 'Clothing'},
  {category: 'Miscellaneous'}
]

const userData: Prisma.UserCreateInput[] = [
  { email: 'angus@example.com'},
  { email: 'orla@example.com'},
  { email: 'skurka@example.com'}
]

async function main() {
  console.log('Start seeding ...');
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u
    })
  }
  console.log('Users added')
  for (const c of categories) {
    const categories = await prisma.categoryName.create({
      data: c
    })
  }
  console.log('Categories added')
  console.log('Seeding finished.')
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })