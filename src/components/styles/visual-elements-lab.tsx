"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

// 定义视觉元素类型
type VisualElement = "composition" | "color" | "balance" | "contrast";

// 构图类型定义
type CompositionType = "rule-of-thirds" | "golden-ratio" | "diagonal" | "symmetrical" | "frame-within-frame";

interface CompositionExample {
  type: CompositionType;
  title: string;
  description: string;
  imageUrl: string;
  overlayPath?: string;
  principles: string[];
}

// 色彩和谐类型
type ColorHarmony = "complementary" | "analogous" | "triadic" | "monochromatic" | "split-complementary";

interface ColorExample {
  type: ColorHarmony;
  title: string;
  description: string;
  imageUrl: string;
  colors: string[];
  mood: string;
}

// 构图示例数据
const compositionExamples: CompositionExample[] = [
  {
    type: "rule-of-thirds",
    title: "三分法则",
    description: "将画面等分为九宫格，在四个交叉点或线上放置重要元素，创造平衡与视觉兴趣。",
    imageUrl: "https://images.unsplash.com/photo-1543007354-0a3ccbb6e51a",
    principles: [
      "主体位于交叉点", 
      "水平线按三分位置安排", 
      "创造视觉动态平衡"
    ],
  },
  {
    type: "golden-ratio",
    title: "黄金比例",
    description: "基于黄金螺旋的构图方式，符合自然审美法则，引导视线流动和创造和谐比例。",
    imageUrl: "https://images.unsplash.com/photo-1569040033154-49a59f9ee b4f",
    principles: [
      "螺旋中心放置主体", 
      "顺应自然生长模式", 
      "创造流畅视线路径"
    ],
  },
  {
    type: "diagonal",
    title: "对角线构图",
    description: "利用画面对角线创造动态和能量，增加画面深度和视觉流动感。",
    imageUrl: "https://images.unsplash.com/photo-1534470397273-a1c504b9d955",
    principles: [
      "对角线元素引导视线", 
      "创造动态张力", 
      "增强画面深度感"
    ],
  },
  {
    type: "symmetrical",
    title: "对称构图",
    description: "通过镜像效果创造平衡和稳定感，传达庄重、力量或宁静的情绪。",
    imageUrl: "https://images.unsplash.com/photo-1522083165195-3424ed129620",
    principles: [
      "中心轴两侧平衡", 
      "强调形式和秩序", 
      "创造庄重或宁静感"
    ],
  },
  {
    type: "frame-within-frame",
    title: "框架构图",
    description: "利用前景元素创造自然框架，引导视线进入主体，增强画面层次感。",
    imageUrl: "https://images.unsplash.com/photo-1519032045714-e9d5001b1c8f",
    principles: [
      "利用前景元素框住主体", 
      "创造画面深度", 
      "强化视觉聚焦"
    ],
  },
];

// 色彩和谐示例数据
const colorExamples: ColorExample[] = [
  {
    type: "complementary",
    title: "互补色",
    description: "使用色环中相对的两种颜色，创造强烈的对比和视觉张力。",
    imageUrl: "https://images.unsplash.com/photo-1560015534-cee980ba7e13",
    colors: ["#E63946", "#1D3557", "#F1FAEE"],
    mood: "活力、对比、戏剧化",
  },
  {
    type: "analogous",
    title: "类似色",
    description: "使用色环中相邻的颜色，创造和谐、舒适和自然的视觉感受。",
    imageUrl: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07",
    colors: ["#2A9D8F", "#1B557A", "#4ECDC4"],
    mood: "和谐、舒适、平和",
  },
  {
    type: "monochromatic",
    title: "单色调",
    description: "使用同一色相的不同明度和饱和度，营造统一、内敛的视觉效果。",
    imageUrl: "https://images.unsplash.com/photo-1553531889-56cc480ac5cb",
    colors: ["#132A13", "#31572C", "#90A955", "#ECF39E"],
    mood: "统一、内敛、精致",
  },
  {
    type: "triadic",
    title: "三色组",
    description: "使用色环上等距离的三种颜色，平衡而生动，富有活力。",
    imageUrl: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83",
    colors: ["#FF595E", "#FFCA3A", "#1982C4"],
    mood: "活力、平衡、多样化",
  },
  {
    type: "split-complementary",
    title: "分裂互补色",
    description: "使用一个基础色和其互补色两侧的颜色，创造丰富但不过分强烈的对比。",
    imageUrl: "https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1",
    colors: ["#3D5A80", "#E07A5F", "#81B29A"],
    mood: "多样、平衡、精致",
  },
];

