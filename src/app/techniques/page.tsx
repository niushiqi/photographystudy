"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SceneSimulator from '@/components/techniques/core/SceneSimulator';
import CompositionGuide from '@/components/techniques/core/CompositionGuide';
import TechniqueGrid from '@/components/techniques/core/TechniqueGrid';
import SceneGuide from '@/components/techniques/core/SceneGuide';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Mountain, Cloud, User, Aperture, Clock, Zap, BookOpen, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// 摄影技巧数据
const photographyTechniques = [
  {
    id: "rule-of-thirds",
    title: "三分法构图",
    description: "将画面分为九等份，在交叉点放置主体，创造平衡构图",
    difficultyLevel: "beginner" as const,
    timeRequired: "10分钟",
    equipmentNeeded: ["任何相机"],
    imageSrc: "/images/techniques/composition/rule-of-thirds-landscape.jpg",
    category: "composition",
    steps: [
      {
        title: "了解三分法网格",
        content: "在相机取景器或屏幕上启用网格线功能，将画面水平和垂直各分为三等份。",
        imageSrc: "/images/techniques/composition/rule-of-thirds-grid.jpg"
      },
      {
        title: "确定主体位置",
        content: "将画面中的主要元素放置在网格线交叉点上，这些是视觉吸引力最强的位置。"
      },
      {
        title: "定位水平线",
        content: "将地平线放置在上三分线或下三分线上，避免将画面平均分割。"
      }
    ]
  },
  {
    id: "foreground-background",
    title: "前景中景背景",
    description: "增加照片的景深和立体感，创造视觉引导",
    difficultyLevel: "intermediate" as const,
    timeRequired: "15-20分钟",
    equipmentNeeded: ["相机", "广角镜头(可选)"],
    imageSrc: "/images/techniques/composition/foreground-background.jpg",
    category: "composition",
    steps: [
      {
        title: "寻找多层元素",
        content: "识别场景中的前景、中景和背景元素，它们将为照片创造深度感。"
      },
      {
        title: "利用前景框架",
        content: "使用前景元素（如岩石、树枝、拱门）引导观众视线进入画面。",
        imageSrc: "/images/techniques/composition/foreground-example.jpg"
      },
      {
        title: "保持清晰度分配",
        content: "决定哪一层需要最清晰，并相应调整光圈大小控制景深。"
      }
    ]
  },
  {
    id: "leading-lines",
    title: "引导线构图",
    description: "利用自然线条引导观众视线到照片的主体",
    difficultyLevel: "intermediate" as const,
    timeRequired: "15分钟",
    equipmentNeeded: ["任何相机"],
    imageSrc: "/images/techniques/composition/leading-lines-road.jpg",
    category: "composition",
    steps: [
      {
        title: "识别自然线条",
        content: "寻找场景中的自然线条，如道路、河流、栏杆或建筑线条。"
      },
      {
        title: "确定构图方向",
        content: "排列这些线条使它们指向或框住照片的主体，引导观众视线。",
        imageSrc: "/images/techniques/composition/leading-lines-example.jpg"
      },
      {
        title: "尝试不同视角",
        content: "改变拍摄位置和角度，找到最有力的线条路径。"
      }
    ]
  },
  {
    id: "golden-hour",
    title: "黄金时刻摄影",
    description: "在日出后或日落前的柔和光线中拍摄，获得温暖色调",
    difficultyLevel: "beginner" as const,
    timeRequired: "30-60分钟",
    equipmentNeeded: ["相机", "三脚架(可选)"],
    imageSrc: "/images/techniques/lighting/golden-hour.jpg",
    category: "lighting",
    steps: [
      {
        title: "计划拍摄时间",
        content: "使用PhotoPills等应用预测黄金时刻，通常是日出后和日落前的一小时。"
      },
      {
        title: "调整白平衡",
        content: "保持白平衡在\"日光\"或\"阴天\"设置，保留温暖色调。",
        imageSrc: "/images/techniques/lighting/golden-hour-example.jpg"
      },
      {
        title: "利用侧光",
        content: "将主体放置在侧光位置，利用柔和的直射光创造立体感和温暖氛围。"
      }
    ]
  },
  {
    id: "exposure-technique",
    title: "曝光掌控技巧",
    description: "学习直方图分析和曝光补偿，避免过曝或曝光不足",
    difficultyLevel: "intermediate" as const,
    timeRequired: "20分钟",
    equipmentNeeded: ["具有手动模式的相机"],
    imageSrc: "/images/techniques/exposure/histogram-guide.jpg",
    category: "technical",
    steps: [
      {
        title: "了解直方图",
        content: "学习解读直方图，确保数据既不堆积在左侧（曝光不足）也不堆积在右侧（过度曝光）。"
      },
      {
        title: "使用曝光补偿",
        content: "在复杂光线条件下，使用曝光补偿按钮（+/-）微调曝光。",
        imageSrc: "/images/techniques/exposure/exposure-compensation.jpg"
      },
      {
        title: "掌握测光模式",
        content: "了解不同测光模式（评价测光、中央重点、点测光）的适用场景。"
      }
    ]
  },
  {
    id: "focus-technique",
    title: "精准对焦技巧",
    description: "掌握不同对焦模式和技巧，确保主体清晰",
    difficultyLevel: "beginner" as const,
    timeRequired: "15分钟",
    equipmentNeeded: ["具有自动对焦的相机"],
    imageSrc: "/images/techniques/focus/focus-points.jpg",
    category: "technical",
    steps: [
      {
        title: "选择对焦点",
        content: "学习手动选择对焦点，将其精确放置在主体的关键部分（如人像中的眼睛）。"
      },
      {
        title: "使用对焦锁定",
        content: "对焦在主体上，半按快门锁定对焦，然后重新构图拍摄。",
        imageSrc: "/images/techniques/focus/focus-recompose.jpg"
      },
      {
        title: "选择合适的对焦模式",
        content: "静态主体使用单点对焦，运动主体使用连续对焦或跟踪对焦模式。"
      }
    ]
  }
];

