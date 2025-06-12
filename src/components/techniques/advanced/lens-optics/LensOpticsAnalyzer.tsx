import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// 光学问题类型
type OpticalIssue = 'chromatic' | 'distortion' | 'vignetting' | 'flare';

// MTF曲线数据点类型
interface MTFDataPoint {
  position: number; // 图像位置 (0 = 中心, 1 = 边缘)
  value10: number;  // 10 lp/mm对比度
  value30: number;  // 30 lp/mm对比度
}

// 光圈系列类型
type ApertureSeries = 1.4 | 2.8 | 5.6 | 8 | 11 | 16 | 22;

interface LensOpticsAnalyzerProps {
  opticalIssues?: OpticalIssue[];
  showMtfCurves?: boolean;
  apertureSeries?: ApertureSeries[];
  interactiveComparison?: boolean;
}

// 光学问题数据
const opticalIssuesData = {
  chromatic: {
    title: '色差',
    description: '由于不同波长的光在折射时角度不同导致的色彩偏移',
    imageSrc: '/images/techniques/postprocessing/chromatic-aberration.jpg',
    goodLensExample: '/images/techniques/postprocessing/chromatic-good.jpg',
    badLensExample: '/images/techniques/postprocessing/chromatic-bad.jpg',
    tips: '使用高质量镜头、避开极限光圈、后期校正可减轻色差问题',
    technicalDetails: '色差分为横向色差和纵向色差，前者表现为边缘色偏，后者表现为不同颜色成像平面不同',
    severity: [
      { aperture: 'f/1.4', level: 85 },
      { aperture: 'f/2.8', level: 60 },
      { aperture: 'f/5.6', level: 35 },
      { aperture: 'f/11', level: 20 },
      { aperture: 'f/22', level: 15 },
    ]
  },
  distortion: {
    title: '畸变',
    description: '图像的几何形状发生变形，常见桶形和枕形畸变',
    imageSrc: '/images/techniques/postprocessing/distortion.jpg',
    goodLensExample: '/images/techniques/postprocessing/distortion-good.jpg',
    badLensExample: '/images/techniques/postprocessing/distortion-bad.jpg',
    tips: '广角镜头易产生桶形畸变，长焦镜头易产生枕形畸变，中焦段畸变通常较小',
    technicalDetails: '畸变是由于光线经过镜头边缘和中心部分时的折射角度不同导致的',
    severity: [
      { aperture: 'f/1.4', level: 70 },
      { aperture: 'f/2.8', level: 70 },
      { aperture: 'f/5.6', level: 70 },
      { aperture: 'f/11', level: 65 },
      { aperture: 'f/22', level: 65 },
    ]
  },
  vignetting: {
    title: '暗角',
    description: '图像边缘区域较中心区域暗的现象',
    imageSrc: '/images/techniques/postprocessing/vignetting.jpg',
    goodLensExample: '/images/techniques/postprocessing/vignetting-good.jpg',
    badLensExample: '/images/techniques/postprocessing/vignetting-bad.jpg',
    tips: '缩小光圈、使用全画幅镜头或避免使用镜头的极限焦段可减轻暗角',
    technicalDetails: '暗角由光学暗角、机械暗角和自然暗角三种因素综合导致',
    severity: [
      { aperture: 'f/1.4', level: 90 },
      { aperture: 'f/2.8', level: 65 },
      { aperture: 'f/5.6', level: 35 },
      { aperture: 'f/11', level: 15 },
      { aperture: 'f/22', level: 5 },
    ]
  },
  flare: {
    title: '眩光/鬼影',
    description: '强光源直射镜头导致的图像上不规则光斑',
    imageSrc: '/images/techniques/postprocessing/flare.jpg',
    goodLensExample: '/images/techniques/postprocessing/flare-good.jpg',
    badLensExample: '/images/techniques/postprocessing/flare-bad.jpg',
    tips: '使用遮光罩、避免直射强光源、多层镀膜镜头可减少眩光',
    technicalDetails: '眩光是由于光线在镜片间多次反射形成，镀膜技术可降低镜片表面反射率',
    severity: [
      { aperture: 'f/1.4', level: 65 },
      { aperture: 'f/2.8', level: 60 },
      { aperture: 'f/5.6', level: 50 },
      { aperture: 'f/11', level: 45 },
      { aperture: 'f/22', level: 40 },
    ]
  }
};

