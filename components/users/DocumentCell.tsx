import React from "react";

interface DocumentCellProps {
  document: {
    name: string;
    size: string;
  };
}

export function DocumentCell({ document }: DocumentCellProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 flex-shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full text-red-500"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="min-w-0">
        <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
          {document.name}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {document.size}
        </div>
      </div>
    </div>
  );
}
