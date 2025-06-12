import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Button } from '../../ui/button';
import { Search, Filter, X, Camera, Clock, Award, Sparkles, BookOpen } from 'lucide-react';
import { TechniqueCard } from './TechniqueCard';
import { Badge } from '../../ui/badge';

// 技巧数据类型
interface TechniqueData {
  id: string;
  title: string;
  description: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  timeRequired: string;
  equipmentNeeded: string[];
  imageSrc: string;
  category: string;
  steps: {
    title: string;
    content: string;
    imageSrc?: string;
  }[];
}

interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
}

interface TechniqueGridProps {
  techniques: TechniqueData[];
  categories: Category[];
}

export const TechniqueGrid: React.FC<TechniqueGridProps> = ({
  techniques,
  categories
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCount, setFilteredCount] = useState(techniques.length);
  const [isFilterActive, setIsFilterActive] = useState(false);

  // 获取分类图标
  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'composition':
        return <BookOpen className="h-4 w-4" />;
      case 'lighting':
        return <Sparkles className="h-4 w-4" />;
      case 'technical':
        return <Camera className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // 过滤技巧
  const getFilteredTechniques = () => {
    const filtered = techniques.filter(technique => {
      // 分类过滤
      const categoryMatch = activeCategory === 'all' || technique.category === activeCategory;
      
      // 搜索过滤
      const searchMatch = searchQuery === '' || 
        technique.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        technique.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 难度过滤
      const difficultyMatch = difficultyFilter === null || technique.difficultyLevel === difficultyFilter;
      
      // 时间过滤
      const timeMatch = timeFilter === null || getTimeCategory(technique.timeRequired) === timeFilter;
      
      return categoryMatch && searchMatch && difficultyMatch && timeMatch;
    });

    return filtered;
  };

  // 获取时间分类
  const getTimeCategory = (timeRequired: string) => {
    const minutes = parseInt(timeRequired);
    if (!isNaN(minutes)) {
      if (minutes <= 10) return 'quick';
      if (minutes <= 30) return 'medium';
      return 'long';
    }
    
    if (timeRequired.includes('分钟')) {
      const min = parseInt(timeRequired);
      if (!isNaN(min)) {
        if (min <= 10) return 'quick';
        if (min <= 30) return 'medium';
        return 'long';
      }
    }
    
    return 'medium'; // 默认中等时长
  };

  // 检查过滤器是否激活
  useEffect(() => {
    const filtered = getFilteredTechniques();
    setFilteredCount(filtered.length);
    setIsFilterActive(searchQuery !== '' || difficultyFilter !== null || timeFilter !== null);
  }, [searchQuery, difficultyFilter, timeFilter, activeCategory]);

  const resetFilters = () => {
    setSearchQuery('');
    setDifficultyFilter(null);
    setTimeFilter(null);
  };

  const filteredTechniques = getFilteredTechniques();

  return (
    <div className="w-full space-y-6">
      {/* 搜索栏和过滤器 */}
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="搜索技巧..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 h-10 border border-purple-200 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        
        <Button 
          variant={showFilters ? "default" : "outline"} 
          className={`${showFilters ? 'bg-purple-600 text-white' : 'border-purple-200 text-purple-700'}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          筛选
          {isFilterActive && <Badge className="ml-2 bg-purple-200 text-purple-800">{filteredCount}</Badge>}
        </Button>
      </div>
      
      {/* 过滤器面板 */}
      {showFilters && (
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-purple-800">筛选选项</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={resetFilters}
              className="h-8 text-sm text-purple-700"
            >
              重置
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-purple-900 font-medium">难度级别：</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={difficultyFilter === null ? "default" : "outline"}
                  onClick={() => setDifficultyFilter(null)}
                  className={`h-8 text-sm ${difficultyFilter === null ? 'bg-purple-600' : 'border-purple-200'}`}
                >
                  全部
                </Button>
                <Button
                  size="sm"
                  variant={difficultyFilter === 'beginner' ? "default" : "outline"}
                  onClick={() => setDifficultyFilter('beginner')}
                  className={`h-8 text-sm ${difficultyFilter === 'beginner' ? 'bg-green-600' : 'border-green-200 text-green-700'}`}
                >
                  <Award className="h-3 w-3 mr-1" />
                  初学者
                </Button>
                <Button
                  size="sm"
                  variant={difficultyFilter === 'intermediate' ? "default" : "outline"}
                  onClick={() => setDifficultyFilter('intermediate')}
                  className={`h-8 text-sm ${difficultyFilter === 'intermediate' ? 'bg-amber-600' : 'border-amber-200 text-amber-700'}`}
                >
                  <Award className="h-3 w-3 mr-1" />
                  中级
                </Button>
                <Button
                  size="sm"
                  variant={difficultyFilter === 'advanced' ? "default" : "outline"}
                  onClick={() => setDifficultyFilter('advanced')}
                  className={`h-8 text-sm ${difficultyFilter === 'advanced' ? 'bg-red-600' : 'border-red-200 text-red-700'}`}
                >
                  <Award className="h-3 w-3 mr-1" />
                  高级
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-purple-900 font-medium">所需时间：</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={timeFilter === null ? "default" : "outline"}
                  onClick={() => setTimeFilter(null)}
                  className={`h-8 text-sm ${timeFilter === null ? 'bg-purple-600' : 'border-purple-200'}`}
                >
                  全部
                </Button>
                <Button
                  size="sm"
                  variant={timeFilter === 'quick' ? "default" : "outline"}
                  onClick={() => setTimeFilter('quick')}
                  className={`h-8 text-sm ${timeFilter === 'quick' ? 'bg-blue-600' : 'border-blue-200 text-blue-700'}`}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  快速 (&lt;10分钟)
                </Button>
                <Button
                  size="sm"
                  variant={timeFilter === 'medium' ? "default" : "outline"}
                  onClick={() => setTimeFilter('medium')}
                  className={`h-8 text-sm ${timeFilter === 'medium' ? 'bg-blue-600' : 'border-blue-200 text-blue-700'}`}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  中等 (10-30分钟)
                </Button>
                <Button
                  size="sm"
                  variant={timeFilter === 'long' ? "default" : "outline"}
                  onClick={() => setTimeFilter('long')}
                  className={`h-8 text-sm ${timeFilter === 'long' ? 'bg-blue-600' : 'border-blue-200 text-blue-700'}`}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  较长 (&gt;30分钟)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 分类标签页 */}
      <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="bg-purple-50 p-1 w-full overflow-x-auto flex flex-nowrap">
          <TabsTrigger 
            value="all"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white whitespace-nowrap"
          >
            全部技巧
          </TabsTrigger>
          {categories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white whitespace-nowrap"
            >
              {getCategoryIcon(category.id) && <span className="mr-1.5">{getCategoryIcon(category.id)}</span>}
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="pt-6">
          {filteredTechniques.length === 0 ? (
            <div className="p-8 text-center bg-purple-50 rounded-lg border border-purple-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-3">
                <Search className="h-6 w-6" />
              </div>
              <p className="text-gray-500 mb-2">没有找到符合条件的拍摄技巧</p>
              <p className="text-sm text-gray-400">尝试调整筛选条件或搜索关键词</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 border-purple-200 text-purple-700"
                onClick={resetFilters}
              >
                清除筛选条件
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  显示 <span className="font-medium text-purple-700">{filteredTechniques.length}</span> 个技巧
                  {isFilterActive && <span> (已筛选)</span>}
                </p>
                
                {isFilterActive && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-purple-700 h-8"
                    onClick={resetFilters}
                  >
                    <X className="h-3 w-3 mr-1" />
                    清除筛选
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTechniques.map((technique) => (
                  <TechniqueCard 
                    key={technique.id}
                    title={technique.title}
                    description={technique.description}
                    difficulty={technique.difficultyLevel}
                    timeRequired={technique.timeRequired}
                    imageUrl={technique.imageSrc}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default TechniqueGrid; 