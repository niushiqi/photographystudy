"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { 
  CircleDot, 
  CircleSlash, 
  BarChart, 
  Info,
  SunMedium
} from "lucide-react";

// 测光模式类型
interface MeteringMode {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  coveragePattern: string; // 覆盖图案的CSS类名
}

// 挑战场景类型
interface ChallengingScene {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  exposureOffsets: {
    [key: string]: number; // 各测光模式在此场景下的曝光补偿偏移
  };
}

// 测光模式数据
const meteringModes: MeteringMode[] = [
  {
    id: "evaluative",
    name: "评价测光",
    description: "将画面分成多个区域独立测光，并智能分析主体位置和场景类型，适合大多数场景",
    icon: <SunMedium className="h-4 w-4" />,
    coveragePattern: "metering-evaluative"
  },
  {
    id: "center-weighted",
    name: "中央重点测光",
    description: "对画面中央区域赋予更高权重，边缘区域影响较小，适合主体在中央的场景",
    icon: <CircleDot className="h-4 w-4" />,
    coveragePattern: "metering-center-weighted"
  },
  {
    id: "spot",
    name: "点测光",
    description: "仅测量画面中央非常小的区域（约2-5%），忽略其他区域，适合逆光或高对比度场景",
    icon: <CircleSlash className="h-4 w-4" />,
    coveragePattern: "metering-spot"
  },
  {
    id: "partial",
    name: "局部测光",
    description: "测量画面中央较大区域（约8-15%），是点测光的扩展版本，适合明暗对比较大的场景",
    icon: <BarChart className="h-4 w-4" />,
    coveragePattern: "metering-partial"
  }
];

// 挑战场景数据
const challengingScenes: ChallengingScene[] = [
  {
    id: "backlit",
    name: "逆光场景",
    description: "主体位于光源前，背景非常明亮的情况",
    imageSrc: "/images/techniques/metering/backlit.jpg",
    exposureOffsets: {
      "evaluative": -1.0,
      "center-weighted": -0.5,
      "spot": +1.0,
      "partial": +0.5
    }
  },
  {
    id: "snow",
    name: "雪景场景",
    description: "大面积高亮度雪景会导致相机普遍曝光不足",
    imageSrc: "/images/techniques/metering/snow.jpg",
    exposureOffsets: {
      "evaluative": -1.5,
      "center-weighted": -1.3,
      "spot": -0.3,
      "partial": -0.7
    }
  },
  {
    id: "spotlight",
    name: "聚光灯场景",
    description: "舞台、演出等黑暗背景中有明亮主体的场景",
    imageSrc: "/images/techniques/metering/spotlight.jpg",
    exposureOffsets: {
      "evaluative": -1.0,
      "center-weighted": -0.5,
      "spot": +1.5,
      "partial": +0.7
    }
  },
  {
    id: "high-contrast",
    name: "高对比度场景",
    description: "画面中同时存在明亮区域和深色阴影",
    imageSrc: "/images/techniques/metering/high-contrast.jpg",
    exposureOffsets: {
      "evaluative": -0.7,
      "center-weighted": -0.5,
      "spot": +0.7,
      "partial": +0.3
    }
  }
];

