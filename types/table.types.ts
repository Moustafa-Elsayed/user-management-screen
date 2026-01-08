import { ReactNode } from "react";

export interface TableRow {
  id: string | number;
  [key: string]: unknown;
}

export interface ColumnDef<T extends TableRow> {
  id: string;
  header: string | ReactNode;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => unknown;
  cell?: (props: CellContext<T>) => ReactNode;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
}

export interface CellContext<T extends TableRow> {
  row: T;
  value: unknown;
  column: ColumnDef<T>;
  rowIndex: number;
}

export interface TableProps<T extends TableRow> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  enableSelection?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  className?: string;
}

export interface TableHeaderProps<T extends TableRow> {
  columns: ColumnDef<T>[];
  enableSelection?: boolean;
  onSelectAll?: () => void;
  allSelected?: boolean;
  indeterminate?: boolean;
  onSort?: (columnId: string) => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
}

export interface TableBodyProps<T extends TableRow> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  selectedRows?: Set<string | number>;
  onSelectRow?: (rowId: string | number) => void;
  onRowClick?: (row: T) => void;
  enableSelection?: boolean;
}
