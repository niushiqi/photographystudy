import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Slider } from '../../ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Info, RefreshCcw, Camera, Lightbulb, Aperture } from 'lucide-react';

interface SceneSimulatorProps {
  defaultScene?: string;
}

const scenes = [
  {
    id: 'city-sunset',
    name: '城市日落',
    icon: '🏙️',
    imageSrc: '/images/techniques/simulator/city-sunset.jpg',
    description: '高楼林立间的金色余晖',
    defaultParams: { 
      aperture: 8, 
      shutterSpeed: 1/60, 
      iso: 200, 
      focalLength: 35, 
      contrast: 1.2, 
      saturation: 1.4, 
      blur: 0 
    }
  },
  {
    id: 'portrait',
    name: '人像逆光',
    icon: '👤',
    imageSrc: '/images/techniques/simulator/portrait.jpg',
    description: '人物剪影与柔和背景光',
    defaultParams: { 
      aperture: 2.8, 
      shutterSpeed: 1/125, 
      iso: 100, 
      focalLength: 85, 
      contrast: 1.1, 
      saturation: 1.0, 
      blur: 30 
    }
  },
  {
    id: 'mountain',
    name: '山景日出',
    icon: '🏔️',
    imageSrc: '/images/techniques/simulator/mountain.jpg',
    description: '清晨山脉间的自然光线',
    defaultParams: { 
      aperture: 11, 
      shutterSpeed: 1/30, 
      iso: 100, 
      focalLength: 24, 
      contrast: 1.3, 
      saturation: 1.2, 
      blur: 0 
    }
  }
];

const photoSettings = [
  { id: 'aperture', name: '光圈值', min: 1.4, max: 22, step: 0.1, unit: 'f/', icon: <Aperture className="h-4 w-4 text-purple-500" /> },
  { id: 'shutterSpeed', name: '快门速度', min: 0.002, max: 1, step: 0.001, unit: 's', format: (v: number) => `1/${Math.round(1/v)}`, icon: <Camera className="h-4 w-4 text-purple-500" /> },
  { id: 'iso', name: 'ISO感光度', min: 100, max: 6400, step: 100, unit: '', icon: <Lightbulb className="h-4 w-4 text-purple-500" /> },
  { id: 'contrast', name: '对比度', min: 0.5, max: 2, step: 0.1, unit: '', icon: <span className="text-purple-500 font-bold">±</span> },
  { id: 'saturation', name: '饱和度', min: 0.5, max: 2, step: 0.1, unit: '', icon: <span className="text-purple-500 font-bold">S</span> },
  { id: 'blur', name: '背景模糊', min: 0, max: 50, step: 1, unit: 'px', icon: <span className="text-purple-500 font-bold">∞</span> },
];

