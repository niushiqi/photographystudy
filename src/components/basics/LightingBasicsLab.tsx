import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type LightingBasicsLabProps = {
  environment?: 'studio' | 'outdoor' | 'indoor';
  timeSimulation?: boolean;
  lightTypes?: string[];
  showLightPatterns?: boolean;
  onComplete?: () => void;
};

export default function LightingBasicsLab({
  environment = 'studio',
  timeSimulation = true,
  lightTypes = ['hard', 'soft', 'reflected'],
  showLightPatterns = true,
  onComplete
}: LightingBasicsLabProps) {
  const [lightPosition, setLightPosition] = useState({ x: 50, y: 30 }); // 百分比位置
  const [lightType, setLightType] = useState<string>('soft');
  const [timeOfDay, setTimeOfDay] = useState<number>(12); // 24小时制
  const [isDragging, setIsDragging] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [showTips, setShowTips] = useState(false);
  const [activePattern, setActivePattern] = useState<string | null>(null);
  const [showCompletionButton, setShowCompletionButton] = useState(false);
  
  // 模拟环境图片
  const environmentImages = {
    studio: '/images/basics/lighting-studio.jpg',
    outdoor: '/images/basics/lighting-outdoor.jpg',
    indoor: '/images/basics/lighting-indoor.jpg'
  };
  
  // 光线类型说明
  const lightTypeDescriptions = {
    hard: '硬光源产生清晰的阴影边缘和高对比度，适合表现质感和轮廓。常见的硬光源包括直射阳光、裸灯泡和未经修饰的闪光灯。',
    soft: '柔光源产生柔和的阴影过渡和较低对比度，适合人像和商品摄影。柔光源包括阴天光线、柔光箱和反光伞等。',
    reflected: '反射光是间接照明的一种，通过反射面将光线导向被摄主体，可以填充阴影、降低对比度，创造更自然的光效。'
  };

  // 光线模式说明
  const lightPatterns = [
    {
      id: 'front',
      name: '正面光',
      description: '光源位于相机与被摄主体之间，减少阴影，强调细节，但可能使画面平淡。',
      position: { x: 50, y: 20 }
    },
    {
      id: 'side',
      name: '侧面光',
      description: '光源位于被摄主体侧面，创造立体感和质感，适合表现肌理和纹理。',
      position: { x: 80, y: 50 }
    },
    {
      id: 'back',
      name: '逆光',
      description: '光源位于被摄主体背后，创造剪影效果和轮廓光，增加戏剧性和神秘感。',
      position: { x: 50, y: 80 }
    }
  ];
  
  // 学习任务
  const learningTasks = [
    { id: 'try-hard-light', name: '尝试硬光源', completed: lightType === 'hard' },
    { id: 'try-soft-light', name: '尝试柔光源', completed: lightType === 'soft' },
    { id: 'try-reflected-light', name: '尝试反射光', completed: lightType === 'reflected' },
    { id: 'try-front-light', name: '尝试正面光', completed: Math.abs(lightPosition.x - 50) < 15 && lightPosition.y < 30 },
    { id: 'try-side-light', name: '尝试侧面光', completed: lightPosition.x > 70 && Math.abs(lightPosition.y - 50) < 20 },
    { id: 'try-back-light', name: '尝试逆光', completed: Math.abs(lightPosition.x - 50) < 15 && lightPosition.y > 70 },
    { id: 'try-golden-hour', name: '尝试黄金时刻光线', completed: timeOfDay >= 16 && timeOfDay <= 18 }
  ];
  
  // 时间对应的色温和强度
  const getTimeBasedSettings = () => {
    // 根据时间调整色温和强度
    if (timeOfDay < 6 || timeOfDay > 20) {
      return { colorTemperature: 'rgb(64, 85, 130)', intensity: 0.3 }; // 夜间，蓝色调
    } else if (timeOfDay < 9) {
      return { colorTemperature: 'rgb(255, 198, 145)', intensity: 0.7 }; // 日出，暖色调
    } else if (timeOfDay < 11) {
      return { colorTemperature: 'rgb(255, 236, 213)', intensity: 0.85 }; // 上午，淡暖色
    } else if (timeOfDay < 14) {
      return { colorTemperature: 'rgb(255, 255, 245)', intensity: 1 }; // 正午，白色
    } else if (timeOfDay < 17) {
      return { colorTemperature: 'rgb(255, 236, 213)', intensity: 0.9 }; // 下午，淡暖色
    } else if (timeOfDay < 20) {
      return { colorTemperature: 'rgb(255, 160, 100)', intensity: 0.6 }; // 日落，橙色调
    }
    return { colorTemperature: 'rgb(255, 255, 245)', intensity: 1 };
  };
  
  // 根据光线类型和位置计算阴影效果
  const getShadowStyle = () => {
    const distance = Math.sqrt(
      Math.pow(lightPosition.x - 50, 2) + Math.pow(lightPosition.y - 50, 2)
    );
    
    const blur = lightType === 'hard' ? 5 : lightType === 'soft' ? 20 : 30;
    const length = distance * 0.5;
    
    // 计算阴影方向（与光源方向相反）
    const shadowX = (50 - lightPosition.x) / 10;
    const shadowY = (50 - lightPosition.y) / 10;
    
    const { intensity } = getTimeBasedSettings();
    
    return {
      filter: `drop-shadow(${shadowX}px ${shadowY}px ${blur}px rgba(0,0,0,${0.7 * intensity}))`
    };
  };
  
  // 处理光源拖动
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const containerRect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const y = ((e.clientY - containerRect.top) / containerRect.height) * 100;
    
    setLightPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // 处理时间滑块变化
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeOfDay(parseInt(e.target.value, 10));
  };
  
  // 处理光线模式点击
  const handlePatternClick = (pattern: typeof lightPatterns[0]) => {
    setLightPosition(pattern.position);
    setActivePattern(pattern.id);
    setTimeout(() => setActivePattern(null), 1500);
  };
  
  // 更新已完成的任务
  useEffect(() => {
    const newCompletedTasks = learningTasks
      .filter(task => task.completed)
      .map(task => task.id)
      .filter(id => !completedTasks.includes(id));
    
    if (newCompletedTasks.length > 0) {
      setCompletedTasks(prev => [...prev, ...newCompletedTasks]);
    }
  }, [lightType, lightPosition, timeOfDay, learningTasks, completedTasks]);
  
  // 检查是否所有任务都已完成
  useEffect(() => {
    if (completedTasks.length >= 5) {
      setShowCompletionButton(true);
    }
  }, [completedTasks]);
  
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  // 当前环境模拟图片
  const currentEnvironmentImage = environmentImages[environment];
  const { colorTemperature, intensity } = getTimeBasedSettings();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold mb-4">光线基础实验室</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          通过调整光源位置、角度和质量，了解不同光线特性对摄影画面的影响。光线是摄影中最基础也是最重要的元素之一。
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：光线设置控制区 */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">光线属性</h3>
          
          <div className="space-y-6">
            {/* 光线类型选择 */}
            <div>
              <label className="block text-sm font-medium mb-2">光线类型</label>
              <div className="flex flex-wrap gap-2">
                {lightTypes.map(type => (
                  <button
                    key={type}
                    className={`px-3 py-1 text-sm rounded transition-all ${
                      lightType === type 
                        ? 'bg-blue-500 text-white shadow-md scale-105' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setLightType(type)}
                  >
                    {type === 'hard' ? '硬光' : type === 'soft' ? '柔光' : '反射光'}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {lightTypeDescriptions[lightType as keyof typeof lightTypeDescriptions]}
              </p>
            </div>
            
            {/* 时间模拟器 */}
            {timeSimulation && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  时间模拟 ({timeOfDay}:00)
                </label>
                <input
                  type="range"
                  min="0"
                  max="24"
                  step="1"
                  value={timeOfDay}
                  onChange={handleTimeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>凌晨</span>
                  <span>早晨</span>
                  <span>正午</span>
                  <span>黄昏</span>
                  <span>夜晚</span>
                </div>
                {timeOfDay >= 16 && timeOfDay <= 18 && (
                  <div className="mt-2 text-xs text-amber-600 dark:text-amber-400 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    黄金时刻光线 - 理想的摄影时间
                  </div>
                )}
              </div>
            )}
            
            {/* 光位位置指示 */}
            <div>
              <label className="block text-sm font-medium mb-2">
                光源位置 (X: {Math.round(lightPosition.x)}%, Y: {Math.round(lightPosition.y)}%)
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                在右侧场景中拖动光源图标来调整位置
              </p>
            </div>
            
            {/* 学习进度 */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                学习进度 ({completedTasks.length}/{learningTasks.length})
              </h4>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-green-500 transition-all duration-500 ease-out"
                  style={{ width: `${(completedTasks.length / learningTasks.length) * 100}%` }}
                />
              </div>
              <div className="space-y-2">
                {learningTasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`text-xs flex items-center ${
                      completedTasks.includes(task.id) 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {completedTasks.includes(task.id) ? (
                      <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span>{task.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 右侧：光线效果展示区 */}
        <div className="lg:col-span-2">
          <div 
            className="relative w-full h-96 bg-black rounded-lg overflow-hidden shadow-lg"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            {/* 基础环境图 */}
            <div 
              style={{ 
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('${currentEnvironmentImage}')`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                filter: `brightness(${intensity}) sepia(0.1) hue-rotate(${timeOfDay > 12 ? (timeOfDay - 12) * 5 : 0}deg)`
              }}
            />
            
            {/* 光源投射效果 - 简单模拟 */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at ${lightPosition.x}% ${lightPosition.y}%, ${colorTemperature}40 0%, transparent 70%)`,
                mixBlendMode: 'screen'
              }}
            />
            
            {/* 主体物体 */}
            <div 
              className="absolute w-32 h-32 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              style={getShadowStyle()}
            >
              <div className="w-full h-full bg-white dark:bg-gray-200 rounded-lg"></div>
            </div>
            
            {/* 光源指示器 */}
            <div 
              className="absolute w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center cursor-move transform -translate-x-1/2 -translate-y-1/2 shadow-lg transition-all duration-300"
              style={{ 
                left: `${lightPosition.x}%`, 
                top: `${lightPosition.y}%`,
                boxShadow: '0 0 20px rgba(255, 255, 0, 0.8)'
              }}
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* 光线方向提示 */}
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded">
              {lightPosition.y < 30 && Math.abs(lightPosition.x - 50) < 20 && '正面光'}
              {lightPosition.x > 70 && Math.abs(lightPosition.y - 50) < 20 && '侧面光'}
              {lightPosition.y > 70 && Math.abs(lightPosition.x - 50) < 20 && '逆光'}
              {timeOfDay >= 16 && timeOfDay <= 18 && ' • 黄金时刻'}
            </div>
          </div>
          
          {/* 光线模式说明 */}
          {showLightPatterns && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {lightPatterns.map(pattern => (
                <button
                  key={pattern.id}
                  className={`bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow text-left transition-all ${
                    activePattern === pattern.id 
                      ? 'ring-2 ring-blue-500 transform scale-105' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handlePatternClick(pattern)}
                >
                  <h4 className="font-medium text-sm mb-1">{pattern.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {pattern.description}
                  </p>
                </button>
              ))}
            </div>
          )}
          
          {/* 提示按钮 */}
          <div className="mt-4 flex justify-end">
            <button 
              className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              onClick={() => setShowTips(!showTips)}
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {showTips ? '隐藏提示' : '显示提示'}
            </button>
          </div>
          
          {/* 提示内容 */}
          {showTips && (
            <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-200">
              <p>尝试以下操作来完成学习任务：</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                <li>切换不同的光线类型（硬光、柔光、反射光）观察阴影变化</li>
                <li>将光源移动到主体前方（正面光）、侧面（侧面光）和后方（逆光）</li>
                <li>调整时间滑块至黄昏时分（16-18点）体验黄金时刻光线</li>
                <li>点击下方光线模式按钮快速切换不同光线方向</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">光线小知识</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-700 dark:text-blue-300">色温</h4>
            <p className="text-sm text-blue-600 dark:text-blue-200">
              色温以开尔文(K)为单位衡量光线的色彩。低色温(2500-3500K)呈现暖黄色，标准日光(5500K)接近白色，高色温(7000K+)呈现蓝色调。
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-purple-700 dark:text-purple-300">黄金时刻</h4>
            <p className="text-sm text-purple-600 dark:text-purple-200">
              日出后和日落前的1-2小时被称为"黄金时刻"，此时光线呈现温暖的金黄色，角度低且柔和，非常适合风景和人像摄影。
            </p>
          </div>
        </div>
      </div>
      
      {/* 额外的光线知识 */}
      <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4">光线质量与方向</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">光线质量</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              光线质量主要受光源大小和距离影响。相对于被摄主体，光源越大，光线越柔和；光源越小，光线越硬朗。
            </p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <span className="font-medium">硬光源</span>：阴影边缘清晰，对比度高，强调纹理和轮廓</li>
              <li>• <span className="font-medium">柔光源</span>：阴影过渡柔和，对比度低，适合肖像和产品摄影</li>
              <li>• <span className="font-medium">反射光</span>：通过反射面间接照明，可填充阴影，降低对比度</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">光线方向</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              光线方向决定了阴影的位置和形状，直接影响照片的情绪和立体感。不同方向的光线适合不同的摄影场景和表达意图。
            </p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <span className="font-medium">正面光</span>：减少阴影，平坦但细节丰富，适合证件照和产品摄影</li>
              <li>• <span className="font-medium">侧面光</span>：创造立体感和质感，强调纹理，适合风景和静物</li>
              <li>• <span className="font-medium">逆光</span>：创造轮廓和剪影，增加戏剧性，适合创意和情绪表达</li>
              <li>• <span className="font-medium">顶光</span>：自然但可能在眼睛区域产生阴影，适合户外自然光拍摄</li>
              <li>• <span className="font-medium">底光</span>：不自然但戏剧性强，常用于恐怖或神秘氛围的营造</li>
            </ul>
          </div>
        </div>
      </div>
      
      {showCompletionButton && onComplete && (
        <div className="mt-6 text-center">
          <button 
            onClick={onComplete}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition-colors"
          >
            完成学习
          </button>
        </div>
      )}
    </div>
  );
} 