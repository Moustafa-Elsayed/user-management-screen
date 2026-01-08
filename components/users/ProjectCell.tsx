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
  const getIconPath = (iconPath: string) => {
    if (iconPath.includes("Notion.png")) {
      return {
        light: "/icons/Notionlight.png",
        dark: "/icons/Notiondark.png",
      };
    }
    if (iconPath.includes("Tidal.png")) {
      return {
        light: "/icons/Tidal.png",
        dark: "/icons/Tidaldark.png",
      };
    }
    return { light: iconPath, dark: iconPath };
  };

  const iconPaths = getIconPath(project.icon);

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 overflow-hidden flex items-center justify-center p-1 rounded-full border dark:border-gray-800 border-gray-200">
        <Image
          src={iconPaths.light}
          alt={project.name}
          width={40}
          height={40}
          className="object-contain block dark:hidden"
        />
        <Image
          src={iconPaths.dark}
          alt={project.name}
          width={40}
          height={40}
          className="object-contain hidden dark:block"
        />
      </div>
      <div className="min-w-0">
        <div className="font-medium dark:text-white text-gray-900 dark:text-gray-120 truncate">
          {project.name}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {project.description}
        </div>
      </div>
    </div>
  );
}
