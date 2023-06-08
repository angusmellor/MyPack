import { Backpack, LayoutList } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export function SideBar({className}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-4", className)}>
      <h2 className="mb-2 text-lg font-bold"> MyPack </h2>
      <div>
        <Button size="sm" variant="secondary" className="w-full justify-start">
          <Backpack className=" mr-2 " />
          My Backpacks
        </Button>
      </div>
      <div className=" mt-2 ">
        <Button size="sm" variant="secondary" className="w-full justify-start">
          <LayoutList className=" mr-2 " />
          My Gear
        </Button>
      </div>
      <div className=" my-2 ">
        <Button size="sm" variant="default" className="w-full justify-start">
          <Backpack className=" mr-2 " />
          Comminity Backpacks
        </Button>
      </div>      
      <div className=" mt-2 ">
        <Button size="sm" variant="default" className="w-full justify-start">
          <LayoutList className=" mr-2 " />
          Comminity Gear
        </Button>
      </div>
    </div>
  )
}