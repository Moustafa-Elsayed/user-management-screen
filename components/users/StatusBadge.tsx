import React from "react";
import { Badge } from "@/components/ui";

interface StatusBadgeProps {
  status: "active" | "absent";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const labels = {
    active: "Active",
    absent: "Absent",
  };

  return <Badge variant={status}>{labels[status]}</Badge>;
}
