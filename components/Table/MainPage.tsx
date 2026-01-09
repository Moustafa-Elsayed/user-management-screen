"use client";

import React, { useState, useMemo } from "react";
import { Table } from "@/components/Table";
import { Button, ConfirmDialog, EditUserDialog } from "@/components/ui";
import { FilterTabs } from "@/components/users/FilterTabs";
import { getUserColumns } from "@/components/users/UserTableColumns";
import { useUsers } from "@/lib/hooks/useUsers";
import { useUpdateUser } from "@/lib/hooks/useUpdateUser";
import { useDeleteUsers } from "@/lib/hooks/useDeleteUsers";
import { User } from "@/types";

type FilterTab = "all" | "active" | "absent";

interface DeleteDialogState {
  isOpen: boolean;
  user?: User;
  users?: User[];
  type: "single" | "bulk";
}

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [currentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isFiltering, setIsFiltering] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    isOpen: false,
    type: "single",
  });
  const [editUser, setEditUser] = useState<User | null>(null);

  const { data, isLoading } = useUsers(currentPage, pageSize);
  const updateUserMutation = useUpdateUser();
  const deleteUsersMutation = useDeleteUsers();

  const filteredUsers = useMemo(() => {
    if (!data?.data) return [];

    if (activeTab === "all") {
      return data.data;
    }

    return data.data.filter((user) => user.status === activeTab);
  }, [data, activeTab]);

  const handleTabChange = (tab: FilterTab) => {
    setIsFiltering(true);
    setActiveTab(tab);
    setTimeout(() => setIsFiltering(false), 200);
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
  };

  const handleSaveEdit = async (updatedUser: User) => {
    await updateUserMutation.mutateAsync({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      title: updatedUser.title,
      status: updatedUser.status,
    });
  };

  const handleDelete = (user: User) => {
    setDeleteDialog({
      isOpen: true,
      user,
      type: "single",
    });
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return;

    setDeleteDialog({
      isOpen: true,
      users: selectedUsers,
      type: "bulk",
    });
  };

  const confirmDelete = async () => {
    if (deleteDialog.type === "single" && deleteDialog.user) {
      await deleteUsersMutation.mutateAsync({
        userIds: [deleteDialog.user.id],
      });
    } else if (deleteDialog.type === "bulk" && deleteDialog.users) {
      const userIds = deleteDialog.users.map((u) => u.id);
      await deleteUsersMutation.mutateAsync({ userIds });
      setSelectedUsers([]);
    }
  };

  const columns = getUserColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  const getDialogContent = () => {
    if (deleteDialog.type === "single" && deleteDialog.user) {
      return {
        title: "Delete User",
        message: `Are you sure you want to delete ${deleteDialog.user.name}? This action cannot be undone.`,
      };
    } else if (deleteDialog.type === "bulk" && deleteDialog.users) {
      const userNames = deleteDialog.users.map((u) => u.name).join(", ");
      return {
        title: "Delete Users",
        message: `Are you sure you want to delete ${deleteDialog.users.length} user(s)? This action cannot be undone.`,
        children: (
          <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Users to be deleted:
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {userNames}
            </p>
          </div>
        ),
      };
    }
    return { title: "", message: "" };
  };

  const dialogContent = getDialogContent();

  return (
    <div className="min-h-screen  py-8 bg-white dark:bg-black">
      <div className="container mx-auto">
        <div className=" ">
          <div className=" pb-3">
            <div className="flex items-center  justify-between mb-4 flex-wrap">
              <FilterTabs activeTab={activeTab} onTabChange={handleTabChange} />
              <Button
                variant="danger"
                onClick={handleBulkDelete}
                disabled={selectedUsers.length === 0}
              >
                Delete Selected
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table
              data={filteredUsers}
              columns={columns}
              isLoading={isLoading || isFiltering}
              emptyMessage="No users found"
              enableSelection
              onSelectionChange={setSelectedUsers}
            />
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, type: "single" })}
        onConfirm={confirmDelete}
        title={dialogContent.title}
        message={dialogContent.message}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      >
        {dialogContent.children}
      </ConfirmDialog>

      <EditUserDialog
        key={editUser?.id}
        isOpen={editUser !== null}
        onClose={() => setEditUser(null)}
        onSave={handleSaveEdit}
        user={editUser}
      />
    </div>
  );
}
