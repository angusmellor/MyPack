import { FilterTable1 } from "./filterTable1"
import { columns } from "./Tables/itemsColumns"
import { cn } from "../lib/utils"
import { useEffect, useState } from "react"
import { apiService } from "../apiService"

type GearSearchProps = {
 className?: string
}

export function CommunityGear ({className}: GearSearchProps) {


  const [allItems, setAllItems] = useState([])
  
  useEffect( () => {
    const getAllItems =async () => {
      try {
        const itemsAll = await apiService.getAll('items');
        console.log(itemsAll);
        setAllItems(itemsAll);
      } catch (e) {
        console.log(e)
      }
    }
    getAllItems();
  },[])


  return (
    <div className={cn("", className)}>
      <FilterTable1 data={allItems}/>
    </div>
  )
}