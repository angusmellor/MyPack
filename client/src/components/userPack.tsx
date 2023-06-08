import { Pack } from "../lib/types";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Compass, Plus } from 'lucide-react'
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "./ui/badge";
import packImgUrl from "../assets/backpack.png"

type UserPackProps = {
  className: string
  pack?: Pack
}

export function UserPack({className, pack}: UserPackProps) {

  const [packInfo, setPackInfo] = useState(pack);

  const testPack = {
    id: 1,
    trail: 'Te Aoroa',
    tags: [
      'Summer'
    ],
    name: 'The Dream'
  }

  return (
      <div className={cn("px-1", className)}>
        <div className="flex justify-start items-center">
          <h1 className=" text-lg font-bold mr-4" >{testPack.name}</h1>
          <Compass className=" h-4"/>
          {testPack.trail}
        </div>
        <div className="flex justify-start my-2">
          <div className="mr-8">
            <img src={packImgUrl} className=" h-40 min-w-min"></img>
          </div>
          <div>
          <Tabs defaultValue="summary" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">Pack Summary</TabsContent>
            <TabsContent value="categories">Category Breakdown</TabsContent>
          </Tabs>
          </div>
        </div>
        <div className="flex justify-start">
          {testPack.tags.map((tag) => {
              return <Badge variant="secondary" className=" mx-2">{tag}</Badge>
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