// 生成MTF曲线数据（仿真）
const generateMTFData = (aperture: ApertureSeries, quality: 'low' | 'medium' | 'high') => {
  // 品质系数（影响曲线高度）
  const qualityFactor = quality === 'high' ? 0.95 : quality === 'medium' ? 0.75 : 0.6;
  
  // 光圈系数（中等光圈性能最佳）
  const apertureFactor = 
    aperture <= 2.8 ? 0.85 : // 大光圈
    aperture >= 16 ? 0.75 :  // 小光圈
    1;                       // 中等光圈
  
  // 生成数据点
  const dataPoints: MTFDataPoint[] = [];
  for (let i = 0; i <= 10; i++) {
    const position = i / 10;
    // 中心锐度高，边缘降低
    const centerToEdgeFactor = 1 - position * 0.5;
    
    // 10 lp/mm（低频）曲线
    const value10 = Math.min(1, Math.max(0.2, 
      qualityFactor * apertureFactor * centerToEdgeFactor * (1 - 0.3 * Math.pow(position, 2))
    ));
    
    // 30 lp/mm（高频）曲线
    const value30 = Math.min(0.9, Math.max(0.1, 
      qualityFactor * apertureFactor * centerToEdgeFactor * (1 - 0.6 * Math.pow(position, 1.5))
    ));
    
    dataPoints.push({ position, value10, value30 });
  }
  
  return dataPoints;
};

