import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineFilter, HiSearch, HiCamera, HiOutlinePhotograph, HiSun, HiMoon, HiLocationMarker, HiColorSwatch, HiLightBulb } from 'react-icons/hi';

const sceneCategories = [
  { title: "人像拍摄", icon: <HiCamera className="text-white text-xl" />, path: "/shooting-tips/portrait", difficulty: "初级-高级", description: "学习如何拍摄自然、有表现力的人像照片，从基础姿势到高级灯光技巧。" },
  { title: "风景摄影", icon: <HiOutlinePhotograph className="text-white text-xl" />, path: "/shooting-tips/landscape", difficulty: "初级-中级", description: "掌握壮观风景照片的拍摄技巧，包括构图、长曝光和HDR技术。" },
  { title: "街头摄影", icon: <HiCamera className="text-white text-xl" />, path: "/shooting-tips/street", difficulty: "中级-高级", description: "学习如何捕捉城市生活的精彩瞬间，培养敏锐的观察力和快速反应能力。" },
  { title: "夜景拍摄", icon: <HiMoon className="text-white text-xl" />, path: "/shooting-tips/night", difficulty: "中级-高级", description: "探索夜间摄影的奥秘，从光轨到星空，掌握低光环境下的拍摄技巧。" },
  { title: "微距摄影", icon: <HiCamera className="text-white text-xl" />, path: "/shooting-tips/macro", difficulty: "中级", description: "发现微小世界的奇妙细节，学习微距摄影的特殊器材和技巧。" },
  { title: "建筑摄影", icon: <HiLocationMarker className="text-white text-xl" />, path: "/shooting-tips/architecture", difficulty: "初级-中级", description: "学习如何拍摄引人注目的建筑照片，控制透视和处理棘手的光线条件。" },
  { title: "黑白摄影", icon: <HiColorSwatch className="text-white text-xl" />, path: "/shooting-tips/blackandwhite", difficulty: "所有级别", description: "探索黑白摄影的艺术，学习如何通过对比和色调传达强烈情感。" },
  { title: "运动摄影", icon: <HiCamera className="text-white text-xl" />, path: "/shooting-tips/sports", difficulty: "中级-高级", description: "掌握捕捉快速移动主体的技巧，学习预测动作和使用合适的相机设置。" },
  { title: "创意摄影", icon: <HiLightBulb className="text-white text-xl" />, path: "/shooting-tips/creative", difficulty: "中级-高级", description: "探索多重曝光、意向性运动模糊等创新技术，打破常规拍摄思路。" }
];

const SceneNavigator = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  // 根据搜索和过滤条件筛选场景
  const filteredCategories = sceneCategories.filter(category => {
    // 搜索过滤
    const matchesSearch = category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 难度过滤
    const matchesDifficulty = difficultyFilter.length === 0 || 
                             (difficultyFilter.includes('beginner') && category.difficulty.includes('初级')) ||
                             (difficultyFilter.includes('intermediate') && category.difficulty.includes('中级')) ||
                             (difficultyFilter.includes('advanced') && category.difficulty.includes('高级'));
    
    return matchesSearch && matchesDifficulty;
  });

  // 处理难度过滤器变化
  const handleDifficultyChange = (difficulty: string) => {
    if (difficultyFilter.includes(difficulty)) {
      setDifficultyFilter(difficultyFilter.filter(item => item !== difficulty));
    } else {
      setDifficultyFilter([...difficultyFilter, difficulty]);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
      {/* 顶部搜索和过滤区 */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-200 placeholder-gray-500"
              placeholder="搜索拍摄场景..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="flex items-center bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2.5 rounded-lg transition-all"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <HiOutlineFilter className="mr-2" />
            难度过滤
            <span className={`ml-1.5 transform transition-transform ${filterOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </div>

        {/* 过滤器选项 */}
        {filterOpen && (
          <div className="mt-4 bg-gray-800/40 rounded-lg p-4 animate-fadeIn">
            <div className="flex flex-wrap gap-3">
              <div 
                className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all ${
                  difficultyFilter.includes('beginner') 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => handleDifficultyChange('beginner')}
              >
                初级
              </div>
              <div 
                className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all ${
                  difficultyFilter.includes('intermediate') 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => handleDifficultyChange('intermediate')}
              >
                中级
              </div>
              <div 
                className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all ${
                  difficultyFilter.includes('advanced') 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => handleDifficultyChange('advanced')}
              >
                高级
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 场景卡片网格 */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <Link 
            href={category.path} 
            key={index} 
            className="relative group"
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className={`bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${hoveredCategory === index ? 'transform scale-105' : ''}`}>
              {/* 场景图标和标题区 */}
              <div className="bg-gradient-to-r from-blue-800 to-purple-800 p-5">
                <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center mb-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
                <div className="mt-2 inline-block px-2.5 py-1 bg-gray-900/50 rounded-full">
                  <span className="text-xs text-gray-300">{category.difficulty}</span>
                </div>
              </div>
              
              {/* 场景描述区 */}
              <div className="p-5">
                <p className="text-gray-400 text-sm h-16">{category.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="inline-flex items-center text-blue-400 text-sm">
                    查看技巧
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  
                  {/* 难度指示器 */}
                  <div className="flex items-center">
                    {category.difficulty.includes('初级') && (
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-1" title="初级"></span>
                    )}
                    {category.difficulty.includes('中级') && (
                      <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1" title="中级"></span>
                    )}
                    {category.difficulty.includes('高级') && (
                      <span className="w-2 h-2 rounded-full bg-red-500" title="高级"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* 无结果提示 */}
      {filteredCategories.length === 0 && (
        <div className="py-16 px-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-400">未找到匹配的拍摄场景</h3>
          <p className="mt-2 text-gray-500">请尝试调整搜索关键词或过滤条件</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
            onClick={() => {
              setSearchQuery('');
              setDifficultyFilter([]);
            }}
          >
            重置筛选
          </button>
        </div>
      )}
    </div>
  );
};

export default SceneNavigator; 