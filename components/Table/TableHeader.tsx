import React from "react";
import Image from "next/image";
import { TableRow, TableHeaderProps } from "@/types";
import { Checkbox } from "@/components/ui";

export function TableHeader<T extends TableRow>({
  columns,
  enableSelection,
  onSelectAll,
  allSelected,
  indeterminate,
  onSort,
  sortColumn,
}: TableHeaderProps<T>) {
  return (
    <thead className="bg-gray-100 dark:bg-light-black">
      <tr>
        {enableSelection && (
          <th className="w-12 px-4 py-3 text-left rounded-tl-md rounded-bl-md">
            <Checkbox
              checked={allSelected}
              indeterminate={indeterminate}
              onChange={onSelectAll}
            />
          </th>
        )}
        {columns.map((column, index) => (
          <th
            key={column.id}
            className={`px-4 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300  tracking-wider ${
              !enableSelection && index === 0
                ? "rounded-tl-md rounded-bl-md"
                : ""
            } ${
              index === columns.length - 1 ? "rounded-tr-md rounded-br-md" : ""
            } ${
              column.enableSorting !== false ? "cursor-pointer select-none" : ""
            }`}
            style={{
              width: column.width,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
            }}
            onClick={() => {
              if (column.enableSorting !== false && onSort) {
                onSort(column.id);
              }
            }}
          >
            <div className="flex items-center gap-2">
              {column.header}
              {column.enableSorting !== false && (
                <Image
                  src="/icons/expand-up-down-fill.png"
                  alt="Sort"
                  width={12}
                  height={12}
                  className={`w-5 h-5 transition-opacity ${
                    sortColumn === column.id ? "opacity-100" : "opacity-40"
                  }`}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
