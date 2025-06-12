'use client'

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import CameraBasics from '@/components/basics/CameraBasics';
import ExposureTriangleSimulator from '@/components/basics/ExposureTriangleSimulator';
import LensKnowledge from '@/components/basics/LensKnowledge';
import FocusDepthOfField from '@/components/basics/FocusDepthOfField';
import ModuleNavigation from '@/components/basics/ModuleNavigation';
import LightingBasicsLab from '@/components/basics/LightingBasicsLab';
import CompositionBasics from '@/components/basics/CompositionBasics';
import ColorTheory from '@/components/basics/ColorTheory';
import LearningPathMap from '@/components/basics/LearningPathMap';
import { 
  Module, 
  ProgressStatus, 
  ProgressRecord, 
  getUserProgress, 
  updateUserProgress, 
  getNextRecommendedModule,
  isModuleAvailable,
  calculateCourseCompletion,
  resetCourseProgress
} from '@/lib/progressTracker';

// 课程ID常量
const COURSE_ID = 'basics';

export default function BasicsPage() {
  const [activeModule, setActiveModule] = useState<string>('camera');
  const [userProgress, setUserProgress] = useState<ProgressRecord>({});
  const [isClient, setIsClient] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  // 模块定义
  const modules: Module[] = [
    { 
      id: 'camera', 
      name: '相机基础', 
      icon: 'camera',
      description: '了解相机的基本结构、工作原理和操作方式'
    },
    { 
      id: 'exposure', 
      name: '曝光三要素', 
      icon: 'aperture',
      description: '掌握光圈、快门速度和ISO三个关键参数的作用及关系'
    },
    { 
      id: 'lens', 
      name: '镜头知识', 
      icon: 'lens',
      description: '探索不同类型镜头的特点、用途和选择原则'
    },
    { 
      id: 'focus', 
      name: '对焦与景深', 
      icon: 'focus',
      description: '理解对焦机制、景深控制和清晰度影响因素'
    },
    { 
      id: 'light', 
      name: '光线基础', 
      icon: 'light',
      description: '掌握基础光线类型、方向、质感和色温知识'
    },
    { 
      id: 'composition', 
      name: '构图基础', 
      icon: 'compose',
      description: '学习基本构图规则、视觉引导和画面平衡技巧'
    },
    { 
      id: 'color', 
      name: '色彩初步', 
      icon: 'color',
      description: '理解色彩理论基础、白平衡和色彩情绪表达'
    },
  ];
  
  // 在客户端加载时初始化进度数据
  useEffect(() => {
    setIsClient(true);
    
    // 从本地存储加载进度
    const savedProgress = getUserProgress(COURSE_ID);
    setUserProgress(savedProgress);
    
    // 计算完成百分比
    const completion = calculateCourseCompletion(COURSE_ID, modules);
    setCompletionPercentage(completion);
    
    // 如果没有活跃模块，设置推荐的下一个模块
    if (!activeModule) {
      const nextModule = getNextRecommendedModule(COURSE_ID, modules);
      if (nextModule) {
        setActiveModule(nextModule);
      } else {
        // 默认设置为第一个模块
        setActiveModule(modules[0].id);
      }
    }
  }, []);
  
  // 模块学习进度更新函数
  const handleModuleProgressUpdate = (moduleId: string, status: ProgressStatus): void => {
    // 更新本地存储中的进度
    updateUserProgress(COURSE_ID, moduleId, status);
    
    // 更新状态
    setUserProgress(prev => ({
      ...prev,
      [moduleId]: status
    }));
    
    // 重新计算完成百分比
    const completion = calculateCourseCompletion(COURSE_ID, modules);
    setCompletionPercentage(completion);
  };
  
  // 处理模块选择
  const handleModuleSelect = (moduleId: string) => {
    // 检查模块是否可用
    if (isModuleAvailable(COURSE_ID, moduleId, modules)) {
      setActiveModule(moduleId);
      
      // 如果模块未开始，则设置为进行中
      if (!userProgress[moduleId] || userProgress[moduleId] === 'notStarted') {
        handleModuleProgressUpdate(moduleId, 'inProgress');
      }
    }
  };
  
  // 处理重置进度
  const handleResetProgress = () => {
    resetCourseProgress(COURSE_ID);
    setUserProgress({});
    setCompletionPercentage(0);
    setActiveModule(modules[0].id);
    setShowResetConfirm(false);
  };

  // 模块对应图标
  const getModuleIcon = (iconName: string): React.ReactNode => {
    switch(iconName) {
      case 'camera':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'aperture':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        );
      case 'lens':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'focus':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case 'light':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'compose':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case 'color':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // 渲染当前活跃的模块内容
  const renderActiveModule = () => {
    switch (activeModule) {
      case 'camera':
        return <CameraBasics onComplete={() => handleModuleProgressUpdate('camera', 'completed')} />;
      case 'exposure':
        return <ExposureTriangleSimulator 
          baseImage="/images/basics/exposure-sample.jpg"
          onComplete={() => handleModuleProgressUpdate('exposure', 'completed')}
        />;
      case 'lens':
        return <LensKnowledge onComplete={() => handleModuleProgressUpdate('lens', 'completed')} />;
      case 'focus':
        return <FocusDepthOfField onComplete={() => handleModuleProgressUpdate('focus', 'completed')} />;
      case 'light':
        return <LightingBasicsLab
          environment="studio"
          timeSimulation={true}
          lightTypes={['hard', 'soft', 'reflected']}
          showLightPatterns={true}
          onComplete={() => handleModuleProgressUpdate('light', 'completed')}
        />;
      case 'composition':
        return <CompositionBasics onComplete={() => handleModuleProgressUpdate('composition', 'completed')} />;
      case 'color':
        return <ColorTheory onComplete={() => handleModuleProgressUpdate('color', 'completed')} />;
      default:
        return <CameraBasics onComplete={() => handleModuleProgressUpdate('camera', 'completed')} />;
    }
  };

  // 如果不是客户端，显示加载状态
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 pt-24">
        <PageHeader
          title="基础知识"
          description="掌握摄影基础理论与知识，理解曝光、对焦、光线、构图等摄影核心概念，为创作打下坚实基础。"
        />
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              摄影学习路径
            </h2>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300 mr-3">
                总体进度: <span className="font-semibold text-blue-600 dark:text-blue-400">{completionPercentage}%</span>
              </span>
              
              <button 
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              >
                重置进度
              </button>
              
              {/* 重置确认弹窗 */}
              {showResetConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">确认重置学习进度</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      此操作将删除您在基础知识课程中的所有学习进度记录，且无法恢复。确定要继续吗？
                    </p>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        取消
                      </button>
                      <button
                        onClick={handleResetProgress}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        确认重置
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            以下是推荐的摄影基础知识学习路径，点击任意模块开始学习或继续上次的进度。
          </p>
          
          <LearningPathMap 
            modules={modules} 
            progress={userProgress}
            activeModule={activeModule}
            onModuleSelect={handleModuleSelect}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  学习模块
                </h3>
              </div>
              <ModuleNavigation 
                modules={modules} 
                activeModule={activeModule}
                onModuleChange={handleModuleSelect}
                progress={userProgress}
                getIcon={getModuleIcon}
              />
            </div>
            
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
              <h3 className="text-md font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                学习建议
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                建议先从相机基础开始学习，了解摄影的核心概念后，再进入曝光三要素和其他模块。每个模块都包含交互练习，帮助你巩固所学知识。
              </p>
            </div>
            
            <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-100 dark:border-green-800">
              <h3 className="text-md font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                学习技巧
              </h3>
              <ul className="text-sm text-green-700 dark:text-green-200 space-y-2">
                <li className="flex items-start">
                  <svg className="w-3 h-3 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  完成每个模块的互动练习，以巩固所学知识
                </li>
                <li className="flex items-start">
                  <svg className="w-3 h-3 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  定期复习已学内容，加深理解和记忆
                </li>
                <li className="flex items-start">
                  <svg className="w-3 h-3 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  尝试将所学知识应用到实际拍摄中
                </li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              {renderActiveModule()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 