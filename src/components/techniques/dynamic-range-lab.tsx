"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";

interface SceneOption {
  id: string;
  name: string;
  description: string;
  dynamicRange: number; // 以EV值计
  histogram: string; // 直方图图像路径
  image: string;     // 场景图像路径
}

// 场景选项
const SCENE_OPTIONS: SceneOption[] = [
  {
    id: "high-contrast",
    name: "高对比度场景",
    description: "明暗差异极大的场景，如室内外景同框、日落逆光等情况",
    dynamicRange: 14,
    histogram: "/images/techniques/high-contrast-histogram.svg",
    image: "/images/techniques/high-contrast-scene.jpg"
  },
  {
    id: "low-light",
    name: "低光照场景",
    description: "光线不足的场景，如夜景、室内暗光等情况",
    dynamicRange: 12,
    histogram: "/images/techniques/low-light-histogram.svg",
    image: "/images/techniques/low-light-scene.jpg"
  },
  {
    id: "standard",
    name: "标准场景",
    description: "光线均匀的常规场景，如阴天户外、柔光环境等",
    dynamicRange: 10,
    histogram: "/images/techniques/standard-histogram.svg",
    image: "/images/techniques/standard-scene.jpg"
  },
  {
    id: "backlit",
    name: "逆光场景",
    description: "主体位于强光源前的场景，如人物逆光、窗前拍摄等",
    dynamicRange: 13,
    histogram: "/images/techniques/backlit-histogram.svg",
    image: "/images/techniques/backlit-scene.jpg"
  }
];

// 模拟图片暂用替代方案
const PlaceholderImage = ({ scene, exposure }: { scene: string, exposure: number }) => (
  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
      {scene}场景 (曝光补偿: {exposure > 0 ? '+' : ''}{exposure}EV)
    </div>
    <div 
      className="absolute inset-0 bg-gradient-to-b from-transparent" 
      style={{ 
        opacity: exposure < -2 ? Math.abs(exposure + 2) * 0.2 : 0,
        background: exposure < -2 ? 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))' : 'none'
      }} 
    />
    <div 
      className="absolute inset-0 bg-gradient-to-t from-transparent" 
      style={{ 
        opacity: exposure > 2 ? (exposure - 2) * 0.2 : 0,
        background: exposure > 2 ? 'linear-gradient(to top, transparent, rgba(255,255,255,0.8))' : 'none'
      }} 
    />
  </div>
);

// 直方图组件
const Histogram = ({ scene, exposure }: { scene: string, exposure: number }) => (
  <div className="h-40 bg-secondary p-4 rounded-lg flex items-end justify-between relative">
    {/* 模拟直方图柱状图 */}
    {Array.from({ length: 24 }).map((_, i) => {
      // 模拟一个根据曝光值偏移的直方图
      let height = Math.sin((i + 1 + exposure * 3) / 24 * Math.PI) * 80 + 20;
      if (i < 6 && exposure < -1) height = height * (1 + Math.abs(exposure) * 0.2);
      if (i > 18 && exposure > 1) height = height * (1 + exposure * 0.2);
      
      return (
        <div 
          key={i} 
          className="w-1 bg-purple-500 rounded-t opacity-70"
          style={{ height: `${height}%` }}
        />
      );
    })}

    {/* 直方图区域指示 */}
    <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-muted-foreground">
      <span>阴影</span>
      <span>中间调</span>
      <span>高光</span>
    </div>

    {/* 曝光指示器 */}
    <div 
      className="absolute bottom-6 w-1 bg-red-500 h-4"
      style={{ left: `${(exposure + 5) * 7}%` }}
    />
  </div>
);

