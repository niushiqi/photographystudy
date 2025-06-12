import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DepthOfFieldPhysicsProps {
  initialSettings?: {
    focalLength: number;
    aperture: string;
    focusDistance: number;
    sensorFormat: string;
  };
  show3DView?: boolean;
  showCalculations?: boolean;
  bokehSimulation?: boolean;
}

// 相机传感器尺寸数据
const sensorSizes = {
  'full-frame': { width: 36, height: 24, cropFactor: 1 },
  'aps-c': { width: 23.6, height: 15.7, cropFactor: 1.5 },
  'micro-four-thirds': { width: 17.3, height: 13, cropFactor: 2 },
  '1-inch': { width: 13.2, height: 8.8, cropFactor: 2.7 }
};

// 光圈值到f数的映射
const apertureValues = [
  'f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 
  'f/8', 'f/11', 'f/16', 'f/22'
];

// 将光圈字符串转换为数值
const getApertureNumber = (apertureStr: string): number => {
  return parseFloat(apertureStr.replace('f/', ''));
};

const DepthOfFieldPhysics: React.FC<DepthOfFieldPhysicsProps> = ({
  initialSettings = {
    focalLength: 50,
    aperture: 'f/2.8',
    focusDistance: 3,
    sensorFormat: 'full-frame'
  },
  show3DView = true,
  showCalculations = true,
  bokehSimulation = true
}) => {
  // 状态
  const [focalLength, setFocalLength] = useState(initialSettings.focalLength);
  const [aperture, setAperture] = useState(initialSettings.aperture);
  const [focusDistance, setFocusDistance] = useState(initialSettings.focusDistance);
  const [sensorFormat, setSensorFormat] = useState(initialSettings.sensorFormat);
  const [dofResults, setDofResults] = useState({
    nearFocusPoint: 0,
    farFocusPoint: 0,
    totalDepthOfField: 0,
    hyperfocalDistance: 0,
    circleOfConfusion: 0
  });
  
  // 计算景深
  useEffect(() => {
    // 获取传感器信息
    const sensor = sensorSizes[sensorFormat as keyof typeof sensorSizes];
    // 圆形弥散度 (简化计算，实际会更复杂)
    const circleOfConfusion = sensor.width / 1500; // 简化计算
    
    // 获取光圈数值
    const fNumber = getApertureNumber(aperture);
    
    // 计算超焦距
    const hyperfocalDistance = Math.pow(focalLength, 2) / (fNumber * circleOfConfusion) / 1000 + focalLength / 1000;
    
    // 计算近焦点
    const nearFocusPoint = (focusDistance * (hyperfocalDistance - focalLength / 1000)) / 
                           (hyperfocalDistance + focusDistance - 2 * (focalLength / 1000));
    
    // 计算远焦点
    let farFocusPoint = (focusDistance * (hyperfocalDistance - focalLength / 1000)) / 
                        (hyperfocalDistance - focusDistance);
    
    // 如果超过超焦距，远焦点为无穷大
    if (focusDistance >= hyperfocalDistance) {
      farFocusPoint = Infinity;
    }
    
    // 计算总景深
    const totalDepthOfField = farFocusPoint === Infinity ? 
                               Infinity : 
                               farFocusPoint - nearFocusPoint;
    
    setDofResults({
      nearFocusPoint: Math.max(0, nearFocusPoint),
      farFocusPoint,
      totalDepthOfField,
      hyperfocalDistance,
      circleOfConfusion
    });
  }, [focalLength, aperture, focusDistance, sensorFormat]);

  // 渲染散焦模拟
  const renderBokehSimulation = () => {
    // 获取光圈数值
    const fNumber = getApertureNumber(aperture);
    
    // 散景圆大小与光圈成反比
    const bokehSize = 80 / fNumber;
    
    return (
      <div className="mt-6 bg-black rounded-lg overflow-hidden aspect-video relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex space-x-8">
            {[0.6, 1, 1.5].map((distance, i) => {
              // 计算相对于焦距的散焦程度
              const focusRatio = Math.abs(distance - 1);
              const blurAmount = focusRatio * bokehSize;
              
              return (
                <div key={i} className="relative">
                  <div 
                    className="w-8 h-8 rounded-full bg-yellow-500"
                    style={{
                      filter: `blur(${blurAmount}px)`,
                      opacity: 1 - focusRatio * 0.5
                    }}
                  />
                  <div className="mt-2 text-center text-xs text-white">
                    {distance === 1 ? '对焦点' : `${distance < 1 ? '前' : '后'}景深`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="absolute bottom-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          {aperture} | {focalLength}mm
        </div>
      </div>
    );
  };

  // 渲染3D景深可视化
  const render3DView = () => {
    // 场景可视范围（米）
    const sceneRange = 10;
    
    // 将景深结果映射到可视范围内
    const focusPoint = (focusDistance / sceneRange) * 100;
    const nearPoint = Math.min(100, Math.max(0, (dofResults.nearFocusPoint / sceneRange) * 100));
    const farPoint = Math.min(100, Math.max(0, (
      dofResults.farFocusPoint === Infinity ? 100 : (dofResults.farFocusPoint / sceneRange) * 100
    )));
    
    return (
      <div className="mt-6 bg-gradient-to-r from-purple-900/5 to-purple-500/10 rounded-lg p-4 border border-purple-200/20">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">焦平面可视化</h3>
        
        <div className="relative h-16 mb-8">
          {/* 相机位置 */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20">
            <div className="w-6 h-10 bg-gray-800 dark:bg-gray-700 rounded-sm"></div>
            <div className="w-3 h-2 bg-gray-700 dark:bg-gray-600 absolute -right-3 top-1/2 transform -translate-y-1/2"></div>
          </div>
          
          {/* 场景主轴 */}
          <div className="absolute left-8 right-4 top-1/2 h-0.5 bg-gray-300 dark:bg-gray-600 transform -translate-y-1/2">
            {/* 距离标记 */}
            {[0, 25, 50, 75, 100].map(pos => (
              <div key={pos} className="absolute h-2 w-0.5 bg-gray-400 dark:bg-gray-500" style={{ left: `${pos}%`, top: '-4px' }}>
                <div className="absolute top-3 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">
                  {(pos / 100 * sceneRange).toFixed(1)}m
                </div>
              </div>
            ))}
          </div>
          
          {/* 对焦平面 */}
          <motion.div 
            className="absolute w-0.5 h-12 bg-red-500 z-10"
            style={{ left: `calc(8% + ${focusPoint}%)` }}
            initial={{ height: 0 }}
            animate={{ height: '3rem' }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-full mt-1 transform -translate-x-1/2 text-xs font-medium text-red-500">
              对焦点 ({focusDistance.toFixed(1)}m)
            </div>
          </motion.div>
          
          {/* 景深范围 */}
          <motion.div 
            className="absolute h-8 bg-purple-400 dark:bg-purple-600 bg-opacity-30 dark:bg-opacity-30 rounded-sm"
            style={{ 
              left: `calc(8% + ${nearPoint}%)`,
              width: `${farPoint - nearPoint}%`
            }}
            initial={{ width: 0 }}
            animate={{ width: `${farPoint - nearPoint}%` }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -left-1 h-full w-0.5 bg-purple-500"></div>
            <div className="absolute -right-1 h-full w-0.5 bg-purple-500"></div>
            
            <div className="absolute bottom-full left-0 mb-1 transform -translate-x-1/2 text-xs font-medium text-purple-500">
              {dofResults.nearFocusPoint.toFixed(2)}m
            </div>
            <div className="absolute bottom-full right-0 mb-1 transform translate-x-1/2 text-xs font-medium text-purple-500">
              {dofResults.farFocusPoint === Infinity ? '∞' : dofResults.farFocusPoint.toFixed(2) + 'm'}
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-2 text-xs text-center">
          <div>
            <div className="font-medium text-gray-700 dark:text-gray-300">前景深</div>
            <div className="text-sm text-purple-600 dark:text-purple-400">
              {(focusDistance - dofResults.nearFocusPoint).toFixed(2)}m
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-700 dark:text-gray-300">总景深</div>
            <div className="text-sm text-purple-600 dark:text-purple-400">
              {dofResults.totalDepthOfField === Infinity ? '∞' : dofResults.totalDepthOfField.toFixed(2) + 'm'}
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-700 dark:text-gray-300">后景深</div>
            <div className="text-sm text-purple-600 dark:text-purple-400">
              {dofResults.farFocusPoint === Infinity ? 
                '∞' : (dofResults.farFocusPoint - focusDistance).toFixed(2) + 'm'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-purple-100 dark:border-purple-900/20">
      <div className="p-4 border-b border-purple-100 dark:border-purple-900/20">
        <h3 className="font-medium text-lg text-purple-900 dark:text-purple-100">景深物理模型</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">探索镜头参数如何影响景深范围</p>
      </div>
      
      <div className="p-4">
        {/* 参数控制面板 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">焦距</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min={10}
                  max={200}
                  value={focalLength}
                  onChange={e => setFocalLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">
                  {focalLength}mm
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">光圈值</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {apertureValues.map(value => (
                  <button
                    key={value}
                    className={`text-xs py-1 rounded-md transition-colors ${
                      aperture === value
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100'
                    }`}
                    onClick={() => setAperture(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">对焦距离</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min={0.5}
                  max={10}
                  step={0.1}
                  value={focusDistance}
                  onChange={e => setFocusDistance(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">
                  {focusDistance.toFixed(1)}m
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">传感器格式</label>
              <select
                value={sensorFormat}
                onChange={e => setSensorFormat(e.target.value)}
                className="w-full py-1.5 px-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="full-frame">全画幅 (36×24mm)</option>
                <option value="aps-c">APS-C (23.6×15.7mm)</option>
                <option value="micro-four-thirds">M4/3 (17.3×13mm)</option>
                <option value="1-inch">1英寸 (13.2×8.8mm)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* 3D景深可视化 */}
        {show3DView && render3DView()}
        
        {/* 散焦模拟 */}
        {bokehSimulation && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">散焦模拟</h3>
            {renderBokehSimulation()}
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              光圈越大（F值越小），散焦效果越明显。当前设置: {aperture}
            </p>
          </div>
        )}
        
        {/* 景深计算公式和技术说明 */}
        {showCalculations && (
          <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">景深公式</h3>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
              <p><span className="font-medium">超焦距 (H):</span> H = (f² ÷ (N × c)) + f</p>
              <p><span className="font-medium">近焦点 (Dn):</span> Dn = (s × (H - f)) ÷ (H + s - 2f)</p>
              <p><span className="font-medium">远焦点 (Df):</span> Df = (s × (H - f)) ÷ (H - s)</p>
              <p className="text-xs italic">其中 f=焦距, N=光圈值, c=弥散圆, s=对焦距离</p>
              
              <p className="mt-3 text-purple-700 dark:text-purple-300">
                <span className="font-medium">技术提示:</span> 对于{focalLength}mm镜头，超焦距约为{dofResults.hyperfocalDistance.toFixed(2)}m。若对焦在此距离，则从{(dofResults.hyperfocalDistance/2).toFixed(2)}m处至无穷远都在景深范围内。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepthOfFieldPhysics; 