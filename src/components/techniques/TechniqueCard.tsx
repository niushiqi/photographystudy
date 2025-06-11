"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { User, Sun, Trees, SmilePlus, SignalMedium, Clock } from "lucide-react";

// 图标映射
const iconMap = {
  "user-standing": User,
  "sun": Sun,
  "trees": Trees,
  "smile": SmilePlus,
  "signal-medium": SignalMedium,
  "clock": Clock
};

interface Technique {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  time: string;
  equipment: string[];
}

interface TechniqueCardProps {
  technique: Technique;
  onClick: () => void;
}

export function TechniqueCard({ technique, onClick }: TechniqueCardProps) {
  // 渲染图标
  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || User;
    return <IconComponent className="w-6 h-6" />;
  };
  
  return (
    <motion.div
      className={cn(
        "bg-white dark:bg-neutral-800 rounded-xl p-5 cursor-pointer",
        "border border-neutral-200 dark:border-neutral-700",
        "hover:shadow-lg transition-all duration-300"
      )}
      onClick={onClick}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={cn(
        "w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white",
        technique.id === "posing" ? "bg-amber-500" :
        technique.id === "lighting" ? "bg-orange-500" :
        technique.id === "environmental" ? "bg-emerald-500" :
        "bg-sky-500"
      )}>
        {renderIcon(technique.icon)}
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-white">
        {technique.title}
      </h3>
      
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
        {technique.description}
      </p>
      
      <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 space-x-4">
        <div className="flex items-center">
          <SignalMedium className="w-4 h-4 mr-1" />
          <span>{technique.difficulty}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>{technique.time}</span>
        </div>
      </div>
    </motion.div>
  );
} 