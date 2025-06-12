import React, { useState } from 'react';
import Image from 'next/image';
import { HiOutlinePhotograph, HiUpload, HiX, HiCheck, HiExclamation, HiLightBulb } from 'react-icons/hi';

interface ShootingTroubleshooterProps {
  problemCategories?: string[];
  analyzeExampleImages?: boolean;
  provideSolutions?: boolean;
  preventionTips?: boolean;
}

const ShootingTroubleshooter: React.FC<ShootingTroubleshooterProps> = ({
  problemCategories = ["focus", "exposure", "composition", "lighting", "motion"],
  analyzeExampleImages = true,
  provideSolutions = true,
  preventionTips = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState('focus');
  const [showExamples, setShowExamples] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  
  // 问题类别的中文映射
  const categoryTranslations: { [key: string]: string } = {
    "focus": "对焦问题",
    "exposure": "曝光问题",
    "composition": "构图问题",
    "lighting": "光线问题",
    "motion": "运动与模糊"
  };

  // 示例问题及解决方案数据
  const problemsData = {
    "focus": [
      {
        title: "不准确的对焦点",
        description: "相机对焦在错误的位置，导致主体模糊而其他区域清晰。",
        causes: [
          "自动对焦选择了错误的对焦点",
          "在浅景深下没有准确对焦在主体的关键部位",
          "在对焦后重新构图导致焦平面偏移"
        ],
        solutions: [
          "使用单点对焦模式，手动选择对焦点",
          "人像类拍摄始终对焦在眼睛上",
          "使用背键对焦或对焦后锁定再构图",
          "缩小光圈增加景深，提高容错率"
        ],
        prevention: [
          "拍摄前确认对焦模式并选择合适的对焦点",
          "拍摄后放大查看照片确认对焦准确性",
          "重要场景拍摄多张以保证至少有一张对焦准确"
        ],
        exampleImage: "https://images.unsplash.com/photo-1596025821084-11259c48c664?q=80&w=1000",
        solutionImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1000"
      },
      {
        title: "全局模糊",
        description: "整个图像都不清晰，没有明确的对焦点。",
        causes: [
          "相机抖动导致的运动模糊",
          "自动对焦失败，未能锁定任何对焦点",
          "镜头前有污渍或雾气影响清晰度"
        ],
        solutions: [
          "使用更快的快门速度（至少1/焦距）",
          "使用三脚架或影像稳定技术",
          "在明亮的环境中重新尝试自动对焦",
          "检查并清洁镜头表面"
        ],
        prevention: [
          "低光环境使用三脚架和自拍延时",
          "保持正确的持相机姿势减少抖动",
          "定期清洁镜头和传感器"
        ],
        exampleImage: "https://images.unsplash.com/photo-1555610070-872e8caa9e84?q=80&w=1000",
        solutionImage: "https://images.unsplash.com/photo-1493493641787-8aecaee2ec75?q=80&w=1000"
      }
    ],
    "exposure": [
      {
        title: "过度曝光",
        description: "图像过亮，高光区域细节丢失，呈现为纯白色。",
        causes: [
          "相机测光系统受背光或高对比度场景干扰",
          "错误的曝光补偿设置",
          "在明亮环境下使用光圈优先模式时未注意快门速度过低"
        ],
        solutions: [
          "使用曝光补偿调低曝光值（-1至-2EV）",
          "切换到点测光或中央重点测光模式",
          "使用包围曝光（AEB）拍摄多张不同曝光的照片",
          "后期处理时尝试恢复高光细节"
        ],
        prevention: [
          "学习使用相机直方图查看曝光情况",
          "在强光环境下检查LCD预览的亮度",
          "对于高对比度场景考虑HDR技术"
        ],
        exampleImage: "https://images.unsplash.com/photo-1587397845856-e6cf49176c80?q=80&w=1000",
        solutionImage: "https://images.unsplash.com/photo-1618656860270-65ca7967bb35?q=80&w=1000"
      },
      {
        title: "曝光不足",
        description: "图像过暗，暗部区域细节丢失，噪点明显。",
        causes: [
          "环境光线不足",
          "相机测光受明亮背景或对象影响",
          "低估了所需的曝光量"
        ],
        solutions: [
          "增加ISO感光度",
          "使用更大的光圈（更小的f值）",
          "降低快门速度（注意手持稳定性）",
          "使用补光设备如闪光灯或反光板",
          "后期处理时提亮暗部，但注意噪点控制"
        ],
        prevention: [
          "光线不足时考虑使用三脚架延长曝光时间",
          "熟悉相机高ISO表现，了解噪点可接受的限度",
          "考虑携带便携光源或反光设备"
        ],
        exampleImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000",
        solutionImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000"
      }
    ],
    "composition": [
      {
        title: "主体定位错误",
        description: "主体位置不当，过于居中或过于边缘，视觉平衡感差。",
        causes: [
          "缺乏构图意识，仅关注主体而忽略整体画面",
          "未应用基本构图规则如三分法",
          "未能识别画面中的视觉权重和平衡点"
        ],
        solutions: [
          "应用三分法则，将主体置于画面的交叉点",
          "考虑前景、中景和背景的关系",
          "留意主体的视线方向，通常应该留有前方空间",
          "后期裁剪调整构图（但会降低图像分辨率）"
        ],
        prevention: [
          "拍摄前在取景器中有意识地考虑构图",
          "开启相机的网格线辅助构图",
          "多角度拍摄同一主体，增加选择空间"
        ],
        exampleImage: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?q=80&w=1000",
        solutionImage: "https://images.unsplash.com/photo-1476673160081-cf065607f449?q=80&w=1000"
      },
      {
        title: "杂乱背景",
        description: "背景复杂混乱，分散对主体的注意力。",
        causes: [
          "拍摄时未注意背景元素",
          "光圈不够大，景深太深",
          "没有选择合适的拍摄角度隔离主体"
        ],
        solutions: [
          "使用更大的光圈创造浅景深",
          "改变拍摄位置和角度，寻找更干净的背景",
          "调整焦距，使用长焦压缩背景",
          "后期处理时适当模糊背景"
        ],
        prevention: [
          "拍摄前注意查看整个取景框，不仅仅是主体",
          "选择合适的拍摄时间，避开人群和杂乱环境",
          "考虑使用简单背景如天空、墙面等"
        ],
        exampleImage: "https://images.unsplash.com/photo-1597490106368-a7c0ed6b3ded?q=80&w=1000",
        solutionImage: "https://images.unsplash.com/photo-1550775574-ed19bec7c783?q=80&w=1000"
      }
    ],
    "lighting": [
      {
        title: "强烈对比度",
        description: "场景中明暗对比过大，导致部分区域过曝而部分区域欠曝。",
        causes: [
          "在强烈阳光下拍摄造成硬光源和深阴影",
          "相机动态范围无法同时记录最亮和最暗的细节",
          "测光模式不适合高对比度场景"
        ],
        solutions: [
          "使用填充闪光或反光板减少阴影",
          "等待光线条件改善（如云层散射阳光）",
          "使用HDR技术拍摄多张不同曝光并合成",
          "后期处理时降低高光提亮阴影，压缩动态范围"
        ],
        prevention: [
          "避免在正午阳光下拍摄人像",
          "选择黄金时段（日出日落前后）拍摄",
          "多用柔光源如窗光、反光伞等"
        ],
        exampleImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000",
        solutionImage: "https://images.unsplash.com/photo-1517241034903-9a4c3ab12f00?q=80&w=1000"
      },
      {
        title: "色彩偏移",
        description: "图像整体呈现不自然的色调，如过于偏黄或偏蓝。",
        causes: [
          "白平衡设置不正确",
          "混合光源环境（如室内灯光和窗外日光）",
          "特殊光源如荧光灯、LED灯导致的色偏"
        ],
        solutions: [
          "使用合适的白平衡预设（如阴天、荧光灯等）",
          "在拍摄前使用灰卡或白卡设置自定义白平衡",
          "拍摄RAW格式以便后期调整白平衡",
          "后期处理中使用色温和色调控制"
        ],
        prevention: [
          "了解不同光源的色温特性",
          "在复杂光线环境下定期检查白平衡",
          "拍摄重要场景时考虑手动设置白平衡"
        ],
        exampleImage: "https://images.unsplash.com/photo-1601991115814-b8740f0a9ea3?q=80&w=1000",
        solutionImage: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=1000"
      }
    ],
    "motion": [
      {
        title: "意外的运动模糊",
        description: "主体或整个图像因运动而模糊，非有意的创意效果。",
        causes: [
          "快门速度过慢，无法冻结主体运动",
          "相机抖动导致整体画面模糊",
          "自动模式下相机优先选择低快门速度而非提高ISO"
        ],
        solutions: [
          "提高快门速度（移动物体通常需要至少1/250秒）",
          "提高ISO以获得足够的曝光",
          "使用更大光圈增加入光量",
          "在弱光条件下使用闪光灯冻结动作"
        ],
        prevention: [
          "拍摄运动主体时优先考虑快门速度",
          "了解不同运动场景所需的最低快门速度",
          "使用相机的运动/体育模式自动优先快门速度"
        ],
        exampleImage: "https://images.unsplash.com/photo-1464983308776-3c7215084895?q=80&w=1000",
        solutionImage: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1000"
      },
      {
        title: "未能捕捉决定性瞬间",
        description: "错过了最佳的动作或表情瞬间，图像平淡无表现力。",
        causes: [
          "相机快门延迟",
          "连拍速度不足",
          "摄影师反应和预判不足"
        ],
        solutions: [
          "预先对焦并做好准备",
          "使用连拍模式增加捕捉关键瞬间的几率",
          "提前半按快门减少快门延迟",
          "使用更专业的相机设备减少快门延迟"
        ],
        prevention: [
          "了解并预测主体的行为模式",
          "提前设置好相机参数",
          "练习提高反应速度和时机判断"
        ],
        exampleImage: "https://images.unsplash.com/photo-1597910037310-7dd8ddb93e24?q=80&w=1000",
        solutionImage: "https://images.unsplash.com/photo-1564391305755-dddf9a7c1de7?q=80&w=1000"
      }
    ]
  };

  // 获取当前选择类别的问题数据
  const currentProblems = problemsData[selectedCategory as keyof typeof problemsData];
  
  // 模拟文件上传处理
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 实际应用中这里会处理真正的文件上传和图像分析
    // 此处仅作为示例UI展示
    if (e.target.files && e.target.files[0]) {
      setShowUpload(false); // 隐藏上传区，显示分析结果
      // 在真实应用中，这里会调用API分析图像
    }
  };
  
  // 模拟AI分析结果（实际应用中这将是后端分析的结果）
  const mockAnalysisResult = {
    category: "exposure",
    problem: "曝光不足",
    confidence: 87,
    recommendation: "考虑增加ISO或使用更大光圈，也可以在后期处理中提亮暗部。"
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-6">
        <h2 className="text-2xl font-bold text-white mb-2">拍摄问题诊断系统</h2>
        <p className="text-gray-300">
          分析常见拍摄问题，获取针对性解决方案和预防技巧
        </p>
        
        {analyzeExampleImages && (
          <div className="mt-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center transition-all mr-3"
              onClick={() => setShowUpload(!showUpload)}
            >
              <HiUpload className="mr-2" />
              上传照片进行分析
            </button>
            
            {showUpload && (
              <div className="mt-4 bg-gray-800/50 p-6 rounded-lg border border-dashed border-gray-600 text-center">
                <div className="mb-4 flex justify-center">
                  <HiOutlinePhotograph className="text-gray-400 text-5xl" />
                </div>
                <p className="text-gray-300 mb-4">
                  上传照片以获取专业分析和建议
                </p>
                <label className="cursor-pointer bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded inline-flex items-center">
                  <span>选择图片</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
                <p className="text-gray-400 text-xs mt-2">
                  支持 JPG, PNG 格式，最大 10MB
                </p>
              </div>
            )}
            
            {/* AI分析结果示例（实际应用中这里会显示真实分析结果） */}
            {!showUpload && mockAnalysisResult && (
              <div className="mt-4 bg-gray-800/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-medium">AI 分析结果</h3>
                    <p className="text-gray-300 text-sm">
                      检测到问题: <span className="text-red-400">{mockAnalysisResult.problem}</span> 
                      <span className="text-gray-400 text-xs ml-2">
                        (置信度: {mockAnalysisResult.confidence}%)
                      </span>
                    </p>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-gray-300"
                    onClick={() => setShowUpload(true)}
                  >
                    <HiX />
                  </button>
                </div>
                <div className="mt-3 bg-gray-700/50 p-3 rounded">
                  <p className="text-blue-300 text-sm">
                    <HiLightBulb className="inline-block mr-1" />
                    建议: {mockAnalysisResult.recommendation}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* 分类导航 */}
      <div className="bg-gray-800 p-4 overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-2">
          {problemCategories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {categoryTranslations[category]}
            </button>
          ))}
        </div>
      </div>
      
      {/* 问题内容区域 */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {categoryTranslations[selectedCategory]} 常见问题
          </h3>
          
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-3">示例图片</span>
            <button
              className={`relative w-10 h-5 transition-colors duration-200 rounded-full ${
                showExamples ? 'bg-blue-600' : 'bg-gray-600'
              }`}
              onClick={() => setShowExamples(!showExamples)}
            >
              <span 
                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${
                  showExamples ? 'translate-x-5' : ''
                }`} 
              />
            </button>
          </div>
        </div>
        
        <div className="space-y-8">
          {currentProblems.map((problem, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-6">
                <h4 className="text-lg font-medium text-white mb-2">{problem.title}</h4>
                <p className="text-gray-400 mb-4">{problem.description}</p>
                
                {/* 示例图片 */}
                {showExamples && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">问题示例:</p>
                      <div className="relative h-48 rounded overflow-hidden">
                        <Image 
                          src={problem.exampleImage} 
                          alt={`${problem.title} 问题示例`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-red-900/50 p-2">
                          <div className="flex items-center text-xs text-white">
                            <HiExclamation className="text-red-400 mr-1" />
                            问题图像
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-2">正确效果:</p>
                      <div className="relative h-48 rounded overflow-hidden">
                        <Image 
                          src={problem.solutionImage} 
                          alt={`${problem.title} 正确效果`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-green-900/50 p-2">
                          <div className="flex items-center text-xs text-white">
                            <HiCheck className="text-green-400 mr-1" />
                            正确效果
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 原因 */}
                <div className="mb-4">
                  <h5 className="text-white text-sm font-medium mb-2">可能的原因:</h5>
                  <ul className="space-y-1">
                    {problem.causes.map((cause, causeIdx) => (
                      <li key={causeIdx} className="text-gray-400 text-sm pl-4 relative">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* 解决方案 */}
                {provideSolutions && (
                  <div className="mb-4 bg-blue-900/20 rounded-lg p-4">
                    <h5 className="text-blue-300 font-medium mb-2">解决方案:</h5>
                    <ul className="space-y-1">
                      {problem.solutions.map((solution, solutionIdx) => (
                        <li key={solutionIdx} className="text-gray-300 text-sm flex">
                          <HiCheck className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* 预防建议 */}
                {preventionTips && (
                  <div className="bg-green-900/20 rounded-lg p-4">
                    <h5 className="text-green-300 font-medium mb-2">预防技巧:</h5>
                    <ul className="space-y-1">
                      {problem.prevention.map((tip, tipIdx) => (
                        <li key={tipIdx} className="text-gray-300 text-sm flex">
                          <HiLightBulb className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 底部提示区 */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <p className="text-center text-gray-400 text-sm">
          提示: 每位摄影师都会遇到这些问题，持续练习和学习是提高技术的最佳方式。
        </p>
      </div>
    </div>
  );
};

export default ShootingTroubleshooter; 