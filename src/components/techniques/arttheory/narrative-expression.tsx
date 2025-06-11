"use client";

import { motion } from "framer-motion";
import { ConceptComparison } from "./shared/concept-comparison";

export function NarrativeExpression() {
  const narrativeApproaches = [
    {
      id: "documentary",
      name: "纪实叙事",
      description: "直接记录现实，尊重事件的真实性和完整性，通过客观的视角展现事实和故事。",
      characteristics: [
        "强调真实性和客观性",
        "尽量减少摄影师的主观干预",
        "注重社会议题和历史见证",
        "保持对被摄主体的尊重和诚实"
      ],
      examples: [
        "战地摄影报道",
        "社会纪实项目",
        "日常生活记录",
        "人类学摄影研究"
      ]
    },
    {
      id: "conceptual",
      name: "概念叙事",
      description: "通过精心设计的影像传达特定概念或思想，强调摄影师的创意构想和策划。",
      characteristics: [
        "以概念和思想为主导",
        "常采用舞台化和构建场景",
        "使用符号和隐喻表达抽象概念",
        "注重作品的思想深度和解读层次"
      ],
      examples: [
        "概念摄影艺术项目",
        "视觉寓言创作",
        "商业概念摄影",
        "实验性摄影作品"
      ]
    },
    {
      id: "personal",
      name: "个人叙事",
      description: "基于摄影师个人经历、记忆和情感的主观表达，探索身份、关系和个人历史。",
      characteristics: [
        "高度主观和个人化的视角",
        "融合自传体元素和私密情感",
        "可能使用日记式或序列式表现",
        "强调真实性与艺术性的平衡"
      ],
      examples: [
        "家庭相册重构",
        "个人成长历程记录",
        "身份探索项目",
        "日记式摄影系列"
      ]
    },
    {
      id: "fictional",
      name: "虚构叙事",
      description: "创造非真实但具有内部逻辑的视觉故事，类似于文学或电影中的虚构叙事。",
      characteristics: [
        "构建虚构场景和角色",
        "使用戏剧化和电影化手法",
        "强调叙事连贯性和故事性",
        "可能混合真实与虚构元素"
      ],
      examples: [
        "舞台化肖像系列",
        "叙事摄影小说",
        "超现实主义场景",
        "想象性场景重建"
      ]
    }
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-6">叙事与表达</h2>
        <p className="text-lg text-muted-foreground mb-8">
          摄影不仅是记录瞬间，更是讲述故事和表达思想的强大媒介。
          通过理解摄影的叙事结构和表达手法，我们可以创作出更具深度和共鸣的影像作品，
          有效地传达情感、思想和复杂的人类经验。
        </p>
      </motion.div>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影叙事的基本元素</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">视觉叙事要素</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">角色/主体</span>
                  <p className="text-sm text-muted-foreground mt-1">照片中的人物、动物或物体，作为叙事的中心。通过姿态、表情、位置和与环境的关系展现其特质和状态。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">场景/环境</span>
                  <p className="text-sm text-muted-foreground mt-1">故事发生的空间背景，提供叙事的物理和社会语境。环境可以补充主体信息，创造氛围，暗示时间和文化背景。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">行动/瞬间</span>
                  <p className="text-sm text-muted-foreground mt-1">捕捉的特定动作或瞬间，暗示更广阔的事件或情感。行动可以是明显的动态，也可以是微妙的姿态或表情变化。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">细节/道具</span>
                  <p className="text-sm text-muted-foreground mt-1">画面中的物品和细节，作为叙事的支持元素。这些元素可以提供额外信息，创造象征意义，增强故事的真实感。</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">叙事结构选择</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">单幅叙事</span>
                  <p className="text-sm text-muted-foreground mt-1">在单一画面中包含完整的叙事元素，依靠"决定性瞬间"或巧妙构图暗示更广阔的故事。挑战在于在有限空间中创造深度和上下文。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">序列叙事</span>
                  <p className="text-sm text-muted-foreground mt-1">通过一系列相关照片展开故事，每张照片可以表现不同角度、时刻或主题方面。序列可以是线性的时间流，也可以是主题的变奏。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">并置叙事</span>
                  <p className="text-sm text-muted-foreground mt-1">通过影像的并置和对比创造意义，利用图像之间的关系和张力形成叙事。这种方法强调联想思维和观者的主动参与解读。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">混合媒介叙事</span>
                  <p className="text-sm text-muted-foreground mt-1">将摄影与文字、声音、视频或其他媒介结合，创造多层次的叙事体验。这种跨媒介方法扩展了摄影的表达边界和叙事可能性。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影叙事的方法论</h3>
        <ConceptComparison concepts={narrativeApproaches} />
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">情感表达的技术手段</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-purple-200/20 rounded-lg p-6">
            <h4 className="text-lg font-medium mb-3">光线运用</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">明亮均匀光线：传达开放、乐观、坦率</p>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">低调暗光：营造神秘、内省、压抑感</p>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">戏剧性明暗对比：强调张力和情感冲突</p>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">侧光：塑造立体感和人物性格</p>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">逆光剪影：创造抽象感和象征意义</p>
              </li>
            </ul>
            <div className="bg-black/20 rounded-lg h-32 mt-4 flex items-center justify-center">
              <p className="text-xs text-muted-foreground px-2 text-center">光线示例图</p>
            </div>
          </div>

          <div className="border border-purple-200/20 rounded-lg p-6">
            <h4 className="text-lg font-medium mb-3">色彩情绪</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">暖色调：亲密、热情、活力</p>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">冷色调：疏离、平静、忧郁</p>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">高饱和度：强烈情感和视觉冲击</p>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">低饱和度：怀旧、距离感、内敛</p>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">色彩对比：强调关系和冲突</p>
              </li>
            </ul>
            <div className="bg-black/20 rounded-lg h-32 mt-4 flex items-center justify-center">
              <p className="text-xs text-muted-foreground px-2 text-center">色彩示例图</p>
            </div>
          </div>

          <div className="border border-purple-200/20 rounded-lg p-6">
            <h4 className="text-lg font-medium mb-3">构图表达</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">开放式构图：自由、无限、可能性</p>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">封闭式构图：约束、定义、聚焦</p>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">低角度拍摄：权威、力量、重要性</p>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">高角度拍摄：脆弱、概览、控制</p>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-1.5"></span>
                <p className="text-sm text-muted-foreground">中心构图：直接、重要、正式</p>
              </li>
            </ul>
            <div className="bg-black/20 rounded-lg h-32 mt-4 flex items-center justify-center">
              <p className="text-xs text-muted-foreground px-2 text-center">构图示例图</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">叙事摄影中的伦理考量</h3>
        <div className="bg-accent/10 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-medium mb-4">代表与再现</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">1</span>
                  <div>
                    <p className="font-medium">代表权的考量</p>
                    <p className="text-sm text-muted-foreground mt-1">谁有权利讲述特定群体或个人的故事？摄影师需反思自己与被摄主体的关系，以及自己讲述他人故事的位置和权限。</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">2</span>
                  <div>
                    <p className="font-medium">避免刻板印象</p>
                    <p className="text-sm text-muted-foreground mt-1">摄影叙事容易强化或复制现有的刻板印象和偏见。摄影师应该意识到这种风险，努力创造更丰富、复杂和真实的再现。</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">3</span>
                  <div>
                    <p className="font-medium">文化敏感性</p>
                    <p className="text-sm text-muted-foreground mt-1">在跨文化摄影中，需要了解并尊重不同文化的价值观、禁忌和表达方式，避免文化挪用和简化的陷阱。</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-medium mb-4">真实与干预</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">1</span>
                  <div>
                    <p className="font-medium">真实性的界限</p>
                    <p className="text-sm text-muted-foreground mt-1">在不同摄影类型中，对真实性的期望和要求各不相同。摄影师需要明确自己作品的真实性承诺，并在编辑和展示中保持一致。</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">2</span>
                  <div>
                    <p className="font-medium">干预的透明度</p>
                    <p className="text-sm text-muted-foreground mt-1">当摄影师积极干预或操控场景时，应考虑这种干预的程度和透明度，尤其是在纪实类型的工作中。</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">3</span>
                  <div>
                    <p className="font-medium">语境完整性</p>
                    <p className="text-sm text-muted-foreground mt-1">照片如何呈现和语境化对其意义有重大影响。摄影师应考虑如何提供足够的背景信息，避免误导性的简化或去语境化。</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">实践应用：叙事项目开发</h3>
        <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
          <h4 className="text-xl font-medium mb-5">叙事摄影项目的步骤</h4>
          <ol className="space-y-6">
            <li className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">1</span>
              <div>
                <p className="font-medium">确定核心叙事</p>
                <p className="text-sm text-muted-foreground mt-1">明确你想讲述的核心故事或探索的中心主题。思考这个故事对你和潜在观众的意义，以及为什么它值得通过摄影来讲述。</p>
                <div className="mt-2 bg-black/20 p-2 rounded">
                  <p className="text-xs text-muted-foreground"><strong>提问：</strong> 我想传达什么核心信息或情感？这个故事的独特性和普遍性在哪里？</p>
                </div>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">2</span>
              <div>
                <p className="font-medium">研究与规划</p>
                <p className="text-sm text-muted-foreground mt-1">深入研究你的主题背景，包括历史、社会和文化语境。研究类似主题的摄影作品，寻找灵感但避免简单模仿。制定拍摄计划和视觉策略。</p>
                <div className="mt-2 bg-black/20 p-2 rounded">
                  <p className="text-xs text-muted-foreground"><strong>提问：</strong> 我需要什么背景知识？哪些视觉元素最能支持我的叙事？我要采用什么样的视觉风格和语言？</p>
                </div>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">3</span>
              <div>
                <p className="font-medium">拍摄与收集</p>
                <p className="text-sm text-muted-foreground mt-1">根据计划进行拍摄，但也要保持开放和灵活，允许意外发现和叙事的自然演变。收集多样化的素材，包括不同视角、尺度和情感基调的图像。</p>
                <div className="mt-2 bg-black/20 p-2 rounded">
                  <p className="text-xs text-muted-foreground"><strong>提问：</strong> 我是否捕捉了足够多样的素材？这些图像是否真实反映了我想讲述的故事？是否有遗漏的重要元素？</p>
                </div>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">4</span>
              <div>
                <p className="font-medium">编辑与排序</p>
                <p className="text-sm text-muted-foreground mt-1">选择最能支持叙事的图像，并决定它们的排列顺序。这个过程不仅是技术性的，也是创造性的，涉及到节奏控制、情感弧线和视觉连贯性的建立。</p>
                <div className="mt-2 bg-black/20 p-2 rounded">
                  <p className="text-xs text-muted-foreground"><strong>提问：</strong> 这些图像如何相互关联？它们共同创造了什么样的叙事体验？序列中是否有视觉或叙事上的弱点？</p>
                </div>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">5</span>
              <div>
                <p className="font-medium">呈现与语境化</p>
                <p className="text-sm text-muted-foreground mt-1">决定作品的最终呈现形式，可能是展览、书籍、网站或多媒体装置等。考虑是否需要文字说明、声音或其他元素来支持和丰富叙事。</p>
                <div className="mt-2 bg-black/20 p-2 rounded">
                  <p className="text-xs text-muted-foreground"><strong>提问：</strong> 哪种呈现形式最适合这个叙事？观众需要什么样的语境信息才能充分理解和体验这个故事？</p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
} 