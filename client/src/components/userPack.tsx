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

type UserPackProps = {
  className?: string
}

export function UserPack({className}: UserPackProps) {

  const userId = useContext(userContext)

  const defaultPack: Pack = {userId: userId, name: '', trail: ''}
  const { packId } = useParams();
  const [ packItems, setPackItems ] =  useState<Item[]>([]);
  const [ categories , setCategories ] =useState<Cat[]>([]);
  const [ packInfo, setPackInfo ] = useState<Pack>(defaultPack)

  const getPack = async () => {
    const items = await apiService.getPackItems(Number(packId));
    const pack = await apiService.getPackById(Number(packId));
    const packItems = items[0].packItems;
    const packInfo = pack //check what is returned from postman
    setPackItems(packItems);
    setPackInfo(packInfo);
  };
  
  const getCategories = async () => {
    const cats = await apiService.getAll('categories')
    setCategories(cats)
  }
  useEffect( () => {
    getPack();
    getCategories()
  })

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
            <PackImage/>
            <div>
              <Tabs defaultValue="summary" className="">
                <TabsList>
                  <TabsTrigger value="summary" className=" text-xs">Summary</TabsTrigger>
                  <TabsTrigger value="categories" className=" text-xs">Categories</TabsTrigger>
                </TabsList>
                <TabsContent value="summary">
                  <Card className=" w-fit">
                    <CardContent className="mt-2 mb-2 space-y-2">
                      <h4 className="text-xs">Total Weight</h4>
                      <h4 className="text-xs">Worn Weight</h4>
                      <h4 className="text-xs">Base Weight</h4>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="categories">
                  <Card className=" w-fit">
                    <CardContent className="mt-2 mb-2 space-y-2">
                      {categories.map((cat, i) => {
                        return (
                          <div className="flex justify-start" key={i}> 
                            <div className={cn('rounded-full w-4', colorPalette[i], 'mx-2')} key={colorPalette[i]}></div>
                            <div className="text-xs" key={cat.id}>{cat.category}</div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="flex justify-start">
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
                <Badge variant="secondary" className=" mx-2 text ">{tag}</Badge>
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