"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { HiCheck, HiChevronRight, HiLightBulb, HiExclamation, HiOutlineQuestionMarkCircle } from 'react-icons/hi';

export interface Step {
  id: string;
  title: string;
  description: string;
  tips?: string[];
  warnings?: string[];
}

export interface Equipment {
  name: string;
  essential: boolean;
}

export interface StepByStepGuideProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  timeRequired?: string;
  equipment?: Equipment[];
  technique?: string;
  stepsCount?: number;
  checklistIncluded?: boolean;
  troubleshootingTips?: boolean;
  requiredGear?: string[];
}

// 光绘摄影的步骤数据
const lightPaintingSteps = [
  {
    title: "准备设备",
    description: "确保你有所有必要的设备：三脚架、快门遥控器、光源（如手电筒、LED灯或荧光棒）、相机。",
    image: "https://images.unsplash.com/photo-1574285013029-29296a71930e?q=80&w=1000",
    tips: "选择光源时，考虑不同颜色和亮度会产生不同效果。LED灯条和手电筒是最常用的光源。",
    common_mistake: "使用太亮的光源会导致过度曝光。"
  },
  {
    title: "选择拍摄地点",
    description: "找一个黑暗的环境，避免光污染。确保场景中有一定的参考物体帮助构图。",
    image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=1000",
    tips: "城市边缘或公园等相对黑暗的地方是理想选择。室内也可以在关灯的情况下进行。",
    common_mistake: "忽视背景中不必要的光源。"
  },
  {
    title: "设置相机参数",
    description: "将相机设置为手动模式(M)。设置低ISO(如100-400)，中等光圈(如f/8)，长时间曝光(如10-30秒)。",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000",
    tips: "根据需要调整快门时间。简单图案可能只需10秒，而复杂图案可能需要30秒或更长。",
    common_mistake: "ISO设置过高导致噪点，或快门时间太短无法完成光绘。"
  },
  {
    title: "稳定相机",
    description: "将相机安装在三脚架上，确保完全稳定。使用快门线或遥控器避免触碰相机造成抖动。",
    image: "https://images.unsplash.com/photo-1621983062174-e70e95e4c147?q=80&w=1000",
    tips: "如果没有快门线，可以使用相机的2秒延时自拍功能来避免按快门时的震动。",
    common_mistake: "三脚架不稳固或在长曝过程中移动相机。"
  },
  {
    title: "对焦",
    description: "在开始拍摄前对焦。可以使用手电筒照亮主体进行自动对焦，然后切换到手动对焦锁定焦点。",
    image: "https://images.unsplash.com/photo-1455729552865-3b769b5e8212?q=80&w=1000",
    tips: "如果你打算在图像中包含人物，确保对焦点在人物上。对于纯光绘，对场景中的任何物体对焦即可。",
    common_mistake: "忘记锁定对焦导致相机在拍摄过程中重新对焦。"
  },
  {
    title: "开始光绘",
    description: "按下快门，然后在曝光期间使用光源创作你想要的图案或照亮主体。",
    image: "https://images.unsplash.com/photo-1533746228171-962572599adb?q=80&w=1000",
    tips: "移动光源的速度会影响光线的亮度和厚度。移动更快会产生更细、更暗的线条。",
    common_mistake: "在画光线时犹豫或停顿会导致某些区域过度曝光。"
  },
  {
    title: "检查结果并调整",
    description: "查看照片效果，根据需要调整设置或光绘技巧，然后再次尝试。",
    image: "https://images.unsplash.com/photo-1535979863199-3c77338429a0?q=80&w=1000",
    tips: "光绘需要实验和创意。不要害怕尝试不同的设置、光源和移动方式。",
    common_mistake: "过早放弃而不尝试不同的方法或设置。"
  }
];

// 光绘摄影的故障排除提示
const troubleshootingTipsData = [
  {
    problem: "照片太暗或看不到光绘",
    solutions: [
      "增加ISO感光度",
      "使用更大的光圈(更小的f值)",
      "使用更亮的光源",
      "确保光源直接对着相机方向移动"
    ]
  },
  {
    problem: "照片太亮或过曝",
    solutions: [
      "降低ISO感光度",
      "使用更小的光圈(更大的f值)",
      "减少光源亮度",
      "更快速地移动光源"
    ]
  },
  {
    problem: "光线不清晰或模糊",
    solutions: [
      "确保相机完全稳定",
      "避免在长曝过程中触碰相机或三脚架",
      "在风大的环境中，保护三脚架免受晃动",
      "检查对焦是否准确"
    ]
  }
];

