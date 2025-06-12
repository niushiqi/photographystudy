"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/PageHeader";
import { RawAdjustmentSimulator } from "@/components/techniques/content/postprocessing/RawAdjustmentSimulator";
import { LocalAdjustmentTool } from "@/components/techniques/content/postprocessing/LocalAdjustmentTool";
import { BeforeAfterSlider } from "@/components/techniques/content/postprocessing/BeforeAfterSlider";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// 变体动画
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// 示例图片路径
const beforeImage = "/images/postprocessing/raw-samples/before.jpg";
const afterImage = "/images/postprocessing/raw-samples/after.jpg";

// 色彩处理模块组件
const ColorProcessingModule = () => (
  <div className="space-y-6">
    <div className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-purple-800 dark:text-purple-300">色彩处理与调色</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">探索色彩理论与应用，学习创建引人注目的色彩风格和协调的色调。掌握色彩控制能够极大地增强照片的情感表达和视觉冲击力。</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
          <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">色彩校准</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">学习白平衡调整和色彩校准技术，确保照片色彩的准确性。</p>
          <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">准确的色彩是后期处理的基础</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
          <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">HSL调整</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">掌握色相、饱和度和明度调整，精确控制照片中每种颜色。</p>
          <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">HSL是色彩控制的强大工具</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
          <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">分离色调</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">学习如何为高光和阴影分别添加色调，创造独特的色彩氛围。</p>
          <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">创造电影感和艺术风格的关键</div>
        </div>
      </div>
    </div>
    
    <div className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-300">色彩理论实验室</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="mb-4 text-gray-700 dark:text-gray-300">色彩理论是后期处理的核心，理解色彩关系能帮助创造更具吸引力的照片。以下是几种常见的色彩和谐方式：</p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li className="group">
              <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">互补色</span> - 色轮对面的颜色，如蓝色与橙色
            </li>
            <li className="group">
              <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">三角色</span> - 色轮上均匀分布的三种颜色
            </li>
            <li className="group">
              <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">分裂互补色</span> - 一种主色与其互补色两侧的颜色
            </li>
            <li className="group">
              <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">类似色</span> - 色轮上相邻的颜色，创造和谐统一的感觉
            </li>
          </ul>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 group hover:shadow-md transition-shadow">
          <div className="aspect-video relative rounded-md overflow-hidden">
            <Image 
              src="/images/postprocessing/color-theory-wheel.jpg" 
              alt="色彩理论轮盘"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <p className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">色彩理论轮盘帮助理解颜色关系</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h4 className="font-medium mb-3 text-purple-700 dark:text-purple-300">常见色彩风格与应用</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="h-20 rounded-md bg-gradient-to-r from-blue-500 to-cyan-400 shadow-sm"></div>
            <p className="mt-2 text-sm font-medium">冷色调</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">冬季、科技、平静</p>
          </div>
          <div className="text-center">
            <div className="h-20 rounded-md bg-gradient-to-r from-amber-500 to-red-400 shadow-sm"></div>
            <p className="mt-2 text-sm font-medium">暖色调</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">夕阳、秋季、温馨</p>
          </div>
          <div className="text-center">
            <div className="h-20 rounded-md bg-gradient-to-r from-teal-500 to-emerald-400 shadow-sm"></div>
            <p className="mt-2 text-sm font-medium">自然色调</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">风景、植物、生机</p>
          </div>
          <div className="text-center">
            <div className="h-20 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-sm"></div>
            <p className="mt-2 text-sm font-medium">创意色调</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">时尚、艺术、表达</p>
          </div>
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

// 修饰与合成模块组件
const RetouchingModule = () => (
  <div className="space-y-6">
    <div className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-purple-800 dark:text-purple-300">修饰与合成</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">学习高级人像修饰和图像合成技术，创造专业级别的照片效果。</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
          <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">皮肤修饰</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">学习高频分离和频率分离技术，实现自然的皮肤修饰效果。</p>
          <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">保留质感的同时平滑皮肤</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
          <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">形体调整</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">掌握变形工具和液化工具的使用方法，进行细微的形体塑造。</p>
          <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">谨慎使用，保持自然效果</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
          <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">图像合成</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">学习蒙版、选区和图层混合模式，创造复杂的合成图像。</p>
          <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">光线匹配是合成的关键</div>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="aspect-video relative rounded-lg overflow-hidden border border-purple-300 dark:border-purple-700 group">
        <Image 
          src="/images/postprocessing/retouching-example.jpg" 
          alt="修饰前后对比"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <p className="p-4 text-white text-sm">专业修饰能够保持自然效果同时增强照片质量</p>
        </div>
      </div>
      <div className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-300">修饰工作流程</h3>
        <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          <li className="group">
            <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">基础调整</span> - 曝光、对比度和色彩校正
          </li>
          <li className="group">
            <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">瑕疵修复</span> - 使用修复工具移除不需要的元素
          </li>
          <li className="group">
            <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">皮肤平滑</span> - 使用频率分离保留纹理的同时平滑肤色
          </li>
          <li className="group">
            <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">局部调整</span> - 强调重要区域，淡化分散注意力的元素
          </li>
          <li className="group">
            <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">最终修饰</span> - 添加清晰度、对比度和效果
          </li>
        </ol>
        
        <div className="mt-6 bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">修饰伦理原则</h4>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>保持自然外观，避免过度修饰</li>
            <li>尊重主体特点，增强而非改变</li>
            <li>对商业作品保持透明度</li>
            <li>考虑修饰对观众的影响</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// 锐化与降噪模块组件
const SharpeningNoiseModule = () => (
  <div className="space-y-6">
    <div className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-purple-800 dark:text-purple-300">锐化与降噪</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">掌握提升照片清晰度的技术，减少噪点同时保留细节的专业方法。</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
          <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">智能锐化技术</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">学习边缘感知锐化和高通滤波等技术，增强细节而不引入伪影。</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
          <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">选择性降噪</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">掌握分离通道降噪和细节保留降噪技术，消除噪点同时保留重要细节。</p>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-300">锐化方法比较</h3>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          <li><span className="font-medium text-purple-700 dark:text-purple-400">非锐化蒙版(USM)</span> - 最常用的锐化方法，通过增加边缘对比度提高锐度</li>
          <li><span className="font-medium text-purple-700 dark:text-purple-400">高通滤波锐化</span> - 分离高频细节进行锐化，保留更多细节</li>
          <li><span className="font-medium text-purple-700 dark:text-purple-400">智能锐化</span> - 减少光晕效应的改进锐化方法</li>
          <li><span className="font-medium text-purple-700 dark:text-purple-400">清晰度调整</span> - 中频对比度增强，产生更自然的锐化效果</li>
        </ul>
      </div>
      <div className="aspect-video relative rounded-lg overflow-hidden border border-purple-300 dark:border-purple-700">
        <Image 
          src="/images/postprocessing/sharpening-example.jpg" 
          alt="锐化效果对比"
          fill
          className="object-cover"
        />
      </div>
    </div>
    
    <BeforeAfterSlider
      beforeImage="/images/postprocessing/noise-before.jpg"
      afterImage="/images/postprocessing/noise-after.jpg"
      beforeLabel="降噪前"
      afterLabel="降噪后"
    />
  </div>
);

export default function PostProcessingPage() {
  const [selectedTab, setSelectedTab] = useState("raw-processing");
  const workflowRef = useRef<HTMLDivElement>(null);
  
  // 平滑滚动到工作流程部分
  const scrollToWorkflow = () => {
    workflowRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
      <div className="container mx-auto px-4">
        <PageHeader
          title="后期处理"
          description="掌握专业的后期处理技巧，从RAW文件处理到高级修饰技术，提升照片品质与艺术表现力。"
        />
        
        {/* 顶部快速导航卡片 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-5 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow group"
            onClick={scrollToWorkflow}
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">后期工作流程</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">了解专业摄影师的完整后期处理流程，从导入整理到最终输出。</p>
            <div className="mt-3 text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center">
              查看工作流程
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-5 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">互动实验室</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">通过互动工具亲身体验RAW处理和局部调整的工作原理与效果。</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                onClick={() => setSelectedTab("raw-processing")}
              >
                RAW调整模拟器
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                onClick={() => setSelectedTab("local-adjustment")}
              >
                局部调整工具
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-5 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">后期学习资源</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">探索专业教程、软件指南和预设资源，提升您的后期处理技能。</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30"
              >
                教程库
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30"
              >
                软件指南
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-12">
          {/* 后期工作流导航系统 */}
          <motion.div 
            ref={workflowRef}
            className="mb-10 p-6 border border-purple-300 dark:border-purple-700 rounded-xl bg-white dark:bg-slate-900 shadow-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl font-bold mb-4 text-purple-800 dark:text-purple-300">后期处理工作流程</h2>
            
            {/* 保持原有工作流程内容不变 */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
              <div className="pt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-2 border-2 border-purple-500">
                    <span className="text-purple-800 dark:text-purple-300 font-bold">1</span>
                  </div>
                  <h4 className="font-medium text-purple-700 dark:text-purple-400">导入与整理</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">文件管理与标记</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-2 border-2 border-purple-500">
                    <span className="text-purple-800 dark:text-purple-300 font-bold">2</span>
                  </div>
                  <h4 className="font-medium text-purple-700 dark:text-purple-400">全局调整</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">曝光与色彩基础校正</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-2 border-2 border-purple-500">
                    <span className="text-purple-800 dark:text-purple-300 font-bold">3</span>
                  </div>
                  <h4 className="font-medium text-purple-700 dark:text-purple-400">局部调整</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">选区与蒙版应用</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-2 border-2 border-purple-500">
                    <span className="text-purple-800 dark:text-purple-300 font-bold">4</span>
                  </div>
                  <h4 className="font-medium text-purple-700 dark:text-purple-400">修饰与特效</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">瑕疵修复与创意处理</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-2 border-2 border-purple-500">
                    <span className="text-purple-800 dark:text-purple-300 font-bold">5</span>
                  </div>
                  <h4 className="font-medium text-purple-700 dark:text-purple-400">输出优化</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">锐化、降噪与导出</p>
                </div>
              </div>
            </div>
            
            {/* 新增：详细工作流程描述和提示 */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <h3 className="font-medium text-purple-700 dark:text-purple-400 mb-2">专业工作流程要点</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>始终保留原始文件，使用非破坏性编辑</li>
                  <li>先进行全局调整，再处理局部细节</li>
                  <li>使用虚拟副本尝试不同创意方向</li>
                  <li>定期保存工作并创建备份</li>
                  <li>为不同类型的作品建立预设模板</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <h3 className="font-medium text-purple-700 dark:text-purple-400 mb-2">常见后期软件对比</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Lightroom</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">适合整体调整与管理</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Photoshop</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">专业修饰与合成</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Capture One</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">色彩精确控制</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 子模块选择导航 - 优化标签导航设计 */}
          <Tabs
            defaultValue="raw-processing"
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="mb-8 w-full flex flex-wrap justify-center gap-2 bg-transparent">
              <TabsTrigger 
                value="raw-processing" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md px-6 py-2 rounded-full border border-purple-400 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
              >
                RAW处理基础
              </TabsTrigger>
              <TabsTrigger 
                value="local-adjustment" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md px-6 py-2 rounded-full border border-purple-400 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
              >
                局部调整技术
              </TabsTrigger>
              <TabsTrigger 
                value="color-processing" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md px-6 py-2 rounded-full border border-purple-400 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
              >
                色彩处理
              </TabsTrigger>
              <TabsTrigger 
                value="retouching" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md px-6 py-2 rounded-full border border-purple-400 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
              >
                修饰与合成
              </TabsTrigger>
              <TabsTrigger 
                value="sharpening-noise" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md px-6 py-2 rounded-full border border-purple-400 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
              >
                锐化与降噪
              </TabsTrigger>
            </TabsList>

            {/* 各子模块内容 */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-12"
            >
              {/* RAW处理基础 */}
              <TabsContent value="raw-processing" className="mt-6">
                <div className="space-y-6">
                  <motion.div variants={itemVariants} className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300">RAW处理基础</h2>
                    </div>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">学习如何从RAW文件中提取最佳质量，掌握曝光调整、白平衡校正和基本色调控制。RAW文件提供了更大的编辑空间，让您能够恢复更多细节并进行无损编辑。</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">RAW格式优势</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">了解RAW格式的优势，以及相比JPEG的更大编辑空间。</p>
                        <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">更高的位深度和更大的动态范围</div>
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">基础调整工作流</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">掌握从曝光、白平衡到色调的基本工作流程。</p>
                        <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">按照正确顺序调整获得最佳效果</div>
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">色彩科学</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">了解不同相机品牌的色彩特性与RAW转换器的区别。</p>
                        <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">不同品牌有其独特的色彩表现</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
                      <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-300">RAW格式的优势</h3>
                      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                        <li>更大的动态范围，能够恢复更多高光和阴影细节</li>
                        <li>更精确的白平衡控制，可以在后期完全调整</li>
                        <li>更高的色彩深度(通常为12-14位)，比JPEG的8位提供更多颜色信息</li>
                        <li>无损编辑，可以多次调整而不降低图像质量</li>
                        <li>更大的后期处理空间，能够修正拍摄错误</li>
                      </ul>
                    </div>
                    <div className="aspect-video relative rounded-lg overflow-hidden border border-purple-300 dark:border-purple-700 group">
                      <Image 
                        src="/images/postprocessing/raw-advantages.jpg" 
                        alt="RAW格式优势展示"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <p className="p-4 text-white text-sm">RAW文件可以恢复过曝和欠曝区域的细节</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <BeforeAfterSlider
                      beforeImage={beforeImage}
                      afterImage={afterImage}
                      beforeLabel="RAW原始文件"
                      afterLabel="基础调整后"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <RawAdjustmentSimulator />
                  </motion.div>
                </div>
              </TabsContent>

              {/* 局部调整技术 */}
              <TabsContent value="local-adjustment" className="mt-6">
                <div className="space-y-6">
                  <motion.div variants={itemVariants} className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300">局部调整技术</h2>
                    </div>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">掌握选区、遮罩和局部修饰等技术，提升照片的视觉重点和细节表现。通过局部调整，你可以引导观众的注意力，强调照片中的重要元素，创造更具吸引力的画面。</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">渐变滤镜</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">用于天空与地面的过渡，创造自然的光线过渡效果。</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">径向滤镜</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">突出或淡化特定区域，创造聚光灯效果。</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">选择性调整</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">通过颜色或亮度范围选择特定区域进行调整。</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <LocalAdjustmentTool />
                  </motion.div>
                </div>
              </TabsContent>

              {/* 色彩处理 */}
              <TabsContent value="color-processing" className="mt-6">
                <div className="space-y-6">
                  <motion.div variants={itemVariants} className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300">色彩处理与调色</h2>
                    </div>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">探索色彩理论与应用，学习创建引人注目的色彩风格和协调的色调。掌握色彩控制能够极大地增强照片的情感表达和视觉冲击力。</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">色彩校准</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">学习白平衡调整和色彩校准技术，确保照片色彩的准确性。</p>
                        <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">准确的色彩是后期处理的基础</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">HSL调整</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">掌握色相、饱和度和明度调整，精确控制照片中每种颜色。</p>
                        <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">HSL是色彩控制的强大工具</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">分离色调</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">学习如何为高光和阴影分别添加色调，创造独特的色彩氛围。</p>
                        <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">创造电影感和艺术风格的关键</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-300">色彩理论实验室</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">色彩理论是后期处理的核心，理解色彩关系能帮助创造更具吸引力的照片。以下是几种常见的色彩和谐方式：</p>
                        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                          <li className="group">
                            <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">互补色</span> - 色轮对面的颜色，如蓝色与橙色
                          </li>
                          <li className="group">
                            <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">三角色</span> - 色轮上均匀分布的三种颜色
                          </li>
                          <li className="group">
                            <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">分裂互补色</span> - 一种主色与其互补色两侧的颜色
                          </li>
                          <li className="group">
                            <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">类似色</span> - 色轮上相邻的颜色，创造和谐统一的感觉
                          </li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 group hover:shadow-md transition-shadow">
                        <div className="aspect-video relative rounded-md overflow-hidden">
                          <Image 
                            src="/images/postprocessing/color-theory-wheel.jpg" 
                            alt="色彩理论轮盘"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <p className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">色彩理论轮盘帮助理解颜色关系</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h4 className="font-medium mb-3 text-purple-700 dark:text-purple-300">常见色彩风格与应用</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="h-20 rounded-md bg-gradient-to-r from-blue-500 to-cyan-400 shadow-sm"></div>
                          <p className="mt-2 text-sm font-medium">冷色调</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">冬季、科技、平静</p>
                        </div>
                        <div className="text-center">
                          <div className="h-20 rounded-md bg-gradient-to-r from-amber-500 to-red-400 shadow-sm"></div>
                          <p className="mt-2 text-sm font-medium">暖色调</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">夕阳、秋季、温馨</p>
                        </div>
                        <div className="text-center">
                          <div className="h-20 rounded-md bg-gradient-to-r from-teal-500 to-emerald-400 shadow-sm"></div>
                          <p className="mt-2 text-sm font-medium">自然色调</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">风景、植物、生机</p>
                        </div>
                        <div className="text-center">
                          <div className="h-20 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-sm"></div>
                          <p className="mt-2 text-sm font-medium">创意色调</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">时尚、艺术、表达</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <BeforeAfterSlider
                      beforeImage={beforeImage}
                      afterImage={afterImage}
                      beforeLabel="原始色彩"
                      afterLabel="色彩处理后"
                    />
                    <p className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400">拖动滑块查看色彩处理前后的效果对比</p>
                  </motion.div>
                </div>
              </TabsContent>

              {/* 修饰与合成 */}
              <TabsContent value="retouching" className="mt-6">
                <div className="space-y-6">
                  <motion.div variants={itemVariants} className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300">修饰与合成</h2>
                    </div>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">学习高级人像修饰和图像合成技术，创造专业级别的照片效果。掌握这些技术可以去除分散注意力的元素，增强主体，甚至创造出现实中不存在的场景。</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">皮肤修饰</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">学习高频分离和频率分离技术，实现自然的皮肤修饰效果。</p>
                        <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">保留质感的同时平滑皮肤</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">形体调整</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">掌握变形工具和液化工具的使用方法，进行细微的形体塑造。</p>
                        <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">谨慎使用，保持自然效果</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">图像合成</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">学习蒙版、选区和图层混合模式，创造复杂的合成图像。</p>
                        <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">光线匹配是合成的关键</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-video relative rounded-lg overflow-hidden border border-purple-300 dark:border-purple-700 group">
                      <Image 
                        src="/images/postprocessing/retouching-example.jpg" 
                        alt="修饰前后对比"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <p className="p-4 text-white text-sm">专业修饰能够保持自然效果同时增强照片质量</p>
                      </div>
                    </div>
                    <div className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
                      <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-300">修饰工作流程</h3>
                      <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                        <li className="group">
                          <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">基础调整</span> - 曝光、对比度和色彩校正
                        </li>
                        <li className="group">
                          <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">瑕疵修复</span> - 使用修复工具移除不需要的元素
                        </li>
                        <li className="group">
                          <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">皮肤平滑</span> - 使用频率分离保留纹理的同时平滑肤色
                        </li>
                        <li className="group">
                          <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">局部调整</span> - 强调重要区域，淡化分散注意力的元素
                        </li>
                        <li className="group">
                          <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">最终修饰</span> - 添加清晰度、对比度和效果
                        </li>
                      </ol>
                      
                      <div className="mt-6 bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                        <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">修饰伦理原则</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>保持自然外观，避免过度修饰</li>
                          <li>尊重主体特点，增强而非改变</li>
                          <li>对商业作品保持透明度</li>
                          <li>考虑修饰对观众的影响</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-300">合成技术应用场景</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                        <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">天空替换</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          将灰暗无趣的天空替换为更富戏剧性的天空，增强整体画面效果。关键是匹配色温和光线方向。
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                        <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">多图合成</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          将多张照片元素组合成单一图像，如将人物放入不同场景，或合成全景照片。
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                        <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">创意双重曝光</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          将两个不同主题的照片融合，创造梦幻或超现实效果，常用于概念艺术摄影。
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              {/* 锐化与降噪 */}
              <TabsContent value="sharpening-noise" className="mt-6">
                <SharpeningNoiseModule />
              </TabsContent>
            </motion.div>
          </Tabs>
          
          {/* 学习资源与参考 */}
          <div className="p-6 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-slate-900 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-purple-800 dark:text-purple-300">推荐学习资源</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">软件教程</h3>
                <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Adobe Lightroom 完整指南</li>
                  <li>Photoshop 高级修饰技术</li>
                  <li>Capture One 专业工作流</li>
                  <li>DaVinci Resolve 色彩分级</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">推荐书籍</h3>
                <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>《数字摄影后期圣经》</li>
                  <li>《摄影师的Photoshop技法》</li>
                  <li>《摄影色彩心理学》</li>
                  <li>《高级人像修饰》</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">在线课程</h3>
                <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>摄影后期处理大师班</li>
                  <li>专业人像修饰工作流</li>
                  <li>风景摄影后期技巧</li>
                  <li>RAW文件专业处理</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 