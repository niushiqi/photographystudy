"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkCard, WorkCardProps } from "./WorkCard";
import { WorkDetailViewer, WorkDetailProps } from "./WorkDetailViewer";

// 叙事作品集类型
interface NarrativeProject {
  id: string;
  title: string;
  photographer: string;
  year: number;
  type: string; // 叙事类型：photobook、documentary、series等
  description: string;
  coverImage: string;
  story?: string;
  images: {
    id: string;
    title: string;
    imageUrl: string;
    description?: string;
  }[];
}

// 叙事作品集数据
const narrativeProjects: NarrativeProject[] = [
  {
    id: "americans",
    title: "The Americans",
    photographer: "Robert Frank",
    year: 1958,
    type: "photobook",
    description:
      "罗伯特·弗兰克的开创性作品集，揭示了战后美国社会的真实面貌，以局外人视角记录了美国各地不同阶层的生活场景。",
    coverImage: "/images/showcase/narratives/americans-cover.jpg",
    story:
      "罗伯特·弗兰克在1955至1956年间驾车穿越美国48个州，拍摄了27,000多张照片，最终精选83张编入《美国人》。这部作品最初在美国遭到批评，而后来被视为改变摄影叙事方式的转折点。",
    images: [
      {
        id: "americans-1",
        title: "Parade - Hoboken, New Jersey",
        imageUrl: "/images/showcase/narratives/americans-1.jpg",
        description: "通过窗帘半遮挡的美国国旗和电线杆上的面孔，作为序列开篇暗示着对美国梦的审视。",
      },
      {
        id: "americans-2",
        title: "Trolley - New Orleans",
        imageUrl: "/images/showcase/narratives/americans-2.jpg",
        description: "电车窗口中的人们按种族隔离就座，直接而有力地呈现了美国种族隔离的现实。",
      },
      {
        id: "americans-3",
        title: "Bar - Gallup, New Mexico",
        imageUrl: "/images/showcase/narratives/americans-3.jpg",
        description: "酒吧中孤独的点唱机和空荡的环境，表达了西部神话背后的空虚与孤独。",
      },
      {
        id: "americans-4",
        title: "U.S. 90, en route to Del Rio, Texas",
        imageUrl: "/images/showcase/narratives/americans-4.jpg",
        description: "从汽车内部拍摄的公路场景，展现了美国人与道路、旅行和移动性的关系。",
      },
      {
        id: "americans-5",
        title: "Drugstore - Detroit",
        imageUrl: "/images/showcase/narratives/americans-5.jpg",
        description: "药店中的美国国旗与日常消费场景的并置，质疑爱国主义与商业文化的关系。",
      },
    ],
  },
  {
    id: "migrations",
    title: "Migrations",
    photographer: "Sebastião Salgado",
    year: 2000,
    type: "documentary",
    description:
      "萨尔加多历时六年在40个国家记录的大规模人口迁徙现象，展现了全球化背景下的人类迁移、难民危机和身份认同问题。",
    coverImage: "/images/showcase/narratives/migrations-cover.jpg",
    story:
      "萨尔加多从1993年开始这个项目，记录了战争、自然灾害、贫穷和全球化导致的人口大规模迁徙。他的黑白影像同时展现了人类困境和尊严，以及全球不平等的现实。",
    images: [
      {
        id: "migrations-1",
        title: "Rwanda Refugees",
        imageUrl: "/images/showcase/narratives/migrations-1.jpg",
        description: "卢旺达种族冲突后，难民沿着泥泞道路行进的漫长队伍，展现了被迫迁徙的规模和艰辛。",
      },
      {
        id: "migrations-2",
        title: "Mexico-US Border",
        imageUrl: "/images/showcase/narratives/migrations-2.jpg",
        description: "墨西哥移民试图越过边境围栏的场景，捕捉了边界、国家和身份的复杂主题。",
      },
      {
        id: "migrations-3",
        title: "Mozambique Child",
        imageUrl: "/images/showcase/narratives/migrations-3.jpg",
        description: "莫桑比克难民营中的儿童肖像，通过单个人物的目光呈现集体经历的人性面。",
      },
      {
        id: "migrations-4",
        title: "Ecuador Market",
        imageUrl: "/images/showcase/narratives/migrations-4.jpg",
        description: "厄瓜多尔市场的劳动场景，展示了迁徙中的人群如何适应和重建生活。",
      },
    ],
  },
  {
    id: "life-inbetween",
    title: "Life In-Between",
    photographer: "Fan Ho",
    year: 1960,
    type: "series",
    description:
      "何藩记录了1950-60年代香港街头的日常生活，通过独特的光影处理和构图，将平凡场景转化为诗意叙事。",
    coverImage: "/images/showcase/narratives/fanho-cover.jpg",
    images: [
      {
        id: "fanho-1",
        title: "Approaching Shadow",
        imageUrl: "/images/showcase/narratives/fanho-1.jpg",
        description: "少女站在墙角，投下的阴影形成强烈的几何构图，表达了城市生活中的孤独与压抑。",
      },
      {
        id: "fanho-2",
        title: "As Evening Hurries By",
        imageUrl: "/images/showcase/narratives/fanho-2.jpg",
        description: "行人匆匆穿过光束照亮的街道，捕捉都市生活的瞬间节奏与流动感。",
      },
      {
        id: "fanho-3",
        title: "Her Study",
        imageUrl: "/images/showcase/narratives/fanho-3.jpg",
        description: "少女在光线斜照的场景中阅读，将日常活动提升为视觉诗歌。",
      },
      {
        id: "fanho-4",
        title: "Street Scene",
        imageUrl: "/images/showcase/narratives/fanho-4.jpg",
        description: "香港旧街区的生活场景，通过光影对比展现城市变迁中的传统生活。",
      },
    ],
  },
];

