import React from "react";
import { TableRow, TableHeaderProps } from "@/types";
import { Checkbox } from "@/components/ui";

export function TableHeader<T extends TableRow>({
  columns,
  enableSelection,
  onSelectAll,
  allSelected,
  indeterminate,
}: TableHeaderProps<T>) {
  return (
    <thead className="bg-gray-100 dark:bg-gray-800">
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
            className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider ${
              !enableSelection && index === 0
                ? "rounded-tl-md rounded-bl-md"
                : ""
            } ${
              index === columns.length - 1 ? "rounded-tr-md rounded-br-md" : ""
            }`}
            style={{
              width: column.width,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
            }}
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
