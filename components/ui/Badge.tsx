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
    "inline-flex items-center justify-center px-3 py-1 rounded-md text-base font-medium whitespace-nowrap max-w-fit";

  const variantStyles = {
    active: "border dark:border-gray-800 border-gray-200 text-gray-500",
    absent: "border dark:border-gray-800 border-gray-200 text-gray-500",
    default: "border dark:border-gray-800 border-gray-200 text-gray-500",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {variant === "active" && <span />}
      {variant === "absent" && <span />}
      {children}
    </span>
  );
}
