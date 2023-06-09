import { Pack } from "../lib/types";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Compass, Plus } from 'lucide-react'
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "./ui/badge";
import packImgUrl from "../assets/backpack.png"
import { Card, CardContent } from "./ui/card";

type UserPackProps = {
  className: string
  pack?: Pack
}

function showPackColors (ratios: number[] ) {
  ratios.forEach((ratio, i) => {
    const height = ratio * 160;
    let sum = 0;
    ratios.slice(0,i).forEach( num => {
      sum += num;
    })
    const position = sum * 160;
    document.getElementById(`${i}`).style.height = height + 'px';
    document.getElementById(`${i}`).style.top = position + 'px';
  })
}

export function UserPack({className, pack}: UserPackProps) {

  const [packInfo, setPackInfo] = useState(pack);

  useEffect(() => {
    showPackColors(ratios)
  })

  const testPack = {
    id: 1,
    trail: 'Te Aoroa',
    tags: [
      'Summer'
    ],
    name: 'The Dream'
  }

  const categories = ['Big Four', 'Cook System', 'Clothing', 'Electronics', 'Miscellaneous']

  const colorPalette = [ 'bg-custBlue', 'bg-custBlue2', 'bg-custGreen', 'bg-custPink', 'bg-custPurp', 'bg-custBrown', 'bg-custOrng']


  const ratios = [0.2, 0.35, 0.1, 0.2, 0.15];

  return (
    <div className={cn("px-1", className)}>
      <div className="flex justify-start items-center">
        <h1 className=" text-2xl font-bold mr-4" >{testPack.name}</h1>
        <Compass className=" h-4"/>
        <div className=" text-sm">{testPack.trail}</div>
      </div>
      <div className="flex justify-start my-2">
        <div className=" w-1/5">
          <div className="mr-8 relative w-1/5">
          {ratios.map((rat, i) => {
              return <div id={`${i}`} className={cn('w-[114px] -z-10 absolute', colorPalette[i])}>
                </div>
            })}
            <img src={packImgUrl} className=" h-40 min-w-min"></img>
          </div>
        </div>
        <div>
        <Tabs defaultValue="summary" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="summary" className=" text-xs">Summary</TabsTrigger>
            <TabsTrigger value="categories" className=" text-xs">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <Card>
              <CardContent className="mt-2 mb-2 space-y-2">
                {categories.map((cat, i) => {
                  return (
                    <div className="flex justify-start" key={i}> 
                      <div className={cn('rounded-full w-4', colorPalette[i], 'mx-2')} key={colorPalette[i]}></div>
                      <div className="text-xs" key={categories[i]}>{cat}</div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories">Category Breakdown</TabsContent>
        </Tabs>
        </div>
      </div>
      <div className="flex justify-start">
        {testPack.tags.map((tag) => {
            return <Badge variant="secondary" className=" mx-2 text ">{tag}</Badge>
          })
        }
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" className="w-10 rounded-full p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>Tag list</PopoverContent>
        </Popover>
      </div>
      <div>
        tables
      </div>
    </div>
  )
}