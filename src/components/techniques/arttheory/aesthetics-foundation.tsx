"use client";

import { motion } from "framer-motion";
import { TheoryCard } from "./shared/theory-card";
import { IllustratedTheoryCard } from "./shared/illustrated-theory-card";
import { ConceptComparison } from "./shared/concept-comparison";
import { ImageGallery } from "./shared/image-gallery";
import { aestheticsImages, aestheticSchoolsImages, visualLanguageImages } from "./shared/art-images";

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
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-2/3">
            <p className="text-lg text-muted-foreground mb-4">
              摄影美学关注影像的艺术表达和审美价值，探讨摄影如何通过独特的视觉语言传达美感和意义。
              理解摄影美学的基本原理，有助于我们欣赏和创作更具艺术性的作品。
            </p>
            <p className="text-lg text-muted-foreground">
              无论是探索形式美学的构图原则，还是研究作品的内容表达，摄影美学为我们提供了理解和评价摄影作品的框架和视角。
            </p>
          </div>
          <div className="md:w-1/3 h-64 relative rounded-lg overflow-hidden shadow-lg">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
              className="w-full h-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1024&auto=format&fit=crop" 
                alt="摄影美学概念图" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影的美学维度</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {aestheticsImages.map((image, index) => (
            <IllustratedTheoryCard
              key={index}
              title={image.title}
              description={image.description!}
              imageSrc={image.src}
              imageAlt={image.alt}
              delay={index + 1}
            />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影美学的历史流派</h3>
        <div className="mb-8">
          <ImageGallery 
            images={aestheticSchoolsImages} 
            columns={4}
          />
        </div>
        <ConceptComparison concepts={aestheticConcepts} />
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影的形式语言</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-accent/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">视觉元素</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {visualLanguageImages.slice(0, 2).map((image, index) => (
                <div key={index} className="relative aspect-video rounded-md overflow-hidden group">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-sm font-medium">{image.title} - {image.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="aspect-video relative rounded-md overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1024&auto=format&fit=crop" 
                alt="摄影构图原则示例" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <p className="text-white text-sm">摄影作品中视觉元素的组织与平衡</p>
              </div>
            </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="relative rounded-lg overflow-hidden aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1024&auto=format&fit=crop" 
              alt="摄影美学实践案例" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/20 flex flex-col justify-end p-6">
              <h4 className="text-white text-xl font-bold mb-2">美学原则的实际运用</h4>
              <p className="text-white/90 text-sm">将理论知识转化为实际拍摄技巧，创作出具有视觉冲击力和艺术表现力的作品</p>
            </div>
          </div>
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
        </div>
      </section>
    </div>
  );
} 