// 技巧分类
const techniqueCategories = [
  { id: "composition", name: "构图技巧", description: "学习如何构建平衡、有吸引力的画面", icon: <BookOpen className="h-4 w-4" /> },
  { id: "lighting", name: "光线控制", description: "掌握自然光和人造光的运用方法", icon: <Sparkles className="h-4 w-4" /> },
  { id: "technical", name: "技术要点", description: "相机设置和参数控制的实用方法", icon: <Camera className="h-4 w-4" /> }
];

// 场景预设
const scenePresets = [
  {
    id: "city-sunset",
    name: "城市日落",
    imageUrl: "/images/techniques/simulator/city-sunset.jpg",
    description: "在晚霞中捕捉城市天际线的黄昏场景",
    icon: <Cloud className="w-3 h-3" />,
    recommendedSettings: {
      aperture: 8,
      shutterSpeed: 0.016,
      iso: 400,
      focalLength: 50
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
      focalLength: 85
    }
  },
  {
    id: "mountain",
    name: "山景日出",
    imageUrl: "/images/techniques/simulator/mountain.jpg",
    description: "清晨山脉日出的壮丽自然景观",
    icon: <Mountain className="w-3 h-3" />,
    recommendedSettings: {
      aperture: 11,
      shutterSpeed: 0.033,
      iso: 100,
      focalLength: 24
    }
  }
];

// 特色摄影技巧
const featuredTechniques = [
  {
    id: "aperture-priority",
    title: "光圈优先模式",
    description: "控制景深和背景虚化，让相机自动调整快门速度",
    icon: <Aperture className="h-5 w-5 text-purple-600" />,
    tips: ["大光圈(f/1.8-4)：浅景深，背景虚化", "小光圈(f/8-16)：深景深，整体清晰", "人像推荐f/2.8-4，风景推荐f/8-11"]
  },
  {
    id: "golden-hour",
    title: "黄金时刻拍摄",
    description: "日出后或日落前的柔和光线，创造温暖画面",
    icon: <Clock className="h-5 w-5 text-purple-600" />,
    tips: ["日出后和日落前约一小时", "侧光创造景深和立体感", "使用温暖的白平衡设置"]
  },
  {
    id: "high-speed",
    title: "高速摄影技巧",
    description: "冻结运动瞬间，捕捉高速动作细节",
    icon: <Zap className="h-5 w-5 text-purple-600" />,
    tips: ["使用1/500秒以上的快门速度", "提高ISO感光度以获得足够曝光", "使用连续对焦模式追踪运动物体"]
  }
];

export default function TechniquesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 space-y-12">
      {/* 页面标题 */}
      <PageHeader
        title="摄影技巧"
        description="掌握专业摄影技巧，提升你的摄影水平，创作令人惊叹的照片作品"
      />
      
      <div className="flex flex-wrap justify-center gap-3">
        {techniqueCategories.map(category => (
          <Badge 
            key={category.id} 
            variant="outline" 
            className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1 text-sm flex items-center"
          >
            <span className="mr-1.5">{category.icon}</span>
            {category.name}
          </Badge>
        ))}
      </div>
      
      {/* 场景模拟器 */}
      <section className="mb-12 pt-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-purple-800">场景模拟器</h2>
            <p className="text-gray-500 text-sm mt-1">调整相机参数，实时预览不同设置的效果</p>
          </div>
          <Link href="/techniques/simulator" className="inline-flex items-center text-purple-600 text-sm hover:text-purple-800 hover:underline">
            更多场景 <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <SceneSimulator />
      </section>
      
      {/* 构图指南 */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-purple-800">构图指南</h2>
            <p className="text-gray-500 text-sm mt-1">学习专业构图技巧，提升照片视觉吸引力</p>
          </div>
          <Link href="/techniques/composition" className="inline-flex items-center text-purple-600 text-sm hover:text-purple-800 hover:underline">
            更多构图技巧 <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <CompositionGuide />
      </section>
      
      {/* 特色技巧卡片 */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-purple-800">特色摄影技巧</h2>
          <p className="text-gray-500 text-sm mt-1">快速掌握这些关键技巧，立即提升拍摄效果</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTechniques.map(technique => (
            <Card key={technique.id} className="border-purple-100 hover:shadow-md transition-all duration-300 hover:border-purple-300">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full p-2 bg-purple-100">
                    {technique.icon}
                  </div>
                  <CardTitle className="text-lg text-purple-800">{technique.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">{technique.description}</p>
                <ul className="text-xs space-y-1.5 text-gray-700 list-disc pl-4">
                  {technique.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-purple-700 border-purple-200 hover:bg-purple-50">
                  了解更多
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      {/* 专业技巧库 */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-purple-800">专业技巧库</h2>
          <p className="text-gray-500 text-sm mt-1">浏览完整的摄影技巧集合，按类别筛选或搜索</p>
        </div>
        <TechniqueGrid 
          techniques={photographyTechniques}
          categories={techniqueCategories}
        />
      </section>
      
      {/* 场景拍摄指南 - 使用新组件 */}
      <SceneGuide />
    </div>
  );
} 