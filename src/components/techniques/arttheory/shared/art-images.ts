// 定义图片数据接口
export interface ArtImage {
  id: string;
  title: string;
  src: string;
  alt: string;
  category?: string;
  description?: string;
  author?: string;
  year?: string;
  credit?: string;
}

// 美学基础相关图片
export const aestheticsImages: ArtImage[] = [
  {
    id: 'aes-1',
    title: '构图与平衡',
    src: '/images/showcase/masters/composition-balance.jpg',
    alt: '展示黄金比例和三分法则的摄影作品',
    category: '构图',
    description: '这张照片展示了经典的构图原则，包括三分法则和视觉平衡'
  },
  {
    id: 'aes-2',
    title: '色彩理论',
    src: '/images/showcase/masters/color-theory.jpg',
    alt: '色彩理论在摄影中的应用',
    category: '色彩',
    description: '这幅图像展示了互补色和色彩和谐的原则'
  },
  {
    id: 'aes-3',
    title: '光影对比',
    src: '/images/showcase/masters/light-shadow.jpg',
    alt: '光影形成强烈对比的黑白照片',
    category: '光影',
    description: '强烈的光影对比创造出戏剧性效果和情绪'
  },
  {
    id: 'aes-4',
    title: '形式与内容',
    src: '/images/showcase/masters/form-content.jpg',
    alt: '形式与内容平衡的艺术摄影',
    category: '形式',
    description: '这张照片展示了形式元素如何支持内容表达'
  },
  {
    id: 'aes-5',
    title: '视觉重量',
    src: '/images/showcase/thematic/visual-weight.jpg',
    alt: '展示视觉重量原则的构图',
    category: '构图',
    description: '图像中的元素根据它们的视觉重量进行平衡'
  },
  {
    id: 'aes-6',
    title: '质感与肌理',
    src: '/images/showcase/thematic/texture.jpg',
    alt: '展示丰富质感的特写摄影',
    category: '质感',
    description: '这张照片强调了不同材质的质感和肌理'
  }
];// 摄影史与思潮相关图片
export const historyImages: ArtImage[] = [
  {
    id: 'hist-1',
    title: '早期摄影',
    src: '/images/showcase/masters/early-photography.jpg',
    alt: '19世纪早期摄影作品复制品',
    category: '历史',
    description: '展示摄影技术早期发展的历史照片',
    year: '1850年代'
  },
  {
    id: 'hist-2',
    title: '照相画派',
    src: '/images/showcase/masters/pictorialism.jpg',
    alt: '照相画派风格的柔焦艺术照',
    category: '流派',
    description: '展示照相画派的柔焦和绘画般的效果',
    year: '1890-1910年'
  },
  {
    id: 'hist-3',
    title: '直接摄影',
    src: '/images/showcase/masters/straight-photography.jpg',
    alt: '直接摄影风格的清晰锐利影像',
    category: '流派',
    description: 'f/64小组推崇的直接摄影风格，强调清晰度和细节',
    year: '1930年代'
  },
  {
    id: 'hist-4',
    title: '现代主义',
    src: '/images/showcase/masters/modernism.jpg',
    alt: '现代主义风格的几何构图',
    category: '流派',
    description: '现代主义摄影的抽象和几何形式',
    year: '1920-1940年'
  },
  {
    id: 'hist-5',
    title: '纪实摄影',
    src: '/images/showcase/contemporary/documentary.jpg',
    alt: '纪实摄影风格的社会题材照片',
    category: '流派',
    description: '展示社会现实的纪实摄影传统',
    year: '1930-1950年'
  },
  {
    id: 'hist-6',
    title: '后现代摄影',
    src: '/images/showcase/contemporary/postmodern.jpg',
    alt: '后现代摄影作品示例',
    category: '流派',
    description: '质疑传统和模糊艺术边界的后现代摄影',
    year: '1970年代至今'
  }
];// 视觉语言相关图片
export const visualLanguageImages: ArtImage[] = [
  {
    id: 'vl-1',
    title: '线条与引导',
    src: '/images/showcase/technical/lines.jpg',
    alt: '展示线条作为视觉引导的照片',
    category: '视觉元素',
    description: '线条如何引导观众的视线穿过画面'
  },
  {
    id: 'vl-2',
    title: '形状与几何',
    src: '/images/showcase/technical/shapes.jpg',
    alt: '强调几何形状的构图',
    category: '视觉元素',
    description: '几何形状在摄影构图中的重要性'
  },
  {
    id: 'vl-3',
    title: '纹理与细节',
    src: '/images/showcase/technical/textures.jpg',
    alt: '展示丰富纹理的特写照片',
    category: '视觉元素',
    description: '纹理如何增加照片的视觉兴趣和深度'
  },
  {
    id: 'vl-4',
    title: '对比与对立',
    src: '/images/showcase/technical/contrast.jpg',
    alt: '展示强烈视觉对比的照片',
    category: '视觉关系',
    description: '视觉对比如何创造戏剧性和紧张感'
  }
];// 摄影美学理论流派图片
export const aestheticSchoolsImages: ArtImage[] = [
  {
    id: 'school-1',
    title: '形式主义美学',
    src: '/images/showcase/masters/formalism.jpg',
    alt: '形式主义摄影美学示例',
    category: '理论流派',
    description: '强调形式元素（线条、形状、构图）胜于内容的形式主义'
  },
  {
    id: 'school-2',
    title: '表现主义美学',
    src: '/images/showcase/masters/expressionism.jpg',
    alt: '表现主义摄影美学示例',
    category: '理论流派',
    description: '强调情感表达和主观视角的表现主义'
  },
  {
    id: 'school-3',
    title: '现实主义美学',
    src: '/images/showcase/masters/realism.jpg',
    alt: '现实主义摄影美学示例',
    category: '理论流派',
    description: '追求真实和客观记录的现实主义'
  },
  {
    id: 'school-4',
    title: '后现代美学',
    src: '/images/showcase/contemporary/postmodern-aesthetic.jpg',
    alt: '后现代摄影美学示例',
    category: '理论流派',
    description: '质疑传统观念并混合多种风格的后现代美学'
  }
];