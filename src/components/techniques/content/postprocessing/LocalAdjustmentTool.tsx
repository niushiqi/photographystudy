"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface LocalAdjustmentToolProps {
  image?: string;
  className?: string;
}

// 调整工具类型
const toolTypes = {
  BRUSH: "brush",
  GRADIENT: "gradient",
  RADIAL: "radial",
};

// 预设调整
const presets = [
  { name: "暗角", exposure: -40, contrast: 10, clarity: 0, saturation: 0, tool: toolTypes.RADIAL },
  { name: "人像高光", exposure: 30, contrast: 0, clarity: 0, saturation: 0, tool: toolTypes.BRUSH },
  { name: "天空增强", exposure: 0, contrast: 20, clarity: 20, saturation: 15, tool: toolTypes.GRADIENT },
  { name: "明亮肤色", exposure: 20, contrast: -10, clarity: -15, saturation: 5, tool: toolTypes.BRUSH },
];

// 添加笔刷类型定义
interface BrushStroke {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

// 添加预设类型定义
interface Preset {
  name: string;
  exposure: number;
  contrast: number;
  clarity: number;
  saturation: number;
  tool: string;
}

export function LocalAdjustmentTool({ 
  image = "/images/postprocessing/local-adjustment-sample.jpg", 
  className 
}: LocalAdjustmentToolProps) {
  // 当前选择的工具类型
  const [selectedTool, setSelectedTool] = useState(toolTypes.BRUSH);
  
  // 调整参数
  const [exposure, setExposure] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [highlights, setHighlights] = useState([0]);
  const [shadows, setShadows] = useState([0]);
  const [clarity, setClarity] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [temperature, setTemperature] = useState([0]);
  
  // 是否显示调整效果
  const [showEffect, setShowEffect] = useState(true);
  
  // 渐变滤镜位置参数
  const [gradientPosition, setGradientPosition] = useState({ start: 30, end: 70, angle: 180 });
  
  // 径向滤镜位置参数
  const [radialPosition, setRadialPosition] = useState({ x: 50, y: 50, size: 60, feather: 50 });
  
  // 画笔路径
  const [brushStrokes, setBrushStrokes] = useState<BrushStroke[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // 画布参考
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // 工具按钮选项
  const tools = [
    { id: toolTypes.GRADIENT, name: '渐变滤镜', icon: GradientIcon },
    { id: toolTypes.RADIAL, name: '径向滤镜', icon: RadialIcon },
    { id: toolTypes.BRUSH, name: '调整笔刷', icon: BrushIcon },
  ];
  
  // 处理渐变滤镜的移动和调整
  const handleGradientDrag = (direction: 'start' | 'end') => (e: MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (direction === 'start') {
      setGradientPosition(prev => ({
        ...prev,
        start: Math.min(Math.max(0, x), 100)
      }));
    } else {
      setGradientPosition(prev => ({
        ...prev,
        end: Math.min(Math.max(0, x), 100)
      }));
    }
  };
  
  // 处理径向滤镜的移动和调整
  const handleRadialDrag = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setRadialPosition(prev => ({
      ...prev,
      x: Math.min(Math.max(0, x), 100),
      y: Math.min(Math.max(0, y), 100)
    }));
  };
  
  // 处理径向滤镜大小调整
  const handleRadialResize = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const centerX = (radialPosition.x / 100) * rect.width;
    const centerY = (radialPosition.y / 100) * rect.height;
    
    const dx = e.clientX - rect.left - centerX;
    const dy = e.clientY - rect.top - centerY;
    
    // 计算新的半径
    const rx = (Math.abs(dx) / rect.width) * 100;
    const ry = (Math.abs(dy) / rect.height) * 100;
    
    setRadialPosition(prev => ({
      ...prev,
      size: Math.min(Math.max(5, rx), 100),
      feather: Math.min(Math.max(5, ry), 100)
    }));
  };

