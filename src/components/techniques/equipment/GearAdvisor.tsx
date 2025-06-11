"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type PhotographyType = "portrait" | "landscape" | "street" | "wildlife" | "macro" | "travel" | "sports" | "product";
type BudgetRange = "entry" | "enthusiast" | "professional";
type Priority = "image-quality" | "portability" | "versatility" | "low-light" | "durability" | "video";

interface GearRecommendation {
  title: string;
  type: "camera" | "lens" | "accessory";
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  features: string[];
}

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
  const getRecommendations = (): GearRecommendation[] => {
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

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">器材选择顾问</h2>
        <p className="text-muted-foreground mb-8">
          通过回答几个简单问题，我们将帮您找到最适合您摄影需求和预算的设备组合。
        </p>

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
      </section>

      {/* 推荐结果 */}
      {showRecommendations && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 border-t pt-8"
        >
          <h3 className="text-2xl font-bold mb-6">您的个性化推荐</h3>
          <p className="text-muted-foreground mb-6">
            根据您的{selectedTypes.length > 0 ? ` ${selectedTypes.length}种拍摄类型` : ""}
            {priorities.length > 0 ? `、${priorities.length}项优先考虑因素` : ""}
            和{budget === "entry" ? "入门级" : budget === "enthusiast" ? "进阶级" : "专业级"}预算，
            我们为您推荐以下设备组合：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getRecommendations().map((item, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 relative bg-slate-100">
                  {/* 实际项目中应替换为真实图片 */}
                  <div className="absolute inset-0 flex items-center justify-center text-2xl bg-slate-200">
                    {item.type === "camera" ? "📷" : item.type === "lens" ? "🔭" : "🧰"}
                  </div>
                  {/*<Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />*/}
                </div>
                <div className="p-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    item.type === "camera" 
                      ? "bg-blue-100 text-blue-800"
                      : item.type === "lens"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {item.type === "camera" ? "相机" : item.type === "lens" ? "镜头" : "配件"}
                  </span>
                  <h4 className="text-lg font-semibold mt-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex text-amber-500">
                      {Array(5).fill(0).map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ${i < Math.floor(item.rating) ? "" : "opacity-30"}`}>
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm ml-1">{item.rating.toFixed(1)}</span>
                  </div>
                  <div className="text-lg font-bold text-primary mt-2">¥{item.price.toLocaleString()}</div>
                  <div className="mt-3 space-y-1">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-500 mr-1">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-3">升级路径建议</h4>
            <p className="text-muted-foreground mb-4">随着您摄影技能的提升，您可能希望按以下顺序升级您的设备：</p>
            <ol className="space-y-3">
              <li className="flex">
                <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center font-medium mr-2 flex-shrink-0">1</span>
                <div>
                  <span className="font-medium">优先添加高质量镜头</span>
                  <p className="text-sm text-muted-foreground">好的镜头对画质影响更大，而且使用寿命通常比机身更长</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center font-medium mr-2 flex-shrink-0">2</span>
                <div>
                  <span className="font-medium">投资稳定系统</span>
                  <p className="text-sm text-muted-foreground">三脚架或云台等可显著提升画质，特别是在弱光环境下</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center font-medium mr-2 flex-shrink-0">3</span>
                <div>
                  <span className="font-medium">升级相机机身</span>
                  <p className="text-sm text-muted-foreground">当现有机身的性能明显限制您的创作时，再考虑升级</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                setSelectedTypes([]);
                setPriorities([]);
                setBudget("enthusiast");
                setShowRecommendations(false);
              }}
              className="px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary/5 transition-colors"
            >
              重新定制推荐
            </button>
          </div>
        </motion.section>
      )}
    </div>
  );
} 