import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type ExposureSettings = {
  aperture: number;
  shutterSpeed: number;
  iso: number;
};

type ExposureTriangleSimulatorProps = {
  baseImage: string;
  initialSettings?: ExposureSettings;
  showEffectsSeparately?: boolean;
  onComplete?: () => void;
};

// 快门速度选项（秒）
const SHUTTER_SPEEDS = [
  '1/4000', '1/2000', '1/1000', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15', '1/8', '1/4', '1/2', '1', '2', '4'
];

// 光圈选项（f值）
const APERTURES = [
  'f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16', 'f/22'
];

// ISO选项
const ISOS = [
  100, 200, 400, 800, 1600, 3200, 6400
];

// 将光圈f值转换为数值
const apertureToNumber = (aperture: string): number => {
  return parseFloat(aperture.replace('f/', ''));
};

// 将快门速度字符串转换为秒
const shutterSpeedToSeconds = (speed: string): number => {
  if (speed.includes('/')) {
    const [numerator, denominator] = speed.split('/').map(Number);
    return numerator / denominator;
  }
  return Number(speed);
};

export default function ExposureTriangleSimulator({
  baseImage = '/images/basics/exposure-sample.jpg',
  initialSettings = { aperture: 4, shutterSpeed: 1/125, iso: 400 },
  showEffectsSeparately = true,
  onComplete
}: ExposureTriangleSimulatorProps) {
  const [settings, setSettings] = useState<ExposureSettings>(initialSettings);
  const [exposureValue, setExposureValue] = useState<number>(0);

  // 计算曝光值
  useEffect(() => {
    // 曝光值(EV) = log2(光圈^2 / 快门速度) - log2(ISO/100)
    const ev = Math.log2((settings.aperture * settings.aperture) / settings.shutterSpeed) - Math.log2(settings.iso / 100);
    setExposureValue(parseFloat(ev.toFixed(1)));
  }, [settings]);

  // 处理光圈变化
  const handleApertureChange = (aperture: string) => {
    const apertureValue = apertureToNumber(aperture);
    setSettings((prev) => ({ ...prev, aperture: apertureValue }));
  };

  // 处理快门速度变化
  const handleShutterSpeedChange = (speed: string) => {
    const speedValue = shutterSpeedToSeconds(speed);
    setSettings((prev) => ({ ...prev, shutterSpeed: speedValue }));
  };

  // 处理ISO变化
  const handleIsoChange = (iso: number) => {
    setSettings((prev) => ({ ...prev, iso }));
  };

  // 根据当前设置计算亮度调整值（简化模拟）
  const getBrightnessAdjustment = (): number => {
    // 基准曝光值（在标准光圈f/8，快门1/125，ISO 100下）
    const baseEV = Math.log2((8 * 8) / (1/125)) - Math.log2(100 / 100);
    
    // 当前曝光值与基准曝光值的差异
    const evDiff = exposureValue - baseEV;
    
    // 将曝光差异转换为亮度调整值
    // 值越大，图像越暗（曝光不足）；值越小，图像越亮（曝光过度）
    return -evDiff * 10; // 乘以10是为了夸大效果，便于视觉观察
  };

  // 获取景深效果的模糊程度（简化模拟）
  const getDepthOfFieldBlur = (): number => {
    // 光圈越大（f值越小），景深越浅，背景越模糊
    return 10 / settings.aperture; 
  };

  // 获取由快门速度导致的动态模糊程度（简化模拟）
  const getMotionBlur = (): number => {
    // 快门速度越慢，动态模糊越明显
    return Math.min(settings.shutterSpeed * 50, 10);
  };

  // 获取ISO导致的噪点程度（简化模拟）
  const getNoise = (): number => {
    // ISO越高，噪点越多
    return settings.iso / 800;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">曝光三角互动实验室</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          调整光圈、快门速度和ISO，观察它们如何影响照片的曝光和视觉效果。
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* 预览区域 */}
        <div className="space-y-6">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                filter: `brightness(${100 + getBrightnessAdjustment()}%) blur(${getMotionBlur()}px)`
              }}
            >
              <Image
                src={baseImage}
                alt="曝光示例图"
                fill
                style={{ 
                  objectFit: 'cover',
                  filter: `blur(${getDepthOfFieldBlur()}px) contrast(${1 + getNoise() * 0.2})`
                }}
              />
            </div>
            <div className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
              EV: {exposureValue}
            </div>
          </div>
          
          {/* 单独效果展示 */}
          {showEffectsSeparately && (
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">景深效果</h4>
                <div className="relative h-20 bg-black rounded overflow-hidden">
                  <Image
                    src={baseImage}
                    alt="景深效果"
                    fill
                    style={{ 
                      objectFit: 'cover',
                      filter: `blur(${getDepthOfFieldBlur()}px)`
                    }}
                  />
                </div>
                <p className="text-xs mt-2 text-center text-gray-600 dark:text-gray-400">
                  光圈: f/{settings.aperture}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">动态模糊</h4>
                <div className="relative h-20 bg-black rounded overflow-hidden">
                  <Image
                    src={baseImage}
                    alt="动态模糊"
                    fill
                    style={{ 
                      objectFit: 'cover',
                      filter: `blur(${getMotionBlur()}px)`
                    }}
                  />
                </div>
                <p className="text-xs mt-2 text-center text-gray-600 dark:text-gray-400">
                  快门: {settings.shutterSpeed < 1 ? `1/${Math.round(1/settings.shutterSpeed)}` : `${settings.shutterSpeed}`}秒
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">噪点效果</h4>
                <div className="relative h-20 bg-black rounded overflow-hidden">
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url('${baseImage}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: `contrast(${1 + getNoise() * 0.3})`
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backdropFilter: 'grayscale(0.5)',
                      background: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><filter id="noisy"><feTurbulence type="fractalNoise" baseFrequency="${getNoise() * 0.7}" numOctaves="3" stitchTiles="stitch"/><feComposite operator="in" in2="SourceGraphic"/></filter><rect width="100%" height="100%" filter="url(%23noisy)"/></svg>')`,
                      opacity: getNoise() * 0.3,
                      mixBlendMode: 'overlay'
                    }}
                  />
                </div>
                <p className="text-xs mt-2 text-center text-gray-600 dark:text-gray-400">
                  ISO: {settings.iso}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* 控制面板 */}
        <div className="space-y-8">
          {/* 光圈控制 */}
          <div>
            <div className="flex justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">光圈</h4>
              <span className="text-sm text-blue-600 dark:text-blue-400">f/{settings.aperture}</span>
            </div>
            <div className="grid grid-cols-9 gap-1">
              {APERTURES.map(aperture => (
                <button
                  key={aperture}
                  className={`py-1 px-2 text-xs rounded ${
                    apertureToNumber(aperture) === settings.aperture
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handleApertureChange(aperture)}
                >
                  {aperture}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              光圈控制进入镜头的光量和景深。较大的光圈（小f值）产生较浅的景深。
            </p>
          </div>
          
          {/* 快门速度控制 */}
          <div>
            <div className="flex justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">快门速度</h4>
              <span className="text-sm text-blue-600 dark:text-blue-400">
                {settings.shutterSpeed < 1 ? `1/${Math.round(1/settings.shutterSpeed)}` : settings.shutterSpeed}秒
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {SHUTTER_SPEEDS.map(speed => (
                <button
                  key={speed}
                  className={`py-1 px-2 text-xs rounded ${
                    shutterSpeedToSeconds(speed) === settings.shutterSpeed
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handleShutterSpeedChange(speed)}
                >
                  {speed}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              快门速度控制感光器接收光线的时间。较慢的快门速度可以捕捉移动物体的模糊效果。
            </p>
          </div>
          
          {/* ISO控制 */}
          <div>
            <div className="flex justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">ISO感光度</h4>
              <span className="text-sm text-blue-600 dark:text-blue-400">ISO {settings.iso}</span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {ISOS.map(iso => (
                <button
                  key={iso}
                  className={`py-1 px-2 text-xs rounded ${
                    iso === settings.iso
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handleIsoChange(iso)}
                >
                  {iso}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              ISO控制感光器的灵敏度。较高的ISO在弱光条件下很有用，但会增加图像噪点。
            </p>
          </div>

          {/* 曝光表 */}
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">曝光表</h4>
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  exposureValue > 0 
                    ? 'bg-yellow-500' 
                    : exposureValue < -2 
                    ? 'bg-blue-600' 
                    : 'bg-green-500'
                }`}
                style={{
                  width: `${Math.min(100, Math.max(0, 50 + exposureValue * 10))}%`
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>曝光不足</span>
              <span>正常</span>
              <span>过度曝光</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">曝光三角关系</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          光圈、快门速度和ISO共同决定照片的曝光。调整任何一个参数都会影响最终影像。
          增加一档光圈（如从f/4到f/2.8）、减慢一档快门速度（如从1/125到1/60）或增加一档ISO（如从400到800）都会使照片亮度增加1档。
        </p>
      </div>
    </div>
  );
} 