  // 处理画笔绘制开始
  const handleBrushStart = (e: React.MouseEvent) => {
    if (!canvasRef.current || selectedTool !== toolTypes.BRUSH) return;
    
    setIsDrawing(true);
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setBrushStrokes([{ x, y, size: radialPosition.size, opacity: Math.abs(exposure) / 100 }]);
  };
  
  // 处理画笔绘制
  const handleBrushMove = (e: React.MouseEvent) => {
    if (!canvasRef.current || !isDrawing || selectedTool !== toolTypes.BRUSH) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setBrushStrokes(prev => [...prev, { x, y, size: radialPosition.size, opacity: Math.abs(exposure) / 100 }]);
  };
  
  // 处理画笔绘制结束
  const handleBrushEnd = () => {
    if (selectedTool !== toolTypes.BRUSH || !isDrawing) return;
    
    setIsDrawing(false);
  };
  
  // 清除所有画笔路径
  const clearBrushPaths = () => {
    setBrushStrokes([]);
  };
  
  // 重置所有调整
  const resetAllAdjustments = () => {
    setExposure(0);
    setContrast(0);
    setHighlights([0]);
    setShadows([0]);
    setClarity(0);
    setSaturation(0);
    setTemperature([0]);
    setBrushStrokes([]);
  };
  
  // 应用预设
  const applyPreset = (preset: Preset) => {
    setSelectedTool(preset.tool);
    setExposure(preset.exposure);
    setContrast(preset.contrast);
    setClarity(preset.clarity);
    setSaturation(preset.saturation);
  };
  
  // 计算渐变滤镜样式
  const gradientStyle: React.CSSProperties = {
    background: `linear-gradient(${gradientPosition.angle}deg, 
      rgba(${exposure > 0 ? '255,255,255' : '0,0,0'},${Math.abs(exposure)/100}) ${gradientPosition.start}%, 
      rgba(${exposure > 0 ? '255,255,255' : '0,0,0'},0) ${gradientPosition.end}%)`,
    mixBlendMode: exposure >= 0 ? 'lighten' : 'darken',
  };
  
  // 计算径向滤镜样式
  const radialStyle: React.CSSProperties = {
    background: `radial-gradient(circle at ${radialPosition.x}% ${radialPosition.y}%, 
      rgba(${exposure > 0 ? '255,255,255' : '0,0,0'},${Math.abs(exposure)/100}) 0%, 
      rgba(${exposure > 0 ? '255,255,255' : '0,0,0'},0) ${radialPosition.size}%)`,
    mixBlendMode: exposure >= 0 ? 'lighten' : 'darken',
  };
  
