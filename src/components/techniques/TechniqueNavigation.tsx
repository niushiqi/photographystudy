"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  Camera, Mountain, Building2, CloudRain, Sparkles, 
  AlertTriangle, Smartphone 
} from "lucide-react";

// 图标映射
const iconMap = {
  "camera-portrait": Camera,
  "mountain": Mountain,
  "buildings": Building2,
  "cloud-rain": CloudRain,
  "sparkles": Sparkles,
  "warning": AlertTriangle,
  "device-phone-camera": Smartphone
};

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface TechniqueNavigationProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

export function TechniqueNavigation({ categories, activeCategory, setActiveCategory }: TechniqueNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 简单的横向滚动逻辑
  const scrollToCategory = (categoryId: string) => {
    const container = containerRef.current;
    const categoryElement = document.getElementById(`category-${categoryId}`);
    
    if (container && categoryElement) {
      const scrollLeft = categoryElement.offsetLeft - container.offsetLeft - 
        (container.clientWidth / 2) + (categoryElement.clientWidth / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    scrollToCategory(categoryId);
  };
  
  // 渲染图标
  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Camera;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div 
      ref={containerRef}
      className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
    >
      {categories.map(category => (
        <motion.div
          key={category.id}
          id={`category-${category.id}`}
          className={cn(
            "flex-shrink-0 w-60 mr-4 p-4 rounded-xl cursor-pointer transition-all snap-start",
            "border border-neutral-200 dark:border-neutral-800",
            "hover:shadow-md",
            activeCategory === category.id 
              ? "bg-white dark:bg-neutral-800 shadow-md ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400" 
              : "bg-white/80 dark:bg-neutral-850 hover:bg-white dark:hover:bg-neutral-800"
          )}
          onClick={() => handleCategoryClick(category.id)}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className={cn(
            "w-12 h-12 rounded-lg mb-3 flex items-center justify-center text-white",
            category.color
          )}>
            {renderIcon(category.icon)}
          </div>
          <h3 className="text-lg font-medium mb-1 dark:text-white">{category.title}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {category.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
} 