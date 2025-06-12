"use client";

import React from 'react';
import SceneNavigator from '@/components/techniques/core/SceneNavigator';
import ShootingSceneSimulator from '@/components/techniques/core/ShootingSceneSimulator';
import { StepByStepGuide } from '@/components/techniques/core/StepByStepGuide';
import PortraitAssistant from '@/components/techniques/core/PortraitAssistant';
import ShootingTroubleshooter from '@/components/techniques/core/ShootingTroubleshooter';
import { PageHeader } from '@/components/ui/PageHeader';

// 此页面用于重定向到/techniques，以解决路由变更问题
export default function ShootingTipsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
      <PageHeader 
        title="实用拍摄技巧"
        description="提供场景化、步骤化的实用拍摄解决方案，帮助您快速掌握拍摄技巧、解决拍摄难题，拍出更好的照片。"
        bgGradient={true}
      />

      {/* 场景导航系统 */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-gray-100 mb-6">
          场景导航
        </h2>
        <SceneNavigator />
      </section>

      {/* 拍摄场景模拟器 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-100">
            拍摄场景模拟器
          </h2>
          <span className="text-sm text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">
            交互式学习
          </span>
        </div>
        <ShootingSceneSimulator 
          scene="cityscape-sunset"
          environmentConditions={["clear", "cloudy", "foggy"]}
          timeOfDay={["golden-hour", "blue-hour", "night"]}
          interactiveControls={true}
          parameterRecommendations={true}
        />
      </section>

      {/* 步骤化指导工具 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-100">
            步骤化拍摄指南
          </h2>
          <span className="text-sm text-green-400 bg-green-900/30 px-3 py-1 rounded-full">
            精选技巧
          </span>
        </div>
        <StepByStepGuide 
          technique="light-painting"
          stepsCount={7}
          difficulty="intermediate"
          checklistIncluded={true}
          troubleshootingTips={true}
          requiredGear={["tripod", "remote-trigger", "light-source"]}
        />
      </section>

      {/* 人像拍摄助手 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-100">
            人像拍摄助手
          </h2>
          <span className="text-sm text-purple-400 bg-purple-900/30 px-3 py-1 rounded-full">
            专业指导
          </span>
        </div>
        <PortraitAssistant 
          posingSuggestions={true}
          lightingDiagrams={true}
          interactionTechniquesEnabled={true}
          environmentalOptions={["indoor", "outdoor", "studio"]}
          subjectTypes={["individual", "couple", "group"]}
        />
      </section>

      {/* 拍摄问题诊断系统 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-100">
            问题诊断系统
          </h2>
          <span className="text-sm text-amber-400 bg-amber-900/30 px-3 py-1 rounded-full">
            问题解决
          </span>
        </div>
        <ShootingTroubleshooter 
          problemCategories={["focus", "exposure", "composition", "lighting", "motion"]}
          analyzeExampleImages={true}
          provideSolutions={true}
          preventionTips={true}
        />
      </section>

      {/* 学习资源与推荐 */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-gray-100 mb-6">
          进阶学习资源
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="h-40 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="p-5">
              <h3 className="text-white font-bold text-lg mb-2">摄影技巧电子书</h3>
              <p className="text-gray-400 text-sm mb-4">包含100+实用拍摄技巧的电子指南，涵盖各种场景和主题。</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors">
                免费下载
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="h-40 bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-5">
              <h3 className="text-white font-bold text-lg mb-2">视频教程系列</h3>
              <p className="text-gray-400 text-sm mb-4">专业摄影师现场示范各种拍摄技巧，包含详细讲解和实战演示。</p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition-colors">
                观看教程
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="h-40 bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="p-5">
              <h3 className="text-white font-bold text-lg mb-2">摄影社区挑战</h3>
              <p className="text-gray-400 text-sm mb-4">每月摄影主题挑战，获得反馈并与其他摄影爱好者一起学习成长。</p>
              <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded transition-colors">
                参与挑战
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 