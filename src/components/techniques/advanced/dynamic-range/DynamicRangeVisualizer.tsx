import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// 场景类型定义
interface SceneOption {
  id: string;
  name: string;
  dynamicRange: number; // EV值
  histogramData: number[];
  imageSrc: string;
  description: string;
}

// 预设场景
const sceneOptions: SceneOption[] = [
  {
    id: 'high-contrast',
    name: '高对比度场景',
    dynamicRange: 16,
    histogramData: [5, 2, 1, 3, 6, 8, 4, 2, 1, 3, 7, 15, 30, 25, 10, 5, 3, 12, 24, 36],
    imageSrc: '/images/techniques/postprocessing/high-contrast.jpg',
    description: '包含明亮天空和暗部阴影的高对比度场景，挑战相机动态范围极限'
  },
  {
    id: 'low-light',
    name: '低光环境',
    dynamicRange: 12,
    histogramData: [40, 32, 25, 18, 12, 8, 5, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    imageSrc: '/images/techniques/postprocessing/low-light.jpg',
    description: '夜间或室内低光照环境，考验相机高ISO性能和暗部细节保留能力'
  },
  {
    id: 'backlit',
    name: '逆光场景',
    dynamicRange: 14,
    histogramData: [10, 5, 3, 2, 1, 1, 2, 3, 5, 8, 12, 15, 20, 25, 32, 40, 35, 25, 15, 8],
    imageSrc: '/images/techniques/postprocessing/backlit.jpg',
    description: '主体背对光源的场景，容易导致主体曝光不足或背景过曝'
  },
  {
    id: 'standard',
    name: '标准场景',
    dynamicRange: 10,
    histogramData: [5, 8, 12, 18, 25, 32, 38, 32, 25, 18, 12, 8, 5, 3, 2, 1, 1, 0, 0, 0],
    imageSrc: '/images/techniques/postprocessing/standard.jpg',
    description: '均匀光照下的标准场景，适合大多数相机的动态范围捕捉能力'
  },
];

interface DynamicRangeVisualizerProps {
  initialSceneId?: string;
  showHistogram?: boolean;
}

const DynamicRangeVisualizer: React.FC<DynamicRangeVisualizerProps> = ({
  initialSceneId = 'high-contrast',
  showHistogram = true,
}) => {
  const [selectedSceneId, setSelectedSceneId] = useState(initialSceneId);
  const [exposureAdjustment, setExposureAdjustment] = useState(0); // EV值调整
  
  // 获取当前选中的场景
  const selectedScene = sceneOptions.find(scene => scene.id === selectedSceneId) || sceneOptions[0];
  
  // 应用曝光调整后的直方图数据
  const getAdjustedHistogram = () => {
    if (exposureAdjustment === 0) return selectedScene.histogramData;
    
    // 简化的直方图调整算法
    const shift = Math.round(exposureAdjustment * 4); // 4个柱状代表1EV
    const adjusted = [...selectedScene.histogramData];
    
    if (shift > 0) {
      // 向右移动 (增加曝光)
      return [...Array(shift).fill(0), ...adjusted.slice(0, adjusted.length - shift)];
    } else if (shift < 0) {
      // 向左移动 (减少曝光)
      return [...adjusted.slice(-shift), ...Array(-shift).fill(0)];
    }
    
    return adjusted;
  };
  
  // 计算直方图中过曝/欠曝区域
  const getHistogramAnalysis = () => {
    const adjusted = getAdjustedHistogram();
    
    // 简化的过曝/欠曝判定 (实际应更复杂)
    const underexposed = adjusted.slice(0, 4).reduce((sum, val) => sum + val, 0);
    const overexposed = adjusted.slice(-4).reduce((sum, val) => sum + val, 0);
    
    return {
      underexposed: Math.min(100, Math.round(underexposed / 2)), // 百分比
      overexposed: Math.min(100, Math.round(overexposed / 2)), // 百分比
    };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-purple-100 dark:border-purple-900/20">
      <div className="relative aspect-video overflow-hidden bg-black">
        {/* 场景图像 */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-60">
          <Image 
            src={selectedScene.imageSrc}
            alt={selectedScene.name}
            fill
            className="object-cover"
            style={{
              filter: `brightness(${1 + exposureAdjustment * 0.25})` // 简化的曝光调整
            }}
          />
          
          {/* 过曝/欠曝指示 */}
          {Math.abs(exposureAdjustment) > 1.5 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="px-4 py-2 bg-black bg-opacity-70 rounded-md text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {exposureAdjustment > 1.5 ? 
                  '⚠️ 高光区域过曝，细节丢失' : 
                  '⚠️ 暗部区域欠曝，细节丢失'}
              </motion.div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {/* 场景选择器 */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">场景选择</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {sceneOptions.map(scene => (
              <button
                key={scene.id}
                className={`text-xs px-3 py-2 rounded-md transition-colors ${
                  selectedSceneId === scene.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                }`}
                onClick={() => setSelectedSceneId(scene.id)}
              >
                {scene.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{selectedScene.description}</p>
        </div>
        
        {/* 曝光调整 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">曝光调整</h3>
            <span className={`text-xs font-medium ${
              Math.abs(exposureAdjustment) > 2 
                ? 'text-red-500'
                : Math.abs(exposureAdjustment) > 1
                ? 'text-yellow-500'
                : 'text-green-500'
            }`}>
              {exposureAdjustment > 0 ? '+' : ''}{exposureAdjustment.toFixed(1)} EV
            </span>
          </div>
          
          <input
            type="range"
            min="-3"
            max="3"
            step="0.1"
            value={exposureAdjustment}
            onChange={(e) => setExposureAdjustment(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>-3 EV</span>
            <span>0</span>
            <span>+3 EV</span>
          </div>
        </div>
        
        {/* 直方图显示 */}
        {showHistogram && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">亮度直方图</h3>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-md p-2 h-24 flex items-end">
              {getAdjustedHistogram().map((value, index) => {
                // 确定柱状颜色
                let barColor = 'bg-gray-400 dark:bg-gray-500';
                if (index < 4) { // 暗部
                  barColor = 'bg-blue-500 dark:bg-blue-600';
                } else if (index >= 16) { // 高光
                  barColor = 'bg-yellow-500 dark:bg-yellow-600';
                }
                
                // 如果调整曝光后有过曝/欠曝警告
                if ((exposureAdjustment > 1.5 && index >= 16) || (exposureAdjustment < -1.5 && index < 4)) {
                  barColor = 'bg-red-500 dark:bg-red-600';
                }
                
                return (
                  <motion.div
                    key={index}
                    className={`w-full mx-px ${barColor}`}
                    style={{ height: `${Math.min(100, value * 2)}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(100, value * 2)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </div>
            
            {/* 直方图分析 */}
            <div className="flex items-center justify-between mt-2 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
                <span className="text-gray-600 dark:text-gray-400">暗部: {getHistogramAnalysis().underexposed}%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-sm mr-1"></div>
                <span className="text-gray-600 dark:text-gray-400">高光: {getHistogramAnalysis().overexposed}%</span>
              </div>
            </div>
          </div>
        )}
        
        {/* 动态范围指示器 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">场景动态范围</h3>
          <div className="h-6 bg-gradient-to-r from-black via-gray-500 to-white rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center px-3">
              <div className="h-2 bg-purple-500 rounded-full" style={{ width: `${(selectedScene.dynamicRange/20)*100}%` }}></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0 EV</span>
            <span>{selectedScene.dynamicRange} EV</span>
          </div>
          
          <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
            <p><span className="font-medium">技术提示：</span> {selectedScene.name}下的动态范围约为{selectedScene.dynamicRange} EV，{
              selectedScene.dynamicRange > 14 
                ? '对相机传感器是较大挑战，考虑使用HDR技术或分区测光以保留更多细节。'
                : selectedScene.dynamicRange > 11
                ? '多数中高端相机能够应对，但仍需注意高光和暗部细节的平衡。'
                : '大多数现代相机都能轻松应对，曝光准确即可捕捉全部细节。'
            }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicRangeVisualizer; 