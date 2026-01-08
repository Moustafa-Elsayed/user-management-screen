"use client";

import React from "react";
import { Popover, PopoverItem } from "@/components/ui";
import { User } from "@/types";

interface UserActionMenuProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export function UserActionMenu({
  user,
  onEdit,
  onDelete,
}: UserActionMenuProps) {
  const trigger = (
    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="text-gray-600 dark:text-gray-400"
      >
        <circle cx="10" cy="4" r="1.5" fill="currentColor" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
        <circle cx="10" cy="16" r="1.5" fill="currentColor" />
      </svg>
    </button>
  );

  return (
    <Popover trigger={trigger}>
      {onEdit && <PopoverItem onClick={() => onEdit(user)}>Edit</PopoverItem>}
      {onDelete && (
        <PopoverItem onClick={() => onDelete(user)} variant="danger">
          Delete
        </PopoverItem>
      )}
    </Popover>
  );
}
