"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  title: string;
  description: string;
}

interface ShowcaseNavigationProps {
  modules: Module[];
  activeModule: string;
  setActiveModule: (id: string) => void;
}

export function ShowcaseNavigation({
  modules,
  activeModule,
  setActiveModule,
}: ShowcaseNavigationProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-nowrap gap-2 md:gap-4 pb-2 min-w-full">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setActiveModule(module.id)}
            className={cn(
              "px-4 py-3 rounded-lg transition-all duration-300 min-w-[180px] md:min-w-[200px] border flex flex-col items-start relative",
              activeModule === module.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50 hover:bg-primary/5"
            )}
          >
            <span className="font-medium text-base mb-1">{module.title}</span>
            <span className="text-xs text-muted-foreground line-clamp-2">
              {module.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 