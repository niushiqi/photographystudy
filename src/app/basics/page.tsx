'use client'

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import CameraBasics from '@/components/basics/CameraBasics';
import ExposureTriangleSimulator from '@/components/basics/ExposureTriangleSimulator';
import LensKnowledge from '@/components/basics/LensKnowledge';
import FocusDepthOfField from '@/components/basics/FocusDepthOfField';
import ModuleNavigation from '@/components/basics/ModuleNavigation';

export default function BasicsPage() {
  const [activeModule, setActiveModule] = useState('camera');
  
  const modules = [
    { id: 'camera', name: '相机基础' },
    { id: 'exposure', name: '曝光三要素' },
    { id: 'lens', name: '镜头知识' },
    { id: 'focus', name: '对焦与景深' },
    { id: 'light', name: '光线基础' },
    { id: 'composition', name: '构图基础' },
    { id: 'color', name: '色彩初步' },
  ];

  // 渲染当前活跃的模块内容
  const renderActiveModule = () => {
    switch (activeModule) {
      case 'camera':
        return <CameraBasics />;
      case 'exposure':
        return <ExposureTriangleSimulator baseImage="/images/basics/exposure-sample.jpg" />;
      case 'lens':
        return <LensKnowledge />;
      case 'focus':
        return <FocusDepthOfField />;
      case 'light':
        return <div className="py-6"><h2 className="text-3xl font-bold">光线基础</h2><p className="mt-4">光线模块正在开发中...</p></div>;
      case 'composition':
        return <div className="py-6"><h2 className="text-3xl font-bold">构图基础</h2><p className="mt-4">构图模块正在开发中...</p></div>;
      case 'color':
        return <div className="py-6"><h2 className="text-3xl font-bold">色彩初步</h2><p className="mt-4">色彩模块正在开发中...</p></div>;
      default:
        return <CameraBasics />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <PageHeader
        title="基础知识"
        description="掌握摄影基础理论与知识，理解曝光、对焦、光线、构图等摄影核心概念，为创作打下坚实基础。"
      />
      <ModuleNavigation 
        modules={modules} 
        activeModule={activeModule}
        onModuleChange={setActiveModule}
      />
      
      <div className="mt-6">
        {renderActiveModule()}
      </div>
    </div>
  );
} 