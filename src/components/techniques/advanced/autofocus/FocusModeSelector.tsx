'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";

type FocusMode = {
  id: string;
  name: string;
  canonName: string;
  nikonName: string;
  sonyName: string;
  description: string;
  scenes: string[];
  technique: string;
};

const focusModes: FocusMode[] = [
  {
    id: 'single',
    name: '单次对焦',
    canonName: 'One-Shot AF',
    nikonName: 'AF-S',
    sonyName: 'AF-S',
    description: '对焦一次后锁定，适合静止主体',
    scenes: ['风景', '建筑', '静物', '产品', '肖像'],
    technique: '半按快门进行对焦，保持半按状态可锁定对焦，构图后完全按下快门'
  },
  {
    id: 'continuous',
    name: '连续对焦',
    canonName: 'AI Servo',
    nikonName: 'AF-C',
    sonyName: 'AF-C',
    description: '持续追踪对焦，适合运动物体',
    scenes: ['运动', '野生动物', '儿童', '宠物', '街拍'],
    technique: '将对焦点保持在运动主体上，相机会自动调整对焦以跟踪主体'
  },
  {
    id: 'auto',
    name: '自动对焦',
    canonName: 'AI Focus',
    nikonName: 'AF-A',
    sonyName: 'AF-A',
    description: '自动在单次和连续对焦之间切换',
    scenes: ['日常拍摄', '多变场景', '旅行', '派对', '家庭活动'],
    technique: '相机会自动检测主体是否移动，并相应地切换对焦模式'
  },
  {
    id: 'manual',
    name: '手动对焦',
    canonName: 'MF',
    nikonName: 'MF',
    sonyName: 'MF',
    description: '完全手动控制对焦，适合精确对焦场景',
    scenes: ['微距', '天文', '夜景', '极低光', '创意散焦'],
    technique: '使用镜头上的对焦环手动调整对焦，可配合对焦峰值辅助功能'
  }
];

const FocusModeSelector: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string>('single');
  const [showBrandNames, setShowBrandNames] = useState<boolean>(false);
  
  const selectedModeData = focusModes.find(mode => mode.id === selectedMode);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 md:gap-3">
        {focusModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`px-3 py-1.5 text-sm rounded-md transition-all ${
              selectedMode === mode.id
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium border-2 border-purple-300 dark:border-purple-700'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {mode.name}
          </button>
        ))}
      </div>
      
      {selectedModeData && (
        <motion.div
          key={selectedModeData.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {selectedModeData.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">品牌命名</span>
              <button
                onClick={() => setShowBrandNames(!showBrandNames)}
                className={`w-10 h-5 rounded-full relative transition-colors ${
                  showBrandNames ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-transform ${
                    showBrandNames ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                ></span>
              </button>
            </div>
          </div>
          
          {showBrandNames && (
            <div className="grid grid-cols-3 gap-2 p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
              <div className="text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">佳能</span>
                <p className="text-sm font-medium">{selectedModeData.canonName}</p>
              </div>
              <div className="text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">尼康</span>
                <p className="text-sm font-medium">{selectedModeData.nikonName}</p>
              </div>
              <div className="text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">索尼</span>
                <p className="text-sm font-medium">{selectedModeData.sonyName}</p>
              </div>
            </div>
          )}
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {selectedModeData.description}
            </p>
            
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">适用场景</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedModeData.scenes.map((scene) => (
                <Badge key={scene} variant="outline" className="bg-purple-50 dark:bg-purple-900/20">
                  {scene}
                </Badge>
              ))}
            </div>
            
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">使用技巧</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {selectedModeData.technique}
            </p>
          </div>
          
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 flex items-center justify-center">
              {selectedMode === 'single' && (
                <motion.div 
                  className="w-full h-full flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg className="w-24 h-24 mb-4" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                    <circle cx="50" cy="50" r="2" fill="#8b5cf6" />
                    <circle cx="50" cy="50" r="10" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 1" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 1" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 1" />
                  </svg>
                  <p className="text-sm text-center max-w-xs text-gray-600 dark:text-gray-400">
                    单次对焦锁定在一个点上，即使主体或相机移动，对焦也不会改变
                  </p>
                </motion.div>
              )}
              
              {selectedMode === 'continuous' && (
                <motion.div 
                  className="w-full h-full flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg className="w-60 h-24 mb-4" viewBox="0 0 200 50">
                    <motion.circle 
                      cx="30" 
                      cy="25" 
                      r="10" 
                      fill="#8b5cf6" 
                      opacity="0.7"
                      animate={{ cx: [30, 170, 30] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle 
                      cx="30" 
                      cy="25" 
                      r="15" 
                      fill="none" 
                      stroke="#8b5cf6" 
                      strokeWidth="2" 
                      strokeDasharray="3 1"
                      animate={{ cx: [30, 170, 30] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </svg>
                  <p className="text-sm text-center max-w-xs text-gray-600 dark:text-gray-400">
                    连续对焦会持续追踪移动主体，不断调整对焦以保持主体清晰
                  </p>
                </motion.div>
              )}
              
              {selectedMode === 'auto' && (
                <motion.div 
                  className="w-full h-full flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg className="w-60 h-24 mb-4" viewBox="0 0 200 50">
                    <rect x="20" y="15" width="160" height="20" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 1" />
                    <motion.circle 
                      cx="50" 
                      cy="25" 
                      r="10" 
                      fill="#8b5cf6" 
                      opacity="0.7"
                      animate={{ 
                        cx: [50, 50, 50, 50, 50, 90, 130, 150, 150, 150],
                        opacity: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.circle 
                      cx="50" 
                      cy="25" 
                      r="15" 
                      fill="none" 
                      stroke="#8b5cf6" 
                      strokeWidth="2"
                      animate={{ 
                        cx: [50, 50, 50, 50, 50, 90, 130, 150, 150, 150]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.text 
                      x="50" 
                      y="5" 
                      fontSize="8" 
                      textAnchor="middle"
                      fill="#8b5cf6"
                      animate={{ 
                        opacity: [1, 1, 1, 1, 1, 0],
                        x: [50, 50, 50, 50, 50, 50]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      单次对焦模式
                    </motion.text>
                    <motion.text 
                      x="120" 
                      y="5" 
                      fontSize="8" 
                      textAnchor="middle"
                      fill="#8b5cf6"
                      animate={{ 
                        opacity: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                        x: [120, 120, 120, 120, 120, 120]
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                    >
                      连续对焦模式
                    </motion.text>
                  </svg>
                  <p className="text-sm text-center max-w-xs text-gray-600 dark:text-gray-400">
                    自动对焦会智能判断主体是否静止或移动，自动切换对焦模式
                  </p>
                </motion.div>
              )}
              
              {selectedMode === 'manual' && (
                <motion.div 
                  className="w-full h-full flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg className="w-60 h-24 mb-4" viewBox="0 0 100 50">
                    <rect x="30" y="20" width="40" height="10" rx="5" fill="#8b5cf6" opacity="0.3" />
                    <motion.rect 
                      x="35" 
                      y="20" 
                      width="5" 
                      height="10" 
                      rx="2.5" 
                      fill="#8b5cf6"
                      animate={{ x: [35, 60, 35] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle 
                      cx="50" 
                      cy="35" 
                      r="2" 
                      fill="#8b5cf6"
                      animate={{ 
                        r: [2, 8, 2],
                        opacity: [1, 0.3, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </svg>
                  <p className="text-sm text-center max-w-xs text-gray-600 dark:text-gray-400">
                    手动对焦完全由摄影师控制，适合精确控制对焦平面或自动对焦困难的场景
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FocusModeSelector; 