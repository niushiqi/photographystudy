"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Clock, Cloud, Compass, Mountain, Sliders, Sun, Moon, Eye } from 'lucide-react';

// 定义组件所需的接口
interface SceneTip {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

interface CameraSettings {
  aperture: string;
  shutterSpeed: string;
  iso: string;
  focalLength: string;
  whiteBalance: string;
}

interface Challenge {
  challenge: string;
  solution: string;
}

interface Scene {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
  tips: SceneTip[];
  recommendedSettings: CameraSettings;
  challengesAndSolutions: Challenge[];
  bestTimeToShoot?: string;
}

// 获取图片路径工具函数
const getImagePath = (sceneId: string): string => {
  return `/images/techniques/scenes/${sceneId}.jpg`;
};

// 场景数据
const scenes: Scene[] = [
  {
    id: "landscape",
    name: "风景摄影",
    description: "捕捉自然美景，强调空间感和光影变化",
    icon: <Mountain className="h-5 w-5" />,
    imageSrc: getImagePath("landscape"),
    tips: [
      {
        title: "黄金时刻拍摄",
        content: "日出和日落前后的1小时是风景摄影的黄金时间，提供柔和温暖的光线和长阴影。",
        icon: <Sun className="h-4 w-4" />
      },
      {
        title: "考虑前景元素",
        content: "添加前景元素（如岩石、花卉、树木）可增加画面深度和引导视线。",
        icon: <Mountain className="h-4 w-4" />
      },
      {
        title: "寻找引导线",
        content: "使用自然形成的线条（如小路、河流）引导观者视线穿过画面。",
        icon: <Compass className="h-4 w-4" />
      },
      {
        title: "使用三脚架和滤镜",
        content: "在弱光条件下使用三脚架避免抖动，使用渐变滤镜平衡天空与地面的曝光差异。",
        icon: <Camera className="h-4 w-4" />
      }
    ],
    recommendedSettings: {
      aperture: "f/8-f/16（获得大景深）",
      shutterSpeed: "视光线情况而定，使用三脚架时可用较慢快门",
      iso: "100-200（保持最佳画质）",
      focalLength: "16-35mm（广角）或70-200mm（压缩远景）",
      whiteBalance: "日出日落时可选择'阴天'增强暖色调"
    },
    challengesAndSolutions: [
      {
        challenge: "天空与地面曝光差异大",
        solution: "使用渐变滤镜或HDR技术，多次曝光后合成"
      },
      {
        challenge: "风景缺乏主体",
        solution: "寻找视觉焦点（如独特岩石、树木），利用引导线引导视线"
      },
      {
        challenge: "天气条件不理想",
        solution: "利用多变天气创造戏剧性效果，雾天拍摄神秘氛围"
      }
    ],
    bestTimeToShoot: "日出前30分钟至日出后30分钟，日落前1小时至蓝调时分"
  },
  {
    id: "cityscape",
    name: "城市日落",
    description: "捕捉城市天际线与日落的结合，展现都市魅力",
    icon: <Cloud className="h-5 w-5" />,
    imageSrc: getImagePath("cityscape"),
    tips: [
      {
        title: "寻找最佳观景点",
        content: "提前踩点，选择能够看到城市天际线的高处，如观景台、高楼或远处的山坡。",
        icon: <Mountain className="h-4 w-4" />
      },
      {
        title: "掌握时间",
        content: "日落前45分钟到场，拍摄日落过程和蓝调时分（日落后20-30分钟）的城市灯光。",
        icon: <Clock className="h-4 w-4" />
      },
      {
        title: "利用建筑剪影",
        content: "将日落作为背景，城市建筑形成剪影，创造强烈的视觉对比。",
        icon: <Cloud className="h-4 w-4" />
      },
      {
        title: "捕捉光线反射",
        content: "寻找水面、玻璃幕墙等反射面，捕捉日落光线的反射效果。",
        icon: <Sun className="h-4 w-4" />
      }
    ],
    recommendedSettings: {
      aperture: "f/8-f/11（保持城市细节清晰）",
      shutterSpeed: "日落时1/125-1/30秒，蓝调时分需要三脚架和更慢快门",
      iso: "100-400（随光线减弱适当提高）",
      focalLength: "24-70mm（全景），70-200mm（压缩效果）",
      whiteBalance: "保持'日落'或'阴天'设置增强暖色调"
    },
    challengesAndSolutions: [
      {
        challenge: "曝光难以平衡",
        solution: "使用包围曝光或渐变滤镜，平衡明亮天空与较暗建筑"
      },
      {
        challenge: "天气条件不确定",
        solution: "多云天气往往产生最戏剧性的日落，持续关注天气预报"
      },
      {
        challenge: "城市灯光与日落平衡",
        solution: "蓝调时分是平衡自然光与人工灯光的最佳时段"
      }
    ],
    bestTimeToShoot: "日落前30分钟至日落后30分钟（蓝调时分）"
  },
  {
    id: "street",
    name: "街头摄影",
    description: "捕捉城市生活瞬间，记录真实人文故事",
    icon: <Cloud className="h-5 w-5" />,
    imageSrc: getImagePath("street"),
    tips: [
      {
        title: "保持敏锐观察",
        content: "培养对日常场景中不寻常元素的敏感度，寻找有趣的构图、光影和人物互动。",
        icon: <Eye className="h-4 w-4" />
      },
      {
        title: "轻装出行",
        content: "使用轻便设备，通常一个机身搭配一个定焦镜头（35mm或50mm）即可，保持灵活性。",
        icon: <Camera className="h-4 w-4" />
      },
      {
        title: "掌握光线",
        content: "利用城市环境中的自然光线、阴影和反射，创造有深度的画面。清晨和傍晚的长阴影特别适合。",
        icon: <Sun className="h-4 w-4" />
      },
      {
        title: "预设相机参数",
        content: "使用光圈优先或快门优先模式，预设参数以快速捕捉稍纵即逝的瞬间。",
        icon: <Sliders className="h-4 w-4" />
      }
    ],
    recommendedSettings: {
      aperture: "f/5.6-f/8（保持足够景深）",
      shutterSpeed: "至少1/125秒（避免动态模糊）",
      iso: "根据光线条件调整，通常400-1600",
      focalLength: "35mm或50mm（接近人眼视角）",
      whiteBalance: "自动或预设，后期可调整"
    },
    challengesAndSolutions: [
      {
        challenge: "拍摄陌生人的顾虑",
        solution: "尊重被摄者，必要时征求同意，或专注于不显示面部的构图"
      },
      {
        challenge: "光线条件多变",
        solution: "熟悉相机操作，快速调整参数，或使用自动ISO保持适当快门速度"
      },
      {
        challenge: "构图时间短暂",
        solution: "练习'抢拍'技巧，预判场景发展，提前构图等待决定性瞬间"
      }
    ],
    bestTimeToShoot: "全天，但早晨和傍晚的光线最佳；雨后或特殊天气条件下往往有独特效果"
  },
  {
    id: "night",
    name: "夜景摄影",
    description: "捕捉夜晚城市灯光与星空的魅力",
    icon: <Moon className="h-5 w-5" />,
    imageSrc: getImagePath("night"),
    tips: [
      {
        title: "必备三脚架",
        content: "夜景拍摄必须使用稳定的三脚架，避免长曝光时的抖动。使用遥控快门或定时器进一步减少震动。",
        icon: <Camera className="h-4 w-4" />
      },
      {
        title: "掌握曝光三角",
        content: "使用小光圈获得星芒效果，低ISO减少噪点，长时间曝光捕捉足够光线。",
        icon: <Sliders className="h-4 w-4" />
      },
      {
        title: "蓝调时分起步",
        content: "日落后20-30分钟的蓝调时分是城市夜景最佳拍摄时间，天空仍有深蓝色而非全黑。",
        icon: <Clock className="h-4 w-4" />
      },
      {
        title: "寻找反射",
        content: "利用水面、雨后地面或玻璃表面的反射增加画面层次感和光线元素。",
        icon: <Moon className="h-4 w-4" />
      }
    ],
    recommendedSettings: {
      aperture: "f/8-f/16（城市灯光星芒效果）",
      shutterSpeed: "2-30秒不等（根据光线和创意需求）",
      iso: "100-400（避免高ISO噪点）",
      focalLength: "14-35mm（广角）或适合具体场景的焦段",
      whiteBalance: "根据创意需求，'钨丝灯'设置保留暖色调，'日光'设置呈现蓝调"
    },
    challengesAndSolutions: [
      {
        challenge: "对焦困难",
        solution: "使用实时取景放大对焦，或在拍摄前在日光下预先对焦并锁定"
      },
      {
        challenge: "光源过亮造成过曝",
        solution: "使用HDR技术或包围曝光，后期合成平衡亮度差异"
      },
      {
        challenge: "长时间曝光噪点",
        solution: "使用低ISO，开启相机长曝光降噪功能，或多张叠加平均降噪"
      }
    ],
    bestTimeToShoot: "蓝调时分（日落后20-30分钟）至深夜"
  }
];

export default function SceneGuide() {
  const [currentSceneId, setCurrentSceneId] = useState(scenes[0].id);
  const currentScene = scenes.find(scene => scene.id === currentSceneId) || scenes[0];
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 shadow-sm">
      <h2 className="text-xl font-bold text-purple-800 mb-6 title-underline">场景拍摄指南</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 左侧场景选择 */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-4">
            <h3 className="text-base font-medium text-purple-700 mb-3">选择场景</h3>
            <div className="space-y-2">
              {scenes.map(scene => (
                <button
                  key={scene.id}
                  className={`w-full flex items-center p-2.5 rounded-lg text-left transition-all ${
                    currentSceneId === scene.id 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'hover:bg-purple-50 text-gray-700'
                  }`}
                  onClick={() => setCurrentSceneId(scene.id)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    currentSceneId === scene.id ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {scene.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{scene.name}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{scene.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* 右侧场景详情 */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden">
            {/* 场景图片和标题 */}
            <div className="relative h-64 bg-gradient-to-r from-purple-900 to-indigo-900">
              <Image
                src={currentScene.imageSrc}
                alt={currentScene.name}
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4">
                    {currentScene.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{currentScene.name}</h2>
                    <p className="text-sm text-white/80">{currentScene.description}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 场景内容 */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {/* 拍摄技巧 */}
                  <div>
                    <h3 className="text-base font-semibold text-purple-800 mb-3">拍摄技巧</h3>
                    <div className="space-y-3">
                      {currentScene.tips.map((tip, index) => (
                        <div key={index} className="flex bg-purple-50 p-3 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center mr-3 flex-shrink-0">
                            {tip.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-purple-800">{tip.title}</h4>
                            <p className="text-sm text-purple-700/80 mt-0.5">{tip.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 拍摄时间 */}
                  <h3 className="text-base font-semibold text-purple-800 mt-6 mb-3">拍摄时间</h3>
                  <p className="text-sm text-gray-600">{currentScene.bestTimeToShoot}</p>
                </div>
                
                <div>
                  {/* 推荐设置 */}
                  <div>
                    <h3 className="text-base font-semibold text-purple-800 mb-3">推荐设置</h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-sm text-purple-700 font-medium">光圈</p>
                          <p className="text-sm">{currentScene.recommendedSettings.aperture}</p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-700 font-medium">快门速度</p>
                          <p className="text-sm">{currentScene.recommendedSettings.shutterSpeed}</p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-700 font-medium">ISO</p>
                          <p className="text-sm">{currentScene.recommendedSettings.iso}</p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-700 font-medium">焦距</p>
                          <p className="text-sm">{currentScene.recommendedSettings.focalLength}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-purple-700 font-medium">白平衡</p>
                          <p className="text-sm">{currentScene.recommendedSettings.whiteBalance}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              
              {/* 常见挑战与解决方案 */}
              <div className="mt-6">
                <h3 className="text-base font-semibold text-purple-800 mb-3">常见挑战与解决方案</h3>
                <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
                  {currentScene.challengesAndSolutions.map((item, index) => (
                    <div 
                      key={index} 
                      className={`p-4 flex items-start ${index !== 0 ? 'border-t border-purple-100' : ''}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{item.challenge}</h4>
                        <p className="text-sm text-gray-600">{item.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 