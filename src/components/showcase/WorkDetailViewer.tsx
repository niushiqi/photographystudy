"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Info } from "lucide-react";

interface TechnicalDetail {
  label: string;
  value: string;
}

interface AnalysisPoint {
  title: string;
  description: string;
  position?: { x: number; y: number }; // 图像上的标注位置 (百分比)
}

export interface WorkDetailProps {
  title: string;
  photographer: string;
  year: number;
  imageUrl: string;
  category: string;
  description: string;
  story?: string;
  technicalDetails?: TechnicalDetail[];
  analysisPoints?: AnalysisPoint[];
  isOpen: boolean;
  onClose: () => void;
}

export function WorkDetailViewer({
  title,
  photographer,
  year,
  imageUrl,
  category,
  description,
  story,
  technicalDetails,
  analysisPoints,
  isOpen,
  onClose,
}: WorkDetailProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showAnalysis, setShowAnalysis] = useState(false);
  
  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.25, 2.5));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.25, 1));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white z-50 hover:bg-black"
          >
            <X size={24} />
          </button>
          
          {/* 缩放控制 */}
          <div className="absolute top-4 left-4 flex gap-2 z-50">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-black/50 rounded-full text-white hover:bg-black"
              disabled={zoomLevel >= 2.5}
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-black/50 rounded-full text-white hover:bg-black"
              disabled={zoomLevel <= 1}
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className={`p-2 rounded-full hover:bg-black ${
                showAnalysis ? "bg-primary/80 text-white" : "bg-black/50 text-white"
              }`}
            >
              <Info size={20} />
            </button>
          </div>
          
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
            {/* 图片区域 */}
            <div className="relative flex-1 overflow-auto bg-black/30 rounded-lg">
              <div
                className="relative h-full w-full overflow-auto"
                style={{
                  cursor: zoomLevel > 1 ? "move" : "default",
                }}
              >
                <div
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "center",
                    transition: "transform 0.2s ease-out",
                  }}
                  className="relative min-h-full flex items-center justify-center"
                >
                  <Image
                    src={imageUrl}
                    alt={`${title} - ${photographer}`}
                    width={1200}
                    height={800}
                    className="object-contain max-h-[80vh]"
                  />
                  
                  {/* 分析点标注 */}
                  {showAnalysis && analysisPoints && analysisPoints.map((point, index) => (
                    <div
                      key={index}
                      className="absolute w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer border-2 border-white animate-pulse"
                      style={{
                        left: `${point.position?.x || 50}%`,
                        top: `${point.position?.y || 50}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      title={point.title}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 信息面板 */}
            <motion.div
              className="w-full md:w-96 bg-background border-l border-border p-6 overflow-y-auto"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg text-foreground/80">{photographer}</p>
                <p className="text-sm text-muted-foreground">{year}</p>
              </div>
              
              <div className="mb-6">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                  {category}
                </span>
              </div>
              
              <div className="space-y-6">
                {description && (
                  <section>
                    <h3 className="text-lg font-medium mb-2">作品描述</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </section>
                )}
                
                {story && (
                  <section>
                    <h3 className="text-lg font-medium mb-2">创作背景</h3>
                    <p className="text-sm text-muted-foreground">{story}</p>
                  </section>
                )}
                
                {technicalDetails && technicalDetails.length > 0 && (
                  <section>
                    <h3 className="text-lg font-medium mb-2">技术参数</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {technicalDetails.map((detail, index) => (
                        <div key={index} className="bg-secondary/30 p-2 rounded">
                          <p className="text-xs text-muted-foreground">{detail.label}</p>
                          <p className="text-sm font-medium">{detail.value}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                
                {showAnalysis && analysisPoints && analysisPoints.length > 0 && (
                  <section>
                    <h3 className="text-lg font-medium mb-2">作品解析</h3>
                    {analysisPoints.map((point, index) => (
                      <div key={index} className="mb-3 border-l-2 border-primary pl-3">
                        <p className="text-sm font-medium flex items-center gap-1">
                          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                            {index + 1}
                          </span>
                          {point.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {point.description}
                        </p>
                      </div>
                    ))}
                  </section>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 