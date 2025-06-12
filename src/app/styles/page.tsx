"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Palette, 
  Camera, 
  Map, 
  Sparkles
} from "lucide-react";

// 导入所需组件
import { StyleExplorer } from "@/components/styles/style-explorer";
import { SceneMatcher } from "@/components/styles/scene-matcher";
import { VisualElementsLab } from "@/components/styles/visual-elements-lab";
import { StyleDecoder } from "@/components/styles/StyleDecoder";

// 场景风格选项卡导航
const styleModules = [
  { id: "style-explorer", name: "风格探索", icon: <Palette size={16} /> },
  { id: "scene-matcher", name: "场景风格配对", icon: <Map size={16} /> },
  { id: "visual-elements", name: "视觉元素实验室", icon: <Sparkles size={16} /> },
  { id: "style-decoder", name: "风格解码器", icon: <Camera size={16} /> },
];

// 示例视觉元素数据
const visualElementsData = [
  {
    id: "composition",
    name: "构图",
    description: "构图是视觉艺术中的基础元素，决定了画面中主体的排列方式和视觉重量的分布。良好的构图能引导观众的视线，突出主题，创造平衡或张力。",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="16" y2="21"/><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
  },
  {
    id: "lighting",
    name: "光线",
    description: "光线是摄影中最重要的元素之一，它不仅揭示形态，还能创造氛围和情绪。从柔和的自然光到戏剧化的人工光源，光线的质量、方向和强度都直接影响画面的视觉表现。",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
  },
  {
    id: "color",
    name: "色彩",
    description: "色彩不仅提供视觉信息，还能传达情绪和象征意义。不同的色彩组合可以创造和谐或对比，温暖或冷静的感觉，以及特定的风格特征。色彩是摄影师表达个人视觉语言的强大工具。",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="9.5" cy="10.5" r="2.5"/><circle cx="5.5" cy="6.5" r="2.5"/><path d="M6 17.5a5 5 0 0 1 12 0"/></svg>
  },
  {
    id: "texture",
    name: "质感",
    description: "质感为图像增添维度和深度，可以是实际的物理纹理，也可以是通过光影创造的视觉质感。锐利的细节、柔和的散景、颗粒感都是创造特定质感的方法，能使照片更具触感和沉浸感。",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5.5 8.5L9 4.5L5.5 8.5ZM9.5 13.5L5.5 17.5L9.5 13.5ZM14.5 4.5L18.5 8.5L14.5 4.5ZM18.5 13.5L14.5 17.5L18.5 13.5Z"/><path d="M4 7l3-3 5 5-3 3-5-5z"/><path d="M14 7l-3-3 5-5 3 3-5 5z"/><path d="M7 14l-3-3 5-5 3 3-5 5z"/><path d="M17 14l-3-3 5-5 3 3-5 5z"/></svg>
  }
];

// 示例风格解码器数据
const styleDecoderData = {
  photographyStyle: "cinematic",
  styleTitle: "电影感风格",
  styleDescription: "电影感摄影借鉴电影视觉语言，注重讲故事、情绪渲染和特定的色调处理。通过光影对比、色彩协调和画面叙事，创造出如同电影场景般富有情感和戏剧性的图像。",
  visualElements: visualElementsData,
  exampleWorks: [
    {
      id: "1",
      title: "城市夜色",
      photographer: "李明",
      imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926",
      year: "2023",
      elements: [
        {
          id: "element-1",
          description: "强烈的色彩对比：使用蓝色和橙色的互补色，创造出鲜明的视觉冲击",
          position: { x: 30, y: 40 }
        },
        {
          id: "element-2",
          description: "戏剧化光影：侧光营造的强烈明暗对比增强了场景的戏剧性",
          position: { x: 70, y: 60 }
        },
        {
          id: "element-3",
          description: "宽屏比例：使用2.35:1的宽银幕比例增强电影感",
          position: { x: 50, y: 80 }
        }
      ]
    },
    {
      id: "2",
      title: "孤独旅人",
      photographer: "张华",
      imageUrl: "https://images.unsplash.com/photo-1541682272660-9393e5a8f93f",
      year: "2022",
      elements: [
        {
          id: "element-1",
          description: "氛围光线：暮色的柔和光线营造出忧郁而神秘的氛围",
          position: { x: 25, y: 30 }
        },
        {
          id: "element-2",
          description: "主体与环境的对比：小人物与广阔环境形成强烈的视觉和情感对比",
          position: { x: 60, y: 45 }
        },
        {
          id: "element-3",
          description: "色调处理：低饱和度的蓝紫色调增强了电影的情绪表达",
          position: { x: 80, y: 70 }
        }
      ]
    }
  ],
  alternativeStyles: [
    {
      id: "documentary",
      name: "纪实风格",
      imageUrl: "https://images.unsplash.com/photo-1533230664508-9e41da001041",
      description: "纪实风格摄影强调真实性和故事性，捕捉自然发生的瞬间和人文情感，通常使用自然光线和较少的后期处理。"
    },
    {
      id: "minimalist",
      name: "极简主义",
      imageUrl: "https://images.unsplash.com/photo-1617608338809-03a2d30e3203",
      description: "极简主义摄影强调简洁、留白和形式纯粹性，通过减法创造强大的视觉冲击力，常使用简单的构图和有限的色彩。"
    }
  ]
};

