"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { EquipmentComparatorModule } from "@/components/techniques/equipment/EquipmentComparator";
import { LensAdvisorModule } from "@/components/techniques/equipment/LensAdvisor";
import { AccessoryPlannerModule } from "@/components/techniques/equipment/AccessoryPlanner";
import { GearAdvisorModule } from "@/components/techniques/equipment/GearAdvisor";

export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState("cameras");
  
  return (
    <div className="container mx-auto px-4 pb-16 pt-24">
      <PageHeader
        title="器材指南"
        description="探索适合各类摄影场景的相机、镜头与配件，了解如何选择合适的器材组合。"
      />
      
      {/* 器材科普和用户级别指南 */}
      <div className="mt-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">摄影器材入门指南</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 用户级别推荐 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-l-4 border-primary pl-3">不同水平摄影师的器材选择</h3>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold flex items-center text-lg">
                  <span className="text-white bg-green-500 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">1</span>
                  初学者 (预算: ¥3,000-8,000)
                </h4>
                <div className="mt-3 text-sm">
                  <p className="mb-2 text-muted-foreground">适合刚开始接触摄影的爱好者，专注于学习基础知识和技巧。</p>
                  <p className="font-medium">推荐器材:</p>
                  <ul className="list-disc list-inside text-muted-foreground ml-2">
                    <li>入门级APS-C无反相机 (如富士X-T30、索尼A6400)</li>
                    <li>套机镜头或一支变焦镜头 (18-55mm)</li>
                    <li>基础三脚架</li>
                    <li>SD卡和相机包</li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold flex items-center text-lg">
                  <span className="text-white bg-blue-500 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">2</span>
                  进阶爱好者 (预算: ¥8,000-20,000)
                </h4>
                <div className="mt-3 text-sm">
                  <p className="mb-2 text-muted-foreground">已掌握基础知识，开始拍摄特定题材，追求更高画质和灵活性。</p>
                  <p className="font-medium">推荐器材:</p>
                  <ul className="list-disc list-inside text-muted-foreground ml-2">
                    <li>中端APS-C或入门全画幅无反相机 (如富士X-T4、索尼A7III)</li>
                    <li>2-3支优质镜头 (标准变焦24-70mm + 一支定焦)</li>
                    <li>专业三脚架</li>
                    <li>简单闪光灯系统</li>
                    <li>滤镜和备用电池</li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold flex items-center text-lg">
                  <span className="text-white bg-purple-500 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">3</span>
                  专业摄影师 (预算: ¥20,000以上)
                </h4>
                <div className="mt-3 text-sm">
                  <p className="mb-2 text-muted-foreground">对设备性能和可靠性有极高要求，需要覆盖多种拍摄场景。</p>
                  <p className="font-medium">推荐器材:</p>
                  <ul className="list-disc list-inside text-muted-foreground ml-2">
                    <li>高端全画幅或中画幅相机 (索尼A1、佳能R5、富士GFX系列)</li>
                    <li>多支专业级镜头 (全套变焦+多支大光圈定焦)</li>
                    <li>专业闪光灯系统</li>
                    <li>高端三脚架和云台</li>
                    <li>专业附件 (遥控器、滤镜系统等)</li>
                    <li>后备机身和完善的存储方案</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* 科普知识 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-l-4 border-primary pl-3">摄影器材基础知识</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">相机传感器尺寸对比</h4>
                <p className="text-sm text-muted-foreground mb-3">传感器尺寸是影响画质、景深和低光性能的关键因素</p>
                <div className="relative h-32 bg-white dark:bg-slate-700 rounded border p-2">
                  <div className="absolute bottom-2 left-2 right-2 flex items-end justify-around">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-8 border-2 border-blue-500 mb-1"></div>
                      <span className="text-xs">APS-C</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-10 border-2 border-green-500 mb-1"></div>
                      <span className="text-xs">全画幅</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-14 border-2 border-purple-500 mb-1"></div>
                      <span className="text-xs">中画幅</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">常见镜头焦段及用途</h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">16-35mm</span>
                    <span className="text-muted-foreground">广角，风景、建筑、室内</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">24-70mm</span>
                    <span className="text-muted-foreground">标准变焦，多用途</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">70-200mm</span>
                    <span className="text-muted-foreground">中长焦，人像、体育</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">50mm/85mm定焦</span>
                    <span className="text-muted-foreground">人像、低光环境</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">100mm微距</span>
                    <span className="text-muted-foreground">特写、产品摄影</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">选择器材的关键考量</h4>
                <ul className="text-sm list-disc list-inside text-muted-foreground space-y-1">
                  <li>先考虑镜头投资，再考虑机身</li>
                  <li>优先满足主要拍摄题材的需求</li>
                  <li>重量和体积是长期使用的重要因素</li>
                  <li>系统生态和镜头群是关键考量</li>
                  <li>二手市场是性价比的好选择</li>
                  <li>器材只是工具，摄影技巧更重要</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 器材顾问 */}
      <div className="mt-8 mb-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">个性化器材推荐</h2>
        <GearAdvisorModule />
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full mt-12"
      >
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="cameras">相机选择</TabsTrigger>
          <TabsTrigger value="lenses">镜头指南</TabsTrigger>
          <TabsTrigger value="accessories">配件推荐</TabsTrigger>
        </TabsList>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TabsContent value="cameras" className="mt-6">
            <EquipmentComparatorModule />
          </TabsContent>
          
          <TabsContent value="lenses" className="mt-6">
            <LensAdvisorModule />
          </TabsContent>
          
          <TabsContent value="accessories" className="mt-6">
            <AccessoryPlannerModule />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
} 