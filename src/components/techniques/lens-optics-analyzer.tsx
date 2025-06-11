"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 模拟光学问题图片
const OpticalIssueSimulator = ({ 
  issue, 
  intensity 
}: { 
  issue: string; 
  intensity: number; 
}) => {
  // 根据不同的光学问题和强度生成不同的效果
  const getIssueStyles = () => {
    const baseStyle: React.CSSProperties = { 
      position: 'absolute', 
      inset: 0 
    };

    switch (issue) {
      case 'chromatic':
        return {
          ...baseStyle,
          boxShadow: `
            0 0 ${intensity * 5}px ${intensity}px rgba(255, 0, 0, 0.3) inset,
            0 0 ${intensity * 5}px ${intensity}px rgba(0, 0, 255, 0.3)
          `,
          filter: `saturate(${1 + intensity * 0.5})`
        };
      case 'vignetting':
        return {
          ...baseStyle,
          background: `radial-gradient(
            circle, 
            transparent ${Math.max(10, 100 - intensity * 60)}%, 
            rgba(0, 0, 0, ${intensity * 0.7}) 100%
          )`
        };
      case 'distortion':
        // 畸变只能用CSS模拟一部分效果
        return {
          ...baseStyle,
          transform: intensity > 0.5 ? 
            `perspective(500px) rotateX(${intensity * 5}deg)` : 
            `scale(${1 + (intensity * 0.1)}, ${1 - (intensity * 0.1)})`
        };
      case 'flare':
        return {
          ...baseStyle,
          background: `linear-gradient(
            ${45 + intensity * 30}deg,
            transparent ${80 - intensity * 40}%,
            rgba(255, 255, 255, ${intensity * 0.5}) ${90 - intensity * 20}%,
            transparent ${100 - intensity * 10}%
          )`
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div className="relative w-full aspect-video bg-secondary/30 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
        {issue === 'chromatic' && '色差模拟效果'}
        {issue === 'vignetting' && '暗角模拟效果'}
        {issue === 'distortion' && '畸变模拟效果'}
        {issue === 'flare' && '镜头眩光模拟效果'}
      </div>
      <div style={getIssueStyles()} />
    </div>
  );
};

// MTF曲线组件
const MTFChart = ({ aperture }: { aperture: number }) => {
  // 根据光圈值调整MTF曲线形状
  const getMTFPath = () => {
    // 随着光圈变小（数值变大），MTF曲线在中心区域提高，边缘区域下降
    const centerValue = Math.min(95, 70 + (22 - aperture) * 1.5); // 中心分辨率
    const midValue = Math.max(50, 85 - aperture * 2); // 中间区域分辨率
    const edgeValue = Math.max(30, 70 - aperture * 2); // 边缘分辨率
    
    return `M0,100 C${centerValue/3},${100-centerValue} ${midValue/1.5},${100-midValue} 100,${100-edgeValue}`;
  };

  return (
    <div className="w-full h-[200px] bg-secondary/20 rounded-lg p-4 relative">
      <div className="absolute inset-x-0 bottom-8 text-xs text-muted-foreground flex justify-between px-4">
        <span>中心</span>
        <span>边缘</span>
      </div>
      
      <div className="absolute left-8 top-0 bottom-0 flex flex-col justify-between items-center">
        <span className="text-xs text-muted-foreground">100%</span>
        <span className="text-xs text-muted-foreground">50%</span>
        <span className="text-xs text-muted-foreground">0%</span>
      </div>
      
      <div className="absolute left-12 right-4 top-4 bottom-12 flex items-end">
        {/* 网格线 */}
        <div className="absolute inset-0">
          <div className="h-1/2 border-b border-muted/30" />
          <div className="absolute left-0 h-full w-0.5 border-l border-muted/30" />
          <div className="absolute right-0 h-full w-0.5 border-l border-muted/30" />
        </div>
        
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d={getMTFPath()}
            fill="none" 
            stroke="rgba(168, 85, 247, 0.8)" 
            strokeWidth="2"
          />
          <path 
            d={`M0,100 C40,${100 - aperture * 3} 60,${100 - aperture * 2} 100,${100 - aperture * 1.5}`}
            fill="none" 
            stroke="rgba(139, 92, 246, 0.5)" 
            strokeWidth="2" 
            strokeDasharray="3,2"
          />
        </svg>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 text-center text-xs text-muted-foreground">
        MTF曲线 (f/{aperture})
      </div>
    </div>
  );
};

// 主组件
export default function LensOpticsAnalyzer() {
  const [selectedIssue, setSelectedIssue] = useState<string>("chromatic");
  const [issueIntensity, setIssueIntensity] = useState<number>(0.5);
  const [selectedAperture, setSelectedAperture] = useState<number>(2.8);

  // 光圈选项
  const apertureOptions = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];

  // 光学问题选项
  const opticalIssues = [
    { id: 'chromatic', name: '色差', description: '镜片无法将所有颜色聚焦在同一点导致的色散现象' },
    { id: 'vignetting', name: '暗角', description: '镜头边缘区域光线传输减少造成的图像边缘暗化' },
    { id: 'distortion', name: '畸变', description: '直线在图像中呈现为弯曲形状的几何失真' },
    { id: 'flare', name: '镜头眩光', description: '强光源直接照射镜头造成的光斑和对比度降低' }
  ];

  return (
    <div className="space-y-8">
      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="issues">光学缺陷分析</TabsTrigger>
          <TabsTrigger value="mtf">MTF曲线解析</TabsTrigger>
          <TabsTrigger value="quality">成像质量比较</TabsTrigger>
        </TabsList>
        
        <TabsContent value="issues" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">光学缺陷模拟器</h3>
              
              {/* 问题选择 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {opticalIssues.map(issue => (
                  <button
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                      ${selectedIssue === issue.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary hover:bg-secondary/80'}`}
                  >
                    {issue.name}
                  </button>
                ))}
              </div>
              
              {/* 强度滑块 */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">效应强度</span>
                  <span className="text-sm">{Math.round(issueIntensity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={issueIntensity}
                  onChange={(e) => setIssueIntensity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>最小</span>
                  <span>最大</span>
                </div>
              </div>
              
              {/* 问题说明 */}
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">
                  {opticalIssues.find(i => i.id === selectedIssue)?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {opticalIssues.find(i => i.id === selectedIssue)?.description}
                </p>
                
                {selectedIssue === 'chromatic' && (
                  <div className="mt-4 text-xs space-y-1 text-muted-foreground">
                    <p>・ 在明暗对比强烈的边缘最明显，表现为色彩边缘</p>
                    <p>・ 广角镜头和大光圈时更容易出现</p>
                    <p>・ 降低方法：缩小光圈、避免高对比度场景</p>
                  </div>
                )}
                
                {selectedIssue === 'vignetting' && (
                  <div className="mt-4 text-xs space-y-1 text-muted-foreground">
                    <p>・ 大光圈时更明显，缩小光圈可减轻</p>
                    <p>・ 广角镜头边缘暗角通常更严重</p>
                    <p>・ 后期可通过校正工具补偿</p>
                  </div>
                )}
                
                {selectedIssue === 'distortion' && (
                  <div className="mt-4 text-xs space-y-1 text-muted-foreground">
                    <p>・ 桶形畸变：线条向外弯曲，常见于广角镜头</p>
                    <p>・ 枕形畸变：线条向内弯曲，常见于长焦镜头</p>
                    <p>・ 专业软件可通过几何校正修复</p>
                  </div>
                )}
                
                {selectedIssue === 'flare' && (
                  <div className="mt-4 text-xs space-y-1 text-muted-foreground">
                    <p>・ 强光直射镜头或在画面内时产生</p>
                    <p>・ 使用遮光罩可减轻眩光问题</p>
                    <p>・ 有时可作为创意元素使用</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">效果可视化</h3>
              <OpticalIssueSimulator 
                issue={selectedIssue} 
                intensity={issueIntensity} 
              />
              
              <div className="mt-8 bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">如何避免光学缺陷</h4>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                  <li>选择高质量镜头，特别是针对特定问题有优化的型号</li>
                  <li>在镜头最佳光圈范围内拍摄（通常为f/5.6-f/11）</li>
                  <li>使用遮光罩减少眩光和提高对比度</li>
                  <li>拍摄RAW格式，提供更多后期校正空间</li>
                  <li>了解镜头特性，避开其弱点区域</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="mtf" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MTF曲线解析</h3>
              
              {/* 光圈选择 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {apertureOptions.map(aperture => (
                  <button
                    key={aperture}
                    onClick={() => setSelectedAperture(aperture)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                      ${selectedAperture === aperture 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary hover:bg-secondary/80'}`}
                  >
                    f/{aperture}
                  </button>
                ))}
              </div>
              
              <MTFChart aperture={selectedAperture} />
              
              <div className="mt-6 bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">MTF曲线解读指南</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  调制传递函数(MTF)是衡量镜头解析细节能力的客观指标。
                  曲线越高，表示对比度和锐度越好；曲线平稳表示从中心到边缘的性能一致性好。
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>・ 实线：高频细节分辨能力</li>
                  <li>・ 虚线：低频对比度表现</li>
                  <li>・ 左侧：镜头中心区域表现</li>
                  <li>・ 右侧：镜头边缘区域表现</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">光圈与解析力关系</h3>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">
                  镜头的解析力受光圈的显著影响。每个镜头都存在一个"最佳光圈"，
                  通常比最大光圈缩小2-3档（如f/5.6-f/8），在此范围内能获得最佳锐度和对比度。
                </p>
                
                <div className="space-y-4 mt-6">
                  <div>
                    <h4 className="font-medium mb-2 text-sm">最大光圈 (f/1.4-f/2.8)</h4>
                    <div className="bg-secondary/50 p-3 rounded text-xs text-muted-foreground">
                      <p>・ 解析力较低，尤其是边缘</p>
                      <p>・ 球面像差和色差明显</p>
                      <p>・ 优点：能在低光环境下拍摄</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-sm">中等光圈 (f/4-f/8)</h4>
                    <div className="bg-secondary/50 p-3 rounded text-xs text-muted-foreground">
                      <p>・ 最佳光圈范围，锐度最高</p>
                      <p>・ 光学缺陷减少，整体表现最佳</p>
                      <p>・ 中心到边缘的一致性好</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-sm">小光圈 (f/11-f/22)</h4>
                    <div className="bg-secondary/50 p-3 rounded text-xs text-muted-foreground">
                      <p>・ 衍射现象导致整体锐度下降</p>
                      <p>・ 边缘与中心锐度差异变小</p>
                      <p>・ 优点：提供更大景深</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-purple-900/20 border border-purple-700/30 rounded-lg">
                <h4 className="font-medium mb-2">专业提示</h4>
                <p className="text-sm text-muted-foreground">
                  为何高端镜头价格高昂？优质镜头使用特殊的低色散玻璃和非球面镜片，
                  能在大光圈下保持出色的锐度和最小的光学缺陷。在画质与光圈速度方面，
                  物理光学定律使镜头设计者必须做出权衡，而高端镜头在这一权衡中表现更出色。
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="quality" className="p-6 bg-secondary/30 rounded-lg mt-6">
          <div className="text-center py-20">
            <h3 className="text-xl font-bold mb-2">成像质量比较模块</h3>
            <p className="text-muted-foreground">
              此模块将提供不同光圈设置下相同场景的实际样片对比，
              <br />展示锐度、对比度和光学缺陷的变化。
            </p>
            <p className="mt-4 text-xs text-muted-foreground">演示版本中此功能暂未实现</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 