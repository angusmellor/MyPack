import {Table, TableBody,TableCaption, TableCell, TableHead, TableHeader, TableRow} from "./ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { ItemForm } from './itemForm';
import { useContext, useEffect, useState } from "react";
import { apiService } from "../apiService";
import { userContext } from "../userContext";
import { Cat, Item } from "../lib/types";
import { cn } from "../lib/utils";

type UserItemsProps = {
  className?: string
  showAdd: boolean
}

export function AllUserItems({className, showAdd}: UserItemsProps) {

  const [ userItems, setUserItems ] = useState<Item[]>([]);
  const [ categories, setCategories] = useState<Cat[]>([]);
  const userId = useContext(userContext);

  
  useEffect( () => {
    const getCategories = async () => {
      const cats = await apiService.getAll('categories')
      setCategories(cats)
    }
  
    const getUserItems = async () => {
      const userItemsList = await apiService.getUserItems(userId)
      setUserItems(userItemsList[0].items);
    };
    getUserItems();
    getCategories();
  },[])

  return (
    <div className={className}>
      {categories.map((cat) => {
        return (
          <div key={cat.category}>
            <h4>{cat.category}</h4>
            <Table>
              <TableCaption className={cn(`${showAdd? 'block' : 'hidden'}`)}>
                <Popover>
                  <PopoverTrigger>
                    <Button variant="outline" className="w-10 rounded-full p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='flex justify-start'>
                    <ItemForm categoryId={cat.id}/>
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
                  {userItems.map((item,i) => {
                    return item.categoryId === cat.id ? (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.weight}</TableCell>
                        <TableCell className="text-right">{item.cost}</TableCell>
                      </TableRow>
                    ) : null;
                      })}
                </TableBody>
            </Table>
          </div>
        )
      })}
    </div>
  )
}

