"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TechniqueCard } from "@/components/techniques/TechniqueCard";
import { User, Sun, Trees, SmilePlus, ArrowLeft, Check, HelpCircle } from "lucide-react";
import { PortraitPosing } from "./portrait/PortraitPosing";

// 图标映射
const iconMap = {
  "user-standing": User,
  "sun": Sun,
  "trees": Trees,
  "smile": SmilePlus,
  "arrow-left": ArrowLeft,
  "check": Check,
  "help-circle": HelpCircle
};

interface TechniqueSubmoduleProps {
  title: string;
}

// 临时占位组件，替代实际人像摄影子模块组件
const PortraitSubmodule = ({ title }: TechniqueSubmoduleProps) => (
  <div className="space-y-8">
    <div>
      <h4 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">
        {title}
      </h4>
      <p className="text-neutral-600 dark:text-neutral-300 mb-6">
        此模块的详细内容正在开发中，敬请期待...
      </p>
    </div>
    
    {/* 步骤化指导示例 */}
    <div>
      <h5 className="text-lg font-medium mb-4 text-neutral-800 dark:text-white">
        基本步骤
      </h5>
      
      <div className="bg-neutral-50 dark:bg-neutral-700/30 p-6 rounded-lg space-y-6">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex">
            <div className="mr-4 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                {step}
              </div>
            </div>
            <div>
              <h6 className="font-medium text-lg mb-1 text-neutral-800 dark:text-white">
                示例步骤 {step}
              </h6>
              <p className="text-neutral-600 dark:text-neutral-300">
                这里将提供具体的操作指导，包括详细步骤和注意事项。
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* 实用技巧和常见问题示例 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-neutral-750 p-5 rounded-lg border border-neutral-200 dark:border-neutral-700">
        <h5 className="text-lg font-medium mb-3 text-neutral-800 dark:text-white flex items-center">
          <Check className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2" />
          实用小技巧
        </h5>
        <ul className="space-y-2">
          {[1, 2, 3].map(item => (
            <li key={item} className="text-neutral-700 dark:text-neutral-300 text-sm">
              • 这里将提供实用的拍摄小技巧和建议。
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-white dark:bg-neutral-750 p-5 rounded-lg border border-neutral-200 dark:border-neutral-700">
        <h5 className="text-lg font-medium mb-3 text-neutral-800 dark:text-white flex items-center">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          常见问题
        </h5>
        <div className="space-y-3">
          {[1, 2].map(item => (
            <div key={item}>
              <p className="font-medium text-neutral-800 dark:text-neutral-200 text-sm">常见问题示例 {item}？</p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                这里将提供问题的解答和建议。
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// 人像摄影子模块组件映射
const portraitComponentMap: Record<string, React.FC<TechniqueSubmoduleProps>> = {
  "posing": PortraitPosing,
  "lighting": PortraitSubmodule,
  "environmental": PortraitSubmodule,
  "expression": PortraitSubmodule,
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

// 人像摄影子模块数据
const portraitTechniques: Technique[] = [
  {
    id: "posing",
    title: "姿势指导",
    description: "掌握自然、优雅的人像姿势技巧，让模特展现最佳状态",
    icon: "user-standing",
    difficulty: "入门",
    time: "10-30分钟",
    equipment: ["任何相机", "50mm镜头(推荐)"],
  },
  {
    id: "lighting",
    title: "光线掌控",
    description: "学习室内、户外、自然光和人造光下的人像光线塑造技巧",
    icon: "sun",
    difficulty: "进阶",
    time: "30-60分钟",
    equipment: ["相机", "50-85mm镜头", "反光板(可选)"],
  },
  {
    id: "environmental",
    title: "环境人像",
    description: "将人物与环境结合，讲述更丰富的视觉故事",
    icon: "trees",
    difficulty: "进阶",
    time: "30-60分钟",
    equipment: ["相机", "24-70mm变焦镜头"],
  },
  {
    id: "expression",
    title: "表情捕捉",
    description: "捕捉真实、自然、打动人心的面部表情的方法与技巧",
    icon: "smile",
    difficulty: "入门",
    time: "15-30分钟",
    equipment: ["任何相机", "85-135mm镜头(推荐)"],
  },
];

interface PortraitTechniquesProps {
  activeTechnique: any;
  setActiveTechnique: (technique: any) => void;
}

export function PortraitTechniques({ activeTechnique, setActiveTechnique }: PortraitTechniquesProps) {
  const [selectedTechniqueId, setSelectedTechniqueId] = useState<string | null>(null);
  
  const selectedTechnique = selectedTechniqueId 
    ? portraitTechniques.find(tech => tech.id === selectedTechniqueId)
    : null;
  
  // 渲染图标
  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || User;
    return <IconComponent className="w-6 h-6" />;
  };
  
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-white">
          人像拍摄技巧
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl">
          掌握构图、光线和互动技巧，拍摄出表现力丰富、情感真挚的人像作品。
          以下是按照不同方面组织的人像拍摄技巧，点击卡片查看详细内容。
        </p>
      </div>
      
      {!selectedTechnique ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portraitTechniques.map((technique) => (
            <TechniqueCard 
              key={technique.id}
              technique={technique}
              onClick={() => setSelectedTechniqueId(technique.id)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <button 
            onClick={() => setSelectedTechniqueId(null)}
            className="flex items-center text-blue-600 dark:text-blue-400 mb-6 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回人像技巧列表
          </button>
          
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-start mb-6">
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center text-white mr-4",
                "bg-amber-500"
              )}>
                {renderIcon(selectedTechnique.icon)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-white">
                  {selectedTechnique.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 mt-1">
                  {selectedTechnique.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-lg">
                <div className="text-sm text-neutral-500 dark:text-neutral-400">难度</div>
                <div className="font-medium dark:text-white">{selectedTechnique.difficulty}</div>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-lg">
                <div className="text-sm text-neutral-500 dark:text-neutral-400">拍摄时间</div>
                <div className="font-medium dark:text-white">{selectedTechnique.time}</div>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-lg">
                <div className="text-sm text-neutral-500 dark:text-neutral-400">推荐装备</div>
                <div className="font-medium dark:text-white line-clamp-1">
                  {selectedTechnique.equipment.join(", ")}
                </div>
              </div>
            </div>
            
            {/* 动态加载对应组件 */}
            {(() => {
              const TechniqueComponent = portraitComponentMap[selectedTechnique.id] || PortraitSubmodule;
              return <TechniqueComponent title={selectedTechnique.title} />;
            })()}
          </div>
        </div>
      )}
    </div>
  );
} 