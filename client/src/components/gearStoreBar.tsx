import { Warehouse, X } from "lucide-react"
import { GearSearch } from "./gearSearch"
import { Button } from "./ui/button"
import { useState } from "react"
import { cn } from "../lib/utils";
import { Cat } from "../lib/types";

type GearStoreBarProps ={
  className?: string
  categories: Cat[]
}

export function GearStoreBar({className, categories}:GearStoreBarProps) {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(() => isOpen ? false : true);
  }
  
  return (
    <div className={cn({className},"flex flex-col items-end ")}>
      <Button size="sm" variant="default" className=" justify-start text-xs min-w-min" onClick={handleClick}>
        <Warehouse className={cn(`${isOpen? 'hidden' : 'block'}`,'min-w-min')} />
        <X className={cn(`${isOpen? 'block' : 'hidden'}`,'min-w-min')}/>
      </Button>
      <GearSearch categories={categories} className={cn(`${isOpen? 'block' : 'hidden'}`,"")}/>
    </div>
  )
}