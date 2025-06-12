"use client";

import { useState } from "react";
import { User, Camera, Users, Sun, Lightbulb } from "lucide-react";
import { TechniqueTabs, StepByStepGuide, BeforeAfterComparison, TechniqueCard } from "@/components/techniques/core";

export function PortraitTechniqueModule() {
  const [activeTab, setActiveTab] = useState("posing");
  
  // 姿势指导步骤
  const posingSteps = [
    {
      id: "step1",
      title: "找到合适的角度",
      description: "指导模特将身体转向相机45°角，而不是直面相机。这样可以创造更加自然的体态线条，减少视觉宽度。",
      tips: ["女性更适合S形姿势，强调曲线", "男性可采用更加直角的C形，展现力量感"],
      warnings: ["避免让模特直面相机，这会显得体态扁平"]
    },
    {
      id: "step2",
      title: "调整重心分布",
      description: "引导模特将重心放在后脚，前脚轻点地面。这种不均匀的重心分布可以创造自然的身体曲线。",
      tips: ["鼓励模特微微弯曲膝盖，避免僵直感", "调整臀部位置，可以强调或减弱腰部曲线"],
      warnings: ["注意不要过度弯曲，避免姿势看起来不自然"]
    },
    {
      id: "step3",
      title: "设置手臂位置",
      description: "手臂与身体保持一定距离，不要紧贴身体。可以让模特手肘微微弯曲，双手轻握或自然放松。",
      tips: ["手可以轻触面部、头发或服装，增加画面层次", "指导模特通过小动作（如整理头发）使手部姿势自然"],
      warnings: ["避免让手直接面向相机，会显得手部过大"]
    },
    {
      id: "step4",
      title: "引导面部表情",
      description: "指导模特下巴略微前倾并向下，避免仰头拍摄。眼睛通常应该看向相机或看向光源方向。",
      tips: ["轻微调整头部角度可以显著改变面部轮廓", "指导模特在眨眼前深吸一口气，拍摄自然的眼神"],
      warnings: ["避免过度抬头角度，会显示双下巴或鼻孔"]
    },
    {
      id: "step5",
      title: "调整肩膀姿势",
      description: "保持脊柱挺直，但肩部放松下沉，避免显得僵硬。肩膀位置会直接影响整体姿态感觉。",
      tips: ["让模特深呼吸然后呼气，肩膀自然下沉", "女性可以一侧肩膀略微抬高，增加姿势变化"],
      warnings: ["紧张的肩膀是最常见的姿势问题，需要重点关注"]
    }
  ];
  
  // 人像光线设置步骤
  const lightingSteps = [
    {
      id: "light1",
      title: "确定主光源位置",
      description: "选择45°侧面作为主光源位置，可以创造立体感和面部轮廓。光源高度应略高于模特头部。",
      tips: ["黄金时段的自然光是最佳选择", "室内可使用窗户光源模拟侧光效果"],
      warnings: ["避免正面直射光，会使面部特征扁平化"]
    },
    {
      id: "light2",
      title: "调整填充光",
      description: "在主光源对面设置反光板或低强度填充光，减少阴影对比度，避免阴影过重。",
      tips: ["白色反光板产生柔和填充，银色反光板产生更强烈效果", "没有反光板时可用白色纸板或墙壁替代"],
      warnings: ["填充光应比主光源弱1-2档，避免消除所有阴影"]
    },
    {
      id: "light3",
      title: "考虑背景分离",
      description: "添加背景光（发光光）勾勒模特轮廓，帮助主体与背景分离，增加画面层次感。",
      tips: ["背光可以创造美丽的发光边缘轮廓", "逆光场景中，背光自然成为主光源的一部分"],
      warnings: ["控制背光强度，避免过度曝光或产生眩光"]
    },
    {
      id: "light4",
      title: "测试并调整曝光",
      description: "以模特面部为基准测光，确保肤色自然不过曝。根据需要调整光比和方向。",
      tips: ["在模特眼睛中应该能看到主光源的反光点", "使用点测光模式精确测量面部亮度"],
      warnings: ["注意避免眼睛下方产生过重阴影（熊猫眼）"]
    }
  ];
  
  // 环境设置步骤
  const environmentSteps = [
    {
      id: "env1",
      title: "选择合适的背景",
      description: "选择简洁、不抢眼的背景，避免过于复杂的元素分散注意力。背景应该补充而非竞争主体。",
      tips: ["模糊的背景更能突出人物", "寻找颜色与服装形成互补的背景"],
      warnings: ["注意背景中的杂乱物品和干扰元素"]
    },
    {
      id: "env2",
      title: "考虑拍摄距离和焦距",
      description: "为避免面部变形，使用85-135mm（等效）焦距，并保持适当距离。这样可以获得最佳的面部比例。",
      tips: ["在空间有限的情况下，尽量增加与模特的距离并放大焦距", "50mm是最接近人眼视角的焦距"],
      warnings: ["避免使用广角镜头近距离拍摄面部，会导致面部比例失调"]
    },
    {
      id: "env3",
      title: "调整拍摄高度",
      description: "相机位置应与模特眼睛高度持平或略高。这样拍出的人像比例最自然，避免仰拍或俯拍带来的变形。",
      tips: ["略高于眼平线的角度最有利于塑造下颌线", "儿童拍摄时，降低相机高度到儿童眼睛水平"],
      warnings: ["过度俯拍会让头部显大身体显小"]
    }
  ];
  
  // 人像互动技巧
  const interactionTips = [
    {
      title: "持续沟通引导",
      description: "不断与模特交流，给予积极反馈和明确指导。通过简短清晰的指令帮助模特放松并找到最佳姿势。",
      difficulty: "beginner" as const,
      tips: [
        "使用简单的方向指令，如'稍微向左转'，而不是专业术语",
        "告诉模特他们看起来很棒，即使需要调整姿势",
        "展示你想要的姿势，比口头描述更有效"
      ]
    },
    {
      title: "创造自然动作",
      description: "引导模特做小动作（整理头发、轻松走动、微笑等）而非静止姿势，捕捉更自然的表情和状态。",
      difficulty: "intermediate" as const,
      timeRequired: "15-30分钟",
      tips: [
        "让模特在两个姿势之间转换，在过程中拍摄",
        "鼓励模特表达情绪，而不只是摆姿势",
        "使用倒数方式：'3，2，1'然后拍摄，帮助模特准备表情"
      ]
    },
    {
      title: "环境互动利用",
      description: "鼓励模特与环境元素互动，如倚靠墙壁、坐在台阶上、触摸植物等，创造自然的场景感。",
      difficulty: "intermediate" as const,
      timeRequired: "30-45分钟",
      tips: [
        "事先踩点，找出环境中可以互动的元素",
        "给模特创造情境故事，帮助他们进入角色",
        "尝试让模特走向或远离相机，捕捉动态感"
      ]
    }
  ];

  // 肖像表情引导
  const expressionCards = [
    {
      title: "自信微笑指导",
      description: "引导模特展现自然、真诚的微笑，而非刻意的假笑。真实的微笑应该从眼睛开始，然后才是嘴角上扬。",
      difficulty: "beginner" as const,
      timeRequired: "5-10分钟",
      steps: [
        "要求模特想象看到好友或想起愉快事情",
        "避免说'笑一个'，而是讲述有趣话题引发笑容",
        "拍摄连拍，捕捉笑容最自然的瞬间",
        "指导模特微微抬头，同时保持下巴前伸"
      ],
      tips: [
        "真实笑容时眼睛会自然眯起",
        "刻意微笑超过30秒会变得不自然",
        "引导模特做深呼吸，放松面部肌肉"
      ]
    },
    {
      title: "严肃/沉思表情",
      description: "营造深沉、内敛的表情，适合专业或艺术风格人像。关键是引导模特放松同时保持表情专注。",
      difficulty: "intermediate" as const,
      timeRequired: "10-15分钟",
      steps: [
        "引导模特稍微收紧下巴，眼神聚焦相机略上方",
        "避免完全面无表情，应保留微妙情绪",
        "尝试不同的嘴唇姿态:微微张开或自然闭合",
        "使用低沉、平静的语调与模特交流"
      ],
      tips: [
        "使用黑白预览帮助模特理解表情效果",
        "严肃不等于不高兴，注意区分指导",
        "这类表情需要更多耐心和尝试"
      ],
      warnings: [
        "避免肌肉紧张导致的僵硬表情"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <TechniqueTabs
        tabs={[
          {
            id: "posing",
            label: "姿势指导",
            icon: <User className="w-4 h-4" />,
            content: (
              <div className="space-y-8">
                <StepByStepGuide
                  title="完美人像姿势五步法"
                  subtitle="掌握这些基本姿势技巧，拍出更专业的人像照片"
                  difficulty="intermediate"
                  timeRequired="20-30分钟"
                  steps={posingSteps}
                  equipment={[
                    { name: "反光板", essential: false },
                    { name: "姿势参考卡", essential: false }
                  ]}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {interactionTips.map((tip, index) => (
                    <TechniqueCard
                      key={index}
                      title={tip.title}
                      description={tip.description}
                      difficulty={tip.difficulty}
                      timeRequired={tip.timeRequired}
                      tips={tip.tips}
                      imageUrl={`/images/techniques/portrait-${index + 1}.jpg`}
                    />
                  ))}
                </div>
              </div>
            ),
          },
          {
            id: "lighting",
            label: "光线设置",
            icon: <Sun className="w-4 h-4" />,
            content: (
              <div className="space-y-8">
                <StepByStepGuide
                  title="人像光线四步设置法"
                  subtitle="掌握基础光线布置，塑造立体人像效果"
                  difficulty="intermediate"
                  timeRequired="15-20分钟"
                  steps={lightingSteps}
                  equipment={[
                    { name: "主光源", essential: true },
                    { name: "反光板", essential: true },
                    { name: "背景灯", essential: false }
                  ]}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center mb-3">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">蝴蝶光</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      主光源位于相机正上方，在鼻子下方形成蝴蝶形状的小阴影。适合大多数面部结构，是最常用的人像光线之一。
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center mb-3">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">分割光</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      主光源位于侧面90°，一半面部明亮，一半面部处于阴影中。创造戏剧性对比效果，适合情绪化或艺术人像。
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center mb-3">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">伦勃朗光</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      主光源在45°侧上方，形成经典的三角形照明模式。在面部背光侧的眼睛下方形成明亮的三角形。适合创造经典人像效果。
                    </p>
                  </div>
                </div>
                
                <BeforeAfterComparison
                  beforeImage="/images/techniques/portrait-before.jpg"
                  afterImage="/images/techniques/portrait-after.jpg"
                  beforeLabel="基础光线"
                  afterLabel="优化光线"
                  beforeAlt="使用平均光线的人像效果"
                  afterAlt="使用定向主光源和填充光的效果对比"
                  height={350}
                />
              </div>
            ),
          },
          {
            id: "environment",
            label: "环境设置",
            icon: <Camera className="w-4 h-4" />,
            content: (
              <div className="space-y-8">
                <StepByStepGuide
                  title="人像环境设置指南"
                  subtitle="创造完美的拍摄环境，突出人物主体"
                  difficulty="beginner"
                  timeRequired="10-15分钟"
                  steps={environmentSteps}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <BeforeAfterComparison
                    beforeImage="/images/techniques/environment-before.jpg"
                    afterImage="/images/techniques/environment-after.jpg"
                    beforeLabel="杂乱背景"
                    afterLabel="简洁背景"
                    beforeAlt="杂乱背景下的人像效果"
                    afterAlt="简洁背景下的人像效果对比"
                    height={300}
                  />
                  
                  <BeforeAfterComparison
                    beforeImage="/images/techniques/distance-before.jpg"
                    afterImage="/images/techniques/distance-after.jpg"
                    beforeLabel="广角近拍"
                    afterLabel="长焦远拍"
                    beforeAlt="使用广角近距离拍摄的变形效果"
                    afterAlt="使用长焦远距离拍摄的自然效果"
                    height={300}
                  />
                </div>
              </div>
            ),
          },
          {
            id: "expression",
            label: "表情引导",
            icon: <Users className="w-4 h-4" />,
            content: (
              <div className="space-y-6">
                <p className="text-neutral-600 dark:text-neutral-400">
                  表情是人像摄影中最重要的元素，一个自然、真实的表情能让照片立刻提升一个层次。以下是帮助引导模特表情的专业技巧。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {expressionCards.map((card, index) => (
                    <TechniqueCard
                      key={index}
                      title={card.title}
                      description={card.description}
                      difficulty={card.difficulty}
                      timeRequired={card.timeRequired}
                      tips={card.tips}
                      warnings={card.warnings}
                    />
                  ))}
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30 mt-6">
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">专业摄影师提示</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    当引导模特表情时，最重要的是营造轻松的氛围。紧张的环境很难产生自然表情。播放模特喜欢的音乐，保持轻松对话，让拍摄过程更像一次愉快的社交活动而非严肃工作。
                  </p>
                </div>
              </div>
            ),
          },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="secondary"
      />
    </div>
  );
} 