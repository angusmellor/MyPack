import {useDraggable} from '@dnd-kit/core';
import {TableRow, TableCell} from './table'
import { flexRender } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { cn } from '../../lib/utils';

interface DraggableProps<TData> {
  row: Row<TData>;
  className: string
}

export function DraggableRow<TData>({row, className}: DraggableProps<TData>) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: row.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : undefined;

  
  return (
    <>
      <TableRow
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        data-state={row.getIsSelected() && "selected"}
        className={cn("bg-white", {className})}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
}