"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Info, Mountain, Sun, Cloud, Filter, Image, Layers } from "lucide-react";

interface LandscapeTechniquesProps {
  title: string;
}

export function LandscapeTechniques({ title }: LandscapeTechniquesProps) {
  // 选定的风景类别
  const [activeTab, setActiveTab] = useState("composition");
  
  // 风景拍摄技巧数据
  const landscapeTips = {
    composition: [
      "使用前景元素引导视线进入画面",
      "应用三分法则布局主体，平衡画面元素",
      "利用引导线（如道路、河流）创造深度感",
      "寻找自然框架（如树枝、岩石）围绕主体",
      "保持水平线水平，除非有意为之"
    ],
    lighting: [
      "利用黄金时段（日出后、日落前）的柔和光线",
      "多云天气提供均匀漫射光，减少对比度",
      "侧光能增强纹理和立体感",
      "逆光可以创造剪影和戏剧性效果",
      "使用偏振镜减少反射，增强天空和云彩"
    ],
    equipment: [
      "使用三脚架保持稳定，特别是在低光环境",
      "使用广角镜头（14-24mm）捕捉宽阔景观",
      "渐变滤镜平衡天空与前景亮度差异",
      "ND滤镜延长曝光时间，使水面丝滑",
      "使用遥控快门避免触摸相机引起的抖动"
    ]
  };

  // 常见问题
  const commonQuestions = [
    {
      question: "如何在照片中表现空间感和深度？",
      answer: "包含前景、中景和远景元素；使用引导线如道路或河流；利用透视效果；通过大气透视（远处物体较浅）增强深度；使用小光圈获得大景深。"
    },
    {
      question: "如何处理天空过亮或地面过暗的问题？",
      answer: "使用渐变滤镜平衡亮度；尝试HDR技术拍摄多张不同曝光照片；使用反光板补光阴影区域；在后期处理中选择性调整亮度；最佳拍摄时间选择在光线较为均匀的早晨或傍晚。"
    },
    {
      question: "风景摄影最适合的相机设置是什么？",
      answer: "使用小光圈（f/8-f/13）获得大景深；ISO保持低值（100-200）减少噪点；使用三脚架可以选择较低的快门速度；根据场景选择合适的白平衡；拍摄RAW格式保留更多细节以便后期处理。"
    }
  ];
  
  // 风景摄影最佳实践
  const bestPractices = [
    {
      title: "耐心等待光线",
      description: "成功的风景摄影80%是等待，20%是拍摄。耐心等待完美光线"
    },
    {
      title: "探索多种构图",
      description: "同一场景尝试不同高度、角度和焦段，发现最佳视角"
    },
    {
      title: "天气是创作伙伴",
      description: "不同天气创造不同氛围，多云、雾天、暴风雨前后都有独特魅力"
    }
  ];

  // 风景拍摄秘诀
  const photographySecrets = [
    {
      title: "清晨和傍晚拍摄",
      description: "黄金时段的光线柔和，色温偏暖，创造戏剧性氛围",
      icon: <Sun className="w-5 h-5" />
    },
    {
      title: "多云天气是宝贵资源",
      description: "云层丰富天空层次，提供自然漫射光源",
      icon: <Cloud className="w-5 h-5" />
    },
    {
      title: "注重前景元素",
      description: "强大的前景增加深度感，引导观众进入画面",
      icon: <Layers className="w-5 h-5" />
    },
    {
      title: "合理使用滤镜",
      description: "偏振镜增强蓝天，ND镜实现长曝光效果",
      icon: <Filter className="w-5 h-5" />
    }
  ];

  return (
    <div className="space-y-8">      
      {/* 风景拍摄指南 */}
      <div>
        {/* 选项卡 */}
        <div className="flex border-b border-amber-200 dark:border-amber-800/40 mb-5">
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors flex items-center",
              activeTab === "composition"
                ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-400"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
            onClick={() => setActiveTab("composition")}
          >
            <Image className="w-4 h-4 mr-1.5" />
            构图技巧
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors flex items-center",
              activeTab === "lighting"
                ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-400"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
            onClick={() => setActiveTab("lighting")}
          >
            <Sun className="w-4 h-4 mr-1.5" />
            光线控制
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors flex items-center",
              activeTab === "equipment"
                ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-400"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
            onClick={() => setActiveTab("equipment")}
          >
            <Filter className="w-4 h-4 mr-1.5" />
            器材运用
          </button>
        </div>
        
        {/* 选项卡内容 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-neutral-50 dark:bg-neutral-750 rounded-lg p-5 border border-neutral-200 dark:border-neutral-700"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/90 dark:bg-amber-600/80 text-white flex items-center justify-center mr-3">
              {activeTab === "composition" && <Image className="w-5 h-5" />}
              {activeTab === "lighting" && <Sun className="w-5 h-5" />}
              {activeTab === "equipment" && <Filter className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                {activeTab === "composition" && "风景构图原则"}
                {activeTab === "lighting" && "风景光线应用"}
                {activeTab === "equipment" && "风景摄影器材指南"}
              </h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {activeTab === "composition" && "创造有层次感和吸引力的风景画面"}
                {activeTab === "lighting" && "利用自然光线增强风景照片的戏剧效果"}
                {activeTab === "equipment" && "正确选择和使用风景摄影器材"}
              </p>
            </div>
          </div>
          
          <ul className="space-y-3 mt-5">
            {landscapeTips[activeTab as keyof typeof landscapeTips].map((tip, index) => (
              <li key={index} className="flex">
                <Check className="w-5 h-5 text-amber-600 dark:text-amber-500 mr-2 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300">{tip}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
            <h5 className="font-medium text-amber-800 dark:text-amber-300 mb-2">
              {activeTab === "composition" && "构图黄金法则"}
              {activeTab === "lighting" && "光线利用要点"}
              {activeTab === "equipment" && "器材应用精要"}
            </h5>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              {activeTab === "composition" && "风景摄影的强大构图遵循'层次原则'：确保画面包含前景、中景和远景三个明确的层次。前景提供入口点，中景展示主题，远景创造深度。这种三层构图能创造出引人入胜的立体感图像。"}
              {activeTab === "lighting" && "风景摄影的照明黄金法则是'边缘光线'原则：早晨和傍晚的侧光不仅提供温暖的色调，还能通过长阴影显著增强景观纹理和立体感。这种低角度光线能突出地形细节，大大提升照片的视觉冲击力。"}
              {activeTab === "equipment" && "风景摄影器材选择的核心原则是'稳定优先'：无论光线条件如何，稳定性都是首要考虑。高质量三脚架、快门线和防抖技术能确保即使在长曝光或微风条件下也能获得清晰锐利的图像。稳定性是所有其他技术和创意选择的基础。"}
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* 风景摄影秘诀 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {photographySecrets.map((secret, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700 flex"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/90 dark:bg-amber-600/80 text-white flex items-center justify-center mr-3 flex-shrink-0">
              {secret.icon}
            </div>
            <div>
              <h4 className="font-medium text-neutral-800 dark:text-neutral-200">
                {secret.title}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {secret.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* 参考图示 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-750 flex items-center justify-center">
            <Mountain className="w-8 h-8 text-neutral-400 dark:text-neutral-600" />
          </div>
          <div className="p-3">
            <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              三分法构图示例
            </h5>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              展示经典三分法在风景中的应用
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-750 flex items-center justify-center">
            <Mountain className="w-8 h-8 text-neutral-400 dark:text-neutral-600" />
          </div>
          <div className="p-3">
            <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              长曝光水流效果
            </h5>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              使用ND滤镜创造丝绸般水流效果
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-750 flex items-center justify-center">
            <Mountain className="w-8 h-8 text-neutral-400 dark:text-neutral-600" />
          </div>
          <div className="p-3">
            <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              黄金时段光线
            </h5>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              日出日落时的温暖光线效果展示
            </p>
          </div>
        </div>
      </div>
      
      {/* 最佳实践 */}
      <div className="bg-neutral-50 dark:bg-neutral-750 rounded-lg border border-neutral-200 dark:border-neutral-700 p-5">
        <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
          风景摄影最佳实践
        </h3>
        
        <div className="space-y-4">
          {bestPractices.map((practice, index) => (
            <div key={index} className="flex">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-medium mr-3 flex-shrink-0">
                {index + 1}
              </div>
              <div>
                <h4 className="font-medium text-neutral-800 dark:text-neutral-200">
                  {practice.title}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {practice.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 常见问题 */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
          <Info className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
          常见问题解答
        </h3>
        
        <div className="space-y-3">
          {commonQuestions.map((qa, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700"
            >
              <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                {qa.question}
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {qa.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 