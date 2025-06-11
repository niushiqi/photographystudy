"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { EquipmentComparatorModule } from "@/components/techniques/equipment/EquipmentComparator";
import { LensAdvisorModule } from "@/components/techniques/equipment/LensAdvisor";
import { AccessoryPlannerModule } from "@/components/techniques/equipment/AccessoryPlanner";

export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState("cameras");
  
  return (
    <div className="container mx-auto px-4 pb-16 pt-24">
      <PageHeader
        title="器材指南"
        description="探索适合各类摄影场景的相机、镜头与配件，了解如何选择合适的器材组合。"
      />
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full mt-8"
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