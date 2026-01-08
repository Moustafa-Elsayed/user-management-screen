import React from "react";
import { TableRow, TableBodyProps } from "@/types";
import { TableRowComponent } from "./TableRow";

export function TableBody<T extends TableRow>({
  data,
  columns,
  isLoading,
  emptyMessage,
  selectedRows,
  onSelectRow,
  onRowClick,
  enableSelection,
}: TableBodyProps<T>) {
  if (isLoading) {
    return (
      <tbody>
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="">
            {enableSelection && (
              <td className="px-4 py-4">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </td>
            )}
            {columns.map((column) => (
              <td key={column.id} className="px-4 py-4 ">
                <div className="h-4 bg-gray-200  dark:bg-gray-700 rounded animate-pulse" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length + (enableSelection ? 1 : 0)}
            className="px-4 py-12 text-center  text-gray-500 dark:text-gray-400"
          >
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="bg-white dark:bg-gray-900">
      {data.map((row, rowIndex) => (
        <TableRowComponent
          key={row.id}
          row={row}
          rowIndex={rowIndex}
          columns={columns}
          isSelected={selectedRows?.has(row.id) || false}
          onSelect={onSelectRow}
          onClick={onRowClick}
          enableSelection={enableSelection}
        />
      ))}
    </tbody>
  );
}
