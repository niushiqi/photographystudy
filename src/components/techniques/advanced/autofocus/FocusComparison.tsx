'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FocusComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'phase' | 'contrast'>('phase');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center justify-center gap-3 mb-3">
          <button 
            className={`px-3 py-1.5 text-sm rounded-md transition-all ${activeTab === 'phase' 
              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
            onClick={() => setActiveTab('phase')}
          >
            相位检测对焦
          </button>
          <button 
            className={`px-3 py-1.5 text-sm rounded-md transition-all ${activeTab === 'contrast' 
              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
            onClick={() => setActiveTab('contrast')}
          >
            对比度检测对焦
          </button>
        </div>

        <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {activeTab === 'phase' ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="w-full max-w-xs h-32 bg-gray-200 dark:bg-gray-800 rounded-lg relative mb-4 overflow-hidden">
                <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* 光学分束器示意 */}
                  <path d="M 50,20 L 50,80" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 2" />
                  <path d="M 30,50 L 70,50" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 2" />
                  
                  {/* 光路 */}
                  <path d="M 10,50 L 50,50 L 70,30" stroke="#f59e0b" strokeWidth="2" fill="none" />
                  <path d="M 10,50 L 50,50 L 70,70" stroke="#f59e0b" strokeWidth="2" fill="none" />
                  
                  {/* 传感器 */}
                  <rect x="70" y="25" width="10" height="10" fill="#8b5cf6" opacity="0.5" />
                  <rect x="70" y="65" width="10" height="10" fill="#8b5cf6" opacity="0.5" />
                </svg>
                
                {/* 动画效果 */}
                <motion.div 
                  className="absolute top-[30%] left-[75%] w-2 h-2 bg-yellow-500 rounded-full"
                  animate={{ 
                    x: [0, 5, 0],
                    opacity: [1, 0.6, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute top-[70%] left-[75%] w-2 h-2 bg-yellow-500 rounded-full"
                  animate={{ 
                    x: [0, -5, 0],
                    opacity: [1, 0.6, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 max-w-xs">
                相位检测通过两个小型传感器从不同角度观察同一物体，测量光线相位差来快速计算对焦距离和方向
              </p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="w-full max-w-xs h-32 bg-gray-200 dark:bg-gray-800 rounded-lg relative mb-4">
                <div className="absolute h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-sm top-11 left-1/2 transform -translate-x-1/2"></div>
                
                {/* 对比度波形图 */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="contrastGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M 10,70 Q 30,50 50,70 Q 70,90 90,70" 
                    fill="none" 
                    stroke="url(#contrastGradient)" 
                    strokeWidth="2" 
                  />
                </svg>
                
                {/* 对焦镜头动画 */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-400 dark:bg-gray-600 rounded-full"
                  animate={{
                    y: [0, -5, -10, -5, 0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 max-w-xs">
                对比度检测通过测量图像锐度来判断对焦状态，不断调整对焦位置直至达到最高对比度
              </p>
            </motion.div>
          )}
        </div>
        <div className="mt-3">
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">优势</h4>
          {activeTab === 'phase' ? (
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
              <li>• 速度快，适合追踪移动主体</li>
              <li>• 精确度高，可预测对焦距离</li>
              <li>• 低光下表现优秀</li>
              <li>• 适合运动和野生动物摄影</li>
            </ul>
          ) : (
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
              <li>• 精确度极高，尤其适合静物拍摄</li>
              <li>• 可以在图像传感器上直接实现</li>
              <li>• 对焦点覆盖范围广</li>
              <li>• 适合微距和精细细节拍摄</li>
            </ul>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">双像素CMOS技术</h3>
        <div className="relative aspect-video bg-purple-50 dark:bg-purple-900/20 rounded-lg overflow-hidden border border-purple-100 dark:border-purple-900/20">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-xs h-24 mb-4">
              {/* 传感器微结构示意图 */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden">
                <div className="grid grid-cols-8 grid-rows-2 gap-0.5 p-1">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="relative">
                      <div className="absolute inset-0 flex">
                        <div className="w-1/2 bg-purple-300 dark:bg-purple-700 rounded-l-sm"></div>
                        <div className="w-1/2 bg-purple-500 dark:bg-purple-500 rounded-r-sm"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 光线入射示意 */}
              <svg className="absolute top-12 left-0 w-full h-12" viewBox="0 0 100 50">
                <path d="M 50,0 L 40,50" stroke="#f59e0b" strokeWidth="1" />
                <path d="M 50,0 L 50,50" stroke="#f59e0b" strokeWidth="1" />
                <path d="M 50,0 L 60,50" stroke="#f59e0b" strokeWidth="1" />
                <motion.path 
                  d="M 50,0 L 45,50" 
                  stroke="#f59e0b" 
                  strokeWidth="2"
                  animate={{ d: ["M 50,0 L 45,50", "M 50,0 L 55,50", "M 50,0 L 45,50"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 max-w-xs">
              双像素CMOS技术将每个像素分为两半，同时作为成像和相位检测传感器，实现全画面快速精确对焦
            </p>
          </div>
        </div>
        
        <div className="mt-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-900/20 p-3 rounded-lg">
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">性能比较</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-0.5 text-gray-600 dark:text-gray-400">
                <span>对焦速度</span>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 inline-block"></span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-0.5 text-gray-600 dark:text-gray-400">
                <span>对焦精度</span>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-0.5 text-gray-600 dark:text-gray-400">
                <span>低光性能</span>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 inline-block"></span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-0.5 text-gray-600 dark:text-gray-400">
                <span>画面覆盖</span>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusComparison;