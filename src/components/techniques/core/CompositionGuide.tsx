import React, { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Info, Grid, Maximize, Move, Camera, Eye, EyeOff, LayoutGrid } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  description: string;
}

interface CompositionExample {
  title: string;
  description: string;
  imageSrc: string;
  overlayType: 'rule-of-thirds' | 'golden-ratio' | 'leading-lines' | 'framing' | 'symmetry';
  points?: Point[];
}

interface CompositionType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  examples: CompositionExample[];
}

const compositionTypes: CompositionType[] = [
  {
    id: 'rule-of-thirds',
    name: '三分法',
    icon: <LayoutGrid className="h-4 w-4" />,
    description: '将画面平均分成九等分，在四条线或交叉点上放置主体以创造平衡与视觉吸引力',
    examples: [
      {
        title: '风景三分法',
        description: '将地平线放置在上三分线或下三分线上，主体元素位于交叉点',
        imageSrc: '/images/techniques/composition/rule-of-thirds-landscape.jpg',
        overlayType: 'rule-of-thirds',
        points: [
          { x: 66, y: 33, description: '天空占据画面三分之一' },
          { x: 33, y: 66, description: '主体位于左下交叉点' }
        ]
      },
      {
        title: '人像三分法',
        description: '将人物眼睛置于上三分线，面部位于交叉点以增加视觉吸引力',
        imageSrc: '/images/techniques/composition/rule-of-thirds-portrait.jpg',
        overlayType: 'rule-of-thirds',
        points: [
          { x: 66, y: 33, description: '眼睛位于上三分线' }
        ]
      }
    ]
  },
  {
    id: 'golden-ratio',
    name: '黄金分割',
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4,4 L20,4 L20,20 L4,20 Z" />
      <path d="M15,4 L15,15 L4,15" />
      <path d="M15,15 C11,15 8,12 8,8" />
    </svg>,
    description: '使用1:1.618的比例创造自然和谐的构图，具有经典美感',
    examples: [
      {
        title: '自然中的黄金分割',
        description: '螺旋结构遵循黄金分割率，在主体上形成自然流畅的视觉动线',
        imageSrc: '/images/techniques/composition/golden-ratio-nature.jpg',
        overlayType: 'golden-ratio',
        points: [
          { x: 38, y: 62, description: '螺旋中心点' }
        ]
      }
    ]
  },
  {
    id: 'leading-lines',
    name: '引导线',
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3,21 L21,3" />
      <path d="M7,21 L21,7" />
    </svg>,
    description: '利用画面中的线条引导观者视线移向主体，增强画面深度和动态感',
    examples: [
      {
        title: '道路引导线',
        description: '使用道路、铁轨或小径作为引导线将观众的目光引向远方主体',
        imageSrc: '/images/techniques/composition/leading-lines-road.jpg',
        overlayType: 'leading-lines',
        points: [
          { x: 50, y: 80, description: '线条起点' },
          { x: 50, y: 20, description: '视线终点' }
        ]
      }
    ]
  },
  {
    id: 'framing',
    name: '框架构图',
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
    </svg>,
    description: '使用前景元素创造自然框架，突出主体并增加画面层次感',
    examples: [
      {
        title: '自然框架',
        description: '利用树木、拱门或其他建筑元素形成框架强调主体',
        imageSrc: '/images/techniques/composition/framing-arch.jpg',
        overlayType: 'framing'
      }
    ]
  },
  {
    id: 'symmetry',
    name: '对称构图',
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M4,12 C4,16.4183 7.58172,20 12,20 C16.4183,20 20,16.4183 20,12 C20,7.58172 16.4183,4 12,4" />
      <path d="M20,12 C20,7.58172 16.4183,4 12,4 C7.58172,4 4,7.58172 4,12 C4,16.4183 7.58172,20 12,20" />
    </svg>,
    description: '通过平衡的对称元素创造稳定、和谐的视觉效果',
    examples: [
      {
        title: '建筑对称',
        description: '利用对称建筑或水面倒影创造平衡构图',
        imageSrc: '/images/techniques/composition/symmetry-architecture.jpg',
        overlayType: 'symmetry'
      }
    ]
  }
];

const compositionExercises: {[key: string]: string[]} = {
  'rule-of-thirds': [
    '风景照中将地平线放在上三分线或下三分线',
    '人像摄影中将眼睛对准上三分线',
    '城市街景中将主体建筑放在交叉点上'
  ],
  'golden-ratio': [
    '自然场景中寻找螺旋形状的元素',
    '肖像摄影中使用黄金分割比例',
    '静物摄影中按黄金比例排列物品'
  ],
  'leading-lines': [
    '城市中的道路、铁轨或桥梁',
    '自然环境中的河流、小径或树木',
    '建筑中的走廊、楼梯或扶手'
  ],
  'framing': [
    '使用拱门或窗户框住远处的风景',
    '利用树枝或叶子创造自然框架',
    '使用前景元素框住人物主体'
  ],
  'symmetry': [
    '建筑物的对称结构',
    '水面倒影创造的自然对称',
    '人物或动物的对称构图'
  ]
};

