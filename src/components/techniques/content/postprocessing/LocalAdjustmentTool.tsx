"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface LocalAdjustmentToolProps {
  image?: string;
  className?: string;
}

export function LocalAdjustmentTool({ 
  image = "/images/postprocessing/raw-samples/adjustment-sample.jpg", 
  className 
}: LocalAdjustmentToolProps) {
  // 当前选择的工具类型
  const [selectedTool, setSelectedTool] = useState<'gradient' | 'radial' | 'brush'>('gradient');
  
  // 调整参数
  const [exposure, setExposure] = useState([0]);
  const [contrast, setContrast] = useState([0]);
  const [highlights, setHighlights] = useState([0]);
  const [shadows, setShadows] = useState([0]);
  const [clarity, setClarity] = useState([0]);
  
  // 渐变滤镜位置参数
  const [gradientPosition, setGradientPosition] = useState({
    x1: 30,
    y1: 20,
    x2: 30,
    y2: 70
  });
  
  // 径向滤镜位置参数
  const [radialPosition, setRadialPosition] = useState({
    cx: 50,
    cy: 50,
    rx: 25,
    ry: 25
  });
  
  // 画布参考
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // 工具按钮选项
  const tools = [
    { id: 'gradient', name: '渐变滤镜', icon: GradientIcon },
    { id: 'radial', name: '径向滤镜', icon: RadialIcon },
    { id: 'brush', name: '调整笔刷', icon: BrushIcon },
  ];
  
  // 处理渐变滤镜的移动和调整
  const handleGradientDrag = (direction: 'start' | 'end', e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (direction === 'start') {
      setGradientPosition(prev => ({
        ...prev,
        x1: Math.min(Math.max(0, x), 100),
        y1: Math.min(Math.max(0, y), 100)
      }));
    } else {
      setGradientPosition(prev => ({
        ...prev,
        x2: Math.min(Math.max(0, x), 100),
        y2: Math.min(Math.max(0, y), 100)
      }));
    }
  };
  
  // 处理径向滤镜的移动和调整
  const handleRadialDrag = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setRadialPosition(prev => ({
      ...prev,
      cx: Math.min(Math.max(0, x), 100),
      cy: Math.min(Math.max(0, y), 100)
    }));
  };
  
  // 处理径向滤镜大小调整
  const handleRadialResize = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const centerX = (radialPosition.cx / 100) * rect.width;
    const centerY = (radialPosition.cy / 100) * rect.height;
    
    const dx = e.clientX - rect.left - centerX;
    const dy = e.clientY - rect.top - centerY;
    
    // 计算新的半径
    const rx = (Math.abs(dx) / rect.width) * 100;
    const ry = (Math.abs(dy) / rect.height) * 100;
    
    setRadialPosition(prev => ({
      ...prev,
      rx: Math.min(Math.max(5, rx), 50),
      ry: Math.min(Math.max(5, ry), 50)
    }));
  };

  // 事件处理函数，修复类型错误
  const handleMouseMoveForGradient = (direction: 'start' | 'end') => (e: MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (direction === 'start') {
      setGradientPosition(prev => ({
        ...prev,
        x1: Math.min(Math.max(0, x), 100),
        y1: Math.min(Math.max(0, y), 100)
      }));
    } else {
      setGradientPosition(prev => ({
        ...prev,
        x2: Math.min(Math.max(0, x), 100),
        y2: Math.min(Math.max(0, y), 100)
      }));
    }
  };

  const handleMouseMoveForRadial = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setRadialPosition(prev => ({
      ...prev,
      cx: Math.min(Math.max(0, x), 100),
      cy: Math.min(Math.max(0, y), 100)
    }));
  };

  const handleMouseMoveForResize = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const centerX = (radialPosition.cx / 100) * rect.width;
    const centerY = (radialPosition.cy / 100) * rect.height;
    
    const dx = e.clientX - rect.left - centerX;
    const dy = e.clientY - rect.top - centerY;
    
    // 计算新的半径
    const rx = (Math.abs(dx) / rect.width) * 100;
    const ry = (Math.abs(dy) / rect.height) * 100;
    
    setRadialPosition(prev => ({
      ...prev,
      rx: Math.min(Math.max(5, rx), 50),
      ry: Math.min(Math.max(5, ry), 50)
    }));
  };
  
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-5 gap-6 ${className}`}>
      {/* 左侧：工具和参数面板 */}
      <div className="lg:col-span-2 space-y-6">
        {/* 工具选择 */}
        <div className="flex space-x-2 mb-6">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
                selectedTool === tool.id
                  ? "bg-purple-600 text-white"
                  : "bg-purple-900/30 hover:bg-purple-800/40"
              }`}
              onClick={() => setSelectedTool(tool.id as any)}
            >
              <tool.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{tool.name}</span>
            </button>
          ))}
        </div>
        
        {/* 参数调整 */}
        <div className="space-y-6 bg-purple-900/20 p-4 rounded-xl border border-purple-800/30">
          <h3 className="text-lg font-semibold">调整参数</h3>
          
          {/* 曝光度滑块 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>曝光度</span>
              <span>{exposure[0].toFixed(1)} EV</span>
            </div>
            <Slider
              value={exposure}
              min={-2}
              max={2}
              step={0.1}
              onValueChange={setExposure}
            />
          </div>
          
          {/* 对比度滑块 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>对比度</span>
              <span>{contrast[0]}</span>
            </div>
            <Slider
              value={contrast}
              min={-100}
              max={100}
              step={1}
              onValueChange={setContrast}
            />
          </div>
          
          {/* 高光滑块 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>高光</span>
              <span>{highlights[0]}</span>
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
              <span>阴影</span>
              <span>{shadows[0]}</span>
            </div>
            <Slider
              value={shadows}
              min={-100}
              max={100}
              step={1}
              onValueChange={setShadows}
            />
          </div>
          
          {/* 清晰度滑块 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>清晰度</span>
              <span>{clarity[0]}</span>
            </div>
            <Slider
              value={clarity}
              min={-100}
              max={100}
              step={1}
              onValueChange={setClarity}
            />
          </div>
        </div>
        
        {/* 局部调整技术说明 */}
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-2">{getToolDescription(selectedTool).title}</h4>
            <p className="text-sm text-muted-foreground">{getToolDescription(selectedTool).description}</p>
            
            <div className="mt-4 p-3 bg-purple-800/30 rounded-lg text-sm">
              <p className="font-medium text-yellow-300 mb-1">提示:</p>
              <p className="text-muted-foreground">{getToolDescription(selectedTool).tip}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 右侧：图像和交互区域 */}
      <div 
        ref={canvasRef}
        className="lg:col-span-3 aspect-video relative bg-black/40 rounded-lg overflow-hidden"
      >
        {/* 底图 */}
        <div className="absolute inset-0">
          <Image
            src={image || "/images/techniques/local-adjustment-demo.jpg"}
            alt="局部调整演示"
            fill
            className="object-cover"
          />
        </div>
        
        {/* 渐变滤镜 */}
        {selectedTool === 'gradient' && (
          <div className="absolute inset-0 z-10">
            {/* 渐变效果可视化 */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(${getGradientAngle(gradientPosition)}deg, rgba(128, 90, 213, 0.3), transparent)`,
              }}
            ></div>
            
            {/* 控制点 - 起始 */}
            <div 
              className="absolute w-4 h-4 bg-white rounded-full border-2 border-purple-600 cursor-move"
              style={{
                left: `${gradientPosition.x1}%`,
                top: `${gradientPosition.y1}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 15
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                window.addEventListener('mousemove', handleMouseMoveForGradient('start'));
                window.addEventListener('mouseup', () => {
                  window.removeEventListener('mousemove', handleMouseMoveForGradient('start'));
                }, { once: true });
              }}
            ></div>
            
            {/* 控制点 - 结束 */}
            <div 
              className="absolute w-4 h-4 bg-white rounded-full border-2 border-purple-600 cursor-move"
              style={{
                left: `${gradientPosition.x2}%`,
                top: `${gradientPosition.y2}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 15
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                window.addEventListener('mousemove', handleMouseMoveForGradient('end'));
                window.addEventListener('mouseup', () => {
                  window.removeEventListener('mousemove', handleMouseMoveForGradient('end'));
                }, { once: true });
              }}
            ></div>
            
            {/* 连接线 */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 14 }}>
              <line
                x1={`${gradientPosition.x1}%`}
                y1={`${gradientPosition.y1}%`}
                x2={`${gradientPosition.x2}%`}
                y2={`${gradientPosition.y2}%`}
                stroke="white"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        )}
        
        {/* 径向滤镜 */}
        {selectedTool === 'radial' && (
          <div className="absolute inset-0 z-10">
            {/* 径向效果可视化 */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <radialGradient id="radialMask" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="rgba(128, 90, 213, 0.3)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                <ellipse
                  cx={`${radialPosition.cx}%`}
                  cy={`${radialPosition.cy}%`}
                  rx={`${radialPosition.rx}%`}
                  ry={`${radialPosition.ry}%`}
                  fill="url(#radialMask)"
                />
              </svg>
            </div>
            
            {/* 中心控制点 */}
            <div 
              className="absolute w-4 h-4 bg-white rounded-full border-2 border-purple-600 cursor-move"
              style={{
                left: `${radialPosition.cx}%`,
                top: `${radialPosition.cy}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 15
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                window.addEventListener('mousemove', handleMouseMoveForRadial);
                window.addEventListener('mouseup', () => {
                  window.removeEventListener('mousemove', handleMouseMoveForRadial);
                }, { once: true });
              }}
            ></div>
            
            {/* 半径控制点 */}
            <div 
              className="absolute w-4 h-4 bg-white rounded-full border-2 border-purple-600 cursor-nwse-resize"
              style={{
                left: `${radialPosition.cx + radialPosition.rx}%`,
                top: `${radialPosition.cy + radialPosition.ry}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 15
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                window.addEventListener('mousemove', handleMouseMoveForResize);
                window.addEventListener('mouseup', () => {
                  window.removeEventListener('mousemove', handleMouseMoveForResize);
                }, { once: true });
              }}
            ></div>
            
            {/* 椭圆轮廓 */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 14 }}>
              <ellipse
                cx={`${radialPosition.cx}%`}
                cy={`${radialPosition.cy}%`}
                rx={`${radialPosition.rx}%`}
                ry={`${radialPosition.ry}%`}
                stroke="white"
                strokeWidth="2"
                strokeDasharray="5,5"
                fill="none"
              />
            </svg>
          </div>
        )}
        
        {/* 调整笔刷 */}
        {selectedTool === 'brush' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="text-center text-white bg-black/50 px-4 py-2 rounded">
              <p>点击并拖动鼠标在图像上绘制</p>
              <p className="text-sm text-purple-300">（实际应用中会实现绘制功能）</p>
            </div>
            
            {/* 在实际应用中，这里会实现画笔交互功能 */}
          </div>
        )}
        
        {/* 操作提示 */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white text-sm p-2 rounded z-20">
          {selectedTool === 'gradient' && "拖动控制点调整渐变方向和范围"}
          {selectedTool === 'radial' && "拖动中心点移动椭圆，拖动边缘点调整大小"}
          {selectedTool === 'brush' && "在图像上绘制需要调整的区域"}
        </div>
      </div>
    </div>
  );
}

// 工具描述信息
function getToolDescription(tool: string) {
  switch(tool) {
    case 'gradient':
      return {
        title: "渐变滤镜",
        description: "渐变滤镜可以在图像上创建线性过渡效果，非常适合调整天空与地面的过渡、调整水平线上下的亮度差异等。",
        tip: "尝试将渐变滤镜应用于天空，降低高光并增加蓝色饱和度，使天空更具戏剧性。"
      };
    case 'radial':
      return {
        title: "径向滤镜",
        description: "径向滤镜创建一个圆形或椭圆形的选区，可用于突出主体、创建晕影效果或局部调整特定区域。",
        tip: "在人像摄影中，使用径向滤镜围绕主体，轻微增加曝光并降低周围区域的清晰度，创建自然的注意力引导。"
      };
    case 'brush':
      return {
        title: "调整笔刷",
        description: "调整笔刷允许您自由绘制需要调整的精确区域，适合处理复杂形状的对象或需要精细控制的区域。",
        tip: "使用较小的笔刷硬度（0-20%）可以创建更自然的过渡效果，避免调整区域出现明显边界。"
      };
    default:
      return {
        title: "",
        description: "",
        tip: ""
      };
  }
}

// 计算渐变角度
function getGradientAngle(position: {x1: number, y1: number, x2: number, y2: number}) {
  const dx = position.x2 - position.x1;
  const dy = position.y2 - position.y1;
  
  // 计算角度（弧度）并转换为度数
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  // 调整角度，使其符合CSS渐变角度定义
  angle = 90 - angle;
  
  return angle;
}

// 图标组件
function GradientIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="3" y1="15" x2="21" y2="15"></line>
    </svg>
  );
}

function RadialIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  );
}

function BrushIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 3a3 3 0 0 0-3 3"></path>
      <path d="m16.83 15.17 2-2a2.83 2.83 0 0 1 4 0 2.83 2.83 0 0 1 0 4l-4 4-7-7"></path>
      <path d="M12.83 11.17a2.83 2.83 0 0 0-4-4l-8 8 7 7 5-5"></path>
    </svg>
  );
} 