'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type CameraModel = {
  id: string;
  name: string;
  brand: string;
  year: number;
  points: number;
  crossType: number;
  pointsCoverage: number;
  lowLightFocus: number; // -3 EV to -6 EV (0-100%)
  trackingPerformance: number; // 0-100%
  eyeDetection: boolean;
  animalEyeDetection: boolean;
  layout: 'grid' | 'diamond' | 'custom';
  gridSize?: { rows: number; cols: number };
};

const cameraModels: CameraModel[] = [
  {
    id: 'entry-dslr',
    name: '入门单反',
    brand: '通用',
    year: 2018,
    points: 9,
    crossType: 1,
    pointsCoverage: 40,
    lowLightFocus: 30, // -3 EV
    trackingPerformance: 40,
    eyeDetection: false,
    animalEyeDetection: false,
    layout: 'diamond',
  },
  {
    id: 'mid-dslr',
    name: '中端单反',
    brand: '通用',
    year: 2020,
    points: 45,
    crossType: 27,
    pointsCoverage: 60,
    lowLightFocus: 50, // -4 EV
    trackingPerformance: 70,
    eyeDetection: true,
    animalEyeDetection: false,
    layout: 'grid',
    gridSize: { rows: 7, cols: 7 }
  },
  {
    id: 'mirrorless',
    name: '无反相机',
    brand: '通用',
    year: 2022,
    points: 493,
    crossType: 493,
    pointsCoverage: 90,
    lowLightFocus: 80, // -5.5 EV
    trackingPerformance: 90,
    eyeDetection: true,
    animalEyeDetection: true,
    layout: 'grid',
    gridSize: { rows: 17, cols: 29 }
  },
  {
    id: 'flagship',
    name: '旗舰相机',
    brand: '通用',
    year: 2023,
    points: 1053,
    crossType: 1053,
    pointsCoverage: 100,
    lowLightFocus: 100, // -6 EV
    trackingPerformance: 100,
    eyeDetection: true,
    animalEyeDetection: true,
    layout: 'grid',
    gridSize: { rows: 33, cols: 31 }
  }
];

