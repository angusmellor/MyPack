import { Item, NewPack, Pack } from "./lib/types";

const serverURL = 'http://localhost:3001/';

type GetReqArg = 'items' | 'packs' | 'categories';

const getUserItems = async (userId: number) => {
  try {
    const res = await fetch(serverURL + 'users/' + userId + '/items')
    const items = await res.json();
    console.log('Success: ', items );
    return items;
  } catch (e) {
    console.log('Error :', e)
  }
}

const getUserPacks = async (userId: number) => {
  try {
    const res = await fetch(serverURL + 'users/' + userId + '/packs');
    const packs = await res.json();
    console.log('Success: ', packs );
    return packs;
  } catch (e) {
    console.log('Error :', e)
  }
}

const getPackItems =async (packId: number) => {
  try {
    const res = await fetch(serverURL + 'packs/' + packId + '/items');
    const items = await res.json();
    console.log('Sucess: ', items);
    return items
  } catch (e) {
    console.log('Error: ', e)
  }
}

const getPackById = async (packId: number) => {
    try {
      const res = await fetch(serverURL + 'packs/' + packId);
      const pack = await res.json();
      console.log('Sucess: ', pack);
      return pack
    } catch (e) {
      console.log('Error: ', e)
    }
}

const getAll = async (arg: GetReqArg) => {
  try {
    const res = await fetch (serverURL + arg);
    const result = await res.json();
    console.log('Success ', result);
    return result;
  } catch (e) {
    console.log('Error :', e);
  }
}

const addItem = async (item: Item, userId: number) => {
  try {
    const res = await fetch(serverURL + 'items', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({item: item, userId: userId})
    });
    const result = await res.json();
    return result
  } catch (e) {
    console.log('Error :', e);
  }
}

const addPack = async (pack: NewPack) => {
  try {
    const res = await fetch(serverURL + 'packs', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(pack)
    });
    const result = await res.json();
    return result
  } catch (e) {
    console.log('Error :', e);
  }
}

const connectItemToPack = async (itemId: number, packId: number) => {
  try {
    const res = await fetch( serverURL + `items/${itemId}/packs/${packId}`, {
      method: 'PUT'
    });
    const result = await res.json();
    return result
  } catch (e) {
    console.log('Error :', e);
  }
}

const connectItemToUser = async (itemId: number, userId: number) => {
  try {
    const res = await fetch( serverURL + `items/${itemId}/packs/${userId}`, {
      method: 'PUT'
    });
    const result = await res.json();
    return result
  } catch (e) {
    console.log('Error :', e);
  }
}

export const apiService = { 
  getUserItems, 
  getUserPacks,
  getPackItems, 
  getAll,
  addPack,
  addItem,
  connectItemToPack,
  connectItemToUser,
  getPackById
}

