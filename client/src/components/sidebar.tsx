import { Backpack, LayoutList } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export function SideBar({className}: React.HTMLAttributes<HTMLDivElement>) {

  const testUserId = 2;

  return (
    <div className={cn("px-5 w-max col-span-3 space-y-2 group  ", className)}>
      <div>
        <a href= {`/packs/${testUserId}`}>
          <Button size="sm" variant="secondary" className=" w-full justify-start text-xs min-w-max">
            <Backpack className="min-w-min " />
            <div className="group-hover:block hidden ml-2">My Packs</div>
          </Button>
        </a>
      </div>
      <div>
        <a href = {`/gear/${testUserId}`}>
          <Button size="sm" variant="secondary" className="w-full justify-start text-xs min-w-max">
            <LayoutList className="min-w-min" />
            <div className="group-hover:block hidden ml-2">My Gear</div>
          </Button>
        </a>
      </div>
      <div>
        <a href = {'/packs/community'}>
          <Button size="sm" variant="default" className=" w-full justify-start text-xs min-w-max">
            <Backpack className="min-w-min " />
            <div className="group-hover:block hidden ml-2">Community Packs</div>
          </Button>
        </a>
      </div>      
      <div>
        <a href = {'/gear/community'}>
          <Button size="sm" variant="default" className=" w-full justify-start text-xs min-w-max">
            <LayoutList className="min-w-min" />
            <div className="group-hover:block hidden ml-2">Community Gear</div>
          </Button>
        </a>
      </div>
    </div>
  )
}