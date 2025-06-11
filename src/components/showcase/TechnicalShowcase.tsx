"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkCard, WorkCardProps } from "./WorkCard";
import { WorkDetailViewer, WorkDetailProps } from "./WorkDetailViewer";

// 技术类别
const technicalCategories = [
  { id: "long-exposure", name: "长曝光" },
  { id: "macro", name: "微距摄影" },
  { id: "aerial", name: "航拍摄影" },
  { id: "hdr", name: "HDR技术" },
  { id: "bokeh", name: "散景效果" },
];

// 各类技术展示作品
const technicalWorks: Record<
  string,
  (WorkCardProps & {
    story?: string;
    technicalDetails: { label: string; value: string }[];
    analysisPoints?: { title: string; description: string; position?: { x: number; y: number } }[];
  })[]
> = {
  "long-exposure": [
    {
      id: "long-exp-1",
      title: "Stars Over Moeraki Boulders",
      photographer: "Michael Goh",
      year: 2019,
      imageUrl: "/images/showcase/technical/long-exposure-1.jpg",
      category: "风景摄影",
      technique: "长曝光",
      description: "通过长时间曝光捕捉新西兰莫拉基巨石上方的星空轨迹，将动态天象与静态地貌结合。",
      story: "摄影师在新西兰南岛度过数周，寻找理想的天气和天文条件来拍摄这组作品。历经多次尝试，最终在一个晴朗无月的夜晚完成了这幅作品。",
      technicalDetails: [
        { label: "相机", value: "Canon EOS 5D Mark IV" },
        { label: "镜头", value: "16-35mm f/2.8L" },
        { label: "光圈", value: "f/2.8" },
        { label: "快门速度", value: "25分钟" },
        { label: "ISO", value: "800" },
        { label: "三脚架", value: "必备" },
        { label: "滤镜", value: "无" },
      ],
      analysisPoints: [
        {
          title: "星轨效果",
          description: "超长曝光时间使星星在地球自转过程中形成圆弧轨迹。",
          position: { x: 70, y: 30 },
        },
        {
          title: "前景构图",
          description: "莫拉基巨石作为前景元素增加画面层次感和地域特色。",
          position: { x: 50, y: 70 },
        },
        {
          title: "光污染控制",
          description: "选择远离城市的拍摄地点，保证了星空的清晰度和色彩纯度。",
          position: { x: 30, y: 40 },
        },
      ],
    },
    {
      id: "long-exp-2",
      title: "Urban Flow",
      photographer: "Zhang Wei",
      year: 2020,
      imageUrl: "/images/showcase/technical/long-exposure-2.jpg",
      category: "城市摄影",
      technique: "长曝光",
      description: "利用长曝光技术将繁忙城市的车流转化为流光，展现现代都市的动态韵律。",
      story: "摄影师在上海陆家嘴金融区的天桥上架设相机，在黄昏至夜幕降临的过渡时刻拍摄，捕捉了'魔幻时刻'的城市氛围。",
      technicalDetails: [
        { label: "相机", value: "Sony A7R III" },
        { label: "镜头", value: "24-70mm f/2.8" },
        { label: "光圈", value: "f/11" },
        { label: "快门速度", value: "15秒" },
        { label: "ISO", value: "100" },
        { label: "滤镜", value: "10档ND滤镜" },
        { label: "拍摄时间", value: "蓝调时分" },
      ],
      analysisPoints: [
        {
          title: "车流轨迹",
          description: "长时间曝光将移动的车灯转化为连续的光线，展现城市的脉动感。",
          position: { x: 40, y: 60 },
        },
        {
          title: "建筑细节",
          description: "保持较小光圈确保建筑物保持清晰，形成与流动光线的对比。",
          position: { x: 70, y: 30 },
        },
        {
          title: "蓝调时分选择",
          description: "在日落后的短暂时段拍摄，天空和人造灯光达到平衡。",
          position: { x: 50, y: 20 },
        },
      ],
    },
    {
      id: "long-exp-3",
      title: "Silk Water",
      photographer: "Emma Chen",
      year: 2021,
      imageUrl: "/images/showcase/technical/long-exposure-3.jpg",
      category: "自然摄影",
      technique: "长曝光",
      description: "使用长曝光技术将湍急的瀑布水流转化为柔滑的丝绸质感，呈现水的另一种视觉状态。",
      technicalDetails: [
        { label: "相机", value: "Nikon Z7" },
        { label: "镜头", value: "14-30mm f/4" },
        { label: "光圈", value: "f/16" },
        { label: "快门速度", value: "2秒" },
        { label: "ISO", value: "64" },
        { label: "滤镜", value: "6档ND滤镜" },
        { label: "三脚架", value: "必备" },
      ],
    },
  ],
  "macro": [
    {
      id: "macro-1",
      title: "Morning Dew",
      photographer: "Liu Jing",
      year: 2020,
      imageUrl: "/images/showcase/technical/macro-1.jpg",
      category: "微距摄影",
      technique: "焦点堆栈",
      description: "通过微距摄影捕捉晨露中的昆虫，利用焦点堆栈技术保证从前到后的锐利度。",
      story: "摄影师在家附近的花园里花费数周时间观察最佳拍摄条件。每天清晨5点起床，在日出前的甘露最丰富时进行拍摄。",
      technicalDetails: [
        { label: "相机", value: "Canon EOS 90D" },
        { label: "镜头", value: "100mm f/2.8 微距" },
        { label: "光圈", value: "f/8" },
        { label: "快门速度", value: "1/160秒" },
        { label: "ISO", value: "400" },
        { label: "闪光灯", value: "环形闪光灯" },
        { label: "后期技术", value: "20张焦点堆栈" },
      ],
      analysisPoints: [
        {
          title: "焦点堆栈",
          description: "通过合成多张不同对焦点的照片，在极浅景深的微距摄影中获得全画面清晰度。",
          position: { x: 50, y: 40 },
        },
        {
          title: "水滴折射",
          description: "利用水滴的折射效果，创造内部小世界的视觉效果。",
          position: { x: 30, y: 45 },
        },
        {
          title: "柔和光线",
          description: "使用扩散器减弱闪光灯直射，创造更自然的光线效果。",
          position: { x: 70, y: 60 },
        },
      ],
    },
    {
      id: "macro-2",
      title: "Crystal Snowflake",
      photographer: "Don Komarechka",
      year: 2018,
      imageUrl: "/images/showcase/technical/macro-2.jpg",
      category: "微距摄影",
      technique: "背光照明",
      description: "使用特殊的背光技术捕捉雪花晶体的精细结构，展示自然界的微观几何美学。",
      technicalDetails: [
        { label: "相机", value: "Nikon D850" },
        { label: "镜头", value: "5x微距镜头" },
        { label: "光圈", value: "f/11" },
        { label: "快门速度", value: "1/200秒" },
        { label: "ISO", value: "200" },
        { label: "闪光灯", value: "背光设置" },
        { label: "温度条件", value: "-15°C" },
      ],
    },
    {
      id: "macro-3",
      title: "Liquid Art",
      photographer: "Markus Reugels",
      year: 2019,
      imageUrl: "/images/showcase/technical/macro-3.jpg",
      category: "微距摄影",
      technique: "高速同步",
      description: "结合高速闪光灯同步技术捕捉水滴碰撞形成的瞬间雕塑，冻结肉眼难以察觉的动态艺术。",
      technicalDetails: [
        { label: "相机", value: "Canon EOS R" },
        { label: "镜头", value: "180mm f/3.5 微距" },
        { label: "光圈", value: "f/16" },
        { label: "快门速度", value: "1/4000秒" },
        { label: "ISO", value: "100" },
        { label: "闪光灯", value: "3组闪光灯" },
        { label: "触发系统", value: "声音触发器" },
      ],
    },
  ],
  "aerial": [
    {
      id: "aerial-1",
      title: "Geometric Agriculture",
      photographer: "Tom Anderson",
      year: 2020,
      imageUrl: "/images/showcase/technical/aerial-1.jpg",
      category: "航拍摄影",
      technique: "无人机摄影",
      description: "通过航拍视角展现农业区的几何美学，人类活动创造的抽象图案从高空中呈现出惊人的视觉效果。",
      technicalDetails: [
        { label: "设备", value: "DJI Mavic 2 Pro" },
        { label: "传感器", value: "1英寸CMOS" },
        { label: "光圈", value: "f/4" },
        { label: "快门速度", value: "1/500秒" },
        { label: "ISO", value: "100" },
        { label: "高度", value: "120米" },
        { label: "角度", value: "垂直俯拍" },
      ],
    },
    {
      id: "aerial-2",
      title: "Urban Patterns",
      photographer: "Sarah Johnson",
      year: 2021,
      imageUrl: "/images/showcase/technical/aerial-2.jpg",
      category: "航拍摄影",
      technique: "无人机摄影",
      description: "俯瞰城市街区的规划结构，展现人类聚居区的有机与几何混合的城市纹理。",
      story: "摄影师在获得城市航拍许可后，选择在清晨光线最佳时刻进行拍摄，避开交通高峰期，同时捕捉到了城市醒来的瞬间。",
      technicalDetails: [
        { label: "设备", value: "DJI Phantom 4 Pro" },
        { label: "传感器", value: "1英寸CMOS" },
        { label: "光圈", value: "f/5.6" },
        { label: "快门速度", value: "1/320秒" },
        { label: "ISO", value: "200" },
        { label: "高度", value: "150米" },
        { label: "拍摄时间", value: "日出后30分钟" },
      ],
      analysisPoints: [
        {
          title: "城市规划展现",
          description: "航拍角度揭示了城市规划的结构与层次，展现了人工环境的秩序与美学。",
          position: { x: 50, y: 50 },
        },
        {
          title: "晨光利用",
          description: "早晨低角度阳光创造长阴影，增强建筑物轮廓和城市纹理的可见度。",
          position: { x: 70, y: 30 },
        },
        {
          title: "对比与图案",
          description: "不同城区的密度和规划形成视觉对比，创造出抽象的几何图案。",
          position: { x: 30, y: 70 },
        },
      ],
    },
    {
      id: "aerial-3",
      title: "Coastal Abstracts",
      photographer: "Marco Williams",
      year: 2021,
      imageUrl: "/images/showcase/technical/aerial-3.jpg",
      category: "航拍摄影",
      technique: "无人机摄影",
      description: "从空中捕捉海岸线的自然抽象图案，展现水流、沙滩和岩石形成的自然艺术。",
      technicalDetails: [
        { label: "设备", value: "DJI Air 2S" },
        { label: "传感器", value: "1英寸CMOS" },
        { label: "光圈", value: "f/2.8" },
        { label: "快门速度", value: "1/640秒" },
        { label: "ISO", value: "100" },
        { label: "高度", value: "80米" },
        { label: "潮汐条件", value: "退潮后" },
      ],
    },
  ],
  "hdr": [
    {
      id: "hdr-1",
      title: "Cathedral Light",
      photographer: "Elena Castro",
      year: 2020,
      imageUrl: "/images/showcase/technical/hdr-1.jpg",
      category: "建筑摄影",
      technique: "HDR合成",
      description: "通过HDR技术完美平衡教堂内部明暗极端的光比，同时展现窗户外的明亮天空和室内的细节。",
      story: "摄影师在罗马尼亚的一座中世纪教堂中等待数小时，直到阳光以最佳角度透过彩色玻璃窗。她使用三脚架拍摄了7张不同曝光的照片，以捕捉极端的光比范围。",
      technicalDetails: [
        { label: "相机", value: "Sony A7R IV" },
        { label: "镜头", value: "16-35mm f/4" },
        { label: "光圈", value: "f/11" },
        { label: "曝光组", value: "7张（-3EV至+3EV）" },
        { label: "ISO", value: "100" },
        { label: "三脚架", value: "必备" },
        { label: "后期软件", value: "Aurora HDR" },
      ],
      analysisPoints: [
        {
          title: "光比控制",
          description: "HDR技术解决了传统摄影中无法同时表现高光和阴影区域的限制。",
          position: { x: 80, y: 40 },
        },
        {
          title: "自然色调映射",
          description: "避免过度处理的HDR风格，保持自然的色调过渡和真实感。",
          position: { x: 50, y: 60 },
        },
        {
          title: "局部调整",
          description: "对不同区域应用不同程度的HDR效果，确保重点区域细节丰富且自然。",
          position: { x: 30, y: 30 },
        },
      ],
    },
    {
      id: "hdr-2",
      title: "Storm Approaching",
      photographer: "Michael Horn",
      year: 2019,
      imageUrl: "/images/showcase/technical/hdr-2.jpg",
      category: "风景摄影",
      technique: "HDR合成",
      description: "利用HDR技术捕捉暴风雨来临前的戏剧性天空，同时保持前景地形的丰富细节。",
      technicalDetails: [
        { label: "相机", value: "Nikon D850" },
        { label: "镜头", value: "24-70mm f/2.8" },
        { label: "光圈", value: "f/8" },
        { label: "曝光组", value: "5张（-2EV至+2EV）" },
        { label: "ISO", value: "64" },
        { label: "滤镜", value: "偏振镜" },
        { label: "后期软件", value: "Photomatix Pro" },
      ],
    },
    {
      id: "hdr-3",
      title: "Urban Twilight",
      photographer: "Jennifer Wu",
      year: 2021,
      imageUrl: "/images/showcase/technical/hdr-3.jpg",
      category: "城市摄影",
      technique: "HDR合成",
      description: "在城市黄昏时分使用HDR技术平衡天空颜色、建筑物灯光和阴影区域，创造出平衡的都市景观。",
      technicalDetails: [
        { label: "相机", value: "Canon EOS R5" },
        { label: "镜头", value: "70-200mm f/2.8" },
        { label: "光圈", value: "f/13" },
        { label: "曝光组", value: "3张（-2EV至+2EV）" },
        { label: "ISO", value: "100" },
        { label: "拍摄时间", value: "日落后20分钟" },
        { label: "后期软件", value: "Adobe Lightroom" },
      ],
    },
  ],
  "bokeh": [
    {
      id: "bokeh-1",
      title: "Dreamscape Portrait",
      photographer: "Hiroshi Nakamura",
      year: 2020,
      imageUrl: "/images/showcase/technical/bokeh-1.jpg",
      category: "人像摄影",
      technique: "散景艺术",
      description: "利用大光圈镜头创造梦幻般的散景效果，将人物主体与环境分离，同时添加情绪氛围。",
      story: "摄影师使用特制镜头在日本京都的竹林中创作了这组人像。拍摄时特意安排在下午4点左右，阳光穿过竹林创造出斑驳的光点效果。",
      technicalDetails: [
        { label: "相机", value: "Fujifilm GFX 50R" },
        { label: "镜头", value: "110mm f/2" },
        { label: "光圈", value: "f/2" },
        { label: "快门速度", value: "1/500秒" },
        { label: "ISO", value: "200" },
        { label: "对焦点", value: "眼睛" },
        { label: "背景距离", value: "约8米" },
      ],
      analysisPoints: [
        {
          title: "焦外特性",
          description: "大光圈与中等长焦的组合创造出柔和、圆润的散景效果。",
          position: { x: 70, y: 40 },
        },
        {
          title: "主体隔离",
          description: "浅景深使主体与背景明显分离，创造层次感和视觉焦点。",
          position: { x: 50, y: 30 },
        },
        {
          title: "光斑形态",
          description: "镜头的光圈叶片形状影响散景光斑的几何特性，创造独特的视觉效果。",
          position: { x: 30, y: 60 },
        },
      ],
    },
    {
      id: "bokeh-2",
      title: "City Lights Abstract",
      photographer: "Alex Morgan",
      year: 2021,
      imageUrl: "/images/showcase/technical/bokeh-2.jpg",
      category: "抽象摄影",
      technique: "散景创意",
      description: "将失焦的城市灯光转化为抽象的色彩和形状组合，创造纯粹的视觉体验。",
      technicalDetails: [
        { label: "相机", value: "Sony A7 III" },
        { label: "镜头", value: "50mm f/1.2" },
        { label: "光圈", value: "f/1.2" },
        { label: "快门速度", value: "1/60秒" },
        { label: "ISO", value: "400" },
        { label: "手动对焦", value: "完全失焦" },
        { label: "拍摄地点", value: "高层建筑" },
      ],
    },
    {
      id: "bokeh-3",
      title: "Raindrops",
      photographer: "Linda Chen",
      year: 2019,
      imageUrl: "/images/showcase/technical/bokeh-3.jpg",
      category: "创意摄影",
      technique: "雨滴散景",
      description: "通过玻璃窗上的雨滴作为自然镜头，折射背景灯光形成独特散景，创造多层次视觉效果。",
      technicalDetails: [
        { label: "相机", value: "Olympus OM-D E-M1" },
        { label: "镜头", value: "60mm f/2.8 微距" },
        { label: "光圈", value: "f/4" },
        { label: "快门速度", value: "1/125秒" },
        { label: "ISO", value: "800" },
        { label: "对焦距离", value: "数厘米" },
        { label: "背景", value: "夜市灯光" },
      ],
    },
  ],
};

export function TechnicalShowcase() {
  const [activeCategory, setActiveCategory] = useState("long-exposure");
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
        <h2 className="text-2xl font-bold mb-2">技术展示精选</h2>
        <p className="text-muted-foreground">
          探索利用特定摄影技术创作的精选作品，了解不同摄影技术如何影响画面效果，以及专业摄影师如何应用这些技术来实现创意目标。
        </p>
      </div>

      <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
          {technicalCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {technicalCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {technicalWorks[category.id].map((work) => (
                <motion.div key={work.id} variants={item}>
                  <WorkCard {...work} onClick={() => handleOpenDetail(work)} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      {/* 作品详情查看器 */}
      {selectedWork && (
        <WorkDetailViewer {...selectedWork} onClose={handleCloseDetail} />
      )}
    </div>
  );
} 