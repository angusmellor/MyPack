import prisma from './db';

interface Item {
  nameId: number;
  categoryId: number;
  description: string;
  weight: number;
  cost?: number;
}

const addItem = async (item: Item) => {
  try {
    const addedItem = await prisma.item.create({
      data: item
    })
    return addedItem;
  } catch (e) {
    console.log(e);
  }
}
const getAllItems = async () => {
  try {
    const allItems = await prisma.item.findMany();
    return allItems
  } catch (e) {
    console.log(e);
  }
}

export const itemModel = {addItem, getAllItems}