"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";

// 后期处理模块的组件
export default function PostProcessingPage() {
  // 设置子模块的状态管理
  const [selectedTab, setSelectedTab] = useState("raw-processing");

  // 页面进入动画
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* 页面标题 */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="gradient-text animated-gradient mb-4">后期处理</h1>
        <p className="postprocessing-text max-w-3xl mx-auto text-lg">
          从数据到艺术：掌握专业后期工作流程，将原始素材转化为精美作品
        </p>
      </motion.div>

      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-700/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* 主要内容区 */}
      <div className="grid grid-cols-1 gap-8">
        {/* 子模块选择导航 */}
        <Tabs
          defaultValue="raw-processing"
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="mb-8 w-full flex flex-wrap justify-center gap-2 bg-transparent">
            <TabsTrigger 
              value="raw-processing" 
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white px-6 py-2 rounded-full border border-purple-400"
            >
              RAW处理基础
            </TabsTrigger>
            <TabsTrigger 
              value="local-adjustment" 
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white px-6 py-2 rounded-full border border-purple-400"
            >
              局部调整技术
            </TabsTrigger>
            <TabsTrigger 
              value="color-processing" 
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white px-6 py-2 rounded-full border border-purple-400"
            >
              色彩处理
            </TabsTrigger>
            <TabsTrigger 
              value="retouching" 
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white px-6 py-2 rounded-full border border-purple-400"
            >
              修饰与合成
            </TabsTrigger>
            <TabsTrigger 
              value="sharpening-noise" 
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white px-6 py-2 rounded-full border border-purple-400"
            >
              锐化与降噪
            </TabsTrigger>
          </TabsList>

          {/* 各子模块内容 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* RAW处理基础 */}
            <TabsContent value="raw-processing" className="mt-6">
              <RawProcessingModule />
            </TabsContent>

            {/* 局部调整技术 */}
            <TabsContent value="local-adjustment" className="mt-6">
              <LocalAdjustmentModule />
            </TabsContent>

            {/* 色彩处理 */}
            <TabsContent value="color-processing" className="mt-6">
              <ColorProcessingModule />
            </TabsContent>

            {/* 修饰与合成 */}
            <TabsContent value="retouching" className="mt-6">
              <RetouchingModule />
            </TabsContent>

            {/* 锐化与降噪 */}
            <TabsContent value="sharpening-noise" className="mt-6">
              <SharpeningNoiseModule />
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
}

