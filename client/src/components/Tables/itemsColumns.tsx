import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from '@tanstack/react-table'


export interface Item {
  id: number;
  name: string;
  description: string;
  weight: number;
  cost: number;
}

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'weight',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Weight
          <ArrowUpDown/>
        </Button>
      )
    }
  },
  {
    accessorKey: 'cost',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cost
          <ArrowUpDown/>
        </Button>
      )
    }
  }
]