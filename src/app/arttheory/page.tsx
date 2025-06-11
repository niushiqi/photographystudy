"use client";

import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/PageHeader";
import { AestheticsFoundation } from "@/components/techniques/arttheory/aesthetics-foundation";
import { PhotographyHistory } from "@/components/techniques/arttheory/photography-history";
import { ArtistStudies } from "@/components/techniques/arttheory/artist-studies";
import { VisualLanguage } from "@/components/techniques/arttheory/visual-language";
import { NarrativeExpression } from "@/components/techniques/arttheory/narrative-expression";
import { CulturalSocial } from "@/components/techniques/arttheory/cultural-social";
import { ContemporaryPractice } from "@/components/techniques/arttheory/contemporary-practice";

export default function ArtTheoryPage() {
  // 默认选中第一个选项卡
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      document.getElementById(hash.substring(1))?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <main className="container mx-auto px-4 pb-16 pt-24">
      <PageHeader
        title="艺术理论"
        description="探索摄影的美学、哲学与文化维度，建立个人艺术观念和批判性审美能力。"
      />
      
      <Tabs defaultValue="aesthetics" className="mt-10">
        <TabsList className="mb-8 w-full flex flex-wrap justify-start gap-2 bg-transparent p-0">
          <TabsTrigger 
            value="aesthetics" 
            className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-6 py-2 transition-all"
          >
            美学基础理论
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-6 py-2 transition-all"
          >
            摄影史与思潮
          </TabsTrigger>
          <TabsTrigger 
            value="artists" 
            className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-6 py-2 transition-all"
          >
            艺术家研究
          </TabsTrigger>
          <TabsTrigger 
            value="visual" 
            className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-6 py-2 transition-all"
          >
            视觉语言学
          </TabsTrigger>
          <TabsTrigger 
            value="narrative" 
            className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-6 py-2 transition-all"
          >
            叙事与表达
          </TabsTrigger>
          <TabsTrigger 
            value="cultural" 
            className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-6 py-2 transition-all"
          >
            文化与社会
          </TabsTrigger>
          <TabsTrigger 
            value="contemporary" 
            className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-6 py-2 transition-all"
          >
            当代艺术实践
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="aesthetics" className="animate-fade-in">
            <AestheticsFoundation />
          </TabsContent>
          
          <TabsContent value="history" className="animate-fade-in">
            <PhotographyHistory />
          </TabsContent>
          
          <TabsContent value="artists" className="animate-fade-in">
            <ArtistStudies />
          </TabsContent>
          
          <TabsContent value="visual" className="animate-fade-in">
            <VisualLanguage />
          </TabsContent>
          
          <TabsContent value="narrative" className="animate-fade-in">
            <NarrativeExpression />
          </TabsContent>
          
          <TabsContent value="cultural" className="animate-fade-in">
            <CulturalSocial />
          </TabsContent>
          
          <TabsContent value="contemporary" className="animate-fade-in">
            <ContemporaryPractice />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
} 