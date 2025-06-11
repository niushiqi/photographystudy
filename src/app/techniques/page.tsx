"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mountain, 
  Building, 
  CloudRain, 
  Aperture, 
  Camera,
  ChevronDown,
  Info,
  Cloud
} from "lucide-react";
import { cn } from "@/lib/utils";

// 导入新的核心组件
import { 
  TechniqueTabs, 
  StepByStepGuide, 
  BeforeAfterComparison, 
  EnhancedSceneSimulator,
  TechniqueCard
} from "@/components/techniques/core";

// 导入新的场景模块
import { PortraitTechniqueModule } from "@/components/techniques/scenes/PortraitTechniqueModule";
import { LandscapeTechniqueModule } from "@/components/techniques/scenes/LandscapeTechniqueModule";
import { StreetTechniqueModule } from "@/components/techniques/scenes/StreetTechniqueModule";
import { PageHeader } from "@/components/ui/PageHeader";

// 模拟器设置
const simulatorSettings = [
  {
    id: "aperture",
    name: "光圈值",
    min: 1.4,
    max: 22,
    step: 0.1,
    defaultValue: 8,
    unit: "f",
  },
  {
    id: "shutterSpeed",
    name: "快门速度",
    min: 0.001,
    max: 1,
    step: 0.01,
    defaultValue: 0.016,
    unit: "s",
  },
  {
    id: "iso",
    name: "ISO感光度",
    min: 100,
    max: 6400,
    step: 100,
    defaultValue: 400,
  },
  {
    id: "focalLength",
    name: "焦距",
    min: 16,
    max: 200,
    step: 1,
    defaultValue: 50,
    unit: "mm",
  },
  {
    id: "exposure",
    name: "曝光补偿",
    min: -2,
    max: 2,
    step: 0.1,
    defaultValue: 0,
    unit: "EV",
  },
  {
    id: "brightness",
    name: "亮度",
    min: 0.5,
    max: 1.5,
    step: 0.05,
    defaultValue: 1,
  },
  {
    id: "contrast",
    name: "对比度",
    min: 0.8,
    max: 1.5,
    step: 0.05,
    defaultValue: 1,
  },
  {
    id: "saturation",
    name: "饱和度",
    min: 0,
    max: 2,
    step: 0.05,
    defaultValue: 1,
  },
  {
    id: "blur",
    name: "背景模糊",
    min: 0,
    max: 10,
    step: 0.5,
    defaultValue: 0,
    unit: "px",
  }
];

// 场景预设
const scenePresets = [
  {
    id: "cityscape",
    name: "城市日落",
    imageUrl: "/images/techniques/simulator/cityscape.jpg",
    description: "在晚霞中捕捉城市天际线的黄昏场景",
    icon: <Cloud className="w-3 h-3" />,
    recommendedSettings: {
      aperture: 8,
      shutterSpeed: 0.016,
      iso: 400,
      focalLength: 50,
      exposure: 0,
      brightness: 1,
      contrast: 1,
      saturation: 1,
      blur: 0
    }
  },
  {
    id: "portrait",
    name: "人像逆光",
    imageUrl: "/images/techniques/simulator/portrait.jpg",
    description: "黄金时刻的逆光人像拍摄场景",
    icon: <User className="w-3 h-3" />,
    recommendedSettings: {
      aperture: 2.8,
      shutterSpeed: 0.004,
      iso: 200,
      focalLength: 85,
      exposure: 0.3,
      brightness: 1.1,
      contrast: 1.2,
      saturation: 1.1,
      blur: 4
    }
  },
  {
    id: "landscape",
    name: "山景日出",
    imageUrl: "/images/techniques/simulator/landscape.jpg",
    description: "清晨山脉日出的壮丽自然景观",
    icon: <Mountain className="w-3 h-3" />,
    recommendedSettings: {
      aperture: 11,
      shutterSpeed: 0.033,
      iso: 100,
      focalLength: 24,
      exposure: -0.3,
      brightness: 1,
      contrast: 1.3,
      saturation: 1.2,
      blur: 0
    }
  }
];

