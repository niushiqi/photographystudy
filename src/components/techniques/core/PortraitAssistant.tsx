"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { HiOutlineCamera, HiAdjustments, HiLightBulb, HiOutlineUserGroup, HiOutlineLightBulb } from 'react-icons/hi';

interface PortraitAssistantProps {
  posingSuggestions?: boolean;
  lightingDiagrams?: boolean;
  interactionTechniquesEnabled?: boolean;
  environmentalOptions?: string[];
  subjectTypes?: string[];
}

const PortraitAssistant: React.FC<PortraitAssistantProps> = ({
  posingSuggestions = true,
  lightingDiagrams = true,
  interactionTechniquesEnabled = true,
  environmentalOptions = ["indoor", "outdoor", "studio"],
  subjectTypes = ["individual", "couple", "group"]
}) => {
  const [environment, setEnvironment] = useState(environmentalOptions[0]);
  const [subjectType, setSubjectType] = useState(subjectTypes[0]);
  const [activeTab, setActiveTab] = useState('posing');
  
  // 不同场景下的姿势建议
  const posingGuides: any = {
    "indoor": {
      "individual": [
        {
          title: "窗边自然光",
          description: "让被摄者站在窗户旁边，侧光可以创造出优美的轮廓和柔和的阴影。",
          tips: "请被摄者稍微侧对窗户，不要直接面向窗户。",
          image: "https://images.unsplash.com/photo-1600951525338-2eeff35f0431?q=80&w=1000"
        },
        {
          title: "靠墙随意姿势",
          description: "靠在墙边，一只脚抵在墙上，手可以自然下垂或插在口袋里。",
          tips: "确保姿势看起来舒适，不要过分紧张。",
          image: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2ebc5?q=80&w=1000"
        },
        {
          title: "坐姿构图",
          description: "在椅子上采取放松自然的姿势，可以交叉腿或者将手放在膝盖上。",
          tips: "鼓励被摄者微微前倾，这样看起来更加投入。",
          image: "https://images.unsplash.com/photo-1590075865003-e48277faa558?q=80&w=1000"
        }
      ],
      "couple": [
        {
          title: "亲密互动",
          description: "一方从后方轻轻拥抱另一方，两人可以微笑对视或看向同一方向。",
          tips: "保持自然的接触，不要看起来僵硬或做作。",
          image: "https://images.unsplash.com/photo-1537261131936-3cdff36a1ac9?q=80&w=1000"
        },
        {
          title: "沙发休闲",
          description: "一起坐在沙发上，可以依偎在一起或保持适当距离但有互动。",
          tips: "可以让一人略微转向另一人，创造更有趣的构图。",
          image: "https://images.unsplash.com/photo-1519671482248-d2c40988a24d?q=80&w=1000"
        }
      ],
      "group": [
        {
          title: "层次排列",
          description: "在楼梯或不同高度的家具上创建多层次的构图，让人物在不同高度排列。",
          tips: "尝试让大家互相靠近，而不是均匀分布。分组排列通常看起来更自然。",
          image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1000"
        },
        {
          title: "围坐交流",
          description: "围绕餐桌或茶几自然交流，捕捉真实的互动瞬间。",
          tips: "不要让所有人都看向相机，保留一些自然交流的感觉。",
          image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000"
        }
      ]
    },
    "outdoor": {
      "individual": [
        {
          title: "自然环境站姿",
          description: "站在树木、花丛或风景前，采取轻松自然的站姿。",
          tips: "请被摄者将重心放在一条腿上，另一条腿稍微弯曲，避免直直站立。",
          image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1000"
        },
        {
          title: "坐姿地景",
          description: "坐在草地、台阶或低墙上，可以交叉腿或自然伸展。",
          tips: "手臂可以支撑身体或放在膝盖上，避免尴尬地不知道手该放在哪里。",
          image: "https://images.unsplash.com/photo-1506795660198-e95c77602129?q=80&w=1000"
        }
      ],
      "couple": [
        {
          title: "散步互动",
          description: "捕捉两人自然散步的画面，牵手或手臂互相挽着。",
          tips: "可以请他们边走边交谈，捕捉自然笑容和互动。",
          image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1000"
        },
        {
          title: "依靠姿势",
          description: "一方靠在树上或墙上，另一方依偎在其肩膀或胸前。",
          tips: "尝试不同角度拍摄同一姿势，从侧面拍摄通常效果更好。",
          image: "https://images.unsplash.com/photo-1560180474-e8563fd75bab?q=80&w=1000"
        }
      ],
      "group": [
        {
          title: "线性排列",
          description: "沿着海滩、小路或栏杆线性排列，可以并排或交错站立。",
          tips: "让身高相近的人站在一起，创造更和谐的视觉线条。",
          image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000"
        },
        {
          title: "活动互动",
          description: "捕捉大家一起参与活动的自然瞬间，如野餐、游戏等。",
          tips: "不要强求所有人都看向相机，自然的互动更能展现群体的关系。",
          image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000"
        }
      ]
    },
    "studio": {
      "individual": [
        {
          title: "经典肖像姿势",
          description: "身体略微转向45度，下巴稍微抬起，眼睛看向相机。",
          tips: "请模特将重心放在后腿上，前腿弯曲，这样看起来更有曲线美。",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
        },
        {
          title: "坐姿特写",
          description: "坐在高脚凳上，可以双手交叉或放在膝盖上，背部保持挺直。",
          tips: "建议被摄者身体稍微前倾，这样会显得更加投入和专注。",
          image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=1000"
        }
      ],
      "couple": [
        {
          title: "背靠背姿势",
          description: "两人背靠背站立，可以回头相视或各自看向不同方向。",
          tips: "尝试让两人身高差异形成有趣的构图，可以让一人坐在高脚凳上。",
          image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1000"
        },
        {
          title: "坐姿互动",
          description: "一人坐在椅子上，另一人站在旁边或靠在椅背上。",
          tips: "创造高低差，避免两人头部在同一水平线上。",
          image: "https://images.unsplash.com/photo-1484981138541-3d074aa97716?q=80&w=1000"
        }
      ],
      "group": [
        {
          title: "三角形构图",
          description: "将人物安排成三角形或金字塔构图，有些人坐着，有些人站着。",
          tips: "尽量避免一排排列，而是创造有层次的分组。",
          image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1000"
        },
        {
          title: "紧凑分组",
          description: "让大家靠得更紧密，创造亲密的感觉，可以互相搭肩或搂腰。",
          tips: "较高的人可以站在后排，矮一些的人在前排，确保所有人的脸都清晰可见。",
          image: "https://images.unsplash.com/photo-1522154715122-b635ae81474e?q=80&w=1000"
        }
      ]
    }
  };

  // 光线设置指南
  const lightingGuides: any = {
    "indoor": [
      {
        title: "窗光人像",
        description: "利用窗户的自然光作为主光源，可以在对面使用反光板填充阴影。",
        diagram: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000",
        settings: "相机设置: f/2.8-4, 1/60-1/125s, ISO 400-800",
        examples: "https://images.unsplash.com/photo-1542513217-0b0eedf7005d?q=80&w=1000"
      },
      {
        title: "室内人造光",
        description: "使用一个主灯（可以是闪光灯或持续光）在45度角照射，另一侧使用反光板。",
        diagram: "https://images.unsplash.com/photo-1610015071478-1eaae4daa3d7?q=80&w=1000",
        settings: "相机设置: f/4-5.6, 1/125-1/200s, ISO 200-400",
        examples: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1000"
      }
    ],
    "outdoor": [
      {
        title: "黄金时段光线",
        description: "在日出或日落时分拍摄，利用温暖的侧光创造立体感。",
        diagram: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?q=80&w=1000",
        settings: "相机设置: f/2.8-4, 1/125-1/250s, ISO 100-200",
        examples: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000"
      },
      {
        title: "阴影下的柔光",
        description: "在明亮天气下寻找树荫或建筑阴影，避免刺眼的阳光和硬阴影。",
        diagram: "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?q=80&w=1000",
        settings: "相机设置: f/2-2.8, 1/250-1/500s, ISO 100-200",
        examples: "https://images.unsplash.com/photo-1504203772830-87fba72385ee?q=80&w=1000"
      },
      {
        title: "闪光灯填充",
        description: "在强烈阳光下使用闪光灯填充面部阴影，平衡光比。",
        diagram: "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?q=80&w=1000",
        settings: "相机设置: f/4-5.6, 1/200s, ISO 100, 闪光灯功率1/2-1/4",
        examples: "https://images.unsplash.com/photo-1506439906550-c3c6a61a8c22?q=80&w=1000"
      }
    ],
    "studio": [
      {
        title: "蝴蝶光",
        description: "主光源直接放在被摄者前方略高的位置，在鼻子下方产生蝴蝶形状的阴影。",
        diagram: "https://images.unsplash.com/photo-1610015071478-1eaae4daa3d7?q=80&w=1000",
        settings: "主灯功率: 1/2, 环境光: 1/16, 相机设置: f/8, 1/125s, ISO 100",
        examples: "https://images.unsplash.com/photo-1500336624523-d727130c3328?q=80&w=1000"
      },
      {
        title: "雷姆布兰特光",
        description: "主光源位于被摄者一侧45度角，创造出一侧面部的三角形亮区。",
        diagram: "https://images.unsplash.com/photo-1616712134411-6b6ae89bc3ba?q=80&w=1000",
        settings: "主灯功率: 3/4, 背景光: 1/8, 相机设置: f/5.6, 1/160s, ISO 100",
        examples: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000"
      },
      {
        title: "分割光",
        description: "主光源放置在被摄者侧面90度角，只照亮一半脸部，创造戏剧性效果。",
        diagram: "https://images.unsplash.com/photo-1589245563691-334ab1799346?q=80&w=1000",
        settings: "主灯功率: 1/1, 反光板: 银色, 相机设置: f/5.6, 1/125s, ISO 100",
        examples: "https://images.unsplash.com/photo-1504879073873-4a75ea265b34?q=80&w=1000"
      }
    ]
  };

  // 互动技巧
  const interactionTechniquesList = [
    {
      title: "自然对话",
      description: "与被摄者进行轻松的交谈，询问他们感兴趣的话题，捕捉真实表情。",
      tips: "尽量避免让被摄者回答是/否的问题，鼓励他们分享故事和经历。",
      suitable: ["individual", "couple", "group"]
    },
    {
      title: "动态引导",
      description: "给予简单的动作指引，如慢慢走过来、轻轻转身、看着对方微笑。",
      tips: "使用示范而不是口头描述，亲自展示你想要的姿势或动作。",
      suitable: ["individual", "couple"]
    },
    {
      title: "情境创设",
      description: "创造特定情境，如\"想象你刚收到好消息\"或\"假装你们正在讲一个笑话\"。",
      tips: "针对不同年龄和性格调整指引方式，对孩子可以更加游戏化。",
      suitable: ["individual", "couple", "group"]
    },
    {
      title: "细节关注",
      description: "引导被摄者注意小细节，如手的位置、肩膀放松、微微抬头等。",
      tips: "一次只调整一个细节，避免让被摄者感到压力过大而表情僵硬。",
      suitable: ["individual"]
    },
    {
      title: "互动游戏",
      description: "让被摄者玩简单的游戏或互动，如耳语秘密、背靠背转身等。",
      tips: "这种技巧特别适合情侣和家庭照，能捕捉到真实的情感连接。",
      suitable: ["couple", "group"]
    }
  ];

  // 获取当前环境和主体类型的姿势建议
  const currentPosingGuides = posingGuides[environment][subjectType];
  
  // 获取当前环境的光线设置
  const currentLightingGuides = lightingGuides[environment];
  
  // 获取适合当前主体类型的互动技巧
  const filteredInteractionTechniques = interactionTechniquesList.filter(
    technique => technique.suitable.includes(subjectType as string)
  );

  // 环境选项的中文映射
  const envTranslations: { [key: string]: string } = {
    "indoor": "室内",
    "outdoor": "户外",
    "studio": "工作室"
  };

  // 主体类型的中文映射
  const subjectTranslations: { [key: string]: string } = {
    "individual": "单人",
    "couple": "双人",
    "group": "团体"
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
      {/* 顶部导航和选项 */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-800 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">人像拍摄助手</h2>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
            <div>
              <label className="block text-gray-300 text-sm mb-2">拍摄环境</label>
              <div className="flex space-x-2">
                {environmentalOptions.map((env) => (
                  <button
                    key={env}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      environment === env 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => setEnvironment(env)}
                  >
                    {envTranslations[env]}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-2">拍摄主体</label>
              <div className="flex space-x-2">
                {subjectTypes.map((type) => (
                  <button
                    key={type}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      subjectType === type 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => setSubjectType(type)}
                  >
                    {subjectTranslations[type]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 选项卡导航 */}
      <div className="bg-gray-800 px-6 py-3 flex border-b border-gray-700">
        {posingSuggestions && (
          <button
            className={`mr-6 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'posing'
                ? 'text-blue-400 border-blue-400'
                : 'text-gray-400 border-transparent hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('posing')}
          >
            <HiOutlineCamera className="inline-block mr-1" />
            姿势指南
          </button>
        )}
        
        {lightingDiagrams && (
          <button
            className={`mr-6 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'lighting'
                ? 'text-blue-400 border-blue-400'
                : 'text-gray-400 border-transparent hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('lighting')}
          >
            <HiAdjustments className="inline-block mr-1" />
            光线设置
          </button>
        )}
        
        {interactionTechniquesEnabled && (
          <button
            className={`py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'interaction'
                ? 'text-blue-400 border-blue-400'
                : 'text-gray-400 border-transparent hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('interaction')}
          >
            <HiOutlineUserGroup className="inline-block mr-1" />
            互动技巧
          </button>
        )}
      </div>

      {/* 内容区域 */}
      <div className="p-6">
        {/* 姿势建议内容 */}
        {activeTab === 'posing' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {envTranslations[environment]} {subjectTranslations[subjectType]} 姿势指南
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentPosingGuides.map((pose: any, index: number) => (
                <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image 
                      src={pose.image} 
                      alt={pose.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-medium mb-2">{pose.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{pose.description}</p>
                    <div className="bg-blue-900/20 p-3 rounded">
                      <div className="flex items-start">
                        <HiLightBulb className="text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">{pose.tips}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 光线设置内容 */}
        {activeTab === 'lighting' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {envTranslations[environment]} 光线设置指南
            </h3>
            
            <div className="space-y-6">
              {currentLightingGuides.map((guide: any, index: number) => (
                <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <div className="relative h-48 md:h-full">
                        <Image 
                          src={guide.diagram} 
                          alt={guide.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 md:w-1/2">
                      <h4 className="text-white font-medium mb-2">{guide.title}</h4>
                      <p className="text-gray-400 text-sm mb-4">{guide.description}</p>
                      
                      <div className="bg-blue-900/20 p-3 rounded mb-4">
                        <p className="text-blue-300 text-sm">{guide.settings}</p>
                      </div>
                      
                      <h5 className="text-gray-300 text-sm mb-2">示例效果:</h5>
                      <div className="relative h-32 rounded overflow-hidden">
                        <Image 
                          src={guide.examples} 
                          alt={`${guide.title} 示例`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 互动技巧内容 */}
        {activeTab === 'interaction' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {subjectTranslations[subjectType]} 互动技巧
            </h3>
            
            <div className="space-y-4">
              {filteredInteractionTechniques.map((technique, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-purple-900/40 p-2 rounded-full mr-4 flex-shrink-0">
                      <HiOutlineLightBulb className="text-purple-400 text-xl" />
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-1">{technique.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{technique.description}</p>
                      
                      <div className="bg-purple-900/20 p-3 rounded">
                        <p className="text-gray-300 text-sm">
                          <span className="text-purple-400 font-medium">专业提示:</span> {technique.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-start">
                <HiLightBulb className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-2">拍摄过程中记住</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• 先建立融洽关系，再开始专业指导</li>
                    <li>• 不断给予正面反馈，增强被摄者的自信</li>
                    <li>• 展示一些成功的照片，让被摄者了解自己的最佳角度</li>
                    <li>• 保持轻松愉快的氛围，有助于捕捉自然表情</li>
                    <li>• 对不同性格的人采取不同的沟通方式</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部提示区 */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <p className="text-center text-gray-400 text-sm">
          提示: 这些只是指南和建议，最重要的是根据被摄主体的个性和舒适度来调整拍摄方式。
        </p>
      </div>
    </div>
  );
};

export default PortraitAssistant; 