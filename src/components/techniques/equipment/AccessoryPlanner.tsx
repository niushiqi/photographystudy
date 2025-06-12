"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type CameraSystem = "sony" | "canon" | "nikon" | "fujifilm" | "panasonic" | "olympus";
type PhotographyLevel = "beginner" | "enthusiast" | "professional";
type PhotographyStyle = "portrait" | "landscape" | "wildlife" | "street" | "studio" | "sports" | "travel" | "video" | "event";
type AccessoryType = 
  | "tripod" 
  | "flash" 
  | "filter" 
  | "bag" 
  | "memory-card" 
  | "lighting" 
  | "remote" 
  | "gimbal" 
  | "microphone" 
  | "battery";

interface Accessory {
  id: string;
  name: string;
  type: AccessoryType;
  price: number;
  compatibleSystems: CameraSystem[];
  recommendedFor: PhotographyStyle[];
  level: PhotographyLevel[];
  description: string;
  features: string[];
  imageUrl: string;
}

// 模拟配件数据
const accessoriesData: Accessory[] = [
  {
    id: "peak-design-tripod",
    name: "Peak Design Travel Tripod",
    type: "tripod",
    price: 2999,
    compatibleSystems: ["sony", "canon", "nikon", "fujifilm", "panasonic", "olympus"],
    recommendedFor: ["landscape", "travel", "street"],
    level: ["enthusiast", "professional"],
    description: "超紧凑、轻量化的旅行三脚架，适合旅行和风景摄影师",
    features: [
      "碳纤维结构，重量仅1.29kg",
      "最大承重9.1kg",
      "高度达152cm",
      "折叠后极致紧凑",
      "创新的快速展开设计"
    ],
    imageUrl: "/images/accessories/peak-design-tripod.jpg"
  },
  {
    id: "godox-v1",
    name: "神牛 V1 圆头闪光灯",
    type: "flash",
    price: 1799,
    compatibleSystems: ["sony", "canon", "nikon", "fujifilm", "panasonic", "olympus"],
    recommendedFor: ["portrait", "studio", "event"],
    level: ["enthusiast", "professional"],
    description: "磁力附件兼容的圆头闪光灯，提供自然柔和的光线",
    features: [
      "圆形闪光头提供自然过渡的光线",
      "内置2.4G无线收发系统",
      "高速同步至1/8000秒",
      "兼容AK-R1磁力附件套装",
      "1.5秒快速回电"
    ],
    imageUrl: "/images/accessories/godox-v1.jpg"
  },
  {
    id: "nisi-v6",
    name: "NiSi V6 滤镜系统套装",
    type: "filter",
    price: 2499,
    compatibleSystems: ["sony", "canon", "nikon", "fujifilm", "panasonic", "olympus"],
    recommendedFor: ["landscape"],
    level: ["enthusiast", "professional"],
    description: "高品质方形滤镜系统，适合风景摄影",
    features: [
      "包含ND1000、ND64和GND8滤镜",
      "航空级铝合金支架",
      "防漏光设计",
      "适合多种镜头口径",
      "防刮纳米涂层"
    ],
    imageUrl: "/images/accessories/nisi-v6.jpg"
  },
  {
    id: "peak-design-everyday",
    name: "Peak Design Everyday Backpack V2",
    type: "bag",
    price: 1699,
    compatibleSystems: ["sony", "canon", "nikon", "fujifilm", "panasonic", "olympus"],
    recommendedFor: ["travel", "street"],
    level: ["beginner", "enthusiast", "professional"],
    description: "功能强大的日常摄影双肩包，兼顾实用性与美观",
    features: [
      "防水面料和拉链",
      "可定制的内部隔板",
      "侧边快速取放设备",
      "可容纳15寸笔记本电脑",
      "多重卡位固定三脚架"
    ],
    imageUrl: "/images/accessories/peak-design-bag.jpg"
  },
  {
    id: "sandisk-extreme-pro",
    name: "SanDisk Extreme Pro SD UHS-II 300MB/s",
    type: "memory-card",
    price: 899,
    compatibleSystems: ["sony", "canon", "nikon", "fujifilm", "panasonic", "olympus"],
    recommendedFor: ["sports", "wildlife", "video"],
    level: ["enthusiast", "professional"],
    description: "高速存储卡，适合高速连拍和4K/8K视频录制",
    features: [
      "读取速度高达300MB/s",
      "写入速度高达260MB/s",
      "防水、防震、防X光",
      "适合高速连拍和高分辨率视频",
      "包含数据恢复软件"
    ],
    imageUrl: "/images/accessories/sandisk-extreme-pro.jpg"
  },
  {
    id: "godox-sl60w",
    name: "神牛 SL-60W LED灯",
    type: "lighting",
    price: 899,
    compatibleSystems: ["sony", "canon", "nikon", "fujifilm", "panasonic", "olympus"],
    recommendedFor: ["portrait", "studio", "video"],
    level: ["enthusiast", "professional"],
    description: "高品质持续光源，适合视频拍摄和人像摄影",
    features: [
      "60W输出功率",
      "5600K色温",
      "CRI 95+高显色指数",
      "无线遥控调节",
      "兼容鲍恩卡口附件"
    ],
    imageUrl: "/images/accessories/godox-sl60w.jpg"
  },
  {
    id: "dji-rs-2",
    name: "DJI RS 2云台",
    type: "gimbal",
    price: 3499,
    compatibleSystems: ["sony", "canon", "nikon", "fujifilm", "panasonic", "olympus"],
    recommendedFor: ["video", "travel"],
    level: ["enthusiast", "professional"],
    description: "专业级相机稳定器，适合拍摄流畅的视频",
    features: [
      "碳纤维构造，仅重1.3kg",
      "最大负载4.5kg",
      "强大的电机，适合更大负载",
      "1.4寸全彩触摸屏",
      "12小时电池续航"
    ],
    imageUrl: "/images/accessories/dji-rs2.jpg"
  },
  {
    id: "rode-videomic-pro",
    name: "RODE VideoMic Pro+",
    type: "microphone",
    price: 1599,
    compatibleSystems: ["sony", "canon", "nikon", "fujifilm", "panasonic", "olympus"],
    recommendedFor: ["video"],
    level: ["enthusiast", "professional"],
    description: "高品质机载麦克风，显著提升视频录音质量",
    features: [
      "超心形指向性收音",
      "内置电池，续航100小时",
      "数字开关控制",
      "遮风罩设计",
      "安全通道录制"
    ],
    imageUrl: "/images/accessories/rode-videomic.jpg"
  }
];