export default function TechniquesPage() {
  const [activeTab, setActiveTab] = useState("simulator");
  
  const techniqueTypes = [
    {
      id: "portrait",
      title: "人像摄影技巧",
      description: "学习如何拍摄自然、表现力丰富的人像照片",
      icon: <User className="w-5 h-5" />,
      component: <PortraitTechniqueModule />
    },
    {
      id: "landscape",
      title: "风景摄影技巧",
      description: "捕捉震撼人心的自然景观和壮丽风光",
      icon: <Mountain className="w-5 h-5" />,
      component: <LandscapeTechniqueModule />
    },
    {
      id: "street",
      title: "街头摄影技巧",
      description: "捕捉城市生活、街道场景和瞬间故事",
      icon: <Building className="w-5 h-5" />,
      component: <StreetTechniqueModule />
    },
    {
      id: "weather",
      title: "特殊天气拍摄",
      description: "在雨天、雾天和雪天拍摄的专业技巧",
      icon: <CloudRain className="w-5 h-5" />,
      component: (
        <div className="p-8 text-center">
          <div className="mb-4 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 p-4 rounded-lg inline-flex items-center">
            <Info className="w-5 h-5 mr-2" />
            <span>特殊天气拍摄内容正在精心编写中，敬请期待！</span>
          </div>
          <StepByStepGuide 
            title="即将推出: 雨天摄影完全指南"
            description="学习如何在雨天拍摄出富有情感和氛围的照片"
            difficulty="intermediate"
            timeRequired="15分钟"
            steps={[
              { id: "prep", title: "准备工作", description: "即将推出..." },
              { id: "scene", title: "场景选择", description: "即将推出..." },
              { id: "settings", title: "相机设置", description: "即将推出..." },
              { id: "composition", title: "构图技巧", description: "即将推出..." },
              { id: "post", title: "后期处理", description: "即将推出..." }
            ]}
            equipment={[
              { name: "防水相机套", essential: true },
              { name: "快速干燥布", essential: true },
              { name: "防水袋", essential: false },
              { name: "偏振滤镜", essential: false }
            ]}
          />
        </div>
      )
    },
  ];

  // 顶部标签页
  const tabs = [
    {
      id: "simulator",
      label: "场景模拟器",
      icon: <Aperture className="w-4 h-4 mr-2" />,
      content: <div></div>
    },
    {
      id: "techniques",
      label: "专业技巧",
      icon: <Camera className="w-4 h-4 mr-2" />,
      content: <div></div>
    }
  ];

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <PageHeader
        title="拍摄技巧"
        description="实战场景动作手册，为您提供即学即用的操作模板和具体解决方案。"
      />

      {/* 技术模拟器/技巧选择器 */}
      <div className="mb-10">
        <TechniqueTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
          variant="pill" 
        />
      </div>
      
      {/* 内容区域 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "simulator" ? (
            <div className="mb-12">
              <EnhancedSceneSimulator 
                title="场景模拟器" 
                description="调整参数，实时预览不同相机设置的效果"
                settings={simulatorSettings}
                presets={scenePresets}
                defaultPreset="cityscape"
              />
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <TechniqueCard
                  title="光圈优先模式使用指南"
                  description="学习如何使用光圈优先(A/Av)模式控制景深，突出主体"
                  icon={<Aperture className="w-5 h-5" />}
                  difficulty="beginner"
                  expandable
                >
                  <div className="space-y-4">
                    <p>光圈优先模式允许您设置光圈值，相机会自动计算合适的快门速度。这是控制景深的理想模式：</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>大光圈</strong>（如f/1.8）：产生浅景深，背景模糊，适合人像摄影</li>
                      <li><strong>小光圈</strong>（如f/11）：产生深景深，整个场景清晰，适合风景摄影</li>
                    </ul>
                    <BeforeAfterComparison
                      beforeImage="/images/techniques/simulator/aperture-f2.jpg"
                      afterImage="/images/techniques/simulator/aperture-f11.jpg"
                      beforeLabel="f/2.8 - 浅景深"
                      afterLabel="f/11 - 深景深"
                    />
                  </div>
                </TechniqueCard>
                
                <TechniqueCard
                  title="黄金时刻摄影技巧"
                  description="利用日出日落前后的黄金光线拍摄震撼照片"
                  icon={<Mountain className="w-5 h-5" />}
                  difficulty="intermediate"
                  expandable
                >
                  <div className="space-y-4">
                    <p>黄金时刻是指日出后和日落前约一小时的时间，光线温暖柔和，影子长而柔软：</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>使用应用程序如PhotoPills或Sun Surveyor规划拍摄时间</li>
                      <li>考虑使用渐变滤镜平衡明亮的天空和较暗的前景</li>
                      <li>尝试剪影效果，将主体放在明亮的天空前</li>
                    </ul>
                    <p className="text-amber-600 dark:text-amber-400 font-medium">提示：提前15-30分钟到达拍摄地点，为构图留出足够时间</p>
                  </div>
                </TechniqueCard>
              </div>
            </div>
          ) : (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {techniqueTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className="p-4 rounded-lg border transition-colors text-left flex flex-col h-full
                      border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 
                      hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center mr-2.5">
                        {type.icon}
                      </div>
                      <h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                        {type.title}
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      {type.description}
                    </p>
                  </button>
                ))}
              </div>
              
              {/* 展示所选技巧类型的内容 */}
              {techniqueTypes.find(t => t.id === activeTab)?.component || (
                <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
                  <div className="max-w-3xl mx-auto text-center">
                    <p className="text-neutral-600 dark:text-neutral-400">
                      请从上方选择一种摄影类型，查看详细的技巧指南
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* 通用摄影技巧 */}
      <div className="bg-neutral-50 dark:bg-neutral-750 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
          通用摄影技巧
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TechniqueCard
            title="三分法构图"
            description="将画面分为九等份，在交叉点放置主体，创造平衡构图"
            difficulty="beginner"
          />
          
          <TechniqueCard
            title="前景中景背景"
            description="增加照片的景深和立体感，创造视觉引导"
            difficulty="intermediate"
          />
          
          <TechniqueCard
            title="引导线构图"
            description="利用自然线条引导观众视线到照片的主体"
            difficulty="intermediate"
          />
          
          <TechniqueCard
            title="适当曝光技巧"
            description="学习直方图分析和曝光补偿，避免过曝或曝光不足"
            difficulty="intermediate"
          />
          
          <TechniqueCard
            title="对焦技巧"
            description="掌握不同对焦模式和技巧，确保主体清晰"
            difficulty="beginner"
          />
          
          <TechniqueCard
            title="色彩理论应用"
            description="了解色彩心理学和互补色在摄影中的应用"
            difficulty="advanced"
          />
        </div>
      </div>
    </div>
  );
} 