// 场景与风格页面组件
export default function StylesPage() {
  const [activeTab, setActiveTab] = useState("style-explorer");
  const [isLoading, setIsLoading] = useState(true);

  // 模拟加载状态
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 pb-16 pt-24">
      <PageHeader
        title="场景与风格"
        description="探索不同摄影风格的视觉语言和美学特征，发现并培养个人摄影风格。理解如何在特定场景中应用不同风格，展现独特的艺术表达。"
      />
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full mt-8"
      >
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {styleModules.map((module) => (
              <TabsTrigger 
                key={module.id}
                value={module.id} 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white flex items-center gap-2 h-12"
              >
                {module.icon}
                {module.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <TabsContent value="style-explorer" className="m-0">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <h2 className="text-2xl font-bold mb-6 text-purple-800 dark:text-purple-300">风格探索</h2>
              <p className="mb-6 text-purple-700 dark:text-purple-400">
                探索不同的摄影风格，了解每种风格的视觉特点和表现手法。通过分析风格元素和特征，找到适合自己的表达方式。
              </p>
              {isLoading ? (
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-center text-purple-600 dark:text-purple-300">风格探索模块加载中...</p>
                </div>
              ) : (
                <StyleExplorer />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="scene-matcher" className="m-0">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <h2 className="text-2xl font-bold mb-6 text-purple-800 dark:text-purple-300">场景风格配对</h2>
              <p className="mb-6 text-purple-700 dark:text-purple-400">
                探索不同场景与风格的组合效果，找到最适合特定场景的表现方式。根据情绪和主题选择风格，提升摄影表现力。
              </p>
              {isLoading ? (
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-center text-purple-600 dark:text-purple-300">场景风格配对模块加载中...</p>
                </div>
              ) : (
                <SceneMatcher />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="visual-elements" className="m-0">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <h2 className="text-2xl font-bold mb-6 text-purple-800 dark:text-purple-300">视觉元素实验室</h2>
              <p className="mb-6 text-purple-700 dark:text-purple-400">
                通过互动实验理解构图、色彩、平衡和对比等视觉元素如何影响画面效果。掌握视觉语言的基本要素，提升创作能力。
              </p>
              {isLoading ? (
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-center text-purple-600 dark:text-purple-300">视觉元素实验室模块加载中...</p>
                </div>
              ) : (
                <VisualElementsLab />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="style-decoder" className="m-0">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <h2 className="text-2xl font-bold mb-6 text-purple-800 dark:text-purple-300">风格解码器</h2>
              <p className="mb-6 text-purple-700 dark:text-purple-400">
                深入解析特定摄影风格的视觉语言和构成元素。通过案例分析理解如何实现特定风格效果，培养个人风格表达。
              </p>
              {isLoading ? (
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-center text-purple-600 dark:text-purple-300">风格解码器模块加载中...</p>
                </div>
              ) : (
                <StyleDecoder {...styleDecoderData} />
              )}
            </div>
          </TabsContent>
        </motion.div>
      </Tabs>
      
      {/* 底部推荐导航 */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
          <h3 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-300">探索更多内容</h3>
          <p className="text-sm text-purple-700 dark:text-purple-400 mb-4">深入了解摄影的其他方面，拓展你的摄影知识和技能。</p>
          <div className="flex flex-wrap gap-2">
            <a href="/basics" className="text-xs px-3 py-1.5 bg-white dark:bg-neutral-800 text-purple-700 dark:text-purple-300 rounded-full border border-purple-300 dark:border-purple-700">基础知识</a>
            <a href="/techniques" className="text-xs px-3 py-1.5 bg-white dark:bg-neutral-800 text-purple-700 dark:text-purple-300 rounded-full border border-purple-300 dark:border-purple-700">拍摄技术</a>
            <a href="/postprocessing" className="text-xs px-3 py-1.5 bg-white dark:bg-neutral-800 text-purple-700 dark:text-purple-300 rounded-full border border-purple-300 dark:border-purple-700">后期处理</a>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
          <h3 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-300">个人风格发展</h3>
          <p className="text-sm text-purple-700 dark:text-purple-400 mb-4">通过练习和实验，发现并培养你独特的摄影风格和视觉语言。</p>
          <div className="flex flex-wrap gap-2">
            <a href="/showcase" className="text-xs px-3 py-1.5 bg-white dark:bg-neutral-800 text-purple-700 dark:text-purple-300 rounded-full border border-purple-300 dark:border-purple-700">案例展示</a>
            <a href="/arttheory" className="text-xs px-3 py-1.5 bg-white dark:bg-neutral-800 text-purple-700 dark:text-purple-300 rounded-full border border-purple-300 dark:border-purple-700">艺术理论</a>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
          <h3 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-300">创作挑战</h3>
          <p className="text-sm text-purple-700 dark:text-purple-400 mb-4">尝试特定风格的创作挑战，应用所学知识，提升摄影技能。</p>
          <div className="p-3 bg-white dark:bg-neutral-800 rounded-lg text-center">
            <p className="text-sm text-purple-700 dark:text-purple-400">选择一个场景，尝试三种不同风格表现，对比分析效果差异</p>
          </div>
        </div>
      </div>
    </div>
  );
}