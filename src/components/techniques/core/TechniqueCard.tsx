"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, Camera, BookOpen, Tag, Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Equipment {
  name: string;
  essential: boolean;
}

interface TechniqueCardProps {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeRequired?: string;
  equipment?: Equipment[];
  steps?: string[];
  tips?: string[];
  warnings?: string[];
  imageUrl?: string;
  className?: string;
  tags?: string[];
  icon?: ReactNode;
  expandable?: boolean;
  children?: ReactNode;
}

export function TechniqueCard({
  title,
  description,
  difficulty,
  timeRequired,
  equipment,
  steps,
  tips,
  warnings,
  imageUrl,
  className,
  tags,
  icon,
  expandable = false,
  children,
}: TechniqueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 难度标识样式
  const difficultyStyles = {
    beginner: {
      bg: "bg-green-100 dark:bg-green-900/20",
      text: "text-green-700 dark:text-green-400",
      border: "border-green-200 dark:border-green-800/30",
      label: "初学者"
    },
    intermediate: {
      bg: "bg-amber-100 dark:bg-amber-900/20",
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800/30",
      label: "中级"
    },
    advanced: {
      bg: "bg-red-100 dark:bg-red-900/20",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-800/30",
      label: "高级"
    }
  };

  return (
    <div 
      className={cn(
        "rounded-xl border overflow-hidden bg-white dark:bg-neutral-800", 
        "border-neutral-200 dark:border-neutral-700 transition-all duration-300",
        isExpanded ? "shadow-md" : "shadow-sm hover:shadow-md",
        className
      )}
    >
      {/* 卡片头部 */}
      <div className="relative">
        {/* 图片 */}
        {imageUrl && (
          <div className="relative h-40 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* 难度标签 */}
            <div className="absolute top-3 right-3">
              <div className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium",
                difficultyStyles[difficulty].bg,
                difficultyStyles[difficulty].text,
                "border",
                difficultyStyles[difficulty].border
              )}>
                {difficultyStyles[difficulty].label}
              </div>
            </div>
            
            <div className="absolute bottom-3 left-3">
              <h3 className="text-lg font-semibold text-white drop-shadow-sm">
                {title}
              </h3>
            </div>
          </div>
        )}
        
        {/* 无图片时的标题栏 */}
        {!imageUrl && (
          <div className="p-4 flex justify-between items-start">
            <div className="flex items-center">
              {icon && <div className="mr-3 text-amber-500">{icon}</div>}
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
                {title}
              </h3>
            </div>
            <div className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium",
              difficultyStyles[difficulty].bg,
              difficultyStyles[difficulty].text,
              "border",
              difficultyStyles[difficulty].border
            )}>
              {difficultyStyles[difficulty].label}
            </div>
          </div>
        )}
      </div>
      
      {/* 卡片内容 */}
      <div className="p-4 pt-3">
        {/* 描述（如果有图片，描述显示在图片下方） */}
        {imageUrl && (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
            {description}
          </p>
        )}
        
        {/* 描述（如果没有图片） */}
        {!imageUrl && !isExpanded && (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
            {description}
          </p>
        )}
        
        {/* 额外信息 */}
        <div className="flex flex-wrap gap-2 mb-3">
          {/* 时间信息 */}
          {timeRequired && (
            <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {timeRequired}
            </div>
          )}
          
          {/* 标签 */}
          {tags && tags.length > 0 && tags.slice(0, 2).map((tag, index) => (
            <div key={index} className="flex items-center text-xs bg-neutral-100 dark:bg-neutral-750 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded-full">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </div>
          ))}
          
          {/* 装备数量 */}
          {equipment && equipment.length > 0 && (
            <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
              <Camera className="w-3.5 h-3.5 mr-1" />
              {equipment.length}件装备
            </div>
          )}
          
          {/* 步骤数量 */}
          {steps && steps.length > 0 && (
            <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              {steps.length}个步骤
            </div>
          )}
        </div>
        
        {/* 查看更多按钮 */}
        {(expandable || equipment || steps || tips || warnings) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center space-x-1 mt-1 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 py-1.5 rounded-md border border-amber-200 dark:border-amber-800/30 bg-amber-50 dark:bg-amber-900/20"
          >
            <span>{isExpanded ? "收起详情" : "查看详情"}</span>
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform",
              isExpanded ? "transform rotate-180" : ""
            )} />
          </button>
        )}
        
        {/* 展开内容 */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4 space-y-4"
            >
              {/* 自定义内容 */}
              {children}
              
              {/* 装备列表 */}
              {equipment && equipment.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                    所需装备
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {equipment.map((item, idx) => (
                      <div 
                        key={idx}
                        className={cn(
                          "px-2 py-1 rounded-md text-xs border",
                          item.essential 
                            ? "border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                            : "border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850 text-neutral-700 dark:text-neutral-400"
                        )}
                      >
                        {item.name} {item.essential && <span className="text-amber-600 dark:text-amber-500">*</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 步骤列表 */}
              {steps && steps.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                    步骤指南
                  </h4>
                  <ol className="space-y-2">
                    {steps.map((step, idx) => (
                      <li key={idx} className="flex">
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              
              {/* 提示 */}
              {tips && tips.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3 border border-blue-100 dark:border-blue-800/30">
                  <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    专业提示
                  </h4>
                  <ul className="space-y-1.5">
                    {tips.map((tip, idx) => (
                      <li key={idx} className="flex text-xs text-blue-700 dark:text-blue-300">
                        <Check className="w-3.5 h-3.5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* 警告 */}
              {warnings && warnings.length > 0 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-md p-3 border border-amber-100 dark:border-amber-800/30">
                  <h4 className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    注意事项
                  </h4>
                  <ul className="space-y-1.5">
                    {warnings.map((warning, idx) => (
                      <li key={idx} className="flex text-xs text-amber-700 dark:text-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* 完整描述 */}
              {!children && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {description}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 