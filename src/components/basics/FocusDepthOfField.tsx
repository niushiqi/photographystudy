"use client";

import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";

const FocusDepthOfField = () => {
  const [aperture, setAperture] = useState(8);
  const [focusDistance, setFocusDistance] = useState(5);
  const [focalLength, setFocalLength] = useState(50);

  // 简化的景深计算公式，实际比这复杂得多
  const calculateDepthOfField = () => {
    // 这里使用简化公式，实际景深计算涉及到圈入差、视觉分辨率等复杂因素
    // 焦距越长、光圈越大、对焦距离越近，景深越浅
    const dofFactor = (focusDistance * focusDistance * aperture) / (focalLength * focalLength);
    
    // 深度系数，由于是简化公式，这里进行缩放以获得更合理的显示效果
    const depthFactor = Math.max(0.5, Math.min(10, dofFactor));
    
    return {
      nearPoint: Math.max(1, focusDistance - depthFactor / 2),
      farPoint: focusDistance + depthFactor,
      depthTotal: depthFactor * 1.5
    };
  };

  const dof = calculateDepthOfField();

  return (
    <div className="flex flex-col space-y-8 py-6">
      <h2 className="text-3xl font-bold">对焦与景深</h2>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
        <h3 className="text-2xl font-semibold mb-6">景深可视化</h3>
        
        <div className="flex flex-col space-y-12">
          {/* 景深可视化区域 */}
          <div className="relative w-full h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            {/* 景深范围显示 */}
            <div 
              className="absolute h-[6px] bg-green-500/70 transform -translate-y-1/2"
              style={{
                top: '50%',
                left: `${(dof.nearPoint / 20) * 100}%`,
                width: `${((dof.farPoint - dof.nearPoint) / 20) * 100}%`,
              }}
            ></div>
            
            {/* 对焦点标记 */}
            <div 
              className="absolute w-4 h-16 bg-blue-600 rounded-full transform -translate-x-1/2"
              style={{
                top: 'calc(50% - 32px)',
                left: `${(focusDistance / 20) * 100}%`,
              }}
            ></div>
            
            {/* 距离标记 */}
            <div className="absolute bottom-4 left-0 w-full flex justify-between px-4 text-xs text-gray-500">
              <span>0m</span>
              <span>5m</span>
              <span>10m</span>
              <span>15m</span>
              <span>20m+</span>
            </div>
            
            {/* 近点和远点标记 */}
            <div 
              className="absolute w-2 h-10 bg-green-600 rounded transform -translate-x-1/2"
              style={{
                top: 'calc(50% - 20px)',
                left: `${(dof.nearPoint / 20) * 100}%`,
              }}
            ></div>
            <div 
              className="absolute w-2 h-10 bg-green-600 rounded transform -translate-x-1/2"
              style={{
                top: 'calc(50% - 20px)',
                left: `${(dof.farPoint / 20) * 100}%`,
              }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 光圈控制 */}
            <div className="space-y-3">
              <label className="text-lg font-medium flex justify-between">
                <span>光圈: f/{aperture}</span>
                <span className="text-sm text-gray-500">(越小景深越浅)</span>
              </label>
              <Slider 
                defaultValue={[8]} 
                min={1.4} 
                max={22}
                step={0.1}
                onValueChange={(value: number[]) => setAperture(parseFloat(value[0].toFixed(1)))}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>大光圈 f/1.4</span>
                <span>小光圈 f/22</span>
              </div>
            </div>
            
            {/* 对焦距离控制 */}
            <div className="space-y-3">
              <label className="text-lg font-medium flex justify-between">
                <span>对焦距离: {focusDistance.toFixed(1)}m</span>
              </label>
              <Slider 
                defaultValue={[5]} 
                min={1} 
                max={20}
                step={0.5}
                onValueChange={(value: number[]) => setFocusDistance(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>近距 1m</span>
                <span>远距 20m+</span>
              </div>
            </div>
            
            {/* 焦距控制 */}
            <div className="space-y-3">
              <label className="text-lg font-medium flex justify-between">
                <span>镜头焦距: {focalLength}mm</span>
                <span className="text-sm text-gray-500">(越长景深越浅)</span>
              </label>
              <Slider 
                defaultValue={[50]} 
                min={16} 
                max={200}
                step={1}
                onValueChange={(value: number[]) => setFocalLength(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>广角 16mm</span>
                <span>长焦 200mm</span>
              </div>
            </div>
          </div>
          
          {/* 景深数据显示 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-500">近焦点</p>
              <p className="text-lg font-medium">{dof.nearPoint.toFixed(2)}m</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">远焦点</p>
              <p className="text-lg font-medium">{dof.farPoint.toFixed(2)}m</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">景深总量</p>
              <p className="text-lg font-medium">{dof.depthTotal.toFixed(2)}m</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 对焦基础知识 */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4">对焦原理</h3>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              对焦是调整镜头光学元件的位置，使特定距离的物体在传感器上形成清晰图像的过程。当光线经过镜头后在传感器平面上汇聚成一点，这一距离的物体就会对焦清晰。
            </p>
            <div className="space-y-2">
              <h4 className="font-medium">自动对焦(AF)系统:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>相位检测AF: 快速准确，常用于单反相机</li>
                <li>对比度检测AF: 精确但较慢，多用于无反相机</li>
                <li>混合AF: 结合两种技术优点</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">手动对焦(MF)技巧:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>使用对焦峰值辅助(Focus Peaking)</li>
                <li>放大取景以检查细节</li>
                <li>对于风景摄影，可使用超焦距技巧</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* 景深知识 */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4">景深知识</h3>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              景深是指相片中从最近到最远看起来足够清晰的范围。影响景深的三个主要因素是光圈大小、对焦距离和镜头焦距。
            </p>
            <div className="space-y-2">
              <h4 className="font-medium">浅景深应用场景:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>人像摄影：突出主体，模糊背景</li>
                <li>产品摄影：强调产品细节，弱化环境</li>
                <li>艺术表现：创造梦幻或戏剧性效果</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">深景深应用场景:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>风景摄影：从前景到远景全部清晰</li>
                <li>建筑摄影：保留结构细节</li>
                <li>纪实摄影：记录完整场景信息</li>
                <li>星空摄影：保证星点清晰</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusDepthOfField; 