"use client";

import { motion } from "framer-motion";
import { TheoryCard } from "./shared/theory-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function VisualLanguage() {
  const compositionPrinciples = [
    {
      name: "三分法则",
      description: "将画面水平和垂直各分为三等分，形成九个区域和四个交叉点。重要元素通常放置在交叉点上或沿着分割线，以创造平衡且有趣的构图。",
      examples: ["风景摄影中地平线的放置", "肖像摄影中眼睛的位置", "静物摄影中主体的安排"]
    },
    {
      name: "引导线",
      description: "利用画面中的线条元素(如道路、河流、围栏)引导观者的视线流向主体或穿过画面，创造深度感和视觉动态。",
      examples: ["通过道路引向远处的风景", "使用栏杆引向人物", "利用阴影线条引导视线"]
    },
    {
      name: "框架构图",
      description: "使用画面内的元素(如门窗、树枝、拱门)形成自然框架，围绕主体，增强深度感并将注意力集中在主题上。",
      examples: ["通过门框拍摄风景", "使用树枝框住建筑", "通过隧道展示远景"]
    },
    {
      name: "对称与平衡",
      description: "可以是形式对称(左右或上下镜像)或非形式对称(视觉权重平衡)。对称构图传达稳定和和谐，非对称构图则更具张力和活力。",
      examples: ["建筑物的正面对称", "水面倒影创造的自然对称", "不同大小元素的视觉平衡"]
    },
    {
      name: "图形与形状",
      description: "识别和利用画面中的基本几何形状(圆形、三角形、矩形等)创造视觉结构和组织元素，形成统一的视觉语言。",
      examples: ["三角形构图增加稳定感", "圆形元素传达完整和谐", "重复形状创造节奏感"]
    },
    {
      name: "负空间",
      description: "有意识地利用主体周围的空白区域增强构图效果。适当的负空间可以突出主体，增加画面呼吸感，传达简洁和精炼。",
      examples: ["极简主义肖像", "广阔天空中的单一元素", "空旷环境中的孤立主体"]
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
        <h2 className="text-3xl font-bold mb-6">视觉语言学</h2>
        <p className="text-lg text-muted-foreground mb-8">
          视觉语言是摄影师用来组织画面、传达意义和情感的基本元素和原则。
          了解视觉语言的结构和规则，可以帮助摄影师更有效地构建有力且具表现力的影像，
          就像作家掌握文字和语法可以创作出更有感染力的文学作品。
        </p>
      </motion.div>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">视觉语言的基本元素</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TheoryCard
            title="点"
            description="画面中最基本的视觉元素，能够吸引视线并成为视觉焦点。在摄影中，孤立的物体、明亮的高光或显著的色彩区域都可以作为点元素，引导观者注意力。"
            delay={0.1}
          />
          <TheoryCard
            title="线"
            description="由点的延伸形成，能够引导视线、划分空间并创造动感。线条可以是明确的(如建筑边缘)或暗示的(如排列的物体)，不同线条传达不同情绪：水平线传达平静，垂直线传达力量，对角线传达动态。"
            delay={0.2}
          />
          <TheoryCard
            title="形状"
            description="由线条围合形成的二维轮廓。基本形状(圆形、三角形、方形)具有普遍的心理联想：圆形传达和谐与完整，三角形传达稳定与能量，方形传达秩序与结构。"
            delay={0.3}
          />
          <TheoryCard
            title="质感"
            description="物体表面特性的视觉再现，通过光线和对焦控制表现。质感增强了画面的真实感和触觉性，能够唤起观者的感官记忆和情感响应。"
            delay={0.4}
          />
          <TheoryCard
            title="色彩"
            description="最具情感表现力的视觉元素，通过色相(颜色类型)、饱和度(纯度)和明度(亮度)产生不同的心理效果。色彩可以创造空间层次、引导注意力并传达特定情绪和氛围。"
            delay={0.5}
          />
          <TheoryCard
            title="空间"
            description="通过二维平面暗示三维空间感的方式。摄影师利用透视、重叠、大小关系、焦点控制等技术创造空间深度，影响观者对场景的感知和参与感。"
            delay={0.6}
          />
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">构图原则</h3>
        <div className="bg-accent/10 rounded-xl p-6 mb-8">
          <Tabs defaultValue="principle1" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-start gap-2 bg-transparent p-0 mb-6">
              {compositionPrinciples.map((principle, index) => (
                <TabsTrigger 
                  key={index}
                  value={`principle${index + 1}`} 
                  className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-4 py-1.5 text-sm transition-all"
                >
                  {principle.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {compositionPrinciples.map((principle, index) => (
              <TabsContent key={index} value={`principle${index + 1}`} className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-2">
                    <h4 className="text-xl font-medium mb-3">{principle.name}</h4>
                    <p className="text-muted-foreground mb-4">{principle.description}</p>
                    <div className="space-y-2">
                      <p className="font-medium text-sm">应用实例：</p>
                      <ul className="list-disc list-inside space-y-1">
                        {principle.examples.map((example, i) => (
                          <li key={i} className="text-sm text-muted-foreground">{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-black/20 rounded-lg aspect-square flex items-center justify-center">
                    <p className="text-sm text-muted-foreground text-center px-4">示意图位置</p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">视觉重量与平衡</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">视觉重量的影响因素</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">大小与比例</span>
                  <p className="text-sm text-muted-foreground mt-1">画面中较大的元素通常具有更大的视觉重量，会吸引更多注意力。相对尺寸也影响重量感，孤立的小物体在空旷环境中可能具有显著视觉存在感。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">色彩与对比</span>
                  <p className="text-sm text-muted-foreground mt-1">鲜艳和饱和的色彩比柔和色调具有更大的视觉重量。高对比度区域会吸引视线，形成视觉重点。暖色调(红、橙、黄)通常比冷色调(蓝、绿)显得更重。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">位置与方向</span>
                  <p className="text-sm text-muted-foreground mt-1">画面右侧的元素通常比左侧具有更大的视觉重量。同样，画面上方的元素比下方的感觉更重。元素的方向也会影响视觉流动和权重分布。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">复杂性与细节</span>
                  <p className="text-sm text-muted-foreground mt-1">具有复杂纹理和丰富细节的区域会吸引更多注意力，增加视觉重量。相比之下，简单、均匀的区域视觉重量较轻，提供视觉休息空间。</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">平衡类型</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">形式平衡(对称)</span>
                  <p className="text-sm text-muted-foreground mt-1">元素在画面中心轴两侧均匀分布，创造稳定、正式和和谐的感觉。适合表现庄重、传统和永恒的主题，如经典建筑、正式肖像等。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">非形式平衡(不对称)</span>
                  <p className="text-sm text-muted-foreground mt-1">通过视觉重量而非位置对称来实现平衡。比如，画面一侧的大元素可以与另一侧的多个小元素平衡。创造更动态、现代和有趣的视觉体验。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">放射平衡</span>
                  <p className="text-sm text-muted-foreground mt-1">元素从中心点向外辐射，创造动态的环形平衡。这种构图引导视线从中心向外或从外向中心移动，强调中心点的重要性。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <div>
                  <span className="font-medium">有意失衡</span>
                  <p className="text-sm text-muted-foreground mt-1">有时，摄影师会故意创造视觉不平衡，传达紧张、不安或动态感。这种技巧需要谨慎使用，以确保画面仍具有视觉连贯性和意图性。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">视觉节奏与模式</h3>
        <div className="bg-accent/10 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-medium mb-4">节奏的创建方式</h4>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">1</span>
                  <div>
                    <p className="font-medium">重复</p>
                    <p className="text-sm text-muted-foreground mt-1">相同或相似元素的重复出现创造基本节奏。例如连续的窗户、行人或树木排列，形成有规律的视觉韵律。</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">2</span>
                  <div>
                    <p className="font-medium">渐进变化</p>
                    <p className="text-sm text-muted-foreground mt-1">元素逐渐变化的序列，如大小递增、颜色渐变或形状演变，创造动态节奏，引导视线沿特定方向移动。</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">3</span>
                  <div>
                    <p className="font-medium">交替</p>
                    <p className="text-sm text-muted-foreground mt-1">两种或多种元素的规则交替出现，如明暗交替、色彩交替或形状交替，创造更复杂的视觉节奏。</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">4</span>
                  <div>
                    <p className="font-medium">破节</p>
                    <p className="text-sm text-muted-foreground mt-1">在规则模式中引入异常或中断，创造视觉焦点和兴趣点。这种"破坏规则"的元素往往成为画面的主体。</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-medium mb-4">节奏的表现效果</h4>
              <div className="space-y-4">
                <div className="border border-purple-200/20 rounded-lg p-4">
                  <h5 className="font-medium mb-2">叙事性</h5>
                  <p className="text-sm text-muted-foreground">视觉节奏可以暗示时间流动和变化过程，帮助表达叙事和转变。例如，从亮到暗的渐变可以暗示一天的流逝或情绪变化。</p>
                </div>
                <div className="border border-purple-200/20 rounded-lg p-4">
                  <h5 className="font-medium mb-2">情绪表达</h5>
                  <p className="text-sm text-muted-foreground">不同类型的节奏能唤起不同情绪。规则、缓慢的节奏传达平静和秩序；快速、复杂的节奏则传达活力和兴奋；突然的节奏中断可以创造戏剧性和紧张感。</p>
                </div>
                <div className="border border-purple-200/20 rounded-lg p-4">
                  <h5 className="font-medium mb-2">视觉连贯性</h5>
                  <p className="text-sm text-muted-foreground">节奏和模式帮助整合画面的不同部分，创造视觉连贯性和统一感。特别在复杂场景中，识别和强调潜在模式可以带来秩序和意义。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">视觉语言的上下文依赖性</h3>
        <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
          <p className="text-muted-foreground mb-6">
            视觉语言并非普遍适用的固定规则，而是受文化、历史和个人经验深刻影响的符号系统。
            理解视觉元素和构图原则的文化和历史维度，有助于我们创作更丰富、更有深度的摄影作品。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-3">文化差异</h4>
              <p className="text-sm text-muted-foreground">
                不同文化对视觉元素的解读和使用存在显著差异。例如，西方传统阅读习惯从左到右，影响了视觉流动和构图习惯；
                而东亚传统则有从上到下、从右到左的阅读方向，形成不同的视觉动态。色彩象征意义也有文化差异：白色在西方常代表纯洁，
                在某些东方文化中却与丧葬相关。了解这些差异对跨文化摄影和全球化语境下的视觉传达至关重要。
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-3">历史演变</h4>
              <p className="text-sm text-muted-foreground">
                视觉语言随时代变迁而演变。早期摄影受绘画传统影响，遵循古典构图原则；现代主义强调形式实验和抽象；
                后现代摄影则挑战传统规则，混合多元风格。理解这一历史演变，有助于我们将自己的创作置于更广阔的摄影传统中，
                有意识地继承、发展或挑战特定的视觉语言传统。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 