export function VisualNarratives() {
  const [activeProject, setActiveProject] = useState<string>(narrativeProjects[0].id);
  const [viewMode, setViewMode] = useState<"overview" | "sequence">("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedWork, setSelectedWork] = useState<(WorkDetailProps & { isOpen: boolean }) | null>(
    null
  );

  const currentProject = narrativeProjects.find((project) => project.id === activeProject);

  const handleNextImage = () => {
    if (!currentProject) return;
    setCurrentImageIndex((prev) =>
      prev === currentProject.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    if (!currentProject) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentProject.images.length - 1 : prev - 1
    );
  };

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

  return (
    <div className="py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">叙事与序列</h2>
        <p className="text-muted-foreground">
          探索通过影像序列讲述完整故事的摄影作品，了解摄影师如何通过作品集和系列构建视觉叙事，
          表达复杂主题并创造连贯的视觉体验。
        </p>
      </div>

      {/* 项目选择器 */}
      <div className="flex flex-wrap gap-3 mb-8">
        {narrativeProjects.map((project) => (
          <button
            key={project.id}
            onClick={() => {
              setActiveProject(project.id);
              setViewMode("overview");
              setCurrentImageIndex(0);
            }}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeProject === project.id
                ? "bg-primary text-white"
                : "bg-secondary/50 hover:bg-secondary/80"
            }`}
          >
            {project.title}
          </button>
        ))}
      </div>

      {/* 当前项目 */}
      {currentProject && (
        <div>
          {/* 项目信息 */}
          <div className="bg-secondary/30 rounded-lg p-6 mb-6 border border-border">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="aspect-[3/4] relative rounded-md overflow-hidden">
                  <Image
                    src={currentProject.coverImage}
                    alt={currentProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-3/4">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={16} className="text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {currentProject.type} | {currentProject.year}
                  </p>
                </div>
                <h3 className="text-xl font-bold mb-1">{currentProject.title}</h3>
                <p className="text-muted-foreground mb-4">{currentProject.photographer}</p>
                <p className="text-muted-foreground mb-4">{currentProject.description}</p>
                {currentProject.story && (
                  <div className="bg-background/50 p-4 rounded border border-border">
                    <p className="text-sm">{currentProject.story}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 视图切换 */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-border p-1">
              <button
                onClick={() => setViewMode("overview")}
                className={`px-4 py-2 rounded text-sm ${
                  viewMode === "overview"
                    ? "bg-primary text-white"
                    : "hover:bg-secondary/50"
                }`}
              >
                概览
              </button>
              <button
                onClick={() => setViewMode("sequence")}
                className={`px-4 py-2 rounded text-sm ${
                  viewMode === "sequence"
                    ? "bg-primary text-white"
                    : "hover:bg-secondary/50"
                }`}
              >
                序列浏览
              </button>
            </div>
          </div>

          {/* 概览模式 */}
          {viewMode === "overview" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProject.images.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <WorkCard
                    id={image.id}
                    title={image.title}
                    photographer={currentProject.photographer}
                    year={currentProject.year}
                    imageUrl={image.imageUrl}
                    category={currentProject.type}
                    description={image.description}
                    onClick={() =>
                      handleOpenDetail({
                        title: image.title,
                        photographer: currentProject.photographer,
                        year: currentProject.year,
                        imageUrl: image.imageUrl,
                        category: currentProject.type,
                        description: image.description,
                      })
                    }
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* 序列浏览模式 */}
          {viewMode === "sequence" && (
            <div className="relative">
              <div className="aspect-video bg-black/20 rounded-lg overflow-hidden relative">
                {currentProject.images.length > 0 && (
                  <>
                    <Image
                      src={currentProject.images[currentImageIndex].imageUrl}
                      alt={currentProject.images[currentImageIndex].title}
                      fill
                      className="object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h4 className="text-white font-medium">
                        {currentProject.images[currentImageIndex].title}
                      </h4>
                      {currentProject.images[currentImageIndex].description && (
                        <p className="text-white/80 text-sm mt-1">
                          {currentProject.images[currentImageIndex].description}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* 导航控制 */}
              <div className="mt-4 flex justify-between items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    {currentImageIndex + 1} / {currentProject.images.length}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* 缩略图导航 */}
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {currentProject.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative min-w-[80px] h-[60px] rounded overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? "border-primary scale-105"
                        : "border-border opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 作品详情查看器 */}
      {selectedWork && <WorkDetailViewer {...selectedWork} onClose={handleCloseDetail} />}
    </div>
  );
} 