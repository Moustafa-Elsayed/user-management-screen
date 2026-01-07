export interface User {
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
  [key: string]: unknown;
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