const FocusPointVisualizer: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState<string>('mid-dslr');
  const [showViewfinder, setShowViewfinder] = useState<boolean>(true);
  
  const camera = cameraModels.find(c => c.id === selectedCamera);
  
  const renderFocusPoints = (camera: CameraModel) => {
    if (camera.layout === 'diamond') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-500"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
          <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
          <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
          <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-purple-300"></div>
          <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-purple-300"></div>
          <div className="absolute top-2/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-purple-300"></div>
          <div className="absolute top-2/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-purple-300"></div>
        </div>
      );
    }
    
    if (camera.layout === 'grid' && camera.gridSize) {
      const { rows, cols } = camera.gridSize;
      const isMassiveGrid = rows * cols > 100;
      
      if (isMassiveGrid) {
        // 对于大量对焦点，渲染成区域而不是单独的点
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div 
              className={`relative bg-purple-500 bg-opacity-20 border-2 border-purple-500 rounded-sm`}
              style={{ 
                width: `${camera.pointsCoverage}%`, 
                height: `${camera.pointsCoverage}%`,
                maxWidth: '95%',
                maxHeight: '95%'
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full">
                {/* 示意性地显示一些突出的对焦点 */}
                {[...Array(15)].map((_, i) => {
                  const randomX = Math.random() * 100;
                  const randomY = Math.random() * 100;
                  return (
                    <div 
                      key={i}
                      className="absolute w-1 h-1 bg-purple-500 rounded-full"
                      style={{ 
                        top: `${randomY}%`, 
                        left: `${randomX}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    ></div>
                  );
                })}
                
                {/* 中央对焦点 */}
                <div 
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-600 rounded-full"
                  style={{ transform: 'translate(-50%, -50%)' }}
                ></div>
              </div>
              <div className="absolute bottom-1 right-1 text-[8px] text-purple-700 dark:text-purple-300 bg-white dark:bg-gray-800 px-1 rounded">
                {camera.points} 点
              </div>
            </div>
          </div>
        );
      }
      
      // 对于适量的对焦点，渲染实际的网格
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div 
            className="grid gap-1"
            style={{ 
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              width: `${camera.pointsCoverage}%`, 
              height: `${camera.pointsCoverage}%`,
              maxWidth: '95%',
              maxHeight: '95%'
            }}
          >
            {[...Array(rows * cols)].map((_, i) => {
              const row = Math.floor(i / cols);
              const col = i % cols;
              const isCenter = row === Math.floor(rows / 2) && col === Math.floor(cols / 2);
              const isCross = isCenter || 
                (row % 2 === 0 && col % 2 === 0) || 
                (row === Math.floor(rows / 2) || col === Math.floor(cols / 2));
              
              return (
                <div 
                  key={i}
                  className={`
                    w-full h-full rounded-full
                    ${isCenter ? 'bg-purple-600' : isCross ? 'bg-purple-400' : 'bg-purple-300 opacity-50'}
                  `}
                  style={{ 
                    width: isCenter ? '6px' : isCross ? '4px' : '3px', 
                    height: isCenter ? '6px' : isCross ? '4px' : '3px',
                    margin: 'auto'
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 md:gap-3">
        {cameraModels.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedCamera(model.id)}
            className={`px-3 py-1.5 text-sm rounded-md transition-all ${
              selectedCamera === model.id
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium border-2 border-purple-300 dark:border-purple-700'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {model.name}
          </button>
        ))}
      </div>
      
      {camera && (
        <motion.div
          key={camera.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-3 flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">对焦点覆盖范围</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">取景器视图</span>
                  <button
                    onClick={() => setShowViewfinder(!showViewfinder)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${
                      showViewfinder ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-transform ${
                        showViewfinder ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
              
              <div className="relative aspect-[3/2] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {showViewfinder && (
                  <div className="absolute inset-0">
                    <img 
                      src="/images/techniques/simulator/landscape.jpg" 
                      alt="取景器场景"
                      className="w-full h-full object-cover opacity-20"
                    />
                  </div>
                )}
                
                <div className="absolute inset-0">
                  {renderFocusPoints(camera)}
                </div>
                
                <div className="absolute bottom-2 right-2 text-xs bg-black bg-opacity-50 text-white px-2 py-0.5 rounded">
                  {camera.pointsCoverage}% 画面覆盖
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">对焦点数量</h4>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500" 
                      style={{width: `${Math.min(camera.points / 1053 * 100, 100)}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
                    <span>9点</span>
                    <span>{camera.points}点</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">十字型对焦点</h4>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500" 
                      style={{width: `${Math.min(camera.crossType / camera.points * 100, 100)}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
                    <span>0%</span>
                    <span>{Math.round(camera.crossType / camera.points * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">对焦系统性能</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1 text-gray-600 dark:text-gray-400">
                    <span>弱光对焦能力</span>
                    <span className="text-xs">
                      {camera.lowLightFocus <= 30 ? '-3 EV' : 
                       camera.lowLightFocus <= 50 ? '-4 EV' : 
                       camera.lowLightFocus <= 80 ? '-5 EV' : '-6 EV'}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
                      style={{width: `${camera.lowLightFocus}%`}}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1 text-gray-600 dark:text-gray-400">
                    <span>追踪性能</span>
                    <span className="text-xs">
                      {camera.trackingPerformance <= 40 ? '基础' : 
                       camera.trackingPerformance <= 70 ? '良好' : 
                       camera.trackingPerformance <= 90 ? '出色' : '专业级'}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500" 
                      style={{width: `${camera.trackingPerformance}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 flex items-center justify-center rounded-full border ${
                      camera.eyeDetection 
                        ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500' 
                        : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                    }`}>
                      {camera.eyeDetection && (
                        <svg className="w-3 h-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">人眼检测</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 flex items-center justify-center rounded-full border ${
                      camera.animalEyeDetection 
                        ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500' 
                        : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                    }`}>
                      {camera.animalEyeDetection && (
                        <svg className="w-3 h-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">动物眼检测</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="text-xs font-semibold mb-2 text-purple-600 dark:text-purple-400">专业提示</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {camera.id === 'entry-dslr' && '对于入门级相机，在低光环境使用中央对焦点获得最佳结果，可配合对焦锁定后重新构图的技巧。'}
                    {camera.id === 'mid-dslr' && '中端相机拥有更多十字型对焦点，提供更快更准确的对焦，适合拍摄动态场景，建议学习对焦点选择和跟踪模式。'}
                    {camera.id === 'mirrorless' && '无反相机的全像素双核对焦提供了广泛的对焦点覆盖，是拍摄动作和野生动物的理想选择。尝试使用眼部检测功能提高人像拍摄的命中率。'}
                    {camera.id === 'flagship' && '旗舰机型拥有业界领先的对焦系统，能在极端低光下准确对焦，支持智能主体识别和跟踪。充分利用自定义对焦区域和AI主体检测功能获得专业级成果。'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FocusPointVisualizer;