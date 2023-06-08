import { prisma } from './db';

const getAll = async () => {
  try {
    const allCats = await prisma.categoryName.findMany();
    return allCats
  } catch (e) {
    console.log(e);
  }
}

export const catModel = { getAll}