import { TableRow, SortableValue } from "./table.types";

export interface User extends TableRow {
  id: number;
  name: string;
  email: string;
  title: string;
  startDate: string;
  project: {
    name: string;
    description: string;
    icon: string;
  };
  document: {
    name: string;
    size: string;
  };
  status: "active" | "absent";
  avatar?: string;
  [key: string]: SortableValue | Record<string, SortableValue>;
}

export interface UpdateUserPayload {
  id: number;
  name?: string;
  email?: string;
  title?: string;
  status?: "active" | "absent";
}

export interface DeleteUsersPayload {
  userIds: number[];
}
