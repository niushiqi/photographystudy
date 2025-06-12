"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type PhotographyType = "portrait" | "landscape" | "street" | "wildlife" | "macro" | "travel" | "sports" | "product";
type BudgetRange = "entry" | "enthusiast" | "professional";
type Priority = "image-quality" | "portability" | "versatility" | "low-light" | "durability" | "video";

interface RecommendationItem {
  title: string;
  type: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  features: string[];
}

// 各级别推荐套装数据类型
type RecommendationData = {
  [budget in BudgetRange]: {
    [type in PhotographyType]?: RecommendationItem[];
  }
};

// 各级别推荐套装数据
const recommendationData: RecommendationData = {
  entry: {
    portrait: [
      {
        title: "索尼 A6400 + 适马 56mm f/1.4 DC DN",
        type: "camera",
        description: "紧凑、高性价比的APS-C无反人像方案",
        price: 9999,
        imageUrl: "/images/gear/sony-a6400.jpg",
        rating: 4.7,
        features: ["极速自动对焦", "24MP APS-C传感器", "大光圈定焦镜头", "4K视频录制"]
      },
      {
        title: "富士 X-S10 + XF 35mm f/2 R WR",
        type: "camera",
        description: "优秀色彩和机身防抖的入门人像方案",
        price: 10999,
        imageUrl: "/images/gear/fuji-xs10.jpg",
        rating: 4.6,
        features: ["26MP X-Trans传感器", "5轴机身防抖", "经典胶片模拟", "出色的人像色彩"]
      }
    ],
    landscape: [
      {
        title: "尼康 Z50 + 16-50mm VR 套机",
        type: "camera",
        description: "轻便耐用的APS-C无反风景方案",
        price: 8499,
        imageUrl: "/images/gear/nikon-z50.jpg",
        rating: 4.5,
        features: ["20MP APS-C传感器", "轻量化设计", "防尘防滴", "4K视频"]
      },
      {
        title: "佳能 RP + RF 24-105mm f/4-7.1 IS STM",
        type: "camera",
        description: "入门全画幅套机，适合风景和日常拍摄",
        price: 9999,
        imageUrl: "/images/gear/canon-rp.jpg",
        rating: 4.4,
        features: ["26MP全画幅传感器", "轻量机身", "广角到中长焦覆盖", "双像素自动对焦"]
      }
    ]
  },
  enthusiast: {
    portrait: [
      {
        title: "索尼 A7IV + 85mm f/1.8 FE",
        type: "camera",
        description: "专业级全画幅人像系统",
        price: 21999,
        imageUrl: "/images/gear/sony-a7iv-85.jpg",
        rating: 4.9,
        features: ["3300万像素全画幅", "出色的动态范围", "优秀的眼部对焦", "10位4K视频"]
      },
      {
        title: "佳能 R6 + RF 50mm f/1.2L USM",
        type: "camera",
        description: "顶级自动对焦和大光圈的人像组合",
        price: 27999,
        imageUrl: "/images/gear/canon-r6-50.jpg",
        rating: 4.8,
        features: ["2010万高感像素", "卓越的低光性能", "先进对焦系统", "极浅景深"]
      }
    ],
    landscape: [
      {
        title: "尼康 Z6II + Z 14-30mm f/4 S",
        type: "camera",
        description: "高动态范围和广角变焦的风景套装",
        price: 24999,
        imageUrl: "/images/gear/nikon-z6ii.jpg",
        rating: 4.7,
        features: ["2450万像素全画幅", "卓越的动态范围", "超广角覆盖", "专业级构造"]
      },
      {
        title: "富士 X-T4 + XF 10-24mm f/4 R OIS WR",
        type: "camera",
        description: "轻量化和极佳色彩的风景套装",
        price: 19999,
        imageUrl: "/images/gear/fuji-xt4.jpg",
        rating: 4.8,
        features: ["2610万像素X-Trans CMOS 4", "出色的胶片模拟", "防尘防水", "稳定的广角变焦"]
      }
    ]
  },
  professional: {
    portrait: [
      {
        title: "索尼 Alpha 1 + GM 镜头组合",
        type: "camera",
        description: "旗舰级专业人像摄影系统",
        price: 49999,
        imageUrl: "/images/gear/sony-a1.jpg",
        rating: 4.9,
        features: ["5010万像素", "先进对焦系统", "GM级大光圈镜头", "专业级色彩和动态范围"]
      },
      {
        title: "哈苏 X2D 100C + XCD 90V",
        type: "camera",
        description: "中画幅专业人像系统",
        price: 69999,
        imageUrl: "/images/gear/hasselblad.jpg",
        rating: 4.9,
        features: ["1亿像素中画幅", "16位色彩深度", "出色的细节表现", "哈苏色彩科学"]
      }
    ],
    landscape: [
      {
        title: "佳能 R5 + RF 15-35mm f/2.8L IS USM",
        type: "camera",
        description: "高分辨率专业风景系统",
        price: 39999,
        imageUrl: "/images/gear/canon-r5.jpg",
        rating: 4.9,
        features: ["4500万像素全画幅", "高分辨率细节", "8档机身防抖", "专业级防尘防水"]
      },
      {
        title: "富士 GFX 100S + GF 23mm f/4 R LM WR",
        type: "camera",
        description: "中画幅专业风景系统",
        price: 59999,
        imageUrl: "/images/gear/fuji-gfx100s.jpg",
        rating: 5.0,
        features: ["1亿像素中画幅", "超大动态范围", "极高细节保留", "出色的色彩重现"]
      }
    ]
  }
};