// 测光模式覆盖区域可视化组件
const MeteringCoverage = ({ mode }: { mode: MeteringMode }) => {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
      <div className="absolute inset-0 flex items-center justify-center">
        {mode.id === "evaluative" && (
          <div className="grid grid-cols-5 grid-rows-5 gap-1 w-4/5 h-4/5">
            {Array.from({ length: 25 }).map((_, i) => (
              <div 
                key={i} 
                className={`bg-primary-500 rounded-sm opacity-${
                  // 中心区域权重更高
                  (i >= 7 && i <= 9) || (i >= 12 && i <= 14) || (i >= 17 && i <= 19) ? '70' : 
                  (i >= 6 && i <= 20) ? '40' : '20'
                }`}
              />
            ))}
          </div>
        )}
        
        {mode.id === "center-weighted" && (
          <div className="relative w-4/5 h-4/5">
            <div className="absolute inset-0 bg-gradient-radial from-primary-500/70 via-primary-500/30 to-primary-500/10" />
          </div>
        )}
        
        {mode.id === "spot" && (
          <div className="relative w-4/5 h-4/5 flex items-center justify-center">
            <div className="w-[10%] h-[10%] rounded-full bg-primary-500" />
          </div>
        )}
        
        {mode.id === "partial" && (
          <div className="relative w-4/5 h-4/5 flex items-center justify-center">
            <div className="w-[18%] h-[18%] rounded-full bg-primary-500/70" />
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 inset-x-0 bg-black/50 p-2 text-center text-xs">
        {mode.name}覆盖区域
      </div>
    </div>
  );
};

// 模拟不同曝光效果的图像组件
const ExposureSimulation = ({ 
  sceneSrc,
  exposureValue
}: { 
  sceneSrc: string;
  exposureValue: number;
}) => {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-900">
      {/* 真实项目中应该使用带有曝光调整效果的图片 */}
      <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
        {/* 在此处应该放置真实图像 */}
        图像预览
        <br />
        曝光补偿: {exposureValue > 0 ? '+' : ''}{exposureValue}EV
      </div>

      {/* 模拟曝光效果的滤镜层 */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundColor: exposureValue > 0 
            ? `rgba(255, 255, 255, ${Math.min(exposureValue * 0.25, 0.75)})` 
            : `rgba(0, 0, 0, ${Math.min(Math.abs(exposureValue) * 0.25, 0.75)})` 
        }}
      />
    </div>
  );
};

// 直方图组件
const HistogramDisplay = ({ 
  meteringMode, 
  scene, 
  exposureValue
}: { 
  meteringMode: string;
  scene: string;
  exposureValue: number;
}) => {
  // 在实际应用中，这应该根据场景和测光模式生成真实的直方图数据
  const generateHistogramData = () => {
    // 模拟不同场景和测光模式下的直方图分布
    let data = Array(64).fill(0).map((_, i) => {
      // 生成基础分布
      let height = Math.sin((i + 1) / 64 * Math.PI) * 50 + 10;
      
      // 根据场景调整
      if (scene === 'backlit') {
        height = i < 32 ? height * 0.7 : height * 1.3;
      } else if (scene === 'snow') {
        height = i < 32 ? height * 0.4 : height * 1.6;
      } else if (scene === 'spotlight') {
        height = (i > 16 && i < 48) ? height * 1.2 : height * 0.5;
      } else if (scene === 'high-contrast') {
        height = (i < 16 || i > 48) ? height * 1.5 : height * 0.7;
      }
      
      // 根据测光模式微调
      if (meteringMode === 'spot') {
        height = (i > 24 && i < 40) ? height * 1.3 : height * 0.7;
      }
      
      // 根据曝光值整体偏移
      if (exposureValue > 0) {
        height = i < 32 ? height * (1 - exposureValue * 0.1) : height * (1 + exposureValue * 0.1);
      } else if (exposureValue < 0) {
        height = i < 32 ? height * (1 + Math.abs(exposureValue) * 0.1) : height * (1 - Math.abs(exposureValue) * 0.1);
      }
      
      return Math.max(5, Math.min(100, height));
    });
    
    return data;
  };
  
  const histogramData = generateHistogramData();
  
  return (
    <div className="bg-black h-44 p-4 rounded-lg">
      <div className="h-full flex items-end justify-between relative">
        {/* 直方图条形 */}
        {histogramData.map((height, i) => (
          <div 
            key={i} 
            style={{ height: `${height}%` }}
            className={`w-1 rounded-t ${
              i < 21 ? 'bg-blue-500' : 
              i < 42 ? 'bg-green-500' : 
              'bg-red-500'
            }`}
          />
        ))}
        
        {/* 区域指示器 */}
        <div className="absolute bottom-0 inset-x-0 flex justify-between text-xs text-muted-foreground">
          <span>阴影</span>
          <span>中间调</span>
          <span>高光</span>
        </div>
        
        {/* 中灰度指示线 */}
        <div className="absolute left-1/2 top-0 bottom-0 border-l border-yellow-500/50" />
        
        {/* 曝光范围指示 */}
        <div className="absolute bottom-5 left-0 right-0 h-0.5 bg-white/30" />
      </div>
    </div>
  );
};

