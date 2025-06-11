"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, AlertTriangle, Info, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tips?: string[];
  warnings?: string[];
}

interface Equipment {
  name: string;
  essential: boolean;
}

interface StepByStepGuideProps {
  title: string;
  subtitle?: string;
  description?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeRequired?: string;
  estimatedTime?: string; // 别名支持
  steps: Step[];
  equipment?: Equipment[];
  equipmentList?: string[]; // 简化版装备列表支持
  className?: string;
}

export function StepByStepGuide({
  title,
  subtitle,
  description,
  difficulty,
  timeRequired,
  estimatedTime,
  steps,
  equipment,
  equipmentList,
  className,
}: StepByStepGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);

  // 计算当前完成百分比
  const progressPercentage = ((currentStep) / (steps.length - 1)) * 100;

  // 处理设备列表（支持简化版和完整版）
  const processedEquipment = equipment || 
    (equipmentList ? equipmentList.map(name => ({ name, essential: true })) : undefined);
    
  // 使用timeRequired或estimatedTime
  const displayTime = timeRequired || estimatedTime;

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

  const toggleInfo = (id: string) => {
    setExpandedInfo(expandedInfo === id ? null : id);
  };

  return (
    <div className={cn("bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden", className)}>
      {/* 头部信息 */}
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white">{title}</h3>
            {(subtitle || description) && (
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">{subtitle || description}</p>
            )}
          </div>
          <div className="flex space-x-2">
            {/* 难度指示器 */}
            <div className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium flex items-center",
              difficultyStyles[difficulty].bg,
              difficultyStyles[difficulty].text,
              "border",
              difficultyStyles[difficulty].border
            )}>
              {difficultyStyles[difficulty].label}
            </div>
            
            {/* 时间指示器 */}
            {displayTime && (
              <div className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30 flex items-center">
                {displayTime}
              </div>
            )}
          </div>
        </div>
        
        {/* 装备清单 */}
        {processedEquipment && processedEquipment.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center text-sm text-neutral-700 dark:text-neutral-300 mb-2">
              <span className="font-medium">所需装备:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {processedEquipment.map((item, idx) => (
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
      </div>
      
      {/* 步骤进度指示器 */}
      <div className="px-5 py-3 bg-neutral-50 dark:bg-neutral-750 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            步骤 {currentStep + 1}/{steps.length}
          </span>
          <div className="w-32 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 dark:bg-amber-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={cn(
              "p-1.5 rounded-md text-neutral-600 dark:text-neutral-400",
              "border border-neutral-200 dark:border-neutral-700",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors"
            )}
          >
            <ChevronRight className="w-4 h-4 transform rotate-180" />
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className={cn(
              "p-1.5 rounded-md text-neutral-600 dark:text-neutral-400",
              "border border-neutral-200 dark:border-neutral-700",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors"
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* 步骤内容 */}
      <div className="px-5 py-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: currentStep === index ? 1 : 0,
              y: currentStep === index ? 0 : 10,
              display: currentStep === index ? "block" : "none"
            }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-medium mr-3">
                {index + 1}
              </div>
              <h4 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                {step.title}
              </h4>
            </div>
            
            <p className="text-neutral-700 dark:text-neutral-300 ml-12">
              {step.description}
            </p>
            
            {/* 步骤图片 */}
            {step.imageUrl && (
              <div className="ml-12 mt-3 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
                <img
                  src={step.imageUrl}
                  alt={`步骤 ${index + 1}: ${step.title}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            {/* 提示和警告 */}
            <div className="space-y-3 ml-12 mt-4">
              {/* 提示 */}
              {step.tips && step.tips.length > 0 && (
                <div>
                  <button
                    onClick={() => toggleInfo(`tips-${step.id}`)}
                    className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 mb-2"
                  >
                    <Info className="w-4 h-4 mr-1" />
                    <span>有用提示</span>
                    <ChevronDown 
                      className={cn(
                        "w-4 h-4 ml-1 transition-transform",
                        expandedInfo === `tips-${step.id}` ? "transform rotate-180" : ""
                      )} 
                    />
                  </button>
                  
                  {expandedInfo === `tips-${step.id}` && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3 border border-blue-100 dark:border-blue-800/30">
                      <ul className="space-y-1.5 text-sm text-blue-700 dark:text-blue-300">
                        {step.tips.map((tip, tipIdx) => (
                          <li key={tipIdx} className="flex">
                            <Check className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {/* 警告 */}
              {step.warnings && step.warnings.length > 0 && (
                <div>
                  <button
                    onClick={() => toggleInfo(`warnings-${step.id}`)}
                    className="flex items-center text-sm font-medium text-amber-600 dark:text-amber-400 mb-2"
                  >
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    <span>注意事项</span>
                    <ChevronDown 
                      className={cn(
                        "w-4 h-4 ml-1 transition-transform",
                        expandedInfo === `warnings-${step.id}` ? "transform rotate-180" : ""
                      )} 
                    />
                  </button>
                  
                  {expandedInfo === `warnings-${step.id}` && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-md p-3 border border-amber-100 dark:border-amber-800/30">
                      <ul className="space-y-1.5 text-sm text-amber-700 dark:text-amber-300">
                        {step.warnings.map((warning, warnIdx) => (
                          <li key={warnIdx} className="flex">
                            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 