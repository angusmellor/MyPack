import { Warehouse, X } from "lucide-react"
import { GearSearch } from "./gearSearch"
import { Button } from "./ui/button"
import { useState } from "react"
import { cn } from "../lib/utils";

export function GearStoreBar() {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(() => isOpen ? false : true);
  }
  
  return (
    <div className="flex flex-col items-end ">
      <Button size="sm" variant="default" className=" justify-start text-xs min-w-min" onClick={handleClick}>
        <Warehouse className={cn(`${isOpen? 'hidden' : 'block'}`,'min-w-min')} />
        <X className={cn(`${isOpen? 'block' : 'hidden'}`,'min-w-min')}/>
      </Button>
      <GearSearch className={cn(`${isOpen? 'block' : 'hidden'}`,"")}/>
    </div>
  )
}