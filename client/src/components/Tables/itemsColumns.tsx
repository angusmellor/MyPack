import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useParams } from "react-router-dom";
import { apiService } from "../../apiService";


export interface Item {
  id: number;
  name: string;
  description: string;
  weight: number;
  cost: number;
}

export const columns: ColumnDef<Item>[] = [
  {
    id: 'add',
    cell: ({ row }) => {
      const params = useParams();
      const packId = Number(params.packId)
      const itemId = row.original.id
      const handleClick = async () => {
        const item = await apiService.connectItemToPack(itemId, packId)
        console.log(item)
      };
    
      return (
        <Button 
          variant="outline" 
          className="w-4 rounded-full p-0"
          onClick={handleClick}
        >
          <Plus className="h-2 w-2" />
        </Button>
      );
    }
  },
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