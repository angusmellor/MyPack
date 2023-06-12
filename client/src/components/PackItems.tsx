import {Table, TableBody,TableCaption, TableCell, TableHead, TableHeader, TableRow} from "./ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { ItemForm } from './itemForm';
import { useParams } from "react-router-dom";
import { Item, Cat } from "../lib/types";

type UserItemsProps = {
  className?: string
  items: Item[]
  categories: Cat[]
}

export function PackItems({className, items, categories}: UserItemsProps) {

  const { packId } = useParams();
  
  return (
    <div className={className}>
      {categories.map((cat) => {
        return (
          <div>
            <h4>{cat.category}</h4>
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
                      <TableRow>
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