const LensOpticsAnalyzer: React.FC<LensOpticsAnalyzerProps> = ({
  opticalIssues = ['chromatic', 'distortion', 'vignetting', 'flare'],
  showMtfCurves = true,
  apertureSeries = [1.4, 2.8, 5.6, 11, 22],
  interactiveComparison = true
}) => {
  // 当前选中的光学问题
  const [selectedIssue, setSelectedIssue] = useState<OpticalIssue>(opticalIssues[0]);
  // 当前选中的光圈值
  const [selectedAperture, setSelectedAperture] = useState<ApertureSeries>(apertureSeries[0]);
  // 镜头质量（用于MTF曲线）
  const [lensQuality, setLensQuality] = useState<'low' | 'medium' | 'high'>('medium');
  // 是否显示良好示例
  const [showGoodExample, setShowGoodExample] = useState(false);
  
  // 获取当前选中的光学问题数据
  const currentIssue = opticalIssuesData[selectedIssue];
  
  // 获取当前光圈下的问题严重程度
  const getCurrentSeverity = () => {
    const severityData = currentIssue.severity.find(item => item.aperture === `f/${selectedAperture}`);
    return severityData ? severityData.level : 50;
  };
  
  // 生成当前设置的MTF曲线数据
  const mtfData = generateMTFData(selectedAperture, lensQuality);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-purple-100 dark:border-purple-900/20">
      <div className="p-4 border-b border-purple-100 dark:border-purple-900/20">
        <h3 className="font-medium text-lg text-purple-900 dark:text-purple-100">镜头光学特性分析</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">深入理解镜头的光学缺陷和成像品质</p>
      </div>
      
      <div className="p-4">
        {/* 光学问题选择器 */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">光学特性</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {opticalIssues.map(issue => (
              <button
                key={issue}
                className={`text-xs px-3 py-2 rounded-md transition-colors ${
                  selectedIssue === issue
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                }`}
                onClick={() => setSelectedIssue(issue)}
              >
                {opticalIssuesData[issue].title}
              </button>
            ))}
          </div>
        </div>
        
        {/* 光学问题展示区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{currentIssue.title}的视觉表现</h3>
            <div className="relative aspect-video overflow-hidden bg-black rounded-lg border border-gray-200 dark:border-gray-700">
              <Image 
                src={showGoodExample ? currentIssue.goodLensExample : currentIssue.badLensExample}
                alt={currentIssue.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {showGoodExample ? '优质镜头表现' : '问题明显表现'}
              </div>
            </div>
            {interactiveComparison && (
              <div className="mt-2 flex justify-end">
                <button
                  className="text-xs flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800"
                  onClick={() => setShowGoodExample(!showGoodExample)}
                >
                  <span className="mr-1">
                    {showGoodExample ? '查看问题表现' : '查看优质表现'}
                  </span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">详细说明</h3>
            <div className="p-4 bg-gradient-to-r from-purple-900/5 to-purple-500/10 rounded-lg h-full border border-purple-200/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">{currentIssue.description}</p>
              
              <div className="mt-4">
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">技术原理</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{currentIssue.technicalDetails}</p>
              </div>
              
              <div className="mt-4">
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">优化建议</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{currentIssue.tips}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 光圈与问题严重度 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">光圈对{currentIssue.title}的影响</h3>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">f/{selectedAperture}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
            {apertureSeries.map(f => (
              <button
                key={f}
                className={`text-xs py-1.5 rounded-md transition-colors ${
                  selectedAperture === f
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100'
                }`}
                onClick={() => setSelectedAperture(f)}
              >
                f/{f}
              </button>
            ))}
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">问题轻微</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">问题严重</span>
            </div>
            <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
            <div className="relative h-6">
              <motion.div 
                className="absolute top-0 w-4 h-4 bg-white dark:bg-gray-800 rounded-full border-2 border-purple-500 shadow-md"
                style={{ left: `calc(${getCurrentSeverity()}% - 8px)` }}
                initial={{ left: '0%' }}
                animate={{ left: `calc(${getCurrentSeverity()}% - 8px)` }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            </div>
            
            <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
              <span className="font-medium">技术提示：</span>
              {selectedIssue === 'chromatic' && '色差通常在大光圈下更明显，缩小光圈可减轻这一问题。'}
              {selectedIssue === 'distortion' && '畸变主要由镜头设计决定，与光圈关系不大。'}
              {selectedIssue === 'vignetting' && '暗角在大光圈下最明显，缩小光圈可显著减轻暗角问题。'}
              {selectedIssue === 'flare' && '眩光在所有光圈下都可能出现，但光圈形状会影响眩光形态。'}
            </p>
          </div>
        </div>
        
        {/* MTF曲线显示 */}
        {showMtfCurves && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">MTF曲线解析</h3>
              <div className="flex space-x-2">
                <button
                  className={`text-xs px-2 py-1 rounded-md ${lensQuality === 'low' ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                  onClick={() => setLensQuality('low')}
                >
                  入门级
                </button>
                <button
                  className={`text-xs px-2 py-1 rounded-md ${lensQuality === 'medium' ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                  onClick={() => setLensQuality('medium')}
                >
                  中端
                </button>
                <button
                  className={`text-xs px-2 py-1 rounded-md ${lensQuality === 'high' ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                  onClick={() => setLensQuality('high')}
                >
                  高端
                </button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-64 relative">
              {/* MTF坐标轴 */}
              <div className="absolute left-10 right-4 top-4 bottom-10 border-l border-b border-gray-300 dark:border-gray-600">
                {/* Y轴刻度 */}
                {[0, 0.2, 0.4, 0.6, 0.8, 1].map(value => (
                  <div key={value} className="absolute left-0 flex items-center" style={{ bottom: `${value * 100}%` }}>
                    <span className="text-xs text-gray-500 dark:text-gray-400 -ml-8">{value.toFixed(1)}</span>
                    <div className="w-2 h-0.5 bg-gray-300 dark:bg-gray-600 -ml-2"></div>
                  </div>
                ))}
                
                {/* X轴刻度 */}
                {[0, 0.2, 0.4, 0.6, 0.8, 1].map(value => (
                  <div key={value} className="absolute bottom-0 flex flex-col items-center" style={{ left: `${value * 100}%` }}>
                    <div className="h-2 w-0.5 bg-gray-300 dark:bg-gray-600 -mb-2"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{value.toFixed(1)}</span>
                  </div>
                ))}
              </div>
              
              {/* MTF曲线 */}
              <div className="absolute left-10 right-4 top-4 bottom-10">
                {/* 10 lp/mm曲线 */}
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d={`M ${mtfData.map(point => `${point.position * 100},${100 - point.value10 * 100}`).join(' L ')}`}
                    fill="none"
                    stroke="#8b5cf6" // 紫色
                    strokeWidth="2"
                  />
                </svg>
                
                {/* 30 lp/mm曲线 */}
                <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d={`M ${mtfData.map(point => `${point.position * 100},${100 - point.value30 * 100}`).join(' L ')}`}
                    fill="none"
                    stroke="#ec4899" // 粉色
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />
                </svg>
              </div>
              
              {/* 图例 */}
              <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 p-1 rounded text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-0.5 bg-purple-500 mr-1"></div>
                  <span className="text-gray-700 dark:text-gray-300">10 lp/mm</span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="w-3 h-0.5 bg-pink-500 mr-1 border-t border-dashed"></div>
                  <span className="text-gray-700 dark:text-gray-300">30 lp/mm</span>
                </div>
              </div>
              
              {/* 轴标签 */}
              <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-500 dark:text-gray-400">
                图像高度 (中心 → 边缘)
              </div>
              <div className="absolute left-0 top-1/2 -rotate-90 origin-center text-xs text-gray-500 dark:text-gray-400 -translate-x-2">
                对比度
              </div>
              
              {/* 当前光圈标记 */}
              <div className="absolute top-4 left-12 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-1.5 py-0.5 rounded text-xs">
                f/{selectedAperture} @ {lensQuality === 'high' ? '高端' : lensQuality === 'medium' ? '中端' : '入门级'}镜头
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
              <p><span className="font-medium">MTF曲线解读：</span> MTF（调制传递函数）曲线显示镜头在不同图像位置的分辨率和对比度表现。高MTF值（接近1）表示高清晰度和对比度。10 lp/mm曲线表示低频细节（整体对比度），30 lp/mm曲线表示高频细节（精细结构）。理想镜头在整个图像范围内保持高MTF值。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LensOpticsAnalyzer; 