"use client";

import { useState } from "react";
import Image from "next/image";

// 场景类型定义
interface Scene {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// 情绪类型定义
interface Mood {
  id: string;
  name: string;
  description: string;
  styleRecommendations: string[];
}

// 风格类型定义
interface Style {
  id: string;
  name: string;
  description: string;
  bestForScenes: string[];
  techniques: string[];
}

// 场景与风格组合效果
interface SceneStyleCombo {
  sceneId: string;
  styleId: string;
  imageUrl: string;
  description: string;
}

// 场景数据
const photographyScenes: Scene[] = [
  {
    id: "urban",
    name: "城市街景",
    description: "现代城市环境，包括建筑、街道和城市生活",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
  },
  {
    id: "portrait",
    name: "人像场景",
    description: "以人物为主体的拍摄场景，包括环境人像和特写",
    imageUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3",
  },
  {
    id: "nature",
    name: "自然风光",
    description: "自然环境，如山川、湖泊、森林和自然景观",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
  },
  {
    id: "nightscape",
    name: "夜景",
    description: "夜晚城市景观、星空和低光环境下的场景",
    imageUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
  },
];

// 风格数据
const photographyStyles: Style[] = [
  {
    id: "dramatic",
    name: "戏剧化风格",
    description: "强调光影对比和情绪渲染，创造强烈视觉冲击力的风格",
    bestForScenes: ["urban", "portrait", "nightscape"],
    techniques: ["硬光运用", "高对比度", "选择性聚焦", "暗调色彩"],
  },
  {
    id: "minimalist",
    name: "极简主义",
    description: "注重简洁留白和形式纯粹性，通过减法创造视觉美感",
    bestForScenes: ["urban", "nature"],
    techniques: ["负空间", "简洁构图", "色彩节制", "几何形式"],
  },
  {
    id: "vintage",
    name: "复古风格",
    description: "模拟早期摄影工艺或特定时代色调，营造怀旧氛围",
    bestForScenes: ["portrait", "urban"],
    techniques: ["柔和色调", "质感处理", "胶片质感", "淡色滤镜"],
  },
  {
    id: "moody",
    name: "氛围感",
    description: "通过色调和光线塑造特定情绪氛围，强调画面感染力",
    bestForScenes: ["nature", "nightscape", "portrait"],
    techniques: ["低饱和度", "色相偏移", "氛围光线", "情绪构图"],
  },
];

// 情绪数据
const photographyMoods: Mood[] = [
  {
    id: "peaceful",
    name: "宁静平和",
    description: "营造平静、舒适、安宁的情绪体验",
    styleRecommendations: ["minimalist", "vintage"],
  },
  {
    id: "dramatic",
    name: "戏剧张力",
    description: "带来强烈视觉冲击和情绪震撼的感受",
    styleRecommendations: ["dramatic", "moody"],
  },
  {
    id: "nostalgic",
    name: "怀旧感伤",
    description: "唤起对过去的回忆和情感共鸣",
    styleRecommendations: ["vintage", "moody"],
  },
  {
    id: "energetic",
    name: "活力动感",
    description: "表现动态、活力和生命力的情绪状态",
    styleRecommendations: ["dramatic"],
  },
];

// 场景风格组合效果数据
const sceneStyleCombinations: SceneStyleCombo[] = [
  {
    sceneId: "urban",
    styleId: "dramatic",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785",
    description: "戏剧化的城市街景强调建筑线条和光影对比，凸显城市的力量感和张力"
  },
  {
    sceneId: "urban",
    styleId: "minimalist",
    imageUrl: "https://images.unsplash.com/photo-1486825586573-7131f7991bdd",
    description: "极简主义处理的城市场景，突出几何形状和线条的纯粹美感"
  },
  {
    sceneId: "urban",
    styleId: "vintage",
    imageUrl: "https://images.unsplash.com/photo-1513031300226-c8fb12de9ade",
    description: "复古风格下的城市街景，营造怀旧氛围和时光倒流的感觉"
  },
  {
    sceneId: "urban",
    styleId: "moody",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    description: "氛围感处理的城市场景，通过特定色调和光线渲染情绪氛围"
  },
  {
    sceneId: "portrait",
    styleId: "dramatic",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    description: "戏剧化人像强调光影塑造和情绪表现，突出人物性格和内心世界"
  },
  {
    sceneId: "portrait",
    styleId: "minimalist",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    description: "极简风格人像注重简洁背景和纯粹表达，突出人物本身"
  },
  {
    sceneId: "portrait",
    styleId: "vintage",
    imageUrl: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
    description: "复古风格人像通过特定色调和质感，创造怀旧氛围和时代感"
  },
  {
    sceneId: "portrait",
    styleId: "moody",
    imageUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3",
    description: "氛围感人像通过光线和色调营造特定情绪，强调人物内心状态"
  },
  // 自然场景风格组合
  {
    sceneId: "nature",
    styleId: "dramatic",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    description: "戏剧化处理的自然风光，强调壮丽景观和震撼力量"
  },
  {
    sceneId: "nature",
    styleId: "minimalist",
    imageUrl: "https://images.unsplash.com/photo-1497449493050-aad1e7cad165",
    description: "极简主义处理的自然场景，突出形态纯粹性和视觉平衡"
  },
  {
    sceneId: "nature",
    styleId: "vintage",
    imageUrl: "https://images.unsplash.com/photo-1501493870936-9c2e41625521",
    description: "复古风格下的自然景观，增添诗意和怀旧氛围"
  },
  {
    sceneId: "nature",
    styleId: "moody",
    imageUrl: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891",
    description: "氛围感处理的自然风光，通过色调和光线营造特定情绪体验"
  },
  // 夜景场景风格组合
  {
    sceneId: "nightscape",
    styleId: "dramatic",
    imageUrl: "https://images.unsplash.com/photo-1533420896790-8bd01e530395",
    description: "戏剧化的夜景拍摄，强调光与影的强烈对比和城市活力"
  },
  {
    sceneId: "nightscape",
    styleId: "minimalist",
    imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
    description: "极简主义的夜间场景，通过简化元素突出灯光与黑暗的对比"
  },
  {
    sceneId: "nightscape",
    styleId: "vintage",
    imageUrl: "https://images.unsplash.com/photo-1520456346382-1f219abdc7a5",
    description: "复古风格的夜景，营造怀旧氛围和特定时代的夜晚感受"
  },
  {
    sceneId: "nightscape",
    styleId: "moody",
    imageUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
    description: "氛围感夜景强调情绪渲染和光线魔力，创造沉浸式体验"
  },
];

// 查找场景与风格组合的示例
const findSceneStyleExample = (sceneId: string, styleId: string) => {
  return sceneStyleCombinations.find(
    combo => combo.sceneId === sceneId && combo.styleId === styleId
  );
};

// 场景卡片组件
function SceneCard({ scene, isSelected, onClick }: { 
  scene: Scene, 
  isSelected: boolean, 
  onClick: () => void 
}) {
  return (
    <div 
      className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${
        isSelected 
          ? "ring-4 ring-primary ring-opacity-70" 
          : "hover:ring-2 hover:ring-primary hover:ring-opacity-50"
      }`}
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative">
        <Image 
          src={scene.imageUrl} 
          alt={scene.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg">{scene.name}</h3>
            <p className="text-white/80 text-sm line-clamp-2">{scene.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 风格卡片组件
function StyleCard({ style, isSelected, onClick }: {
  style: Style,
  isSelected: boolean,
  onClick: () => void
}) {
  return (
    <div 
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        isSelected 
          ? "bg-primary/10 border-2 border-primary" 
          : "bg-secondary border-2 border-transparent hover:border-primary/40"
      }`}
      onClick={onClick}
    >
      <h3 className="font-medium mb-1">{style.name}</h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{style.description}</p>
      <div className="flex flex-wrap gap-2">
        {style.techniques.slice(0, 3).map((technique) => (
          <span 
            key={technique} 
            className="px-2 py-1 bg-secondary/50 rounded-full text-xs"
          >
            {technique}
          </span>
        ))}
        {style.techniques.length > 3 && (
          <span className="px-2 py-1 bg-secondary/50 rounded-full text-xs">
            +{style.techniques.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}

// 情绪选择器组件
function MoodSelector({ moods, selectedMood, onSelectMood }: {
  moods: Mood[],
  selectedMood: Mood | null,
  onSelectMood: (mood: Mood) => void
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">按情绪选择风格</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {moods.map((mood) => (
          <div
            key={mood.id}
            onClick={() => onSelectMood(mood)}
            className={`p-3 rounded-lg cursor-pointer text-center transition-all ${
              selectedMood?.id === mood.id
                ? "bg-primary/20 border-2 border-primary"
                : "bg-secondary/50 border-2 border-transparent hover:border-primary/30"
            }`}
          >
            <h4 className="font-medium">{mood.name}</h4>
            <p className="text-xs text-muted-foreground mt-1">{mood.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 场景风格预览组件
function SceneStylePreview({ sceneId, styleId }: { sceneId: string, styleId: string }) {
  const combo = findSceneStyleExample(sceneId, styleId);
  
  if (!combo) {
    return (
      <div className="flex items-center justify-center h-full border rounded-lg border-dashed border-muted-foreground bg-secondary/20 p-8">
        <p className="text-muted-foreground text-center">没有找到匹配的示例</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="relative aspect-[16/9]">
        <Image
          src={combo.imageUrl}
          alt={`${sceneId} in ${styleId} style`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 bg-card">
        <p className="text-sm">{combo.description}</p>
      </div>
    </div>
  );
}

export function SceneMatcher() {
  const [selectedScene, setSelectedScene] = useState<Scene>(photographyScenes[0]);
  const [selectedStyle, setSelectedStyle] = useState<Style>(photographyStyles[0]);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  // 当选择情绪时，更新推荐的风格
  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    if (mood.styleRecommendations.length > 0) {
      const recommendedStyle = photographyStyles.find(
        style => style.id === mood.styleRecommendations[0]
      );
      if (recommendedStyle) {
        setSelectedStyle(recommendedStyle);
      }
    }
  };

  return (
    <div className="space-y-10">
      {/* 场景选择区 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">选择场景</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photographyScenes.map((scene) => (
            <SceneCard
              key={scene.id}
              scene={scene}
              isSelected={selectedScene.id === scene.id}
              onClick={() => setSelectedScene(scene)}
            />
          ))}
        </div>
      </div>
      
      {/* 情绪选择区 */}
      <div className="p-5 bg-secondary/30 rounded-lg">
        <MoodSelector
          moods={photographyMoods}
          selectedMood={selectedMood}
          onSelectMood={handleMoodSelect}
        />
      </div>
      
      {/* 风格选择区 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">选择风格</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {photographyStyles.map((style) => (
            <StyleCard
              key={style.id}
              style={style}
              isSelected={selectedStyle.id === style.id}
              onClick={() => setSelectedStyle(style)}
            />
          ))}
        </div>
      </div>
      
      {/* 场景与风格组合预览 */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-medium">场景与风格组合效果</h3>
          <span className="text-sm text-muted-foreground">
            {selectedScene.name} + {selectedStyle.name}
          </span>
        </div>
        
        <SceneStylePreview
          sceneId={selectedScene.id}
          styleId={selectedStyle.id}
        />

        <div className="p-4 bg-secondary/30 rounded-lg mt-6">
          <h4 className="font-medium mb-3">拍摄建议</h4>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>考虑场景的主要特点和风格的核心元素</li>
            <li>调整拍摄参数以符合所选风格的表现需求</li>
            <li>注意光线条件对风格表现的重要影响</li>
            <li>思考构图如何强化所选风格的视觉特点</li>
            <li>后期处理时强化所选场景与风格的匹配效果</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 