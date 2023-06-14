import { FilterTable } from "./filterTable"
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs"
import { cn } from "../lib/utils"
import { useEffect, useState, useContext } from "react"
import { apiService } from "../apiService"
import { userContext } from "../userContext"
import { columns } from "./Tables/itemsColumns"

type GearSearchProps = {
 className?: string
}

export function GearSearch ({className}: GearSearchProps) {

  const userId = useContext(userContext);

  const [allItems, setAllItems] = useState([])
  const [userItems, setUserItems] = useState([]);
  
  useEffect( () => {
    const getAllItems =async () => {
      try {
        const itemsAll = await apiService.getAll('items');
        console.log(itemsAll);
        const itemsUser = await apiService.getUserItems(userId)
        console.log(itemsUser)
        setAllItems(itemsAll);
        setUserItems(itemsUser[0].items)
      } catch (e) {
        console.log(e)
      }
    }
    getAllItems();
  },[userId])


  return (
    <div className={cn("", className)}>
      <Tabs className=' flex flex-col items-center' defaultValue='userGear'>
        <TabsList className="w-min">
          <TabsTrigger value="userGear" className= " text-xs ">My Gear</TabsTrigger>
          <TabsTrigger value="commGear" className=" text-xs ">Community Gear</TabsTrigger>
        </TabsList>
        <TabsContent value="userGear">
          <FilterTable columns={columns} data={userItems}/>
        </TabsContent>
        <TabsContent value="commGear">
          <FilterTable columns={columns} data={allItems}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}