// RAW处理基础模块
function RawProcessingModule() {
  const [exposureValue, setExposureValue] = useState([0]);
  const [highlightsValue, setHighlightsValue] = useState([0]);
  const [shadowsValue, setShadowsValue] = useState([0]);

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="postprocessing-title text-center">RAW处理互动实验室</h2>
        <p className="postprocessing-text mb-8 text-center">
          学习RAW格式的优势和处理技术，掌握从原始数据中提取最佳画质的方法
        </p>
      </div>

      {/* RAW处理概念卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConceptCard
          title="什么是RAW格式"
          description="RAW是相机传感器直接记录的原始数据，未经任何处理，保留了最大的编辑空间"
          icon={<DocumentIcon className="w-10 h-10 text-purple-400" />}
        />
        <ConceptCard
          title="RAW vs JPEG"
          description="相比JPEG，RAW文件提供更大的动态范围、更丰富的色彩信息和更灵活的编辑空间"
          icon={<CompareIcon className="w-10 h-10 text-purple-400" />}
        />
        <ConceptCard
          title="非破坏性编辑"
          description="RAW处理采用非破坏性工作流，所有编辑都可撤销，原始数据永久保留"
          icon={<LayersIcon className="w-10 h-10 text-purple-400" />}
        />
      </div>

      {/* RAW处理交互组件 */}
      <Card className="border border-purple-600/50 bg-white/30 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">RAW参数调整模拟器</CardTitle>
          <CardDescription className="text-lg">调整滑块体验RAW处理的灵活性和强大功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 模拟RAW编辑界面 */}
            <div className="flex flex-col space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-base font-medium">曝光度</span>
                  <span>{exposureValue[0].toFixed(1)}</span>
                </div>
                <Slider
                  value={exposureValue}
                  min={-2}
                  max={2}
                  step={0.1}
                  onValueChange={setExposureValue}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-base font-medium">高光</span>
                  <span>{highlightsValue[0]}</span>
                </div>
                <Slider
                  value={highlightsValue}
                  min={-100}
                  max={100}
                  onValueChange={setHighlightsValue}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-base font-medium">阴影</span>
                  <span>{shadowsValue[0]}</span>
                </div>
                <Slider
                  value={shadowsValue}
                  min={-100}
                  max={100}
                  onValueChange={setShadowsValue}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-base font-medium">白平衡</span>
                  <span>自动</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["自动", "日光", "阴天", "钨丝灯"].map((preset) => (
                    <button
                      key={preset}
                      className="px-3 py-1.5 text-sm rounded-md bg-purple-600/70 hover:bg-purple-500/80 text-white font-medium transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 预览效果图 */}
            <div className="relative min-h-[300px] bg-purple-200/40 dark:bg-black/40 rounded-lg overflow-hidden flex items-center justify-center border border-purple-400/30">
              <div className="text-center">
                <p className="text-lg font-medium">图片预览区</p>
                <p className="text-base text-purple-900/80 dark:text-white/80">原始RAW文件模拟</p>
              </div>
              {/* 这里将来可以放置真实的图片处理效果 */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RAW处理工作流步骤 */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-center">RAW处理标准工作流</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <WorkflowStepCard
            stepNumber={1}
            title="导入与筛选"
            description="将RAW文件导入软件，进行初步筛选和评分，选择需要处理的照片"
          />
          <WorkflowStepCard
            stepNumber={2}
            title="基础调整"
            description="调整曝光、白平衡、对比度等基本参数，建立整体画面基调"
          />
          <WorkflowStepCard
            stepNumber={3}
            title="局部处理"
            description="使用渐变、径向滤镜和画笔工具进行局部区域的精细调整"
          />
          <WorkflowStepCard
            stepNumber={4}
            title="输出与共享"
            description="根据用途选择合适的格式和参数导出，优化用于打印或屏幕显示"
          />
        </div>
      </div>

      {/* 技术提示卡片 */}
      <div className="mt-12 bg-purple-100/80 dark:bg-purple-900/30 border border-purple-300/80 dark:border-purple-700/30 rounded-xl p-6">
        <h4 className="flex items-center text-xl font-bold mb-4 text-purple-900 dark:text-white">
          <TipIcon className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
          专业技巧
        </h4>
        <ul className="space-y-3 text-purple-900 dark:text-muted-foreground">
          <li className="flex items-start">
            <CheckIcon className="w-5 h-5 mr-2 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <span>始终以16位色深处理RAW文件，保留最大色彩信息量</span>
          </li>
          <li className="flex items-start">
            <CheckIcon className="w-5 h-5 mr-2 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <span>先调整全局参数，再进行局部微调，形成有序的工作流程</span>
          </li>
          <li className="flex items-start">
            <CheckIcon className="w-5 h-5 mr-2 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <span>使用虚拟拷贝尝试不同处理风格，对比选择最佳效果</span>
          </li>
          <li className="flex items-start">
            <CheckIcon className="w-5 h-5 mr-2 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <span>定期校准显示器，确保色彩准确性和一致性</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}

// 局部调整技术模块
function LocalAdjustmentModule() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">局部调整工作台</h2>
        <p className="text-muted-foreground mb-8 text-center">
          学习精准的局部调整技术，掌握选区创建和蒙版技术，实现精细的画面控制
        </p>
      </div>

      {/* 局部调整技术卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TechniqueCard
          title="渐变滤镜技术"
          description="模拟传统摄影中的渐变滤镜，对天空、地面等区域进行过渡性调整"
          image="/images/techniques/gradient-filter.jpg"
        />
        <TechniqueCard
          title="径向滤镜应用"
          description="创建圆形或椭圆形的选区，对主体进行突出或柔化处理"
          image="/images/techniques/radial-filter.jpg"
        />
        <TechniqueCard
          title="选择性蒙版"
          description="基于色彩、亮度或深度信息创建精确的选区，实现复杂的局部调整"
          image="/images/techniques/selective-mask.jpg"
        />
      </div>

      {/* 更多局部调整技术内容可以在这里添加 */}
      <Card className="border-purple-800/30 bg-purple-900/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>局部调整工具展示</CardTitle>
          <CardDescription>不同的局部调整工具及其效果展示</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">局部调整内容将在这里展示...</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// 色彩处理模块
function ColorProcessingModule() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">色彩处理实验室</h2>
        <p className="text-muted-foreground mb-8 text-center">
          探索色彩理论与应用，掌握色调分离和色彩分级技术，创造独特的视觉风格
        </p>
      </div>

      {/* 色彩理论卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="border-purple-800/30 bg-purple-900/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 mr-2"></div>
              RGB色彩模型
            </CardTitle>
            <CardDescription>加色模型，用于屏幕显示</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              RGB模型基于光的三原色（红、绿、蓝）加法混合原理，是显示器和数码摄影的基础色彩系统。
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="p-2 bg-red-600/80 rounded text-center text-xs text-white">红 (R)</div>
              <div className="p-2 bg-green-600/80 rounded text-center text-xs text-white">绿 (G)</div>
              <div className="p-2 bg-blue-600/80 rounded text-center text-xs text-white">蓝 (B)</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-800/30 bg-purple-900/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-gray-300 to-yellow-500 mr-2"></div>
              HSL色彩模型
            </CardTitle>
            <CardDescription>更符合人类感知的模型</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              HSL分离了色相(Hue)、饱和度(Saturation)和亮度(Lightness)，更直观地控制色彩，是后期处理的核心模型。
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="p-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded text-center text-xs text-white">色相 (H)</div>
              <div className="p-2 bg-gradient-to-r from-gray-500 to-purple-500 rounded text-center text-xs text-white">饱和度 (S)</div>
              <div className="p-2 bg-gradient-to-r from-black via-gray-500 to-white rounded text-center text-xs text-white">亮度 (L)</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-800/30 bg-purple-900/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 via-gray-300 to-yellow-500 mr-2"></div>
              色彩理论基础
            </CardTitle>
            <CardDescription>和谐与对比的科学</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              理解色彩理论中的互补色、三角色彩、分裂互补等原理，能够创建和谐且具视觉冲击力的照片色彩方案。
            </p>
            <div className="relative h-24 w-full rounded-lg overflow-hidden mt-4">
              <div className="absolute inset-0 flex">
                <div className="w-1/6 h-full bg-red-500"></div>
                <div className="w-1/6 h-full bg-orange-500"></div>
                <div className="w-1/6 h-full bg-yellow-500"></div>
                <div className="w-1/6 h-full bg-green-500"></div>
                <div className="w-1/6 h-full bg-blue-500"></div>
                <div className="w-1/6 h-full bg-purple-500"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 色彩调整工具展示 */}
      <Card className="border-purple-800/30 bg-purple-900/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>HSL色彩调整</CardTitle>
          <CardDescription>针对特定色彩范围进行精确调整</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground mb-2">
                HSL色彩调整允许您针对特定色相范围（如蓝色或绿色）独立调整其色相、饱和度和亮度，实现精确的色彩控制。
              </p>
              
              {/* 模拟HSL控制界面 */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>蓝色 - 色相</span>
                    <span>+10</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"></div>
                  <input type="range" className="w-full" disabled />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>蓝色 - 饱和度</span>
                    <span>+15</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-blue-300 to-blue-600 rounded-full"></div>
                  <input type="range" className="w-full" disabled />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>蓝色 - 明度</span>
                    <span>-5</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-gray-900 via-blue-500 to-white rounded-full"></div>
                  <input type="range" className="w-full" disabled />
                </div>
              </div>
              
              <div className="bg-purple-900/30 border border-purple-700/30 rounded-xl p-4 mt-6">
                <h4 className="flex items-center text-sm font-bold mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  HSL调整技巧
                </h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• 通过增加蓝色饱和度和降低明度来加强天空</li>
                  <li>• 调整绿色色相使植物更加鲜艳自然</li>
                  <li>• 降低黄色/橙色饱和度来改善肤色</li>
                  <li>• 增加水中的青色来增强湖泊和海洋</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="relative aspect-video bg-black/20 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  HSL调整示例图片
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-purple-800/30 bg-purple-900/10 rounded-lg p-3">
                  <h5 className="text-sm font-medium mb-2">色相定向调整</h5>
                  <p className="text-xs text-muted-foreground">
                    有针对性地调整特定色相，如使蓝天更青色或绿叶更黄绿。
                  </p>
                </div>
                
                <div className="border border-purple-800/30 bg-purple-900/10 rounded-lg p-3">
                  <h5 className="text-sm font-medium mb-2">色彩替换</h5>
                  <p className="text-xs text-muted-foreground">
                    通过大幅改变特定色相，可以实现场景中特定颜色的完全替换。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分离色调与双色调 */}
      <Card className="border-purple-800/30 bg-purple-900/20 backdrop-blur-sm mt-8">
        <CardHeader>
          <CardTitle>分离色调与色彩分级</CardTitle>
          <CardDescription>创造情绪和艺术效果的色彩技术</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">分离色调</h3>
              <p className="text-sm text-muted-foreground">
                分离色调技术允许为图像的高光和阴影分别应用不同的色彩，创造独特的情绪和风格。这是电影级色彩的重要手法。
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>高光色调</span>
                    <span className="text-yellow-300">黄色</span>
                  </div>
                  <div className="h-6 bg-gradient-to-r from-white to-yellow-300 rounded"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>阴影色调</span>
                    <span className="text-blue-400">蓝色</span>
                  </div>
                  <div className="h-6 bg-gradient-to-r from-black to-blue-900 rounded"></div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium mb-2">常见色彩搭配</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="border border-purple-800/30 rounded-lg p-2 text-center">
                    <div className="flex h-4 mb-1 rounded overflow-hidden">
                      <div className="w-1/2 bg-yellow-300"></div>
                      <div className="w-1/2 bg-blue-600"></div>
                    </div>
                    <span className="text-xs">橙蓝对比</span>
                  </div>
                  <div className="border border-purple-800/30 rounded-lg p-2 text-center">
                    <div className="flex h-4 mb-1 rounded overflow-hidden">
                      <div className="w-1/2 bg-teal-300"></div>
                      <div className="w-1/2 bg-red-600"></div>
                    </div>
                    <span className="text-xs">青红对比</span>
                  </div>
                  <div className="border border-purple-800/30 rounded-lg p-2 text-center">
                    <div className="flex h-4 mb-1 rounded overflow-hidden">
                      <div className="w-1/2 bg-purple-300"></div>
                      <div className="w-1/2 bg-green-600"></div>
                    </div>
                    <span className="text-xs">紫绿对比</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">色彩分级</h3>
              <p className="text-sm text-muted-foreground">
                色彩分级是电影和专业摄影的标准流程，通过精确控制色彩平衡、饱和度和对比度来创建统一且有特色的视觉风格。
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="relative aspect-video bg-black/20 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 to-blue-600/30"></div>
                  <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-0.5 rounded">原始图像</div>
                </div>
                <div className="relative aspect-video bg-black/20 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/40 to-blue-800/50"></div>
                  <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-0.5 rounded">分级后</div>
                </div>
              </div>
              
              <div className="bg-purple-900/30 border border-purple-700/30 rounded-xl p-4 mt-4">
                <h4 className="text-sm font-bold mb-2">常见色彩风格</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="h-10 bg-gradient-to-r from-orange-200 to-blue-900 rounded mb-1"></div>
                    <span className="text-xs">好莱坞橙蓝</span>
                  </div>
                  <div className="text-center">
                    <div className="h-10 bg-gradient-to-r from-green-300 to-green-900 rounded mb-1"></div>
                    <span className="text-xs">科幻绿</span>
                  </div>
                  <div className="text-center">
                    <div className="h-10 bg-gradient-to-r from-yellow-100 to-orange-900 rounded mb-1"></div>
                    <span className="text-xs">复古暖色</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 专业提示 */}
      <div className="bg-purple-900/30 border border-purple-700/30 rounded-xl p-6 mt-6">
        <h3 className="flex items-center text-xl font-bold mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-yellow-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          色彩处理进阶技巧
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium">色彩心理学应用</h4>
            <p className="text-sm text-muted-foreground">
              不同色彩能唤起不同情绪 - 蓝色传递平静，红色唤起激情，绿色体现自然。在后期处理中，有意识地增强或转变这些颜色可以强化照片的情感冲击力。
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">色彩协调理论</h4>
            <p className="text-sm text-muted-foreground">
              遵循色彩协调理论，如三元色、互补色或类似色方案。了解色轮基础，选择和谐的色彩组合，创造视觉吸引力强的照片。
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 修饰与合成模块
function RetouchingModule() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">修饰与合成工作室</h2>
        <p className="text-muted-foreground mb-8 text-center">
          掌握专业修饰工具和图像合成技术，创造完美无瑕的摄影作品
        </p>
      </div>

      {/* 修饰工具介绍 */}
      <Card className="border-purple-800/30 bg-purple-900/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>常用修饰工具</CardTitle>
          <CardDescription>精确控制细节与瑕疵修复</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">修复工具</h4>
                    <p className="text-sm text-muted-foreground">污点去除与无缝修复</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  修复工具（如内容感知填充、修复画笔和污点修复工具）能够智能地去除不需要的元素，并以周围内容无缝填充，适用于去除皮肤瑕疵、尘点和其他干扰元素。
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="border border-purple-700/20 rounded p-2">
                    <h5 className="text-xs font-medium mb-1">仿制图章工具</h5>
                    <p className="text-xs text-muted-foreground">从其他区域复制像素进行修复</p>
                  </div>
                  <div className="border border-purple-700/20 rounded p-2">
                    <h5 className="text-xs font-medium mb-1">内容感知填充</h5>
                    <p className="text-xs text-muted-foreground">自动分析周围内容进行修复</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">液化与变形工具</h4>
                    <p className="text-sm text-muted-foreground">形状与轮廓调整</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  液化和变形工具可以精细调整人物或物体的形状、轮廓和比例，通过推、拉、扭曲等方式对像素进行变形，而不破坏图像质量。
                </p>
                <div className="mt-2 p-2 bg-purple-800/20 rounded-lg text-xs">
                  <p className="font-medium text-yellow-300 mb-1">专业提示:</p>
                  <p className="text-muted-foreground">使用液化工具时，始终在单独的图层上操作，并保持克制和自然，避免过度修饰导致不自然的效果。</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">选区与蒙版</h4>
                    <p className="text-sm text-muted-foreground">精确控制编辑区域</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  高级选区和蒙版技术允许精确选择和隔离图像的特定部分进行编辑，包括色彩范围选择、图层蒙版和通道选择等，实现精细的局部修饰。
                </p>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="relative aspect-video bg-black/30 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-white/70">选区与蒙版示例</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">频率分离</h4>
                    <p className="text-sm text-muted-foreground">高低频细节分别处理</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  频率分离是高级修饰技术，将图像分解为高频细节（如皮肤纹理、毛发）和低频信息（如色调、阴影），允许分别处理，保留细节的同时平滑肤色。
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="border border-purple-700/20 rounded p-2">
                    <h5 className="text-xs font-medium mb-1">高频层</h5>
                    <p className="text-xs text-muted-foreground">保留细节和纹理</p>
                  </div>
                  <div className="border border-purple-700/20 rounded p-2">
                    <h5 className="text-xs font-medium mb-1">低频层</h5>
                    <p className="text-xs text-muted-foreground">色调和过渡平滑处理</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 图像合成技术 */}
      <Card className="border-purple-800/30 bg-purple-900/20 backdrop-blur-sm mt-8">
        <CardHeader>
          <CardTitle>图像合成技术</CardTitle>
          <CardDescription>创造性地组合多个图像元素</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">合成基础工作流</h3>
              <div className="space-y-4">
                <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center mr-2">
                      <span className="text-xs text-white">1</span>
                    </div>
                    <h4 className="font-medium">素材收集与选择</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">收集高质量素材，考虑分辨率、光照条件和拍摄角度的一致性</p>
                </div>
                
                <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center mr-2">
                      <span className="text-xs text-white">2</span>
                    </div>
                    <h4 className="font-medium">精确选区与抠图</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">使用钢笔工具、选区工具和蒙版技术创建精确边缘</p>
                </div>
                
                <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center mr-2">
                      <span className="text-xs text-white">3</span>
                    </div>
                    <h4 className="font-medium">色彩与光影匹配</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">调整各元素的色调、饱和度和亮度，确保光照方向和强度一致</p>
                </div>
                
                <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center mr-2">
                      <span className="text-xs text-white">4</span>
                    </div>
                    <h4 className="font-medium">细节调整与融合</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">添加阴影、高光和纹理，应用适当的模糊和噪点使边缘自然融合</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">合成技巧与应用</h3>
              
              <div className="relative aspect-video bg-black/30 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-white/70">合成示例作品</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-3">
                  <h4 className="text-sm font-medium mb-2">创意拼贴</h4>
                  <p className="text-xs text-muted-foreground">
                    结合多个图像元素创造概念性和超现实艺术作品，表达独特创意和视觉故事。
                  </p>
                </div>
                
                <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-3">
                  <h4 className="text-sm font-medium mb-2">背景替换</h4>
                  <p className="text-xs text-muted-foreground">
                    为人像或产品摄影更换或增强背景，创造更具吸引力的视觉环境。
                  </p>
                </div>
                
                <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-3">
                  <h4 className="text-sm font-medium mb-2">天空替换</h4>
                  <p className="text-xs text-muted-foreground">
                    替换平淡的天空为更具戏剧性的天空，增强风景摄影的视觉冲击力。
                  </p>
                </div>
                
                <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-3">
                  <h4 className="text-sm font-medium mb-2">曝光合成</h4>
                  <p className="text-xs text-muted-foreground">
                    结合多张不同曝光的照片，创建高动态范围图像，展示更丰富的细节和色彩。
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 合成注意事项 */}
          <div className="mt-8 p-4 bg-purple-800/20 rounded-lg">
            <h3 className="flex items-center text-lg font-bold mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              合成注意事项
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <h4 className="font-medium">保持逻辑一致性</h4>
                <p className="text-muted-foreground text-xs">
                  确保合成元素在透视、比例和物理规则上保持一致，避免违反视觉逻辑。
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">关注边缘细节</h4>
                <p className="text-muted-foreground text-xs">
                  精细处理元素边缘，避免硬边缘、颜色溢出或不自然的边缘光晕。
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">保存工作过程</h4>
                <p className="text-muted-foreground text-xs">
                  使用图层和智能对象，保存合成过程中的每个步骤，以便后续调整。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// 锐化与降噪模块
