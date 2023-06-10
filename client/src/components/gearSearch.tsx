import { FilterTable } from "./filterTable"
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs"
import { columns, itemTestData } from "./Tables/itemsColumns"
import { UserItems } from "./userItems"

type GearSearchProps = {
 className: string
}

export function GearSearch ({className}: GearSearchProps) {

  return (
    <div className={className}>
      <Tabs defaultValue='userGear'>
        <TabsList>
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