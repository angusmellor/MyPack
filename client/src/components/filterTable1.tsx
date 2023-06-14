import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

import { Button } from "./ui/button";
import { Input } from "./ui/input"
import { Plus, ArrowUpDown } from "lucide-react";
import { useParams } from "react-router-dom";
import { Item } from "../lib/types";
import { apiService } from "../apiService";
import { useState } from "react";

interface FilterTableProps {
  data: Item[],
  className?: string,
  setPackItems: React.Dispatch<React.SetStateAction<Item[]>>
}

export function FilterTable1({
  data, 
  className,
  setPackItems
}: FilterTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] =  useState<ColumnFiltersState>(
    []
  )
  const columnHelper = createColumnHelper<Item>();

  const handleClick = async (itemId: number, packId: number) => {
    console.log(setPackItems)
    const item = await apiService.connectItemToPack(itemId, packId);
    console.log(item);
    const items = await apiService.getPackItems(packId);
    console.log(items)
    setPackItems(items[0].packItems)
  };

  const CellComponent = ({row}) => {
    const params = useParams();
    const { packId } = params;
    const itemId = row.original.id

    return (
      <Button
        variant="default"
        className="w-6 h-6 rounded-full p-0"
        onClick={async () => {
          handleClick(itemId, packId)
          const items = await apiService.getPackItems(packId);
          console.log(items)
          setPackItems(items)
        }}
      >
        <Plus className="h-4 w-4" />
      </Button>
    );
  };



const columns = [
  columnHelper.display({
    id: 'add',
    cell: ({row}) => <CellComponent row={row} />
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: info => info.renderValue()
  }),
  columnHelper.accessor('description', {
    header: () => 'Description',
    cell: info => info.renderValue()
  }),
  columnHelper.accessor('weight', {
    header: ({column}) => {
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
  }),
  columnHelper.accessor('cost', {
    header: ({column}) => {
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
  })

]
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  })

  return (
    <div className={className}>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter item names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
          <TableBody className="overflow-hidden">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              ))) : 
              (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
      </Table>
    </div>
  )
}