function SharpeningNoiseModule() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">锐化与降噪实验室</h2>
        <p className="text-muted-foreground mb-8 text-center">
          掌握细节增强和降噪技术，平衡细节与噪点，优化输出质量
        </p>
      </div>

      {/* 锐化技术卡片 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-purple-800/30 bg-purple-900/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>锐化技术</CardTitle>
            <CardDescription>增强边缘和细节</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              锐化是增强图像边缘和细节的过程，能使照片更加清晰和富有层次感。不同的锐化算法适用于不同的场景和目标。
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-4">
                <h4 className="text-md font-medium mb-2">锐化方法</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">1</span>
                    <div>
                      <span className="font-medium">USM锐化</span>
                      <p className="text-xs text-muted-foreground mt-0.5">非锐化蒙版，通过对模糊版本与原图对比增强边缘</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">2</span>
                    <div>
                      <span className="font-medium">高通滤波锐化</span>
                      <p className="text-xs text-muted-foreground mt-0.5">强调高频信息（边缘和细节）</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">3</span>
                    <div>
                      <span className="font-medium">细节锐化</span>
                      <p className="text-xs text-muted-foreground mt-0.5">增强中频细节而不过度锐化边缘</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-4">
                <h4 className="text-md font-medium mb-2">锐化参数</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>数量</span>
                      <span>控制锐化强度</span>
                    </div>
                    <div className="h-1.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>半径</span>
                      <span>影响区域大小</span>
                    </div>
                    <div className="h-1.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>阈值</span>
                      <span>细节检测灵敏度</span>
                    </div>
                    <div className="h-1.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 锐化技巧 */}
            <div className="p-4 bg-purple-800/30 rounded-lg text-sm">
              <p className="font-medium text-yellow-300 mb-2">锐化技巧:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 先放大至100%视图进行锐化调整，确保能看到真实效果</li>
                <li>• 对不同内容类型使用不同设置：人像较柔和，风景和建筑较强烈</li>
                <li>• 锐化应作为后期工作流的最后步骤之一</li>
                <li>• 使用蒙版或选区限制锐化效果在需要的区域</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-800/30 bg-purple-900/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>降噪技术</CardTitle>
            <CardDescription>减少噪点保留细节</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              降噪可减少图像中不需要的噪点，特别是在高ISO或弱光条件下拍摄的照片。现代降噪算法能够智能地区分噪点和真实细节。
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-4">
                <h4 className="text-md font-medium mb-2">降噪类型</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">1</span>
                    <div>
                      <span className="font-medium">亮度降噪</span>
                      <p className="text-xs text-muted-foreground mt-0.5">处理图像亮度通道中的噪点</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">2</span>
                    <div>
                      <span className="font-medium">色彩降噪</span>
                      <p className="text-xs text-muted-foreground mt-0.5">处理色彩通道中的噪点，通常更明显</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">3</span>
                    <div>
                      <span className="font-medium">AI降噪</span>
                      <p className="text-xs text-muted-foreground mt-0.5">使用机器学习区分噪点和图像细节</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-4">
                <h4 className="text-md font-medium mb-2">降噪参数</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>强度</span>
                      <span>降噪程度</span>
                    </div>
                    <div className="h-1.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>保留细节</span>
                      <span>细节保护水平</span>
                    </div>
                    <div className="h-1.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>平滑度</span>
                      <span>表面平滑程度</span>
                    </div>
                    <div className="h-1.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 降噪技巧 */}
            <div className="p-4 bg-purple-800/30 rounded-lg text-sm">
              <p className="font-medium text-yellow-300 mb-2">降噪技巧:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 先处理色彩噪点，再处理亮度噪点</li>
                <li>• 将降噪应用于单独的图层以便更好控制效果</li>
                <li>• 皮肤等平滑区域可应用更强的降噪，而纹理区域则需保守处理</li>
                <li>• 有时保留少量噪点比过度降噪导致的"塑料感"更自然</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 细节控制与平衡 */}
      <Card className="border-purple-800/30 bg-purple-900/20 backdrop-blur-sm mt-8">
        <CardHeader>
          <CardTitle>细节控制与平衡</CardTitle>
          <CardDescription>锐化与降噪的平衡是后期处理的艺术</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 效果对比 */}
            <div className="md:col-span-2 grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="aspect-square bg-black/40 rounded-lg overflow-hidden flex items-center justify-center">
                  <span className="text-xs text-white/70">原始图像</span>
                </div>
                <p className="text-center text-xs">未处理</p>
              </div>
              <div className="space-y-2">
                <div className="aspect-square bg-black/40 rounded-lg overflow-hidden flex items-center justify-center">
                  <span className="text-xs text-white/70">适度处理</span>
                </div>
                <p className="text-center text-xs">平衡处理</p>
              </div>
              <div className="space-y-2">
                <div className="aspect-square bg-black/40 rounded-lg overflow-hidden flex items-center justify-center">
                  <span className="text-xs text-white/70">过度处理</span>
                </div>
                <p className="text-center text-xs">过度锐化/降噪</p>
              </div>
            </div>
            
            {/* 处理建议 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">最佳实践</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm">针对不同输出目的采用不同参数：打印需要更强的锐化，屏幕显示则更温和</p>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm">先降噪，再锐化，这样可以避免锐化放大噪点</p>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm">使用蒙版限制锐化仅应用于需要的区域，如眼睛和头发</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 工作流程图 */}
          <div className="mt-8 p-4 bg-purple-900/30 border border-purple-700/30 rounded-lg">
            <h4 className="text-md font-medium mb-4">理想细节处理工作流</h4>
            <div className="flex flex-wrap justify-between">
              <div className="text-center px-4 pb-4">
                <div className="w-12 h-12 rounded-full bg-purple-800 mx-auto flex items-center justify-center mb-2">
                  <span className="text-white font-bold">1</span>
                </div>
                <p className="text-sm font-medium">全局降噪</p>
                <p className="text-xs text-muted-foreground">去除基本噪点</p>
              </div>
              <div className="flex items-center text-purple-300 px-2">→</div>
              <div className="text-center px-4 pb-4">
                <div className="w-12 h-12 rounded-full bg-purple-800 mx-auto flex items-center justify-center mb-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <p className="text-sm font-medium">局部降噪</p>
                <p className="text-xs text-muted-foreground">平滑区域处理</p>
              </div>
              <div className="flex items-center text-purple-300 px-2">→</div>
              <div className="text-center px-4 pb-4">
                <div className="w-12 h-12 rounded-full bg-purple-800 mx-auto flex items-center justify-center mb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <p className="text-sm font-medium">细节锐化</p>
                <p className="text-xs text-muted-foreground">增强关键细节</p>
              </div>
              <div className="flex items-center text-purple-300 px-2">→</div>
              <div className="text-center px-4 pb-4">
                <div className="w-12 h-12 rounded-full bg-purple-800 mx-auto flex items-center justify-center mb-2">
                  <span className="text-white font-bold">4</span>
                </div>
                <p className="text-sm font-medium">输出锐化</p>
                <p className="text-xs text-muted-foreground">基于输出媒介</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// 概念卡片组件
