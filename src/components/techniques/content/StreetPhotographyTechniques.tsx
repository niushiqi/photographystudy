"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eye, Camera, Clock, Users, Shield, Building, Watch, Map, Info, Check } from "lucide-react";

interface StreetPhotographyTechniquesProps {
  title: string;
}

export function StreetPhotographyTechniques({ title }: StreetPhotographyTechniquesProps) {
  // 选定的街拍类别
  const [activeTab, setActiveTab] = useState("approach");
  
  // 街头摄影技巧数据
  const streetTips = {
    approach: [
      "融入环境，成为场景的一部分，避免引人注意",
      "保持耐心，等待合适时机和瞬间的出现",
      "观察光线变化和人群流动的规律性",
      "提前预想画面，做好拍摄准备",
      "练习'快拍'，快速确认对焦、构图并拍摄"
    ],
    composition: [
      "寻找引人注目的几何形状和线条",
      "利用环境框架和自然隔断创造构图",
      "注意前景、中景和背景的层次关系",
      "使用并置元素创造对比和故事性",
      "尝试不同角度，如低角度或俯视角"
    ],
    legal: [
      "了解当地有关公共场所拍摄的法律规定",
      "尊重被拍摄者的隐私和权利",
      "在敏感区域拍摄前获取许可",
      "被要求时立即停止拍摄并礼貌交流",
      "考虑个人安全，避免危险区域和时段"
    ]
  };

  // 相机设置建议
  const cameraSettings = [
    {
      scenario: "繁忙街道日间拍摄",
      settings: "光圈优先模式(A/Av)，f/8，ISO 400，1/250秒以上快门速度",
      explanation: "中等光圈提供足够景深，较高快门速度冻结动作，适中ISO适应多变光线"
    },
    {
      scenario: "夜间街道与霓虹灯",
      settings: "手动模式(M)，f/2.8-4，ISO 1600-3200，1/60-1/125秒快门速度",
      explanation: "大光圈收集更多光线，高ISO增加感光度，保持足够快门速度避免抖动"
    },
    {
      scenario: "雨天街头场景",
      settings: "光圈优先模式(A/Av)，f/5.6，ISO 800，1/125秒快门速度",
      explanation: "中等设置平衡，增加ISO补偿阴天光线不足，快门速度足以捕捉雨滴"
    },
    {
      scenario: "捕捉瞬间表情",
      settings: "快门优先模式(S/Tv)，1/250秒以上，ISO自动，焦距85-135mm",
      explanation: "优先保证快门速度冻结表情，中长焦距提供舒适拍摄距离，保持自然感"
    }
  ];

  // 常见问题
  const commonQuestions = [
    {
      question: "如何克服在公共场所拍摄的紧张感？",
      answer: "从熟悉的环境开始练习；使用小巧不起眼的相机；采用'从腰部拍摄'技巧；与其他街拍摄影师结伴；逐渐增加拍摄挑战；记住大多数人忙于自己的事务，很少注意到你。"
    },
    {
      question: "如何捕捉自然、不做作的街头瞬间？",
      answer: "保持低调，避免引起注意；使用长焦镜头保持距离；预设相机参数减少调整时间；学会预判场景发展；连续拍摄抓住最佳时刻；练习'盲拍'技巧，不用取景器观察时机。"
    },
    {
      question: "街头摄影最适合的相机和镜头是什么？",
      answer: "轻便小巧的相机如无反光镜或高级紧凑型；35mm或50mm定焦镜头最为经典，视角接近人眼；避免过大过重的设备引人注目；考虑天气密封性能应对多变环境；优先选择操作快速、对焦迅速的设备。"
    }
  ];
  
  // 街头摄影大师作品风格
  const streetMasters = [
    {
      name: "亨利·卡蒂埃-布列松",
      style: "决定性瞬间",
      description: "捕捉故事性最强的关键时刻，形成完美构图"
    },
    {
      name: "薇薇安·迈尔",
      style: "坦率特写",
      description: "大胆直接的人物特写，展现真实表情和情感"
    },
    {
      name: "范·韦尔登",
      style: "闪光灯夜拍",
      description: "使用直接闪光灯捕捉城市夜生活的原始感"
    }
  ];

  return (
    <div className="space-y-8">      
      {/* 街头摄影指南 */}
      <div>
        {/* 选项卡 */}
        <div className="flex border-b border-amber-200 dark:border-amber-800/40 mb-5 overflow-x-auto">
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap flex items-center",
              activeTab === "approach"
                ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-400"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
            onClick={() => setActiveTab("approach")}
          >
            <Eye className="w-4 h-4 mr-1.5" />
            观察与方法
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap flex items-center",
              activeTab === "composition"
                ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-400"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
            onClick={() => setActiveTab("composition")}
          >
            <Camera className="w-4 h-4 mr-1.5" />
            构图技巧
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap flex items-center",
              activeTab === "legal"
                ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-400"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
            onClick={() => setActiveTab("legal")}
          >
            <Shield className="w-4 h-4 mr-1.5" />
            法律与伦理
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
              {activeTab === "approach" && <Eye className="w-5 h-5" />}
              {activeTab === "composition" && <Camera className="w-5 h-5" />}
              {activeTab === "legal" && <Shield className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                {activeTab === "approach" && "街头摄影方法论"}
                {activeTab === "composition" && "街头摄影构图"}
                {activeTab === "legal" && "法律与伦理考量"}
              </h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {activeTab === "approach" && "如何在公共场所高效地观察与捕捉瞬间"}
                {activeTab === "composition" && "为城市场景创造引人入胜的构图"}
                {activeTab === "legal" && "在尊重隐私和法律的前提下进行街头摄影"}
              </p>
            </div>
          </div>
          
          <ul className="space-y-3 mt-5">
            {streetTips[activeTab as keyof typeof streetTips].map((tip, index) => (
              <li key={index} className="flex">
                <Check className="w-5 h-5 text-amber-600 dark:text-amber-500 mr-2 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300">{tip}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
            <h5 className="font-medium text-amber-800 dark:text-amber-300 mb-2">
              {activeTab === "approach" && "决定性瞬间"}
              {activeTab === "composition" && "构图黄金法则"}
              {activeTab === "legal" && "伦理指导原则"}
            </h5>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              {activeTab === "approach" && "街头摄影的精髓在于捕捉'决定性瞬间'——当形式与内容完美结合，视觉和情感元素达到平衡的那一刻。这需要敏锐的观察力、快速反应和预判能力，是直觉和理性思考的结合。"}
              {activeTab === "composition" && "街头摄影构图的黄金法则是'层叠框架'：使用多层次元素（前景、中景、背景）创造深度，同时利用城市环境中的门框、窗户、拱门等自然框架围绕主体，引导观众视线并提供场景背景。"}
              {activeTab === "legal" && "街头摄影的伦理核心是'尊重优先'：虽然在公共场所拍摄通常是合法的，但摄影师应始终将被摄者的尊严放在首位，特别关注弱势群体，对质疑保持开放态度，必要时删除照片，避免将摄影权凌驾于他人基本尊严之上。"}
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* 相机设置建议 */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center">
            <Watch className="w-5 h-5 mr-2 text-amber-500 dark:text-amber-400" />
            街头摄影相机设置指南
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-750">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium text-neutral-800 dark:text-neutral-300 text-sm">场景</th>
                <th className="px-4 py-3 font-medium text-neutral-800 dark:text-neutral-300 text-sm">推荐设置</th>
                <th className="px-4 py-3 font-medium text-neutral-800 dark:text-neutral-300 text-sm">设置说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {cameraSettings.map((setting, index) => (
                <tr key={index} className="text-sm">
                  <td className="px-4 py-3 text-neutral-800 dark:text-neutral-300 font-medium">{setting.scenario}</td>
                  <td className="px-4 py-3 text-neutral-700 dark:text-neutral-400">{setting.settings}</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-500">{setting.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 街头摄影大师风格 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {streetMasters.map((master, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/90 dark:bg-amber-600/80 text-white flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-medium text-neutral-800 dark:text-neutral-200">
              {master.name}
            </h4>
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mt-1 mb-2">
              {master.style}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {master.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* 街头摄影地图 */}
      <div className="bg-neutral-50 dark:bg-neutral-750 rounded-lg border border-neutral-200 dark:border-neutral-700 p-5">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center">
          <Map className="w-5 h-5 mr-2 text-amber-500 dark:text-amber-400" />
          最佳街头摄影城市地点
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
            <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">城市中心广场</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              人流密集，活动多样，光线充足，适合捕捉多元人物和社会互动
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
            <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">老城区与历史街区</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              建筑特色鲜明，巷道构图丰富，光影效果戏剧化，展现城市历史痕迹
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
            <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">市场与商业街</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              色彩丰富，人物表情生动，活动密集，捕捉真实生活百态
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
            <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">公共交通枢纽</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              人流穿梭，表情丰富，光线变化多样，捕捉城市节奏与情绪
            </p>
          </div>
        </div>
      </div>
      
      {/* 常见问题 */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
          <Info className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
          街头摄影常见问题
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