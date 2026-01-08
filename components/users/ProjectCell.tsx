import React from "react";
import Image from "next/image";

interface ProjectCellProps {
  project: {
    name: string;
    description: string;
    icon: string;
  };
}

export function ProjectCell({ project }: ProjectCellProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
        <Image
          src={project.icon}
          alt={project.name}
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      <div className="min-w-0">
        <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
          {project.name}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {project.description}
        </div>
      </div>
    </div>
  );
}
