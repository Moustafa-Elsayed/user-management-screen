import React from "react";

interface BadgeProps {
  variant?: "active" | "absent" | "default";
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium";

  const variantStyles = {
    active: "bg-[#d1fae5] text-[#065f46]",
    absent: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
    default: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {variant === "active" && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
      )}
      {variant === "absent" && (
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
      )}
      {children}
    </span>
  );
}
