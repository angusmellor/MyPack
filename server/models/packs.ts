import { prisma } from './db';
import { Pack } from '../types';

const getAll = async () => {
  try {
    const allPacks = await prisma.pack.findMany();
    return allPacks
  } catch (e) {
    console.log(e);
  }
}

const addPack = async (pack: Pack) => {
  try {
    const addedPack = await prisma.pack.create({
      data: pack
    })
    return addedPack;
  } catch (e) {
    console.log(e);
  }
}

const getPackItems = async (packId: number) => {
  try {
    const packItems = await prisma.pack.findMany({
     where: {
      id: packId
     },
     select: {
      packItems: true
     }
    });
    return packItems;
  } catch (e) {
    console.log(e)
  }
}

export const packModel = { addPack, getAll, getPackItems }