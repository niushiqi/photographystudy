"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TechniqueTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "primary" | "secondary" | "outline" | "pill";
  orientation?: "horizontal" | "vertical";
}

export function TechniqueTabs({
  tabs,
  activeTab,
  onChange,
  variant = "primary",
  orientation = "horizontal",
}: TechniqueTabsProps) {
  // 样式变量
  const tabStyles = {
    primary: {
      active: "border-b-2 border-amber-500 text-amber-600 dark:text-amber-400",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300",
      wrapper: "border-b border-amber-200 dark:border-amber-800/40"
    },
    secondary: {
      active: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
      inactive: "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-750",
      wrapper: "p-1 bg-neutral-100 dark:bg-neutral-850 rounded-lg"
    },
    outline: {
      active: "bg-white dark:bg-neutral-800 text-amber-600 dark:text-amber-400 border-neutral-200 dark:border-neutral-700 shadow-sm",
      inactive: "bg-transparent text-neutral-600 dark:text-neutral-400 border-transparent hover:bg-neutral-50 dark:hover:bg-neutral-750",
      wrapper: "border-b border-neutral-200 dark:border-neutral-700"
    },
    pill: {
      active: "bg-amber-500 text-white border-amber-500",
      inactive: "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-750",
      wrapper: "p-1 bg-neutral-100 dark:bg-neutral-850 rounded-full"
    }
  };

  return (
    <div className="w-full">
      {/* 标签导航 */}
      <div 
        className={cn(
          "flex mb-4 font-medium text-sm",
          orientation === "vertical" ? "flex-col space-y-1" : "space-x-1",
          tabStyles[variant].wrapper
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2.5 rounded-md transition-all duration-200 flex items-center",
              orientation === "vertical" ? "justify-start" : "justify-center",
              activeTab === tab.id
                ? tabStyles[variant].active
                : tabStyles[variant].inactive,
              variant !== "primary" && "border",
              variant === "pill" && "rounded-full"
            )}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* 标签内容 */}
      <div className="relative">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ 
              opacity: activeTab === tab.id ? 1 : 0,
              y: activeTab === tab.id ? 0 : 8,
              display: activeTab === tab.id ? "block" : "none"
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 