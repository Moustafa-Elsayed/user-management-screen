import React from "react";
import { TableRow, ColumnDef } from "@/types";
import { Checkbox } from "@/components/ui";

interface TableRowProps<T extends TableRow> {
  row: T;
  rowIndex: number;
  columns: ColumnDef<T>[];
  isSelected: boolean;
  onSelect?: (rowId: string | number) => void;
  onClick?: (row: T) => void;
  enableSelection?: boolean;
}

export function TableRowComponent<T extends TableRow>({
  row,
  rowIndex,
  columns,
  isSelected,
  onSelect,
  onClick,
  enableSelection,
}: TableRowProps<T>) {
  const handleRowClick = () => {
    if (onClick) {
      onClick(row);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(row.id);
    }
  };

  return (
    <tr
      className={`transition-colors ${
        onClick ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" : ""
      } ${isSelected ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
      onClick={handleRowClick}
    >
      {enableSelection && (
        <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
        </td>
      )}
      {columns.map((column) => {
        const value = column.accessorKey
          ? row[column.accessorKey]
          : column.accessorFn
          ? column.accessorFn(row)
          : null;

        const cellContent = column.cell
          ? column.cell({ row, value, column, rowIndex })
          : value !== null && value !== undefined
          ? String(value)
          : "";

        const cellStyle: React.CSSProperties = {};
        if (column.width) {
          cellStyle.width = column.width;
        }
        if (column.minWidth) {
          cellStyle.minWidth = column.minWidth;
        }

        return (
          <td
            key={column.id}
            className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100"
            style={cellStyle}
          >
            {cellContent}
          </td>
        );
      })}
    </tr>
  );
}