// 预设套件数据
const presetKits = [
  {
    id: "portrait-kit",
    name: "人像摄影套件",
    description: "适合专业人像摄影的完整配件套装",
    level: "professional",
    price: 6599,
    image: "/images/accessories/portrait-kit.jpg",
    items: [
      "神牛 V1 圆头闪光灯",
      "神牛 SL-60W LED灯",
      "曼富图 MT055XPRO3三脚架",
      "NiSi V6 滤镜系统套装",
      "PeakDesign 旅行者背包"
    ],
    styles: ["portrait", "studio"]
  },
  {
    id: "landscape-kit",
    name: "风景摄影套件",
    description: "专为风景摄影师设计的便携配件组合",
    level: "enthusiast",
    price: 4899,
    image: "/images/accessories/landscape-kit.jpg",
    items: [
      "碳云 CT-5C 三脚架",
      "NiSi V6 滤镜系统套装",
      "PeakDesign 旅行者背包",
      "SanDisk Extreme Pro SD卡"
    ],
    styles: ["landscape", "travel"]
  },
  {
    id: "vlogger-kit",
    name: "视频创作者套件",
    description: "为Vlogger和视频内容创作者优化的配件组合",
    level: "enthusiast",
    price: 5599,
    image: "/images/accessories/vlog-kit.jpg",
    items: [
      "RODE VideoMic Pro+",
      "DJI RS 2云台",
      "神牛 SL-60W LED灯",
      "PeakDesign 旅行者背包"
    ],
    styles: ["video", "travel"]
  },
  {
    id: "beginner-kit",
    name: "摄影入门套件",
    description: "为初学者提供的实用且经济的配件组合",
    level: "beginner",
    price: 2999,
    image: "/images/accessories/beginner-kit.jpg",
    items: [
      "思锐 T-2205X 三脚架",
      "Godox TT350 闪光灯",
      "相机基础清洁套装",
      "入门级相机包"
    ],
    styles: ["portrait", "landscape", "travel"]
  }
];

