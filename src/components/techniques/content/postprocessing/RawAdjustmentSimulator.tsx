"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { motion } from "framer-motion";

interface RawAdjustmentSimulatorProps {
  initialImage?: string;
  className?: string;
}

export function RawAdjustmentSimulator({
  initialImage = "/images/postprocessing/raw-samples/raw-sample",
  className,
}: RawAdjustmentSimulatorProps) {
  // 定义调整参数
  const [exposure, setExposure] = useState([0]);
  const [contrast, setContrast] = useState([0]);
  const [highlights, setHighlights] = useState([0]);
  const [shadows, setShadows] = useState([0]);
  const [whites, setWhites] = useState([0]);
  const [blacks, setBlacks] = useState([0]);
  const [clarity, setClarity] = useState([0]);
  const [vibrance, setVibrance] = useState([0]);
  const [saturation, setSaturation] = useState([0]);
  
  // 色温和色调
  const [temperature, setTemperature] = useState([5500]);
  const [tint, setTint] = useState([0]);
  
  // 白平衡预设
  const [whiteBalancePreset, setWhiteBalancePreset] = useState("自动");
  
  // 模拟处理后的图像路径
  const [processedImageUrl, setProcessedImageUrl] = useState(initialImage);
  
  // 白平衡预设选项
  const whiteBalancePresets = [
    { name: "自动", temp: 5500, tint: 0 },
    { name: "日光", temp: 5500, tint: 0 },
    { name: "阴天", temp: 6500, tint: 10 },
    { name: "阴影", temp: 7500, tint: 10 },
    { name: "钨丝灯", temp: 2850, tint: 0 },
    { name: "荧光灯", temp: 4000, tint: 15 },
    { name: "闪光灯", temp: 5500, tint: 0 },
  ];
  
  // 应用白平衡预设
  const applyWhiteBalancePreset = (preset: string) => {
    const selectedPreset = whiteBalancePresets.find(p => p.name === preset);
    if (selectedPreset) {
      setTemperature([selectedPreset.temp]);
      setTint([selectedPreset.tint]);
      setWhiteBalancePreset(preset);
    }
  };
  
  // 当参数变化时，更新"处理后"的图像（模拟）
  // 在实际应用中，这里会应用真正的图像处理算法
  useEffect(() => {
    // 这里仅作演示，实际应用中应该应用真正的处理算法
    // 修改为使用固定图片而不是尝试构建动态路径
    setProcessedImageUrl("/images/postprocessing/raw-samples/raw-sample-processed.jpg");
  }, [
    exposure[0],
    contrast[0],
    highlights[0],
    shadows[0],
    whites[0],
    blacks[0],
    clarity[0],
    vibrance[0],
    saturation[0],
    temperature[0],
    tint[0],
  ]);

  // 滑块属性配置
  const sliderConfig = {
    exposure: { min: -5, max: 5, step: 0.1, unit: "EV", format: (v: number) => v.toFixed(1) },
    contrast: { min: -100, max: 100, step: 1, unit: "", format: (v: number) => v.toString() },
    highlights: { min: -100, max: 100, step: 1, unit: "", format: (v: number) => v.toString() },
    shadows: { min: -100, max: 100, step: 1, unit: "", format: (v: number) => v.toString() },
    whites: { min: -100, max: 100, step: 1, unit: "", format: (v: number) => v.toString() },
    blacks: { min: -100, max: 100, step: 1, unit: "", format: (v: number) => v.toString() },
    clarity: { min: -100, max: 100, step: 1, unit: "", format: (v: number) => v.toString() },
    vibrance: { min: -100, max: 100, step: 1, unit: "", format: (v: number) => v.toString() },
    saturation: { min: -100, max: 100, step: 1, unit: "", format: (v: number) => v.toString() },
    temperature: { min: 2000, max: 9000, step: 50, unit: "K", format: (v: number) => v.toString() },
    tint: { min: -150, max: 150, step: 1, unit: "", format: (v: number) => v.toString() },
  };
  
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${className}`}>
      {/* 左侧：调整参数面板 */}
      <div className="space-y-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">基本调整</h3>
          
          {/* 曝光度滑块 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>曝光度</span>
              <span>{sliderConfig.exposure.format(exposure[0])} {sliderConfig.exposure.unit}</span>
            </div>
            <Slider
              value={exposure}
              min={sliderConfig.exposure.min}
              max={sliderConfig.exposure.max}
              step={sliderConfig.exposure.step}
              onValueChange={setExposure}
              className="w-full"
            />
          </div>
          
          {/* 对比度滑块 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>对比度</span>
              <span>{sliderConfig.contrast.format(contrast[0])}</span>
            </div>
            <Slider
              value={contrast}
              min={sliderConfig.contrast.min}
              max={sliderConfig.contrast.max}
              step={sliderConfig.contrast.step}
              onValueChange={setContrast}
              className="w-full"
            />
          </div>
          
          {/* 高光滑块 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>高光</span>
              <span>{sliderConfig.highlights.format(highlights[0])}</span>
            </div>
            <Slider
              value={highlights}
              min={sliderConfig.highlights.min}
              max={sliderConfig.highlights.max}
              step={sliderConfig.highlights.step}
              onValueChange={setHighlights}
              className="w-full"
            />
          </div>
          
          {/* 阴影滑块 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>阴影</span>
              <span>{sliderConfig.shadows.format(shadows[0])}</span>
            </div>
            <Slider
              value={shadows}
              min={sliderConfig.shadows.min}
              max={sliderConfig.shadows.max}
              step={sliderConfig.shadows.step}
              onValueChange={setShadows}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">白平衡</h3>
          
          {/* 白平衡预设按钮 */}
          <div className="grid grid-cols-4 gap-2">
            {whiteBalancePresets.map((preset) => (
              <button
                key={preset.name}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  whiteBalancePreset === preset.name
                    ? "bg-purple-600 text-white"
                    : "bg-purple-800/30 hover:bg-purple-700/40"
                }`}
                onClick={() => applyWhiteBalancePreset(preset.name)}
              >
                {preset.name}
              </button>
            ))}
          </div>
          
          {/* 色温滑块 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>色温</span>
              <span>{sliderConfig.temperature.format(temperature[0])} {sliderConfig.temperature.unit}</span>
            </div>
            <div className="h-4 w-full rounded-full mb-1 bg-gradient-to-r from-blue-500 via-white to-yellow-500"></div>
            <Slider
              value={temperature}
              min={sliderConfig.temperature.min}
              max={sliderConfig.temperature.max}
              step={sliderConfig.temperature.step}
              onValueChange={(value) => {
                setTemperature(value);
                setWhiteBalancePreset("自定义");
              }}
              className="w-full"
            />
          </div>
          
          {/* 色调滑块 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>色调</span>
              <span>{sliderConfig.tint.format(tint[0])}</span>
            </div>
            <div className="h-4 w-full rounded-full mb-1 bg-gradient-to-r from-green-500 to-magenta-500"></div>
            <Slider
              value={tint}
              min={sliderConfig.tint.min}
              max={sliderConfig.tint.max}
              step={sliderConfig.tint.step}
              onValueChange={(value) => {
                setTint(value);
                setWhiteBalancePreset("自定义");
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      {/* 右侧：预览效果 */}
      <div className="space-y-6">
        <BeforeAfterSlider
          beforeImage={initialImage}
          afterImage={processedImageUrl}
          beforeLabel="原始RAW"
          afterLabel="处理后"
          className="w-full h-auto"
        />
        
        <div className="bg-purple-900/30 border border-purple-700/30 rounded-xl p-4">
          <h4 className="font-semibold mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            RAW文件优势
          </h4>
          <p className="text-sm text-muted-foreground">
            注意RAW文件如何保留了高光和阴影中的细节，使您能够恢复过曝或欠曝的区域。这是JPEG格式无法做到的。
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-900/20 border border-purple-700/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-sm">直方图</h5>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
            </div>
            <div className="h-16 mt-2 bg-black/30 rounded flex items-end justify-between px-1">
              {/* 模拟直方图 */}
              {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-white/70" 
                  style={{ 
                    height: `${20 + Math.random() * 60}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="bg-purple-900/20 border border-purple-700/20 rounded-lg p-3">
            <h5 className="font-medium text-sm mb-2">RGB数值</h5>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-red-400">R:</span>
                <span>255</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-400">G:</span>
                <span>240</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400">B:</span>
                <span>220</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 