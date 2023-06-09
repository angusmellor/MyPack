import {Table, TableBody,TableCaption, TableCell, TableHead, TableHeader, TableRow} from "./ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { ItemForm } from './itemForm';

export function UserItems() {

  const categories = ['Big Four', 'Cook System', 'Clothing', 'Electronics', 'Miscellaneous']

  return (
    <div>
      {categories.map((cat) => {
        return (
          <div>
            <h4>{cat}</h4>
            <Table>
              <TableCaption>
                <Popover>
                  <PopoverTrigger>
                    <Button variant="outline" className="w-10 rounded-full p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='flex justify-start'>
                    <ItemForm/>
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
                <TableRow>
                  <TableCell className="font-medium">Backpack</TableCell>
                  <TableCell>ULA Ohm 2.0</TableCell>
                  <TableCell>0.5</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )
      })}
    </div>
  )
}

