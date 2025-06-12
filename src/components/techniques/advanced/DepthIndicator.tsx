import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DepthIndicatorProps {
  initialDepth?: number;
  onChange?: (depth: number) => void;
}

const DepthIndicator: React.FC<DepthIndicatorProps> = ({ 
  initialDepth = 2, 
  onChange 
}) => {
  const [currentDepth, setCurrentDepth] = useState(initialDepth);
  
  const handleDepthChange = (depth: number) => {
    setCurrentDepth(depth);
    if (onChange) {
      onChange(depth);
    }
  };
  
  const depthLevels = [
    { value: 1, label: '基础', description: '适合摄影初学者的入门解释' },
    { value: 2, label: '进阶', description: '适合有一定基础的摄影爱好者' },
    { value: 3, label: '专业', description: '包含深入技术细节和原理解析' },
    { value: 4, label: '专家', description: '涵盖科学原理和复杂数学模型' }
  ];

  return (
    <div className="bg-gradient-to-r from-purple-900/5 to-purple-500/10 rounded-lg border border-purple-200/20 overflow-hidden">
      <div className="p-4 border-b border-purple-200/20">
        <h3 className="text-lg font-medium text-purple-900 dark:text-purple-100">内容深度调节</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">根据您的理解能力调整技术解析深度</p>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          {depthLevels.map(level => (
            <div 
              key={level.value}
              className={`relative cursor-pointer flex-1 text-center`}
              onClick={() => handleDepthChange(level.value)}
            >
              <motion.div 
                className={`h-1 mx-1 rounded-full ${currentDepth >= level.value 
                  ? 'bg-gradient-to-r from-purple-600 to-purple-400' 
                  : 'bg-gray-200 dark:bg-gray-700'}`}
                whileHover={{ scale: 1.05 }}
              />
              <div className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                {level.label}
              </div>
              
              {currentDepth === level.value && (
                <motion.div 
                  className="absolute -bottom-6 left-0 right-0 text-xs text-center text-purple-600 dark:text-purple-400"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="h-4 w-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
          <p className="text-sm text-purple-900 dark:text-purple-100">
            <span className="font-medium">当前级别: </span>
            {depthLevels.find(level => level.value === currentDepth)?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepthIndicator; 