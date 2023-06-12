import { FilterTable } from "./filterTable"
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs"
import { columns, itemTestData } from "./Tables/itemsColumns"
import { AllUserItems } from "./allUserItems"
import { cn } from "../lib/utils"
import { Cat } from "../lib/types"

type GearSearchProps = {
 className?: string
 categories: Cat[]
}

export function GearSearch ({className, categories}: GearSearchProps) {

  return (
    <div className={cn("", className)}>
      <Tabs className=' flex flex-col items-center' defaultValue='userGear'>
        <TabsList className="w-min">
          <TabsTrigger value="userGear" className= " text-xs ">My Gear</TabsTrigger>
          <TabsTrigger value="commGear" className=" text-xs ">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="userGear">
          <AllUserItems categories={categories} />
        </TabsContent>
        <TabsContent value="commGear">
          <FilterTable columns={columns} data={itemTestData}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}