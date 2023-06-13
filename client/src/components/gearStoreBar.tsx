import { Warehouse, X } from "lucide-react"
import { GearSearch } from "./gearSearch"
import { Button } from "./ui/button"
import { useState } from "react"
import { cn } from "../lib/utils";
import { Cat } from "../lib/types";
import { Card, CardContent } from "./ui/card";

type GearStoreBarProps ={
  className?: string
  categories: Cat[]
}

export function GearStoreBar({className}:GearStoreBarProps) {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(() => isOpen ? false : true);
  }
  
  return (
    <div className={cn({className},"flex flex-col items-end position relative ")}>
      <Button size="sm" variant="default" className=" justify-start text-xs min-w-min absolute mx-4 my-2" onClick={handleClick}>
        <Warehouse className={cn(`${isOpen? 'hidden' : 'block'}`,'min-w-min')} />
        <X className={cn(`${isOpen? 'block' : 'hidden'}`,'min-w-min')}/>
      </Button>
      <Card className={cn(`${isOpen? 'block' : 'hidden'}`,"mx-2")}>
        <CardContent className="p-2">
          <GearSearch/>
        </CardContent>
      </Card>
    </div>
  )
}