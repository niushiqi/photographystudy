"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Info, User, ChevronRight, Camera, Users } from "lucide-react";

interface PortraitPosingProps {
  title: string;
}

export function PortraitPosing({ title }: PortraitPosingProps) {
  // 选定的姿势类别
  const [activeTab, setActiveTab] = useState("standing");
  
  // 姿势技巧数据
  const posingTips = {
    standing: [
      "保持脊柱挺直，但肩部放松，避免显得僵硬",
      "重心放在后脚，前脚轻点地面，创造自然曲线",
      "手臂与身体保持一定距离，增加轮廓感",
      "下巴略微前倾并向下，避免仰头拍摄",
      "将身体稍微转向45°角，而不是直面相机"
    ],
    sitting: [
      "坐姿前倾，避免靠背椅背，保持背部挺直",
      "脚踝交叉或一前一后，显得优雅自然",
      "手肘可轻放膝盖或扶手上，手部保持放松",
      "身体与相机成45°角，头部轻转向相机方向",
      "调整座位高度，确保眼睛略高于相机水平线"
    ],
    group: [
      "安排不同高度层次，避免所有人站成一排",
      "身高相近的人应站在一起，创造视觉平衡",
      "主体之间适当接触（如肩并肩、手搭肩等）",
      "使用三角形或菱形等几何构图排列人物",
      "各人物与相机保持类似的距离，确保对焦均匀"
    ]
  };

  // 常见问题
  const commonQuestions = [
    {
      question: "如何让模特摆姿势显得自然不僵硬？",
      answer: "让模特在两个姿势之间移动而不是固定不动；播放音乐帮助放松；通过示范展示你想要的姿势；多进行沟通和鼓励。"
    },
    {
      question: "如何应对不同体型人物的姿势调整？",
      answer: "注意光线角度避免侧面曝光；引导模特身体微微扭转；合理使用前景遮挡；选择适合的相机角度（如略高于眼平线）。"
    },
    {
      question: "如何处理手部姿势？",
      answer: "避免将手直接面向相机；保持手部放松自然弯曲；可以通过让模特拿东西或做动作来自然摆放手部；手指微微分开比紧贴更自然。"
    }
  ];
  
  // 最佳实践
  const bestPractices = [
    {
      title: "站姿黄金法则",
      description: "重心放在一条腿上，另一条腿弯曲，创造S形曲线"
    },
    {
      title: "手部定位技巧",
      description: "手部轻触面部、头发或衣物，避免悬空或紧贴身体"
    },
    {
      title: "面部角度控制",
      description: "下巴稍向前伸并微微下倾，避免正对相机的平面感"
    }
  ];

  return (
    <div className="space-y-8">      
      {/* 姿势指南 */}
      <div>
        {/* 选项卡 */}
        <div className="flex border-b border-amber-200 dark:border-amber-800/40 mb-5">
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors flex items-center",
              activeTab === "standing"
                ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-400"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
            onClick={() => setActiveTab("standing")}
          >
            <User className="w-4 h-4 mr-1.5" />
            站姿技巧
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors flex items-center",
              activeTab === "sitting"
                ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-400"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
            onClick={() => setActiveTab("sitting")}
          >
            <User className="w-4 h-4 mr-1.5" />
            坐姿指导
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors flex items-center",
              activeTab === "group"
                ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-400"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
            onClick={() => setActiveTab("group")}
          >
            <Users className="w-4 h-4 mr-1.5" />
            团体姿势
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
              {activeTab === "standing" && <User className="w-5 h-5" />}
              {activeTab === "sitting" && <User className="w-5 h-5" />}
              {activeTab === "group" && <Users className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                {activeTab === "standing" && "站姿拍摄技巧"}
                {activeTab === "sitting" && "坐姿拍摄指南"}
                {activeTab === "group" && "团体照姿势布局"}
              </h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {activeTab === "standing" && "创造自然优雅的人像站姿"}
                {activeTab === "sitting" && "打造舒适自然的坐姿效果"}
                {activeTab === "group" && "有效安排多人构图与姿势"}
              </p>
            </div>
          </div>
          
          <ul className="space-y-3 mt-5">
            {posingTips[activeTab as keyof typeof posingTips].map((tip, index) => (
              <li key={index} className="flex">
                <Check className="w-5 h-5 text-amber-600 dark:text-amber-500 mr-2 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300">{tip}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
            <h5 className="font-medium text-amber-800 dark:text-amber-300 mb-2">
              {activeTab === "standing" && "站姿黄金法则"}
              {activeTab === "sitting" && "坐姿关键要点"}
              {activeTab === "group" && "团体构图精髓"}
            </h5>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              {activeTab === "standing" && "为创造优雅站姿，遵循'S形曲线'原则：重心放在一条腿上，另一条腿微曲，肩膀略微倾斜，下巴轻抬。此姿态能在任何人像中创造动态感和优雅线条。"}
              {activeTab === "sitting" && "坐姿成功的关键在于保持背部挺直但放松，避免完全靠在椅背上。这种微妙的前倾姿态能传达自信感，同时让身体轮廓更加优美。"}
              {activeTab === "group" && "团体照构图遵循'三角形原则'：将不同高度的人物排列成三角形或金字塔形状，视觉重心通常位于三角形顶部。这种构图方式能有效引导观众视线，创造层次感。"}
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* 参考图示 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <div className="aspect-[3/4] bg-neutral-100 dark:bg-neutral-750 flex items-center justify-center">
            <Camera className="w-8 h-8 text-neutral-400 dark:text-neutral-600" />
          </div>
          <div className="p-3">
            <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              45°角侧身站姿
            </h5>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              创造最佳身体轮廓的经典站姿
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <div className="aspect-[3/4] bg-neutral-100 dark:bg-neutral-750 flex items-center justify-center">
            <Camera className="w-8 h-8 text-neutral-400 dark:text-neutral-600" />
          </div>
          <div className="p-3">
            <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              斜靠座椅姿势
            </h5>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              自然随意的休闲坐姿示例
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <div className="aspect-[3/4] bg-neutral-100 dark:bg-neutral-750 flex items-center justify-center">
            <Camera className="w-8 h-8 text-neutral-400 dark:text-neutral-600" />
          </div>
          <div className="p-3">
            <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              三角形团体构图
            </h5>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              平衡视觉重量的多人构图
            </p>
          </div>
        </div>
      </div>
      
      {/* 最佳实践 */}
      <div className="bg-neutral-50 dark:bg-neutral-750 rounded-lg border border-neutral-200 dark:border-neutral-700 p-5">
        <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
          姿势指导最佳实践
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