  return (
    <div className={`p-6 border border-purple-300 dark:border-purple-700 rounded-xl bg-white dark:bg-slate-900 shadow-lg ${className}`}>
      <h2 className="text-xl font-bold mb-6 text-purple-800 dark:text-purple-300">局部调整工作台</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 左侧：工具和参数面板 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 工具选择和说明 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">调整工具</h3>
            <div className="flex space-x-3 mb-4">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
                    selectedTool === tool.id
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/40"
                  }`}
                  onClick={() => setSelectedTool(tool.id as any)}
                >
                  <tool.icon className="w-6 h-6 mb-1" />
                  <span className="text-xs">{tool.name}</span>
                </button>
              ))}
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">{getToolDescription(selectedTool).title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{getToolDescription(selectedTool).description}</p>
              <div className="mt-3 text-sm text-purple-600 dark:text-purple-400 font-medium">操作提示：{getToolDescription(selectedTool).tip}</div>
            </div>
          </div>
          
          {/* 参数调整 */}
          <div className="space-y-5 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">调整参数</h3>
            
            <Tabs defaultValue="exposure" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger 
                  value="exposure" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  曝光和对比度
                </TabsTrigger>
                <TabsTrigger 
                  value="color" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  色彩和细节
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="exposure" className="space-y-4">
                {/* 曝光度滑块 */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">曝光度</span>
                    <span className="text-purple-700 dark:text-purple-400 font-medium">{exposure > 0 ? `+${exposure}` : exposure}</span>
                  </div>
                  <Slider
                    value={[exposure]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setExposure(value[0])}
                  />
                </div>
                
                {/* 对比度滑块 */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">对比度</span>
                    <span className="text-purple-700 dark:text-purple-400 font-medium">{contrast > 0 ? `+${contrast}` : contrast}</span>
                  </div>
                  <Slider
                    value={[contrast]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setContrast(value[0])}
                  />
                </div>
                
                {/* 高光滑块 */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">高光</span>
                    <span className="text-purple-700 dark:text-purple-400 font-medium">{highlights[0]}</span>
                  </div>
                  <Slider
                    value={highlights}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={setHighlights}
                  />
                </div>
                
                {/* 阴影滑块 */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">阴影</span>
                    <span className="text-purple-700 dark:text-purple-400 font-medium">{shadows[0]}</span>
                  </div>
                  <Slider
                    value={shadows}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={setShadows}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="color" className="space-y-4">
                {/* 饱和度滑块 */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">饱和度</span>
                    <span className="text-purple-700 dark:text-purple-400 font-medium">{saturation > 0 ? `+${saturation}` : saturation}</span>
                  </div>
                  <Slider
                    value={[saturation]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setSaturation(value[0])}
                  />
                </div>
                
                {/* 色温滑块 */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">色温</span>
                    <span className="text-purple-700 dark:text-purple-400 font-medium">{temperature[0]}</span>
                  </div>
                  <div className="h-3 w-full rounded-full mb-1 bg-gradient-to-r from-blue-500 via-white to-yellow-500"></div>
                  <Slider
                    value={temperature}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={setTemperature}
                  />
                </div>
                
                {/* 清晰度滑块 */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">清晰度</span>
                    <span className="text-purple-700 dark:text-purple-400 font-medium">{clarity > 0 ? `+${clarity}` : clarity}</span>
                  </div>
                  <Slider
                    value={[clarity]}
                    min={-100}
                    max={100}
                    step={1}
                    onValueChange={(value) => setClarity(value[0])}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={resetAllAdjustments}
                variant="destructive"
                className="flex-1"
              >
                重置参数
              </Button>
              
              <Button 
                onClick={() => setShowEffect(!showEffect)}
                variant="outline"
                className="flex-1 border-purple-300 dark:border-purple-700"
              >
                {showEffect ? "隐藏效果" : "显示效果"}
              </Button>
            </div>
          </div>
          
          {/* 常用预设 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">常用预设</h3>
            <div className="grid grid-cols-2 gap-3">
              {presets.map((preset) => (
                <button 
                  key={preset.name}
                  className="p-3 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg text-sm text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800/40 transition-colors"
                  onClick={() => applyPreset(preset as Preset)}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* 右侧：画布区域 */}
        <div className="lg:col-span-3 space-y-4">
          {/* 交互式画布 */}
          <div 
            ref={canvasRef}
            className="relative aspect-video rounded-lg overflow-hidden border border-purple-300 dark:border-purple-700 shadow-md cursor-crosshair"
            onMouseDown={selectedTool === toolTypes.BRUSH ? handleBrushStart : undefined}
            onMouseMove={selectedTool === toolTypes.BRUSH ? handleBrushMove : undefined}
            onMouseUp={selectedTool === toolTypes.BRUSH ? handleBrushEnd : undefined}
            onMouseLeave={selectedTool === toolTypes.BRUSH ? handleBrushEnd : undefined}
          >
            {/* 基础图像 */}
            <div className="absolute inset-0">
              <Image
                src={image}
                alt="调整图像"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* 渐变滤镜效果 */}
            {selectedTool === toolTypes.GRADIENT && showEffect && (
              <div 
                className="absolute inset-0"
                style={gradientStyle}
              ></div>
            )}
            
            {/* 径向滤镜效果 */}
            {selectedTool === toolTypes.RADIAL && showEffect && (
              <div className="absolute inset-0" style={radialStyle}></div>
            )}
            
            {/* 画笔滤镜效果 */}
            {selectedTool === toolTypes.BRUSH && brushStrokes.map((stroke, index) => (
              <div 
                key={index}
                className="absolute rounded-full"
                style={{
                  left: `${stroke.x}%`,
                  top: `${stroke.y}%`,
                  width: `${stroke.size}px`,
                  height: `${stroke.size}px`,
                  transform: 'translate(-50%, -50%)',
                  background: exposure >= 0 
                    ? `rgba(255, 255, 255, ${stroke.opacity})`
                    : `rgba(0, 0, 0, ${stroke.opacity})`,
                  mixBlendMode: exposure >= 0 ? 'lighten' : 'darken',
                }}
              ></div>
            ))}
            
            {/* 渐变滤镜控制点 */}
            {selectedTool === toolTypes.GRADIENT && (
              <>
                <div
                  className="absolute w-6 h-6 bg-white border-2 border-purple-600 rounded-full z-20 -translate-x-1/2 -translate-y-1/2 cursor-move"
                  style={{ left: `${gradientPosition.start}%`, top: `${gradientPosition.start}%` }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    const handleMouseMove = handleGradientDrag('start');
                    const handleMouseUp = () => {
                      window.removeEventListener('mousemove', handleMouseMove);
                      window.removeEventListener('mouseup', handleMouseUp);
                    };
                    window.addEventListener('mousemove', handleMouseMove);
                    window.addEventListener('mouseup', handleMouseUp);
                  }}
                ></div>
                <div
                  className="absolute w-6 h-6 bg-white border-2 border-purple-600 rounded-full z-20 -translate-x-1/2 -translate-y-1/2 cursor-move"
                  style={{ left: `${gradientPosition.end}%`, top: `${gradientPosition.end}%` }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    const handleMouseMove = handleGradientDrag('end');
                    const handleMouseUp = () => {
                      window.removeEventListener('mousemove', handleMouseMove);
                      window.removeEventListener('mouseup', handleMouseUp);
                    };
                    window.addEventListener('mousemove', handleMouseMove);
                    window.addEventListener('mouseup', handleMouseUp);
                  }}
                ></div>
                <div
                  className="absolute z-20 border-2 border-dashed border-white/70"
                  style={{
                    left: `${Math.min(gradientPosition.start, gradientPosition.end)}%`,
                    top: `${Math.min(gradientPosition.start, gradientPosition.end)}%`,
                    width: `${Math.abs(gradientPosition.end - gradientPosition.start)}%`,
                    height: `${Math.abs(gradientPosition.end - gradientPosition.start)}%`,
                    pointerEvents: 'none',
                  }}
                ></div>
              </>
            )}
            
            {/* 径向滤镜控制点 */}
            {selectedTool === toolTypes.RADIAL && (
              <>
                <div
                  className="absolute w-6 h-6 bg-white border-2 border-purple-600 rounded-full z-20 -translate-x-1/2 -translate-y-1/2 cursor-move"
                  style={{ left: `${radialPosition.x}%`, top: `${radialPosition.y}%` }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    const handleMouseMove = (event: MouseEvent) => handleRadialDrag(event);
                    const handleMouseUp = () => {
                      window.removeEventListener('mousemove', handleMouseMove);
                      window.removeEventListener('mouseup', handleMouseUp);
                    };
                    window.addEventListener('mousemove', handleMouseMove);
                    window.addEventListener('mouseup', handleMouseUp);
                  }}
                ></div>
                <div
                  className="absolute w-6 h-6 bg-white border-2 border-purple-600 rounded-full z-20 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize"
                  style={{ 
                    left: `${radialPosition.x + radialPosition.size * Math.cos(Math.PI/4)}%`, 
                    top: `${radialPosition.y + radialPosition.feather * Math.sin(Math.PI/4)}%` 
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    const handleMouseMove = (event: MouseEvent) => handleRadialResize(event);
                    const handleMouseUp = () => {
                      window.removeEventListener('mousemove', handleMouseMove);
                      window.removeEventListener('mouseup', handleMouseUp);
                    };
                    window.addEventListener('mousemove', handleMouseMove);
                    window.addEventListener('mouseup', handleMouseUp);
                  }}
                ></div>
                <div
                  className="absolute border-2 border-dashed border-white/70 rounded-full z-20 pointer-events-none"
                  style={{
                    left: `${radialPosition.x - radialPosition.size}%`,
                    top: `${radialPosition.y - radialPosition.feather}%`,
                    width: `${radialPosition.size * 2}%`,
                    height: `${radialPosition.feather * 2}%`,
                  }}
                ></div>
              </>
            )}
          </div>
          
          {/* 工具操作按钮 */}
          <div className="flex flex-wrap gap-3">
            {selectedTool === toolTypes.BRUSH && (
              <Button
                onClick={clearBrushPaths}
                variant="outline"
                className="border-purple-300 dark:border-purple-700"
              >
                清除笔刷
              </Button>
            )}
            
            <Button
              onClick={() => {
                setGradientPosition({ start: 30, end: 70, angle: 180 });
                setRadialPosition({ x: 50, y: 50, size: 60, feather: 50 });
                setBrushStrokes([]);
              }}
              variant="outline"
              className="border-purple-300 dark:border-purple-700"
            >
              重置位置
            </Button>
          </div>
          
          {/* 技巧和说明 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">局部调整技巧</h4>
                <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>使用渐变滤镜调整天空和地面的过渡</li>
                  <li>径向滤镜适合强调主体或虚化背景</li>
                  <li>笔刷工具可以进行精细的局部调整</li>
                  <li>调整前先确定要突出的重点区域</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">应用场景</h4>
                <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>风景摄影：平衡天空与地面的曝光</li>
                  <li>人像摄影：强调主体，淡化背景</li>
                  <li>产品摄影：突出产品细节</li>
                  <li>建筑摄影：调整光线和阴影</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// 获取工具描述
function getToolDescription(tool: string) {
  switch (tool) {
    case toolTypes.GRADIENT:
      return {
        title: "渐变滤镜",
        description: "创建线性渐变调整区域，特别适合处理天空与地面等渐变过渡区域。可以模拟渐变滤镜效果，平衡照片中不同区域的曝光。",
        tip: "拖动两个控制点来调整渐变的方向和范围。"
      };
    case toolTypes.RADIAL:
      return {
        title: "径向滤镜",
        description: "创建圆形或椭圆形调整区域，适合强调或淡化特定区域。可以用来突出主体、创造晕影效果或局部调整曝光。",
        tip: "拖动中心点移动滤镜，拖动边缘点调整大小。"
      };
    case toolTypes.BRUSH:
      return {
        title: "调整笔刷",
        description: "自由绘制调整区域，适合复杂形状的精细调整。可以精确控制需要调整的区域，如肖像修饰、局部增强等。",
        tip: "在画布上拖动绘制笔刷路径，使用\"清除笔刷\"按钮重新开始。"
      };
    default:
      return {
        title: "选择工具",
        description: "请选择一个局部调整工具开始编辑。",
        tip: "每种工具适合不同的调整场景。"
      };
  }
}

// 计算渐变角度
function getGradientAngle(position: {start: number, end: number, angle: number}) {
  const dx = position.end - position.start;
  const dy = 0;
  
  // 计算角度（弧度）并转换为度
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  // 调整为CSS渐变角度（CSS中0度是向上，需要调整）
  angle = 90 - angle;
  
  return angle;
}

// 工具图标组件
function GradientIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="3" y1="15" x2="21" y2="15"></line>
    </svg>
  );
}

function RadialIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  );
}

function BrushIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 3L21 6V18A2 2 0 0119 20H5A2 2 0 013 18V6L6 3H18Z"></path>
      <path d="M10 12C12 8 14 12 16 12"></path>
    </svg>
  );
} 