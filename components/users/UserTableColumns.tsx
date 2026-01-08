import React from "react";
import { ColumnDef, User } from "@/types";
import { UserAvatar } from "./UserAvatar";
import { StatusBadge } from "./StatusBadge";
import { ProjectCell } from "./ProjectCell";
import { DocumentCell } from "./DocumentCell";
import { UserActionMenu } from "./UserActionMenu";

interface GetUserColumnsProps {
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export function getUserColumns({
  onEdit,
  onDelete,
}: GetUserColumnsProps = {}): ColumnDef<User>[] {
  return [
    {
      id: "member",
      header: "Member Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <UserAvatar src={row.avatar} name={row.name} />
          <div className="min-w-0">
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {row.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {row.email}
            </div>
          </div>
        </div>
      ),
      minWidth: "250px",
    },
    {
      id: "title",
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {row.title}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Since {row.startDate}
          </div>
        </div>
      ),
      minWidth: "200px",
    },
    {
      id: "project",
      header: "Project",
      cell: ({ row }) => <ProjectCell project={row.project} />,
      minWidth: "250px",
    },
    {
      id: "document",
      header: "Member Documents",
      cell: ({ row }) => <DocumentCell document={row.document} />,
      minWidth: "200px",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => <StatusBadge status={row.status} />,
      width: "150px",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <UserActionMenu user={row} onEdit={onEdit} onDelete={onDelete} />
      ),
      width: "60px",
      enableSorting: false,
    },
  ];
}
