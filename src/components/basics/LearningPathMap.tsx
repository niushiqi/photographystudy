import React from 'react';
import { motion } from 'framer-motion';

type Module = {
  id: string;
  name: string;
  icon?: string;
  description?: string;
};

type LearningPathMapProps = {
  modules: Module[];
  progress: Record<string, string>;
  activeModule: string;
  onModuleSelect: (moduleId: string) => void;
};

export default function LearningPathMap({ 
  modules, 
  progress, 
  activeModule,
  onModuleSelect 
}: LearningPathMapProps) {
  
  // 获取模块状态的颜色
  const getStatusColor = (moduleId: string) => {
    switch(progress[moduleId]) {
      case 'completed':
        return 'bg-green-500';
      case 'inProgress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300 dark:bg-gray-600';
    }
  };
  
  // 获取模块的标签文本
  const getStatusLabel = (moduleId: string) => {
    switch(progress[moduleId]) {
      case 'completed':
        return '已完成';
      case 'inProgress':
        return '学习中';
      default:
        return '未开始';
    }
  };
  
  // 获取模块的图标
  const getModuleIcon = (moduleId: string) => {
    switch(moduleId) {
      case 'camera':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'exposure':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'lens':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'focus':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'light':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'composition':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case 'color':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  // 检查模块是否可以开始学习 (前置条件已满足)
  const isModuleAvailable = (moduleId: string, index: number) => {
    // 第一个模块始终可用
    if (index === 0) return true;
    
    // 如果前一个模块已完成或正在学习，则当前模块可用
    const prevModule = modules[index - 1].id;
    return ['completed', 'inProgress'].includes(progress[prevModule]);
  };

  // 获取线条完成的百分比
  const getLineCompletionPercentage = () => {
    let completedCount = 0;
    let inProgressCount = 0;
    
    modules.forEach(module => {
      if (progress[module.id] === 'completed') {
        completedCount++;
      } else if (progress[module.id] === 'inProgress') {
        inProgressCount += 0.5; // 正在进行的模块算半个完成度
      }
    });
    
    return Math.min(100, Math.round((completedCount + inProgressCount) / modules.length * 100));
  };
  
  return (
    <div className="w-full overflow-x-auto py-6">
      <div className="min-w-max px-2">
        {/* 学习进度指示 */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">学习进度</span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
              {getLineCompletionPercentage()}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${getLineCompletionPercentage()}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
        
        {/* 学习路径图，类似地铁线路图 */}
        <div className="relative w-full h-28 flex items-center">
          {/* 背景连接线 */}
          <div className="absolute h-2 bg-gray-200 dark:bg-gray-700 rounded-full" 
               style={{
                 left: '40px',
                 right: '40px',
                 top: '50%',
                 transform: 'translateY(-50%)'
               }}></div>
          
          {/* 完成的连接线 */}
          <motion.div 
            className="absolute h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
            style={{
              left: '40px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${getLineCompletionPercentage()}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          
          {/* 模块站点 */}
          <div className="relative flex justify-between w-full px-10 z-10">
            {modules.map((module, index) => (
              <motion.div 
                key={module.id} 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => isModuleAvailable(module.id, index) && onModuleSelect(module.id)}
                  disabled={!isModuleAvailable(module.id, index)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    activeModule === module.id 
                      ? 'border-yellow-400 shadow-lg scale-125 bg-white dark:bg-gray-800' 
                      : `border-white dark:border-gray-700 ${getStatusColor(module.id)}`
                  } ${
                    !isModuleAvailable(module.id, index) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer hover:scale-110'
                  }`}
                >
                  {activeModule === module.id ? (
                    <motion.div 
                      className="text-blue-600 dark:text-blue-300"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      {getModuleIcon(module.id)}
                    </motion.div>
                  ) : (
                    <span className="text-sm font-bold text-white">{index + 1}</span>
                  )}
                </button>
                
                <div className="mt-2 text-center">
                  <div className={`text-xs font-medium ${
                    activeModule === module.id ? 'text-blue-600 dark:text-blue-300' : ''
                  }`}>
                    {module.name}
                  </div>
                  <div className={`text-[10px] mt-1 px-2 py-0.5 rounded-full ${
                    progress[module.id] === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    progress[module.id] === 'inProgress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                    'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {getStatusLabel(module.id)}
                  </div>
                </div>
                
                {/* 模块之间的连接线 */}
                {index < modules.length - 1 && (
                  <div 
                    className={`absolute h-0.5 top-6 ${
                      progress[module.id] === 'completed' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    style={{
                      left: `${(index + 1) * (100 / (modules.length - 1)) - 4}%`,
                      width: `${100 / (modules.length - 1) - 8}%`,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 