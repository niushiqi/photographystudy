import React from 'react';

type Module = {
  id: string;
  name: string;
  icon?: string; // Icon identifier string
  description?: string;
};

type ModuleNavigationProps = {
  modules: Module[];
  activeModule: string;
  onModuleChange: (moduleId: string) => void;
  progress?: Record<string, string>;
  getIcon?: (iconName: string) => React.ReactNode; // Optional function to get icons
};

// Icons for each module
const getDefaultModuleIcon = (moduleId: string) => {
  switch(moduleId) {
    case 'camera':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'exposure':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'lens':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'focus':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case 'light':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'composition':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
    case 'color':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      );
    default:
      return null;
  }
};

// Module descriptions
const getModuleDescription = (moduleId: string) => {
  switch(moduleId) {
    case 'camera':
      return '相机工作原理、各部件功能、类型区别';
    case 'exposure':
      return '光圈、快门、ISO及其作用原理';
    case 'lens':
      return '焦距、光圈、视角、镜头类型';
    case 'focus':
      return '对焦原理、景深概念、清晰度影响因素';
    case 'light':
      return '基础光线类型、方向、质感和色温';
    case 'composition':
      return '基础构图规则、视觉引导、画面平衡';
    case 'color':
      return '色彩理论基础、白平衡、色彩情绪';
    default:
      return '';
  }
};

// 获取进度状态对应的样式
const getProgressStyles = (moduleId: string, progress?: Record<string, string>) => {
  if (!progress) return {};
  
  switch(progress[moduleId]) {
    case 'completed':
      return {
        indicatorColor: 'bg-green-500',
        borderColor: 'border-green-400',
        hoverBg: 'hover:bg-green-50 dark:hover:bg-green-900/20',
        textColor: 'text-green-700 dark:text-green-400'
      };
    case 'inProgress':
      return {
        indicatorColor: 'bg-blue-500',
        borderColor: 'border-blue-400',
        hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
        textColor: 'text-blue-700 dark:text-blue-400'
      };
    default:
      return {
        indicatorColor: 'bg-gray-300 dark:bg-gray-600',
        borderColor: 'border-transparent',
        hoverBg: 'hover:bg-gray-50 dark:hover:bg-gray-700',
        textColor: 'text-gray-700 dark:text-gray-300'
      };
  }
};

export default function ModuleNavigation({ 
  modules, 
  activeModule, 
  onModuleChange, 
  progress,
  getIcon
}: ModuleNavigationProps) {
  // Render an icon using custom function if provided or fall back to default
  const renderIcon = (module: Module) => {
    if (getIcon && module.icon) {
      return getIcon(module.icon);
    }
    return getDefaultModuleIcon(module.id);
  };

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {modules.map((module) => {
        const progressStyles = getProgressStyles(module.id, progress);
        return (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={`relative flex items-center w-full px-4 py-3 transition-all text-left ${
              activeModule === module.id
                ? 'bg-blue-50 dark:bg-blue-900/20'
                : `${progressStyles.hoverBg}`
            }`}
          >
            {/* 进度指示器 */}
            {progress && (
              <div className={`absolute top-1/2 right-4 transform -translate-y-1/2 w-2.5 h-2.5 rounded-full ${progressStyles.indicatorColor}`}></div>
            )}
            
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                activeModule === module.id
                  ? 'bg-blue-100 dark:bg-blue-800/60 text-blue-600 dark:text-blue-300'
                  : `bg-gray-100 dark:bg-gray-700 ${progressStyles.textColor}`
              }`}
            >
              {renderIcon(module)}
            </div>
            
            <div>
              <span className={`font-medium ${
                activeModule === module.id
                  ? 'text-blue-700 dark:text-blue-300'
                  : progressStyles.textColor
              }`}>
                {module.name}
              </span>
              
              {module.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {module.description}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}