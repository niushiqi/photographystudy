import React from 'react';
import Image from 'next/image';
import PortraitAssistant from '@/components/techniques/core/PortraitAssistant';
import { HiOutlineCamera, HiLightBulb, HiOutlineAdjustments } from 'react-icons/hi';

export default function PortraitTipsPage() {
  // 人像摄影示例作品
  const portraitExamples = [
    {
      id: 1,
      title: "自然光窗户肖像",
      author: "李明",
      description: "利用窗户的自然光线创造柔和的侧光效果，营造安静而温馨的氛围。",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000",
      settings: "50mm, f/1.8, 1/125s, ISO 200"
    },
    {
      id: 2,
      title: "户外阳光逆光肖像",
      author: "王静",
      description: "在日落时分利用逆光创造轮廓光，搭配反光板填充面部阴影。",
      imageUrl: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?q=80&w=1000",
      settings: "85mm, f/2.8, 1/500s, ISO 100"
    },
    {
      id: 3,
      title: "城市街头人像",
      author: "张强",
      description: "在城市背景中捕捉自然的人物表情，利用建筑线条增强构图。",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000",
      settings: "35mm, f/2.0, 1/250s, ISO 400"
    },
    {
      id: 4,
      title: "工作室低调光影",
      author: "陈艺",
      description: "采用雷姆布兰特式光线，强调面部轮廓和表情，创造戏剧性效果。",
      imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000",
      settings: "100mm, f/5.6, 1/160s, ISO 100"
    },
  ];

  // 人像摄影关键技巧
  const keyTechniques = [
    {
      title: "连接与互动",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>,
      description: "建立与被摄者的良好关系和沟通，引导自然表情和姿态。摄影不仅仅是技术，更是人与人之间的互动。",
    },
    {
      title: "精准对焦",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      description: "始终对焦在眼睛上，特别是靠近相机的那只眼睛，确保面部清晰是人像摄影的基本要求。",
    },
    {
      title: "光线塑形",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>,
      description: "理解不同光源和方向如何塑造面部特征，学会利用自然光和人造光创造理想的光线效果。",
    },
    {
      title: "有效构图",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>,
      description: "运用三分法、引导线和framing等构图技巧，创造视觉引导并突出人物主体。",
    },
    {
      title: "镜头选择",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>,
      description: "85-135mm焦距通常是面部肖像的理想选择，避免使用广角镜头造成面部失真。",
    },
    {
      title: "后期修饰",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>,
      description: "学习适当的后期处理技巧，包括肤色调整、修饰瑕疵和整体色调统一，但保持自然效果。",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 标题区域 */}
      <div className="text-center mb-12">
        <span className="bg-purple-900/30 text-purple-400 rounded-full px-4 py-1.5 text-sm font-medium inline-block mb-4">
          拍摄技巧
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
          人像摄影指南
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          无论是自然光下的随性抓拍，还是精心布置的工作室肖像，掌握这些技巧将帮助你捕捉最真实动人的人像作品。
        </p>
      </div>

      {/* 特色图片区 */}
      <div className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-16">
        <Image 
          src="https://images.unsplash.com/photo-1541845157-a6d2d100c931?q=80&w=1770"
          alt="人像摄影"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">捕捉真实情感与美丽瞬间</h2>
          <p className="text-gray-200 max-w-2xl">摄影最大的魅力在于记录真实的情感与表情。人像摄影不仅仅是技术的展示，更是摄影师与被摄者之间情感连接的结晶。</p>
        </div>
      </div>

      {/* 技巧预览卡片 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-100">
            人像摄影核心技巧
          </h2>
          <span className="text-sm text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">
            专业要点
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyTechniques.map((technique, index) => (
            <div key={index} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6 hover:bg-gray-750 transition-colors">
              <div className="flex items-start">
                <div className="bg-purple-900/30 p-3 rounded-lg mr-4 text-purple-400">
                  {technique.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{technique.title}</h3>
                  <p className="text-gray-400 text-sm">{technique.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 人像助手交互工具 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-100">
            互动人像助手
          </h2>
          <span className="text-sm text-purple-400 bg-purple-900/30 px-3 py-1 rounded-full">
            交互式指导
          </span>
        </div>
        
        <PortraitAssistant 
          posingSuggestions={true}
          lightingDiagrams={true}
          interactionTechniquesEnabled={true}
          environmentalOptions={["indoor", "outdoor", "studio"]}
          subjectTypes={["individual", "couple", "group"]}
        />
      </section>

      {/* 快速技巧列表 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-100">
            实用快速技巧
          </h2>
          <span className="text-sm text-green-400 bg-green-900/30 px-3 py-1 rounded-full">
            立即应用
          </span>
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start bg-gray-750 rounded-lg p-4">
                <div className="bg-blue-900/30 p-2 rounded-full mr-4 flex-shrink-0 mt-1">
                  <HiOutlineCamera className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">85mm黄金焦段</h3>
                  <p className="text-gray-400 text-sm">85mm是人像摄影中最受欢迎的焦段之一，它提供了自然的视角和令人愉悦的背景虚化，同时保持适当的工作距离。</p>
                </div>
              </div>
              
              <div className="flex items-start bg-gray-750 rounded-lg p-4">
                <div className="bg-green-900/30 p-2 rounded-full mr-4 flex-shrink-0 mt-1">
                  <HiOutlineAdjustments className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">大光圈，浅景深</h3>
                  <p className="text-gray-400 text-sm">使用f/1.8-2.8的大光圈可以创造浅景深效果，让主体从背景中脱颖而出。但要注意确保眼睛处于对焦点。</p>
                </div>
              </div>
              
              <div className="flex items-start bg-gray-750 rounded-lg p-4">
                <div className="bg-purple-900/30 p-2 rounded-full mr-4 flex-shrink-0 mt-1">
                  <HiLightBulb className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">黄金时段拍摄</h3>
                  <p className="text-gray-400 text-sm">日出后和日落前的1-2小时是户外人像拍摄的理想时间，柔和温暖的光线可以让肤色更加自然美丽。</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-750 rounded-lg p-5 border-l-4 border-blue-500">
              <h3 className="text-white font-medium mb-2">专业提示: 引导而非命令</h3>
              <p className="text-gray-400 text-sm">
                不要简单地命令被摄者摆出姿势，而是提供具体的场景引导和反馈。例如，不要说"微笑"，而是说"想象你刚收到一个期待已久的好消息"。这样能获得更自然真实的表情。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 示例作品展示 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-100">
            作品案例赏析
          </h2>
          <span className="text-sm text-amber-400 bg-amber-900/30 px-3 py-1 rounded-full">
            技术解析
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portraitExamples.map((example) => (
            <div key={example.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-72">
                <Image 
                  src={example.imageUrl} 
                  alt={example.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-white font-medium text-lg mb-1">{example.title}</h3>
                <p className="text-gray-500 text-sm mb-3">摄影师: {example.author}</p>
                <p className="text-gray-400 text-sm mb-4">{example.description}</p>
                <div className="bg-gray-750 rounded-lg py-3 px-4">
                  <p className="text-blue-400 text-sm">
                    <span className="text-gray-400">拍摄参数: </span>
                    {example.settings}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 进阶学习资源 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-100">
            进阶学习资源
          </h2>
          <span className="text-sm text-pink-400 bg-pink-900/30 px-3 py-1 rounded-full">
            深度学习
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
            <div className="relative h-48">
              <Image 
                src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=1000" 
                alt="人像摄影教程"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">视频教程</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-white font-bold text-lg mb-2">完整人像摄影指南</h3>
              <p className="text-gray-400 text-sm mb-4 flex-1">从基础到高级的人像拍摄技法，包括光线、构图和后期处理的全方位讲解。</p>
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 text-center text-sm font-medium">
                观看教程
              </a>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
            <div className="relative h-48">
              <Image 
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1000" 
                alt="人像摄影电子书"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">电子书</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-white font-bold text-lg mb-2">灯光与氛围营造</h3>
              <p className="text-gray-400 text-sm mb-4 flex-1">深入探讨如何通过灯光塑造不同风格的人像氛围，包含50+实用灯光布置示意图。</p>
              <a href="#" className="bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 px-4 text-center text-sm font-medium">
                下载电子书
              </a>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
            <div className="relative h-48">
              <Image 
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1000" 
                alt="人像摄影练习"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">实践挑战</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-white font-bold text-lg mb-2">30天人像挑战</h3>
              <p className="text-gray-400 text-sm mb-4 flex-1">每天一个不同的人像拍摄任务，帮助你通过实践系统性地提升人像摄影技能。</p>
              <a href="#" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 px-4 text-center text-sm font-medium">
                加入挑战
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题解答 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-100">
            常见问题解答
          </h2>
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">初学者应该使用什么相机和镜头拍摄人像？</h3>
              <p className="text-gray-400">入门级单反或无反相机都可以，搭配50mm f/1.8定焦镜头是性价比最高的组合。这种焦距接近人眼视角，大光圈可以获得漂亮的背景虚化。</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">如何让被摄者在拍摄时放松自然？</h3>
              <p className="text-gray-400">先花时间交谈建立信任，拍摄时保持轻松的氛围和交流，给予正面反馈，并展示一些好看的照片增强信心。避免沉默和过于技术性的指导。</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">如何处理不同肤色的光线和后期问题？</h3>
              <p className="text-gray-400">拍摄时使用柔和的光线和反光板，曝光适中。后期处理时避免过度美白或改变肤色，保持自然色调。可以单独调整肤色区域的色温和色调以获得最佳效果。</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">室内自然光人像有何技巧？</h3>
              <p className="text-gray-400">选择大窗户旁拍摄，最好是北向窗户提供柔和均匀的光线。让被摄者侧对窗户45-90度，而非直接面对。可使用白色反光板或纸板填充脸部阴影。阴天效果通常比晴天更好。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 