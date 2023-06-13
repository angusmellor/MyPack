import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

import { Droppable, Draggable } from "react-beautiful-dnd"
import { cn } from "../lib/utils"

import { useState } from "react"

interface FilterTableProps<TData, TValue> {
  columns: ColumnDef<TData,TValue>[]
  data: TData[],
  className?: string
}

export function FilterTable<TData, TValue>({
  columns,
  data, 
  className
}: FilterTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    }
  })

  return (
    <div className={className}>
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
        <Droppable droppableId="list" >
          {(provided, snapshot) => {
            return (
              <TableBody
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn('', {'bg-slate-400' :  snapshot.isDraggingOver})}
              >
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, i) => (
                    <Draggable key={row.id} draggableId={String(i)} index={i}>
                      {(provided) => (
                        <TableRow
                          data-state={row.getIsSelected() && "selected"}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="bg-white"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      )}
                    </Draggable>
                    ))) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                {provided.placeholder}
              </TableBody>
            )
          }}
        </Droppable>
      </Table>
    </div>
  )
}