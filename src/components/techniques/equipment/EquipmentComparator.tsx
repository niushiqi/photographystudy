"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type EquipmentCategory = "cameras" | "lenses" | "flashes" | "tripods" | "accessories";
type CameraModel = "Sony A7IV" | "Canon R6" | "Nikon Z6II" | "Fujifilm X-T4" | "Panasonic S5" | "Sony A6400";
type LensModel = "24-70mm f/2.8" | "70-200mm f/2.8" | "50mm f/1.4" | "85mm f/1.8" | "16-35mm f/4" | "100-400mm f/4.5-5.6";

interface CameraSpecs {
  sensor: string;
  resolution: string;
  iso: string;
  fps: string;
  video: string;
  weight: string;
  price: number;
}

interface Camera {
  model: string;
  specs: CameraSpecs;
  ratings: number[];
  sampleImage: string;
  pros: string[];
  cons: string[];
}

interface PerformanceMetric {
  label: string;
  categories: {
    cameras: string[];
    lenses: string[];
    flashes: string[];
    tripods: string[];
    accessories: string[];
  };
}

const performanceMetrics: PerformanceMetric = {
  label: "性能指标",
  categories: {
    cameras: [
      "动态范围",
      "低光性能",
      "自动对焦",
      "分辨率",
      "视频能力",
      "电池续航",
      "便携性",
      "防抖能力",
      "连拍速度",
      "耐用性"
    ],
    lenses: [
      "锐度",
      "光圈",
      "色散控制",
      "畸变控制",
      "对焦速度",
      "暗角控制",
      "重量",
      "构造质量",
      "防抖效果",
      "价格/性能比"
    ],
    flashes: [
      "闪光功率",
      "回电时间",
      "TTL准确性",
      "高速同步",
      "无线功能",
      "电池寿命",
      "便携性",
      "灵活性"
    ],
    tripods: [
      "稳定性",
      "最大承重",
      "最大高度",
      "折叠尺寸",
      "重量",
      "调平系统",
      "锁定机制",
      "材料"
    ],
    accessories: [
      "功能性",
      "构造质量",
      "使用便捷性",
      "设计",
      "价格/性能比",
      "兼容性"
    ]
  }
};

// 相机数据（模拟数据）
const cameraData: Camera[] = [
  {
    model: "Sony A7IV",
    specs: {
      sensor: "全画幅 CMOS",
      resolution: "3300万像素",
      iso: "100-51200 (可扩展至 50-204800)",
      fps: "10 fps",
      video: "4K 60p, 10-bit 4:2:2",
      weight: "658g",
      price: 15999,
    },
    ratings: [9, 8, 9, 8, 9, 7, 7, 7, 8, 8], // 对应performanceMetrics.categories.cameras中的顺序
    sampleImage: "/images/gear/sample-sony.jpg",
    pros: ["出色的动态范围", "先进的自动对焦系统", "良好的视频能力", "高效的工作流程"],
    cons: ["比某些竞争对手更重", "菜单系统复杂", "触摸屏功能有限"],
  },
  {
    model: "Canon R6",
    specs: {
      sensor: "全画幅 CMOS",
      resolution: "2010万像素",
      iso: "100-102400 (可扩展至 50-204800)",
      fps: "12 fps (机械快门), 20 fps (电子快门)",
      video: "4K 60p, 10-bit 4:2:2",
      weight: "680g",
      price: 14999,
    },
    ratings: [8, 9, 9, 7, 8, 8, 7, 9, 9, 8],
    sampleImage: "/images/gear/sample-canon.jpg",
    pros: ["卓越的低光性能", "强大的机身防抖", "优秀的自动对焦", "高连拍速度"],
    cons: ["分辨率较低", "视频录制时间限制", "电池续航一般"],
  },
  {
    model: "Nikon Z6II",
    specs: {
      sensor: "全画幅 BSI CMOS",
      resolution: "2450万像素",
      iso: "100-51200 (可扩展至 50-204800)",
      fps: "14 fps",
      video: "4K 60p, 10-bit 4:2:2 (HDMI)",
      weight: "705g",
      price: 12999,
    },
    ratings: [8, 8, 8, 7, 7, 9, 6, 8, 8, 9],
    sampleImage: "/images/gear/sample-nikon.jpg",
    pros: ["卓越的人体工程学", "出色的图像质量", "良好的电池续航", "双卡槽"],
    cons: ["自动对焦不如竞争对手", "视频功能相对有限", "原生镜头选择较少"],
  },
  {
    model: "Fujifilm X-T4",
    specs: {
      sensor: "APS-C X-Trans CMOS 4",
      resolution: "2610万像素",
      iso: "160-12800 (可扩展至 80-51200)",
      fps: "15 fps (机械快门), 30 fps (电子快门)",
      video: "4K 60p, 10-bit 4:2:0",
      weight: "607g",
      price: 11999,
    },
    ratings: [7, 7, 8, 7, 8, 7, 9, 8, 9, 8],
    sampleImage: "/images/gear/sample-fuji.jpg",
    pros: ["出色的模拟胶片风格", "紧凑轻便", "强大的机身防抖", "优秀的视频功能"],
    cons: ["电池续航较短", "非全画幅", "追焦性能一般", "RAW文件处理不如竞争对手"],
  },
];

