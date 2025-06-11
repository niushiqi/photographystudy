"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/PageHeader";
import { RawAdjustmentSimulator } from "@/components/techniques/content/postprocessing/RawAdjustmentSimulator";
import { LocalAdjustmentTool } from "@/components/techniques/content/postprocessing/LocalAdjustmentTool";
import { BeforeAfterSlider } from "@/components/techniques/content/postprocessing/BeforeAfterSlider";

// 变体动画
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

// 示例图片路径
const beforeImage = "/images/postprocessing/raw-samples/before.jpg";
const afterImage = "/images/postprocessing/raw-samples/after.jpg";

// 简单的占位组件
const ColorProcessingModule = () => (
  <div className="space-y-6">
    <div className="p-6 border border-border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">色彩处理与调色</h2>
      <p className="mb-4">探索色彩理论与应用，学习创建引人注目的色彩风格和协调的色调。</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">色彩校准</h3>
          <p className="text-sm text-muted-foreground">学习白平衡调整和色彩校准技术，确保照片色彩的准确性。</p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">HSL调整</h3>
          <p className="text-sm text-muted-foreground">掌握色相、饱和度和明度调整，精确控制照片中每种颜色。</p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">分离色调</h3>
          <p className="text-sm text-muted-foreground">学习如何为高光和阴影分别添加色调，创造独特的色彩氛围。</p>
        </div>
      </div>
    </div>
    
    <BeforeAfterSlider
      beforeImage={beforeImage}
      afterImage={afterImage}
      beforeLabel="原始色彩"
      afterLabel="色彩处理后"
    />
  </div>
);

const RetouchingModule = () => (
  <div className="space-y-6">
    <div className="p-6 border border-border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">修饰与合成</h2>
      <p className="mb-4">学习高级人像修饰和图像合成技术，创造专业级别的照片效果。</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">皮肤修饰</h3>
          <p className="text-sm text-muted-foreground">学习高频分离和频率分离技术，实现自然的皮肤修饰效果。</p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">形体调整</h3>
          <p className="text-sm text-muted-foreground">掌握变形工具和液化工具的使用方法，进行细微的形体塑造。</p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">图像合成</h3>
          <p className="text-sm text-muted-foreground">学习蒙版、选区和图层混合模式，创造复杂的合成图像。</p>
        </div>
      </div>
    </div>
    
    <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-center">
      <p className="text-sm text-muted-foreground">修饰与合成示例图片</p>
    </div>
  </div>
);

const SharpeningNoiseModule = () => (
  <div className="space-y-6">
    <div className="p-6 border border-border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">锐化与降噪</h2>
      <p className="mb-4">掌握提升照片清晰度的技术，减少噪点同时保留细节的专业方法。</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">智能锐化技术</h3>
          <p className="text-sm text-muted-foreground">学习边缘感知锐化和高通滤波等技术，增强细节而不引入伪影。</p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">选择性降噪</h3>
          <p className="text-sm text-muted-foreground">掌握分离通道降噪和细节保留降噪技术，消除噪点同时保留重要细节。</p>
        </div>
      </div>
    </div>
    
    <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-center">
      <p className="text-sm text-muted-foreground">锐化与降噪示例图片</p>
    </div>
  </div>
);

export default function PostProcessingPage() {
  const [selectedTab, setSelectedTab] = useState("raw-processing");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <PageHeader
          title="后期处理"
          description="掌握专业的后期处理技巧，从RAW文件处理到高级修饰技术，提升照片品质与艺术表现力。"
        />

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
                <div className="space-y-6">
                  <div className="p-6 border border-border rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">RAW处理基础</h2>
                    <p className="mb-4">学习如何从RAW文件中提取最佳质量，掌握曝光调整、白平衡校正和基本色调控制。</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="font-medium mb-2">RAW基础知识</h3>
                        <p className="text-sm text-muted-foreground">了解RAW格式的优势，以及相比JPEG的更大编辑空间。</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="font-medium mb-2">基础调整工作流</h3>
                        <p className="text-sm text-muted-foreground">掌握从曝光、白平衡到色调的基本工作流程。</p>
                      </div>
                    </div>
                  </div>
                  
                  <BeforeAfterSlider
                    beforeImage={beforeImage}
                    afterImage={afterImage}
                    beforeLabel="RAW原始文件"
                    afterLabel="基础调整后"
                  />
                  
                  <RawAdjustmentSimulator />
                </div>
              </TabsContent>

              {/* 局部调整技术 */}
              <TabsContent value="local-adjustment" className="mt-6">
                <div className="space-y-6">
                  <div className="p-6 border border-border rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">局部调整技术</h2>
                    <p className="mb-4">掌握选区、遮罩和局部修饰等技术，提升照片的视觉重点和细节表现。</p>
                  </div>
                  
                  <LocalAdjustmentTool />
                </div>
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
    </div>
  );
} 