"use client";

import { useState } from "react";
import Image from "next/image";

// 风格类型定义
interface Style {
  id: string;
  name: string;
  description: string;
  visualElements: string[];
  characteristics: { [key: string]: number };
  examples: {
    imageUrl: string;
    photographer?: string;
    title?: string;
  }[];
}

// 风格数据
const photographyStyles: Style[] = [
  {
    id: "minimalist",
    name: "极简主义",
    description: "极简主义摄影强调简洁、留白和形式纯粹性，通过减法创造强大的视觉冲击力。",
    visualElements: ["几何形状", "负空间", "简洁线条", "单色调"],
    characteristics: {
      "复杂度": 20,
      "色彩饱和度": 30,
      "对比度": 70,
      "画面留白": 90,
      "构图严谨性": 85,
    },
    examples: [
      {
        imageUrl: "https://images.unsplash.com/photo-1617608338809-03a2d30e3203",
        photographer: "Josh Rose",
        title: "极简几何",
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1421986527537-888d998adb74",
        photographer: "Pawel Czerwinski",
        title: "负空间研究",
      },
    ],
  },
  {
    id: "cinematic",
    name: "电影感",
    description: "电影感摄影借鉴电影视觉语言，注重讲故事、情绪渲染和特定的色调处理。",
    visualElements: ["宽银幕比例", "戏剧化光影", "特殊色调", "场景氛围"],
    characteristics: {
      "复杂度": 75,
      "色彩饱和度": 60,
      "对比度": 85,
      "画面留白": 40,
      "构图严谨性": 80,
    },
    examples: [
      {
        imageUrl: "https://images.unsplash.com/photo-1541682272660-9393e5a8f93f",
        photographer: "Ren Ran",
        title: "暮色迷雾",
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926",
        photographer: "Florian Olivo",
        title: "霓虹童话",
      },
    ],
  },
  {
    id: "documentary",
    name: "纪实风格",
    description: "纪实风格摄影强调真实性和故事性，捕捉自然发生的瞬间和人文情感。",
    visualElements: ["真实场景", "自然光线", "非干预性", "情感表达"],
    characteristics: {
      "复杂度": 65,
      "色彩饱和度": 45,
      "对比度": 60,
      "画面留白": 30,
      "构图严谨性": 40,
    },
    examples: [
      {
        imageUrl: "https://images.unsplash.com/photo-1533230664508-9e41da001041",
        photographer: "Joshua Fuller",
        title: "街头瞬间",
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1469241843675-f6718b3dc4a8",
        photographer: "Jon Tyson",
        title: "日常叙事",
      },
    ],
  },
];

// 风格解码器组件
function StyleDecoder({ style }: { style: Style }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{style.name}</h3>
        <p className="text-muted-foreground mb-4">{style.description}</p>
        
        {/* 视觉元素标签 */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">视觉元素</h4>
          <div className="flex flex-wrap gap-2">
            {style.visualElements.map((element) => (
              <span 
                key={element} 
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
              >
                {element}
              </span>
            ))}
          </div>
        </div>
        
        {/* 风格特征图表 */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">风格特征</h4>
          <div className="space-y-3">
            {Object.entries(style.characteristics).map(([name, value]) => (
              <div key={name}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{name}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 示例作品 */}
      <div className="border-t border-border">
        <h4 className="text-sm font-semibold text-muted-foreground p-4 pb-2">示例作品</h4>
        <div className="grid grid-cols-2">
          {style.examples.map((example, index) => (
            <div key={index} className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={example.imageUrl}
                alt={example.title || `${style.name}风格示例`}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                <p className="text-white text-xs font-medium">{example.title}</p>
                {example.photographer && (
                  <p className="text-white/70 text-xs">{example.photographer}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StyleExplorer() {
  const [selectedStyle, setSelectedStyle] = useState<Style>(photographyStyles[0]);

  return (
    <div className="space-y-8">
      {/* 风格导航 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photographyStyles.map((style) => (
          <div 
            key={style.id}
            onClick={() => setSelectedStyle(style)}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedStyle.id === style.id 
                ? "bg-primary/10 border-2 border-primary" 
                : "bg-secondary border-2 border-transparent hover:border-primary/40"
            }`}
          >
            <h3 className="font-medium mb-1">{style.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{style.description}</p>
          </div>
        ))}
      </div>

      {/* 风格解码器 */}
      {selectedStyle && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StyleDecoder style={selectedStyle} />
          
          <div className="border border-border rounded-lg bg-card p-6">
            <h3 className="text-xl font-bold mb-4">如何实现这种风格</h3>
            
            <div className="space-y-6">
              {/* 拍摄技巧 */}
              <div>
                <h4 className="text-base font-medium mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  拍摄技巧
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground pl-2">
                  {selectedStyle.id === "minimalist" && (
                    <>
                      <li>寻找简洁的构图和干净的背景</li>
                      <li>注重负空间的使用，让主体更加突出</li>
                      <li>使用中性色彩或单色调</li>
                      <li>注意几何形状和线条的排列</li>
                    </>
                  )}
                  {selectedStyle.id === "cinematic" && (
                    <>
                      <li>使用较大的光圈创造浅景深效果</li>
                      <li>寻找戏剧化的光线条件，如侧光或逆光</li>
                      <li>考虑使用宽屏比例裁剪（如16:9）</li>
                      <li>注意场景中的氛围和情绪元素</li>
                    </>
                  )}
                  {selectedStyle.id === "documentary" && (
                    <>
                      <li>保持真实性，避免过多干预场景</li>
                      <li>捕捉自然发生的互动和情绪</li>
                      <li>利用现有光线，减少人工照明</li>
                      <li>关注细节和讲述故事的元素</li>
                    </>
                  )}
                </ul>
              </div>
              
              {/* 后期处理 */}
              <div>
                <h4 className="text-base font-medium mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  后期处理
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground pl-2">
                  {selectedStyle.id === "minimalist" && (
                    <>
                      <li>增加对比度，强化形式感</li>
                      <li>减少色彩饱和度，甚至考虑黑白转换</li>
                      <li>细致调整构图，确保元素平衡</li>
                      <li>去除多余细节，保持画面干净</li>
                    </>
                  )}
                  {selectedStyle.id === "cinematic" && (
                    <>
                      <li>使用分离式调色，强调阴影和高光区域</li>
                      <li>应用特定的色彩风格，如橙青对比</li>
                      <li>增强景深和虚化效果</li>
                      <li>添加轻微的颗粒感增加电影质感</li>
                    </>
                  )}
                  {selectedStyle.id === "documentary" && (
                    <>
                      <li>保持自然的色彩和对比度</li>
                      <li>避免过度处理，保留真实感</li>
                      <li>适度调整曝光和对比度以增强清晰度</li>
                      <li>考虑使用单色调或低饱和度增强情感</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 