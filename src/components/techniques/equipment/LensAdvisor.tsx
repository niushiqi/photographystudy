"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type CameraMount = "sony-e" | "canon-rf" | "nikon-z" | "fuji-x" | "m43";
type LensType = "prime" | "zoom" | "wide" | "standard" | "telephoto" | "macro";
type UseCase = "portrait" | "landscape" | "travel" | "sports" | "macro" | "street" | "video";
type Priority = "sharpness" | "bokeh" | "size" | "weight" | "weather-sealing" | "price" | "versatility" | "low-light";

interface Lens {
  id: string;
  name: string;
  mount: CameraMount;
  type: LensType;
  focalLength: string;
  aperture: string;
  price: number;
  weight: number;
  weather: boolean;
  stabilization: boolean;
  imageUrl: string;
  ratings: {
    sharpness: number;
    bokeh: number;
    build: number;
    handling: number;
    value: number;
  };
  goodFor: UseCase[];
  pros: string[];
  cons: string[];
}

// 模拟镜头数据
const lensData: Lens[] = [
  {
    id: "sony-2470gm2",
    name: "Sony FE 24-70mm f/2.8 GM II",
    mount: "sony-e",
    type: "zoom",
    focalLength: "24-70mm",
    aperture: "f/2.8",
    price: 15999,
    weight: 695,
    weather: true,
    stabilization: false,
    imageUrl: "/images/gear/sony-2470gm2.jpg",
    ratings: {
      sharpness: 9,
      bokeh: 8,
      build: 9,
      handling: 8,
      value: 7
    },
    goodFor: ["portrait", "landscape", "travel", "street", "video"],
    pros: ["卓越的锐度", "快速的自动对焦", "优质的构造", "轻量化设计"],
    cons: ["价格昂贵", "没有光学防抖", "部分焦段暗角明显"]
  },
  {
    id: "sigma-85dg",
    name: "Sigma 85mm f/1.4 DG DN Art",
    mount: "sony-e",
    type: "prime",
    focalLength: "85mm",
    aperture: "f/1.4",
    price: 7999,
    weight: 630,
    weather: true,
    stabilization: false,
    imageUrl: "/images/gear/sigma-85dg.jpg",
    ratings: {
      sharpness: 9,
      bokeh: 10,
      build: 8,
      handling: 8,
      value: 9
    },
    goodFor: ["portrait"],
    pros: ["令人惊艳的锐度", "梦幻般的散景", "优秀的色彩表现", "价格相对合理"],
    cons: ["体积较大", "没有光学防抖", "自动对焦速度中等"]
  },
  {
    id: "tamron-2875",
    name: "腾龙 28-75mm f/2.8 Di III VXD G2",
    mount: "sony-e",
    type: "zoom",
    focalLength: "28-75mm",
    aperture: "f/2.8",
    price: 5999,
    weight: 540,
    weather: true,
    stabilization: false,
    imageUrl: "/images/gear/tamron-2875.jpg",
    ratings: {
      sharpness: 8,
      bokeh: 7,
      build: 7,
      handling: 8,
      value: 10
    },
    goodFor: ["portrait", "landscape", "travel", "street", "video"],
    pros: ["卓越的性价比", "轻量紧凑", "良好的光学素质", "快速的自动对焦"],
    cons: ["构造感不如一线品牌", "焦距范围稍窄", "防尘防滴不如高端镜头"]
  },
  {
    id: "sony-70200gm2",
    name: "Sony FE 70-200mm f/2.8 GM OSS II",
    mount: "sony-e",
    type: "telephoto",
    focalLength: "70-200mm",
    aperture: "f/2.8",
    price: 17999,
    weight: 1045,
    weather: true,
    stabilization: true,
    imageUrl: "/images/gear/sony-70200gm2.jpg",
    ratings: {
      sharpness: 10,
      bokeh: 9,
      build: 10,
      handling: 8,
      value: 7
    },
    goodFor: ["portrait", "sports", "landscape"],
    pros: ["顶级的锐度", "出色的对焦速度", "有效的防抖", "优秀的散景"],
    cons: ["价格昂贵", "体积重量大", "携带不便"]
  },
];

// 焦距预设，用于焦距模拟
const focalLengthPresets = [
  { value: 16, label: "16mm (超广角)" },
  { value: 24, label: "24mm (广角)" },
  { value: 35, label: "35mm (中广角)" },
  { value: 50, label: "50mm (标准)" },
  { value: 85, label: "85mm (短焦人像)" },
  { value: 135, label: "135mm (中长焦)" },
  { value: 200, label: "200mm (长焦)" },
];

