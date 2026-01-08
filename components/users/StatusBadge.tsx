import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui";

interface StatusBadgeProps {
  status: "active" | "absent";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const labels = {
    active: "Active",
    absent: "Absent",
  };

  const icons = {
    active: (
      <Image
        src="/icons/select-box-circle-fill.png"
        alt="Active"
        width={12}
        height={12}
        className="w-4 h-4"
      />
    ),
    absent: (
      <Image
        src="/icons/Vector.png"
        alt="Absent"
        width={12}
        height={12}
        className="w-3 h-3"
      />
    ),
  };

  return (
    <Badge variant={status}>
      <span className="flex items-center gap-1.5 font-medium text-base">
        {icons[status]}
        {labels[status]}
      </span>
    </Badge>
  );
}
