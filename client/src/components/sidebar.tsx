import { Backpack, LayoutList } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export function SideBar({className}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 w-max ", className)}>
      <div>
        <Button size="sm" variant="secondary" className=" w-full justify-start text-xs min-w-max">
          <Backpack className=" mr-2 min-w-min " />
          My Packs
        </Button>
      </div>
      <div>
        <Button size="sm" variant="secondary" className="w-full justify-start text-xs min-w-max">
          <LayoutList className=" mr-2 min-w-min" />
          My Gear
        </Button>
      </div>
      <div>
        <Button size="sm" variant="default" className=" w-full justify-start text-xs min-w-max">
          <Backpack className=" mr-2 min-w-min " />
          Comminity Packs
        </Button>
      </div>      
      <div>
        <Button size="sm" variant="default" className=" w-full justify-start text-xs min-w-max">
          <LayoutList className=" mr-2 min-w-min" />
          Comminity Gear
        </Button>
      </div>
    </div>
  )
}