"use client";

import { useState } from "react";
import { ShowcaseHeader } from "@/components/showcase/ShowcaseHeader";
import { ShowcaseNavigation } from "@/components/showcase/ShowcaseNavigation";
import { MasterWorksGallery } from "@/components/showcase/MasterWorksGallery";
import { ContemporaryGallery } from "@/components/showcase/ContemporaryGallery";
import { ThematicGallery } from "@/components/showcase/ThematicGallery";
import { TechnicalShowcase } from "@/components/showcase/TechnicalShowcase";
import { VisualNarratives } from "@/components/showcase/VisualNarratives";

// 作品展示子模块
const showcaseModules = [
  { id: "masters", title: "大师经典作品", description: "摄影史上的经典作品和大师摄影" },
  { id: "contemporary", title: "当代优秀作品", description: "当代摄影师的杰出创作" },
  { id: "thematic", title: "主题策展集", description: "围绕特定主题或概念的策展作品集" },
  { id: "technical", title: "技术展示精选", description: "展示特定技术成就的作品集" },
  { id: "narratives", title: "叙事与序列", description: "讲述完整故事的摄影序列" },
];

export default function ShowcasePage() {
  const [activeModule, setActiveModule] = useState("masters");

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ShowcaseHeader />
        
        <ShowcaseNavigation 
          modules={showcaseModules} 
          activeModule={activeModule} 
          setActiveModule={setActiveModule} 
        />
        
        <div className="mt-8">
          {activeModule === "masters" && <MasterWorksGallery />}
          {activeModule === "contemporary" && <ContemporaryGallery />}
          {activeModule === "thematic" && <ThematicGallery />}
          {activeModule === "technical" && <TechnicalShowcase />}
          {activeModule === "narratives" && <VisualNarratives />}
        </div>
      </div>
    </main>
  );
} 