export function GearAdvisorModule() {
  const [selectedTypes, setSelectedTypes] = useState<PhotographyType[]>([]);
  const [budget, setBudget] = useState<BudgetRange>("enthusiast");
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const photographyTypes: { id: PhotographyType; label: string; icon: string }[] = [
    { id: "portrait", label: "人像摄影", icon: "👤" },
    { id: "landscape", label: "风景摄影", icon: "🏞️" },
    { id: "street", label: "街头摄影", icon: "🏙️" },
    { id: "wildlife", label: "野生动物", icon: "🦁" },
    { id: "macro", label: "微距摄影", icon: "🔍" },
    { id: "travel", label: "旅行摄影", icon: "✈️" },
    { id: "sports", label: "运动摄影", icon: "🏃" },
    { id: "product", label: "产品摄影", icon: "📦" },
  ];

  const priorityOptions: { id: Priority; label: string; description: string }[] = [
    { id: "image-quality", label: "画质", description: "高分辨率和色彩还原" },
    { id: "portability", label: "便携性", description: "轻量化和紧凑型设备" },
    { id: "versatility", label: "多功能性", description: "适应多种场景的灵活性" },
    { id: "low-light", label: "低光性能", description: "弱光环境下的表现" },
    { id: "durability", label: "耐用性", description: "可靠的构造和抗恶劣环境" },
    { id: "video", label: "视频能力", description: "高质量的视频拍摄功能" },
  ];

  const toggleType = (type: PhotographyType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const togglePriority = (priority: Priority) => {
    if (priorities.includes(priority)) {
      setPriorities(priorities.filter(p => p !== priority));
    } else if (priorities.length < 3) {
      setPriorities([...priorities, priority]);
    }
  };

  // 模拟获取推荐
  const getRecommendations = (): RecommendationItem[] => {
    // 这里应该根据用户选择生成真实推荐
    // 示例数据
    return [
      {
        title: "索尼 Alpha A7 IV",
        type: "camera",
        description: "全画幅无反相机，适合多种拍摄场景",
        price: 15999,
        imageUrl: "/images/gear/sony-a7iv.jpg",
        rating: 4.8,
        features: ["3300万像素", "4K 60p视频", "10帧/秒连拍", "出色的自动对焦"]
      },
      {
        title: "腾龙 28-75mm f/2.8 Di III VXD G2",
        type: "lens",
        description: "高性价比标准变焦镜头",
        price: 5999,
        imageUrl: "/images/gear/tamron-28-75.jpg",
        rating: 4.6,
        features: ["f/2.8恒定光圈", "轻量化设计", "出色的锐度", "防尘防溅设计"]
      },
      {
        title: "DJI RS 3 Pro 云台",
        type: "accessory",
        description: "专业级相机稳定器",
        price: 3999,
        imageUrl: "/images/gear/dji-rs3.jpg",
        rating: 4.7,
        features: ["承重可达4.5kg", "3轴稳定", "触控屏幕", "10小时电池续航"]
      }
    ];
  };

  // 渲染推荐结果
  const renderRecommendations = () => {
    if (!showRecommendations) return null;
    
    if (selectedTypes.length === 0) {
      return (
        <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
          <p className="text-yellow-700 dark:text-yellow-400">请至少选择一种摄影类型来获取推荐</p>
        </div>
      );
    }

    // 根据选择的拍摄类型和预算获取推荐
    const mainType = selectedTypes[0]; // 以第一个选择的类型为主
    const currentBudgetRecs = recommendationData[budget]?.[mainType] || getRecommendations();

    return (
      <div className="mt-8 space-y-6">
        <h3 className="text-xl font-semibold border-l-4 border-primary pl-3">为您推荐的器材组合</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentBudgetRecs.map((rec: RecommendationItem, index: number) => (
            <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b flex justify-between items-center">
                <h4 className="font-bold text-lg">{rec.title}</h4>
                <div className="flex items-center">
                  <span className="text-amber-500 mr-1">★</span>
                  <span>{rec.rating}</span>
                </div>
              </div>
              
              <div className="h-48 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center">
                <div className="text-6xl">📷</div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-muted-foreground">{rec.description}</p>
                  <span className="font-bold">¥{rec.price.toLocaleString()}</span>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">主要特点</h5>
                  <ul className="space-y-1">
                    {rec.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4">
                  <h5 className="font-medium mb-2">适合您的原因</h5>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>符合您的{priorityOptions.find(p => priorities.includes(p.id))?.label || "预算"}需求</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>专为{photographyTypes.find(t => t.id === mainType)?.label}优化的配置</span>
                    </li>
                    {priorities.length > 0 && (
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>
                          满足您{priorities.map(p => priorityOptions.find(opt => opt.id === p)?.label).join("、")}的优先需求
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
                    了解更多详情
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">器材顾问提示</h4>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            以上推荐基于您的拍摄需求和预算生成。请记住，器材只是工具，技巧和创意才是摄影的核心。
            如果您是初学者，建议从一套基础设备开始，随着技术提升再逐步升级。
          </p>
        </div>
        
        <div className="mt-4 flex justify-center">
          <button 
            onClick={() => setShowRecommendations(false)}
            className="px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium"
          >
            返回修改选择
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">器材选择顾问</h2>
        <p className="text-muted-foreground mb-8">
          通过回答几个简单问题，我们将帮您找到最适合您摄影需求和预算的设备组合。
        </p>

        {showRecommendations ? (
          renderRecommendations()
        ) : (
          <>
            {/* 摄影类型选择 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">您主要拍摄什么类型的照片？</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {photographyTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => toggleType(type.id)}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedTypes.includes(type.id)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 预算范围 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">您的预算范围是？</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setBudget("entry")}
                  className={`p-4 rounded-lg border transition-all ${
                    budget === "entry"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-medium">入门级</div>
                  <div className="text-sm text-muted-foreground">3000-8000元</div>
                </button>
                <button
                  onClick={() => setBudget("enthusiast")}
                  className={`p-4 rounded-lg border transition-all ${
                    budget === "enthusiast"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-medium">进阶级</div>
                  <div className="text-sm text-muted-foreground">8000-20000元</div>
                </button>
                <button
                  onClick={() => setBudget("professional")}
                  className={`p-4 rounded-lg border transition-all ${
                    budget === "professional"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-medium">专业级</div>
                  <div className="text-sm text-muted-foreground">20000元以上</div>
                </button>
              </div>
            </div>

            {/* 优先考虑 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">您最看重哪些方面？<span className="text-sm font-normal text-muted-foreground">（最多选3项）</span></h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {priorityOptions.map(priority => (
                  <button
                    key={priority.id}
                    onClick={() => togglePriority(priority.id)}
                    disabled={!priorities.includes(priority.id) && priorities.length >= 3}
                    className={`p-4 rounded-lg border transition-all ${
                      priorities.includes(priority.id)
                        ? "border-primary bg-primary/10 text-primary"
                        : priorities.length >= 3 && !priorities.includes(priority.id)
                        ? "border-border opacity-50 cursor-not-allowed"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-medium">{priority.label}</div>
                    <div className="text-sm text-muted-foreground">{priority.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 获取推荐按钮 */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowRecommendations(true)}
                disabled={selectedTypes.length === 0 || priorities.length === 0}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  selectedTypes.length === 0 || priorities.length === 0
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-gradient-purple text-white hover:shadow-lg"
                }`}
              >
                获取个性化推荐
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
} 