// 拍摄前检查清单
const shootingChecklist = [
  "相机电池充足",
  "存储卡有足够空间",
  "三脚架稳定安装",
  "快门线/遥控器正常工作",
  "光源电池充足",
  "关闭相机的图像稳定功能(在三脚架上使用时)",
  "将相机设置为手动模式",
  "设置适当的白平衡",
  "确保拍摄区域安全"
];

export function StepByStepGuide({
  technique = "light-painting",
  stepsCount = 7,
  difficulty = "intermediate",
  checklistIncluded = true,
  troubleshootingTips = true,
  requiredGear = ["tripod", "remote-trigger", "light-source"]
}: StepByStepGuideProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // 当前步骤数据
  const currentStepData = lightPaintingSteps[currentStep - 1];

  // 标记步骤为完成
  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  // 处理清单项目勾选
  const handleChecklistItemToggle = (item: string) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter(i => i !== item));
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  // 翻译装备名称
  const translateGear = (gear: string) => {
    const translations: {[key: string]: string} = {
      "tripod": "三脚架",
      "remote-trigger": "快门线/遥控器",
      "light-source": "光源(手电筒/LED灯)",
      "camera": "相机",
      "lens": "镜头",
      "filters": "滤镜",
      "flash": "闪光灯",
      "reflector": "反光板"
    };
    return translations[gear] || gear;
  };

  // 翻译难度
  const translateDifficulty = (diff: string) => {
    const translations: {[key: string]: string} = {
      "beginner": "初级",
      "intermediate": "中级",
      "advanced": "高级"
    };
    return translations[diff] || diff;
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6">
        <h2 className="text-xl font-bold text-white mb-2">
          {technique === "light-painting" ? "光绘摄影指南" : technique}
        </h2>
        <div className="flex items-center text-sm text-gray-300 space-x-4">
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded">
            {translateDifficulty(difficulty)}
          </span>
          <span>{stepsCount}个步骤</span>
          <span>预计时间: 30-60分钟</span>
        </div>
      </div>

      {/* 所需装备 */}
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white mb-3">所需装备</h3>
        <div className="flex flex-wrap gap-2">
          {requiredGear.map((gear, idx) => (
            <div key={idx} className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full text-sm">
              {translateGear(gear)}
            </div>
          ))}
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex flex-col md:flex-row">
        {/* 左侧步骤导航 */}
        <div className="w-full md:w-1/4 bg-gray-800 p-4">
          <h3 className="text-white font-medium mb-4">步骤</h3>
          <div className="space-y-2">
            {lightPaintingSteps.map((step, idx) => (
              <button
                key={idx}
                className={`w-full text-left px-3 py-2 rounded flex items-center transition-all ${
                  currentStep === idx + 1
                    ? 'bg-blue-600 text-white'
                    : completedSteps.includes(idx + 1)
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => setCurrentStep(idx + 1)}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                  completedSteps.includes(idx + 1) 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-600 text-gray-400'
                }`}>
                  {completedSteps.includes(idx + 1) ? (
                    <HiCheck className="text-sm" />
                  ) : (
                    <span className="text-xs">{idx + 1}</span>
                  )}
                </div>
                <span className="text-sm truncate">{step.title}</span>
              </button>
            ))}
          </div>

          {/* 其他功能按钮 */}
          <div className="mt-6 space-y-2">
            {checklistIncluded && (
              <button 
                className="w-full bg-gray-700 text-gray-300 px-3 py-2 rounded text-sm text-left flex items-center hover:bg-gray-600"
                onClick={() => setShowChecklist(!showChecklist)}
              >
                <HiCheck className="mr-2" />
                拍摄前检查清单
              </button>
            )}
            {troubleshootingTips && (
              <button 
                className="w-full bg-gray-700 text-gray-300 px-3 py-2 rounded text-sm text-left flex items-center hover:bg-gray-600"
                onClick={() => setShowTroubleshooting(!showTroubleshooting)}
              >
                <HiOutlineQuestionMarkCircle className="mr-2" />
                故障排除提示
              </button>
            )}
          </div>
        </div>

        {/* 右侧内容区域 */}
        <div className="w-full md:w-3/4 p-6">
          {/* 步骤内容 */}
          {!showTroubleshooting && !showChecklist && (
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                {currentStep}. {currentStepData.title}
              </h3>
              
              {/* 图片区域 */}
              <div className="relative h-60 md:h-80 rounded-lg overflow-hidden mb-6">
                <Image 
                  src={currentStepData.image} 
                  alt={currentStepData.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* 描述区域 */}
              <div className="mb-6">
                <p className="text-gray-300">{currentStepData.description}</p>
              </div>
              
              {/* 提示和常见错误 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <HiLightBulb className="text-blue-400 mr-2" />
                    <h4 className="text-white font-medium">专业提示</h4>
                  </div>
                  <p className="text-gray-300 text-sm">{currentStepData.tips}</p>
                </div>
                
                <div className="bg-red-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <HiExclamation className="text-red-400 mr-2" />
                    <h4 className="text-white font-medium">常见错误</h4>
                  </div>
                  <p className="text-gray-300 text-sm">{currentStepData.common_mistake}</p>
                </div>
              </div>
              
              {/* 导航按钮 */}
              <div className="flex justify-between mt-6">
                <button 
                  className={`px-4 py-2 rounded transition-all ${
                    currentStep > 1 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 1}
                >
                  上一步
                </button>
                
                <div>
                  <button 
                    className="px-4 py-2 bg-green-600 text-white rounded mr-2 hover:bg-green-700"
                    onClick={() => markStepComplete(currentStep)}
                  >
                    <HiCheck className="mr-1 inline" />
                    标记完成
                  </button>
                  
                  <button 
                    className={`px-4 py-2 rounded transition-all flex items-center ${
                      currentStep < lightPaintingSteps.length 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => currentStep < lightPaintingSteps.length && setCurrentStep(currentStep + 1)}
                    disabled={currentStep === lightPaintingSteps.length}
                  >
                    下一步
                    <HiChevronRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 故障排除提示内容 */}
          {showTroubleshooting && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">故障排除提示</h3>
                <button 
                  className="text-blue-400 hover:text-blue-300"
                  onClick={() => setShowTroubleshooting(false)}
                >
                  返回步骤
                </button>
              </div>
              
              <div className="space-y-6">
                {troubleshootingTipsData.map((tip, idx) => (
                  <div key={idx} className="bg-gray-800 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">问题: {tip.problem}</h4>
                    <h5 className="text-blue-400 text-sm mb-2">解决方案:</h5>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {tip.solutions.map((solution, sIdx) => (
                        <li key={sIdx}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 拍摄前检查清单 */}
          {showChecklist && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">拍摄前检查清单</h3>
                <button 
                  className="text-blue-400 hover:text-blue-300"
                  onClick={() => setShowChecklist(false)}
                >
                  返回步骤
                </button>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <ul className="space-y-2">
                  {shootingChecklist.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center text-gray-300 hover:text-white cursor-pointer transition-all"
                      onClick={() => handleChecklistItemToggle(item)}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                        checkedItems.includes(item) ? 'bg-green-500' : 'border border-gray-600'
                      }`}>
                        {checkedItems.includes(item) && <HiCheck className="text-white text-sm" />}
                      </div>
                      <span className={checkedItems.includes(item) ? 'line-through text-gray-500' : ''}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      已完成: {checkedItems.length}/{shootingChecklist.length}
                    </span>
                    {checkedItems.length > 0 && (
                      <button 
                        className="text-gray-400 hover:text-gray-300"
                        onClick={() => setCheckedItems([])}
                      >
                        清除全部
                      </button>
                    )}
                  </div>
                  
                  {checkedItems.length === shootingChecklist.length && (
                    <div className="mt-4 text-center">
                      <div className="bg-green-600/20 text-green-400 py-2 px-3 rounded">
                        所有检查项已完成，可以开始拍摄了！
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-800 p-6 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-sm">
            进度: {completedSteps.length}/{lightPaintingSteps.length} 步骤完成
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <div 
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{width: `${(completedSteps.length / lightPaintingSteps.length) * 100}%`}}
              ></div>
            </div>
          </div>
          
          <button 
            className={`px-4 py-2 rounded ${
              completedSteps.length === lightPaintingSteps.length 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
            disabled={completedSteps.length !== lightPaintingSteps.length}
          >
            完成本教程
          </button>
        </div>
      </div>
    </div>
  );
} 