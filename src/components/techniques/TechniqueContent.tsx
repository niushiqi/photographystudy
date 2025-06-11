"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PortraitTechniques } from "./content/PortraitTechniques";

// 占位组件
const PlaceholderContent = ({ title }: { title: string }) => (
  <div className="text-center py-20 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
    <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">
      {title}
    </h3>
    <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
      此模块正在开发中，敬请期待...
    </p>
  </div>
);

// 根据不同分类加载不同内容组件
const categoryComponents: Record<string, React.FC<any>> = {
  portrait: PortraitTechniques,
  landscape: ({ activeTechnique, setActiveTechnique }) => (
    <PlaceholderContent title="风景拍摄方法" />
  ),
  street: ({ activeTechnique, setActiveTechnique }) => (
    <PlaceholderContent title="街头摄影技法" />
  ),
  "special-scene": ({ activeTechnique, setActiveTechnique }) => (
    <PlaceholderContent title="特殊场景攻略" />
  ),
  "special-tech": ({ activeTechnique, setActiveTechnique }) => (
    <PlaceholderContent title="特殊技术指南" />
  ),
  difficult: ({ activeTechnique, setActiveTechnique }) => (
    <PlaceholderContent title="挑战环境对策" />
  ),
  mobile: ({ activeTechnique, setActiveTechnique }) => (
    <PlaceholderContent title="手机摄影技巧" />
  ),
};

interface TechniqueContentProps {
  category: string;
  activeTechnique: any;
  setActiveTechnique: (technique: any) => void;
}

export function TechniqueContent({ category, activeTechnique, setActiveTechnique }: TechniqueContentProps) {
  // 动态加载对应分类的组件
  const CategoryComponent = categoryComponents[category] || PortraitTechniques;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <CategoryComponent 
        activeTechnique={activeTechnique}
        setActiveTechnique={setActiveTechnique}
      />
    </motion.div>
  );
} 