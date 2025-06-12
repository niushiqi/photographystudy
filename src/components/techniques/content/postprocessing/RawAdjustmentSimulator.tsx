"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RawAdjustmentSimulatorProps {
  initialImage?: string;
  className?: string;
}

// 预设样式
const presets = [
  { name: "自然", exposure: 0, contrast: 10, highlights: -10, shadows: 15, whites: 5, blacks: -5, temperature: 0, tint: 0, clarity: 10, vibrance: 15, saturation: 5 },
  { name: "高对比度", exposure: 0, contrast: 30, highlights: -20, shadows: -10, whites: 15, blacks: -15, temperature: 0, tint: 0, clarity: 20, vibrance: 10, saturation: 5 },
  { name: "淡雅", exposure: 0.3, contrast: -10, highlights: -5, shadows: 20, whites: 0, blacks: 0, temperature: 5, tint: 5, clarity: 0, vibrance: 5, saturation: -10 },
  { name: "黑白", exposure: 0, contrast: 20, highlights: -10, shadows: 10, whites: 10, blacks: -10, temperature: 0, tint: 0, clarity: 15, vibrance: 0, saturation: -100 },
  { name: "暖色调", exposure: 0.2, contrast: 5, highlights: -5, shadows: 10, whites: 5, blacks: -5, temperature: 15, tint: 5, clarity: 5, vibrance: 15, saturation: 10 },
];

