"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeftRight, ExternalLink, Maximize, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: number;
  className?: string;
}

export function BeforeAfterComparison({
  beforeImage,
  afterImage,
  beforeAlt = "应用技巧前",
  afterAlt = "应用技巧后",
  beforeLabel = "技巧前",
  afterLabel = "技巧后",
  height = 400,
  className,
}: BeforeAfterComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 处理滑块拖动
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const containerWidth = rect.width;
      
      // 计算百分比位置（0-100之间）
      let newPosition = (x / containerWidth) * 100;
      newPosition = Math.max(0, Math.min(100, newPosition));
      
      setSliderPosition(newPosition);
    }
  };

  // 添加全局鼠标事件监听
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={cn("rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden", className)}>
      {/* 控制条 */}
      <div className="bg-white dark:bg-neutral-800 p-3 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
        <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center">
          <ArrowLeftRight className="w-4 h-4 mr-2 text-amber-500 dark:text-amber-400" />
          技巧效果对比
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-750 text-neutral-600 dark:text-neutral-400"
          >
            {isZoomed ? <Maximize className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>
          
          <div className="flex text-xs text-neutral-500 dark:text-neutral-400 items-center">
            <span>拖动滑块对比效果</span>
          </div>
        </div>
      </div>
      
      {/* 图片对比区域 */}
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-neutral-900 cursor-col-resize"
        style={{ height: isZoomed ? "70vh" : height }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        {/* 左侧图片（前） */}
        <div 
          className="absolute top-0 left-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${beforeImage})`,
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
          }}
        />
        
        {/* 右侧图片（后） */}
        <div 
          className="absolute top-0 right-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${afterImage})`,
            clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
          }}
        />
        
        {/* 滑块控制器 */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
          style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
            <ArrowLeftRight className="w-4 h-4 text-neutral-600" />
          </div>
        </div>
        
        {/* 标签 */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 text-white text-xs rounded">
          {beforeLabel}
        </div>
        
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded">
          {afterLabel}
        </div>
      </div>
      
      {/* 说明文字 */}
      <div className="p-3 bg-neutral-50 dark:bg-neutral-750 border-t border-neutral-200 dark:border-neutral-700 flex justify-between text-xs">
        <span className="text-neutral-500 dark:text-neutral-400">
          {beforeAlt}
        </span>
        <span className="text-neutral-500 dark:text-neutral-400">
          {afterAlt}
        </span>
      </div>
    </div>
  );
} 