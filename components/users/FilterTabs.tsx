"use client";

import React, { useState } from "react";

type FilterTab = "all" | "active" | "absent";

interface FilterTabsProps {
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
}

export function FilterTabs({ activeTab, onTabChange }: FilterTabsProps) {
  const tabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "absent", label: "Absent" },
  ];

  return (
    <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800  rounded-md gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-10 py-2 text-sm cursor-pointer font-medium  rounded-md transition-all ${
            activeTab === tab.id
              ? "bg-white text-gray-900 shadow-sm "
              : "text-gray-400 "
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