export const SceneSimulator: React.FC<SceneSimulatorProps> = ({ defaultScene = 'city-sunset' }) => {
  const [activeScene, setActiveScene] = useState(defaultScene);
  const [params, setParams] = useState<Record<string, number>>({});
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [previewEffect, setPreviewEffect] = useState<string | null>(null);
  
  // 初始化参数
  useEffect(() => {
    const scene = scenes.find(s => s.id === activeScene);
    if (scene) {
      setParams(scene.defaultParams);
    }
  }, [activeScene]);
  
  const handleParamChange = (param: string, value: number) => {
    setParams(prev => ({ ...prev, [param]: value }));
  };

  const resetToDefault = () => {
    const scene = scenes.find(s => s.id === activeScene);
    if (scene) {
      setParams(scene.defaultParams);
    }
  };
  
  const currentScene = scenes.find(s => s.id === activeScene) || scenes[0];
  
  // 根据参数生成图片样式
  const imageStyle = {
    filter: `
      contrast(${params.contrast || 1})
      saturate(${params.saturation || 1})
      blur(${params.blur || 0}px)
      brightness(${getExposureValue()})
    `,
    transform: `scale(${params.blur ? 1.1 : 1})` // 放大以防止模糊边缘
  };
  
  // 计算曝光值
  function getExposureValue() {
    const aperture = params.aperture || 8;
    const shutterSpeed = params.shutterSpeed || 1/60;
    const iso = params.iso || 200;
    
    // 简化的曝光计算公式 (越大越亮)
    const ev = (iso / 100) * shutterSpeed * (1 / (aperture * aperture));
    
    // 归一化到合理的亮度范围 (0.7-1.3)
    return Math.max(0.7, Math.min(1.3, 1 + (ev - 0.01) * 5));
  }
  
  const getApertureEffect = () => {
    const aperture = params.aperture || 8;
    if (aperture <= 2.8) return '浅景深，主体清晰、背景模糊';
    if (aperture <= 8) return '中等景深，较好平衡主体与背景';
    return '深景深，成像范围更大，更多元素清晰';
  };

  const getShutterSpeedEffect = () => {
    const speed = params.shutterSpeed || 1/60;
    if (speed >= 1/30) return '较慢快门，可能需要三脚架防抖';
    if (speed >= 1/125) return '适中快门，手持拍摄稳定性良好';
    return '高速快门，可冻结快速运动';
  };

  const getIsoEffect = () => {
    const iso = params.iso || 200;
    if (iso <= 200) return '低ISO，画质清晰，噪点极少';
    if (iso <= 1600) return '中等ISO，画质与感光度的平衡';
    return '高ISO，提高感光度但可能出现噪点';
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-purple-100">
      <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-2 text-xl">📷</span>
          <h2 className="text-xl font-bold">场景模拟器</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-purple-500"
            onClick={() => setShowInfoCard(!showInfoCard)}
          >
            <Info className="h-4 w-4 mr-1" /> 使用说明
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-white text-purple-600 hover:bg-purple-50"
            onClick={resetToDefault}
          >
            <RefreshCcw className="h-3 w-3 mr-1" />
            重置设置
          </Button>
        </div>
      </div>

      {showInfoCard && (
        <div className="bg-purple-50 p-3 text-sm border-b border-purple-100">
          <p>调整参数，实时预览不同相机设置下的效果。光圈会影响景深，快门速度控制运动模糊，ISO影响亮度和噪点。调整这些参数可以体验它们对照片效果的影响。</p>
        </div>
      )}
      
      <Tabs defaultValue={activeScene} onValueChange={setActiveScene} className="w-full">
        <div className="p-2 bg-gray-50 border-b">
          <TabsList className="grid grid-cols-3 w-full">
            {scenes.map(scene => (
              <TabsTrigger 
                key={scene.id}
                value={scene.id}
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
              >
                <span className="mr-2">{scene.icon}</span>
                {scene.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <div className="grid md:grid-cols-5 gap-4">
          <div className="md:col-span-3 relative">
            {scenes.map(scene => (
              <TabsContent key={scene.id} value={scene.id} className="mt-0">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={scene.imageSrc}
                    alt={scene.name}
                    fill
                    style={imageStyle}
                    className="object-cover transition-all duration-300"
                  />
                  <div className="absolute bottom-4 right-4 left-4 flex justify-between">
                    <Badge className="bg-purple-600 text-white">
                      {scene.name}
                    </Badge>
                    <Badge className="bg-black/70 text-white">
                      f/{params.aperture?.toFixed(1)} | 
                      1/{params.shutterSpeed ? Math.round(1/params.shutterSpeed) : 60}s | 
                      ISO {params.iso || 200}
                    </Badge>
                  </div>
                </div>
                <div className="p-3 mt-2 bg-purple-50 rounded-md mx-2">
                  <p className="text-sm text-gray-700">{scene.description}</p>
                  <div className="mt-2 text-sm text-purple-700 font-medium">
                    {previewEffect === 'aperture' && getApertureEffect()}
                    {previewEffect === 'shutterSpeed' && getShutterSpeedEffect()}
                    {previewEffect === 'iso' && getIsoEffect()}
                    {!previewEffect && getApertureEffect()}
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
          
          <div className="md:col-span-2 p-3 bg-gray-50 border-t md:border-t-0 md:border-l border-purple-100">
            <h3 className="font-medium mb-3 text-purple-700">调整相机参数</h3>
            <div className="space-y-6">
              {photoSettings.map(setting => (
                <div 
                  key={setting.id} 
                  className="space-y-1 hover:bg-purple-50 p-2 rounded-md transition-colors"
                  onMouseEnter={() => setPreviewEffect(setting.id)}
                  onMouseLeave={() => setPreviewEffect(null)}
                >
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium flex items-center">
                      {setting.icon && <span className="mr-2">{setting.icon}</span>}
                      {setting.name}
                    </label>
                    <span className="text-sm text-purple-600 font-medium">
                      {setting.format 
                        ? setting.format(params[setting.id] || 0) 
                        : (setting.unit + (params[setting.id]?.toFixed(1) || '0'))}
                    </span>
                  </div>
                  <Slider
                    value={[params[setting.id] || 0]}
                    min={setting.min}
                    max={setting.max}
                    step={setting.step}
                    onValueChange={([value]) => handleParamChange(setting.id, value)}
                    className="py-2"
                  />
                  {setting.id === 'aperture' && (
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>浅景深 (f/2.8)</span>
                      <span>深景深 (f/16)</span>
                    </div>
                  )}
                  {setting.id === 'shutterSpeed' && (
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>冻结动作 (1/500s)</span>
                      <span>模糊动作 (1/15s)</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-purple-100">
              <h4 className="text-sm font-medium text-purple-700 mb-2">效果预览</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-purple-50">景深: {params.aperture <= 4 ? '浅' : params.aperture >= 11 ? '深' : '中等'}</Badge>
                <Badge variant="outline" className="bg-purple-50">曝光: {getExposureValue() < 0.9 ? '暗' : getExposureValue() > 1.1 ? '亮' : '适中'}</Badge>
                <Badge variant="outline" className="bg-purple-50">色彩: {params.saturation >= 1.3 ? '鲜艳' : params.saturation <= 0.7 ? '淡雅' : '自然'}</Badge>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SceneSimulator; 