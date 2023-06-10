import { cn } from "../lib/utils";
import { Compass, Plus } from 'lucide-react'
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { UserItems } from "./userItems";
import { PackImage } from "./packImage";

type UserPackProps = {
  className?: string
}

export function UserPack({className}: UserPackProps) {

  const testPack = {
    id: 1,
    trail: 'Te Araroa',
    tags: [
      'Summer'
    ],
    name: 'The Dream'
  }

  const categories = ['Big Four', 'Cook System', 'Clothing', 'Electronics', 'Miscellaneous']

  const colorPalette = [ 'bg-custBlue', 'bg-custBlue2', 'bg-custGreen', 'bg-custPink', 'bg-custPurp', 'bg-custBrown', 'bg-custOrng']

  return (
    <div className={cn("px-1", className)}>
      <div className="flex justify-start items-center">
        <h1 className=" text-2xl font-bold mr-4" >{testPack.name}</h1>
        <Compass className=" h-4"/>
        <div className=" text-sm">{testPack.trail}</div>
      </div>
      <div className="flex justify-start my-2">
        <PackImage/>
        <div>
        <Tabs defaultValue="summary" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="summary" className=" text-xs">Summary</TabsTrigger>
            <TabsTrigger value="categories" className=" text-xs">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <Card className=" w-fit">
              <CardContent className="mt-2 mb-2 space-y-2">
                <div className="text-xs">Total Weight</div>
                <div className="text-xs">Worn Weight</div>
                <div className="text-xs">Base Weight</div>
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
                      <div className="text-xs" key={categories[i]}>{cat}</div>
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
        <UserItems className='col-span-9'/>
      </div>
    </div>
  )
}