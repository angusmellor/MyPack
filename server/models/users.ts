import { prisma } from './db';

const getItems = async (userId: number) => {
  try {
    const userItems = await prisma.user.findMany({
      where: {
        id: userId
      },
      select: {
        items: true
      }
    })
    return userItems
  } catch (e) {
    console.log(e);
  }
}

const getPacks = async (userId: number) => {
  try {
    const userPacks = await prisma.user.findMany({
      where: {
        id: userId
      },
      select: {
        packs: true
      }
    })
    return userPacks
  } catch (e) {
    console.log(e);
  }
}

export const userModel = { getItems, getPacks }