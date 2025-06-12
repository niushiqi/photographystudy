import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// 测光模式类型
type MeteringMode = 'evaluative' | 'center-weighted' | 'spot' | 'partial';

// 挑战场景类型
type ChallengingScene = 'backlit' | 'snow' | 'spotlight' | 'high-contrast';

interface MeteringSystemExplorerProps {
  meteringModes?: MeteringMode[];
  challengingScenes?: ChallengingScene[];
  histogramAnalysis?: boolean;
  exposureSimulation?: boolean;
}

// 测光模式数据
const meteringModesData = {
  evaluative: {
    title: '评价测光',
    altNames: '矩阵测光/多区测光',
    description: '将画面分割为多个区域分别测量，通过复杂算法计算最终曝光',
    strengthsWeaknesses: '优势：适应性强，适合大多数场景；缺点：算法不透明，有时难以预测',
    bestUseCase: '日常拍摄、风景、人像等大多数场景',
    iconPath: '📊',
    visualMap: '/images/techniques/postprocessing/evaluative-metering.jpg',
    recommendation: '建议作为默认测光模式，除非有特殊需求'
  },
  'center-weighted': {
    title: '中央重点测光',
    altNames: '中心重点测光',
    description: '整个画面都参与测光，但中心区域占60-80%的权重',
    strengthsWeaknesses: '优势：结果直观易懂；缺点：容易受背景亮度干扰',
    bestUseCase: '人像、静物等主体在中心的场景',
    iconPath: '⭕',
    visualMap: '/images/techniques/postprocessing/center-weighted-metering.jpg',
    recommendation: '适合理解曝光后想要更可预测的测光模式'
  },
  spot: {
    title: '点测光',
    altNames: '单点测光',
    description: '仅测量取景器中心约1-5%区域的亮度',
    strengthsWeaknesses: '优势：精确测量特定区域；缺点：需要精确对准，忽略其他区域',
    bestUseCase: '逆光、舞台、野生动物等高对比度场景',
    iconPath: '🔍',
    visualMap: '/images/techniques/postprocessing/spot-metering.jpg',
    recommendation: '高级用户掌握的必备技术，需要配合曝光补偿使用'
  },
  partial: {
    title: '局部测光',
    altNames: '部分测光',
    description: '测量中心约6-15%区域的亮度',
    strengthsWeaknesses: '优势：比点测光覆盖范围更大；缺点：仍需精确对准主体',
    bestUseCase: '逆光人像、高对比度场景',
    iconPath: '⚪',
    visualMap: '/images/techniques/postprocessing/partial-metering.jpg',
    recommendation: '点测光的折中版本，更容易操作但仍保留精确性'
  }
};

// 挑战场景数据
const challengingScenesData = {
  backlit: {
    title: '逆光场景',
    description: '主体背对光源，容易曝光不足',
    imageSrc: '/images/techniques/postprocessing/backlit-scene.jpg',
    histogramData: [35, 25, 15, 10, 5, 2, 1, 0, 0, 0, 0, 2, 5, 10, 15, 25, 35, 45, 40, 30],
    recommendedMode: 'spot',
    explanation: '主体暗、背景亮的典型场景，评价测光会被背景亮度干扰导致主体曝光不足，建议使用点测光对准主体'
  },
  snow: {
    title: '雪景场景',
    description: '大面积高亮度场景，容易曝光不足',
    imageSrc: '/images/techniques/postprocessing/snow-scene.jpg',
    histogramData: [0, 0, 2, 5, 10, 15, 25, 30, 35, 40, 45, 40, 35, 30, 25, 15, 10, 5, 2, 0],
    recommendedMode: 'evaluative',
    explanation: '相机倾向于将雪景压暗至中灰，建议使用评价测光配合+1~2EV曝光补偿获得明亮的雪景'
  },
  spotlight: {
    title: '聚光灯场景',
    description: '舞台、音乐会等小范围高亮度场景',
    imageSrc: '/images/techniques/postprocessing/spotlight-scene.jpg',
    histogramData: [40, 35, 30, 25, 20, 15, 10, 5, 2, 1, 0, 0, 0, 1, 5, 15, 30, 45, 35, 25],
    recommendedMode: 'spot',
    explanation: '黑暗背景中的明亮主体，使用点测光对准主体可获得准确曝光，避免被大面积暗部影响'
  },
  'high-contrast': {
    title: '高对比度场景',
    description: '同时包含非常亮和非常暗的区域',
    imageSrc: '/images/techniques/postprocessing/high-contrast-scene.jpg',
    histogramData: [25, 20, 15, 10, 5, 2, 1, 0, 0, 0, 0, 0, 0, 0, 5, 15, 25, 35, 45, 40],
    recommendedMode: 'center-weighted',
    explanation: '明暗差异大的场景，需要根据主体位置选择测光模式，中央重点测光提供良好的平衡，也可考虑HDR技术'
  }
};

