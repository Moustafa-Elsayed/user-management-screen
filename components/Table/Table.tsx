"use client";

import React, { useState, useEffect } from "react";
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
        />
        <TableBody
          data={data}
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
