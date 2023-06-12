import { cn } from "../lib/utils";
import { Compass, Plus } from 'lucide-react'
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { PackItems } from "./PackItems";
import { PackImage } from "./packImage";
import { GearStoreBar } from "./gearStoreBar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Item, Cat, Pack } from "../lib/types";
import { apiService } from "../apiService";
import { userContext } from "../userContext";
import { Separator } from "./ui/seperator";

type UserPackProps = {
  className?: string
}

function calcRatios(items: Item[]) {
  const ratios = [0,0,0,0,0];
  console.log(ratios)
  let total = 0;
  items.forEach( (item) => {
    ratios[item.categoryId - 1] += item.weight;
    total += item.weight
  });
  console.log(ratios)
  const newRatios = ratios.map((ratio) => {return ratio / total})
  console.log(newRatios)
  return newRatios
}


export function UserPack({className}: UserPackProps) {
  
  const userId = useContext(userContext)
  const defaultPack: Pack = {id: 1 , userId: userId, name: '', trail: ''}
  const { packId } = useParams();
  const [ packItems, setPackItems ] =  useState<Item[]>([]);
  const [ categories , setCategories ] = useState<Cat[]>([]);
  const [ packInfo, setPackInfo ] = useState<Pack>(defaultPack);
  const [ ratio, setRatio ]= useState([0,0,0,0,0]);
  
  useEffect( () => {
    const getPack = async (packId: number) => {
      const items = await apiService.getPackItems(packId);
      const pack = await apiService.getPackById(packId);
      const packItems = items[0].packItems;
      setPackInfo(pack);
      setPackItems(packItems);
      setRatio(calcRatios(packItems));
    };
    getPack(Number(packId));
  }, []);

  useEffect( () => {
    const getCategories = async () => {
      const cats = await apiService.getAll('categories');
      setCategories(cats);
    }
    getCategories();
  },[])

  const colorPalette = [ 'bg-custBlue', 'bg-custBlue2', 'bg-custGreen', 'bg-custPink', 'bg-custPurp', 'bg-custBrown', 'bg-custOrng']
  const tagList = ['Winter', 'Summer', 'Group' , 'Female', 'Solo']

  return (
    <div className={cn("px-1 flex flex-row justify-end", className)}>
      <div className="w-full flex justify-center">
        <div className="w-fit">
          <div className="flex justify-start items-center">
            <h1 className=" text-2xl font-bold mr-4" >{packInfo.name}</h1>
            <Compass className=" h-4"/>
            <h3 className=" text-sm">{packInfo.trail}</h3>
          </div>
          <div className="flex justify-start my-2">
            <PackImage packId={Number(packId)} ratio={ratio} />
            <div className="ml-5">
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
                        <h4 className="text-xs">0.5 kg</h4>
                      </div>
                      <div className="flex justify-between">
                        <h4 className="text-xs font-semibold">Worn Weight</h4>
                        <h4 className="text-xs">0.5 kg</h4>
                      </div>
                      <Separator/>
                      <div className="flex justify-between">
                        <h4 className="text-xs font-semibold">Base Weight</h4>
                        <h4 className="text-xs">0.5 kg</h4>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="categories">
                  <Card className=" w-full">
                    <CardContent className="mt-2 mb-2 space-y-2">
                      {categories.map((cat, i) => {
                        return (
                          <div className="flex justify-between">
                            <div className="flex justify-start" key={i}> 
                              <div className={cn('rounded-full w-4', colorPalette[i], 'mx-2')} key={colorPalette[i]}></div>
                              <div className="text-xs font-semibold" key={cat.id}>{cat.category}</div>
                           </div>
                            <h4 className="text-xs">0.5 kg</h4>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="flex justify-start my-2">
            {tagList.map((tag) => {
                return packInfo[`is${tag}`] ?
                <Badge variant="secondary" className=" mx-2 text ">{tag}</Badge> :
                null
            })}
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" className="w-10 rounded-full p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
              {tagList.map((tag) => {
                return packInfo[`is${tag}`] ?
                null :
                <Badge key={tag} variant="secondary" className=" mx-2 text ">{tag}</Badge>
              })}
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <PackItems items={packItems} categories={categories}/>
          </div>
        </div>
      </div>
      <GearStoreBar categories={categories} />
    </div>
  )
}