"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WorkCard, WorkCardProps } from "./WorkCard";
import { WorkDetailViewer, WorkDetailProps } from "./WorkDetailViewer";

// 当代摄影师作品列表
const contemporaryWorks: (WorkCardProps & {
  story?: string;
  technicalDetails?: { label: string; value: string }[];
  analysisPoints?: { title: string; description: string; position?: { x: number; y: number } }[];
})[] = [
  {
    id: "gregory-crewdson-1",
    title: "Untitled (Ophelia)",
    photographer: "Gregory Crewdson",
    year: 2001,
    imageUrl: "/images/showcase/contemporary/gregory-crewdson.jpg",
    category: "电影式摄影",
    technique: "舞台式布景",
    description: "克鲁德森的电影式摄影展现了美国郊区生活中的超现实和不安感，作品如同一个悬疑电影的静止画面。",
    story: "克鲁德森的作品创作过程接近电影拍摄，每张照片都有精心搭建的布景、专业的灯光设计和多名工作人员参与。这张《奥菲莉亚》以莎士比亚《哈姆雷特》中的角色为灵感，展现了漂浮在家中被淹没的客厅水面上的女子。",
    technicalDetails: [
      { label: "相机", value: "大画幅8x10" },
      { label: "灯光", value: "复杂电影照明" },
      { label: "制作", value: "全团队制作" },
      { label: "拍摄时间", value: "数天准备" },
    ],
    analysisPoints: [
      {
        title: "电影美学",
        description: "作品采用电影般的光线、构图和色彩，创造出超现实的视觉效果。",
        position: { x: 50, y: 40 },
      },
      {
        title: "叙事性",
        description: "照片如同叙事中的一帧，让观者好奇画面前后发生了什么。",
        position: { x: 65, y: 60 },
      },
      {
        title: "郊区象征",
        description: "美国郊区的普通家居环境与超现实元素形成对比，反映现代生活的精神状态。",
        position: { x: 30, y: 30 },
      },
    ],
  },
  {
    id: "sebastiao-salgado-1",
    title: "Gold Mine at Serra Pelada",
    photographer: "Sebastião Salgado",
    year: 1986,
    imageUrl: "/images/showcase/contemporary/sebastiao-salgado.jpg",
    category: "纪实摄影",
    technique: "黑白影像",
    description: "萨尔加多的作品以强烈的黑白对比和宏大的视觉叙事著称，这幅巴西淘金矿工的照片展现了人类集体劳动的震撼场景。",
    story: "萨尔加多在巴西塞拉佩拉达金矿拍摄了这组照片，记录了数万名矿工在恶劣条件下手工挖掘金矿的场景。这些照片成为了全球化和劳工问题的视觉见证。",
    technicalDetails: [
      { label: "相机", value: "Leica" },
      { label: "胶片", value: "黑白胶片" },
      { label: "构图", value: "俯视角度" },
      { label: "打印", value: "银盐工艺" },
    ],
    analysisPoints: [
      {
        title: "人海景观",
        description: "成百上千的矿工形成视觉上的人海，展现了集体劳动的壮观和艰辛。",
        position: { x: 50, y: 50 },
      },
      {
        title: "视觉韵律",
        description: "人群和梯子形成有节奏的视觉模式，增强了画面的视觉冲击力。",
        position: { x: 35, y: 40 },
      },
      {
        title: "光影对比",
        description: "强烈的黑白对比强化了场景的戏剧性和张力。",
        position: { x: 70, y: 30 },
      },
    ],
  },
  {
    id: "steve-mccurry-1",
    title: "Afghan Girl",
    photographer: "Steve McCurry",
    year: 1984,
    imageUrl: "/images/showcase/contemporary/steve-mccurry.jpg",
    category: "人像摄影",
    technique: "色彩对比",
    description: "这幅拍摄于巴基斯坦难民营的阿富汗少女肖像，以其摄人心魄的绿色眼睛和强烈的情感表达成为国家地理杂志最著名的封面之一。",
    story: "麦柯瑞在巴基斯坦的难民营中偶然发现了12岁的阿富汗少女沙尔巴特·古拉。她明亮的绿色眼睛和坚毅的表情捕捉了全球读者的注意力，成为阿富汗战争和难民危机的象征性面孔。",
    technicalDetails: [
      { label: "相机", value: "尼康FM2" },
      { label: "镜头", value: "105mm" },
      { label: "胶片", value: "柯达彩色胶片" },
      { label: "光线", value: "自然光" },
    ],
    analysisPoints: [
      {
        title: "眼神表达",
        description: "少女明亮而忧郁的绿色眼睛成为照片的核心视觉焦点，传达出复杂的情感。",
        position: { x: 50, y: 35 },
      },
      {
        title: "色彩对比",
        description: "红色头巾与绿色眼睛形成强烈的互补色对比，增强视觉冲击力。",
        position: { x: 30, y: 30 },
      },
      {
        title: "肢体语言",
        description: "微微抬起的下巴和直视镜头的目光传达出尊严和坚韧。",
        position: { x: 50, y: 60 },
      },
    ],
  },
  {
    id: "cindy-sherman-1",
    title: "Untitled Film Still #21",
    photographer: "Cindy Sherman",
    year: 1978,
    imageUrl: "/images/showcase/contemporary/cindy-sherman.jpg",
    category: "概念摄影",
    technique: "自拍肖像",
    description: "谢尔曼的作品探索身份、性别和媒体表现，这幅作品模仿了好莱坞B级电影的场景，挑战了女性角色的刻板形象。",
    story: "辛迪·谢尔曼的《无题电影剧照》系列包含69张黑白照片，她在其中扮演不同的女性角色，模仿了1950-60年代电影中的场景。这些作品质疑了女性在媒体中的表现方式和身份构建。",
    technicalDetails: [
      { label: "相机", value: "35mm胶片相机" },
      { label: "风格", value: "电影剧照模仿" },
      { label: "主题", value: "女性身份" },
      { label: "摄影师", value: "自己扮演模特" },
    ],
    analysisPoints: [
      {
        title: "电影引用",
        description: "作品刻意模仿经典电影的视觉风格和构图，创造出似曾相识的场景。",
        position: { x: 50, y: 30 },
      },
      {
        title: "身份表演",
        description: "谢尔曼通过扮演不同角色质疑了身份的构建和媒体对女性形象的塑造。",
        position: { x: 40, y: 50 },
      },
      {
        title: "观看与被观看",
        description: "作品探讨了女性作为被观看对象的社会地位和男性凝视的问题。",
        position: { x: 70, y: 60 },
      },
    ],
  },
  {
    id: "hiroshi-sugimoto-1",
    title: "Seascape: Caribbean Sea, Jamaica",
    photographer: "Hiroshi Sugimoto",
    year: 1980,
    imageUrl: "/images/showcase/contemporary/hiroshi-sugimoto.jpg",
    category: "风景摄影",
    technique: "长时间曝光",
    description: "杉本博司的海景系列通过极简主义的构图和长时间曝光，创造出超越时间的永恒影像，模糊了海洋与天空的界限。",
    story: "杉本博司从1980年开始创作《海景》系列，在世界各地拍摄海洋。他使用大画幅相机和长时间曝光，将动态的海面转化为平静的抽象画面，探索了时间、空间和永恒的主题。",
    technicalDetails: [
      { label: "相机", value: "大画幅8x10" },
      { label: "曝光时间", value: "数小时" },
      { label: "光圈", value: "f/32-f/45" },
      { label: "构图", value: "水平线居中" },
    ],
    analysisPoints: [
      {
        title: "极简构图",
        description: "画面仅包含海洋和天空，以1:1的比例分割，创造出极简且均衡的视觉效果。",
        position: { x: 50, y: 50 },
      },
      {
        title: "时间痕迹",
        description: "长时间曝光消除了海面的波纹，将动态的海洋转化为静态的画面。",
        position: { x: 50, y: 70 },
      },
      {
        title: "边界模糊",
        description: "海洋与天空的界限有时变得模糊，创造出超越物理现实的视觉体验。",
        position: { x: 50, y: 30 },
      },
    ],
  },
  {
    id: "andreas-gursky-1",
    title: "Rhine II",
    photographer: "Andreas Gursky",
    year: 1999,
    imageUrl: "/images/showcase/contemporary/andreas-gursky.jpg",
    category: "风景摄影",
    technique: "数字合成",
    description: "古尔斯基的这幅莱茵河风景作品以其宏大的尺度和极简的构图著称，是当代摄影中最昂贵的作品之一。",
    story: "古尔斯基拍摄了德国杜塞尔多夫附近的莱茵河，并通过数字技术移除了画面中的建筑物和行人，创造出一个理想化的、抽象的风景。这幅作品在2011年以430万美元成交，创下当时摄影作品的最高拍卖纪录。",
    technicalDetails: [
      { label: "相机", value: "大画幅" },
      { label: "后期", value: "数字合成" },
      { label: "尺寸", value: "超大尺寸打印" },
      { label: "技术", value: "移除干扰元素" },
    ],
    analysisPoints: [
      {
        title: "水平线条",
        description: "作品由一系列水平线条组成，创造出高度抽象和有序的视觉效果。",
        position: { x: 50, y: 40 },
      },
      {
        title: "尺度感",
        description: "巨大的打印尺寸强化了作品的宏大感和对自然环境的冷静观察。",
        position: { x: 30, y: 60 },
      },
      {
        title: "人为干预",
        description: "通过数字技术移除人为元素，作品探讨了现代风景中的自然与人工关系。",
        position: { x: 70, y: 70 },
      },
    ],
  },
];

export function ContemporaryGallery() {
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">当代优秀作品</h2>
        <p className="text-muted-foreground">
          探索当代摄影师的杰出创作，了解现代摄影的多元表达和创新技术。
          这些作品展现了当代摄影对社会、身份、环境等主题的深入探索，以及数字技术为摄影带来的新可能性。
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {contemporaryWorks.map((work) => (
          <motion.div key={work.id} variants={item}>
            <WorkCard {...work} onClick={() => handleOpenDetail(work)} />
          </motion.div>
        ))}
      </motion.div>

      {/* 作品详情查看器 */}
      {selectedWork && (
        <WorkDetailViewer
          {...selectedWork}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
} 