function ConceptCard({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) {
  return (
    <Card className="border border-purple-600/50 bg-white/30 dark:bg-white/5 backdrop-blur-sm hover:bg-white/40 dark:hover:bg-white/10 transition-colors">
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

// 技术卡片组件
function TechniqueCard({ 
  title, 
  description, 
  image 
}: { 
  title: string; 
  description: string; 
  image: string;
}) {
  return (
    <motion.div
      className="flex flex-col h-full rounded-xl border border-purple-700/30 bg-purple-900/20 backdrop-blur-sm overflow-hidden"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="h-48 relative bg-black/40 flex items-center justify-center">
        {/* 这里可以替换为真实图片 */}
        <div className="text-center text-muted-foreground">
          <p>技术展示图</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

// 工作流步骤卡片组件
function WorkflowStepCard({ 
  stepNumber, 
  title, 
  description 
}: { 
  stepNumber: number; 
  title: string; 
  description: string;
}) {
  return (
    <div className="border border-purple-300/70 dark:border-purple-700/30 bg-purple-100/50 dark:bg-purple-900/10 rounded-xl p-6 relative">
      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center text-white font-bold text-sm">
        {stepNumber}
      </div>
      <h4 className="text-lg font-bold mb-2 mt-2 text-purple-900 dark:text-white">{title}</h4>
      <p className="text-purple-800 dark:text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

// 图标组件
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

function CompareIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  );
}

function TipIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
} 