export function LensAdvisorModule() {
  const [selectedMount, setSelectedMount] = useState<CameraMount>("sony-e");
  const [selectedLensType, setSelectedLensType] = useState<LensType | "all">("all");
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | "all">("all");
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  
  const [activeTool, setActiveTool] = useState<"focal-simulator" | "lens-finder" | "sample-comparison">("focal-simulator");
  const [currentFocalLength, setCurrentFocalLength] = useState(50);

  // 镜头筛选函数
  const filterLenses = () => {
    return lensData.filter(lens => {
      // 卡口筛选
      if (selectedMount !== lens.mount) return false;
      
      // 镜头类型筛选
      if (selectedLensType !== "all" && lens.type !== selectedLensType) return false;
      
      // 使用场景筛选
      if (selectedUseCase !== "all" && !lens.goodFor.includes(selectedUseCase)) return false;
      
      // 价格范围筛选
      if (lens.price < priceRange[0] || lens.price > priceRange[1]) return false;
      
      return true;
    });
  };

  // 基于优先级排序镜头
  const sortLensesByPriority = (lenses: Lens[]) => {
    if (selectedPriorities.length === 0) return lenses;
    
    return [...lenses].sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      
      for (const priority of selectedPriorities) {
        if (priority === "sharpness") {
          scoreA += a.ratings.sharpness * 2;
          scoreB += b.ratings.sharpness * 2;
        } else if (priority === "bokeh") {
          scoreA += a.ratings.bokeh * 2;
          scoreB += b.ratings.bokeh * 2;
        } else if (priority === "size" || priority === "weight") {
          // 重量越轻得分越高
          scoreA += (2000 - a.weight) / 100;
          scoreB += (2000 - b.weight) / 100;
        } else if (priority === "weather-sealing") {
          scoreA += a.weather ? 10 : 0;
          scoreB += b.weather ? 10 : 0;
        } else if (priority === "price") {
          // 价格越低得分越高
          scoreA += (20000 - a.price) / 1000;
          scoreB += (20000 - b.price) / 1000;
        } else if (priority === "versatility") {
          // 变焦镜头和适用场景多的镜头得分高
          scoreA += a.type === "zoom" ? 10 : 0;
          scoreB += b.type === "zoom" ? 10 : 0;
          scoreA += a.goodFor.length * 2;
          scoreB += b.goodFor.length * 2;
        } else if (priority === "low-light") {
          // 光圈越大越好
          const apertureA = parseFloat(a.aperture.replace("f/", ""));
          const apertureB = parseFloat(b.aperture.replace("f/", ""));
          scoreA += (1 / apertureA) * 10;
          scoreB += (1 / apertureB) * 10;
        }
      }
      
      return scoreB - scoreA; // 降序排列
    });
  };

  // 渲染焦距模拟器
  const renderFocalLengthSimulator = () => {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">焦距视觉模拟器</h3>
          <p className="text-muted-foreground mb-4">
            直观体验不同焦距下的视角和透视效果，帮助您选择适合拍摄需求的镜头。
          </p>
          
          {/* 焦距选择控制器 */}
          <div className="mb-8 space-y-4">
            <h4 className="font-medium">选择焦距:</h4>
            
            {/* 焦距预设按钮 */}
            <div className="flex flex-wrap gap-2">
              {focalLengthPresets.map(preset => (
                <button
                  key={preset.value}
                  onClick={() => setCurrentFocalLength(preset.value)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    currentFocalLength === preset.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            
            {/* 焦距滑块 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>广角</span>
                <span>长焦</span>
              </div>
              <input
                type="range"
                min="16"
                max="200"
                step="1"
                value={currentFocalLength}
                onChange={(e) => setCurrentFocalLength(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center font-medium">
                当前焦距: {currentFocalLength}mm
              </div>
            </div>
          </div>
          
          {/* 视觉效果展示 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 font-medium">
              {currentFocalLength}mm 焦距效果
            </div>
            <div className="relative">
              {/* 实际项目中应根据焦距显示不同图像 */}
              <div className="h-80 bg-slate-200 dark:bg-slate-700 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl mb-4">🔭</span>
                  <span className="text-muted-foreground">
                    {currentFocalLength < 28 ? "广角视角" : 
                     currentFocalLength < 50 ? "中广角视角" :
                     currentFocalLength < 85 ? "标准视角" :
                     currentFocalLength < 135 ? "中长焦视角" : "长焦视角"}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                <div className="text-sm">
                  {currentFocalLength < 35 && "广角镜头：视野宽广，强调空间感和透视效果，适合风景和建筑摄影"}
                  {currentFocalLength >= 35 && currentFocalLength < 70 && "标准镜头：最接近人眼视角，自然的透视效果，适合日常和街头摄影"}
                  {currentFocalLength >= 70 && currentFocalLength < 135 && "中长焦镜头：适度压缩透视，突出主体，是人像摄影的理想选择"}
                  {currentFocalLength >= 135 && "长焦镜头：显著压缩透视效果，拉近远距离主体，适合野生动物和体育摄影"}
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 text-sm">
              <h4 className="font-medium mb-2">透视效果特点:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 视角宽度: {
                  currentFocalLength < 28 ? "非常宽" : 
                  currentFocalLength < 50 ? "较宽" :
                  currentFocalLength < 85 ? "中等" :
                  currentFocalLength < 135 ? "较窄" : "非常窄"
                }</li>
                <li>• 透视压缩: {
                  currentFocalLength < 35 ? "夸张的透视效果" : 
                  currentFocalLength < 70 ? "自然的透视效果" :
                  currentFocalLength < 135 ? "轻度压缩透视" : "强烈压缩透视"
                }</li>
                <li>• 散景效果: {
                  currentFocalLength < 50 ? "较难获得浅景深" : 
                  currentFocalLength < 85 ? "中等景深控制" : "容易获得浅景深和柔美散景"
                }</li>
                <li>• 最佳用途: {
                  currentFocalLength < 28 ? "风景、建筑、室内空间" : 
                  currentFocalLength < 50 ? "环境人像、街头摄影" :
                  currentFocalLength < 85 ? "半身人像、产品" :
                  currentFocalLength < 135 ? "特写人像" : "野生动物、体育、远距离主体"
                }</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">摄影师提示</h4>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            选择焦距时，考虑您拍摄的主要题材。人像摄影通常使用85-135mm获得讨喜的透视效果和漂亮的背景虚化。
            风景摄影则常用16-35mm来捕捉宽阔视野。街头摄影中28-50mm焦段可以提供自然视角和良好的机动性。
          </p>
        </div>
      </div>
    );
  };

  // 渲染镜头查找器
  const renderLensFinder = () => {
    const filteredLenses = filterLenses();
    const sortedLenses = sortLensesByPriority(filteredLenses);
    
    const mountOptions: {id: CameraMount; label: string}[] = [
      { id: "sony-e", label: "索尼 E卡口" },
      { id: "canon-rf", label: "佳能 RF卡口" },
      { id: "nikon-z", label: "尼康 Z卡口" },
      { id: "fuji-x", label: "富士 X卡口" },
      { id: "m43", label: "M4/3卡口" }
    ];
    
    const lensTypeOptions: {id: LensType | "all"; label: string}[] = [
      { id: "all", label: "所有类型" },
      { id: "prime", label: "定焦镜头" },
      { id: "zoom", label: "变焦镜头" },
      { id: "wide", label: "广角镜头" },
      { id: "standard", label: "标准镜头" },
      { id: "telephoto", label: "长焦镜头" },
      { id: "macro", label: "微距镜头" }
    ];
    
    const useCaseOptions: {id: UseCase | "all"; label: string}[] = [
      { id: "all", label: "所有场景" },
      { id: "portrait", label: "人像摄影" },
      { id: "landscape", label: "风景摄影" },
      { id: "travel", label: "旅行摄影" },
      { id: "sports", label: "运动摄影" },
      { id: "macro", label: "微距摄影" },
      { id: "street", label: "街头摄影" },
      { id: "video", label: "视频拍摄" }
    ];
    
    const priorityOptions: {id: Priority; label: string}[] = [
      { id: "sharpness", label: "锐度" },
      { id: "bokeh", label: "散景质量" },
      { id: "size", label: "体积" },
      { id: "weight", label: "重量" },
      { id: "weather-sealing", label: "防尘防水" },
      { id: "price", label: "价格" },
      { id: "versatility", label: "多功能性" },
      { id: "low-light", label: "低光性能" }
    ];
    
    const togglePriority = (priority: Priority) => {
      if (selectedPriorities.includes(priority)) {
        setSelectedPriorities(selectedPriorities.filter(p => p !== priority));
      } else if (selectedPriorities.length < 3) {
        setSelectedPriorities([...selectedPriorities, priority]);
      }
    };
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">镜头查找器</h3>
          <p className="text-muted-foreground mb-6">
            根据您的相机系统、拍摄需求和预算查找最适合的镜头。
          </p>
          
          {/* 筛选条件 */}
          <div className="space-y-6 mb-8">
            {/* 卡口选择 */}
            <div>
              <h4 className="font-medium mb-2">相机卡口:</h4>
              <div className="flex flex-wrap gap-2">
                {mountOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedMount(option.id)}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      selectedMount === option.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 镜头类型 */}
            <div>
              <h4 className="font-medium mb-2">镜头类型:</h4>
              <div className="flex flex-wrap gap-2">
                {lensTypeOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedLensType(option.id)}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      selectedLensType === option.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 使用场景 */}
            <div>
              <h4 className="font-medium mb-2">主要用途:</h4>
              <div className="flex flex-wrap gap-2">
                {useCaseOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedUseCase(option.id)}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      selectedUseCase === option.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 优先考虑 */}
            <div>
              <h4 className="font-medium mb-2">优先考虑: <span className="text-sm font-normal text-muted-foreground">（最多3项）</span></h4>
              <div className="flex flex-wrap gap-2">
                {priorityOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => togglePriority(option.id)}
                    disabled={!selectedPriorities.includes(option.id) && selectedPriorities.length >= 3}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      selectedPriorities.includes(option.id)
                        ? "bg-primary text-primary-foreground"
                        : selectedPriorities.length >= 3 && !selectedPriorities.includes(option.id)
                        ? "bg-secondary opacity-50 cursor-not-allowed"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 价格范围 */}
            <div>
              <h4 className="font-medium mb-2">价格范围: <span className="text-muted-foreground">¥{priceRange[0].toLocaleString()} - ¥{priceRange[1].toLocaleString()}</span></h4>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          {/* 结果展示 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">推荐镜头 ({sortedLenses.length})</h3>
              {selectedPriorities.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  按{selectedPriorities.map(p => 
                    priorityOptions.find(o => o.id === p)?.label
                  ).join("、")}排序
                </div>
              )}
            </div>
            
            {sortedLenses.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <p className="text-muted-foreground">没有符合条件的镜头，请尝试调整筛选条件</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedLenses.map(lens => (
                  <div key={lens.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      {/* 镜头图片 */}
                      <div className="md:w-1/4 h-48 md:h-auto bg-slate-200 dark:bg-slate-700 relative">
                        {/* 实际项目中应使用真实图片 */}
                        <div className="absolute inset-0 flex items-center justify-center text-4xl">
                          🔭
                        </div>
                        {/*<Image 
                          src={lens.imageUrl} 
                          alt={lens.name} 
                          fill 
                          className="object-cover"
                        />*/}
                      </div>
                      
                      {/* 镜头信息 */}
                      <div className="p-4 md:w-3/4">
                        <div className="flex flex-wrap justify-between mb-2">
                          <h4 className="text-lg font-semibold">{lens.name}</h4>
                          <span className="font-bold text-primary">¥{lens.price.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {lens.focalLength}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {lens.aperture}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                            {lens.weight}g
                          </span>
                          {lens.weather && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                              防尘防水
                            </span>
                          )}
                          {lens.stabilization && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                              光学防抖
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <h5 className="text-sm font-medium mb-1">优点</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {lens.pros.map((pro, index) => (
                                <li key={index} className="flex items-start">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                  </svg>
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium mb-1">缺点</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {lens.cons.map((con, index) => (
                                <li key={index} className="flex items-start">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500 mr-1 mt-0.5 flex-shrink-0">
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                  </svg>
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          适合:&nbsp;
                          {lens.goodFor.map((useCase, index) => (
                            <span key={useCase}>
                              {index > 0 && "、"}
                              {useCase === "portrait" ? "人像" :
                               useCase === "landscape" ? "风景" :
                               useCase === "travel" ? "旅行" :
                               useCase === "sports" ? "运动" :
                               useCase === "macro" ? "微距" :
                               useCase === "street" ? "街头" :
                               useCase === "video" ? "视频" : useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 渲染样片比较
  const renderSampleComparison = () => {
    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">镜头样片比较功能</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          此功能将在后续版本推出，敬请期待。您将能够比较不同镜头在相同场景下的成像差异。
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">镜头互动顾问</h2>
        <p className="text-muted-foreground mb-8">
          通过焦距模拟、规格对比和样片比较，帮助您了解不同镜头的特点并选择最适合您的镜头。
        </p>
        
        {/* 工具选择标签页 */}
        <div className="border-b mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTool("focal-simulator")}
              className={`pb-2 px-1 font-medium transition-colors ${
                activeTool === "focal-simulator"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              焦距模拟器
            </button>
            <button
              onClick={() => setActiveTool("lens-finder")}
              className={`pb-2 px-1 font-medium transition-colors ${
                activeTool === "lens-finder"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              镜头查找器
            </button>
            <button
              onClick={() => setActiveTool("sample-comparison")}
              className={`pb-2 px-1 font-medium transition-colors ${
                activeTool === "sample-comparison"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              样片比较
            </button>
          </div>
        </div>
        
        {/* 活动工具内容 */}
        <motion.div
          key={activeTool}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTool === "focal-simulator" && renderFocalLengthSimulator()}
          {activeTool === "lens-finder" && renderLensFinder()}
          {activeTool === "sample-comparison" && renderSampleComparison()}
        </motion.div>
      </section>
    </div>
  );
} 