export function EquipmentComparatorModule() {
  const [category, setCategory] = useState<EquipmentCategory>("cameras");
  const [selectedModels, setSelectedModels] = useState<string[]>(["Sony A7IV", "Canon R6"]);
  const [comparisonView, setComparisonView] = useState<"specs" | "performance" | "samples">("specs");

  // 处理模型选择
  const toggleModelSelection = (model: string) => {
    if (selectedModels.includes(model)) {
      if (selectedModels.length > 1) {
        setSelectedModels(selectedModels.filter(m => m !== model));
      }
    } else {
      if (selectedModels.length < 3) {
        setSelectedModels([...selectedModels, model]);
      }
    }
  };

  // 获取所选相机数据
  const getSelectedCameraData = () => {
    return cameraData.filter(camera => selectedModels.includes(camera.model));
  };

  // 渲染规格比较视图
  const renderSpecsComparison = () => {
    const selectedCameras = getSelectedCameraData();
    
    if (selectedCameras.length === 0) return null;
    
    // 获取所有规格键，并定义为CameraSpecs的键
    const specKeys = Object.keys(selectedCameras[0].specs) as (keyof CameraSpecs)[];
    
    return (
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="p-3 text-left font-medium text-muted-foreground">规格</th>
              {selectedCameras.map(camera => (
                <th key={camera.model} className="p-3 text-left font-medium">
                  {camera.model}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specKeys.map(key => (
              <tr key={key} className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3 font-medium text-muted-foreground capitalize">
                  {key === "iso" ? "ISO范围" :
                   key === "fps" ? "连拍速度" :
                   key === "weight" ? "重量" :
                   key === "price" ? "价格" :
                   key === "resolution" ? "分辨率" :
                   key === "sensor" ? "传感器" :
                   key === "video" ? "视频规格" : key}
                </td>
                {selectedCameras.map(camera => (
                  <td key={`${camera.model}-${key}`} className="p-3">
                    {key === "price" ? `¥${camera.specs[key].toLocaleString()}` : camera.specs[key]}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="p-3 font-medium text-muted-foreground">优势</td>
              {selectedCameras.map(camera => (
                <td key={`${camera.model}-pros`} className="p-3">
                  <ul className="list-disc pl-5 space-y-1">
                    {camera.pros.map((pro, index) => (
                      <li key={index} className="text-sm">{pro}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-medium text-muted-foreground">劣势</td>
              {selectedCameras.map(camera => (
                <td key={`${camera.model}-cons`} className="p-3">
                  <ul className="list-disc pl-5 space-y-1">
                    {camera.cons.map((con, index) => (
                      <li key={index} className="text-sm">{con}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // 渲染性能比较视图（雷达图）
  const renderPerformanceComparison = () => {
    const selectedCameras = getSelectedCameraData();
    
    if (selectedCameras.length === 0) return null;
    
    return (
      <div className="mt-6">
        <div className="mb-4 text-center text-muted-foreground">
          <p>性能评分雷达图展示（1-10分，越高越好）</p>
          <small>注：实际产品中应该使用Canvas或SVG绘制真实雷达图，此处为示例</small>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 性能评分表格 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="p-3 text-left font-medium text-muted-foreground">性能指标</th>
                  {selectedCameras.map(camera => (
                    <th key={camera.model} className="p-3 text-left font-medium">
                      {camera.model}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {performanceMetrics.categories.cameras.map((metric, index) => (
                  <tr key={metric} className="border-b border-slate-200 dark:border-slate-700">
                    <td className="p-3 font-medium text-muted-foreground">{metric}</td>
                    {selectedCameras.map(camera => (
                      <td key={`${camera.model}-${metric}`} className="p-3">
                        <div className="flex items-center">
                          <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${camera.ratings[index] * 10}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm">{camera.ratings[index]}/10</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-3 font-medium text-muted-foreground">平均得分</td>
                  {selectedCameras.map(camera => {
                    const avgRating = camera.ratings.reduce((a, b) => a + b, 0) / camera.ratings.length;
                    return (
                      <td key={`${camera.model}-avg`} className="p-3 font-bold">
                        {avgRating.toFixed(1)}/10
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* 模拟雷达图（实际项目中应使用真实图表） */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-muted-foreground">此处应显示性能雷达对比图</p>
              <p className="text-xs text-muted-foreground mt-2">
                使用Chart.js或D3.js等库实现真实雷达图
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 渲染样张比较视图
  const renderSamplesComparison = () => {
    const selectedCameras = getSelectedCameraData();
    
    if (selectedCameras.length === 0) return null;
    
    return (
      <div className="mt-6">
        <div className="mb-4 text-center text-muted-foreground">
          <p>样张比较（相同场景下不同相机的表现）</p>
          <small>注：实际产品中应该使用真实相机样张，此处为示例</small>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedCameras.map(camera => (
            <div key={camera.model} className="border rounded-lg overflow-hidden">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 font-medium">
                {camera.model}
              </div>
              <div className="h-64 bg-slate-200 dark:bg-slate-700 relative">
                {/* 实际项目中应使用真实图片 */}
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  📷
                </div>
                {/*<Image 
                  src={camera.sampleImage} 
                  alt={`${camera.model} 样张`} 
                  fill 
                  className="object-cover"
                />*/}
              </div>
              <div className="p-4">
                <h4 className="font-medium mb-2">关键特点</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 注意{camera.model}在色彩渲染方面的特点</li>
                  <li>• 观察锐度和细节表现</li>
                  <li>• 高光和阴影细节保留</li>
                  <li>• 噪点控制和整体清晰度</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">专家点评</h4>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            样张比较揭示了每台相机的独特特性。索尼A7IV具有更自然的色彩和出色的动态范围，
            而佳能R6在低光环境下表现更好，尼康Z6II则在白平衡和色彩还原方面展现出优势。
            富士X-T4的独特胶片模拟使其样张具有鲜明的风格特点。
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">设备对比分析器</h2>
        <p className="text-muted-foreground mb-8">
          直观对比不同设备的规格、性能和实际样张，帮助您做出明智的购买决策。
        </p>
        
        {/* 设备类别选择 */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">选择设备类别</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("cameras")}
              className={`px-4 py-2 rounded-md transition-colors ${
                category === "cameras"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              相机
            </button>
            <button
              onClick={() => setCategory("lenses")}
              className={`px-4 py-2 rounded-md transition-colors ${
                category === "lenses"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              镜头
            </button>
            <button
              onClick={() => setCategory("flashes")}
              className={`px-4 py-2 rounded-md transition-colors ${
                category === "flashes"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              闪光灯
            </button>
            <button
              onClick={() => setCategory("tripods")}
              className={`px-4 py-2 rounded-md transition-colors ${
                category === "tripods"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              三脚架
            </button>
            <button
              onClick={() => setCategory("accessories")}
              className={`px-4 py-2 rounded-md transition-colors ${
                category === "accessories"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              配件
            </button>
          </div>
        </div>
        
        {/* 型号选择（最多选3个进行比较） */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">选择要比较的型号 <span className="text-sm font-normal text-muted-foreground">（最多3个）</span></h3>
          
          {category === "cameras" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cameraData.map(camera => (
                <button
                  key={camera.model}
                  onClick={() => toggleModelSelection(camera.model)}
                  className={`p-3 border rounded-lg transition-all ${
                    selectedModels.includes(camera.model)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-medium">{camera.model}</div>
                  <div className="text-sm text-muted-foreground mt-1">¥{camera.specs.price.toLocaleString()}</div>
                </button>
              ))}
            </div>
          )}
          
          {/* 其他类别的选择（在实际项目中完成） */}
          {category !== "cameras" && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 text-center">
              <p className="text-muted-foreground">
                该类别的数据正在整理中，敬请期待...
              </p>
            </div>
          )}
        </div>
        
        {/* 比较视图选择 */}
        {selectedModels.length > 0 && (
          <div className="border-t pt-6">
            <div className="flex mb-6 gap-4">
              <button
                onClick={() => setComparisonView("specs")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  comparisonView === "specs"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                规格对比
              </button>
              <button
                onClick={() => setComparisonView("performance")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  comparisonView === "performance"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                性能评分
              </button>
              <button
                onClick={() => setComparisonView("samples")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  comparisonView === "samples"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                样张比较
              </button>
            </div>
            
            {/* 比较内容 */}
            <motion.div
              key={comparisonView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {comparisonView === "specs" && renderSpecsComparison()}
              {comparisonView === "performance" && renderPerformanceComparison()}
              {comparisonView === "samples" && renderSamplesComparison()}
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
} 