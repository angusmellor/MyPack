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
    console.log(addedPack)
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

const getPack = async (packId: number) => {
  try {
    const pack = await prisma.pack.findUnique({
     where: {
      id: packId
     }
    });
    return pack;
  } catch (e) {
    console.log(e)
  }
}

export const packModel = { addPack, getAll, getPackItems, getPack }