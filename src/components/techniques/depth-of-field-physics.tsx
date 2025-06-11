"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface DepthOfFieldSettings {
  focalLength: number;   // 焦距，单位mm
  aperture: number;      // 光圈值，如2.8
  focusDistance: number; // 对焦距离，单位m
  sensorSize: number;    // 传感器尺寸，如36（全幅）
}

export default function DepthOfFieldPhysics() {
  // 初始设置
  const [settings, setSettings] = useState<DepthOfFieldSettings>({
    focalLength: 50,
    aperture: 2.8,
    focusDistance: 3,
    sensorSize: 36
  });

  // 计算景深前后边界
  const calculateDepthOfField = (settings: DepthOfFieldSettings) => {
    const { focalLength, aperture, focusDistance, sensorSize } = settings;
    
    // 焦平面距离(mm)
    const focusDistanceInMM = focusDistance * 1000;
    
    // 适用于全画幅相机的景深计算，采用薄透镜近似
    // 弥散圈设定为0.03mm(标准值)
    const circleOfConfusion = 0.03;
    
    // 远景深边界(mm)
    const farLimit = (focusDistanceInMM * focalLength * focalLength) / 
                    (focalLength * focalLength - aperture * circleOfConfusion * (focusDistanceInMM - focalLength));
    
    // 近景深边界(mm)
    const nearLimit = (focusDistanceInMM * focalLength * focalLength) / 
                     (focalLength * focalLength + aperture * circleOfConfusion * (focusDistanceInMM - focalLength));
    
    // 景深总量(m)
    const totalDepth = (farLimit - nearLimit) / 1000;
    
    // 处理异常值
    const farLimitInM = isFinite(farLimit) ? farLimit / 1000 : Infinity;
    const nearLimitInM = isFinite(nearLimit) && nearLimit > 0 ? nearLimit / 1000 : 0;
    
    return {
      near: Math.max(nearLimitInM, 0).toFixed(2),
      far: farLimitInM === Infinity ? "∞" : farLimitInM.toFixed(2),
      total: isFinite(totalDepth) ? totalDepth.toFixed(2) : "∞"
    };
  };

  const depthRange = calculateDepthOfField(settings);

  // 光圈选项
  const apertureOptions = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
  
  // 焦距选项
  const focalLengthOptions = [24, 35, 50, 85, 135, 200];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 参数控制面板 */}
        <div className="lg:col-span-1 space-y-6 bg-secondary/50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">景深参数控制</h3>
          
          {/* 光圈选择 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              光圈值: f/{settings.aperture}
            </label>
            <div className="flex flex-wrap gap-2">
              {apertureOptions.map(value => (
                <button
                  key={value}
                  className={`px-3 py-1 rounded-full text-xs 
                    ${settings.aperture === value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary hover:bg-secondary/80'}`}
                  onClick={() => setSettings({...settings, aperture: value})}
                >
                  f/{value}
                </button>
              ))}
            </div>
          </div>
          
          {/* 焦距选择 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              焦距: {settings.focalLength}mm
            </label>
            <div className="flex flex-wrap gap-2">
              {focalLengthOptions.map(value => (
                <button
                  key={value}
                  className={`px-3 py-1 rounded-full text-xs 
                    ${settings.focalLength === value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary hover:bg-secondary/80'}`}
                  onClick={() => setSettings({...settings, focalLength: value})}
                >
                  {value}mm
                </button>
              ))}
            </div>
          </div>
          
          {/* 对焦距离滑块 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              对焦距离: {settings.focusDistance}m
            </label>
            <input
              type="range"
              min="0.5"
              max="15"
              step="0.5"
              value={settings.focusDistance}
              onChange={(e) => setSettings({
                ...settings, 
                focusDistance: parseFloat(e.target.value)
              })}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.5m (近)</span>
              <span>15m (远)</span>
            </div>
          </div>
          
          {/* 计算结果显示 */}
          <div className="mt-8 p-4 bg-secondary rounded-lg">
            <h4 className="font-medium mb-2">景深计算结果</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-muted-foreground">近景深限</div>
                <div className="font-medium">{depthRange.near}m</div>
              </div>
              <div>
                <div className="text-muted-foreground">远景深限</div>
                <div className="font-medium">{depthRange.far}m</div>
              </div>
              <div>
                <div className="text-muted-foreground">景深总量</div>
                <div className="font-medium">{depthRange.total}m</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 景深可视化 */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-4">景深可视化</h3>
          
          <div className="bg-secondary/30 rounded-lg overflow-hidden aspect-[16/9] relative">
            {/* 景深示意区域 */}
            <div className="absolute inset-0 flex items-center">
              {/* 景深示意图 - 使用相对位置表示景深范围 */}
              <div className="w-full h-2 relative mx-12">
                {/* 焦平面位置 */}
                <div className="absolute top-0 h-8 w-1 bg-primary -translate-y-1/2" 
                     style={{ left: `${Math.min((settings.focusDistance / 15) * 100, 100)}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs">
                    <span className="text-primary font-medium">焦平面</span>
                    <br/><span className="text-muted-foreground">{settings.focusDistance}m</span>
                  </div>
                </div>
                
                {/* 近景深限 */}
                <motion.div 
                  className="absolute top-0 h-6 w-1 bg-purple-400 -translate-y-1/2"
                  initial={{ left: `${(parseFloat(depthRange.near) / 15) * 100}%` }}
                  animate={{ left: `${(parseFloat(depthRange.near) / 15) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs">
                    <span className="text-purple-400">近景深限</span>
                    <br/><span className="text-muted-foreground">{depthRange.near}m</span>
                  </div>
                </motion.div>
                
                {/* 远景深限 */}
                <motion.div 
                  className="absolute top-0 h-6 w-1 bg-purple-400 -translate-y-1/2"
                  initial={{ left: depthRange.far === "∞" ? "100%" : `${(parseFloat(depthRange.far) / 15) * 100}%` }}
                  animate={{ left: depthRange.far === "∞" ? "100%" : `${(parseFloat(depthRange.far) / 15) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs">
                    <span className="text-purple-400">远景深限</span>
                    <br/><span className="text-muted-foreground">{depthRange.far}m</span>
                  </div>
                </motion.div>
                
                {/* 景深区域 */}
                <motion.div 
                  className="absolute top-0 h-2 bg-gradient-purple/30 rounded-full"
                  initial={{ 
                    left: `${(parseFloat(depthRange.near) / 15) * 100}%`,
                    width: depthRange.far === "∞" 
                      ? `${100 - (parseFloat(depthRange.near) / 15) * 100}%` 
                      : `${((parseFloat(depthRange.far) - parseFloat(depthRange.near)) / 15) * 100}%`
                  }}
                  animate={{ 
                    left: `${(parseFloat(depthRange.near) / 15) * 100}%`,
                    width: depthRange.far === "∞" 
                      ? `${100 - (parseFloat(depthRange.near) / 15) * 100}%` 
                      : `${((parseFloat(depthRange.far) - parseFloat(depthRange.near)) / 15) * 100}%`
                  }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
                
                {/* 距离刻度 */}
                <div className="absolute bottom-4 w-full flex justify-between text-xs text-muted-foreground">
                  {[0, 3, 6, 9, 12, 15].map(dist => (
                    <div key={dist} className="relative">
                      <div className="absolute left-0 bottom-2 h-1.5 w-0.5 bg-muted-foreground"/>
                      <div className="absolute -left-2">{dist}m</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 散焦模拟 */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-secondary/50 p-4">
              <h4 className="font-medium mb-2">散焦圈直径</h4>
              <p className="text-xs text-muted-foreground mb-4">
                散焦圈直径反映了不在焦平面上的点成像散焦程度。
                图像中的一个点，如果不在焦平面上，会形成一个小圆。
                光圈越小，散焦圈越小，成像越锐利；反之则越模糊柔和。
              </p>
              
              <div className="flex items-center justify-center gap-8">
                {/* 散焦圈大小演示 */}
                <div className="relative">
                  <div className="text-center mb-2 text-xs text-muted-foreground">光圈 f/{settings.aperture}</div>
                  <div className="relative">
                    <motion.div 
                      className="rounded-full bg-primary/80"
                      initial={{ width: 50 / settings.aperture, height: 50 / settings.aperture }}
                      animate={{ width: 50 / settings.aperture, height: 50 / settings.aperture }}
                      style={{ 
                        width: 50 / settings.aperture, 
                        height: 50 / settings.aperture 
                      }}
                    />
                  </div>
                </div>
                
                {/* 散焦效果说明 */}
                <div className="text-sm">
                  <div className="mb-1">
                    <span className="text-purple-400 font-medium">小光圈 (f/16-f/22):</span>
                    <span className="text-muted-foreground ml-2">景深更大，图像更锐利</span>
                  </div>
                  <div className="mb-1">
                    <span className="text-purple-400 font-medium">中光圈 (f/5.6-f/11):</span>
                    <span className="text-muted-foreground ml-2">平衡景深与锐度</span>
                  </div>
                  <div className="mb-1">
                    <span className="text-purple-400 font-medium">大光圈 (f/1.4-f/4):</span>
                    <span className="text-muted-foreground ml-2">景深较浅，背景柔化明显</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-secondary/30 p-6 rounded-lg">
        <div>
          <h3 className="text-xl font-bold mb-4">景深与焦距关系</h3>
          <p className="text-sm text-muted-foreground mb-4">
            在相同的光圈值和对焦距离下，不同焦距镜头产生不同的景深效果。
            长焦镜头（如85mm以上）会产生较浅的景深，适合人像拍摄，突出主体；
            而广角镜头（如35mm以下）则景深较大，适合风景和建筑拍摄。
          </p>
          
          <div className="flex flex-wrap justify-between gap-2 mt-4">
            {focalLengthOptions.map(focal => (
              <div key={focal} className="text-center">
                <div 
                  className={`inline-block w-16 h-16 rounded-full border-2 flex items-center justify-center 
                    ${settings.focalLength === focal
                    ? "border-primary text-primary"
                    : "border-muted-foreground/30 text-muted-foreground"}
                  `}
                  onClick={() => setSettings({...settings, focalLength: focal})}
                >
                  {focal}mm
                </div>
                <div className="text-xs mt-1 text-muted-foreground">
                  {focal <= 35 ? "广角" : focal <= 70 ? "标准" : focal <= 135 ? "中长焦" : "长焦"}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">景深与光圈关系</h3>
          <p className="text-sm text-muted-foreground mb-4">
            光圈值是影响景深的关键因素。较小的光圈值（如f/1.4、f/2.8）会产生浅景深，
            使主体清晰而背景模糊；较大的光圈值（如f/11、f/16）则提供更大的景深，
            使前景到背景更多元素保持清晰。
          </p>
          
          <div className="flex flex-wrap gap-1 mt-4">
            {apertureOptions.map(ap => {
              // 通过计算当前光圈下的景深值
              const tempDepth = calculateDepthOfField({...settings, aperture: ap});
              const depthValue = tempDepth.far === "∞" 
                ? 15 - parseFloat(tempDepth.near)
                : parseFloat(tempDepth.total);
              
              // 归一化景深数值用于柱状图高度
              const normalizedDepth = Math.min(depthValue / 15 * 100, 100);
              
              return (
                <div key={ap} className="flex flex-col items-center mx-1">
                  <div className="text-xs text-muted-foreground mb-1">f/{ap}</div>
                  <div className="w-6 bg-secondary rounded-sm flex justify-center">
                    <div 
                      className={`w-4 rounded-sm ${settings.aperture === ap ? 'bg-primary' : 'bg-purple-700/50'}`}
                      style={{ height: `${normalizedDepth}px` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>浅景深</span>
            <span>深景深</span>
          </div>
        </div>
      </div>
    </div>
  );
} 