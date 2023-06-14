import {Table, TableBody,TableCaption, TableCell, TableHead, TableHeader, TableRow} from "./ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { ItemForm } from './itemForm';
import { useParams } from "react-router-dom";
import { Item, Cat } from "../lib/types";
import { cn } from "../lib/utils";

type UserItemsProps = {
  className?: string
  items: Item[]
  categories: Cat[],
  colorPalette: string[],
  setPackItems: React.Dispatch<React.SetStateAction<Item[]>>
}

export function PackItems({className, items, categories, colorPalette, setPackItems}: UserItemsProps) {

  const { packId } = useParams();
  
  return (
    <div className={className}>
      {categories.map((cat, i) => {
        return (
          <div key={cat.category}>
            <div className="flex h-fit justify-start items-center"> 
              <div className={cn('rounded-full h-4 w-4', colorPalette[i], 'mx-2')} key={colorPalette[i]}></div>
              <h3 className="font-semibold" key={cat.id}>{cat.category}</h3>
            </div>
            <Table>
              <TableCaption>
                <Popover>
                  <PopoverTrigger>
                    <Button variant="outline" className="w-10 rounded-full p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='flex justify-start'>
                    <ItemForm 
                      packId={Number(packId)} 
                      categoryId={cat.id}
                      setPackItems={setPackItems}
                  />
                  </PopoverContent>
                </Popover>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Desription</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => {
                  return (
                    item.categoryId === cat.id ?
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.weight}</TableCell>
                        <TableCell className="text-right">{item.cost}</TableCell>
                      </TableRow> :
                      null
                  )
                  })}
              </TableBody>
            </Table>
          </div>
        )
      })}
    </div>
  )
}

