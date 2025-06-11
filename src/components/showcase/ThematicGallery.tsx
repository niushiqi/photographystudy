"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Info } from "lucide-react";
import { WorkCard, WorkCardProps } from "./WorkCard";
import { WorkDetailViewer, WorkDetailProps } from "./WorkDetailViewer";

// 主题集类型定义
interface ThematicSet {
  id: string;
  title: string;
  description: string;
  curator: string;
  coverImage: string;
  works: (WorkCardProps & {
    story?: string;
    technicalDetails?: { label: string; value: string }[];
    analysisPoints?: { title: string; description: string; position?: { x: number; y: number } }[];
  })[];
}

// 主题策展集数据
const thematicSets: ThematicSet[] = [
  {
    id: "urban-solitude",
    title: "城市孤独",
    description: "探索现代城市生活中的孤独与疏离感，从不同摄影师的视角捕捉都市中的个体存在。",
    curator: "陈雨轩",
    coverImage: "/images/showcase/thematic/urban-solitude-cover.jpg",
    works: [
      {
        id: "urban-1",
        title: "Tokyo Compression",
        photographer: "Michael Wolf",
        year: 2010,
        imageUrl: "/images/showcase/thematic/urban-1.jpg",
        category: "街头摄影",
        technique: "人文纪实",
        description: "沃尔夫的作品捕捉了东京地铁中被压缩在车窗玻璃上的通勤者脸庞，展现了现代城市生活的压抑与束缚。",
      },
      {
        id: "urban-2",
        title: "Transparent City",
        photographer: "Thomas Struth",
        year: 2007,
        imageUrl: "/images/showcase/thematic/urban-2.jpg",
        category: "建筑摄影",
        technique: "大画幅",
        description: "施特鲁特的作品展示了现代玻璃建筑中可见但相互隔离的人们，反映了都市生活的透明性与隔离感。",
      },
      {
        id: "urban-3",
        title: "Lost in Translation",
        photographer: "Sohei Nishino",
        year: 2006,
        imageUrl: "/images/showcase/thematic/urban-3.jpg",
        category: "拼贴摄影",
        technique: "照片拼贴",
        description: "西野壮平通过数千张小照片拼贴成的城市地图，展现了城市的碎片化体验和个体在其中的迷失感。",
      },
    ],
  },
  {
    id: "human-nature",
    title: "人与自然",
    description: "聚焦人类与自然环境的复杂关系，探索人类活动对自然环境的影响以及自然对人类心灵的滋养。",
    curator: "李明远",
    coverImage: "/images/showcase/thematic/human-nature-cover.jpg",
    works: [
      {
        id: "nature-1",
        title: "Manufactured Landscapes",
        photographer: "Edward Burtynsky",
        year: 2003,
        imageUrl: "/images/showcase/thematic/nature-1.jpg",
        category: "风景摄影",
        technique: "大画幅",
        description: "伯廷斯基的作品记录了人类活动对自然环境的大规模改造，展现了工业文明的壮观与破坏性。",
      },
      {
        id: "nature-2",
        title: "Genesis",
        photographer: "Sebastião Salgado",
        year: 2013,
        imageUrl: "/images/showcase/thematic/nature-2.jpg",
        category: "纪实摄影",
        technique: "黑白影像",
        description: "萨尔加多的《创世纪》项目展示了地球上尚未被人类活动严重改变的自然景观和原始社区，唤起对自然保护的重视。",
      },
      {
        id: "nature-3",
        title: "Small World",
        photographer: "Martin Parr",
        year: 1995,
        imageUrl: "/images/showcase/thematic/nature-3.jpg",
        category: "纪实摄影",
        technique: "讽刺影像",
        description: "帕尔的作品以讽刺的视角记录了全球旅游业中人们对自然景观的消费方式，质疑了现代旅游体验的真实性。",
      },
    ],
  },
  {
    id: "identity-portraits",
    title: "身份与肖像",
    description: "通过肖像摄影探索个人与集体身份的构建，反思性别、种族、文化等因素如何塑造自我认同。",
    curator: "张艺林",
    coverImage: "/images/showcase/thematic/identity-cover.jpg",
    works: [
      {
        id: "identity-1",
        title: "The Brown Sisters",
        photographer: "Nicholas Nixon",
        year: 1975,
        imageUrl: "/images/showcase/thematic/identity-1.jpg",
        category: "肖像摄影",
        technique: "系列肖像",
        description: "尼克松从1975年开始每年为四姐妹拍摄一张合影，持续40多年的项目成为时间、亲情和身份变迁的视觉记录。",
      },
      {
        id: "identity-2",
        title: "Identical Twins",
        photographer: "Diane Arbus",
        year: 1967,
        imageUrl: "/images/showcase/thematic/identity-2.jpg",
        category: "肖像摄影",
        technique: "直接摄影",
        description: "阿勃斯的这幅双胞胎肖像探讨了相似与差异、个体与复制的主题，成为她关注'怪异'身份的代表作。",
      },
      {
        id: "identity-3",
        title: "Untitled (Your Gaze Hits the Side of My Face)",
        photographer: "Barbara Kruger",
        year: 1981,
        imageUrl: "/images/showcase/thematic/identity-3.jpg",
        category: "概念摄影",
        technique: "文字与图像",
        description: "克鲁格结合古典雕塑照片与文字，质疑凝视、性别和权力的关系，挑战了传统肖像摄影中的观看机制。",
      },
    ],
  },
];

export function ThematicGallery() {
  const [activeSet, setActiveSet] = useState(thematicSets[0].id);
  const [selectedWork, setSelectedWork] = useState<(WorkDetailProps & { isOpen: boolean }) | null>(
    null
  );

  const handleOpenDetail = (work: any) => {
    setSelectedWork({
      ...work,
      isOpen: true,
    });
  };

  const handleCloseDetail = () => {
    if (selectedWork) {
      setSelectedWork({
        ...selectedWork,
        isOpen: false,
      });
    }
  };

  const currentSet = thematicSets.find((set) => set.id === activeSet);

  return (
    <div className="py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">主题策展集</h2>
        <p className="text-muted-foreground mb-6">
          探索围绕特定主题或概念策划的摄影作品集，了解不同摄影师如何通过各自独特的视角和技术探索共同的主题。
          这些策展集提供了深入理解摄影主题和叙事手法的绝佳途径。
        </p>

        {/* 主题策展集选择器 */}
        <div className="flex flex-wrap gap-3 mb-8">
          {thematicSets.map((set) => (
            <button
              key={set.id}
              onClick={() => setActiveSet(set.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeSet === set.id
                  ? "bg-primary text-white"
                  : "bg-secondary/50 hover:bg-secondary/80"
              }`}
            >
              {set.title}
            </button>
          ))}
        </div>
      </div>

      {/* 当前策展集信息 */}
      {currentSet && (
        <>
          <div className="bg-secondary/30 rounded-lg p-6 mb-8 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Info size={16} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">策展人：{currentSet.curator}</p>
            </div>
            <h3 className="text-xl font-bold mb-2">{currentSet.title}</h3>
            <p className="text-muted-foreground">{currentSet.description}</p>
          </div>

          {/* 作品展示 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentSet.works.map((work) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <WorkCard {...work} onClick={() => handleOpenDetail(work)} />
              </motion.div>
            ))}
          </div>

          {/* 更多作品链接 */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-1 text-primary hover:underline">
              探索更多{currentSet.title}作品 <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}

      {/* 作品详情查看器 */}
      {selectedWork && <WorkDetailViewer {...selectedWork} onClose={handleCloseDetail} />}
    </div>
  );
} 