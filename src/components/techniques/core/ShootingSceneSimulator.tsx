import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HiSun, HiMoon, HiCloud, HiOutlineCamera, HiAdjustments, HiOutlineLightBulb, HiOutlineRefresh } from 'react-icons/hi';

interface ShootingSceneSimulatorProps {
  scene: string;
  environmentConditions?: string[];
  timeOfDay?: string[];
  interactiveControls?: boolean;
  parameterRecommendations?: boolean;
}

const ShootingSceneSimulator: React.FC<ShootingSceneSimulatorProps> = ({
  scene = "cityscape-sunset",
  environmentConditions = ["clear", "cloudy", "foggy"],
  timeOfDay = ["golden-hour", "blue-hour", "night"],
  interactiveControls = true,
  parameterRecommendations = true
}) => {
  // 状态管理
  const [currentCondition, setCurrentCondition] = useState(environmentConditions[0]);
  const [currentTime, setCurrentTime] = useState(timeOfDay[0]);
  const [aperture, setAperture] = useState(8);
  const [shutterSpeed, setShutterSpeed] = useState("1/125");
  const [iso, setIso] = useState(200);
  const [focusDistance, setFocusDistance] = useState("foreground"); // foreground, subject, infinity
  const [simulatedImage, setSimulatedImage] = useState("");
  const [isCameraSettingsOpen, setIsCameraSettingsOpen] = useState(false);

  // 场景数据映射
  const sceneData: { [key: string]: { title: string, description: string } } = {
    "cityscape-sunset": {
      title: "城市日落",
      description: "在黄昏时分拍摄城市天际线，捕捉建筑物与天空的辉煌过渡色彩。"
    },
    "mountain-landscape": {
      title: "山地风光",
      description: "拍摄壮观的山脉风光，展现自然的壮丽和宏伟。"
    },
    "street-night": {
      title: "夜晚街拍",
      description: "捕捉夜晚城市街道的氛围，霓虹灯和城市生活的缩影。"
    }
  };

  // 环境条件的中文映射
  const conditionTranslations: { [key: string]: string } = {
    "clear": "晴朗",
    "cloudy": "多云",
    "foggy": "雾天",
    "rainy": "雨天",
    "snowy": "雪天"
  };

  // 时间段的中文映射
  const timeTranslations: { [key: string]: string } = {
    "golden-hour": "黄金时段",
    "blue-hour": "蓝色时段",
    "midday": "正午",
    "night": "夜晚",
    "sunrise": "日出"
  };

  // 场景图片映射
  const sceneImages: { [key: string]: { [key: string]: { [key: string]: string } } } = {
    "cityscape-sunset": {
      "clear": {
        "golden-hour": "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=1770",
        "blue-hour": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1700",
        "night": "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1770"
      },
      "cloudy": {
        "golden-hour": "https://images.unsplash.com/photo-1428908799722-0a74e26ce7f6?q=80&w=1700",
        "blue-hour": "https://images.unsplash.com/photo-1523527615066-6397465b5056?q=80&w=1770",
        "night": "https://images.unsplash.com/photo-1572585170096-1ea394299914?q=80&w=1700"
      },
      "foggy": {
        "golden-hour": "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=1772",
        "blue-hour": "https://images.unsplash.com/photo-1533757704860-f4d9cd9f1c98?q=80&w=1700",
        "night": "https://images.unsplash.com/photo-1582850015463-394c45cff01d?q=80&w=1700"
      }
    }
  };

  // 根据场景和条件生成相机参数建议
  const getCameraRecommendations = (): { [key: string]: { value: string | number, recommendation: string } } => {
    const recommendations: { [key: string]: { value: string | number, recommendation: string } } = {};
    
    // 根据当前条件设置推荐值
    if (currentTime === "golden-hour") {
      if (currentCondition === "clear") {
        recommendations.aperture = { value: 11, recommendation: "使用较小光圈获得足够景深，捕捉清晰的城市景观。" };
        recommendations.shutterSpeed = { value: "1/125", recommendation: "中等快门速度保证画面清晰。" };
        recommendations.iso = { value: 100, recommendation: "使用最低ISO以获得最佳画质。" };
        recommendations.focusDistance = { value: "infinity", recommendation: "对焦于无限远，使整个景观清晰。" };
      } else if (currentCondition === "cloudy") {
        recommendations.aperture = { value: 8, recommendation: "中等光圈平衡景深和入光量。" };
        recommendations.shutterSpeed = { value: "1/60", recommendation: "降低快门速度补偿云层遮挡的光线。" };
        recommendations.iso = { value: 200, recommendation: "略微提高ISO补偿光线不足，但仍保持低噪点。" };
        recommendations.focusDistance = { value: "infinity", recommendation: "对焦于无限远，使整个景观清晰。" };
      } else if (currentCondition === "foggy") {
        recommendations.aperture = { value: 5.6, recommendation: "较大光圈增加入光量，弥补雾气造成的光线损失。" };
        recommendations.shutterSpeed = { value: "1/60", recommendation: "中低速快门捕捉足够光线。" };
        recommendations.iso = { value: 400, recommendation: "提高ISO以应对雾天光线不足的情况。" };
        recommendations.focusDistance = { value: "subject", recommendation: "聚焦于中景主体，让远景自然模糊，增加雾天氛围。" };
      }
    } else if (currentTime === "blue-hour") {
      if (currentCondition === "clear") {
        recommendations.aperture = { value: 8, recommendation: "中等光圈平衡入光量和景深。" };
        recommendations.shutterSpeed = { value: "1/15", recommendation: "较慢快门速度捕捉蓝调时分的微弱光线，考虑使用三脚架。" };
        recommendations.iso = { value: 400, recommendation: "适度提高ISO以应对光线不足。" };
        recommendations.focusDistance = { value: "infinity", recommendation: "对焦于无限远，捕捉整个城市景观。" };
      } else if (currentCondition === "cloudy") {
        recommendations.aperture = { value: 5.6, recommendation: "较大光圈增加入光量。" };
        recommendations.shutterSpeed = { value: "1/8", recommendation: "慢速快门捕捉更多光线，必须使用三脚架。" };
        recommendations.iso = { value: 800, recommendation: "提高ISO以应对阴天蓝调时分的低光条件。" };
        recommendations.focusDistance = { value: "infinity", recommendation: "对焦于无限远，捕捉整个城市景观。" };
      } else if (currentCondition === "foggy") {
        recommendations.aperture = { value: 4, recommendation: "大光圈最大限度增加入光量，雾气会自然产生朦胧效果。" };
        recommendations.shutterSpeed = { value: "1/4", recommendation: "很慢的快门速度捕捉雾中的微弱光线，必须使用三脚架。" };
        recommendations.iso = { value: 1600, recommendation: "明显提高ISO应对雾天蓝调时分的极低光线条件。" };
        recommendations.focusDistance = { value: "subject", recommendation: "聚焦于明显的中景元素，利用雾气创造层次感。" };
      }
    } else if (currentTime === "night") {
      if (currentCondition === "clear") {
        recommendations.aperture = { value: 2.8, recommendation: "大光圈收集更多光线，夜晚拍摄必备。" };
        recommendations.shutterSpeed = { value: "2\"", recommendation: "长曝光捕捉夜景光线，必须使用三脚架。" };
        recommendations.iso = { value: 1600, recommendation: "提高ISO平衡曝光，注意控制噪点。" };
        recommendations.focusDistance = { value: "infinity", recommendation: "对焦于无限远或城市灯光以保证景观清晰。" };
      } else if (currentCondition === "cloudy") {
        recommendations.aperture = { value: 2, recommendation: "尽可能大的光圈收集最多光线。" };
        recommendations.shutterSpeed = { value: "4\"", recommendation: "更长的曝光时间捕捉阴天夜景的微弱光线。" };
        recommendations.iso = { value: 3200, recommendation: "高ISO应对极低光条件，接受一定噪点以获得足够曝光。" };
        recommendations.focusDistance = { value: "infinity", recommendation: "对焦于最亮的城市灯光。" };
      } else if (currentCondition === "foggy") {
        recommendations.aperture = { value: 1.8, recommendation: "最大光圈收集尽可能多的光线。" };
        recommendations.shutterSpeed = { value: "8\"", recommendation: "极长曝光捕捉雾中夜景的散射光线。" };
        recommendations.iso = { value: 6400, recommendation: "极高ISO应对雾天夜景的特殊光线条件，后期可能需要降噪处理。" };
        recommendations.focusDistance = { value: "subject", recommendation: "对焦于雾中明亮的灯光或标志性建筑，创造朦胧梦幻效果。" };
      }
    }
    
    return recommendations;
  };

  // 当条件改变时更新模拟图像
  useEffect(() => {
    // 确保场景、条件和时间都有效
    if (
      scene in sceneImages && 
      currentCondition in sceneImages[scene] && 
      currentTime in sceneImages[scene][currentCondition]
    ) {
      setSimulatedImage(sceneImages[scene][currentCondition][currentTime]);
    } else {
      // 默认图像，以防映射中没有匹配的图片
      setSimulatedImage("https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=1770");
    }

    // 如果启用了参数推荐，则应用推荐的相机设置
    if (parameterRecommendations) {
      const recommendations = getCameraRecommendations();
      if (recommendations.aperture) setAperture(recommendations.aperture.value as number);
      if (recommendations.shutterSpeed) setShutterSpeed(recommendations.shutterSpeed.value as string);
      if (recommendations.iso) setIso(recommendations.iso.value as number);
      if (recommendations.focusDistance) setFocusDistance(recommendations.focusDistance.value as string);
    }
  }, [scene, currentCondition, currentTime]);

  // 渲染聚焦点指示器
  const renderFocusIndicator = () => {
    if (focusDistance === "foreground") {
      return (
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border-2 border-green-400 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
      );
    } else if (focusDistance === "subject") {
      return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-green-400 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
      );
    } else {
      return (
        <div className="absolute top-1/3 right-1/4 w-12 h-12 border-2 border-green-400 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
      );
    }
  };

  // 相机设置控制组件
  const CameraSettings = () => {
    const recommendations = getCameraRecommendations();
    
    return (
      <div className="p-4 bg-gray-850 rounded-lg border border-gray-700 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">相机参数设置</h3>
          {parameterRecommendations && (
            <button 
              onClick={() => {
                const recs = getCameraRecommendations();
                if (recs.aperture) setAperture(recs.aperture.value as number);
                if (recs.shutterSpeed) setShutterSpeed(recs.shutterSpeed.value as string);
                if (recs.iso) setIso(recs.iso.value as number);
                if (recs.focusDistance) setFocusDistance(recs.focusDistance.value as string);
              }}
              className="flex items-center text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors"
            >
              <HiOutlineRefresh className="mr-1" /> 应用推荐设置
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 光圈设置 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-300 text-sm">光圈值 (f/)</label>
              <span className="text-blue-400 font-medium">f/{aperture}</span>
            </div>
            <input 
              type="range" 
              min="1.4" 
              max="22" 
              step="0.1" 
              value={aperture}
              onChange={(e) => setAperture(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>大光圈 (景深浅)</span>
              <span>小光圈 (景深深)</span>
            </div>
            {recommendations.aperture && (
              <div className="mt-2 text-xs flex items-start">
                <HiOutlineLightBulb className="text-blue-400 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400">{recommendations.aperture.recommendation}</p>
              </div>
            )}
          </div>
          
          {/* 快门速度设置 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-300 text-sm">快门速度</label>
              <span className="text-blue-400 font-medium">{shutterSpeed}秒</span>
            </div>
            <select
              value={shutterSpeed}
              onChange={(e) => setShutterSpeed(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1/4000">1/4000秒</option>
              <option value="1/2000">1/2000秒</option>
              <option value="1/1000">1/1000秒</option>
              <option value="1/500">1/500秒</option>
              <option value="1/250">1/250秒</option>
              <option value="1/125">1/125秒</option>
              <option value="1/60">1/60秒</option>
              <option value="1/30">1/30秒</option>
              <option value="1/15">1/15秒</option>
              <option value="1/8">1/8秒</option>
              <option value="1/4">1/4秒</option>
              <option value="0.5">0.5秒</option>
              <option value="1">1秒</option>
              <option value="2">2秒</option>
              <option value="4">4秒</option>
              <option value="8">8秒</option>
              <option value="15">15秒</option>
              <option value="30">30秒</option>
            </select>
            {recommendations.shutterSpeed && (
              <div className="mt-2 text-xs flex items-start">
                <HiOutlineLightBulb className="text-blue-400 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400">{recommendations.shutterSpeed.recommendation}</p>
              </div>
            )}
          </div>
          
          {/* ISO设置 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-300 text-sm">ISO感光度</label>
              <span className="text-blue-400 font-medium">ISO {iso}</span>
            </div>
            <select
              value={iso}
              onChange={(e) => setIso(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="100">ISO 100</option>
              <option value="200">ISO 200</option>
              <option value="400">ISO 400</option>
              <option value="800">ISO 800</option>
              <option value="1600">ISO 1600</option>
              <option value="3200">ISO 3200</option>
              <option value="6400">ISO 6400</option>
            </select>
            {recommendations.iso && (
              <div className="mt-2 text-xs flex items-start">
                <HiOutlineLightBulb className="text-blue-400 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400">{recommendations.iso.recommendation}</p>
              </div>
            )}
          </div>
          
          {/* 对焦距离设置 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-300 text-sm">对焦点</label>
              <span className="text-blue-400 font-medium">
                {{
                  'foreground': '前景',
                  'subject': '主体',
                  'infinity': '远景'
                }[focusDistance]}
              </span>
            </div>
            <select
              value={focusDistance}
              onChange={(e) => setFocusDistance(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="foreground">前景</option>
              <option value="subject">主体</option>
              <option value="infinity">远景/无限远</option>
            </select>
            {recommendations.focusDistance && (
              <div className="mt-2 text-xs flex items-start">
                <HiOutlineLightBulb className="text-blue-400 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400">{recommendations.focusDistance.recommendation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
      {/* 顶部控制区 */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{sceneData[scene]?.title || "场景模拟器"}</h2>
            <p className="text-gray-300 mt-1">{sceneData[scene]?.description || "调整参数，查看不同环境条件下的拍摄效果"}</p>
          </div>

          {interactiveControls && (
            <button
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() => setIsCameraSettingsOpen(!isCameraSettingsOpen)}
            >
              <HiAdjustments className="mr-2" />
              相机设置
              <span className={`ml-1 transform transition-transform ${isCameraSettingsOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {/* 环境条件选择器 */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">环境条件</label>
            <div className="flex space-x-2">
              {environmentConditions.map((condition) => (
                <button
                  key={condition}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    currentCondition === condition
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setCurrentCondition(condition)}
                >
                  {conditionTranslations[condition]}
                </button>
              ))}
            </div>
          </div>

          {/* 时间选择器 */}
          <div className="ml-0 md:ml-6">
            <label className="block text-gray-300 text-sm mb-2">拍摄时段</label>
            <div className="flex space-x-2">
              {timeOfDay.map((time) => (
                <button
                  key={time}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition-all ${
                    currentTime === time
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setCurrentTime(time)}
                >
                  {time === 'golden-hour' && <HiSun className="mr-1.5" />}
                  {time === 'blue-hour' && <HiCloud className="mr-1.5" />}
                  {time === 'night' && <HiMoon className="mr-1.5" />}
                  {timeTranslations[time]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 相机设置控制面板 */}
      {interactiveControls && isCameraSettingsOpen && <CameraSettings />}

      {/* 模拟图像区域 */}
      <div className="relative">
        {simulatedImage ? (
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src={simulatedImage}
              alt={`${sceneData[scene]?.title} - ${conditionTranslations[currentCondition]} - ${timeTranslations[currentTime]}`}
              fill
              className="object-cover"
            />
            
            {/* 聚焦点指示器 */}
            {interactiveControls && renderFocusIndicator()}
            
            {/* 相机参数叠加显示 */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3 flex justify-between items-center">
              <div className="flex items-center">
                <HiOutlineCamera className="mr-1" />
                <span className="text-sm">
                  f/{aperture} | {shutterSpeed} | ISO {iso}
                </span>
              </div>
              <span className="text-sm text-gray-300">
                {conditionTranslations[currentCondition]} - {timeTranslations[currentTime]}
              </span>
            </div>
          </div>
        ) : (
          <div className="h-[400px] md:h-[500px] flex items-center justify-center bg-gray-800">
            <p className="text-gray-400">加载图像中...</p>
          </div>
        )}
      </div>

      {/* 底部拍摄建议 */}
      <div className="bg-gray-850 p-5 border-t border-gray-700">
        <h3 className="text-lg font-medium text-white mb-3 flex items-center">
          <HiOutlineLightBulb className="mr-2 text-yellow-400" />
          拍摄建议
        </h3>
        
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h4 className="text-blue-400 font-medium mb-2">最佳拍摄技巧</h4>
          {currentTime === "golden-hour" && currentCondition === "clear" && (
            <p className="text-gray-300 text-sm">
              黄金时段的城市拍摄可以利用温暖的侧光创造生动的阴影和高光。尝试找一个高点俯瞰城市，捕捉建筑物被黄金色光线照亮的瞬间。使用偏振镜可以增强天空的蔚蓝色和建筑物的色彩。
            </p>
          )}
          {currentTime === "golden-hour" && currentCondition === "cloudy" && (
            <p className="text-gray-300 text-sm">
              阴天的黄金时段提供柔和均匀的光线，非常适合捕捉城市的细节和纹理。云层会散射光线，减少硬阴影，创造出更均匀的照明效果。尝试包含一些云层作为构图元素，增加天空的戏剧性。
            </p>
          )}
          {currentTime === "golden-hour" && currentCondition === "foggy" && (
            <p className="text-gray-300 text-sm">
              雾天的黄金时段创造出梦幻般的氛围，高层建筑穿透雾气的画面尤为壮观。尝试将明亮的光源（如太阳）包含在构图中，通过雾气创造光芒和光晕效果。曝光可能需要适当增加以补偿雾气对光线的散射。
            </p>
          )}
          {currentTime === "blue-hour" && currentCondition === "clear" && (
            <p className="text-gray-300 text-sm">
              清晰的蓝调时分是捕捉城市天际线的完美时刻，天空呈现深蓝色，城市灯光开始点亮。尝试找到能同时捕捉天空和城市灯光的构图，利用建筑轮廓与天空形成剪影效果。使用HDR技术可以平衡亮度差异较大的场景。
            </p>
          )}
          {currentTime === "blue-hour" && currentCondition === "cloudy" && (
            <p className="text-gray-300 text-sm">
              多云的蓝调时分提供更戏剧化的天空背景，云层可能会反射城市的灯光颜色。尝试长曝光捕捉云的动态和流动感。使用前景元素如街道或水面增加构图层次，反射灯光可以创造对称美感。
            </p>
          )}
          {currentTime === "blue-hour" && currentCondition === "foggy" && (
            <p className="text-gray-300 text-sm">
              雾中的蓝调时分创造出神秘而独特的城市景观，灯光穿透雾气产生柔和扩散的光晕。尝试捕捉灯光周围的彩色晕圈效果。对比度会自然降低，因此可以在后期适当增加对比度和自然饱和度。
            </p>
          )}
          {currentTime === "night" && currentCondition === "clear" && (
            <p className="text-gray-300 text-sm">
              晴朗的夜空下城市灯光分明有力，星星可能在光污染较少的地方可见。尝试包含月亮或有趣的天空元素增加画面层次。捕捉车流光轨可以增加动感，使用小光圈（f/11-f/16）可以让灯光呈现星芒效果。
            </p>
          )}
          {currentTime === "night" && currentCondition === "cloudy" && (
            <p className="text-gray-300 text-sm">
              多云的夜晚城市灯光会被云层反射，形成城市上方的光晕。尝试包含一些动态元素如流动的云层（需要较长曝光）。光线较为柔和，可以尝试捕捉雨后的路面反射或湿地面上的倒影。
            </p>
          )}
          {currentTime === "night" && currentCondition === "foggy" && (
            <p className="text-gray-300 text-sm">
              雾气弥漫的夜晚城市呈现出电影般的氛围，灯光被雾气散射形成梦幻光晕。尝试拍摄街灯或明亮的标志，捕捉光在雾中的散射效果。构图可以更简化，让雾气成为主要元素，创造神秘感。
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-green-400 mb-2">最佳拍摄时间</h4>
            <p className="text-gray-300 text-sm">
              {currentTime === "golden-hour" && "黄金时段发生在日出后和日落前约1小时，日落前的黄金时段通常持续40-60分钟。"}
              {currentTime === "blue-hour" && "蓝色时段出现在日落后20-40分钟，持续时间短暂，通常仅15-20分钟左右。"}
              {currentTime === "night" && "完全夜景拍摄最好在日落后1小时开始，此时天空完全变暗，城市灯光全部点亮。"}
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-amber-400 mb-2">推荐装备</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li className="flex items-start">
                <span className="text-amber-400 mr-1.5">•</span>
                <span>
                  {(currentTime === "blue-hour" || currentTime === "night") && "三脚架（必备）"}
                  {currentTime === "golden-hour" && "偏振镜（增强天空色彩和减少反光）"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-1.5">•</span>
                <span>
                  {(currentTime === "blue-hour" || currentTime === "night") && "快门线或遥控器（减少长曝光时的相机抖动）"}
                  {currentTime === "golden-hour" && "中性密度渐变滤镜（平衡天空与地面亮度）"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-1.5">•</span>
                <span>广角到标准变焦镜头（16-70mm）</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-purple-400 mb-2">后期处理提示</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li className="flex items-start">
                <span className="text-purple-400 mr-1.5">•</span>
                <span>
                  {currentTime === "golden-hour" && "增强温暖色调，略微提高橙色和黄色的饱和度"}
                  {currentTime === "blue-hour" && "平衡蓝色和城市灯光的暖色调，增强对比度"}
                  {currentTime === "night" && "适当降低高光，恢复过曝的灯光细节"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-1.5">•</span>
                <span>
                  {currentCondition === "foggy" && "增加对比度和清晰度，但保留雾气的氛围"}
                  {currentCondition === "cloudy" && "提亮阴影区域，增强云层纹理"}
                  {currentCondition === "clear" && "强化天空色彩，增加暗部细节"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-1.5">•</span>
                <span>使用局部调整突出画面主体和关键元素</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShootingSceneSimulator; 