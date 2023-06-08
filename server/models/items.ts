import { prisma } from './db';
import { Item } from '../types';

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
const getAll = async () => {
  try {
    const allItems = await prisma.item.findMany();
    return allItems
  } catch (e) {
    console.log(e);
  }
}

export const itemModel = {addItem, getAll}