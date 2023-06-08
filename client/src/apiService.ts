const serverURL = 'http://localhost:3005/'

type GetArg = 'items' | 'packs' | 'names' | 'categories'

const getUserItems = async (user_id: number) => {
  try {
    const res = await fetch(serverURL + user_id + '/items')
    const items = await res.json();
    console.log('Success: ', items );
    return items;
  } catch (e) {
    console.log('Error :', e)
  }
}

const getUserPacks = async (user_id: number) => {
  try {
    const res = await fetch(serverURL + user_id + '/packs')
    const packs = await res.json();
    console.log('Success: ', packs );
    return packs;
  } catch (e) {
    console.log('Error :', e)
  }
}

const getAll = async (param: GetArg) => {
  try {
    const res = await fetch (serverURL + `/${param}`);
    const result = await res.json();
    console.log('Success ', result);
    return result;
  } catch (e) {
    console.log('Error :', e)
  }
}

export const apiService = { 
  getUserItems, 
  getUserPacks, 
  getAll
}