export default function MeteringSystemExplorer() {
  const [activeTab, setActiveTab] = useState<string>("simulator");
  const [selectedMode, setSelectedMode] = useState<string>("evaluative");
  const [selectedScene, setSelectedScene] = useState<string>("backlit");
  const [exposureCompensation, setExposureCompensation] = useState<number>(0);
  
  // 获取当前选中的测光模式和场景
  const currentMode = meteringModes.find(mode => mode.id === selectedMode) || meteringModes[0];
  const currentScene = challengingScenes.find(scene => scene.id === selectedScene) || challengingScenes[0];
  
  // 计算最终曝光值 (测光模式在该场景下的偏移 + 用户设置的曝光补偿)
  const finalExposureValue = 
    (currentScene.exposureOffsets[selectedMode] || 0) + exposureCompensation;

  return (
    <div className="space-y-8">
      <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="simulator">测光模式模拟器</TabsTrigger>
          <TabsTrigger value="challenges">测光挑战场景</TabsTrigger>
          <TabsTrigger value="histogram">直方图解析</TabsTrigger>
        </TabsList>
        
        {/* 测光模式模拟器 */}
        <TabsContent value="simulator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">测光模式</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {meteringModes.map(mode => (
                  <div 
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`p-4 rounded-lg cursor-pointer border transition-all
                      ${selectedMode === mode.id 
                        ? "border-primary bg-primary-900/10" 
                        : "border-neutral-200 dark:border-neutral-800 hover:border-primary/50"}
                    `}
                  >
                    <div className="flex items-center mb-2">
                      <span className="h-8 w-8 rounded-full bg-primary-900/20 flex items-center justify-center mr-2">
                        {mode.icon}
                      </span>
                      <h4 className="font-medium">{mode.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{mode.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">什么是测光？</h4>
                <p className="text-sm text-muted-foreground">
                  测光是相机测量场景亮度以确定正确曝光参数的过程。不同测光模式使用不同方式
                  评估和计算画面中的亮度，适合不同拍摄场景。理解各种测光模式的工作原理，
                  可以帮助摄影师在复杂光线条件下仍然获得理想曝光。
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">覆盖区域可视化</h3>
              <MeteringCoverage mode={currentMode} />
              
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">模式特点与适用场景</h4>
                <p className="text-sm mb-4 text-muted-foreground">
                  {currentMode.name}：{currentMode.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {currentMode.id === "evaluative" && (
                    <>
                      <span className="px-2 py-1 bg-primary-900/20 rounded-full">通用场景</span>
                      <span className="px-2 py-1 bg-primary-900/20 rounded-full">自动模式</span>
                      <span className="px-2 py-1 bg-primary-900/20 rounded-full">初学者友好</span>
                    </>
                  )}
                  
                  {currentMode.id === "center-weighted" && (
                    <>
                      <span className="px-2 py-1 bg-primary-900/20 rounded-full">人像摄影</span>
                      <span className="px-2 py-1 bg-primary-900/20 rounded-full">产品摄影</span>
                      <span className="px-2 py-1 bg-primary-900/20 rounded-full">中心构图</span>
                    </>
                  )}
                  
                  {currentMode.id === "spot" && (
                    <>
                      <span className="px-2 py-1 bg-primary-900/20 rounded-full">逆光拍摄</span>
                      <span className="px-2 py-1 bg-primary-900/20 rounded-full">舞台摄影</span>
                      <span className="px-2 py-1 bg-primary-900/20 rounded-full">月亮等小亮点</span>
                    </>
                  )}
                  
                  {currentMode.id === "partial" && (
                    <>
                      <span className="px-2 py-1 bg-primary-900/20 rounded-full">半逆光场景</span>
                      <span className="px-2 py-1 bg-primary-900/20 rounded-full">高对比度场景</span>
                      <span className="px-2 py-1 bg-primary-900/20 rounded-full">肖像特写</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* 测光挑战场景 */}
        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">挑战场景</h3>
              
              <div className="flex flex-col gap-3">
                {challengingScenes.map(scene => (
                  <div 
                    key={scene.id}
                    onClick={() => setSelectedScene(scene.id)}
                    className={`p-3 rounded-lg cursor-pointer border transition-all
                      ${selectedScene === scene.id 
                        ? "border-primary bg-primary-900/10" 
                        : "border-neutral-200 dark:border-neutral-800 hover:border-primary/50"}
                    `}
                  >
                    <h4 className="font-medium">{scene.name}</h4>
                    <p className="text-xs text-muted-foreground">{scene.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">测光模式</h3>
                <div className="flex flex-wrap gap-2">
                  {meteringModes.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5
                        ${selectedMode === mode.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary hover:bg-secondary/80'}`}
                    >
                      {mode.icon}
                      {mode.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6 md:col-span-2">
              <h3 className="text-xl font-semibold">场景模拟</h3>
              
              <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-amber-500" />
                  <h4 className="font-medium text-sm">测光挑战说明</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  这个{currentScene.name}对于相机测光系统是个挑战，因为
                  {currentScene.id === "backlit" && "主体位于逆光中，容易被相机测为剪影"}
                  {currentScene.id === "snow" && "大面积亮白色容易导致相机曝光不足，雪变灰"}
                  {currentScene.id === "spotlight" && "明暗对比极端，难以同时保持主体和背景细节"}
                  {currentScene.id === "high-contrast" && "明暗区域细节难以同时保留，需要权衡取舍"}。
                  
                  使用{currentMode.name}在此场景下，相机可能会
                  {finalExposureValue > 0.5 ? "过度曝光" : 
                   finalExposureValue < -0.5 ? "曝光不足" : "接近正确曝光"}。
                </p>
              </div>
              
              <ExposureSimulation 
                sceneSrc={currentScene.imageSrc}
                exposureValue={finalExposureValue}
              />
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">曝光补偿</span>
                  <span className="text-sm">{exposureCompensation > 0 ? '+' : ''}{exposureCompensation} EV</span>
                </div>
                <Slider
                  min={-2}
                  max={2}
                  step={0.5}
                  value={[exposureCompensation]}
                  onValueChange={(val) => setExposureCompensation(val[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>-2 EV (暗)</span>
                  <span>0 EV</span>
                  <span>+2 EV (亮)</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">
                  相机自动计算曝光:
                </span>
                <span className={`text-sm font-semibold px-2 py-0.5 rounded ${
                  currentScene.exposureOffsets[selectedMode] > 0 
                    ? "bg-red-500/20 text-red-600 dark:text-red-400" 
                    : currentScene.exposureOffsets[selectedMode] < 0
                    ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                    : "bg-green-500/20 text-green-600 dark:text-green-400"
                }`}>
                  {currentScene.exposureOffsets[selectedMode] > 0 ? '+' : ''}
                  {currentScene.exposureOffsets[selectedMode]} EV
                </span>
              </div>
              
              <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">
                  最终曝光值:
                </span>
                <span className={`text-sm font-semibold px-2 py-0.5 rounded ${
                  finalExposureValue > 0.5 
                    ? "bg-red-500/20 text-red-600 dark:text-red-400" 
                    : finalExposureValue < -0.5
                    ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                    : "bg-green-500/20 text-green-600 dark:text-green-400"
                }`}>
                  {finalExposureValue > 0 ? '+' : ''}
                  {finalExposureValue} EV
                </span>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* 直方图解析 */}
        <TabsContent value="histogram" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">直方图解析工具</h3>
              
              <HistogramDisplay 
                meteringMode={selectedMode}
                scene={selectedScene}
                exposureValue={finalExposureValue}
              />
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {meteringModes.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`px-3 py-1 rounded-md text-sm flex items-center gap-1.5
                        ${selectedMode === mode.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary hover:bg-secondary/80'}`}
                    >
                      {mode.icon}
                      {mode.name}
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {challengingScenes.map(scene => (
                    <button
                      key={scene.id}
                      onClick={() => setSelectedScene(scene.id)}
                      className={`px-3 py-1 rounded-md text-sm
                        ${selectedScene === scene.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary hover:bg-secondary/80'}`}
                    >
                      {scene.name}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">曝光补偿</span>
                    <span className="text-sm">{exposureCompensation > 0 ? '+' : ''}{exposureCompensation} EV</span>
                  </div>
                  <Slider
                    min={-2}
                    max={2}
                    step={0.5}
                    value={[exposureCompensation]}
                    onValueChange={(val) => setExposureCompensation(val[0])}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">直方图解读</h3>
              
              <div className="bg-secondary/50 p-4 rounded-lg space-y-4">
                <h4 className="font-medium">如何读懂直方图</h4>
                <p className="text-sm text-muted-foreground">
                  直方图是图像亮度分布的图形表示，从左（黑色/阴影）到右（白色/高光）。
                  高度表示该亮度级别的像素数量。理想的曝光通常会产生一个均衡分布的直方图，
                  没有被截断的峰值。
                </p>
                
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-2 bg-secondary rounded-lg text-center">
                    <div className="w-full h-1 bg-blue-500 mb-1"></div>
                    <span className="block text-muted-foreground">阴影区域</span>
                  </div>
                  <div className="p-2 bg-secondary rounded-lg text-center">
                    <div className="w-full h-1 bg-green-500 mb-1"></div>
                    <span className="block text-muted-foreground">中间调区域</span>
                  </div>
                  <div className="p-2 bg-secondary rounded-lg text-center">
                    <div className="w-full h-1 bg-red-500 mb-1"></div>
                    <span className="block text-muted-foreground">高光区域</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-lg space-y-4">
                <h4 className="font-medium">当前直方图分析</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedScene === "backlit" && "逆光场景的直方图通常在两端都有峰值，表示明亮的背景和阴暗的主体。"}
                  {selectedScene === "snow" && "雪景直方图向右倾斜，大量像素集中在亮部区域，如果曝光不足，会导致白雪显示为灰色。"}
                  {selectedScene === "spotlight" && "聚光灯场景的直方图通常是双峰的，分别代表暗背景和亮主体。"}
                  {selectedScene === "high-contrast" && "高对比度场景的直方图跨越了大部分亮度范围，在两端都可能有截断。"}
                </p>
                
                <div className="text-sm space-y-2">
                  {finalExposureValue > 0.5 && (
                    <div className="flex items-center gap-2 text-red-500">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>高光区域有过曝风险，直方图右侧可能被截断</span>
                    </div>
                  )}
                  
                  {finalExposureValue < -0.5 && (
                    <div className="flex items-center gap-2 text-blue-500">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>阴影区域有欠曝风险，直方图左侧可能被截断</span>
                    </div>
                  )}
                  
                  {finalExposureValue >= -0.5 && finalExposureValue <= 0.5 && (
                    <div className="flex items-center gap-2 text-green-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>曝光平衡，大部分信息保留在直方图范围内</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-black/80 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">专家提示</h4>
                <ul className="text-sm space-y-2 text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>对于{currentScene.name}，推荐使用
                      {currentScene.id === "backlit" ? "点测光" : 
                       currentScene.id === "snow" ? "评价测光配合+0.7到+1.3EV补偿" : 
                       currentScene.id === "spotlight" ? "点测光或局部测光" : 
                       "评价测光配合适当曝光补偿"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>曝光补偿是测光系统不理解场景亮度时的重要调整手段</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>养成在拍摄时查看直方图的习惯，尤其是在明暗对比较大的场景</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* 知识要点模块 */}
      <div className="mt-8 bg-neutral-100 dark:bg-neutral-800/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">测光系统知识要点</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-2">曝光目标</h4>
            <p className="text-sm text-muted-foreground">
              相机测光系统的目标是将场景平均亮度测量为18%中灰（反射率）。
              这就是为什么拍摄雪景时常需要正曝光补偿，因为白雪被错误地
              测量为中灰，导致整体曝光不足。
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">测光锁定技巧</h4>
            <p className="text-sm text-muted-foreground">
              在复杂光线场景中，可以使用AE-L(曝光锁定)按钮对主体进行测光，
              然后锁定曝光值，重新构图后拍摄。这在逆光人像等情况下特别有用。
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">测光与动态范围</h4>
            <p className="text-sm text-muted-foreground">
              相机传感器的动态范围是有限的（约12-14EV），当场景亮度范围
              超出这个限度时，无论用什么测光模式都无法在单张照片中完美
              保留所有细节，此时需要考虑HDR技术或使用渐变滤镜等辅助工具。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 