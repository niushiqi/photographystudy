'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

import FocusComparison from './FocusComparison';
import FocusModeSelector from './FocusModeSelector';
import FocusPointVisualizer from './FocusPointVisualizer';

type AutofocusTechnologyProps = {
  showComparison?: boolean;
  showModeSelector?: boolean;
  showPointVisualizer?: boolean;
  initialTab?: string;
};

const AutofocusTechnology: React.FC<AutofocusTechnologyProps> = ({
  showComparison = true,
  showModeSelector = true,
  showPointVisualizer = true,
  initialTab = "technology"
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-6">
          <TabsTrigger value="technology">技术原理</TabsTrigger>
          <TabsTrigger value="modes">对焦模式</TabsTrigger>
          <TabsTrigger value="performance">性能分析</TabsTrigger>
        </TabsList>
        
        <TabsContent value="technology" className="space-y-6">
          <Card className="bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <Badge className="w-fit mb-2" variant="outline">对焦技术原理</Badge>
              <CardTitle>自动对焦系统工作原理</CardTitle>
              <CardDescription>探索不同自动对焦技术的机制与优缺点</CardDescription>
            </CardHeader>
            <CardContent>
              {showComparison && <FocusComparison />}
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/5 to-purple-500/10 rounded-lg border border-purple-200/20">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">混合对焦系统</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  现代相机普遍采用混合对焦系统，结合相位检测的速度和对比度检测的精确度。技术如双像素CMOS AF使用特殊的分裂光电二极管设计，实现图像传感器上的相位检测，提供全画面覆盖的快速精确对焦。
                </p>
                <motion.div 
                  className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-xs font-semibold mb-2 text-purple-600 dark:text-purple-400">技术演进时间线</h4>
                  <div className="relative pl-6 border-l border-purple-200 dark:border-purple-800 space-y-3">
                    <div>
                      <div className="absolute left-0 w-3 h-3 -translate-x-1.5 rounded-full bg-purple-400"></div>
                      <p className="text-xs font-medium">1985: 首个相位检测AF系统</p>
                      <p className="text-xs text-gray-500">Minolta Maxxum 7000</p>
                    </div>
                    <div>
                      <div className="absolute left-0 w-3 h-3 -translate-x-1.5 rounded-full bg-purple-400"></div>
                      <p className="text-xs font-medium">1994: 多点对焦系统</p>
                      <p className="text-xs text-gray-500">尼康 F3</p>
                    </div>
                    <div>
                      <div className="absolute left-0 w-3 h-3 -translate-x-1.5 rounded-full bg-purple-400"></div>
                      <p className="text-xs font-medium">2008: 实时取景对比度对焦</p>
                      <p className="text-xs text-gray-500">佳能 5D Mark II</p>
                    </div>
                    <div>
                      <div className="absolute left-0 w-3 h-3 -translate-x-1.5 rounded-full bg-purple-400"></div>
                      <p className="text-xs font-medium">2012: 传感器上相位检测</p>
                      <p className="text-xs text-gray-500">佳能双像素CMOS技术</p>
                    </div>
                    <div>
                      <div className="absolute left-0 w-3 h-3 -translate-x-1.5 rounded-full bg-purple-500"></div>
                      <p className="text-xs font-medium">2019+: AI辅助对焦系统</p>
                      <p className="text-xs text-gray-500">主体识别、眼部对焦技术</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="modes" className="space-y-6">
          <Card className="bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <Badge className="w-fit mb-2" variant="outline">对焦模式</Badge>
              <CardTitle>对焦模式选择指南</CardTitle>
              <CardDescription>选择合适的对焦模式提升拍摄效率</CardDescription>
            </CardHeader>
            <CardContent>
              {showModeSelector && <FocusModeSelector />}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <Badge className="w-fit mb-2" variant="outline">实用工具</Badge>
              <CardTitle>对焦系统测试与分析</CardTitle>
              <CardDescription>深入了解对焦系统性能与限制</CardDescription>
            </CardHeader>
            <CardContent>
              {showPointVisualizer && <FocusPointVisualizer />}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutofocusTechnology; 