"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Slider } from "@/components/ui/slider";

interface LensKnowledgeProps {
  onComplete?: () => void;
}

const LensKnowledge: React.FC<LensKnowledgeProps> = ({ onComplete }) => {
  const [focalLength, setFocalLength] = useState(50);
  const [activeLensType, setActiveLensType] = useState<string | null>(null);
  
  const lensTypes = [
    {
      id: 'wide',
      name: '广角镜头',
      range: '10-35mm',
      description: '广角镜头提供更广阔的视角，适合拍摄风景、建筑和室内场景。焦距越短，视角越广，但可能产生边缘变形。超广角镜头（如14mm）甚至能捕捉接近180度的视角。',
      use: '风景摄影、建筑摄影、室内空间、环境人像'
    },
    {
      id: 'standard',
      name: '标准镜头',
      range: '35-70mm',
      description: '50mm焦距接近人眼的自然视角，因此被称为"标准镜头"。这类镜头视角自然，变形少，是最接近我们日常所见画面的镜头。',
      use: '日常拍摄、街拍、环境人像、纪实摄影'
    },
    {
      id: 'telephoto',
      name: '长焦镜头',
      range: '70-300mm+',
      description: '长焦镜头可以将远处的景物"拉近"，适合拍摄远距离主体。长焦镜头压缩空间感，使前后景物看起来更加紧凑，常用于人像和体育摄影。',
      use: '人像摄影、体育赛事、野生动物、风景细节'
    },
    {
      id: 'macro',
      name: '微距镜头',
      range: '通常60-200mm',
      description: '微距镜头专为近距离拍摄设计，能够1:1甚至更高比例地放大细节。这类镜头让我们能够探索肉眼无法轻易观察到的微观世界。',
      use: '产品摄影、昆虫植物、细节特写、纹理研究'
    },
  ];

  // 根据焦距模拟视角变化
  const getFieldOfView = () => {
    // 简化的视角计算，实际更复杂
    const baseAngle = 46; // 50mm镜头在全画幅上的视角约为46度
    const calculatedAngle = baseAngle * (50 / focalLength);
    // 限制在合理范围内
    return Math.min(Math.max(calculatedAngle, 10), 180);
  };

  const fieldOfView = getFieldOfView();

  return (
    <div className="flex flex-col space-y-8 py-6">
      <h2 className="text-3xl font-bold">镜头知识</h2>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
        <h3 className="text-2xl font-semibold mb-6">焦距与视角体验</h3>
        
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-3xl">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>超广角 (16mm)</span>
                <span>标准 (50mm)</span>
                <span>中长焦 (135mm)</span>
                <span>超长焦 (300mm)</span>
              </div>
              <Slider 
                defaultValue={[50]} 
                min={16} 
                max={300}
                step={1}
                onValueChange={(value: number[]) => setFocalLength(value[0])}
              />
              <div className="mt-2 text-center">
                <span className="text-lg font-medium">当前焦距: {focalLength}mm</span>
                <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                  视角约: {fieldOfView.toFixed(1)}°
                </span>
              </div>
            </div>
          </div>
          
          <div className="relative w-full h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            {/* 实际开发时替换为真实图片 */}
            <div className="relative w-full h-full">
              {/* 这里将是一个可交互的视角模拟区域 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="bg-gray-200 dark:bg-gray-700 border-dashed border-2 border-gray-400 flex items-center justify-center"
                  style={{
                    width: `${Math.min(100, 100 * (50 / focalLength))}%`,
                    height: `${Math.min(100, 100 * (50 / focalLength))}%`,
                    minWidth: '20%',
                    minHeight: '20%',
                  }}
                >
                  <span className="text-gray-500">视角模拟 - {fieldOfView.toFixed(1)}°</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300">
            移动上方滑块来体验不同焦距的视角变化。焦距越短，视角越广；焦距越长，视角越窄，对远景的"放大"效果越明显。
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4">镜头类型</h3>
          
          <div className="flex flex-col space-y-3">
            {lensTypes.map(lens => (
              <button 
                key={lens.id}
                className={`text-left p-4 rounded-lg transition ${
                  activeLensType === lens.id 
                    ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500' 
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveLensType(lens.id)}
              >
                <h4 className="font-medium text-lg">{lens.name} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({lens.range})</span></h4>
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4">镜头详情</h3>
          
          {activeLensType ? (
            <div className="space-y-4">
              <h4 className="text-xl font-medium">
                {lensTypes.find(l => l.id === activeLensType)?.name}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                  ({lensTypes.find(l => l.id === activeLensType)?.range})
                </span>
              </h4>
              
              <p className="text-gray-700 dark:text-gray-300">
                {lensTypes.find(l => l.id === activeLensType)?.description}
              </p>
              
              <div className="mt-4">
                <h5 className="font-medium text-gray-600 dark:text-gray-400">常用场景</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  {lensTypes.find(l => l.id === activeLensType)?.use}
                </p>
              </div>
              
              {/* 这里可以添加示例图片 */}
              <div className="mt-6 h-[200px] bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                <span className="text-gray-500">示例图片区域 - {lensTypes.find(l => l.id === activeLensType)?.name}</span>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 p-8 text-center">
              请从左侧选择一种镜头类型，查看详细信息
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md mt-8">
        <h3 className="text-2xl font-semibold mb-4">镜头规格解析</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-lg font-medium mb-2">最大光圈</h4>
            <p className="text-gray-700 dark:text-gray-300">
              如f/2.8、f/1.4等，数值越小，光圈越大，进光量越多。大光圈镜头在弱光环境下表现更佳，也能创造更浅的景深效果。
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-lg font-medium mb-2">定焦与变焦</h4>
            <p className="text-gray-700 dark:text-gray-300">
              定焦镜头焦距固定，通常光学素质更高、光圈更大、体积更小；变焦镜头焦距可调节，使用更灵活，但可能在某些参数上有所妥协。
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-lg font-medium mb-2">镜头稳定</h4>
            <p className="text-gray-700 dark:text-gray-300">
              许多现代镜头配备光学防抖功能（IS、VR、OSS等），可减少相机抖动导致的模糊，在手持拍摄时特别有用，尤其是长焦和弱光环境。
            </p>
          </div>
        </div>
      </div>

      {/* 完成学习按钮 */}
      {onComplete && (
        <div className="mt-6 text-center">
          <button 
            onClick={onComplete}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            完成学习
          </button>
        </div>
      )}
    </div>
  );
};

export default LensKnowledge; 