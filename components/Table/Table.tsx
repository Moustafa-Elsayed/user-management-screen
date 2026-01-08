"use client";

import React, { useState, useEffect, useMemo } from "react";
import { TableRow, TableProps } from "@/types";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";

export function Table<T extends TableRow>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "No data available",
  onRowClick,
  enableSelection = false,
  onSelectionChange,
  className = "",
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (onSelectionChange) {
      const selected = data.filter((row) => selectedRows.has(row.id));
      onSelectionChange(selected);
    }
  }, [selectedRows, data, onSelectionChange]);

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((row) => row.id)));
    }
  };

  const handleSelectRow = (rowId: string | number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
  };

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;

    const column = columns.find((col) => col.id === sortColumn);
    if (!column || column.enableSorting === false) return data;

    return [...data].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (column.accessorKey) {
        aValue = a[column.accessorKey];
        bValue = b[column.accessorKey];
      } else if (column.accessorFn) {
        aValue = column.accessorFn(a);
        bValue = column.accessorFn(b);
      }

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection, columns]);

  const allSelected = data.length > 0 && selectedRows.size === data.length;
  const indeterminate =
    selectedRows.size > 0 && selectedRows.size < data.length;

  return (
    <div className={`w-full overflow-x-auto  ${className}`}>
      <table className="w-full border-collapse">
        <TableHeader
          columns={columns}
          enableSelection={enableSelection}
          onSelectAll={handleSelectAll}
          allSelected={allSelected}
          indeterminate={indeterminate}
          onSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <TableBody
          data={sortedData}
          columns={columns}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
          selectedRows={selectedRows}
          onSelectRow={handleSelectRow}
          onRowClick={onRowClick}
          enableSelection={enableSelection}
        />
      </table>
    </div>
  );
}
