import { cn } from "../../lib/utils";
import { Compass, Plus } from 'lucide-react'
import { Button } from "../../components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { PackItems } from "../../components/PackItems";
import { PackImage } from "../../components/packImage";
import { GearStoreBar } from "../../components/gearStoreBar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState} from "react";
import { Item, Cat, Pack } from "../../lib/types";
import { apiService } from "../../apiService";
import { userContext } from "../../userContext";
import { Separator } from "../../components/ui/seperator";

type UserPackProps = {
  className?: string
}

function calcRatios(items: Item[]) {
  const ratios = [0,0,0,0,0];
  let total = 0;
  items.forEach( (item) => {
    ratios[item.categoryId - 1] += Math.round(item.weight * 1000)/1000;
    total += item.weight
  });
  const newRatios = ratios.map((ratio) => {return ratio / total})
  console.log(ratios)
  return [newRatios, ratios]
}

export function UserPack({className}: UserPackProps) {
  
  const userId = useContext(userContext)
  const defaultPack: Pack = {id: 1 , userId: userId, name: '', trail: ''}
  const { packId } = useParams();
  const [ packItems, setPackItems ] =  useState<Item[]>([]);
  const [ categories , setCategories ] = useState<Cat[]>([]);
  const [ packInfo, setPackInfo ] = useState<Pack>(defaultPack);
  const [ ratio, setRatio ]= useState([0,0,0,0,0]);
  const [catWeights, setCatWeights] = useState([0,0,0,0,0])
  const [missingPackTags, setMissingPackTags] = useState<string[]>([])

  const tagList = ['Winter', 'Summer', 'Group' , 'Female', 'Solo']

 
  useEffect( () => {
    const getPack = async (packId: number) => {
      const items = await apiService.getPackItems(packId);
      const pack = await apiService.getPackById(packId);
      const packItems = items[0].packItems;
      setPackInfo(pack);
      setPackItems(packItems);
    };
    getPack(Number(packId));
  },[packId])

  useEffect( () => {
    const getCategories = async () => {
      const cats = await apiService.getAll('categories');
      setCategories(cats);
    }
    getCategories();
  },[])

  useEffect( () => {
    const newPackTags: string[] = [];
    tagList.map((tag) => {
      if (!packInfo[`is${tag}`]) {
        newPackTags.push(tag)
      }
    })
    console.log('here')
    setMissingPackTags(newPackTags)
  }, [packInfo])

  useEffect( () => {
    const [catRatios, catWeights] = calcRatios(packItems)
    setRatio(catRatios);
    setCatWeights(catWeights)
  },[packItems])

  const colorPalette = [ 'bg-custBlue', 'bg-custBlue2', 'bg-custGreen', 'bg-custPink', 'bg-custPurp', 'bg-custBrown', 'bg-custOrng']
 
  return (
    <>
      <div className={cn("px-1 flex flex-row justify-end", className)}>
        <div className="w-full h-full flex justify-center gap-10">
          <Card className="p-2 h-[85vh] overflow-auto">
            <PackItems setPackItems={setPackItems} items={packItems} categories={categories} colorPalette={colorPalette}/>
          </Card>
          <Card className="p-2 flex flex-col items-center h-fit">
            <div className="flex flex-col items-center">
              <h1 className=" text-2xl font-bold" >{packInfo.name}</h1>
              <div className='flex items-center'>
                <Compass className=" h-4"/>
                <h1 className=" text-sm">{packInfo.trail}</h1>
              </div>
            </div>
            <div className="flex justify-center my-2 w-full">
              <PackImage
                packId={Number(packId)} 
                ratio={ratio}
              />
            </div>
            <div className="flex w-full justify-around my-2">
              {tagList.map((tag) => {
                return packInfo[`is${tag}`] ?
                <Badge key={tag} variant="secondary">{tag}</Badge> :
                null
              })}
              <Popover>
                <PopoverTrigger>
                  <Button variant="outline" className="w-10 rounded-full p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  {missingPackTags.map((tag) => {
                    return (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className=" mx-2 text "
                        onClick={() => {
                          console.log({ ...packInfo, [`is${tag}`]: true,})
                          setPackInfo({[`is${tag}`]: true, ...packInfo})
                        }}
                      >
                        {tag}
                      </Badge>
                    )
                  })}
                </PopoverContent>
              </Popover>
            </div>
            <Tabs defaultValue="summary" className="">
              <TabsList>
                <TabsTrigger value="summary" className=" text-xs">Summary</TabsTrigger>
                <TabsTrigger value="categories" className=" text-xs">Categories</TabsTrigger>
              </TabsList>
              <TabsContent value="summary">
                <Card className=" w-full p-2">
                  <CardContent className="mt-2 mb-2 space-y-2">
                    <div className="flex justify-between">
                      <h4 className="text-xs font-semibold">Total Weight</h4>
                      <h4 className="text-xs">{catWeights.reduce((p, a) =>(a + p))} kg</h4>
                    </div>
                    <div className="flex justify-between">
                      <h4 className="text-xs font-semibold">Worn Weight</h4>
                      <h4 className="text-xs">{catWeights[3]} kg</h4>
                    </div>
                    <Separator/>
                    <div className="flex justify-between">
                      <h4 className="text-xs font-semibold">Base Weight</h4>
                      <h4 className="text-xs">{Math.round((catWeights.reduce((p, a) =>(a + p)) - catWeights[3])*1000)/1000} kg</h4>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="categories">
                <Card className=" w-full">
                  <CardContent className="mt-2 mb-2 space-y-2">
                    {categories.map((cat, i) => {
                      return (
                        <div className="flex justify-between" key={i}>
                          <div className="flex justify-start"> 
                            <div className={cn('rounded-full w-4', colorPalette[i], 'mx-2')} key={colorPalette[i]}></div>
                            <div className="text-xs font-semibold" key={cat.id}>{cat.category}</div>
                          </div>
                          <h4 className="text-xs">{Math.round(catWeights[i]*1000)/1000} kg</h4>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        <GearStoreBar setPackItems={setPackItems} categories={categories} />
      </div>
    </>
  )
}