// 视觉元素标签
const visualElements = [
  { id: "composition", label: "构图原理", description: "探索不同构图原理如何引导视线和创造画面结构" },
  { id: "color", label: "色彩和谐", description: "理解色彩关系和搭配如何影响画面情绪和表达" },
  { id: "balance", label: "视觉平衡", description: "调整画面元素的视觉重量和分布，创造平衡感" },
  { id: "contrast", label: "对比关系", description: "通过不同类型的对比增强画面表现力和吸引力" },
];

// 构图原理组件
function CompositionPrinciples() {
  const [selectedComposition, setSelectedComposition] = useState<CompositionExample>(compositionExamples[0]);
  const [showOverlay, setShowOverlay] = useState(true);
  
  return (
    <div className="space-y-6">
      {/* 构图选择 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {compositionExamples.map((comp) => (
          <div
            key={comp.type}
            onClick={() => setSelectedComposition(comp)}
            className={`p-3 rounded-lg cursor-pointer text-center transition-all ${
              selectedComposition.type === comp.type
                ? "bg-primary/20 border-2 border-primary"
                : "bg-secondary/50 border-2 border-transparent hover:border-primary/30"
            }`}
          >
            <h4 className="font-medium text-sm">{comp.title}</h4>
          </div>
        ))}
      </div>
      
      {/* 构图展示 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-lg border border-border">
            <div className="relative aspect-[4/3]">
              <Image
                src={selectedComposition.imageUrl}
                alt={selectedComposition.title}
                fill
                className="object-cover"
              />
              
              {showOverlay && selectedComposition.type === "rule-of-thirds" && (
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                  <div className="border-r border-b border-white/40"></div>
                  <div className="border-r border-b border-white/40"></div>
                  <div className="border-b border-white/40"></div>
                  <div className="border-r border-b border-white/40"></div>
                  <div className="border-r border-b border-white/40"></div>
                  <div className="border-b border-white/40"></div>
                  <div className="border-r border-white/40"></div>
                  <div className="border-r border-white/40"></div>
                  <div></div>
                </div>
              )}
              
              {showOverlay && selectedComposition.type === "golden-ratio" && (
                <div className="absolute inset-0 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M100,0 L100,38.2 L61.8,38.2 L61.8,61.8 L38.2,61.8 L38.2,100 L0,100 L0,0 Z"
                      fill="none"
                      stroke="white"
                      strokeOpacity="0.4"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M100,38.2 C100,61.8 61.8,100 38.2,100"
                      fill="none"
                      stroke="white"
                      strokeOpacity="0.4"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
              )}
              
              {showOverlay && selectedComposition.type === "diagonal" && (
                <div className="absolute inset-0 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <line 
                      x1="0" 
                      y1="0" 
                      x2="100" 
                      y2="100" 
                      stroke="white" 
                      strokeOpacity="0.4" 
                      strokeWidth="0.5" 
                    />
                    <line 
                      x1="100" 
                      y1="0" 
                      x2="0" 
                      y2="100" 
                      stroke="white" 
                      strokeOpacity="0.4" 
                      strokeWidth="0.5" 
                    />
                  </svg>
                </div>
              )}
              
              {showOverlay && selectedComposition.type === "symmetrical" && (
                <div className="absolute inset-0 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <line 
                      x1="50" 
                      y1="0" 
                      x2="50" 
                      y2="100" 
                      stroke="white" 
                      strokeOpacity="0.4" 
                      strokeWidth="0.5" 
                    />
                  </svg>
                </div>
              )}
              
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={() => setShowOverlay(!showOverlay)}
                  className="bg-black/60 hover:bg-black/80 text-white px-3 py-1 rounded-full text-xs"
                >
                  {showOverlay ? "隐藏辅助线" : "显示辅助线"}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{selectedComposition.title}</h3>
            <p className="text-muted-foreground">{selectedComposition.description}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">核心原则</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {selectedComposition.principles.map((principle, index) => (
                <li key={index}>{principle}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">运用场景</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {selectedComposition.type === "rule-of-thirds" && (
                <>
                  <li>风光摄影中放置地平线</li>
                  <li>人像摄影中安排主体位置</li>
                  <li>静物摄影中布置元素</li>
                </>
              )}
              {selectedComposition.type === "golden-ratio" && (
                <>
                  <li>自然和风景摄影</li>
                  <li>强调自然生长模式的主体</li>
                  <li>创意和艺术摄影</li>
                </>
              )}
              {selectedComposition.type === "diagonal" && (
                <>
                  <li>城市和建筑摄影</li>
                  <li>表现动态和速度感的场景</li>
                  <li>强调透视感的构图</li>
                </>
              )}
              {selectedComposition.type === "symmetrical" && (
                <>
                  <li>建筑和室内摄影</li>
                  <li>水景中的倒影</li>
                  <li>强调庄重感的人像</li>
                </>
              )}
              {selectedComposition.type === "frame-within-frame" && (
                <>
                  <li>通过窗户或拱门拍摄</li>
                  <li>用自然元素如树枝框住主体</li>
                  <li>城市或街头摄影中的空间层次</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// 色彩和谐组件
function ColorHarmony() {
  const [selectedColor, setSelectedColor] = useState<ColorExample>(colorExamples[0]);
  
  return (
    <div className="space-y-6">
      {/* 色彩和谐类型选择 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {colorExamples.map((color) => (
          <div
            key={color.type}
            onClick={() => setSelectedColor(color)}
            className={`p-3 rounded-lg cursor-pointer text-center transition-all ${
              selectedColor.type === color.type
                ? "bg-primary/20 border-2 border-primary"
                : "bg-secondary/50 border-2 border-transparent hover:border-primary/30"
            }`}
          >
            <h4 className="font-medium text-sm">{color.title}</h4>
          </div>
        ))}
      </div>
      
      {/* 色彩和谐展示 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-lg border border-border">
            <div className="relative aspect-[4/3]">
              <Image
                src={selectedColor.imageUrl}
                alt={selectedColor.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* 色彩展示 */}
          <div className="mt-4 flex space-x-2">
            {selectedColor.colors.map((color, index) => (
              <div key={index} className="flex-1">
                <div 
                  className="h-12 rounded-t-lg" 
                  style={{ backgroundColor: color }}
                ></div>
                <div className="bg-card p-2 rounded-b-lg text-center">
                  <span className="text-xs">{color}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{selectedColor.title}</h3>
            <p className="text-muted-foreground">{selectedColor.description}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">情绪表达</h4>
            <p className="text-sm">{selectedColor.mood}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">适用场景</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {selectedColor.type === "complementary" && (
                <>
                  <li>需要强烈视觉冲击的广告摄影</li>
                  <li>体育和动感主题摄影</li>
                  <li>突出主体与背景对比的场景</li>
                </>
              )}
              {selectedColor.type === "analogous" && (
                <>
                  <li>自然和风景摄影</li>
                  <li>需要和谐感的人像摄影</li>
                  <li>平和情绪的静物拍摄</li>
                </>
              )}
              {selectedColor.type === "monochromatic" && (
                <>
                  <li>极简主义摄影</li>
                  <li>高雅和精致感的时尚摄影</li>
                  <li>情绪化的肖像或风景</li>
                </>
              )}
              {selectedColor.type === "triadic" && (
                <>
                  <li>活力四射的街头摄影</li>
                  <li>儿童主题和欢快场景</li>
                  <li>创意和艺术摄影</li>
                </>
              )}
              {selectedColor.type === "split-complementary" && (
                <>
                  <li>平衡了戏剧性与和谐感的场景</li>
                  <li>时尚和生活方式摄影</li>
                  <li>品牌和产品摄影</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// 视觉平衡组件
function VisualBalance() {
  const [darkElementPosition, setDarkElementPosition] = useState(65);
  const [lightElementPosition, setLightElementPosition] = useState(35);
  const [darkElementSize, setDarkElementSize] = useState(15);
  const [lightElementSize, setLightElementSize] = useState(30);
  
  // 计算视觉平衡度（简化的模拟）
  const calculateBalance = () => {
    // 越接近50分越平衡
    const darkMoment = darkElementSize * (100 - darkElementPosition) / 100;
    const lightMoment = (lightElementSize / 2) * (lightElementPosition / 100);
    const balancePoint = (darkMoment + lightMoment) / (darkElementSize + lightElementSize / 2) * 100;
    
    const balanceScore = 100 - Math.abs(50 - balancePoint) * 2;
    return {
      score: Math.max(0, Math.min(100, balanceScore)),
      point: balancePoint,
    };
  };
  
  const balance = calculateBalance();
  
  return (
    <div className="space-y-6">
      <div className="bg-card p-6 border border-border rounded-lg">
        <h3 className="text-xl font-bold mb-4">视觉平衡实验</h3>
        <p className="mb-6 text-muted-foreground">
          调整元素的位置和大小，体验视觉平衡的原理。深色元素具有更大的视觉重量，而浅色元素视觉重量较小。
        </p>
        
        {/* 视觉平衡实验区域 */}
        <div className="relative h-48 bg-secondary/30 rounded-lg mb-6 overflow-hidden">
          {/* 视觉平衡中点指示器 */}
          <div className="absolute top-0 bottom-0 w-px bg-primary/30" style={{ left: `${balance.point}%` }}></div>
          
          {/* 暗元素 */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 bg-foreground rounded-lg transition-all duration-300"
            style={{ 
              left: `${darkElementPosition}%`, 
              transform: `translateX(-50%) translateY(-50%)`,
              width: `${darkElementSize}%`,
              aspectRatio: '1/1',
            }}
          ></div>
          
          {/* 亮元素 */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 bg-primary/30 rounded-lg transition-all duration-300"
            style={{ 
              left: `${lightElementPosition}%`, 
              transform: `translateX(-50%) translateY(-50%)`,
              width: `${lightElementSize}%`,
              aspectRatio: '1/1',
            }}
          ></div>
          
          {/* 中点线 */}
          <div className="absolute top-0 bottom-0 w-px bg-muted-foreground/30" style={{ left: '50%' }}></div>
        </div>
        
        {/* 控制面板 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">深色元素位置</label>
                <span className="text-sm text-muted-foreground">{darkElementPosition}%</span>
              </div>
              <Slider
                value={[darkElementPosition]}
                min={10}
                max={90}
                step={1}
                onValueChange={(value) => setDarkElementPosition(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">深色元素大小</label>
                <span className="text-sm text-muted-foreground">{darkElementSize}%</span>
              </div>
              <Slider
                value={[darkElementSize]}
                min={5}
                max={40}
                step={1}
                onValueChange={(value) => setDarkElementSize(value[0])}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">浅色元素位置</label>
                <span className="text-sm text-muted-foreground">{lightElementPosition}%</span>
              </div>
              <Slider
                value={[lightElementPosition]}
                min={10}
                max={90}
                step={1}
                onValueChange={(value) => setLightElementPosition(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">浅色元素大小</label>
                <span className="text-sm text-muted-foreground">{lightElementSize}%</span>
              </div>
              <Slider
                value={[lightElementSize]}
                min={5}
                max={40}
                step={1}
                onValueChange={(value) => setLightElementSize(value[0])}
              />
            </div>
          </div>
        </div>
        
        {/* 平衡度指示器 */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">视觉平衡度</span>
            <span className="text-sm text-muted-foreground">{Math.round(balance.score)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
              style={{ width: `${balance.score}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>不平衡</span>
            <span>完美平衡</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 border border-border rounded-lg">
          <h4 className="font-medium mb-3">视觉平衡原则</h4>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>深色、高饱和度和复杂的元素具有更大的视觉重量</li>
            <li>元素距离画面中心越远，视觉力矩越大</li>
            <li>大小与视觉重量成正比，但不是线性关系</li>
            <li>孤立的元素比群组元素具有更强的视觉吸引力</li>
            <li>非对称平衡通常比对称平衡更有活力和视觉趣味</li>
          </ul>
        </div>
        
        <div className="bg-card p-6 border border-border rounded-lg">
          <h4 className="font-medium mb-3">应用于摄影</h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>通过主体位置和大小创造视觉平衡</li>
            <li>利用色彩和对比度调整元素视觉重量</li>
            <li>考虑前景和背景元素的平衡关系</li>
            <li>用负空间平衡画面中的实体元素</li>
            <li>理解动态元素（如移动方向）如何影响平衡感</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// 对比关系组件
function ContrastRelations() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 色彩对比 */}
      <div className="bg-card p-6 border border-border rounded-lg">
        <h3 className="text-lg font-bold mb-3">色彩对比</h3>
        <p className="text-muted-foreground mb-4">
          通过互补色或高饱和度差异创造强烈的视觉冲击和主次关系
        </p>
        <div className="aspect-[4/3] relative overflow-hidden rounded-lg mb-3">
          <Image
            src="https://images.unsplash.com/photo-1525538182201-02cd1909effb"
            alt="色彩对比示例"
            fill
            className="object-cover"
          />
        </div>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>使用色环中相对的颜色创造张力</li>
          <li>利用冷暖色对比增强空间感</li>
          <li>考虑饱和度和明度的对比效果</li>
        </ul>
      </div>
      
      {/* 明暗对比 */}
      <div className="bg-card p-6 border border-border rounded-lg">
        <h3 className="text-lg font-bold mb-3">明暗对比</h3>
        <p className="text-muted-foreground mb-4">
          通过亮度差异创造戏剧性效果和视觉层次，引导视线和情绪
        </p>
        <div className="aspect-[4/3] relative overflow-hidden rounded-lg mb-3">
          <Image
            src="https://images.unsplash.com/photo-1470485683323-09388b77808e"
            alt="明暗对比示例"
            fill
            className="object-cover"
          />
        </div>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>创造高调或低调照片的视觉效果</li>
          <li>利用光影塑造主体和层次感</li>
          <li>使用侧光或逆光增强形体轮廓</li>
        </ul>
      </div>
      
      {/* 形态对比 */}
      <div className="bg-card p-6 border border-border rounded-lg">
        <h3 className="text-lg font-bold mb-3">形态对比</h3>
        <p className="text-muted-foreground mb-4">
          通过不同形状、线条和纹理之间的对比创造视觉韵律和兴趣点
        </p>
        <div className="aspect-[4/3] relative overflow-hidden rounded-lg mb-3">
          <Image
            src="https://images.unsplash.com/photo-1484278786775-527ac0d0b608"
            alt="形态对比示例"
            fill
            className="object-cover"
          />
        </div>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>直线与曲线的对比创造动态感</li>
          <li>规则几何形与有机形态的对比</li>
          <li>粗糙与光滑纹理的对比增强触感</li>
        </ul>
      </div>
      
      {/* 尺度对比 */}
      <div className="bg-card p-6 border border-border rounded-lg">
        <h3 className="text-lg font-bold mb-3">尺度对比</h3>
        <p className="text-muted-foreground mb-4">
          利用不同尺寸元素的对比强调主体，创造空间感和戏剧性效果
        </p>
        <div className="aspect-[4/3] relative overflow-hidden rounded-lg mb-3">
          <Image
            src="https://images.unsplash.com/photo-1465574482560-c53606f9e1c6"
            alt="尺度对比示例"
            fill
            className="object-cover"
          />
        </div>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>使用前景元素创造深度和比例感</li>
          <li>通过大小对比表现主体的重要性</li>
          <li>利用极端尺度差异产生震撼效果</li>
        </ul>
      </div>
    </div>
  );
}

export function VisualElementsLab() {
  const [selectedElement, setSelectedElement] = useState<VisualElement>("composition");
  
  return (
    <div className="space-y-8">
      {/* 视觉元素选择 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visualElements.map((element) => (
          <div
            key={element.id}
            onClick={() => setSelectedElement(element.id as VisualElement)}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedElement === element.id
                ? "bg-primary/10 border-2 border-primary"
                : "bg-secondary border-2 border-transparent hover:border-primary/40"
            }`}
          >
            <h3 className="font-medium mb-1">{element.label}</h3>
            <p className="text-xs text-muted-foreground">{element.description}</p>
          </div>
        ))}
      </div>
      
      {/* 视觉元素内容 */}
      <div>
        {selectedElement === "composition" && <CompositionPrinciples />}
        {selectedElement === "color" && <ColorHarmony />}
        {selectedElement === "balance" && <VisualBalance />}
        {selectedElement === "contrast" && <ContrastRelations />}
      </div>
    </div>
  );
} 