export const CompositionGuide: React.FC = () => {
  const [activeComposition, setActiveComposition] = useState(compositionTypes[0].id);
  const [showOverlay, setShowOverlay] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [activeExample, setActiveExample] = useState(0);
  
  const renderOverlay = (type: string) => {
    switch(type) {
      case 'rule-of-thirds':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
              <div className="border-r border-b border-white/80"></div>
              <div className="border-r border-l border-b border-white/80"></div>
              <div className="border-l border-b border-white/80"></div>
              <div className="border-r border-t border-b border-white/80"></div>
              <div className="border-r border-l border-t border-b border-white/80"></div>
              <div className="border-l border-t border-b border-white/80"></div>
              <div className="border-r border-t border-white/80"></div>
              <div className="border-r border-l border-t border-white/80"></div>
              <div className="border-l border-t border-white/80"></div>
            </div>
            <div className="absolute w-2 h-2 rounded-full bg-purple-500 top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-2 h-2 rounded-full bg-purple-500 top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-2 h-2 rounded-full bg-purple-500 top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-2 h-2 rounded-full bg-purple-500 top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        );
      case 'golden-ratio':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0,38 L62,38 L62,0 L100,0 L100,100 L0,100 Z" 
                    stroke="white" strokeWidth="0.8" fill="none" strokeOpacity="0.8" />
              <path d="M38,62 C49.8,62 62,49.8 62,38" 
                    stroke="purple" strokeWidth="1" fill="none" strokeOpacity="0.8" />
              <path d="M38,62 C31.4,62 24.8,55.4 24.8,48.8" 
                    stroke="purple" strokeWidth="1" fill="none" strokeOpacity="0.8" />
              <path d="M24.8,48.8 C24.8,45.5 28.1,42.2 31.4,42.2" 
                    stroke="purple" strokeWidth="1" fill="none" strokeOpacity="0.8" />
              <circle cx="38" cy="38" r="1.5" fill="purple" />
            </svg>
          </div>
        );
      case 'leading-lines':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="purple" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <line x1="25" y1="80" x2="50" y2="20" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <line x1="75" y1="80" x2="50" y2="20" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <circle cx="50" cy="20" r="2" fill="purple" />
            </svg>
          </div>
        );
      case 'framing':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-6 border-4 border-white/40 rounded-lg"></div>
            <div className="absolute inset-[15%] border-2 border-purple-500/60 rounded-lg"></div>
          </div>
        );
      case 'symmetry':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <line x1="50" y1="0" x2="50" y2="100" stroke="purple" strokeWidth="0.8" strokeDasharray="4" />
              <rect x="48" y="0" width="4" height="100" fill="white" fillOpacity="0.1" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };
  
  const currentComposition = compositionTypes.find(type => type.id === activeComposition);
  const currentExamples = currentComposition?.examples || [];
  const currentExample = currentExamples[activeExample];

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 px-6 py-4">
        <h3 className="text-lg font-bold text-white">构图指南</h3>
        <p className="text-sm text-purple-200">
          探索不同构图技巧，提升照片视觉吸引力
        </p>
      </div>
      
      <Tabs defaultValue={activeComposition} onValueChange={setActiveComposition} className="w-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <TabsList className="grid grid-cols-5 gap-1">
            {compositionTypes.map(type => (
              <TabsTrigger 
                key={type.id} 
                value={type.id}
                className="flex flex-col items-center justify-center py-2 gap-1"
              >
                {type.icon}
                <span className="text-sm">{type.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {compositionTypes.map(type => (
          <TabsContent key={type.id} value={type.id} className="mt-0">
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-base font-medium text-gray-900 mb-1">{type.name}</h4>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
              
              <div className="mt-6">
                <h5 className="text-base font-medium mb-4">构图示例</h5>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    {type.examples.length > 1 && (
                      <div className="flex space-x-2">
                        {type.examples.map((_, idx) => (
                          <Button 
                            key={idx}
                            variant={activeExample === idx ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveExample(idx)}
                            className="text-sm py-1 h-8"
                          >
                            示例 {idx + 1}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowOverlay(!showOverlay)}
                      className="ml-auto text-sm flex items-center gap-1"
                    >
                      {showOverlay ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {showOverlay ? "隐藏辅助线" : "显示辅助线"}
                    </Button>
                  </div>
                </div>
                
                {type.examples.length > 0 && (
                  <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
                    <div className="relative aspect-video bg-gray-100">
                      <Image 
                        src={type.examples[activeExample].imageSrc || "/images/placeholder.jpg"}
                        alt={type.examples[activeExample].title}
                        fill
                        className="object-cover"
                      />
                      {showOverlay && renderOverlay(type.examples[activeExample].overlayType)}
                      
                      {showOverlay && type.examples[activeExample].points?.map((point, idx) => (
                        <div 
                          key={idx}
                          className="absolute w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                          style={{ left: `${point.x}%`, top: `${point.y}%` }}
                          onMouseEnter={() => setHoveredPoint(idx)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        >
                          {idx + 1}
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 bg-white">
                      <h5 className="text-base font-medium text-gray-900 mb-1">
                        {type.examples[activeExample].title}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {type.examples[activeExample].description}
                      </p>
                      
                      {hoveredPoint !== null && type.examples[activeExample].points && (
                        <div className="mt-2 p-2 bg-purple-50 rounded text-sm text-purple-800 border border-purple-100">
                          <span className="font-medium">提示:</span> {type.examples[activeExample].points[hoveredPoint].description}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="text-base font-medium text-gray-900 mb-2">构图练习</h5>
                <p className="text-sm text-gray-600 mb-3">
                  尝试使用{type.name}构图技巧拍摄以下主题:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {compositionExercises[type.id].map((exercise, idx) => (
                    <li key={idx}>{exercise}</li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CompositionGuide; 