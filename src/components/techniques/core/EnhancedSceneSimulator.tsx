"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, Camera, RefreshCw, Sun, Cloud, CloudRain, Moon, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// 参数设置类型
interface Setting {
  id: string;
  name: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
  description?: string;
}

// 场景类型
interface Scene {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  recommendedSettings?: Record<string, number>;
}

// 预设类型 (向后兼容)
interface Preset {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  icon?: React.ReactNode;
  defaultSettings?: Record<string, number>;
  recommendedSettings?: Record<string, number>;
}

interface EnhancedSceneSimulatorProps {
  title: string;
  description?: string;
  settings: Setting[];
  scenes?: Scene[];
  presets?: Preset[]; // 向后兼容
  defaultPreset?: string; // 向后兼容
  className?: string;
}

export function EnhancedSceneSimulator({
  title,
  description,
  settings,
  scenes: propScenes,
  presets,
  defaultPreset,
  className,
}: EnhancedSceneSimulatorProps) {
  // 处理scenes和presets的兼容
  const scenes = propScenes || presets?.map(preset => ({
    id: preset.id,
    name: preset.name,
    description: preset.description,
    imageUrl: preset.imageUrl,
    icon: preset.icon || <Camera className="w-3 h-3" />,
    recommendedSettings: preset.recommendedSettings || preset.defaultSettings
  })) || [];

  const [currentSettings, setCurrentSettings] = useState<Record<string, number>>({});
  const [activeScene, setActiveScene] = useState<string>(
    defaultPreset || scenes[0]?.id || ""
  );
  const [activeSettingInfo, setActiveSettingInfo] = useState<string | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  
  // 初始化设置值
  useEffect(() => {
    const initialSettings = settings.reduce((acc, setting) => {
      acc[setting.id] = setting.defaultValue;
      return acc;
    }, {} as Record<string, number>);
    
    setCurrentSettings(initialSettings);
  }, [settings]);
  
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
  
  // 应用推荐设置
  const applyRecommendedSettings = () => {
    const currentScene = scenes.find(scene => scene.id === activeScene);
    if (currentScene?.recommendedSettings) {
      setCurrentSettings(prev => ({
        ...prev,
        ...currentScene.recommendedSettings
      }));
      setShowRecommendation(true);
      
      // 3秒后隐藏推荐提示
      setTimeout(() => {
        setShowRecommendation(false);
      }, 3000);
    }
  };
  
  // 生成预览图像的模拟效果类
  const generatePreviewStyle = () => {
    return {
      filter: `
        brightness(${currentSettings.brightness || 1})
        contrast(${currentSettings.contrast || 1})
        saturate(${currentSettings.saturation || 1})
        blur(${currentSettings.blur || 0}px)
      `
    };
  };

  const currentScene = scenes.find(scene => scene.id === activeScene) || scenes[0];

  if (scenes.length === 0) {
    return (
      <div className={cn("bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 p-6 text-center", className)}>
        <p className="text-neutral-500 dark:text-neutral-400">没有可用的场景</p>
      </div>
    );
  }

  return (
    <div className={cn("bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700", className)}>
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">{title}</h3>
          {description && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={applyRecommendedSettings}
            className="text-xs px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-md border border-amber-200 dark:border-amber-800/30 flex items-center"
          >
            <Camera className="w-3 h-3 mr-1.5" />
            推荐设置
          </button>
          <button 
            onClick={resetSettings}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* 场景选择器 */}
      <div className="p-3 bg-neutral-50 dark:bg-neutral-750 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex space-x-2 overflow-x-auto pb-1 hide-scrollbar">
          {scenes.map(scene => (
            <button 
              key={scene.id}
              onClick={() => setActiveScene(scene.id)}
              className={cn(
                "flex items-center px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap",
                "border transition-colors",
                activeScene === scene.id
                  ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40"
                  : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-750"
              )}
            >
              <span className="mr-1.5">
                {scene.icon}
              </span>
              {scene.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* 预览区域 */}
        <div className="md:w-2/3 relative bg-neutral-900 h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <div className="absolute top-4 right-4 z-10 bg-black/50 text-white text-xs px-3 py-1 rounded-full flex items-center">
                <Camera className="w-3 h-3 mr-1" />
                <span>{currentScene?.name}</span>
              </div>
              
              <img 
                src={currentScene?.imageUrl || "/images/techniques/simulator-placeholder.jpg"} 
                alt={currentScene?.name || "场景模拟"}
                className="w-full h-full object-cover"
                style={generatePreviewStyle()}
              />
              
              {/* 推荐设置提示 */}
              <AnimatePresence>
                {showRecommendation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-900/80 text-white text-sm px-4 py-2 rounded-full flex items-center"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    已应用推荐设置
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* 控制面板 */}
        <div className="md:w-1/3 p-4 bg-neutral-50 dark:bg-neutral-750 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center mb-4 text-neutral-700 dark:text-neutral-300">
            <Sliders className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">调整参数</span>
          </div>
          
          <div className="space-y-5 max-h-[320px] overflow-y-auto pr-1 hide-scrollbar">
            {settings.map(setting => (
              <div key={setting.id} className="relative">
                <div className="flex justify-between text-sm mb-2">
                  <button 
                    className="text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center"
                    onClick={() => setActiveSettingInfo(activeSettingInfo === setting.id ? null : setting.id)}
                  >
                    {setting.name}
                    {setting.description && (
                      <span className="ml-1 text-neutral-400 dark:text-neutral-500 text-xs">ⓘ</span>
                    )}
                  </button>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {currentSettings[setting.id]}{setting.unit || ''}
                  </span>
                </div>
                
                {/* 设置说明 */}
                <AnimatePresence>
                  {activeSettingInfo === setting.id && setting.description && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-2 rounded-md border border-blue-100 dark:border-blue-800/30"
                    >
                      {setting.description}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <input
                  type="range"
                  min={setting.min}
                  max={setting.max}
                  step={setting.step}
                  value={currentSettings[setting.id] || setting.defaultValue}
                  onChange={(e) => updateSetting(setting.id, parseFloat(e.target.value))}
                  className={cn(
                    "w-full h-2 rounded-lg appearance-none cursor-pointer",
                    "bg-neutral-200 dark:bg-neutral-700",
                    // 自定义滑块样式
                    "[&::-webkit-slider-thumb]:appearance-none",
                    "[&::-webkit-slider-thumb]:w-4",
                    "[&::-webkit-slider-thumb]:h-4",
                    "[&::-webkit-slider-thumb]:rounded-full", 
                    "[&::-webkit-slider-thumb]:bg-amber-500 dark:[&::-webkit-slider-thumb]:bg-amber-500",
                    "[&::-webkit-slider-thumb]:shadow-md",
                    "[&::-moz-range-thumb]:w-4",
                    "[&::-moz-range-thumb]:h-4",
                    "[&::-moz-range-thumb]:rounded-full",
                    "[&::-moz-range-thumb]:bg-amber-500 dark:[&::-moz-range-thumb]:bg-amber-500",
                    "[&::-moz-range-thumb]:border-none",
                    "[&::-moz-range-thumb]:shadow-md"
                  )}
                />
              </div>
            ))}
          </div>
          
          {/* 场景描述 */}
          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {currentScene?.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* 相机预设值显示 */}
      <div className="bg-neutral-800 dark:bg-neutral-900 text-white p-3 border-t border-neutral-700 flex flex-wrap gap-2 justify-center">
        {['aperture', 'shutterSpeed', 'iso', 'focalLength'].map(param => {
          const setting = settings.find(s => s.id === param);
          if (setting && currentSettings[param]) {
            return (
              <div key={param} className="px-2 py-1 bg-neutral-700 dark:bg-neutral-800 rounded-md text-xs flex items-center">
                <span className="text-amber-400 mr-1">{setting.name}:</span>
                <span>{currentSettings[param]}{setting.unit || ''}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
} 