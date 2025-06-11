"use client";

import { useState } from "react";
import { Building, Eye, Users, Camera, Shield, Compass, AlertTriangle } from "lucide-react";
import { TechniqueTabs, StepByStepGuide, BeforeAfterComparison, TechniqueCard } from "../core";

export function StreetTechniqueModule() {
  const [activeTab, setActiveTab] = useState("approach");
  
  // 拍摄方法步骤
  const approachSteps = [
    {
      id: "approach1",
      title: "融入环境",
      description: "在拍摄前，花时间在一个地方观察并融入环境。成为场景的一部分，而不是引人注目的外来者。",
      tips: ["穿着低调，避免引人注目的相机背带", "保持移动状态会减少他人注意"],
      warnings: ["避免鬼鬼祟祟的行为，这会引起怀疑"]
    },
    {
      id: "approach2",
      title: "预设相机",
      description: "提前设置相机参数（光圈优先、ISO自动、最低快门速度），这样你可以快速拍摄而不错过瞬间。",
      tips: ["光圈设在f/5.6-f/8范围内获得足够景深", "最低快门速度设置为1/125秒避免抖动"],
      warnings: ["检查并确保自动ISO上限设置合理"]
    },
    {
      id: "approach3",
      title: "练习'快拍'",
      description: "训练自己快速举起相机、对焦并拍摄的能力。街头摄影往往只有几秒钟的机会窗口。",
      tips: ["使用区域对焦或对焦预设减少对焦时间", "开启连拍模式捕捉多个瞬间"],
      warnings: ["不要对着同一主体连续拍摄太多次，这会引起不适"]
    },
    {
      id: "approach4",
      title: "等待时机",
      description: "找到一个有趣的场景或背景后，耐心等待合适的人物或情境出现。好的街头摄影师同时是耐心的猎人。",
      tips: ["寻找有趣的光线、阴影或构图元素", "预想画面中人物的理想位置，等待合适对象经过"],
      imageUrl: "/images/techniques/street-waiting.jpg"
    },
    {
      id: "approach5",
      title: "使用小型相机",
      description: "考虑使用小型相机或手机，它们不会引起太多注意，让你更容易接近主体并捕捉自然瞬间。",
      tips: ["微单和高端便携相机是街拍的理想选择", "黑色或深色相机比银色更不引人注目"],
      warnings: ["优先考虑拍摄机会，而不是追求最高画质"]
    }
  ];
  
  // 构图技巧步骤
  const compositionSteps = [
    {
      id: "comp1",
      title: "寻找几何和线条",
      description: "城市环境充满了几何形状和线条。寻找这些元素作为构图基础，创造秩序感。",
      tips: ["注意建筑物、街道和阴影形成的线条", "利用重复元素创造节奏感"],
      imageUrl: "/images/techniques/street-geometry.jpg"
    },
    {
      id: "comp2",
      title: "利用对比元素",
      description: "寻找场景中的对比元素：大小、年龄、颜色、富裕与贫穷等。对比是讲述故事的强大工具。",
      tips: ["尝试捕捉不同世界的并置", "寻找色彩对比增强视觉冲击力"],
      warnings: ["保持尊重，避免以贫困为噱头"]
    },
    {
      id: "comp3",
      title: "运用框架构图",
      description: "利用城市元素（如门框、窗户、拱门）作为自然框架围绕主体，引导观众视线并创造深度感。",
      tips: ["寻找能形成剪影的框架", "尝试不同角度最大化框架效果"],
      imageUrl: "/images/techniques/street-framing.jpg"
    },
    {
      id: "comp4",
      title: "捕捉瞬间互动",
      description: "人与人、人与环境之间的互动往往能创造最有力的街头照片。观察并预测这些瞬间的发生。",
      tips: ["注意手势、眼神接触和肢体语言", "观察人群流动模式预测互动"],
      warnings: ["尊重私人对话和情感瞬间"]
    }
  ];
  
  // 法律和道德问题
  const legalEthicalCards = [
    {
      title: "街头摄影的法律边界",
      description: "了解你所在地区关于公共场所拍摄的法律规定。一般来说，公共场所的人物拍摄通常是合法的，但商业用途可能需要肖像权授权。",
      difficulty: "intermediate" as const,
      steps: [
        "研究当地关于公共场所摄影的法律",
        "了解肖像权和隐私权法律差异",
        "明确商业使用与艺术/新闻用途的区别",
        "考虑准备简单的肖像授权表格"
      ],
      warnings: [
        "一些国家对公共场所摄影有严格限制",
        "在军事设施、安检区域等敏感地点拍摄可能违法",
        "未成年人拍摄有特殊法律考量"
      ]
    },
    {
      title: "街拍的道德准则",
      description: "遵循道德准则是负责任街头摄影师的基本素养。尊重是关键原则，即使在合法的情况下也应考虑主体的感受。",
      difficulty: "beginner" as const,
      steps: [
        "避免拍摄处于困境或窘迫中的人",
        "如有人表示不愿被拍，尊重其意愿并删除照片",
        "避免使用长焦镜头'偷拍'，这违背街拍的精神",
        "在宗教场所或仪式中格外谨慎和尊重"
      ],
      tips: [
        "如果被询问，诚实解释你的拍摄意图",
        "考虑向主体展示照片并提供照片副本",
        "培养与被摄主体真诚交流的能力"
      ]
    }
  ];
  
  // 技术设置卡片
  const technicalCards = [
    {
      title: "街拍基础相机设置",
      description: "街头摄影要求快速反应和适应多变的光线条件。正确的相机设置可以让你专注于捕捉瞬间而非调整参数。",
      difficulty: "beginner" as const,
      equipment: [
        { name: "小型不显眼相机", essential: true },
        { name: "35mm或50mm定焦镜头", essential: true },
        { name: "备用电池", essential: true },
        { name: "腕带或低调相机带", essential: false }
      ],
      steps: [
        "使用光圈优先模式（A/Av），设置f/5.6-f/8",
        "开启自动ISO，设置上限（如ISO 3200）",
        "设置最低快门速度（1/125秒或更快）",
        "使用中心点或区域对焦，避免全自动对焦",
        "考虑使用区域测光而非评价测光"
      ],
      tips: [
        "在不同光线条件下准备几个常用预设",
        "使用背带缠绕手腕而非挂脖子，更灵活且不显眼",
        "考虑使用静音快门模式减少干扰"
      ]
    },
    {
      title: "光线应对策略",
      description: "街头环境的光线往往不受控制且对比强烈。学习如何在各种光线条件下工作是街拍的关键技能。",
      difficulty: "intermediate" as const,
      steps: [
        "高对比度场景：使用点测光针对主体",
        "暗光条件：提高ISO，使用开放光圈，靠近光源",
        "逆光场景：过曝0.7-1档，或利用剪影效果",
        "斑驳光线：寻找阴影与光亮的交界处"
      ],
      tips: [
        "利用建筑物反射光作为自然补光",
        "阴天提供柔和的光线，适合彩色街拍",
        "强烈直射阳光适合高对比度黑白摄影",
        "雨后地面反光可创造戏剧性效果"
      ],
      imageUrl: "/images/techniques/street-lighting.jpg"
    }
  ];
  
  // 场景类型卡片
  const sceneCards = [
    {
      title: "市场与商业区",
      description: "市场和商业区充满活力和人类互动，是练习街拍的理想场所。各种活动和人物提供了丰富的拍摄素材。",
      difficulty: "beginner" as const,
      timeRequired: "2-3小时",
      tips: [
        "拍摄商贩专注工作的瞬间",
        "捕捉物品的有趣排列和色彩",
        "寻找顾客与商品互动的瞬间",
        "利用市场的狭窄通道创造框架感"
      ],
      imageUrl: "/images/techniques/street-market.jpg"
    },
    {
      title: "雨天街头摄影",
      description: "雨天提供独特的视觉元素和情绪氛围，包括反光、雨伞和行人的特殊行为模式，是创造富有情感的街拍的好机会。",
      difficulty: "advanced" as const,
      timeRequired: "1-2小时",
      equipment: [
        { name: "防雨装备", essential: true },
        { name: "镜头布", essential: true }
      ],
      tips: [
        "利用地面反光创造镜像效果",
        "捕捉人们躲雨或快速行走的瞬间",
        "关注雨伞的形状、颜色和图案",
        "使用更快的快门速度捕捉雨滴"
      ],
      warnings: [
        "保护好设备避免受潮损坏",
        "雨天路面湿滑，注意安全"
      ],
      imageUrl: "/images/techniques/street-rain.jpg"
    },
    {
      title: "夜间街头摄影",
      description: "夜晚的城市有着白天无法比拟的氛围和光线效果。霓虹灯、车灯和橱窗光线创造出戏剧性的场景。",
      difficulty: "advanced" as const,
      timeRequired: "2-3小时",
      equipment: [
        { name: "大光圈镜头", essential: true },
        { name: "小型三脚架或独脚架", essential: false }
      ],
      tips: [
        "利用商店橱窗光线照亮主体",
        "寻找霓虹灯与人物的互动",
        "捕捉车灯轨迹与静态主体的对比",
        "尝试慢快门捕捉行人模糊与建筑物清晰的对比"
      ],
      warnings: [
        "夜间拍摄注意人身安全",
        "某些区域夜间可能不适合携带贵重设备"
      ],
      imageUrl: "/images/techniques/street-night.jpg"
    }
  ];

  return (
    <div className="space-y-8">
      <TechniqueTabs
        tabs={[
          {
            id: "approach",
            label: "拍摄方法",
            icon: <Eye className="w-4 h-4" />,
            content: (
              <div className="space-y-8">
                <StepByStepGuide
                  title="街头摄影基本方法"
                  subtitle="掌握这些基本方法，自信地在街头捕捉精彩瞬间"
                  difficulty="intermediate"
                  timeRequired="需要持续练习"
                  steps={approachSteps}
                  equipment={[
                    { name: "小型不显眼相机", essential: true },
                    { name: "35mm或50mm镜头", essential: true },
                    { name: "舒适鞋子", essential: true }
                  ]}
                />
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800/30 mt-6">
                  <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300 mb-2 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    街拍新手常见错误
                  </h3>
                  <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-2 ml-7 list-disc">
                    <li>过度关注设备而非构图和时机</li>
                    <li>犹豫不决错过决定性瞬间</li>
                    <li>只在"安全距离"拍摄，不敢靠近主体</li>
                    <li>缺乏耐心，不在一个地点停留足够时间</li>
                    <li>在拍摄后不进行自我反思和学习</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            id: "composition",
            label: "构图技巧",
            icon: <Compass className="w-4 h-4" />,
            content: (
              <div className="space-y-8">
                <StepByStepGuide
                  title="街头摄影构图四步法"
                  subtitle="学习如何在混乱的城市环境中创造有秩序的构图"
                  difficulty="intermediate"
                  timeRequired="需要持续实践"
                  steps={compositionSteps}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <BeforeAfterComparison
                    beforeImage="/images/techniques/street-before-comp.jpg"
                    afterImage="/images/techniques/street-after-comp.jpg"
                    beforeLabel="基础构图"
                    afterLabel="优化构图"
                    beforeAlt="构图不当的街头照片"
                    afterAlt="应用几何和框架后的效果"
                    height={300}
                  />
                  
                  <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                    <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                      <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">构图模式识别练习</h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        训练自己快速识别街头构图模式的能力
                      </p>
                    </div>
                    <div className="p-4">
                      <ol className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                        <li className="flex">
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-0.5">1</span>
                          <span>选择一个繁忙的街角，站在那里5分钟</span>
                        </li>
                        <li className="flex">
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-0.5">2</span>
                          <span>识别所有可能的构图框架和线条</span>
                        </li>
                        <li className="flex">
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-0.5">3</span>
                          <span>预想人物进入这些框架时的效果</span>
                        </li>
                        <li className="flex">
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-0.5">4</span>
                          <span>等待合适主体进入构图，快速拍摄</span>
                        </li>
                        <li className="flex">
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-0.5">5</span>
                          <span>每天练习30分钟，两周后你将大幅提升构图敏感度</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: "legal-ethical",
            label: "法律与道德",
            icon: <Shield className="w-4 h-4" />,
            content: (
              <div className="space-y-6">
                <p className="text-neutral-600 dark:text-neutral-400">
                  街头摄影涉及在公共场所拍摄陌生人，这带来一系列法律和道德考量。理解这些界限对于负责任的街头摄影至关重要。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {legalEthicalCards.map((card, index) => (
                    <TechniqueCard
                      key={index}
                      title={card.title}
                      description={card.description}
                      difficulty={card.difficulty}
                      steps={card.steps}
                      tips={card.tips}
                      warnings={card.warnings}
                      tags={["法律", "道德"]}
                    />
                  ))}
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30 mt-6">
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">交流技巧</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                    被问及为什么拍照时，以下回应通常会获得积极反应：
                  </p>
                  <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2 ml-7 list-disc">
                    <li>"我正在拍摄一个关于城市生活的个人项目"</li>
                    <li>"我被这个场景的光线/色彩/构图吸引"</li>
                    <li>"我是摄影学生，在练习街头摄影技巧"</li>
                    <li>主动提出展示照片并发送副本给对方</li>
                    <li>携带名片或小卡片，上面有你的摄影作品网站或社交媒体</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            id: "technical",
            label: "技术设置",
            icon: <Camera className="w-4 h-4" />,
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {technicalCards.map((card, index) => (
                    <TechniqueCard
                      key={index}
                      title={card.title}
                      description={card.description}
                      difficulty={card.difficulty}
                      equipment={card.equipment}
                      steps={card.steps}
                      tips={card.tips}
                      imageUrl={card.imageUrl}
                      tags={["设备", "技术"]}
                    />
                  ))}
                </div>
              </div>
            ),
          },
          {
            id: "scene-types",
            label: "场景类型",
            icon: <Building className="w-4 h-4" />,
            content: (
              <div className="space-y-6">
                <p className="text-neutral-600 dark:text-neutral-400">
                  不同的城市场景提供独特的拍摄机会和挑战。了解各种场景的特点，可以有针对性地准备和拍摄。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  {sceneCards.map((card, index) => (
                    <TechniqueCard
                      key={index}
                      title={card.title}
                      description={card.description}
                      difficulty={card.difficulty}
                      timeRequired={card.timeRequired}
                      equipment={card.equipment}
                      tips={card.tips}
                      warnings={card.warnings}
                      imageUrl={card.imageUrl}
                      tags={["场景", "环境"]}
                    />
                  ))}
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