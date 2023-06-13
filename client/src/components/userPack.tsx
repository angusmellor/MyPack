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
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

type UserPackProps = {
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

  const onDragEnd = (result: DropResult) => {
    const { destination, source} = result;
    const packImgElement = document.getElementById('AddItemOnDrag');
    
    if (packImgElement) {
      console.log('here')
      packImgElement.style.visibility = 'invisible';
    }

    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
  }

  const onDragStart = () => {
    const packImgElement = document.getElementById('AddItemOnDrag');
    if (packImgElement) {
      packImgElement.style.visibility = 'visible';
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} >
      <div className={cn("px-1 flex flex-row justify-end", className)}>
        <div className="w-full h-full flex justify-center gap-10">
          <Card className="p-2 h-[85vh] overflow-auto">
            <PackItems items={packItems} categories={categories} colorPalette={colorPalette}/>
          </Card>
          <Card className="p-2 flex flex-col items-center h-fit">
            <div className="flex justify-start items-center">
              <h1 className=" text-2xl font-bold" >{packInfo.name}</h1>
              <Compass className=" h-4"/>
              <h3 className=" text-sm">{packInfo.trail}</h3>
            </div>
            <div className="flex justify-start my-2">
              <Droppable droppableId="pack" >
                {(provided) => (
                  <div 
                    id='PackImg' 
                    className="flex justify-center relative"
                    ref={provided.innerRef}
                      {...provided.droppableProps}
                  >
                    <PackImage
                      packId={Number(packId)} 
                      ratio={ratio}
                    />
                    <div id='AddItemOnDrag' className="absolute bg-gray-400 w-full h-full flex items-center justify-center opacity-75 rounded-md invisible">
                        <Plus className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </Droppable>
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
                {tagList.map((tag) => {
                  return packInfo[`is${tag}`] ?
                  null :
                  <Badge key={tag} variant="secondary" className=" mx-2 text ">{tag}</Badge>
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
                        <div className="flex justify-between" key={i}>
                          <div className="flex justify-start"> 
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
          </Card>
        </div>
        <GearStoreBar categories={categories} />
      </div>
    </DragDropContext>
  )
}