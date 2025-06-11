"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WorkCard, WorkCardProps } from "./WorkCard";
import { WorkDetailViewer, WorkDetailProps } from "./WorkDetailViewer";

// 大师作品列表
const masterWorks: (WorkCardProps & {
  story?: string;
  technicalDetails?: { label: string; value: string }[];
  analysisPoints?: { title: string; description: string; position?: { x: number; y: number } }[];
})[] = [
  {
    id: "cartier-bresson-1",
    title: "Behind the Gare Saint-Lazare",
    photographer: "Henri Cartier-Bresson",
    year: 1932,
    imageUrl: "/images/showcase/masters/cartier-bresson.jpg",
    category: "街头摄影",
    technique: "决定性瞬间",
    description: "这幅作品完美展现了布列松的'决定性瞬间'理念，捕捉到了人物跃过水坑的精确瞬间。",
    story: "亨利·卡蒂埃·布列松通过狭小的围栏间隙拍摄了这张照片，精准地捕捉到了跃动的人物与倒影形成的完美构图。这幅作品后来成为了他'决定性瞬间'理念的代表作。",
    technicalDetails: [
      { label: "相机", value: "Leica" },
      { label: "镜头", value: "50mm" },
      { label: "光圈", value: "f/8" },
      { label: "快门速度", value: "1/125s" },
      { label: "胶片", value: "Kodak 35mm黑白" },
      { label: "构图", value: "三分法" },
    ],
    analysisPoints: [
      {
        title: "决定性瞬间",
        description: "布列松精确捕捉到了人物跃起的瞬间，展现了摄影记录稍纵即逝时刻的能力。",
        position: { x: 50, y: 55 },
      },
      {
        title: "反射与对称",
        description: "水面倒影形成的对称构图增强了画面的视觉张力。",
        position: { x: 48, y: 70 },
      },
      {
        title: "背景元素",
        description: "背景中的海报墙与阶梯提供了场景环境，增加了历史语境。",
        position: { x: 80, y: 40 },
      },
    ],
  },
  {
    id: "ansel-adams-1",
    title: "Moonrise, Hernandez, New Mexico",
    photographer: "Ansel Adams",
    year: 1941,
    imageUrl: "/images/showcase/masters/ansel-adams.jpg",
    category: "风景摄影",
    technique: "区域系统",
    description: "这幅经典风景作品展示了安塞尔·亚当斯对于光影和区域系统的精湛运用。",
    story: "亚当斯在新墨西哥州旅行时偶然发现了这个场景。由于光线变化迅速，他迅速架设了相机，没有时间使用光度计，而是凭借多年经验估算了曝光值。这成为了他最著名的作品之一。",
    technicalDetails: [
      { label: "相机", value: "8x10大画幅" },
      { label: "光圈", value: "f/22" },
      { label: "曝光时间", value: "1秒" },
      { label: "滤镜", value: "K2黄色滤镜" },
      { label: "后期", value: "暗房区域系统处理" },
    ],
    analysisPoints: [
      {
        title: "月亮与村庄对比",
        description: "亚当斯精心处理月亮与村庄的明暗对比，创造出强烈的视觉焦点。",
        position: { x: 85, y: 15 },
      },
      {
        title: "区域系统应用",
        description: "通过区域系统的运用，作品保留了从深色山脉到明亮天空的丰富细节。",
        position: { x: 50, y: 40 },
      },
      {
        title: "十字架符号",
        description: "墓地中的十字架在暗部中形成视觉元素，增添了作品的精神意义。",
        position: { x: 35, y: 65 },
      },
    ],
  },
  {
    id: "dorothea-lange-1",
    title: "Migrant Mother",
    photographer: "Dorothea Lange",
    year: 1936,
    imageUrl: "/images/showcase/masters/dorothea-lange.jpg",
    category: "纪实摄影",
    technique: "人文纪实",
    description: "这幅大萧条时期的纪实作品成为了20世纪最有影响力的摄影之一，展现了面对困境的人性尊严。",
    story: "朗格在加利福尼亚的一个豌豆采摘工营地发现了32岁的弗洛伦斯·欧文斯和她的孩子们。在十分钟内拍摄了5张照片，这张最后一张成为了美国大萧条时代的象征性图像。",
    technicalDetails: [
      { label: "相机", value: "Graflex 4x5" },
      { label: "光圈", value: "f/5.6" },
      { label: "焦距", value: "105mm" },
      { label: "构图", value: "三角形构图" },
    ],
    analysisPoints: [
      {
        title: "母亲表情",
        description: "忧虑而坚定的表情传达了面对困境的坚韧与尊严。",
        position: { x: 50, y: 30 },
      },
      {
        title: "孩子依靠",
        description: "孩子们靠在母亲身上强化了母爱和家庭关系的主题。",
        position: { x: 40, y: 50 },
      },
      {
        title: "手部姿态",
        description: "手托着下巴的姿势成为了这幅肖像的标志性元素，传达出思考与忧虑。",
        position: { x: 65, y: 45 },
      },
    ],
  },
  {
    id: "robert-capa-1",
    title: "The Falling Soldier",
    photographer: "Robert Capa",
    year: 1936,
    imageUrl: "/images/showcase/masters/robert-capa.jpg",
    category: "战争摄影",
    technique: "现场记录",
    description: "这幅西班牙内战中的标志性作品捕捉到了士兵被击中倒下的瞬间，展现了战争的残酷现实。",
    story: "卡帕在西班牙内战期间拍摄了这张照片，记录了一名共和军士兵被子弹击中倒下的瞬间。尽管后来对照片真实性有争议，但它仍被视为战争摄影的里程碑之作。",
    technicalDetails: [
      { label: "相机", value: "Leica" },
      { label: "镜头", value: "50mm" },
      { label: "胶片", value: "黑白胶片" },
    ],
    analysisPoints: [
      {
        title: "动态姿势",
        description: "士兵倒下的姿势传达了暴力与死亡的瞬间性，成为战争残酷性的视觉象征。",
        position: { x: 45, y: 55 },
      },
      {
        title: "开阔环境",
        description: "荒凉的背景环境强化了个体在战争中的孤独与脆弱。",
        position: { x: 75, y: 40 },
      },
    ],
  },
  {
    id: "edward-weston-1",
    title: "Pepper No. 30",
    photographer: "Edward Weston",
    year: 1930,
    imageUrl: "/images/showcase/masters/edward-weston.jpg",
    category: "静物摄影",
    technique: "形式主义",
    description: "这幅静物作品展现了韦斯顿对日常物体形式美的追求，通过精确的光线和构图将普通蔬菜升华为艺术形式。",
    story: "韦斯顿花了四天时间拍摄各种青椒，寻找完美的形式和光线。这张照片使用了长时间曝光和小光圈，展现了青椒表面细腻的质感和曲线。",
    technicalDetails: [
      { label: "相机", value: "大画幅8x10" },
      { label: "光圈", value: "f/32" },
      { label: "曝光时间", value: "4-6小时" },
      { label: "照明", value: "单一自然光源" },
    ],
    analysisPoints: [
      {
        title: "形式与曲线",
        description: "青椒的曲线形态被视为对人体曲线的隐喻，展现了自然中的美感与情感。",
        position: { x: 45, y: 50 },
      },
      {
        title: "光线处理",
        description: "精确控制的光线创造出丰富的明暗层次，赋予物体雕塑感。",
        position: { x: 65, y: 35 },
      },
      {
        title: "质感表现",
        description: "通过精确曝光捕捉到青椒表面细腻的纹理和质感。",
        position: { x: 30, y: 60 },
      },
    ],
  },
  {
    id: "august-sander-1",
    title: "Young Farmers",
    photographer: "August Sander",
    year: 1914,
    imageUrl: "/images/showcase/masters/august-sander.jpg",
    category: "肖像摄影",
    technique: "类型学肖像",
    description: "这幅作品是桑德尔'20世纪人物'系列的代表作，展现了他对社会类型学的摄影探索。",
    story: "桑德尔计划通过拍摄德国各行各业、各阶层的人物肖像来创建一个完整的社会记录。这张照片捕捉了三位年轻农民盛装准备参加舞会的形象，展现了农村青年的身份认同和时代特征。",
    technicalDetails: [
      { label: "相机", value: "大画幅相机" },
      { label: "风格", value: "直接、客观" },
      { label: "构图", value: "中央构图" },
    ],
    analysisPoints: [
      {
        title: "姿态与表情",
        description: "三位农民的站姿和表情展现了自信与某种不自在的混合，反映了他们的社会地位。",
        position: { x: 50, y: 40 },
      },
      {
        title: "服饰细节",
        description: "正式的服装和手杖等配饰反映了特定时代和社会阶层的文化标志。",
        position: { x: 30, y: 60 },
      },
      {
        title: "环境关系",
        description: "简洁的背景使人物成为绝对主体，强调了类型学的特征。",
        position: { x: 70, y: 30 },
      },
    ],
  },
];

export function MasterWorksGallery() {
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
        <h2 className="text-2xl font-bold mb-2">大师经典作品</h2>
        <p className="text-muted-foreground">
          探索摄影史上的经典作品，了解大师们如何通过独特的视角和技法创造出经久不衰的影像。
          这些作品不仅展示了摄影艺术的发展历程，也是我们学习和借鉴的宝贵资源。
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {masterWorks.map((work) => (
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