export function RawAdjustmentSimulator({
  initialImage = "/images/postprocessing/raw-samples/raw-sample",
  className,
}: RawAdjustmentSimulatorProps) {
  // 基本参数状态
  const [exposure, setExposure] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [highlights, setHighlights] = useState(0);
  const [shadows, setShadows] = useState(0);
  const [whites, setWhites] = useState(0);
  const [blacks, setBlacks] = useState(0);
  
  // 色彩参数状态
  const [temperature, setTemperature] = useState(0);
  const [tint, setTint] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [vibrance, setVibrance] = useState(0);
  const [saturation, setSaturation] = useState(0);
  
  // 当前选项卡和显示直方图状态
  const [selectedTab, setSelectedTab] = useState("exposure");
  const [showHistogram, setShowHistogram] = useState(false);
  
  // 重置所有调整
  const resetAdjustments = () => {
    setExposure(0);
    setContrast(0);
    setHighlights(0);
    setShadows(0);
    setWhites(0);
    setBlacks(0);
    setTemperature(0);
    setTint(0);
    setClarity(0);
    setVibrance(0);
    setSaturation(0);
  };
  
  // 应用预设
  const applyPreset = (preset) => {
    setExposure(preset.exposure);
    setContrast(preset.contrast);
    setHighlights(preset.highlights);
    setShadows(preset.shadows);
    setWhites(preset.whites);
    setBlacks(preset.blacks);
    setTemperature(preset.temperature);
    setTint(preset.tint);
    setClarity(preset.clarity);
    setVibrance(preset.vibrance);
    setSaturation(preset.saturation);
  };
  
  // 图像滤镜样式 
  const filterStyle = {
    filter: `
      brightness(${1 + exposure/100})
      contrast(${1 + contrast/100})
      saturate(${1 + saturation/100})
      sepia(${temperature > 0 ? temperature/200 : 0})
    `,
    transform: `scale(${1 + clarity/500})`,
  };
  
  // 模拟的高光和阴影调整
  const overlayStyles = {
    highlights: {
      background: `rgba(255,255,255,${Math.abs(highlights)/200})`,
      mixBlendMode: highlights >= 0 ? 'lighten' : 'darken',
    },
    shadows: {
      background: `rgba(0,0,0,${Math.abs(shadows)/200})`,
      mixBlendMode: shadows >= 0 ? 'lighten' : 'darken',
    },
    whites: {
      background: `rgba(255,255,255,${Math.abs(whites)/200})`,
      mixBlendMode: whites >= 0 ? 'lighten' : 'darken',
    },
    blacks: {
      background: `rgba(0,0,0,${Math.abs(blacks)/200})`,
      mixBlendMode: blacks >= 0 ? 'lighten' : 'darken',
    },
    temperature: {
      background: temperature > 0 
        ? `rgba(255,200,100,${Math.abs(temperature)/200})`
        : `rgba(100,150,255,${Math.abs(temperature)/200})`,
      mixBlendMode: 'overlay',
    },
    tint: {
      background: tint > 0 
        ? `rgba(255,150,255,${Math.abs(tint)/200})`
        : `rgba(150,255,150,${Math.abs(tint)/200})`,
      mixBlendMode: 'overlay',
    },
    vibrance: {
      background: `rgba(0,0,0,0)`, // 在实际应用中，vibrance是复杂的算法，这里简化处理
    },
  };

  return (
    <div className="p-6 border border-purple-300 dark:border-purple-700 rounded-xl bg-white dark:bg-slate-900 shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-purple-800 dark:text-purple-300">RAW调整模拟器</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* 左侧：调整参数面板 */}
        <div className="w-full md:w-3/5">
          <div className="relative aspect-video rounded-lg overflow-hidden border border-purple-200 dark:border-purple-800">
            {/* 基础图像 */}
            <div className="absolute inset-0" style={filterStyle}>
              <Image
                src="/images/postprocessing/raw-samples/landscape-raw.jpg"
                alt="Raw图像"
                fill
                className="object-cover"
              />
              
              {/* 各种调整叠加层 */}
              <div className="absolute inset-0" style={overlayStyles.highlights}></div>
              <div className="absolute inset-0" style={overlayStyles.shadows}></div>
              <div className="absolute inset-0" style={overlayStyles.whites}></div>
              <div className="absolute inset-0" style={overlayStyles.blacks}></div>
              <div className="absolute inset-0" style={overlayStyles.temperature}></div>
              <div className="absolute inset-0" style={overlayStyles.tint}></div>
              <div className="absolute inset-0" style={overlayStyles.vibrance}></div>
            </div>
            
            {/* 直方图叠加层 */}
            {showHistogram && (
              <div className="absolute top-3 right-3 w-32 h-24 bg-black/70 rounded p-2">
                <Image 
                  src="/images/postprocessing/histogram.png" 
                  alt="直方图" 
                  width={120} 
                  height={80}
                  className="object-contain"
                />
              </div>
            )}
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowHistogram(!showHistogram)}
              className={cn(
                "text-xs border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30",
                showHistogram && "bg-purple-100 dark:bg-purple-900/30"
              )}
            >
              {showHistogram ? "隐藏直方图" : "显示直方图"}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetAdjustments}
              className="text-xs border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30"
            >
              重置调整
            </Button>
          </div>
          
          {/* 预设选择器 */}
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2 text-purple-800 dark:text-purple-300">预设样式</h3>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <Button 
                  key={preset.name}
                  variant="outline" 
                  size="sm" 
                  onClick={() => applyPreset(preset)}
                  className="text-xs border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* 右侧：预览效果 */}
        <div className="w-full md:w-2/5">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4 w-full grid grid-cols-3 gap-2 bg-transparent">
              <TabsTrigger 
                value="exposure" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-2 rounded-lg border border-purple-400 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
              >
                曝光与对比度
              </TabsTrigger>
              <TabsTrigger 
                value="color" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-2 rounded-lg border border-purple-400 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
              >
                色彩调整
              </TabsTrigger>
              <TabsTrigger 
                value="detail" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-2 rounded-lg border border-purple-400 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
              >
                清晰度与细节
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="exposure">
              <div className="space-y-6">
                {/* 曝光调整 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">曝光</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{exposure > 0 ? `+${exposure}` : exposure}</span>
                  </div>
                  <Slider
                    value={[exposure]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setExposure(value[0])}
                    className="py-2"
                  />
                </div>
                
                {/* 对比度调整 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">对比度</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{contrast > 0 ? `+${contrast}` : contrast}</span>
                  </div>
                  <Slider
                    value={[contrast]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setContrast(value[0])}
                    className="py-2"
                  />
                </div>
                
                {/* 高光调整 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">高光</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{highlights > 0 ? `+${highlights}` : highlights}</span>
                  </div>
                  <Slider
                    value={[highlights]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setHighlights(value[0])}
                    className="py-2"
                  />
                </div>
                
                {/* 阴影调整 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">阴影</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{shadows > 0 ? `+${shadows}` : shadows}</span>
                  </div>
                  <Slider
                    value={[shadows]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setShadows(value[0])}
                    className="py-2"
                  />
                </div>
                
                {/* 白色点调整 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">白色点</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{whites > 0 ? `+${whites}` : whites}</span>
                  </div>
                  <Slider
                    value={[whites]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setWhites(value[0])}
                    className="py-2"
                  />
                </div>
                
                {/* 黑色点调整 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">黑色点</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{blacks > 0 ? `+${blacks}` : blacks}</span>
                  </div>
                  <Slider
                    value={[blacks]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setBlacks(value[0])}
                    className="py-2"
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                <p className="font-medium text-purple-700 dark:text-purple-400 mb-2">提示：</p>
                <p>调整曝光来设置整体亮度，使用高光和阴影恢复细节，最后微调白色点和黑色点以增强对比度。</p>
              </div>
            </TabsContent>
            
            <TabsContent value="color">
              <div className="space-y-6">
                {/* 色温调整 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">色温</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{temperature > 0 ? `+${temperature}` : temperature}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-500">冷</span>
                    <Slider
                      value={[temperature]}
                      min={-100}
                      max={100}
                      step={1}
                      onValueChange={(value) => setTemperature(value[0])}
                      className="py-2"
                    />
                    <span className="text-xs text-amber-500">暖</span>
                  </div>
                </div>
                
                {/* 色调调整 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">色调</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{tint > 0 ? `+${tint}` : tint}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-500">绿</span>
                    <Slider
                      value={[tint]}
                      min={-100}
                      max={100}
                      step={1}
                      onValueChange={(value) => setTint(value[0])}
                      className="py-2"
                    />
                    <span className="text-xs text-pink-500">品红</span>
                  </div>
                </div>
                
                {/* 自然饱和度调整 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">自然饱和度</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{vibrance > 0 ? `+${vibrance}` : vibrance}</span>
                  </div>
                  <Slider
                    value={[vibrance]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setVibrance(value[0])}
                    className="py-2"
                  />
                </div>
                
                {/* 饱和度调整 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">饱和度</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{saturation > 0 ? `+${saturation}` : saturation}</span>
                  </div>
                  <Slider
                    value={[saturation]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setSaturation(value[0])}
                    className="py-2"
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                <p className="font-medium text-purple-700 dark:text-purple-400 mb-2">自然饱和度 vs 饱和度:</p>
                <p>自然饱和度主要增强不饱和的颜色，而饱和度则均匀地增强所有颜色。优先使用自然饱和度以获得更自然的效果。</p>
              </div>
            </TabsContent>
            
            <TabsContent value="detail">
              <div className="space-y-6">
                {/* 清晰度调整 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">清晰度</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{clarity > 0 ? `+${clarity}` : clarity}</span>
                  </div>
                  <Slider
                    value={[clarity]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setClarity(value[0])}
                    className="py-2"
                  />
                </div>
                
                {/* 纹理调整 - 实际模拟器中可以继续添加 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">纹理</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">0</span>
                  </div>
                  <Slider
                    value={[0]}
                    min={-100}
                    max={100}
                    step={1}
                    disabled
                    className="py-2 opacity-50"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">在此模拟器中不可用</p>
                </div>
                
                {/* 锐度调整 - 实际模拟器中可以继续添加 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">锐度</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">0</span>
                  </div>
                  <Slider
                    value={[0]}
                    min={-100}
                    max={100}
                    step={1}
                    disabled
                    className="py-2 opacity-50"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">在此模拟器中不可用</p>
                </div>
                
                {/* 降噪调整 - 实际模拟器中可以继续添加 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">降噪</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">0</span>
                  </div>
                  <Slider
                    value={[0]}
                    min={0}
                    max={100}
                    step={1}
                    disabled
                    className="py-2 opacity-50"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">在此模拟器中不可用</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                <p className="font-medium text-purple-700 dark:text-purple-400 mb-2">提示：</p>
                <p>清晰度通过增加中等对比度来增强图像结构，但过量使用会导致图像失真。这些调整通常是后期处理工作流程的最后步骤。</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 