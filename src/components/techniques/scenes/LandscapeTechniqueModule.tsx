"use client";

import { useState } from "react";
import { Mountain, Compass, Cloud, Sun, Filter, Camera, Clock } from "lucide-react";
import { TechniqueTabs, StepByStepGuide, BeforeAfterComparison, TechniqueCard } from "../core";

export function LandscapeTechniqueModule() {
  const [activeTab, setActiveTab] = useState("composition");
  
  // 构图步骤
  const compositionSteps = [
    {
      id: "comp1",
      title: "应用三分法则",
      description: "将画面想象成被两条水平线和两条垂直线分成九个相等部分的网格。将重要元素放置在这些线的交叉点上，而不是画面中央。",
      tips: ["天空与地面的比例可以是1:2或2:1，视场景而定", "让地平线与水平线对齐，除非有艺术需要"],
      warnings: ["避免将主体放在正中央，这通常会使画面缺乏动感"]
    },
    {
      id: "comp2",
      title: "建立前景兴趣点",
      description: "在前景添加有趣元素（如岩石、树木、花朵等），引导观众视线进入画面，创造深度感。",
      tips: ["使用广角镜头强调前景元素", "尝试使用低角度拍摄，突出前景"],
      imageUrl: "/images/techniques/landscape-foreground.jpg"
    },
    {
      id: "comp3",
      title: "利用引导线",
      description: "寻找并利用自然引导线（如道路、河流、山脊等）引导观众视线穿过画面，创造动态流动感。",
      tips: ["S形曲线比直线更能创造优雅流动感", "对角线构图可以增加画面的动态感"],
      warnings: ["注意引导线不要引导视线离开画面"]
    },
    {
      id: "comp4",
      title: "寻找自然框架",
      description: "使用环境中的元素（如树木、拱门、岩石等）作为自然框架围绕主体，增强画面层次感和立体感。",
      tips: ["框架可以是部分的，不必完全包围主体", "利用不同焦距控制框架与主体的关系"],
      imageUrl: "/images/techniques/landscape-frame.jpg"
    },
    {
      id: "comp5",
      title: "简化构图",
      description: "去除不必要的干扰元素，保持画面简洁有力。有时候少即是多，尤其在风景摄影中。",
      tips: ["尝试使用长焦压缩景深，突出远处主体", "考虑画面的负空间（空白区域）也是构图的一部分"],
      warnings: ["避免画面过于拥挤，让主体有呼吸空间"]
    }
  ];
  
  // 光线控制步骤
  const lightingSteps = [
    {
      id: "light1",
      title: "选择最佳拍摄时间",
      description: "黄金时段（日出后和日落前的1小时）和蓝色时段（日出前和日落后的半小时）提供最柔和、最有戏剧性的光线。",
      tips: ["使用日出日落计算应用程序规划拍摄", "阴天适合拍摄瀑布和森林，减少对比度"],
      warnings: ["正午时分的直射阳光会产生过强对比度和平淡色彩"]
    },
    {
      id: "light2",
      title: "利用侧光塑造纹理",
      description: "侧光能够突显地形、岩石和植物的纹理细节，创造立体感。晨昏时分的低角度阳光最适合捕捉地形纹理。",
      tips: ["早晨光线偏冷，傍晚光线偏暖", "在沙漠或雪地等纹理丰富的环境中尤其有效"],
      imageUrl: "/images/techniques/landscape-sidelight.jpg"
    },
    {
      id: "light3",
      title: "使用偏振镜控制反射",
      description: "偏振镜可以减少水面、树叶或岩石表面的反光，增强天空蓝色和云彩对比度，使色彩更加饱和。",
      tips: ["效果在与太阳成90°角时最明显", "旋转滤镜找到最佳效果"],
      warnings: ["过度使用会导致天空不自然的深蓝色", "广角镜头下可能产生不均匀的偏振效果"]
    },
    {
      id: "light4",
      title: "处理高对比度场景",
      description: "使用渐变滤镜或HDR技术平衡天空与前景的亮度差异，避免过曝或欠曝区域。",
      tips: ["软边渐变滤镜适合不规则地平线", "考虑手持多重曝光后期合成"],
      warnings: ["避免HDR处理过度，保持自然效果"]
    }
  ];
  
  // 场景类型技巧
  const sceneTypeCards = [
    {
      title: "山地风景摄影",
      description: "山地风景的魅力在于壮丽的尺度和戏剧性的高度变化，拍摄时需要特别注意光影关系和大气层次感。",
      difficulty: "intermediate" as const,
      timeRequired: "半天至一天",
      equipment: [
        { name: "广角镜头", essential: true },
        { name: "三脚架", essential: true },
        { name: "偏振镜", essential: false },
        { name: "渐变滤镜", essential: false }
      ],
      tips: [
        "利用山峰不同层次创造深度",
        "尝试在谷底拍摄向上视角，强调山脉高度",
        "清晨云海和山顶日出是经典场景",
        "观察大气透视效果，远山往往呈现淡蓝色"
      ],
      imageUrl: "/images/techniques/landscape-mountain.jpg"
    },
    {
      title: "海岸线摄影技巧",
      description: "海岸风景的特点是动态海浪与静态陆地的对比，以及潮汐和天气的变化带来的无限可能性。",
      difficulty: "intermediate" as const,
      timeRequired: "2-3小时",
      equipment: [
        { name: "广角镜头", essential: true },
        { name: "坚固三脚架", essential: true },
        { name: "中性密度滤镜", essential: true },
        { name: "防潮装备", essential: true }
      ],
      tips: [
        "使用慢快门（1-30秒）捕捉丝绸般的海浪效果",
        "查询潮汐表，计划在最佳水位拍摄",
        "寻找前景岩石或码头等元素增加构图层次",
        "波浪退去的瞬间拍摄可以捕捉到反光沙滩"
      ],
      warnings: [
        "注意设备安全，防止海水和沙子损坏",
        "关注天气预报，避免危险潮汐和风暴"
      ],
      imageUrl: "/images/techniques/landscape-coast.jpg"
    },
    {
      title: "森林摄影技巧",
      description: "森林摄影的挑战在于控制杂乱的环境，寻找有序的构图和利用过滤光线的特性创造氛围。",
      difficulty: "advanced" as const,
      timeRequired: "2-3小时",
      equipment: [
        { name: "中长焦镜头", essential: true },
        { name: "三脚架", essential: true },
        { name: "偏振镜", essential: false }
      ],
      tips: [
        "雾天或雨后拍摄可以增强森林神秘氛围",
        "找寻重复图案（如树干的垂直线条）创造秩序感",
        "专注于小场景而非整体，避免杂乱",
        "背光拍摄可以突显叶子的半透明效果"
      ],
      warnings: [
        "阳光透过树叶会造成高反差斑点，阴天更适合森林拍摄",
        "注意保护环境，不破坏植被"
      ],
      imageUrl: "/images/techniques/landscape-forest.jpg"
    }
  ];
  
  // 设备设置指南
  const equipmentSettings = [
    {
      title: "风景摄影基础设置",
      description: "掌握这些基本相机设置，捕捉最佳风景照片质量。设置合理的参数是获得清晰、色彩丰富风景照的基础。",
      difficulty: "beginner" as const,
      steps: [
        "使用小光圈（f/8-f/13）获得最大景深和锐度",
        "ISO设置为最低值（通常100-200）减少噪点",
        "使用三脚架并启用延时快门降低相机震动",
        "焦点设在距离约1/3处的地方（超焦距原则）",
        "考虑使用包围曝光功能应对高对比度场景"
      ],
      tips: [
        "每个镜头都有最佳光圈，通常在f/8-f/11之间",
        "启用镜像预升或电子前帘快门减少震动",
        "使用实时取景模式精确对焦于关键元素"
      ]
    },
    {
      title: "风景滤镜使用指南",
      description: "合理使用滤镜系统可以解决许多风景拍摄中的技术挑战，如高对比度和不需要的反射等问题。",
      difficulty: "intermediate" as const,
      steps: [
        "偏振镜：减少反光并增强天空色彩",
        "ND滤镜：延长曝光时间，模糊流水和云彩",
        "渐变ND滤镜：平衡天空与地面亮度差",
        "暖色滤镜：增强日出日落的温暖色调"
      ],
      tips: [
        "考虑使用方形滤镜系统便于叠加多种滤镜",
        "手持偏振镜观察效果再安装到镜头上",
        "在多云天气下，强ND滤镜可创造云层流动效果"
      ],
      warnings: [
        "避免使用廉价滤镜，会降低图像质量",
        "广角镜头上使用偏振镜可能导致天空色彩不均"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <TechniqueTabs
        tabs={[
          {
            id: "composition",
            label: "构图技巧",
            icon: <Compass className="w-4 h-4" />,
            content: (
              <div className="space-y-8">
                <StepByStepGuide
                  title="风景构图五步法"
                  subtitle="掌握这些构图原则，提升风景照片的视觉冲击力"
                  difficulty="intermediate"
                  timeRequired="应在拍摄现场练习30-60分钟"
                  steps={compositionSteps}
                  equipment={[
                    { name: "三脚架", essential: true },
                    { name: "广角镜头", essential: false }
                  ]}
                />
                
                <BeforeAfterComparison
                  beforeImage="/images/techniques/landscape-before-comp.jpg"
                  afterImage="/images/techniques/landscape-after-comp.jpg"
                  beforeLabel="基础构图"
                  afterLabel="优化构图"
                  beforeAlt="未应用构图原则的风景照片"
                  afterAlt="应用三分法则和前景元素后的效果"
                  height={350}
                />
              </div>
            ),
          },
          {
            id: "lighting",
            label: "光线控制",
            icon: <Sun className="w-4 h-4" />,
            content: (
              <div className="space-y-8">
                <StepByStepGuide
                  title="风景光线掌控四步法"
                  subtitle="学会预见和利用自然光线，创造有深度和氛围的风景照片"
                  difficulty="intermediate"
                  timeRequired="需根据光线条件调整拍摄时间"
                  steps={lightingSteps}
                  equipment={[
                    { name: "偏振镜", essential: true },
                    { name: "渐变ND滤镜", essential: true },
                    { name: "三脚架", essential: true }
                  ]}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center">
                        <Sun className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">黄金时段</h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">日出后/日落前1小时</p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      这段时间的光线柔和温暖，侧光创造丰富纹理，是大多数风景摄影的理想时间。色温较暖，适合突显地形层次。
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        <Cloud className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">蓝调时段</h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">日出前/日落后30分钟</p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      天空呈深蓝色，人造光源与自然光形成对比。适合城市景观、海岸和包含水元素的场景。需要长时间曝光。
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center">
                        <Cloud className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">阴天漫射光</h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">云层覆盖时段</p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      云层过滤的光线柔和均匀，对比度低，适合瀑布、森林和溪流等场景。可以全天候拍摄，色彩更加饱和。
                    </p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: "scene-types",
            label: "场景类型",
            icon: <Mountain className="w-4 h-4" />,
            content: (
              <div className="space-y-6">
                <p className="text-neutral-600 dark:text-neutral-400">
                  不同类型的风景场景需要特定的技巧和设备。了解每种场景的特点，能够有针对性地进行准备和拍摄。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  {sceneTypeCards.map((card, index) => (
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
                      tags={["风景", "自然"]}
                    />
                  ))}
                </div>
              </div>
            ),
          },
          {
            id: "equipment",
            label: "设备设置",
            icon: <Camera className="w-4 h-4" />,
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {equipmentSettings.map((setting, index) => (
                    <TechniqueCard
                      key={index}
                      title={setting.title}
                      description={setting.description}
                      difficulty={setting.difficulty}
                      steps={setting.steps}
                      tips={setting.tips}
                      warnings={setting.warnings}
                      tags={["设备", "技术"]}
                    />
                  ))}
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30 mt-6">
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    风景拍摄时间规划
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                    成功的风景摄影50%取决于正确的计划和时间选择。使用以下工具帮助规划最佳拍摄时机：
                  </p>
                  <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2 ml-7 list-disc">
                    <li>日出日落计算器应用（如PhotoPills、The Photographer's Ephemeris）</li>
                    <li>气象雷达应用，预测云层和雨雪情况</li>
                    <li>月相日历（月光拍摄或避免光污染）</li>
                    <li>潮汐表（海岸线拍摄）</li>
                    <li>提前一天到达现场踩点，了解地形和最佳拍摄位置</li>
                  </ul>
                </div>
              </div>
            ),
          },
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        variant="secondary"
      />
    </div>
  );
} 