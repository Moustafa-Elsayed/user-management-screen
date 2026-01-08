import Image from "next/image";
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
      <div className="w-10 h-10">
        <Image
          src="/icons/File Format Icons [1.1].png"
          alt="PDF"
          width={40}
          height={40}
          className="w-10 h-10 block dark:hidden"
        />
        <Image
          src="/icons/pdfdark.png"
          alt="PDF"
          width={40}
          height={40}
          className="w-10 h-10 hidden dark:block"
        />
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
