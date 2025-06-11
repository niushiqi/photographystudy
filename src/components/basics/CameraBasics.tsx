"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const CameraBasics = () => {
  const [activePart, setActivePart] = useState<string | null>(null);
  
  const cameraParts = [
    {
      id: 'sensor',
      name: '传感器',
      description: '相机的核心部件，负责捕捉光线并转换为数字信号。类似于传统胶片的角色，但可以即时查看拍摄结果。传感器尺寸影响画质、噪点控制和景深表现。',
    },
    {
      id: 'shutter',
      name: '快门',
      description: '控制光线进入相机的时间长短。快门速度越快，捕捉的瞬间越短，适合拍摄运动物体；快门速度越慢，光线进入越多，适合弱光环境或创造动态效果。',
    },
    {
      id: 'aperture',
      name: '光圈',
      description: '控制进光量的大小，同时影响景深。光圈越大（如f/1.8），景深越浅，主体越突出；光圈越小（如f/16），景深越深，画面整体清晰度更高。',
    },
    {
      id: 'viewfinder',
      name: '取景器',
      description: '摄影师通过取景器构图和观察场景。光学取景器直接反映镜头所见，电子取景器则显示传感器捕捉的实时图像，可预览曝光效果。',
    },
    {
      id: 'lens',
      name: '镜头',
      description: '决定相机成像的关键部件，不同焦距和光圈的镜头有不同的用途。广角镜头适合风景，长焦镜头适合人像和野生动物，微距镜头适合特写。',
    }
  ];

  return (
    <div className="flex flex-col space-y-8 py-6">
      <h2 className="text-3xl font-bold">相机基础知识</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative md:w-1/2 h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          {/* 这里放置相机示意图，后续可替换为实际图片 */}
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">相机交互图 - 将添加可点击的热点区域</p>
            {/* 实际开发时这里将替换为Image组件 */}
            {/* <Image src="/images/basics/camera-diagram.png" fill alt="相机结构图" className="object-contain" /> */}
          </div>
          
          {/* 热点标记示例 - 实际开发时将基于图片位置调整 */}
          {cameraParts.map((part, index) => (
            <div 
              key={part.id}
              className={`absolute cursor-pointer w-6 h-6 rounded-full border-2 transition-all
                ${activePart === part.id 
                  ? 'bg-blue-500 border-white scale-125' 
                  : 'bg-gray-400 border-gray-200 hover:bg-blue-400'}`}
              style={{
                top: `${20 + index * 15}%`,
                left: `${20 + index * 12}%`,
              }}
              onClick={() => setActivePart(part.id)}
            ></div>
          ))}
        </div>
        
        <div className="md:w-1/2">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md h-full">
            {activePart ? (
              <div className="h-full flex flex-col">
                <h3 className="text-2xl font-semibold mb-4">
                  {cameraParts.find(part => part.id === activePart)?.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {cameraParts.find(part => part.id === activePart)?.description}
                </p>
                <div className="mt-6">
                  <button 
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    onClick={() => setActivePart(null)}
                  >
                    返回总览
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <h3 className="text-2xl font-semibold mb-4">相机部件和功能</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  点击左侧相机图中的标记点，了解各个部件的功能和作用。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  {cameraParts.map(part => (
                    <button
                      key={part.id}
                      className="text-left p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      onClick={() => setActivePart(part.id)}
                    >
                      <h4 className="font-medium">{part.name}</h4>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
        <h3 className="text-2xl font-semibold mb-4">相机类型</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-xl font-medium mb-2">单反相机 (DSLR)</h4>
            <p className="text-gray-700 dark:text-gray-300">
              使用反光镜系统将光线反射到光学取景器中。拍摄时反光镜抬起，让光线到达传感器。优点是光学取景器直观，对焦系统成熟，缺点是体积较大。
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-xl font-medium mb-2">无反相机 (Mirrorless)</h4>
            <p className="text-gray-700 dark:text-gray-300">
              没有反光镜系统，光线直接到达传感器，通过电子取景器显示图像。体积更小巧，静音性好，视频性能优秀，是当前相机发展的主流方向。
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-xl font-medium mb-2">便携相机</h4>
            <p className="text-gray-700 dark:text-gray-300">
              包括卡片机和高级便携相机，镜头固定无法更换，体积小巧便于携带。适合日常记录和旅行，但在画质和操控性上有局限。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraBasics; 