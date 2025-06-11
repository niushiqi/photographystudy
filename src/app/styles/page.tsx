"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  Sun, 
  Mountain, 
  Building, 
  Users
} from "lucide-react";
import { EnhancedSceneSimulator } from "@/components/techniques/core/EnhancedSceneSimulator";
import { PortraitTechniqueModule } from "@/components/techniques/scenes/PortraitTechniqueModule";
import { LandscapeTechniqueModule } from "@/components/techniques/scenes/LandscapeTechniqueModule";
import { StreetTechniqueModule } from "@/components/techniques/scenes/StreetTechniqueModule";

// 场景类型
const sceneTypes = [
  { id: "portraits", name: "人像摄影", icon: <Users size={16} /> },
  { id: "landscapes", name: "风景摄影", icon: <Mountain size={16} /> },
  { id: "street", name: "街头摄影", icon: <Camera size={16} /> },
  { id: "architecture", name: "建筑摄影", icon: <Building size={16} /> },
  { id: "wildlife", name: "野生动物摄影", icon: <Camera size={16} /> }
];

// 基础照明设置
const lightingSettings = [
  { 
    id: "exposure", 
    name: "曝光", 
    min: -2, 
    max: 2, 
    step: 0.1, 
    defaultValue: 0,
    description: "调整整体画面亮度"
  },
  { 
    id: "contrast", 
    name: "对比度", 
    min: 0.5, 
    max: 2, 
    step: 0.1, 
    defaultValue: 1,
    description: "调整高光和暗部之间的差异"
  },
  { 
    id: "highlights", 
    name: "高光", 
    min: -1, 
    max: 1, 
    step: 0.1, 
    defaultValue: 0,
    description: "调整画面明亮区域"
  },
  { 
    id: "shadows", 
    name: "阴影", 
    min: -1, 
    max: 1, 
    step: 0.1, 
    defaultValue: 0,
    description: "调整画面暗部区域"
  }
];

// 场景演示图片
const sceneImages = [
  {
    id: "portraits",
    name: "人像模式",
    description: "适合拍摄人像的参数设置",
    imageUrl: "/images/techniques/simulator/portrait.jpg",
    icon: <Users size={14} />,
    recommendedSettings: {
      exposure: 0.1,
      contrast: 1.2,
      highlights: -0.3,
      shadows: 0.4
    }
  },
  {
    id: "landscapes",
    name: "风景模式",
    description: "适合风光摄影的参数设置",
    imageUrl: "/images/techniques/simulator/landscape.jpg",
    icon: <Mountain size={14} />,
    recommendedSettings: {
      exposure: 0,
      contrast: 1.4,
      highlights: -0.5,
      shadows: 0.2
    }
  },
  {
    id: "street",
    name: "街拍模式",
    description: "适合街头摄影的参数设置",
    imageUrl: "/images/techniques/simulator/street.jpg",
    icon: <Camera size={14} />,
    recommendedSettings: {
      exposure: 0.2,
      contrast: 1.3,
      highlights: -0.2,
      shadows: 0.3
    }
  }
];

// 场景与风格组件
export default function StylesPage() {
  const [activeTab, setActiveTab] = useState("portraits");

  return (
    <div className="container mx-auto px-4 pb-16 pt-24">
      <PageHeader
        title="场景与风格"
        description="探索不同摄影场景的独特要求与挑战，掌握各类题材的专业拍摄技巧与风格表现。"
      />
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full mt-8"
      >
        <TabsList className="flex flex-wrap justify-center gap-2">
          {sceneTypes.map((scene) => (
            <TabsTrigger 
              key={scene.id}
              value={scene.id} 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-1"
            >
              {scene.icon}
              {scene.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TabsContent value="portraits" className="mt-8 space-y-8">
            <SceneContent 
              title="人像摄影" 
              description="捕捉人物个性与情感的艺术，从自然光人像到工作室人像的全面指南。"
            />
            
            <EnhancedSceneSimulator
              title="人像摄影参数模拟器"
              description="调整参数，体验不同设置对人像摄影的影响"
              settings={lightingSettings}
              scenes={sceneImages}
            />
            
            <PortraitTechniqueModule />
          </TabsContent>
          
          <TabsContent value="landscapes" className="mt-8 space-y-8">
            <SceneContent 
              title="风景摄影" 
              description="记录大自然壮丽景色的方法，包括构图技巧、光线运用和后期处理。"
            />
            
            <EnhancedSceneSimulator
              title="风景摄影参数模拟器"
              description="调整参数，体验不同设置对风景摄影的影响"
              settings={lightingSettings}
              scenes={sceneImages}
            />
            
            <LandscapeTechniqueModule />
          </TabsContent>
          
          <TabsContent value="street" className="mt-8 space-y-8">
            <SceneContent 
              title="街头摄影" 
              description="捕捉城市生活和人文瞬间的技巧，培养观察力和快速反应能力。"
            />
            
            <EnhancedSceneSimulator
              title="街头摄影参数模拟器"
              description="调整参数，体验不同设置对街头摄影的影响"
              settings={lightingSettings}
              scenes={sceneImages}
            />
            
            <StreetTechniqueModule />
          </TabsContent>
          
          <TabsContent value="architecture" className="mt-8 space-y-8">
            <SceneContent 
              title="建筑摄影" 
              description="表现建筑空间与形态的专业方法，处理透视和光影的技术指南。"
            />
            
            <EnhancedSceneSimulator
              title="建筑摄影参数模拟器"
              description="调整参数，体验不同设置对建筑摄影的影响"
              settings={lightingSettings}
              scenes={sceneImages}
            />
          </TabsContent>
          
          <TabsContent value="wildlife" className="mt-8 space-y-8">
            <SceneContent 
              title="野生动物摄影" 
              description="捕捉野生动物行为和生态的专业技巧，器材选择和野外实战指南。"
            />
            
            <EnhancedSceneSimulator
              title="野生动物摄影参数模拟器"
              description="调整参数，体验不同设置对野生动物摄影的影响"
              settings={lightingSettings}
              scenes={sceneImages}
            />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
}

// 场景内容组件
function SceneContent({ title, description }: { title: string, description: string }) {
  return (
    <div className="p-6 border border-border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-6">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">基础技巧</h3>
          <p className="text-sm text-muted-foreground">此场景的入门级拍摄技巧和基本方法</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">进阶方法</h3>
          <p className="text-sm text-muted-foreground">提升画面质量和表现力的专业技术</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">创意表达</h3>
          <p className="text-sm text-muted-foreground">突破常规，创造独特个人风格的思路</p>
        </div>
      </div>
    </div>
  );
} 