export default function DynamicRangeLab() {
  const [selectedScene, setSelectedScene] = useState<string>("high-contrast");
  const [exposureValue, setExposureValue] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("experiment");

  const currentScene = SCENE_OPTIONS.find(scene => scene.id === selectedScene) || SCENE_OPTIONS[0];

  const handleExposureChange = (value: number[]) => {
    setExposureValue(value[0]);
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="experiment" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="experiment">曝光实验室</TabsTrigger>
          <TabsTrigger value="recovery">数据恢复测试</TabsTrigger>
          <TabsTrigger value="hdr">HDR技术解析</TabsTrigger>
        </TabsList>
        
        <TabsContent value="experiment" className="space-y-6">
          {/* 场景选择部分 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {SCENE_OPTIONS.map((scene) => (
              <motion.div
                key={scene.id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedScene === scene.id 
                    ? "bg-secondary border-2 border-primary" 
                    : "bg-secondary/50 border-2 border-transparent hover:bg-secondary"
                }`}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedScene(scene.id)}
              >
                <h4 className="font-medium mb-2">{scene.name}</h4>
                <p className="text-sm text-muted-foreground">{scene.description}</p>
                <div className="mt-2 text-xs">
                  <span className="text-purple-400">动态范围: {scene.dynamicRange}EV</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 曝光调整和效果显示 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">场景预览</h3>
                <PlaceholderImage scene={currentScene.name} exposure={exposureValue} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">曝光补偿</span>
                  <span className="text-sm font-medium">{exposureValue > 0 ? '+' : ''}{exposureValue} EV</span>
                </div>
                <Slider
                  min={-5}
                  max={5}
                  step={0.5}
                  value={[exposureValue]}
                  onValueChange={handleExposureChange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>-5 EV (暗)</span>
                  <span>0 EV</span>
                  <span>+5 EV (亮)</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">直方图分析</h3>
                <Histogram scene={currentScene.name} exposure={exposureValue} />
              </div>

              <div className="bg-secondary p-4 rounded-lg">
                <h4 className="font-medium mb-2">技术解读</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {currentScene.name}的动态范围约为{currentScene.dynamicRange}EV，
                  {exposureValue < -2 && "当前曝光值过低，图像暗部细节将丢失，产生噪点。"}
                  {exposureValue > 2 && "当前曝光值过高，图像高光部分将过曝，无法恢复细节。"}
                  {exposureValue >= -2 && exposureValue <= 2 && "当前曝光值适中，可以保留大部分明暗细节。"}
                </p>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                    过曝风险区域: {Math.max(0, Math.round((exposureValue + 5) / 10 * 100))}%
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                    欠曝风险区域: {Math.max(0, Math.round((-exposureValue + 5) / 10 * 100))}%
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-secondary/50 p-6 rounded-lg mt-6">
            <h3 className="text-xl font-bold mb-4">动态范围知识点</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">什么是动态范围？</h4>
                <p className="text-sm text-muted-foreground">
                  动态范围是指相机传感器能够同时记录的最亮和最暗部分之间的光强差异。
                  通常以EV（曝光值）为单位，值越大表示能够同时记录的明暗范围越广。
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">如何理解直方图？</h4>
                <p className="text-sm text-muted-foreground">
                  直方图展示了图像中不同亮度像素的分布情况。左侧代表暗部，右侧代表亮部，
                  中间为中间调。如果曲线在任一端被截断，表示该部分细节已经丢失。
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">ETTR曝光技巧</h4>
                <p className="text-sm text-muted-foreground">
                  "向右曝光"(ETTR)是一种曝光技巧，通过将直方图尽可能推向右侧但不过曝，
                  可以在保留高光的同时最大限度地减少暗部噪点。这种技术在RAW格式拍摄时特别有效。
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recovery" className="p-6 bg-secondary/30 rounded-lg">
          <div className="text-center py-20">
            <h3 className="text-xl font-bold mb-2">数据恢复测试模块</h3>
            <p className="text-muted-foreground">
              此模块将展示不同曝光条件下过曝和欠曝区域的细节恢复能力测试。
              <br />用户可以通过调整参数，观察RAW和JPEG格式在不同条件下的数据保存与恢复差异。
            </p>
            <p className="mt-4 text-xs text-muted-foreground">演示版本中此功能暂未实现</p>
          </div>
        </TabsContent>

        <TabsContent value="hdr" className="p-6 bg-secondary/30 rounded-lg">
          <div className="text-center py-20">
            <h3 className="text-xl font-bold mb-2">HDR技术解析模块</h3>
            <p className="text-muted-foreground">
              此模块将解析高动态范围(HDR)摄影技术的原理与应用。
              <br />包括包围曝光、色调映射、HDR合成等专业技巧的交互式演示。
            </p>
            <p className="mt-4 text-xs text-muted-foreground">演示版本中此功能暂未实现</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 