import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

const categories: Prisma.CategoryNameCreateInput[] = [
  {category: 'Cook System'},
  {category: 'Big Four'},
  {category: 'Electronics'},
  {category: 'Clothing'},
  {category: 'Miscellaneous'}
]

const itemNames: Prisma.ItemNameCreateInput[] = [
  {name: 'Pack'},
  {name: 'Sleeping Bag'},
  {name: 'Sleeping Mat'},
  {name: 'Tent'},
  {name: 'Bear Can'},
  {name: 'Pegs'},
  {name: 'Dry Bag'},
  {name: 'Phone'},
  {name: 'Battery'},
  {name: 'Shoes'},
  {name: 'Shorts'},
  {name: 'Shirt'},
  {name: 'Hat'},
  {name: 'Stove'},
  {name: 'Pot'},
  {name: 'Spoon'},
  {name: 'Rain Jacket'},
  {name: 'Torch'}
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
  for (const i of itemNames) {
    const itemName = await prisma.itemName.create({
      data: i
    })
  }
  console.log('Item names added')
  console.log('Seeding finished.')
  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)

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