"use client";

import { motion } from "framer-motion";
import { ArtistExplorer } from "./shared/artist-explorer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ArtistStudies() {
  const classicalArtists = [
    {
      name: "亨利·布列松",
      period: "1908-2004",
      nationality: "法国",
      knownFor: "决定性瞬间",
      description: "布列松被誉为街头摄影之父，提出了决定性瞬间的理念，强调捕捉那一刻形式与内容的完美融合。",
      contribution: "他确立了35mm摄影的经典方法论，影响了几代摄影师。",
      keyWorks: ["巴黎后面的火车站", "西班牙内战", "马德里", "塞维利亚"],
      techniques: ["35mm相机", "黑白摄影", "自然光线", "不裁剪", "街头捕捉"]
    },
    {
      name: "安塞尔·亚当斯",
      period: "1902-1984",
      nationality: "美国",
      knownFor: "风景摄影",
      description: "亚当斯是美国著名的风景摄影师，以其黑白摄影闻名。",
      contribution: "他开发了区域系统曝光方法，提高了黑白摄影的技术精度。",
      keyWorks: ["月升", "冬季优胜美地", "蛇河弯", "树枝"],
      techniques: ["大画幅相机", "区域系统", "黑白片", "深焦摄影", "精准显影"]
    },
    {
      name: "多萝西娅·兰格",
      period: "1895-1965",
      nationality: "美国",
      knownFor: "纪实摄影",
      description: "兰格是美国重要的纪实摄影师，以大萧条时期的人文肖像闻名。",
      contribution: "她的作品重新定义了纪实摄影的力量，成为社会变革的催化剂。",
      keyWorks: ["移民母亲", "白人佃农", "被驱逐的佃农", "人类侵蚀"],
      techniques: ["中画幅相机", "自然光肖像", "环境人像", "直接接触", "情感叙事"]
    }
  ];

  const modernArtists = [
    {
      name: "辛迪·舍曼",
      period: "1954-至今",
      nationality: "美国",
      knownFor: "概念自拍",
      description: "舍曼以自拍作品闻名，将自己变成不同角色和身份。",
      contribution: "她的作品模糊了摄影与表演的界限，对女性主义艺术有深远影响。",
      keyWorks: ["无题电影剧照", "历史肖像", "克劳恩系列", "时尚系列"],
      techniques: ["自我扮演", "布景摄影", "身份转换", "角色扮演", "批判表征"]
    },
    {
      name: "安德烈亚斯·古尔斯基",
      period: "1955-至今",
      nationality: "德国",
      knownFor: "大型摄影",
      description: "古尔斯基以超大尺寸、极其详细的照片闻名。",
      contribution: "他重新定义了摄影的物理和概念尺度，拓展了摄影的表现可能性。",
      keyWorks: ["莱茵河", "99美分", "巴黎", "库威特证券交易所"],
      techniques: ["大幅面相机", "高分辨率", "超大打印", "数字拼接", "建筑记录"]
    },
    {
      name: "南·戈尔丁",
      period: "1953-至今",
      nationality: "美国",
      knownFor: "私密摄影",
      description: "戈尔丁以私密的肖像和场景闻名，记录了她周围的生活。",
      contribution: "她的作品将个人经历转化为公共话语，重新定义了纪实摄影。",
      keyWorks: ["欲望的舞厅", "丽莎和瓦伦丁", "自画像", "床上场景"],
      techniques: ["直接闪光", "私密场景", "日记式记录", "情感坦率", "生活记录"]
    }
  ];

  const contemporaryArtists = [
    {
      name: "张晓刚",
      period: "1958-至今",
      nationality: "中国",
      knownFor: "概念摄影",
      description: "张晓刚是中国当代著名艺术家，以绘画和摄影作品闻名。",
      contribution: "他的作品促进了对中国当代艺术的认识，提供了独特视角。",
      keyWorks: ["大家庭系列", "记忆的重构", "身份档案", "血缘"],
      techniques: ["数字合成", "概念构建", "文化符号", "历史引用", "身份探索"]
    },
    {
      name: "沃尔夫冈·提尔曼斯",
      period: "1968-至今",
      nationality: "德国",
      knownFor: "生活摄影",
      description: "提尔曼斯以其看似随意的日常生活照片闻名。",
      contribution: "他的作品挑战了摄影技术完美和主题重要性的传统观念。",
      keyWorks: ["Burg", "Concorde", "裸背肖像", "房间系列"],
      techniques: ["35mm胶片", "自然光线", "随意构图", "日常场景", "亲密感"]
    },
    {
      name: "希基·杰克逊",
      period: "1977-至今",
      nationality: "英国",
      knownFor: "互联网摄影",
      description: "杰克逊利用网络技术收集的图像创作，挑战传统摄影。",
      contribution: "她的作品探索了数字时代摄影的新边界，影响了当代摄影实践。",
      keyWorks: ["惊人的风景", "七年的牧场", "无限集", "谷歌街景系列"],
      techniques: ["数据挖掘", "网络爬虫", "再摄影", "算法策展", "平台干预"]
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
        <h2 className="text-3xl font-bold mb-6">艺术家研究</h2>
        <p className="text-lg text-muted-foreground mb-8">
          深入了解摄影大师们的生平、作品和艺术理念，探索他们如何通过影像塑造我们对世界的认知。
        </p>
      </motion.div>

      <section className="mb-10">
        <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6 mb-12">
          <h3 className="text-xl font-bold mb-4">为什么研究摄影艺术家？</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">获取创作灵感</h4>
              <p className="text-sm text-muted-foreground">
                研究大师作品能够启发我们的创作思路，帮助我们发现新的视角和表现手法。
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">培养批判性思维</h4>
              <p className="text-sm text-muted-foreground">
                分析艺术家的作品和思想有助于发展我们的批判性思维能力。
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">理解社会维度</h4>
              <p className="text-sm text-muted-foreground">
                摄影艺术家的作品往往反映和回应特定的历史、社会和文化语境。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影大师纵览</h3>

        <Tabs defaultValue="classical" className="mb-10">
          <TabsList className="mb-6 w-full flex flex-wrap justify-start gap-2 bg-transparent p-0">
            <TabsTrigger 
              value="classical" 
              className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-6 py-2 transition-all"
            >
              经典大师
            </TabsTrigger>
            <TabsTrigger 
              value="modern" 
              className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-6 py-2 transition-all"
            >
              现代大师
            </TabsTrigger>
            <TabsTrigger 
              value="contemporary" 
              className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-6 py-2 transition-all"
            >
              当代艺术家
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="classical" className="animate-fade-in">
            {classicalArtists.map((artist, index) => (
              <ArtistExplorer 
                key={artist.name} 
                artist={artist} 
                delay={index * 0.2}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="modern" className="animate-fade-in">
            {modernArtists.map((artist, index) => (
              <ArtistExplorer 
                key={artist.name} 
                artist={artist} 
                delay={index * 0.2}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="contemporary" className="animate-fade-in">
            {contemporaryArtists.map((artist, index) => (
              <ArtistExplorer 
                key={artist.name} 
                artist={artist} 
                delay={index * 0.2}
              />
            ))}
          </TabsContent>
        </Tabs>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">艺术家研究方法</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-accent/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">作品分析</h4>
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">1</span>
                <div>
                  <p className="font-medium">形式分析</p>
                  <p className="text-sm text-muted-foreground mt-1">研究艺术家的构图、光线运用、色彩选择等形式元素。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">2</span>
                <div>
                  <p className="font-medium">主题探索</p>
                  <p className="text-sm text-muted-foreground mt-1">识别艺术家反复探讨的主题和概念。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">3</span>
                <div>
                  <p className="font-medium">系列研究</p>
                  <p className="text-sm text-muted-foreground mt-1">分析艺术家的系列作品，了解其创作思路的发展过程。</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-accent/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">背景研究</h4>
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">1</span>
                <div>
                  <p className="font-medium">历史语境</p>
                  <p className="text-sm text-muted-foreground mt-1">了解艺术家活动的历史时期，研究社会环境影响。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">2</span>
                <div>
                  <p className="font-medium">艺术流派</p>
                  <p className="text-sm text-muted-foreground mt-1">将艺术家置于更广泛的艺术运动和摄影流派中。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">3</span>
                <div>
                  <p className="font-medium">个人轨迹</p>
                  <p className="text-sm text-muted-foreground mt-1">研究艺术家的生平、教育背景和个人经历。</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">实践应用：向大师学习</h3>
        <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
          <h4 className="text-xl font-medium mb-4">创作练习</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-purple-200/20 rounded-lg p-4">
              <h5 className="font-medium mb-2">模仿练习</h5>
              <p className="text-sm text-muted-foreground mb-3">选择一位摄影大师，尝试模仿其风格和技法创作照片。</p>
              <div className="text-xs text-muted-foreground bg-black/20 p-2 rounded">
                <strong>提示：</strong> 理解大师作品背后的思考过程和创作决策。
              </div>
            </div>
            <div className="border border-purple-200/20 rounded-lg p-4">
              <h5 className="font-medium mb-2">对话创作</h5>
              <p className="text-sm text-muted-foreground mb-3">选择一位摄影大师的作品作为起点，创作照片与之"对话"。</p>
              <div className="text-xs text-muted-foreground bg-black/20 p-2 rounded">
                <strong>提示：</strong> 记录你的创作过程和思考，反思如何获取灵感。
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 