export function AccessoryPlannerModule() {
  const [cameraSystem, setCameraSystem] = useState<CameraSystem>("sony");
  const [photographyLevel, setPhotographyLevel] = useState<PhotographyLevel>("enthusiast");
  const [photographyStyles, setPhotographyStyles] = useState<PhotographyStyle[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<AccessoryType[]>([]);
  const [budgetLimit, setBudgetLimit] = useState<number>(5000);
  const [activeTab, setActiveTab] = useState<"kits" | "essentials" | "custom">("kits");
  const [selectedKit, setSelectedKit] = useState<(typeof presetKits)[0] | null>(null);
  
  // 相机系统选项
  const cameraSystems: { id: CameraSystem; label: string; image?: string }[] = [
    { id: "sony", label: "索尼 (Sony)" },
    { id: "canon", label: "佳能 (Canon)" },
    { id: "nikon", label: "尼康 (Nikon)" },
    { id: "fujifilm", label: "富士 (Fujifilm)" },
    { id: "panasonic", label: "松下 (Panasonic)" },
    { id: "olympus", label: "奥林巴斯 (Olympus)" },
  ];

  // 摄影水平选项
  const photographyLevels: { id: PhotographyLevel; label: string; description: string }[] = [
    { id: "beginner", label: "初学者", description: "刚入门摄影，了解基本操作" },
    { id: "enthusiast", label: "爱好者", description: "有一定经验，追求更好的摄影效果" },
    { id: "professional", label: "专业级", description: "专业摄影师或有较高要求的用户" },
  ];

  // 摄影风格选项
  const photographyStyleOptions: { id: PhotographyStyle; label: string; icon: string }[] = [
    { id: "portrait", label: "人像摄影", icon: "👤" },
    { id: "landscape", label: "风景摄影", icon: "🏞️" },
    { id: "wildlife", label: "野生动物摄影", icon: "🦁" },
    { id: "street", label: "街头摄影", icon: "🏙️" },
    { id: "studio", label: "棚拍摄影", icon: "🎬" },
    { id: "sports", label: "运动摄影", icon: "🏃" },
    { id: "travel", label: "旅行摄影", icon: "✈️" },
    { id: "video", label: "视频拍摄", icon: "📹" },
  ];

  // 配件类型选项
  const accessoryTypesOptions: { id: AccessoryType; label: string; icon: string }[] = [
    { id: "tripod", label: "三脚架", icon: "🔱" },
    { id: "flash", label: "闪光灯", icon: "⚡" },
    { id: "filter", label: "滤镜", icon: "🔎" },
    { id: "bag", label: "相机包", icon: "🎒" },
    { id: "memory-card", label: "存储卡", icon: "💾" },
    { id: "lighting", label: "灯光设备", icon: "💡" },
    { id: "remote", label: "遥控器", icon: "🎮" },
    { id: "gimbal", label: "稳定器", icon: "🎥" },
    { id: "microphone", label: "麦克风", icon: "🎤" },
    { id: "battery", label: "电池/电源", icon: "🔋" },
  ];

  // 必备配件列表（根据摄影风格推荐）
  const getEssentialAccessories = () => {
    const essentials: { type: AccessoryType; reason: string }[] = [
      { type: "memory-card", reason: "每位摄影师的必备品，确保有足够的存储空间" },
      { type: "bag", reason: "保护设备并便于携带是首要考虑的事项" }
    ];

    // 根据摄影风格添加必备配件
    if (photographyStyles.includes("landscape")) {
      essentials.push({ type: "tripod", reason: "风景摄影中获得清晰稳定画面的必备工具" });
      essentials.push({ type: "filter", reason: "用于控制光线、平衡曝光和创意效果" });
    }

    if (photographyStyles.includes("portrait")) {
      essentials.push({ type: "flash", reason: "改善人像光线和提供创意照明的关键工具" });
    }

    if (photographyStyles.includes("video")) {
      essentials.push({ type: "gimbal", reason: "实现流畅专业视频效果的稳定设备" });
      essentials.push({ type: "microphone", reason: "高质量录音是专业视频的重要组成部分" });
    }

    return essentials;
  };

  // 切换摄影风格
  const togglePhotographyStyle = (style: PhotographyStyle) => {
    if (photographyStyles.includes(style)) {
      setPhotographyStyles(photographyStyles.filter(s => s !== style));
    } else {
      setPhotographyStyles([...photographyStyles, style]);
    }
  };

  // 切换配件类型
  const toggleAccessoryType = (type: AccessoryType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // 筛选配件
  const filterAccessories = () => {
    return accessoriesData.filter(accessory => {
      // 系统兼容性筛选
      if (!accessory.compatibleSystems.includes(cameraSystem)) return false;
      
      // 摄影水平筛选
      if (!accessory.level.includes(photographyLevel)) return false;
      
      // 配件类型筛选
      if (selectedTypes.length > 0 && !selectedTypes.includes(accessory.type)) return false;

      // 预算筛选
      if (accessory.price > budgetLimit) return false;
      
      // 摄影风格推荐
      if (photographyStyles.length > 0 && 
          !accessory.recommendedFor.some(style => photographyStyles.includes(style as PhotographyStyle))) {
        return false;
      }
      
      return true;
    });
  };

  // 渲染预设套件选择
  const renderKitSelection = () => {
    const filteredKits = presetKits.filter(kit => {
      // 筛选相应级别的套件
      if (kit.level !== photographyLevel) return false;
      
      // 如果选择了拍摄风格，确保至少匹配一种
      if (photographyStyles.length > 0) {
        const hasMatchingStyle = photographyStyles.some(style => 
          kit.styles.includes(style as any)
        );
        if (!hasMatchingStyle) return false;
      }
      
      return true;
    });

    return (
      <div className="space-y-6">
        <p className="text-muted-foreground mb-4">
          根据您的相机系统和拍摄风格，我们推荐以下预设配件套件。点击套件卡片查看详情。
        </p>

        {filteredKits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredKits.map(kit => (
              <div
                key={kit.id}
                onClick={() => setSelectedKit(kit)}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer hover:border-primary"
              >
                <div className="h-40 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center">
                  <div className="text-5xl">📷</div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold">{kit.name}</h4>
                    <span className="font-medium">¥{kit.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{kit.description}</p>
                  
                  <div className="mt-2">
                    <h5 className="text-sm font-medium mb-1">包含配件:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                      {kit.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {kit.styles.map((style) => (
                      <span key={style} className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                        {photographyStyleOptions.find(opt => opt.id === style)?.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 text-center">
            <p className="text-yellow-800 dark:text-yellow-200">
              没有找到符合您当前选择的预设套件。请尝试选择不同的摄影风格或更改摄影水平。
            </p>
            <button 
              onClick={() => setActiveTab("custom")}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
            >
              转到自定义配件选择
            </button>
          </div>
        )}

        {/* 套件详情弹窗 */}
        {selectedKit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{selectedKit.name}</h3>
                  <button 
                    onClick={() => setSelectedKit(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="h-60 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <div className="text-6xl">📷</div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">套件价格:</span>
                        <span className="font-bold">¥{selectedKit.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">适合级别:</span>
                        <span>{photographyLevels.find(l => l.id === selectedKit.level)?.label}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">套件描述</h4>
                    <p className="text-muted-foreground mb-4">{selectedKit.description}</p>
                    
                    <h4 className="font-medium mb-2">包含配件</h4>
                    <ul className="space-y-2 mb-4">
                      {selectedKit.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="font-medium mb-2">适合拍摄风格</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedKit.styles.map((style) => (
                        <span key={style} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {photographyStyleOptions.find(opt => opt.id === style)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <button 
                    onClick={() => setSelectedKit(null)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium"
                  >
                    关闭
                  </button>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
                    查看购买链接
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 渲染必备配件
  const renderEssentials = () => {
    const essentials = getEssentialAccessories();

    return (
      <div className="space-y-6">
        <p className="text-muted-foreground mb-4">
          根据您选择的{photographyStyles.length > 0 ? photographyStyles.map(s => 
            photographyStyleOptions.find(o => o.id === s)?.label).join("、") : "摄影风格"}，
          以下是我们推荐的必备配件。
        </p>

        {photographyStyles.length === 0 ? (
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <p className="text-amber-700 dark:text-amber-400 text-sm">
              请先在上方选择至少一种摄影风格，以获取针对性的配件推荐。
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {essentials.map((essential, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {accessoryTypesOptions.find(opt => opt.id === essential.type)?.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {accessoryTypesOptions.find(opt => opt.id === essential.type)?.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">{essential.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">推荐产品</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filterAccessories()
              .filter(acc => essentials.some(ess => ess.type === acc.type))
              .slice(0, 4)
              .map((accessory, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {accessoryTypesOptions.find(opt => opt.id === accessory.type)?.label}
                    </span>
                    <h4 className="text-base font-semibold mt-2">{accessory.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{accessory.description}</p>
                    <p className="font-medium mt-2">¥{accessory.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  // 渲染自定义配件选择
  const renderCustomSelection = () => {
    const filteredAccessories = filterAccessories();

    return (
      <div className="space-y-6">
        <p className="text-muted-foreground mb-4">
          根据您的相机系统、预算和需求，为您推荐以下配件。使用筛选器进一步缩小选择范围。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccessories.length > 0 ? (
            filteredAccessories.map((accessory, index) => (
              <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center">
                  <div className="text-3xl">
                    {accessoryTypesOptions.find(opt => opt.id === accessory.type)?.icon}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {accessoryTypesOptions.find(opt => opt.id === accessory.type)?.label}
                    </span>
                    <span className="font-medium">¥{accessory.price}</span>
                  </div>
                  <h4 className="text-base font-semibold mt-2">{accessory.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{accessory.description}</p>
                  
                  <div className="mt-3">
                    <h5 className="text-sm font-medium mb-1">特性:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                      {accessory.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {accessory.recommendedFor.map((style) => (
                      <span key={style} className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                        {photographyStyleOptions.find(opt => opt.id === style)?.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-lg text-muted-foreground">
                没有找到符合当前筛选条件的配件。请尝试调整您的筛选条件。
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">配件与系统规划</h2>
        <p className="text-muted-foreground mb-8">
          根据您的拍摄需求和设备系统，推荐合适的配件组合，帮助您构建完整高效的摄影系统。
        </p>

        {/* 用户偏好设置 */}
        <div className="space-y-6 mb-10">
          {/* 相机系统选择 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">您使用的相机系统是？</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cameraSystems.map((system) => (
                <button
                  key={system.id}
                  onClick={() => setCameraSystem(system.id)}
                  className={`p-3 rounded-lg border transition-colors ${
                    cameraSystem === system.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="font-medium">{system.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 摄影水平 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">您的摄影水平是？</h3>
            <div className="grid grid-cols-3 gap-3">
              {photographyLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setPhotographyLevel(level.id)}
                  className={`p-3 rounded-lg border transition-colors ${
                    photographyLevel === level.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-medium">{level.label}</div>
                  <div className="text-xs text-muted-foreground">{level.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 摄影风格选择 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">您的摄影风格是？ <span className="text-sm font-normal text-muted-foreground">（可多选）</span></h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {photographyStyleOptions.map((style) => (
                <button
                  key={style.id}
                  onClick={() => togglePhotographyStyle(style.id)}
                  className={`p-3 rounded-lg border transition-colors ${
                    photographyStyles.includes(style.id)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-xl mb-1">{style.icon}</div>
                  <div className="font-medium">{style.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 预算滑块 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">配件预算范围</h3>
            <input
              type="range"
              min="500"
              max="10000"
              step="500"
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-sm mt-1">
              <span>¥500</span>
              <span className="font-medium">¥{budgetLimit}</span>
              <span>¥10,000+</span>
            </div>
          </div>

          {/* 配件类型选择 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">配件类型 <span className="text-sm font-normal text-muted-foreground">（可多选，不选则显示所有类型）</span></h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {accessoryTypesOptions.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleAccessoryType(type.id)}
                  className={`p-3 rounded-lg border transition-colors ${
                    selectedTypes.includes(type.id)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-xl mb-1">{type.icon}</div>
                  <div className="font-medium text-sm">{type.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 标签页导航 */}
        <div className="border-b mb-6">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab("kits")}
              className={`py-3 border-b-2 font-medium transition-colors ${
                activeTab === "kits"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              预设套件
            </button>
            <button
              onClick={() => setActiveTab("essentials")}
              className={`py-3 border-b-2 font-medium transition-colors ${
                activeTab === "essentials"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              必备配件
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`py-3 border-b-2 font-medium transition-colors ${
                activeTab === "custom"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              自定义选择
            </button>
          </div>
        </div>

        {/* 标签内容区域 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "kits" && renderKitSelection()}
          {activeTab === "essentials" && renderEssentials()}
          {activeTab === "custom" && renderCustomSelection()}
        </motion.div>
      </section>
    </div>
  );
} 