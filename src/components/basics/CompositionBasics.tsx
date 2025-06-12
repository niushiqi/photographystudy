import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type CompositionBasicsProps = {
  onComplete?: () => void;
};

export default function CompositionBasics({ onComplete }: CompositionBasicsProps) {
  const [activeRule, setActiveRule] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [completedRules, setCompletedRules] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // 构图规则
  const compositionRules = [
    {
      id: 'rule-of-thirds',
      name: '三分法则',
      description: '将画面平均分为九个矩形区域，重要元素应放置在四个交叉点或线条上。这是最基础也是最常用的构图法则，可以创造平衡和谐的画面。',
      overlayType: 'grid',
      gridLines: [1/3, 2/3],
      color: 'rgba(255, 255, 255, 0.8)'
    },
    {
      id: 'golden-ratio',
      name: '黄金分割',
      description: '基于1:1.618的比例关系，是自然界中普遍存在的和谐比例。黄金螺旋构图能引导观众视线自然流动，创造优雅的视觉效果。',
      overlayType: 'spiral',
      color: 'rgba(255, 215, 0, 0.7)'
    },
    {
      id: 'leading-lines',
      name: '引导线',
      description: '利用画面中的线条元素（如道路、河流、围栏）引导观众视线移向主体。引导线能增强画面深度感，创造动态视觉流动。',
      overlayType: 'lines',
      color: 'rgba(0, 191, 255, 0.7)'
    },
    {
      id: 'symmetry',
      name: '对称构图',
      description: '将主体放在画面中心，两侧元素形成镜像效果。对称构图传达稳定、力量和形式美，适合建筑和风景摄影。',
      overlayType: 'symmetry',
      color: 'rgba(255, 105, 180, 0.7)'
    },
    {
      id: 'framing',
      name: '框架构图',
      description: '利用前景元素（如门窗、树枝、拱门）围绕主体，形成自然框架。这种构图增加画面层次感，引导视线聚焦主体。',
      overlayType: 'frame',
      color: 'rgba(50, 205, 50, 0.7)'
    }
  ];
  
  // 示例图片
  const sampleImages = [
    {
      src: '/images/basics/composition-landscape.jpg',
      alt: '风景构图示例',
      bestRules: ['rule-of-thirds', 'leading-lines']
    },
    {
      src: '/images/basics/composition-portrait.jpg',
      alt: '人像构图示例',
      bestRules: ['rule-of-thirds', 'framing']
    },
    {
      src: '/images/basics/composition-architecture.jpg',
      alt: '建筑构图示例',
      bestRules: ['symmetry', 'leading-lines']
    }
  ];
  
  // 知识检测问题
  const quizQuestions = [
    {
      id: 'q1',
      question: '三分法则是将画面划分为几个相等的部分？',
      options: ['4个部分', '6个部分', '9个部分', '12个部分'],
      correctAnswer: '9个部分'
    },
    {
      id: 'q2',
      question: '以下哪种构图适合表现建筑物的宏伟和稳定感？',
      options: ['引导线构图', '对称构图', '框架构图', '三分法则'],
      correctAnswer: '对称构图'
    },
    {
      id: 'q3',
      question: '黄金分割比例约为多少？',
      options: ['1:1', '1:1.414', '1:1.618', '1:2'],
      correctAnswer: '1:1.618'
    }
  ];
  
  // 绘制构图辅助线
  useEffect(() => {
    if (!canvasRef.current || !activeRule) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const rule = compositionRules.find(r => r.id === activeRule);
    if (!rule) return;
    
    ctx.strokeStyle = rule.color;
    ctx.lineWidth = 2;
    
    switch (rule.overlayType) {
      case 'grid':
        // 绘制三分法网格
        const gridLines = rule.gridLines || [1/3, 2/3];
        
        // 水平线
        gridLines.forEach(line => {
          ctx.beginPath();
          ctx.moveTo(0, canvas.height * line);
          ctx.lineTo(canvas.width, canvas.height * line);
          ctx.stroke();
        });
        
        // 垂直线
        gridLines.forEach(line => {
          ctx.beginPath();
          ctx.moveTo(canvas.width * line, 0);
          ctx.lineTo(canvas.width * line, canvas.height);
          ctx.stroke();
        });
        break;
        
      case 'spiral':
        // 绘制黄金螺旋
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;
        
        ctx.beginPath();
        for (let i = 0; i <= 720; i++) {
          const angle = 0.1 * i * Math.PI / 180;
          const radius = maxRadius * Math.pow(0.9, angle / 2);
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        break;
        
      case 'lines':
        // 绘制引导线
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(canvas.width * 0.4, canvas.height * 0.6);
        ctx.lineTo(canvas.width * 0.6, canvas.height * 0.4);
        ctx.lineTo(canvas.width, 0);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.7);
        ctx.lineTo(canvas.width, canvas.height * 0.3);
        ctx.stroke();
        break;
        
      case 'symmetry':
        // 绘制对称线
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        
        // 绘制对称区域
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(canvas.width * 0.4, 0, canvas.width * 0.2, canvas.height);
        break;
        
      case 'frame':
        // 绘制框架
        const padding = 30;
        ctx.beginPath();
        ctx.rect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);
        ctx.stroke();
        
        // 绘制内部焦点区域
        ctx.beginPath();
        ctx.rect(canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.4, canvas.height * 0.4);
        ctx.stroke();
        break;
    }
  }, [activeRule, canvasRef]);
  
  // 调整画布大小
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        if (container) {
          canvasRef.current.width = container.clientWidth;
          canvasRef.current.height = container.clientHeight;
          
          // 重新绘制
          if (activeRule) {
            const event = new Event('resize');
            window.dispatchEvent(event);
          }
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // 处理规则点击
  const handleRuleClick = (ruleId: string) => {
    if (activeRule === ruleId) {
      setActiveRule(null);
      setShowOverlay(false);
    } else {
      setActiveRule(ruleId);
      setShowOverlay(true);
      
      // 记录已学习的规则
      if (!completedRules.includes(ruleId)) {
        setCompletedRules([...completedRules, ruleId]);
      }
    }
  };
  
  // 处理图片切换
  const handleImageChange = (index: number) => {
    setSelectedImage(index);
  };
  
  // 处理测验提交
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    
    // 检查答案是否全部正确
    const allCorrect = quizQuestions.every(
      q => quizAnswers[q.id] === q.correctAnswer
    );
    
    if (allCorrect && onComplete) {
      // 延迟显示成功消息，然后调用完成回调
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };
  
  // 检查是否所有规则都已学习
  useEffect(() => {
    if (completedRules.length === compositionRules.length && !showQuiz) {
      // 显示完成按钮或自动显示测验
      setTimeout(() => {
        setShowQuiz(true);
      }, 500);
    }
  }, [completedRules, showQuiz]);
  
  // 渲染测验部分
  const renderQuiz = () => {
    const correctAnswers = quizSubmitted ? 
      quizQuestions.filter(q => quizAnswers[q.id] === q.correctAnswer).length : 0;
    
    return (
      <div className="mt-8 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          构图知识检测
        </h3>
        
        {quizSubmitted && (
          <div className={`mb-6 p-4 rounded-lg ${
            correctAnswers === quizQuestions.length 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
              : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
          }`}>
            <p className={`font-medium ${
              correctAnswers === quizQuestions.length 
                ? 'text-green-700 dark:text-green-300' 
                : 'text-amber-700 dark:text-amber-300'
            }`}>
              {correctAnswers === quizQuestions.length 
                ? '恭喜！你已掌握基本构图知识。' 
                : `你答对了 ${correctAnswers}/${quizQuestions.length} 题，请检查错误答案。`}
            </p>
          </div>
        )}
        
        <div className="space-y-6">
          {quizQuestions.map((q, index) => (
            <div key={q.id} className={`p-4 rounded-lg ${
              quizSubmitted && quizAnswers[q.id] === q.correctAnswer
                ? 'bg-green-50 dark:bg-green-900/10'
                : quizSubmitted
                  ? 'bg-red-50 dark:bg-red-900/10'
                  : 'bg-gray-50 dark:bg-gray-800/50'
            }`}>
              <p className="font-medium mb-3">{index + 1}. {q.question}</p>
              <div className="space-y-2">
                {q.options.map((option) => (
                  <label 
                    key={option} 
                    className={`flex items-center p-3 rounded-md cursor-pointer ${
                      quizAnswers[q.id] === option 
                        ? quizSubmitted
                          ? option === q.correctAnswer
                            ? 'bg-green-100 dark:bg-green-800/30 border border-green-300 dark:border-green-700'
                            : 'bg-red-100 dark:bg-red-800/30 border border-red-300 dark:border-red-700'
                          : 'bg-blue-100 dark:bg-blue-800/30 border border-blue-300 dark:border-blue-700'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    } ${quizSubmitted ? 'pointer-events-none' : ''}`}
                  >
                    <input 
                      type="radio" 
                      name={q.id} 
                      value={option}
                      checked={quizAnswers[q.id] === option}
                      onChange={() => setQuizAnswers({...quizAnswers, [q.id]: option})}
                      className="mr-2"
                      disabled={quizSubmitted}
                    />
                    <span>{option}</span>
                    {quizSubmitted && option === q.correctAnswer && (
                      <svg className="w-5 h-5 ml-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
              {quizSubmitted && quizAnswers[q.id] !== q.correctAnswer && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  正确答案: {q.correctAnswer}
                </p>
              )}
            </div>
          ))}
        </div>
        
        {!quizSubmitted && (
          <button 
            onClick={handleQuizSubmit}
            disabled={quizQuestions.some(q => !quizAnswers[q.id])}
            className={`mt-6 px-6 py-2 rounded-lg text-white ${
              quizQuestions.some(q => !quizAnswers[q.id])
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            提交答案
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">构图基础</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          构图是摄影中的视觉语言，决定了照片的视觉流动和情感表达。掌握基本构图规则，能帮助你创作更具吸引力和表现力的照片。
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：构图规则列表 */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
          <h3 className="text-lg font-semibold mb-4">构图规则</h3>
          
          <div className="space-y-3">
            {compositionRules.map((rule) => (
              <button
                key={rule.id}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  activeRule === rule.id 
                    ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 shadow-md' 
                    : completedRules.includes(rule.id)
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleRuleClick(rule.id)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{rule.name}</h4>
                  {completedRules.includes(rule.id) && (
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* 学习进度 */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              学习进度 ({completedRules.length}/{compositionRules.length})
            </h4>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500 ease-out"
                style={{ width: `${(completedRules.length / compositionRules.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* 右侧：构图示例和交互区 */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* 图片展示区 */}
            <div className="relative w-full h-[400px]">
              <div className="relative w-full h-full">
                <Image
                  src={sampleImages[selectedImage].src}
                  alt={sampleImages[selectedImage].alt}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* 构图辅助线覆盖层 */}
                {showOverlay && (
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-10 pointer-events-none"
                  />
                )}
              </div>
              
              {/* 最佳构图规则提示 */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-2 rounded-lg">
                适用构图: {sampleImages[selectedImage].bestRules.map(ruleId => {
                  const rule = compositionRules.find(r => r.id === ruleId);
                  return rule ? rule.name : '';
                }).join(', ')}
              </div>
            </div>
            
            {/* 图片选择器 */}
            <div className="flex p-2 bg-gray-100 dark:bg-gray-900">
              {sampleImages.map((image, index) => (
                <button
                  key={index}
                  className={`flex-1 p-1 ${selectedImage === index ? 'opacity-100 ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'}`}
                  onClick={() => handleImageChange(index)}
                >
                  <div className="relative w-full h-20">
                    <Image
                      src={image.src}
                      alt={`缩略图 ${index + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* 规则说明 */}
          {activeRule && (
            <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-medium mb-2">
                {compositionRules.find(r => r.id === activeRule)?.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {compositionRules.find(r => r.id === activeRule)?.description}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => setShowOverlay(!showOverlay)}
                >
                  {showOverlay ? '隐藏辅助线' : '显示辅助线'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 构图技巧总结 */}
      <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4">构图技巧总结</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">构图的基本原则</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>平衡</strong>：画面中的视觉元素分布应保持平衡，可以是对称平衡或非对称平衡</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>简洁</strong>：去除无关元素，突出主题，避免画面过于复杂</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>对比</strong>：利用色彩、大小、形状的对比增强视觉冲击力</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>节奏</strong>：通过重复元素创造视觉节奏和韵律感</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">构图常见错误</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>主体过于居中，缺乏视觉张力</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>地平线不水平，造成画面倾斜感</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>画面过于杂乱，缺乏明确主体</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>主体被背景元素干扰，缺乏层次感</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>关键元素被裁切或位于边缘位置</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 知识检测部分 */}
      {showQuiz && renderQuiz()}
      
      {completedRules.length === compositionRules.length && !showQuiz && onComplete && (
        <div className="mt-8 text-center">
          <button 
            onClick={() => setShowQuiz(true)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition-colors"
          >
            开始知识检测
          </button>
        </div>
      )}
    </div>
  );
}