import { prisma } from './db';
import { Item } from '../types';

const addItem = async (userId:number, item: Item) => {
  try {
    const addedItem = await prisma.item.create({
      data: {
        ...item,
        users: {
          connect:{
            id: userId
          }
        }
      }
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

const connectToUser = async(itemId: number, userId: number) => {
  try {
    const connectedUsers = await prisma.item.update({
      where: {
        id: itemId
      },
      data: {
        users: {
          connect: {
            id: userId
          }
        }
      },
      include: {
        users: true
      }
    })
    return connectedUsers
  } catch (e) {
    console.log(e);
  }
}

const connectToPack = async(itemId: number, packId: number) => {
  try {
    const connectedPacks = await prisma.item.update({
      where: {
        id: itemId
      },
      data: {
        packs: {
          connect: {
            id: packId
          }
        }
      },
      include: {
        packs: true
      }
    })
    return connectedPacks
  } catch (e) {
    console.log(e);
  }
}

export const itemModel = {addItem, getAll, connectToUser, connectToPack}