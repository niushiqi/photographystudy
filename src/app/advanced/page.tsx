'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { PageHeader } from "@/components/ui/PageHeader";

// 技术进阶专用组件
import TechNavigation from "@/components/techniques/advanced/TechNavigation";
import DepthIndicator from "@/components/techniques/advanced/DepthIndicator";

// 动态范围分析实验室
import DynamicRangeVisualizer from "@/components/techniques/advanced/dynamic-range/DynamicRangeVisualizer";

// 景深物理模型
import DepthOfFieldPhysics from "@/components/techniques/advanced/depth-of-field/DepthOfFieldPhysics";

// 镜头光学特性分析器
import LensOpticsAnalyzer from "@/components/techniques/advanced/lens-optics/LensOpticsAnalyzer";

// 测光系统技术解析
import MeteringSystemExplorer from "@/components/techniques/advanced/metering-system/MeteringSystemExplorer";

// 自动对焦技术剖析
import AutofocusTechnology from "@/components/techniques/advanced/autofocus/AutofocusTechnology";

export default function AdvancedPage() {
  // 技术深度级别
  const [depthLevel, setDepthLevel] = useState(2);
  // 当前活跃的知识节点
  const [activeNode, setActiveNode] = useState('');
  
  // 处理技术深度变化
  const handleDepthChange = (depth: number) => {
    setDepthLevel(depth);
  };
  
  // 处理知识节点点击
  const handleNodeClick = (nodeId: string) => {
    setActiveNode(nodeId);
    
    // 根据节点ID自动切换到相应的标签页
    const tabMapping: {[key: string]: string} = {
      'dynamic-range': 'dynamic-range',
      'depth-of-field': 'depth-of-field',
      'lens-optics': 'lens-optics',
      'metering': 'metering-system',
      'autofocus': 'autofocus',
      'exposure': 'metering-system',
      'sensors': 'dynamic-range',
      'aperture': 'depth-of-field',
      'focal-length': 'depth-of-field',
      'raw-processing': 'dynamic-range',
    };
    
    const tabValue = tabMapping[nodeId];
    if (tabValue) {
      const tabElement = document.querySelector(`[data-state="inactive"][value="${tabValue}"]`);
      if (tabElement) {
        (tabElement as HTMLElement).click();
      }
    }
  };

  return (
    <div className="container mx-auto px-4 pb-16 pt-24">
      <PageHeader
        title="技术进阶"
        description="揭示摄影技术原理与机制的深度解析平台，帮助您从会用升级到懂原理。"
      />
      
      {/* 顶部学习工具 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          <TechNavigation 
            activeNodeId={activeNode} 
            onNodeClick={handleNodeClick} 
          />
        </div>
        <div>
          <DepthIndicator 
            initialDepth={depthLevel} 
            onChange={handleDepthChange} 
          />
        </div>
      </div>
      
      {/* Tabs组件包装所有子模块 */}
      <Tabs defaultValue="dynamic-range" className="w-full">
        <div className="sticky top-20 bg-background/95 backdrop-blur-sm pt-2 pb-4 z-20">
          <TabsList className="grid grid-cols-5 max-w-4xl mx-auto">
            <TabsTrigger value="dynamic-range" className="py-3">
              <span className="flex flex-col items-center gap-1">
                <span className="text-lg">📊</span>
                <span className="text-sm">动态范围分析</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="depth-of-field" className="py-3">
              <span className="flex flex-col items-center gap-1">
                <span className="text-lg">🔍</span>
                <span className="text-sm">景深物理模型</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="lens-optics" className="py-3">
              <span className="flex flex-col items-center gap-1">
                <span className="text-lg">🔎</span>
                <span className="text-sm">镜头光学分析</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="metering-system" className="py-3">
              <span className="flex flex-col items-center gap-1">
                <span className="text-lg">📝</span>
                <span className="text-sm">测光系统解析</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="autofocus" className="py-3">
              <span className="flex flex-col items-center gap-1">
                <span className="text-lg">🎯</span>
                <span className="text-sm">自动对焦剖析</span>
              </span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="dynamic-range" className="mt-6">
          <div className="space-y-8">
            <DynamicRangeVisualizer 
              initialSceneId="high-contrast"
              showHistogram={true}
            />
            
            {/* 补充内容区 - 根据深度级别显示不同内容 */}
            {depthLevel >= 3 && (
              <Card>
                <CardHeader>
                  <Badge className="w-fit mb-2" variant="outline">高级内容</Badge>
                  <CardTitle>传感器技术深度解析</CardTitle>
                  <CardDescription>深入了解传感器量子效率、ADC位深与动态范围的关系</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      动态范围的硬件基础是传感器的模数转换器(ADC)位深。14位ADC理论上可以区分2^14=16,384个亮度级别，约为14.3 EV的动态范围。然而，实际动态范围受到传感器读出噪声、量子效率、暗电流等因素的限制。传感器设计中采用了微透镜阵列、背照式设计等技术提升收光效率和降低噪声水平。
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="depth-of-field" className="mt-6">
          <div className="space-y-8">
            <DepthOfFieldPhysics 
              initialSettings={{
                focalLength: 50,
                aperture: "f/2.8",
                focusDistance: 3,
                sensorFormat: "full-frame"
              }}
              show3DView={true}
              showCalculations={true}
              bokehSimulation={true}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="lens-optics" className="mt-6">
          <div className="space-y-8">
            <LensOpticsAnalyzer 
              opticalIssues={["chromatic", "distortion", "vignetting", "flare"]}
              showMtfCurves={true}
              apertureSeries={[1.4, 2.8, 5.6, 11, 22]}
              interactiveComparison={true}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="metering-system" className="mt-6">
          <div className="space-y-8">
            <MeteringSystemExplorer 
              meteringModes={["evaluative", "center-weighted", "spot", "partial"]}
              challengingScenes={["backlit", "snow", "spotlight", "high-contrast"]}
              histogramAnalysis={true}
              exposureSimulation={true}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="autofocus" className="mt-6">
          <div className="space-y-8">
            {/* 临时使用旧的自动对焦组件，直到新组件开发完成 */}
            <AutofocusTechnology 
              showComparison={true}
              showModeSelector={true}
              showPointVisualizer={true}
              initialTab="technology"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

 