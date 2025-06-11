"use client";

import { motion } from "framer-motion";

interface TechniqueNavigationProps {
  modules: Record<string, {
    id: string;
    title: string;
    description: string;
    component: React.ComponentType<any>;
  }>;
  activeModule: string;
  setActiveModule: (id: string) => void;
}

export default function TechniqueNavigation({ 
  modules, 
  activeModule, 
  setActiveModule 
}: TechniqueNavigationProps) {
  return (
    <div className="relative">
      {/* 移动端下拉选择 */}
      <div className="block md:hidden mb-8">
        <select 
          className="w-full p-3 bg-secondary border border-border rounded-lg text-foreground"
          value={activeModule}
          onChange={(e) => setActiveModule(e.target.value)}
        >
          {Object.keys(modules).map((key) => (
            <option key={key} value={key}>
              {modules[key].title}
            </option>
          ))}
        </select>
      </div>

      {/* 桌面端选项卡导航 */}
      <nav className="hidden md:flex items-center justify-center mb-4 gap-1 overflow-x-auto">
        {Object.keys(modules).map((key) => (
          <button
            key={key}
            onClick={() => setActiveModule(key)}
            className={`
              relative px-5 py-3 whitespace-nowrap text-sm font-medium rounded-lg transition-all
              ${activeModule === key 
                ? "text-foreground bg-secondary" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            `}
          >
            {modules[key].title}
            {activeModule === key && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* 线性进度指示器 */}
      <div className="hidden md:block w-full h-1 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-purple"
          initial={{ width: "0%" }}
          animate={{ 
            width: `${(Object.keys(modules).indexOf(activeModule) + 1) * 100 / Object.keys(modules).length}%` 
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
} 