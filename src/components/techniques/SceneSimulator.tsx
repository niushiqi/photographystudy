"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sliders, Camera, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimulatorProps {
  title: string;
  description: string;
  imageUrl: string;
  settings: {
    id: string;
    name: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    unit?: string;
  }[];
}

export function SceneSimulator({ title, description, imageUrl, settings }: SimulatorProps) {
  // 当前设置值状态
  const [currentSettings, setCurrentSettings] = useState(
    settings.reduce((acc, setting) => {
      acc[setting.id] = setting.defaultValue;
      return acc;
    }, {} as Record<string, number>)
  );
  
  // 更新设置值
  const updateSetting = (id: string, value: number) => {
    setCurrentSettings(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  // 重置所有设置
  const resetSettings = () => {
    setCurrentSettings(
      settings.reduce((acc, setting) => {
        acc[setting.id] = setting.defaultValue;
        return acc;
      }, {} as Record<string, number>)
    );
  };
  
  // 生成预览图像的模拟效果类
  const generatePreviewStyle = () => {
    // 这里可以根据不同设置定制不同的样式效果
    // 这只是一个简单的示例，实际应用中可以进行更复杂的效果模拟
    return {
      filter: `
        brightness(${currentSettings.brightness || 1})
        contrast(${currentSettings.contrast || 1})
        saturate(${currentSettings.saturation || 1})
        blur(${currentSettings.blur || 0}px)
      `
    };
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">{title}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
        <button 
          onClick={resetSettings}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* 预览区域 */}
        <div className="md:w-2/3 relative bg-neutral-900 h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full flex items-center">
            <Camera className="w-3 h-3 mr-1" />
            <span>预览效果</span>
          </div>
          
          <div className="relative w-full h-full">
            <img 
              src={imageUrl || "/images/techniques/simulator-placeholder.jpg"} 
              alt="场景模拟"
              className="w-full h-full object-cover"
              style={generatePreviewStyle()}
            />
          </div>
        </div>
        
        {/* 控制面板 */}
        <div className="md:w-1/3 p-4 bg-neutral-50 dark:bg-neutral-750 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center mb-4 text-neutral-700 dark:text-neutral-300">
            <Sliders className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">调整参数</span>
          </div>
          
          <div className="space-y-5">
            {settings.map(setting => (
              <div key={setting.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {setting.name}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {currentSettings[setting.id]}{setting.unit || ''}
                  </span>
                </div>
                
                <input
                  type="range"
                  min={setting.min}
                  max={setting.max}
                  step={setting.step}
                  value={currentSettings[setting.id]}
                  onChange={(e) => updateSetting(setting.id, parseFloat(e.target.value))}
                  className={cn(
                    "w-full h-2 rounded-lg appearance-none cursor-pointer",
                    "bg-neutral-200 dark:bg-neutral-700",
                    // 自定义滑块样式
                    "[&::-webkit-slider-thumb]:appearance-none",
                    "[&::-webkit-slider-thumb]:w-4",
                    "[&::-webkit-slider-thumb]:h-4",
                    "[&::-webkit-slider-thumb]:rounded-full", 
                    "[&::-webkit-slider-thumb]:bg-blue-500",
                    "[&::-moz-range-thumb]:w-3",
                    "[&::-moz-range-thumb]:h-3",
                    "[&::-moz-range-thumb]:rounded-full",
                    "[&::-moz-range-thumb]:bg-blue-500"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 