const MeteringSystemExplorer: React.FC<MeteringSystemExplorerProps> = ({
  meteringModes = ['evaluative', 'center-weighted', 'spot', 'partial'],
  challengingScenes = ['backlit', 'snow', 'spotlight', 'high-contrast'],
  histogramAnalysis = true,
  exposureSimulation = true
}) => {
  // 当前选中的测光模式
  const [selectedMode, setSelectedMode] = useState<MeteringMode>(meteringModes[0]);
  // 当前选中的场景
  const [selectedScene, setSelectedScene] = useState<ChallengingScene>(challengingScenes[0]);
  // 曝光补偿值
  const [exposureCompensation, setExposureCompensation] = useState(0);
  
  // 获取当前选中的测光模式数据
  const currentMode = meteringModesData[selectedMode];
  // 获取当前选中的场景数据
  const currentScene = challengingScenesData[selectedScene];
  
  // 根据所选模式和场景计算推荐曝光补偿
  const getRecommendedExposureCompensation = () => {
    if (selectedScene === 'snow') {
      return 1.5; // 雪景通常需要+1.5EV
    } else if (selectedScene === 'backlit' && selectedMode === 'evaluative') {
      return 1.0; // 逆光场景使用评价测光时需要+1.0EV
    } else if (selectedScene === 'high-contrast' && selectedMode === 'spot') {
      return -0.5; // 高对比度场景使用点测光可能需要-0.5EV避免高光过曝
    }
    return 0;
  };
  
  // 模拟当前测光模式和曝光补偿下的场景亮度
  const getSimulatedBrightness = () => {
    // 基础亮度
    let baseBrightness = 1.0;
    
    // 根据场景和测光模式调整基础亮度
    if (selectedScene === 'backlit') {
      if (selectedMode === 'evaluative' || selectedMode === 'center-weighted') {
        baseBrightness = 0.7; // 逆光场景下这些模式会导致主体偏暗
      }
    } else if (selectedScene === 'snow') {
      baseBrightness = 0.8; // 雪景会被压暗
    } else if (selectedScene === 'spotlight') {
      if (selectedMode === 'evaluative') {
        baseBrightness = 0.9;
      } else if (selectedMode === 'spot') {
        baseBrightness = 1.2; // 点测光会使主体偏亮
      }
    }
    
    // 应用曝光补偿 (每1EV对应亮度变化约2倍)
    baseBrightness *= Math.pow(1.5, exposureCompensation);
    
    return Math.max(0.5, Math.min(1.5, baseBrightness));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-purple-100 dark:border-purple-900/20">
      <div className="p-4 border-b border-purple-100 dark:border-purple-900/20">
        <h3 className="font-medium text-lg text-purple-900 dark:text-purple-100">测光系统技术解析</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">理解不同测光模式的工作原理与应用场景</p>
      </div>
      
      <div className="p-4">
        {/* 测光模式选择器 */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">测光模式</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {meteringModes.map(mode => (
              <button
                key={mode}
                className={`text-xs px-3 py-2 rounded-md transition-colors ${
                  selectedMode === mode
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                }`}
                onClick={() => setSelectedMode(mode)}
              >
                <span className="block text-lg mb-1">{meteringModesData[mode].iconPath}</span>
                <span>{meteringModesData[mode].title}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* 测光模式详情 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{currentMode.title}的工作原理</h3>
            <div className="relative aspect-video overflow-hidden bg-black rounded-lg border border-gray-200 dark:border-gray-700">
              <Image 
                src={currentMode.visualMap}
                alt={currentMode.title}
                fill
                className="object-cover"
              />
              {/* 覆盖测光区域示意 */}
              <div className="absolute inset-0">
                {selectedMode === 'evaluative' && (
                  <div className="w-full h-full grid grid-cols-6 grid-rows-4 gap-0.5 p-2">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="bg-purple-500 bg-opacity-20 border border-purple-500 border-opacity-30 rounded-sm"></div>
                    ))}
                  </div>
                )}
                {selectedMode === 'center-weighted' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 rounded-full border-2 border-purple-500 bg-purple-500 bg-opacity-20"></div>
                    <div className="absolute inset-0 border border-purple-500 border-opacity-30 rounded-sm"></div>
                  </div>
                )}
                {selectedMode === 'spot' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[10%] h-[10%] rounded-full border-2 border-purple-500 bg-purple-500 bg-opacity-30"></div>
                  </div>
                )}
                {selectedMode === 'partial' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[20%] h-[20%] rounded-full border-2 border-purple-500 bg-purple-500 bg-opacity-20"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2 p-3 bg-gradient-to-r from-purple-900/5 to-purple-500/10 rounded-md border border-purple-200/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">{currentMode.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {currentMode.altNames && (
                  <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded">
                    别名: {currentMode.altNames}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">优缺点与使用场景</h3>
            <div className="space-y-4">
              <div className="p-3 bg-gradient-to-r from-purple-900/5 to-purple-500/10 rounded-md border border-purple-200/20">
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">优势与局限性</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{currentMode.strengthsWeaknesses}</p>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-purple-900/5 to-purple-500/10 rounded-md border border-purple-200/20">
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">最佳使用场景</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{currentMode.bestUseCase}</p>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-purple-900/5 to-purple-500/10 rounded-md border border-purple-200/20">
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">专家建议</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{currentMode.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 挑战场景测试 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">挑战场景测试</h3>
            <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded">
              推荐模式: {meteringModesData[currentScene.recommendedMode as MeteringMode].title}
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {challengingScenes.map(scene => (
              <button
                key={scene}
                className={`text-xs px-3 py-2 rounded-md transition-colors ${
                  selectedScene === scene
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100'
                }`}
                onClick={() => setSelectedScene(scene)}
              >
                {challengingScenesData[scene].title}
              </button>
            ))}
          </div>
          
          {/* 场景展示 */}
          <div className="relative aspect-video overflow-hidden bg-black rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
            <Image 
              src={currentScene.imageSrc}
              alt={currentScene.title}
              fill
              className="object-cover"
              style={{ 
                filter: exposureSimulation ? `brightness(${getSimulatedBrightness()})` : 'none'
              }}
            />
            
            {/* 当前测光模式覆盖区显示 */}
            <div className="absolute inset-0 pointer-events-none">
              {selectedMode === 'evaluative' && (
                <div className="w-full h-full grid grid-cols-6 grid-rows-4 gap-0.5 p-2 opacity-50">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="border border-purple-500 border-opacity-50 rounded-sm"></div>
                  ))}
                </div>
              )}
              {selectedMode === 'center-weighted' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-full border-2 border-purple-500 border-opacity-60"></div>
                </div>
              )}
              {selectedMode === 'spot' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[10%] h-[10%] rounded-full border-2 border-purple-500 border-opacity-80"></div>
                </div>
              )}
              {selectedMode === 'partial' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[20%] h-[20%] rounded-full border-2 border-purple-500 border-opacity-70"></div>
                </div>
              )}
            </div>
            
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {currentScene.title} | {currentMode.title} | {exposureCompensation > 0 ? '+' : ''}{exposureCompensation} EV
            </div>
          </div>
          
          {/* 曝光补偿控制 */}
          {exposureSimulation && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">曝光补偿</h4>
                <span className={`text-xs font-medium ${
                  exposureCompensation === getRecommendedExposureCompensation()
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {exposureCompensation > 0 ? '+' : ''}{exposureCompensation.toFixed(1)} EV
                  {exposureCompensation === getRecommendedExposureCompensation() && ' (推荐)'}
                </span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.5"
                value={exposureCompensation}
                onChange={(e) => setExposureCompensation(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>-3 EV</span>
                <span>0</span>
                <span>+3 EV</span>
              </div>
            </div>
          )}
          
          {/* 场景分析 */}
          <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">场景分析：</span> {currentScene.explanation}
            </p>
          </div>
        </div>
        
        {/* 直方图分析 */}
        {histogramAnalysis && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">直方图解析</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-md p-2 h-24 flex items-end">
                  {currentScene.histogramData.map((value, index) => {
                    // 确定柱状颜色
                    let barColor = 'bg-gray-400 dark:bg-gray-500';
                    if (index < 5) { // 暗部
                      barColor = 'bg-blue-500 dark:bg-blue-600';
                    } else if (index >= 15) { // 高光
                      barColor = 'bg-yellow-500 dark:bg-yellow-600';
                    }
                    
                    // 修正直方图显示曝光补偿的影响
                    let adjustedValue = value;
                    const shift = Math.round(exposureCompensation * 3); // 每1EV移动3个柱状
                    if (shift !== 0) {
                      const newIndex = Math.max(0, Math.min(19, index - shift));
                      adjustedValue = currentScene.histogramData[newIndex] || 0;
                    }
                    
                    return (
                      <motion.div
                        key={index}
                        className={`w-full mx-px ${barColor}`}
                        style={{ height: `${Math.min(100, adjustedValue * 2)}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.min(100, adjustedValue * 2)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>暗部</span>
                  <span>中间调</span>
                  <span>高光</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="p-3 bg-gradient-to-r from-purple-900/5 to-purple-500/10 rounded-md border border-purple-200/20">
                  <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">测光与直方图关系</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    测光决定相机如何设置曝光参数，直接影响直方图分布。{selectedMode === 'evaluative' ? '评价测光尝试平衡整个画面' : selectedMode === 'center-weighted' ? '中央重点测光侧重中心区域' : '点测光/局部测光仅考虑小区域'}，在{currentScene.title}场景下{selectedMode === currentScene.recommendedMode ? '是理想选择' : '可能不是最佳选择'}。
                  </p>
                </div>
                
                <div className="p-3 bg-gradient-to-r from-purple-900/5 to-purple-500/10 rounded-md border border-purple-200/20">
                  <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">曝光补偿建议</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    在{currentScene.title}场景使用{currentMode.title}时，建议曝光补偿设置为{getRecommendedExposureCompensation() > 0 ? '+' : ''}{getRecommendedExposureCompensation()} EV，可以{getRecommendedExposureCompensation() > 0 ? '提亮图像避免主体曝光不足' : getRecommendedExposureCompensation() < 0 ? '避免高光过曝' : '保持标准曝光'}。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeteringSystemExplorer; 