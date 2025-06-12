"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type CameraBasicsProps = {
  onComplete?: () => void;
};

const CameraBasics = ({ onComplete }: CameraBasicsProps) => {
  const [activePart, setActivePart] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [learnedParts, setLearnedParts] = useState<string[]>([]);
  const [showCompletionButton, setShowCompletionButton] = useState(false);
  
  const cameraParts = [
    {
      id: 'sensor',
      name: '传感器',
      position: { top: '50%', left: '50%' },
      description: '相机的核心部件，负责捕捉光线并转换为数字信号。类似于传统胶片的角色，但可以即时查看拍摄结果。传感器尺寸影响画质、噪点控制和景深表现。',
    },
    {
      id: 'shutter',
      name: '快门',
      position: { top: '35%', left: '45%' },
      description: '控制光线进入相机的时间长短。快门速度越快，捕捉的瞬间越短，适合拍摄运动物体；快门速度越慢，光线进入越多，适合弱光环境或创造动态效果。',
    },
    {
      id: 'aperture',
      name: '光圈',
      position: { top: '35%', left: '25%' },
      description: '控制进光量的大小，同时影响景深。光圈越大（如f/1.8），景深越浅，主体越突出；光圈越小（如f/16），景深越深，画面整体清晰度更高。',
    },
    {
      id: 'viewfinder',
      name: '取景器',
      position: { top: '20%', left: '60%' },
      description: '摄影师通过取景器构图和观察场景。光学取景器直接反映镜头所见，电子取景器则显示传感器捕捉的实时图像，可预览曝光效果。',
    },
    {
      id: 'lens',
      name: '镜头',
      position: { top: '45%', left: '15%' },
      description: '决定相机成像的关键部件，不同焦距和光圈的镜头有不同的用途。广角镜头适合风景，长焦镜头适合人像和野生动物，微距镜头适合特写。',
    }
  ];
  
  // 知识检测问题
  const quizQuestions = [
    {
      id: 'q1',
      question: '相机传感器的主要功能是什么？',
      options: [
        '控制相机的对焦速度',
        '捕捉光线并转换为数字信号',
        '调节进入相机的光线量',
        '控制相机的快门速度'
      ],
      correctAnswer: '捕捉光线并转换为数字信号'
    },
    {
      id: 'q2',
      question: '大光圈（如f/1.8）会产生什么效果？',
      options: [
        '更深的景深，整体画面清晰',
        '更浅的景深，主体突出背景模糊',
        '更快的快门速度',
        '更高的ISO值'
      ],
      correctAnswer: '更浅的景深，主体突出背景模糊'
    },
    {
      id: 'q3',
      question: '以下哪种相机类型没有反光镜系统？',
      options: [
        '单反相机',
        '无反相机',
        '中画幅相机',
        '胶片相机'
      ],
      correctAnswer: '无反相机'
    }
  ];
  
  useEffect(() => {
    // 图片预加载完成后设置状态
    const img = new window.Image();
    img.src = '/images/basics/camera-diagram.jpg';
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsImageError(true);
  }, []);
  
  // 检查是否所有部件都已学习
  useEffect(() => {
    if (cameraParts.every(part => learnedParts.includes(part.id))) {
      setShowCompletionButton(true);
    }
  }, [learnedParts]);
  
  // 处理部件点击
  const handlePartClick = (partId: string) => {
    setActivePart(partId);
    if (!learnedParts.includes(partId)) {
      setLearnedParts([...learnedParts, partId]);
    }
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
          知识检测
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
                ? '恭喜！你已掌握相机基础知识。' 
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
        <h2 className="text-2xl font-bold mb-4">相机基础知识</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          了解相机的基本构造和工作原理，是摄影学习的第一步。相机通过镜头收集光线，经过光圈控制，由快门决定曝光时间，最后在传感器上成像。
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative md:w-1/2 h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
          {/* 相机示意图 */}
          {isLoaded ? (
            <div className="relative w-full h-full">
              <Image
                src="/images/basics/camera-diagram.jpg"
                fill
                alt="相机结构图"
                className="object-contain"
                priority
              />
              
              {/* 热点标记 */}
              {cameraParts.map((part) => (
                <div 
                  key={part.id}
                  className={`absolute cursor-pointer w-8 h-8 rounded-full border-2 flex items-center justify-center
                    ${activePart === part.id 
                      ? 'bg-blue-500 border-white text-white scale-125 z-20 shadow-lg' 
                      : learnedParts.includes(part.id)
                        ? 'bg-green-500 border-white/70 text-white hover:bg-green-600 hover:scale-110 transition-all'
                        : 'bg-blue-400/80 border-white/70 text-white hover:bg-blue-500 hover:scale-110 transition-all'}`}
                  style={{
                    top: part.position.top,
                    left: part.position.left,
                    transform: 'translate(-50%, -50%)',
                    animation: learnedParts.includes(part.id) && activePart !== part.id 
                      ? 'pulse 2s infinite' 
                      : 'none'
                  }}
                  onClick={() => handlePartClick(part.id)}
                >
                  <span className="text-xs font-bold">{part.id.charAt(0).toUpperCase()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              {isImageError ? (
                <div className="text-center px-4">
                  <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-gray-500">图片加载失败，请检查图片路径</p>
                  <p className="text-gray-400 text-sm mt-2">应存在于: /public/images/basics/camera-diagram.jpg</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-500">加载相机交互图...</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="md:w-1/2">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md h-full">
            {activePart ? (
              <div className="h-full flex flex-col">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 text-sm">
                    {activePart.charAt(0).toUpperCase()}
                  </span>
                  {cameraParts.find(part => part.id === activePart)?.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {cameraParts.find(part => part.id === activePart)?.description}
                </p>
                <div className="mt-auto pt-6 flex justify-between items-center">
                  <button 
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    onClick={() => setActivePart(null)}
                  >
                    返回总览
                  </button>
                  
                  {learnedParts.includes(activePart) && (
                    <div className="flex items-center text-green-500 text-sm">
                      <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      已学习
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-4">相机部件和功能</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  点击左侧相机图中的标记点，了解各个部件的功能和作用。相机的核心部件协同工作，形成完整的成像系统。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  {cameraParts.map(part => (
                    <button
                      key={part.id}
                      className={`text-left p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center space-x-3 ${
                        learnedParts.includes(part.id) 
                          ? 'bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800' 
                          : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => handlePartClick(part.id)}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        learnedParts.includes(part.id) 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                      }`}>
                        <span className="font-semibold">{part.id.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{part.name}</h4>
                        {learnedParts.includes(part.id) && (
                          <span className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            已学习
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {showCompletionButton && !showQuiz && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md"
                    >
                      开始知识检测
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl">
        <h3 className="text-2xl font-semibold mb-6">相机类型</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-medium mb-3">单反相机 (DSLR)</h4>
            <p className="text-gray-700 dark:text-gray-300">
              使用反光镜系统将光线反射到光学取景器中。拍摄时反光镜抬起，让光线到达传感器。优点是光学取景器直观，对焦系统成熟，缺点是体积较大。
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">代表品牌：</span>
              <span className="text-sm text-gray-600 dark:text-gray-400"> 佳能 EOS、尼康 D 系列</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-xl font-medium mb-3">无反相机 (Mirrorless)</h4>
            <p className="text-gray-700 dark:text-gray-300">
              没有反光镜系统，光线直接到达传感器，通过电子取景器显示图像。体积更小巧，静音性好，视频性能优秀，是当前相机发展的主流方向。
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">代表品牌：</span>
              <span className="text-sm text-gray-600 dark:text-gray-400"> 索尼 α、佳能 EOS R、尼康 Z</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </div>
            <h4 className="text-xl font-medium mb-3">便携相机</h4>
            <p className="text-gray-700 dark:text-gray-300">
              包括卡片机和高级便携相机，镜头固定无法更换，体积小巧便于携带。适合日常记录和旅行，但在画质和操控性上有局限。
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-green-600 dark:text-green-400">代表品牌：</span>
              <span className="text-sm text-gray-600 dark:text-gray-400"> 索尼 RX、富士 X100</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 知识检测部分 */}
      {showQuiz && renderQuiz()}
      
      {!showQuiz && onComplete && showCompletionButton && (
        <div className="mt-8 text-center">
          <button 
            onClick={onComplete}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition-colors"
          >
            完成学习
          </button>
        </div>
      )}
      
      {/* 添加CSS动画 */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
          }
          
          70% {
            transform: translate(-50%, -50%) scale(1.1);
            box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
          }
          
          100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default CameraBasics; 