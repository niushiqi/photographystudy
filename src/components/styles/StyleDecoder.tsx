import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Layout, Lightbulb, Heart } from 'lucide-react';

interface VisualElement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface ExampleWork {
  id: string;
  title: string;
  photographer: string;
  imageUrl: string;
  year?: string;
  elements: {
    id: string;
    description: string;
    position: { x: number; y: number };
  }[];
}

interface StyleDecoderProps {
  photographyStyle: string;
  styleTitle: string;
  styleDescription: string;
  visualElements: VisualElement[];
  exampleWorks: ExampleWork[];
  alternativeStyles?: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
  }[];
}

export function StyleDecoder({
  photographyStyle,
  styleTitle,
  styleDescription,
  visualElements,
  exampleWorks,
  alternativeStyles = [],
}: StyleDecoderProps) {
  const [activeExample, setActiveExample] = useState<string>(exampleWorks[0]?.id || '');
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);

  const currentExample = exampleWorks.find(work => work.id === activeExample) || exampleWorks[0];

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-purple-200 dark:border-purple-900">
      <div className="p-5 border-b border-purple-200 dark:border-purple-900 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20">
        <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">{styleTitle}</h3>
        <p className="text-sm text-purple-700 dark:text-purple-300 opacity-90">{styleDescription}</p>
      </div>

      <Tabs defaultValue="elements" className="w-full">
        <div className="px-4 bg-purple-50 dark:bg-purple-900/20 border-b border-purple-200 dark:border-purple-900">
          <TabsList className="bg-transparent h-12">
            <TabsTrigger 
              value="elements" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
            >
              <Palette className="w-4 h-4 mr-2" />
              视觉元素分析
            </TabsTrigger>
            <TabsTrigger 
              value="examples" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
            >
              <Layout className="w-4 h-4 mr-2" />
              案例解构
            </TabsTrigger>
            <TabsTrigger 
              value="comparison" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
            >
              <Heart className="w-4 h-4 mr-2" />
              风格对比
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="elements" className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visualElements.map((element) => (
              <div 
                key={element.id}
                className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors cursor-pointer"
                onMouseEnter={() => setHoveredElementId(element.id)}
                onMouseLeave={() => setHoveredElementId(null)}
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-700 text-white flex items-center justify-center mr-3 shrink-0">
                    {element.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-300">{element.name}</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">{element.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examples" className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 relative bg-neutral-900 min-h-[400px] flex items-center justify-center">
              <div className="absolute top-4 left-4 z-10 space-x-2 flex">
                {exampleWorks.map((work) => (
                  <button
                    key={work.id}
                    className={`px-3 py-1.5 text-xs rounded-full ${
                      activeExample === work.id
                        ? "bg-purple-600 text-white"
                        : "bg-black/50 text-white hover:bg-purple-600/70"
                    }`}
                    onClick={() => setActiveExample(work.id)}
                  >
                    案例 {work.id}
                  </button>
                ))}
              </div>

              <div className="relative w-full h-full min-h-[400px]">
                <img
                  src={currentExample?.imageUrl}
                  alt={currentExample?.title}
                  className="w-full h-full object-contain"
                />

                {currentExample?.elements.map((element) => (
                  <div
                    key={element.id}
                    className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      activeElement === element.id
                        ? "bg-purple-600 text-white scale-110 z-20"
                        : "bg-white/80 text-purple-800 hover:bg-purple-500 hover:text-white z-10"
                    }`}
                    style={{
                      left: `${element.position.x}%`,
                      top: `${element.position.y}%`,
                    }}
                    onClick={() => setActiveElement(activeElement === element.id ? null : element.id)}
                  >
                    {parseInt(element.id.split("-")[1], 10)}
                  </div>
                ))}

                {activeElement && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-3 rounded-lg max-w-xs">
                    {currentExample?.elements.find(el => el.id === activeElement)?.description}
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-1/3 p-5 bg-purple-50 dark:bg-purple-900/20 border-t md:border-t-0 md:border-l border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-bold text-purple-800 dark:text-purple-300 mb-3">{currentExample?.title}</h3>
              <div className="text-xs text-purple-700 dark:text-purple-400 mb-4">
                <p>摄影师: {currentExample?.photographer}</p>
                {currentExample?.year && <p>年份: {currentExample.year}</p>}
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-300">风格元素解析</h4>
                <ul className="space-y-2 text-sm">
                  {currentExample?.elements.map((element, index) => (
                    <li 
                      key={element.id}
                      className={`flex items-start p-2 rounded-md ${
                        activeElement === element.id ? "bg-purple-200 dark:bg-purple-800/50" : "hover:bg-purple-100 dark:hover:bg-purple-800/30"
                      }`}
                      onMouseEnter={() => setActiveElement(element.id)}
                      onMouseLeave={() => setActiveElement(null)}
                    >
                      <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center mr-2 shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-purple-700 dark:text-purple-400">{element.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-5 border border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-bold text-purple-800 dark:text-purple-300 mb-2">
                {styleTitle} <span className="text-sm font-normal">(当前风格)</span>
              </h3>
              <div className="aspect-video bg-purple-200 dark:bg-purple-800 rounded-lg overflow-hidden mb-3">
                <img 
                  src={exampleWorks[0]?.imageUrl} 
                  alt={styleTitle} 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-400">{styleDescription}</p>
            </div>

            {alternativeStyles.map((style) => (
              <div 
                key={style.id}
                className="bg-white dark:bg-neutral-800 rounded-lg p-5 border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
              >
                <h3 className="text-lg font-bold text-purple-800 dark:text-purple-300 mb-2">{style.name}</h3>
                <div className="aspect-video bg-purple-100 dark:bg-purple-900/30 rounded-lg overflow-hidden mb-3">
                  <img 
                    src={style.imageUrl} 
                    alt={style.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-400">{style.description}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 