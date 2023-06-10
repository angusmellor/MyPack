import { Backpack, LayoutList } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export function SideBar({className}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 w-max col-span-3 space-y-2 ", className)}>
      <div>
        <a href= {'/packs'}>
          <Button size="sm" variant="secondary" className=" w-full justify-start text-xs min-w-max">
            <Backpack className=" mr-2 min-w-min " />
            My Packs
          </Button>
        </a>
      </div>
      <div>
        <a href = {'/gear/user'}>
          <Button size="sm" variant="secondary" className="w-full justify-start text-xs min-w-max">
            <LayoutList className=" mr-2 min-w-min" />
            My Gear
          </Button>
        </a>
      </div>
      <div>
        <a href = {'/test'}>
          <Button size="sm" variant="default" className=" w-full justify-start text-xs min-w-max">
            <Backpack className=" mr-2 min-w-min " />
            Community Packs
          </Button>
        </a>
      </div>      
      <div>
        <a href = {'/gear/community'}>
          <Button size="sm" variant="default" className=" w-full justify-start text-xs min-w-max">
            <LayoutList className=" mr-2 min-w-min" />
            Community Gear
          </Button>
        </a>
      </div>
    </div>
  )
}