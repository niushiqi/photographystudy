"use client";

import { motion } from "framer-motion";
import { TheoryCard } from "./shared/theory-card";
import { ConceptComparison } from "./shared/concept-comparison";

export function AestheticsFoundation() {
  const aestheticConcepts = [
    {
      id: "pictorialism",
      name: "绘画主义",
      description: "认为摄影应该像绘画一样表达作者的主观感受和艺术构想，强调画面的艺术性和情感表达。",
      characteristics: [
        "追求柔焦效果，模糊的画面质感",
        "重视画面的构图和氛围营造",
        "常使用特殊处理工艺创造艺术效果",
        "强调摄影师的主观表达和情感投入"
      ],
      examples: [
        "阿尔弗雷德·斯蒂格利兹早期作品",
        "爱德华·斯泰肯的《水坑》",
        "罗伯特·德马奇的肖像作品"
      ]
    },
    {
      id: "straight-photography",
      name: "直接摄影",
      description: "倡导摄影应该尊重其独特的机械本质，强调客观、锐利的画面和对现实的忠实记录。",
      characteristics: [
        "清晰锐利的画面表现",
        "强调摄影的客观记录特性",
        "尊重摄影媒介的独特性",
        "拒绝过度的修饰和处理"
      ],
      examples: [
        "安塞尔·亚当斯的风景作品",
        "保罗·斯特兰德的城市摄影",
        "爱德华·韦斯顿的静物摄影"
      ]
    },
    {
      id: "documentary",
      name: "纪实主义",
      description: "关注社会现实和人文议题，以客观记录的方式展现真实世界，强调摄影的社会价值和见证功能。",
      characteristics: [
        "关注社会问题和人文主题",
        "力求真实客观的记录",
        "强调摄影的见证价值",
        "注重摄影的社会功能和影响力"
      ],
      examples: [
        "多萝西娅·兰格的大萧条摄影",
        "沃克·埃文斯的《让我们赞美著名的人》",
        "亨利·卡蒂埃-布列松的街头摄影"
      ]
    },
    {
      id: "conceptual",
      name: "观念摄影",
      description: "将摄影作为表达思想和概念的媒介，注重作品背后的理念，而非纯粹的视觉呈现。",
      characteristics: [
        "以观念和概念为主导",
        "常采用系列化、程式化的表现",
        "重视作品的语境和解读",
        "挑战传统的美学和表现形式"
      ],
      examples: [
        "贝歇夫妇的工业建筑类型学",
        "约瑟夫·科苏斯的《一把椅子和三把椅子》",
        "辛迪·舍曼的《无题电影剧照》"
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
        <h2 className="text-3xl font-bold mb-6">摄影美学基础理论</h2>
        <p className="text-lg text-muted-foreground mb-8">
          摄影美学关注影像的艺术表达和审美价值，探讨摄影如何通过独特的视觉语言传达美感和意义。
          理解摄影美学的基本原理，有助于我们欣赏和创作更具艺术性的作品。
        </p>
      </motion.div>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影的美学维度</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TheoryCard
            title="形式美学"
            description="关注画面构成的形式元素，如线条、形状、光影、色彩等视觉要素的组织和平衡。形式美学强调画面的视觉节奏和结构，以及这些元素如何引导观者的视线和情感体验。"
            delay={1}
          />
          <TheoryCard
            title="内容美学"
            description="聚焦于摄影作品所呈现的主题和内容，以及其所传达的情感、思想和社会意义。内容美学认为好的摄影作品应该超越纯粹的视觉愉悦，具有思想深度和人文关怀。"
            delay={2}
          />
          <TheoryCard
            title="表现美学"
            description="探讨摄影师如何通过个人独特的视角和表现手法，传达其对世界的主观感受和理解。表现美学强调摄影师的创作意图和个人风格对作品最终呈现的重要性。"
            delay={3}
          />
          <TheoryCard
            title="情境美学"
            description="考察摄影作品在特定历史、文化和社会语境中的意义。情境美学认为摄影作品的理解和欣赏不能脱离其创作和观看的具体环境，强调作品与语境的互动关系。"
            delay={4}
          />
          <TheoryCard
            title="过程美学"
            description="关注摄影创作的过程和方法，而非仅仅是最终成像。过程美学认为摄影的美感部分源自其独特的工艺过程和摄影师与被摄对象之间的互动关系。"
            delay={5}
          />
          <TheoryCard
            title="接受美学"
            description="研究观者如何感知和解读摄影作品。接受美学强调观看者在作品意义生成过程中的主动参与，认为摄影作品的意义并非固定不变，而是在观看过程中不断重构。"
            delay={6}
          />
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影美学的历史流派</h3>
        <ConceptComparison concepts={aestheticConcepts} />
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影的形式语言</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-accent/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">视觉元素</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">线条</span>
                  <p className="text-sm text-muted-foreground mt-1">引导视线、创造动感和情绪，可以是明显的物理线条，也可以是由元素排列形成的隐含线条。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">形状与体积</span>
                  <p className="text-sm text-muted-foreground mt-1">通过二维平面暗示三维空间，创造画面的深度感和实体感，形成视觉重量和平衡。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">质感</span>
                  <p className="text-sm text-muted-foreground mt-1">通过光线和对焦的控制，再现被摄物体的表面特性，增强画面的触觉性和物质感。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">色彩</span>
                  <p className="text-sm text-muted-foreground mt-1">通过色相、饱和度和明度的组合，创造特定的情绪和氛围，建立视觉层次和重点。</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-accent/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">组织原则</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">平衡</span>
                  <p className="text-sm text-muted-foreground mt-1">元素在画面中的分布形成视觉重量的平衡，可以是对称的正式平衡，也可以是非对称的动态平衡。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">节奏与重复</span>
                  <p className="text-sm text-muted-foreground mt-1">通过元素的重复和变化，创造画面的视觉节奏和运动感，引导观者的视线流动。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">对比</span>
                  <p className="text-sm text-muted-foreground mt-1">利用明暗、大小、形状、色彩等元素的差异，创造视觉张力和戏剧性，强调主体。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">统一与多样</span>
                  <p className="text-sm text-muted-foreground mt-1">在保持画面整体统一感的同时，通过元素的多样性创造趣味和复杂性，避免单调。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">美学理论在实践中的应用</h3>
        <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
          <h4 className="text-xl font-medium mb-4">如何培养摄影美学感知</h4>
          <ol className="space-y-4">
            <li className="flex">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">1</span>
              <div>
                <p className="font-medium">广泛欣赏摄影作品</p>
                <p className="text-sm text-muted-foreground mt-1">定期观看不同风格、流派和时期的摄影作品，培养视觉敏感性和审美参照系。重点关注经典摄影师的作品集和重要摄影展览。</p>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">2</span>
              <div>
                <p className="font-medium">学习形式分析方法</p>
                <p className="text-sm text-muted-foreground mt-1">练习分析摄影作品的形式元素和构成原则，理解画面的视觉结构和元素关系。尝试用语言描述作品的视觉特征和组织逻辑。</p>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">3</span>
              <div>
                <p className="font-medium">理解历史和文化语境</p>
                <p className="text-sm text-muted-foreground mt-1">将摄影作品放在其历史、文化和社会背景中理解，认识不同时期和地区的美学观念和视觉传统。关注摄影与其他艺术形式的关联。</p>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">4</span>
              <div>
                <p className="font-medium">进行美学实验</p>
                <p className="text-sm text-muted-foreground mt-1">在自己的摄影实践中有意识地应用不同的美学原则和表现手法，观察和分析效果。尝试以特定的美学理念或风格为指导进行创作。</p>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">5</span>
              <div>
                <p className="font-medium">接受多元的审美观念</p>
                <p className="text-sm text-muted-foreground mt-1">保持开放的心态，接触和理解不同文化和传统中的美学观念。避免用单一标准评判所有作品，欣赏多样化的表达方式和审美取向。</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
} 