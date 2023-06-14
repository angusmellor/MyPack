import { Compass} from 'lucide-react';
import { PackImage } from './packImage';
import { useState, useEffect } from 'react';
import { apiService } from '../apiService';
import { Pack } from '../lib/types';
import { Item } from '../lib/types';

type UserPacksProps = {
  className?: string
}
function calcRatios(items: Item[]) {
  const ratios = [0,0,0,0,0];
  let total = 0;
  items.forEach( (item) => {
    ratios[item.categoryId - 1] += item.weight;
    total += item.weight
  });
  const newRatios = ratios.map((ratio) => {return ratio / total})
  return total === 0 ? ratios : newRatios
}

export function communityPacks ({className}: UserPacksProps) {

  const [ allPacks, setAllPacks ] = useState<Pack[]>([]);
  const [ packImgRatios, setPackImgRatios] = useState<number[][]>([[]])


  useEffect( () => {

    const getRatioData = async () => {
      try {
        const commPackList = await apiService.getAll('packs');
        setAllPacks(commPackList);
        
        const allPacksItems = await Promise.all(
          allPacks.map( async (pack: Pack) => {
            const items = await apiService.getPackItems(pack.id)
            return items[0].packItems
          })
        )

        const packRatios = allPacksItems.map( (itemList) => {
          return calcRatios(itemList)
        })

        setPackImgRatios(packRatios)

      } catch (e) {
        console.log(e)
      }
    getRatioData();
    }

  },[])

  return (
    <div className={className}>
      <div  className='flex flex-row flex-wrap '>
        { (allPacks.length && packImgRatios[0].length) && allPacks.map((pack: Pack, i) => {
          console.log(packImgRatios)
          return (
            <div key={pack.name} className='w-1/3 flex justify-center mb-5'>
              <div className='w-fit flex flex-col justify-center max-w-max'>
                <a href={`/pack/${pack.id}`}>
                  <PackImage packId={pack.id} ratio={packImgRatios[i]}/>
                  <h4 className='font-bold'>{pack.name}</h4>
                  <div className="flex justify-start items-center">
                    <Compass className=" h-4"/>
                    <div className=" text-sm">{pack.trail}</div>
                  </div>
                </a>
              </div>
            </div>
          )})
        }
        </div>
      </div>
  )
}