import { FilterTable } from "./filterTable"
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs"
import { columns, itemTestData } from "./Tables/itemsColumns"
import { UserItems } from "./userItems"
import { cn } from "../lib/utils"

type GearSearchProps = {
 className?: string
}

export function GearSearch ({className}: GearSearchProps) {

  return (
    <div className={cn("", className)}>
      <Tabs className=' flex flex-col items-center' defaultValue='userGear'>
        <TabsList className="w-min">
          <TabsTrigger value="userGear" className= " text-xs ">My Gear</TabsTrigger>
          <TabsTrigger value="commGear" className=" text-xs ">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="userGear">
          <UserItems />
        </TabsContent>
        <TabsContent value="commGear">
          <FilterTable columns={columns} data={itemTestData}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}