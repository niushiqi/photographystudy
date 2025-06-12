import React, { useState } from 'react';
import Image from 'next/image';

type ColorTheoryProps = {
  onComplete?: () => void;
};

export default function ColorTheory({ onComplete }: ColorTheoryProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>('wheel');
  const [selectedColorScheme, setSelectedColorScheme] = useState<string>('complementary');
  const [whiteBalance, setWhiteBalance] = useState<number>(5500); // 默认日光白平衡5500K
  const [activeColor, setActiveColor] = useState<string | null>(null);
  
  const colorTopics = [
    { id: 'wheel', name: '色环与色彩关系' },
    { id: 'temperature', name: '色温与白平衡' },
    { id: 'harmony', name: '色彩协调方案' },
    { id: 'emotion', name: '色彩心理与情绪' },
  ];
  
  const colorSchemes = [
    { 
      id: 'complementary', 
      name: '互补色', 
      description: '色环上相对的两种颜色，如红色和青色。互补色组合产生强烈对比和视觉冲击力，使画面充满活力。',
      exampleImage: '/images/basics/color-complementary.jpg' 
    },
    { 
      id: 'analogous', 
      name: '类似色', 
      description: '色环上相邻的颜色，如蓝色、蓝绿色和绿色。类似色创造和谐统一的感觉，适合需要平静氛围的场景。',
      exampleImage: '/images/basics/color-analogous.jpg' 
    },
    { 
      id: 'triadic', 
      name: '三等分色', 
      description: '色环上等距离分布的三种颜色。三等分色组合既有丰富的色彩变化，又能保持整体平衡，常用于生动活泼的场景。',
      exampleImage: '/images/basics/color-triadic.jpg' 
    },
    { 
      id: 'monochromatic', 
      name: '单色调', 
      description: '同一颜色的不同明度和饱和度变化。单色调创造简洁、精致的视觉效果，有助于突出形式和纹理。',
      exampleImage: '/images/basics/color-monochromatic.jpg' 
    },
  ];
  
  const colorEmotions = [
    { color: 'red', name: '红色', emotion: '激情、力量、危险、爱', usage: '用于强调主体，创造戏剧性效果，表达强烈情感。', bgClass: 'bg-red-500', textClass: 'text-red-700 dark:text-red-300' },
    { color: 'blue', name: '蓝色', emotion: '平静、信任、冷静、深度', usage: '营造宁静氛围，表现水景、天空，传达专业感。', bgClass: 'bg-blue-500', textClass: 'text-blue-700 dark:text-blue-300' },
    { color: 'yellow', name: '黄色', emotion: '快乐、能量、警告、希望', usage: '提亮画面，创造积极氛围，引起注意。', bgClass: 'bg-yellow-500', textClass: 'text-yellow-700 dark:text-yellow-300' },
    { color: 'green', name: '绿色', emotion: '自然、生长、和谐、安全', usage: '表现自然环境，创造平衡感，暗示生命力。', bgClass: 'bg-green-500', textClass: 'text-green-700 dark:text-green-300' },
    { color: 'purple', name: '紫色', emotion: '神秘、高贵、创造力、梦幻', usage: '营造神秘或奢华感，用于艺术或时尚题材。', bgClass: 'bg-purple-500', textClass: 'text-purple-700 dark:text-purple-300' },
    { color: 'orange', name: '橙色', emotion: '活力、温暖、创新、友好', usage: '传达能量与友善，适合食物摄影和活力场景。', bgClass: 'bg-orange-500', textClass: 'text-orange-700 dark:text-orange-300' },
  ];
  
  const currentColorScheme = colorSchemes.find(scheme => scheme.id === selectedColorScheme) || colorSchemes[0];
  
  // 色温对应的预览色调
  const getTemperatureColor = (temp: number) => {
    if (temp <= 3000) return 'rgb(255, 180, 107)'; // 暖色调，偏黄
    if (temp <= 4500) return 'rgb(255, 213, 170)'; // 偏暖
    if (temp <= 5500) return 'rgb(255, 250, 245)'; // 中性白
    if (temp <= 7000) return 'rgb(235, 240, 255)'; // 偏冷
    return 'rgb(210, 220, 255)'; // 冷色调，偏蓝
  };
  
  // 色温对应的描述
  const getTemperatureDescription = (temp: number) => {
    if (temp <= 3000) return '暖色调，类似烛光、日落、钨丝灯。用于创造温馨、亲密或怀旧的氛围。';
    if (temp <= 4500) return '偏暖色调，类似清晨或傍晚的光线。适合人像摄影，让肤色显得健康自然。';
    if (temp <= 5500) return '中性白光，接近正午的自然日光。色彩还原最准确，适合需要真实色彩的场景。';
    if (temp <= 7000) return '偏冷色调，类似阴天光线。可以强调蓝色和紫色，创造清新或科技感。';
    return '冷色调，类似深蓝天空或阴影区域。用于营造神秘、冷峻或戏剧化氛围。';
  };
  
  // 渲染色环内容
  const renderColorWheel = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="aspect-video relative bg-gray-100 dark:bg-gray-900">
            <Image 
              src="/images/basics/color-wheel.png"
              alt="色环"
              fill
              className="object-contain p-8"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">色环基础</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              色环是理解色彩关系的基础工具，展示了颜色之间的关系和过渡。原色（红、黄、蓝）是其他所有颜色的基础；
              二次色（绿、橙、紫）由两种原色混合产生；三次色则由原色和二次色混合形成。
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">三原色属性</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-medium">色相 (Hue)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                颜色的基本属性，即我们通常所说的"颜色名称"，如红色、蓝色、绿色等。在色环上的位置代表不同的色相。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-medium">饱和度 (Saturation)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                颜色的纯度或强度，高饱和度的颜色鲜艳生动，低饱和度则趋向灰色。饱和度影响照片的情绪表达和视觉冲击力。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-medium">明度 (Value/Brightness)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                颜色的亮度，决定其与黑色或白色的接近程度。明度对比可以创造空间感和层次感，是黑白摄影的核心。
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">摄影中的色彩应用</h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>色彩平衡：不同颜色在画面中的分布与比例，影响整体视觉重量</li>
              <li>色彩对比：利用对比色创造视觉重点和张力</li>
              <li>色彩协调：使用相近色或类似色创造和谐统一的氛围</li>
              <li>色彩引导：利用色彩引导观者视线移动</li>
              <li>色彩分离：通过色彩区分前景和背景，增强主体突出度</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染色温内容
  const renderTemperature = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold">色温与白平衡</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
              色温是指光源发出的光的颜色，以开尔文(K)为单位。不同光源具有不同的色温，影响照片的整体色调。白平衡则是相机调整色温的机制，使白色物体在照片中呈现为白色。
            </p>
          </div>
          
          <div className="relative aspect-video">
            <div 
              className="absolute inset-0 flex items-center justify-center bg-gray-900"
              style={{ 
                backgroundImage: 'url(/images/basics/white-balance-scene.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: `sepia(0.2) hue-rotate(${whiteBalance > 5500 ? '10deg' : '-10deg'})`,
              }}
            >
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: getTemperatureColor(whiteBalance),
                  opacity: 0.3,
                  mixBlendMode: 'overlay'
                }}
              />
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-sm">
                {whiteBalance}K
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <label className="block text-sm font-medium mb-2">
              调整色温 ({whiteBalance}K)
            </label>
            <input
              type="range"
              min="2000"
              max="9000"
              step="100"
              value={whiteBalance}
              onChange={(e) => setWhiteBalance(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>暖色 (2000K)</span>
              <span>自然光 (5500K)</span>
              <span>冷色 (9000K)</span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {getTemperatureDescription(whiteBalance)}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">白平衡预设</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: '日光', value: 5500, icon: '☀️' },
              { name: '阴天', value: 6500, icon: '☁️' },
              { name: '钨丝灯', value: 3200, icon: '💡' },
              { name: '荧光灯', value: 4000, icon: '📝' },
              { name: '黄昏', value: 3000, icon: '🌅' },
              { name: '阴影', value: 7500, icon: '🌫️' }
            ].map(preset => (
              <button
                key={preset.name}
                onClick={() => setWhiteBalance(preset.value)}
                className={`p-3 rounded-lg border ${
                  Math.abs(whiteBalance - preset.value) < 100
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-center text-2xl mb-1">{preset.icon}</div>
                <div className="text-sm font-medium">{preset.name}</div>
                <div className="text-xs text-gray-500">{preset.value}K</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染色彩协调方案内容
  const renderHarmony = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-2">色彩协调方案</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              色彩协调方案是基于色环设计的，不同的组合方式产生不同的视觉效果和情感反应。选择适合主题的色彩方案可以强化摄影作品的表达意图。
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4">
            {colorSchemes.map(scheme => (
              <button
                key={scheme.id}
                onClick={() => setSelectedColorScheme(scheme.id)}
                className={`text-center p-2 rounded ${
                  selectedColorScheme === scheme.id 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span className="text-sm">{scheme.name}</span>
              </button>
            ))}
          </div>
          
          <div className="relative aspect-video">
            {currentColorScheme.exampleImage && (
              <Image
                src={currentColorScheme.exampleImage}
                alt={currentColorScheme.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          
          <div className="p-4">
            <h4 className="font-medium">{currentColorScheme.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {currentColorScheme.description}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">应用场景</h3>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{currentColorScheme.name}适用情境</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {selectedColorScheme === 'complementary' && (
                <>
                  <li>需要强烈视觉冲击力的商业摄影</li>
                  <li>体育和动作场景摄影</li>
                  <li>突出主体与背景对比的肖像摄影</li>
                  <li>秋季风景摄影（如蓝天与橙色落叶）</li>
                </>
              )}
              {selectedColorScheme === 'analogous' && (
                <>
                  <li>自然风景摄影（如同色系的山脉或海景）</li>
                  <li>需要平静、和谐氛围的肖像摄影</li>
                  <li>艺术性较强的时尚摄影</li>
                  <li>季节性主题摄影（如金黄色秋季场景）</li>
                </>
              )}
              {selectedColorScheme === 'triadic' && (
                <>
                  <li>充满活力的街头摄影</li>
                  <li>时尚和产品摄影</li>
                  <li>儿童和家庭摄影</li>
                  <li>节日和庆典场景</li>
                </>
              )}
              {selectedColorScheme === 'monochromatic' && (
                <>
                  <li>极简主义风景摄影</li>
                  <li>黑白或低饱和度肖像摄影</li>
                  <li>情绪化和艺术性摄影</li>
                  <li>雾景和雪景摄影</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染色彩心理内容
  const renderEmotion = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">色彩心理与情绪</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              不同颜色能唤起不同的情绪和联想，了解色彩心理学可以帮助摄影师有意识地利用色彩传达情感和信息，增强作品的表现力和吸引力。
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {colorEmotions.map(item => (
              <div 
                key={item.color}
                className={`p-4 rounded-lg border shadow-sm transition-all ${
                  activeColor === item.color 
                  ? 'ring-2 ring-offset-2 ring-blue-500 scale-105' 
                  : 'hover:shadow-md cursor-pointer'
                }`}
                onClick={() => setActiveColor(activeColor === item.color ? null : item.color)}
              >
                <div className={`w-full h-12 rounded-lg ${item.bgClass} mb-3`}></div>
                <h4 className={`font-medium ${item.textClass}`}>{item.name}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-medium">情绪:</span> {item.emotion}
                </p>
                {activeColor === item.color && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    <span className="font-medium">应用:</span> {item.usage}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">色彩情绪应用</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 className="font-medium mb-2">暖色调</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                暖色调（红、黄、橙）通常传达温暖、活力、热情和亲密感。适合表现夕阳、秋季景色、温馨场景和欢庆活动。
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 className="font-medium mb-2">冷色调</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                冷色调（蓝、青、紫）通常传达冷静、宁静、神秘和距离感。适合表现冬季景色、水景、夜景和忧郁氛围。
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 className="font-medium mb-2">高对比度色彩</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                高饱和度和对比度的色彩组合传达强烈的视觉冲击力和戏剧性，适合广告和商业摄影，能吸引观者注意力。
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 className="font-medium mb-2">低饱和度色彩</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                低饱和度和柔和的色彩组合传达优雅、怀旧和朦胧感，适合艺术摄影和情感表达，能营造特定的时代感。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // 根据选中的主题渲染不同内容
  const renderContent = () => {
    switch (selectedTopic) {
      case 'wheel':
        return renderColorWheel();
      case 'temperature':
        return renderTemperature();
      case 'harmony':
        return renderHarmony();
      case 'emotion':
        return renderEmotion();
      default:
        return renderColorWheel();
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">色彩初步</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          色彩是摄影中最具表现力的元素之一，通过理解基础色彩理论、色温与白平衡概念，以及色彩的心理影响，可以更有意识地利用色彩增强摄影作品的表现力。
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧：色彩主题选择 */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 border-gray-200 dark:border-gray-700">色彩主题</h3>
          <div className="space-y-2">
            {colorTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`w-full text-left p-3 rounded-md transition ${
                  selectedTopic === topic.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="font-medium">{topic.name}</div>
              </button>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">学习提示</h4>
              <p className="text-xs text-blue-700 dark:text-blue-200">
                了解色彩理论并不意味着要死板遵循规则，而是为您提供有意识地打破规则的基础。观察优秀摄影师如何利用色彩讲述故事和传达情感。
              </p>
            </div>
          </div>
        </div>
        
        {/* 右侧：当前主题内容 */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
      
      {onComplete && (
        <div className="mt-8 text-center">
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