import { Compass, Plus, X } from 'lucide-react';
import { Button } from './ui/button'
import { PackForm } from './packForm';
import { PackImage } from './packImage';
import { Card, CardContent } from './ui/card';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { apiService } from '../apiService';
import { Pack } from '../lib/types';
import { useParams } from 'react-router-dom';
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

export function UserAllPacks ({className}: UserPacksProps) {

  const { userId } = useParams();
  const [ showForm, setShowForm ] = useState(false);
  const [ userPacks, setUserPacks ] = useState<Pack[]>([]);
  const [ packImgRatios, setPackImgRatios] = useState<number[][]>([[]])

  const handleClick = () => {
    setShowForm (() => showForm? false : true)
  }

  useEffect( () => {

    const getRatioData = async () => {
      try {
        const userPackList = await apiService.getUserPacks(Number(userId));
        const packList = userPackList[0].packs;
        setUserPacks(packList);
        
        const allPacksItems = await Promise.all(
          packList.map( async (pack: Pack) => {
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
    }
    getRatioData();

  },[userId])

  return (
    <div className={className}>
      <div  className='flex flex-row flex-wrap '>
        { (userPacks.length && packImgRatios[0].length) && userPacks.map((pack: Pack, i) => {
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
        <div className='w-1/3 flex justify-center items-center h-40'>
          <div className={cn(`${showForm? 'hidden' : 'block'}`)}>
            <Button variant="outline" className="w-10 rounded-full p-0" onClick={handleClick}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className={cn(`${showForm? 'block' : 'hidden'}`)}>
            <Card className=' p-2'>
              <CardContent className='flex-col first:ml-max'>
                <div className='flex justify-end'>
                  <Button className=' max-w-min' size='sm' variant='secondary' onClick={handleClick}>
                    <X className='min-w-min'/>
                  </Button>
                </div>
                <PackForm 
                  setUserPacks={setUserPacks} 
                  userPacks={userPacks} 
                  userId={Number(userId)} 
                  setShowForm={setShowForm}
                  showForm={showForm}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}