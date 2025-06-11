"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type EquipmentType = "dslr" | "mirrorless" | "compact" | "action-camera" | "drone";
type ScenarioType = "portrait" | "landscape" | "sports" | "low-light" | "macro" | "street" | "video";

export function EquipmentUsageGuideModule() {
  const [equipmentType, setEquipmentType] = useState<EquipmentType>("mirrorless");
  const [activeTab, setActiveTab] = useState<"feature-tour" | "optimal-settings" | "tips">("feature-tour");
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>("portrait");

  // 设备类型选项
  const equipmentTypes: { id: EquipmentType; label: string }[] = [
    { id: "dslr", label: "单反相机" },
    { id: "mirrorless", label: "无反相机" },
    { id: "compact", label: "便携相机" },
    { id: "action-camera", label: "运动相机" },
    { id: "drone", label: "航拍无人机" },
  ];

  // 场景类型选项
  const scenarioTypes: { id: ScenarioType; label: string; icon: string }[] = [
    { id: "portrait", label: "人像摄影", icon: "👤" },
    { id: "landscape", label: "风景摄影", icon: "🏞️" },
    { id: "sports", label: "运动摄影", icon: "🏃" },
    { id: "low-light", label: "低光环境", icon: "🌙" },
    { id: "macro", label: "微距摄影", icon: "🔍" },
    { id: "street", label: "街头摄影", icon: "🏙️" },
    { id: "video", label: "视频拍摄", icon: "🎬" },
  ];

  // 渲染功能导览
  const renderFeatureTour = () => {
    // 相机主要部位和功能
    const cameraFeatures = [
      { id: "viewfinder", name: "取景器", description: "用于构图和查看场景的光学或电子窗口" },
      { id: "lcd", name: "LCD屏幕", description: "预览照片、调整设置和使用实时取景的显示屏" },
      { id: "mode-dial", name: "模式转盘", description: "选择相机拍摄模式(如M、A、S、P等)" },
      { id: "shutter", name: "快门按钮", description: "半按对焦，全按拍摄照片" },
      { id: "command-dial", name: "控制转盘", description: "调整光圈、快门速度和其他设置" },
      { id: "menu", name: "菜单按钮", description: "访问相机的完整设置菜单" },
      { id: "iso", name: "ISO按钮", description: "快速调整感光度设置" },
      { id: "af", name: "对焦控制", description: "切换自动对焦模式和对焦点" },
      { id: "battery", name: "电池仓", description: "安装和取出相机电池" },
      { id: "card", name: "存储卡槽", description: "插入和取出存储卡" }
    ];

    return (
      <div className="space-y-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">相机功能导览</h3>
          <p className="text-muted-foreground">
            了解{equipmentType === "dslr" ? "单反" : 
                equipmentType === "mirrorless" ? "无反" : 
                equipmentType === "compact" ? "便携" : 
                equipmentType === "action-camera" ? "运动" : "航拍"}相机的主要部件和功能。
          </p>
        </div>

        {/* 相机交互图 - 在实际项目中可以是一个交互式图像 */}
        <div className="relative h-64 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-6">
          <div className="text-6xl">📷</div>
          <div className="text-center text-sm text-muted-foreground mt-4">
            实际项目中应为可交互的相机模型，鼠标悬停在各部位上可查看详细信息
          </div>
        </div>

        {/* 功能列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cameraFeatures.map((feature) => (
            <div key={feature.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
              <h4 className="font-medium">{feature.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-8">
          <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">初学者提示</h4>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            熟悉相机各部件的位置和功能是掌握摄影的第一步。建议先将相机设置为自动模式，
            练习基本操作和构图，然后逐步尝试半自动模式(如光圈优先)，最后再挑战完全手动模式。
          </p>
        </div>
      </div>
    );
  };

  // 渲染最佳设置
  const renderOptimalSettings = () => {
    // 不同场景的推荐设置
    const settingsForScenario = {
      portrait: {
        mode: "光圈优先(A/Av)",
        aperture: "f/1.8 - f/4.0",
        shutter: "自动(通常 1/60 - 1/200)",
        iso: "100-400",
        whiteBalance: "自动或日光",
        focus: "单点自动对焦，对准眼睛",
        tips: [
          "使用大光圈(小f值)获得浅景深，使背景虚化",
          "尝试85-135mm焦距获得讨喜的人像透视效果",
          "在逆光情况下使用曝光补偿+1提亮人物"
        ]
      },
      landscape: {
        mode: "光圈优先(A/Av)或手动(M)",
        aperture: "f/8 - f/13",
        shutter: "基于光圈和ISO，通常使用三脚架",
        iso: "100-200",
        whiteBalance: "日光或阴天",
        focus: "单点自动对焦，对焦于景深三分之一处",
        tips: [
          "使用小光圈(大f值)获得较大景深，确保场景大部分清晰",
          "日出日落时段使用渐变滤镜平衡天空与前景",
          "使用三脚架防止相机抖动，特别是在弱光条件下"
        ]
      },
      sports: {
        mode: "快门优先(S/Tv)",
        aperture: "基于快门和ISO，通常最大光圈",
        shutter: "1/500秒以上，快速动作需1/1000+",
        iso: "400-3200，根据光线条件",
        whiteBalance: "自动",
        focus: "连续自动对焦(AF-C/AI Servo)，区域或跟踪模式",
        tips: [
          "使用高速快门冻结运动，避免模糊",
          "预先对焦于动作预期路径",
          "使用连拍模式捕捉关键瞬间"
        ]
      },
      "low-light": {
        mode: "手动(M)或光圈优先(A/Av)",
        aperture: "最大光圈(最小f值)",
        shutter: "手持不低于1/焦距，或使用三脚架",
        iso: "1600-6400，根据需要调整",
        whiteBalance: "根据光源(钨丝灯/荧光灯/自动)",
        focus: "单点自动对焦，可使用辅助照明",
        tips: [
          "使用大光圈镜头(f/1.4-f/2.8)捕捉更多光线",
          "考虑使用三脚架和遥控快门避免相机抖动",
          "在极低光条件下，牺牲一些清晰度获得可用照片是可接受的"
        ]
      },
      macro: {
        mode: "光圈优先(A/Av)或手动(M)",
        aperture: "f/8 - f/16，根据需要的景深",
        shutter: "基于光圈和ISO，通常使用三脚架",
        iso: "100-400",
        whiteBalance: "自动或日光",
        focus: "手动对焦，使用放大对焦辅助",
        tips: [
          "微距摄影景深非常浅，即使使用小光圈",
          "使用三脚架和遥控快门避免相机抖动",
          "考虑使用环形闪光灯提供均匀照明"
        ]
      },
      street: {
        mode: "光圈优先(A/Av)或程序自动(P)",
        aperture: "f/5.6 - f/8 (日光)，f/2.8 - f/4 (阴天/晚上)",
        shutter: "自动，但不低于1/125秒",
        iso: "自动(最高3200)或手动设置400-1600",
        whiteBalance: "自动",
        focus: "区域自动对焦或对焦预设",
        tips: [
          "使用区域对焦加快拍摄速度，捕捉稍纵即逝的瞬间",
          "考虑使用光圈f/8和距离预设进行盲拍",
          "使用连拍模式避免错过关键瞬间"
        ]
      },
      video: {
        mode: "手动(M)",
        aperture: "根据需要的景深，通常f/2.8 - f/5.6",
        shutter: "根据帧率(通常是帧率的两倍，如24fps用1/50)",
        iso: "尽可能低，通常100-800",
        whiteBalance: "手动预设，避免自动",
        focus: "手动或连续自动对焦，视情况而定",
        tips: [
          "使用ND滤镜在明亮环境下保持较低快门速度",
          "使用耳机监听音频质量",
          "考虑使用外接监视器查看画面细节"
        ]
      }
    };

    const currentSettings = settingsForScenario[selectedScenario];

    return (
      <div className="space-y-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">场景最佳设置</h3>
          <p className="text-muted-foreground">
            针对不同拍摄场景的推荐相机设置，帮助您获得最佳拍摄效果。
          </p>
        </div>

        {/* 场景选择 */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">选择拍摄场景:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {scenarioTypes.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedScenario === scenario.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-2xl mb-1">{scenario.icon}</div>
                <div className="text-sm font-medium">{scenario.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 设置详情 */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-slate-100 dark:bg-slate-800 p-3 font-medium">
            {scenarioTypes.find(s => s.id === selectedScenario)?.label} 推荐设置
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">拍摄模式</div>
                  <div>{currentSettings.mode}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">光圈</div>
                  <div>{currentSettings.aperture}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">快门速度</div>
                  <div>{currentSettings.shutter}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">ISO</div>
                  <div>{currentSettings.iso}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">白平衡</div>
                  <div>{currentSettings.whiteBalance}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">对焦设置</div>
                  <div>{currentSettings.focus}</div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium mb-2">拍摄技巧:</div>
              <ul className="space-y-1">
                {currentSettings.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mt-6">
          <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-2">注意事项</h4>
          <p className="text-sm text-amber-600 dark:text-amber-300">
            这些设置是一般性建议，可根据具体拍摄环境和个人偏好进行调整。随着经验积累，
            您将能够更加精确地根据场景需求调整相机设置。
          </p>
        </div>
      </div>
    );
  };

  // 渲染操作技巧
  const renderTips = () => {
    // 常见问题和解决方案
    const commonIssues = [
      {
        problem: "照片模糊/不清晰",
        solutions: [
          "增加快门速度，手持拍摄时使用至少1/焦距的快门速度",
          "使用三脚架和遥控快门消除相机抖动",
          "确保自动对焦准确锁定在主体上",
          "使用更高的ISO值代替过慢的快门速度",
          "检查镜头是否干净，没有指纹或灰尘"
        ]
      },
      {
        problem: "照片过曝/曝光不足",
        solutions: [
          "使用相机的曝光补偿功能(+/-)调整亮度",
          "在高对比度场景使用包围曝光拍摄多张不同曝光的照片",
          "使用点测光模式精确测量主体的曝光",
          "考虑使用渐变ND滤镜平衡明亮的天空和暗淡的前景",
          "拍摄RAW格式，在后期处理中有更大的调整空间"
        ]
      },
      {
        problem: "自动对焦不准确",
        solutions: [
          "使用单点自动对焦并精确定位对焦点",
          "在低对比度场景切换到手动对焦",
          "在低光环境下使用自动对焦辅助照明",
          "使用后按钮对焦技术分离对焦和快门操作",
          "更新相机固件，可能包含自动对焦性能改进"
        ]
      },
      {
        problem: "电池续航短",
        solutions: [
          "关闭不必要的功能，如WiFi、蓝牙和图像稳定",
          "减少LCD屏幕的使用，优先使用光学/电子取景器",
          "在寒冷环境下将备用电池保持温暖",
          "购买官方或高质量第三方备用电池",
          "考虑使用电池手柄延长拍摄时间"
        ]
      }
    ];

    // 高级操作技巧
    const advancedTips = [
      {
        title: "后按钮对焦",
        description: "将对焦功能从快门按钮分离到相机背面的AF-ON或AEL按钮，提供更精确的对焦控制。"
      },
      {
        title: "曝光锁定",
        description: "在复杂光线场景，测量主体曝光后锁定，然后重新构图拍摄，保持一致的曝光。"
      },
      {
        title: "自定义按钮",
        description: "根据拍摄习惯重新配置相机按钮功能，优化工作流程，快速访问常用设置。"
      },
      {
        title: "电子水平仪",
        description: "使用相机内置的电子水平仪确保画面水平，特别是在风景摄影中非常重要。"
      },
      {
        title: "自定义设置存储",
        description: "将常用场景的设置组合保存为自定义预设，方便快速切换不同拍摄场景。"
      }
    ];

    return (
      <div className="space-y-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">使用技巧与问题排查</h3>
          <p className="text-muted-foreground">
            掌握高效使用相机的技巧和解决常见问题的方法，提升您的摄影体验。
          </p>
        </div>

        {/* 常见问题和解决方案 */}
        <div className="mb-8">
          <h4 className="font-medium mb-4">常见问题排查</h4>
          <div className="space-y-4">
            {commonIssues.map((issue, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 font-medium">
                  {issue.problem}
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {issue.solutions.map((solution, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-medium mr-2 flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 高级操作技巧 */}
        <div>
          <h4 className="font-medium mb-4">高级操作技巧</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advancedTips.map((tip, index) => (
              <div key={index} className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h5 className="font-medium">{tip.title}</h5>
                <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-6">
          <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">摄影师建议</h4>
          <p className="text-sm text-green-600 dark:text-green-300">
            成为优秀摄影师的关键不仅在于拥有高端设备，更在于深入了解自己的相机并熟练掌握其功能。
            定期练习和实验各种设置，查看结果并从错误中学习，是提升摄影技能的最佳途径。
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">器材使用指导</h2>
        <p className="text-muted-foreground mb-8">
          学习如何充分利用您的摄影设备，掌握相机功能、优化设置和实用技巧。
        </p>
        
        {/* 设备类型选择 */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">选择设备类型</h3>
          <div className="flex flex-wrap gap-2">
            {equipmentTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setEquipmentType(type.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  equipmentType === type.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* 内容标签页 */}
        <div className="border-b mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("feature-tour")}
              className={`pb-2 px-1 font-medium transition-colors ${
                activeTab === "feature-tour"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              功能导览
            </button>
            <button
              onClick={() => setActiveTab("optimal-settings")}
              className={`pb-2 px-1 font-medium transition-colors ${
                activeTab === "optimal-settings"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              最佳设置
            </button>
            <button
              onClick={() => setActiveTab("tips")}
              className={`pb-2 px-1 font-medium transition-colors ${
                activeTab === "tips"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              使用技巧
            </button>
          </div>
        </div>
        
        {/* 标签页内容 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "feature-tour" && renderFeatureTour()}
          {activeTab === "optimal-settings" && renderOptimalSettings()}
          {activeTab === "tips" && renderTips()}
        </motion.div>
      </section>
    </div>
  );
} 