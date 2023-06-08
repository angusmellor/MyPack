import { prisma } from './db';
import { Pack } from '../types';

const addPack = async (pack: Pack) => {
  try{
    const addedPack = await prisma.pack.create({
      data: pack
    })
    return addedPack;
  } catch (e) {
    console.log(e);
  }
}
const getAll = async () => {
  try {
    const allPacks = await prisma.pack.findMany();
    return allPacks
  } catch (e) {
    console.log(e);
  }
}

const getUserPacks = async (userId: number) => {
  try {
    const userPacks = await prisma.pack.findMany({
      where: {
        userId: userId
      }
    })
    return userPacks
  } catch (e) {
    console.log(e);
  }
}

export const packModel = {addPack, getAll, getUserPacks}