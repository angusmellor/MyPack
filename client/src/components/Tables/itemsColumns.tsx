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
const handleClick = async (itemId: number, packId: number) => {
  const item = await apiService.connectItemToPack(itemId, packId);
  console.log(item);
  const items = await apiService.getPackItems(packId);
};

export const columns: ColumnDef<Item>[] = [
  {
    id: 'add',
    cell: ({ row }) => {
      const params = useParams();
      const packId = Number(params.packId)
      const itemId = row.original.id

      return (
        <Button 
          variant="default" 
          className="w-6 h-6 rounded-full p-0"
          onClick={() => handleClick(itemId, packId)}
        >
          <Plus className="h-4 w-4" />
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
          <ArrowUpDown className="ml-2 h-4 w-4"/>
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
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    }
  }
]