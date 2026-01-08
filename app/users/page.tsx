"use client";

import React, { useState, useMemo } from "react";
import { Table } from "@/components/Table";
import { Button } from "@/components/ui";
import { FilterTabs } from "@/components/users/FilterTabs";
import { getUserColumns } from "@/components/users/UserTableColumns";
import { useUsers } from "@/lib/hooks/useUsers";
import { useUpdateUser } from "@/lib/hooks/useUpdateUser";
import { useDeleteUsers } from "@/lib/hooks/useDeleteUsers";
import { User } from "@/types";

type FilterTab = "all" | "active" | "absent";

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [currentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading } = useUsers(currentPage, pageSize);
  const updateUserMutation = useUpdateUser();
  const deleteUsersMutation = useDeleteUsers();

  const filteredUsers = useMemo(() => {
    if (!data?.data) return [];

    if (activeTab === "all") {
      return data.data;
    }

    return data.data.filter((user) => user.status === activeTab);
  }, [data?.data, activeTab]);

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
  };

  const handleDelete = async (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      await deleteUsersMutation.mutateAsync({ userIds: [user.id] });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;

    const userNames = selectedUsers.map((u) => u.name).join(", ");
    if (
      confirm(
        `Are you sure you want to delete ${selectedUsers.length} user(s)? (${userNames})`
      )
    ) {
      const userIds = selectedUsers.map((u) => u.id);
      await deleteUsersMutation.mutateAsync({ userIds });
      setSelectedUsers([]);
    }
  };

  const columns = getUserColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="min-h-screen  py-8 bg-white dark:bg-black">
      <div className="container mx-auto">
        <div className=" ">
          <div className=" pb-3">
            <div className="flex items-center  justify-between mb-4">
              <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
              <Button
                variant="danger"
                onClick={handleBulkDelete}
                disabled={selectedUsers.length === 0}
              >
                Delete Selected
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto ">
            <Table
              data={filteredUsers}
              columns={columns}
              isLoading={isLoading}
              emptyMessage="No users found"
              enableSelection
              onSelectionChange={setSelectedUsers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
