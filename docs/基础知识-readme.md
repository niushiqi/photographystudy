# 基础知识模块 - 功能与设计规范

## 模块定位与价值

### 核心定位
**「从零搭建认知地基」** - 摄影底层逻辑和基础概念的直观化呈现

### 目标用户
零基础或刚接触摄影的纯小白用户，无需任何摄影前置知识

### 核心价值
让用户3分钟内理解一个摄影概念，建立清晰的认知坐标系，避免专业术语障碍

### 与其他模块边界
- **核心边界**：聚焦"是什么"，解释概念本身，不涉及"为什么"和"怎么做"
- **内容区分**：不涉及具体拍摄技法（拍摄技巧模块）、不深入参数原理（技术进阶模块）、不推荐具体设备（器材指南模块）

## 页面结构与组件

### 1. 视觉化导航系统
- **学习路径地图**：以地铁线路图形式展示知识点连接关系
- **知识进度指示**：用户已掌握/正在学习/未接触的内容可视化显示
- **知识前置要求**：每个概念所需的前置知识清晰标注

### 2. 核心交互组件

#### 2.1 相机构造交互模型
- **3D相机解剖图**：可旋转、缩放的相机模型，点击各部件显示功能说明
- **部件功能动画**：点击各部件触发工作原理动画（如快门运动、光线传导）
- **结构差异对比**：不同类型相机（单反/无反/卡片机）的结构差异切换展示

```jsx
<CameraInteractiveModel
  initialView="exterior"
  highlightParts={true}
  animateComponents={true}
  cameraTypes={["dslr", "mirrorless", "compact"]}
/>
```

#### 2.2 曝光三角互动实验室
- **参数联动调节器**：调整光圈/快门/ISO，其他参数自动平衡以保持曝光
- **实时效果预览**：参数变化实时呈现在示例图片上
- **效果分离视图**：独立展示各参数对画面的影响（景深/动态模糊/噪点）

```jsx
<ExposureTriangleSimulator
  baseImage="/images/basics/exposure-base.jpg"
  initialSettings={{
    aperture: "f/4",
    shutterSpeed: "1/125",
    iso: 400
  }}
  showEffectsSeparately={true}
/>
```

#### 2.3 焦距视角比较器
- **焦距滑块**：从广角到长焦的连续视角变化
- **场景透视变化**：同一场景在不同焦距下的透视效果变化
- **应用场景推荐**：不同焦距适合的拍摄主题自动提示

```jsx
<FocalLengthComparator
  scene="street"
  focalLengths={[16, 24, 35, 50, 85, 135, 200]}
  showPerspectiveEffect={true}
  highlightRecommendedUses={true}
/>
```

#### 2.4 光线基础实验室
- **光位移动器**：拖动改变光源位置和角度
- **时间变化模拟**：日出到日落的光线角度、色温和强度变化
- **光线质量切换**：硬光/柔光、主光/辅光/轮廓光等概念可视化

```jsx
<LightingBasicsLab
  environment="studio"
  timeSimulation={true}
  lightTypes={["hard", "soft", "reflected"]}
  showLightPatterns={true}
/>
```

#### 2.5 摄影参数视觉词典
- **概念卡片集**：重要参数和术语的可视化解释
- **参数关系图**：展示不同参数之间的关联和影响
- **术语互动问答**：通过小测验巩固概念理解

```jsx
<VisualDictionary
  categories={["exposure", "focus", "composition", "light"]}
  interactiveQuiz={true}
  showRelationships={true}
/>
```

### 3. 知识内容组织

#### 3.1 核心知识模块
- **相机基础**：相机工作原理、各部件功能、类型区别
- **曝光基础**：光圈、快门、ISO三要素及其作用
- **镜头知识**：焦距、光圈、视角、镜头类型基础介绍
- **成像基础**：对焦原理、景深概念、清晰度影响因素
- **光线入门**：基础光线类型、方向、质感和色温
- **构图基础**：基础构图规则、视觉引导、画面平衡
- **色彩初步**：色彩理论基础、白平衡、色彩情绪

#### 3.2 内容呈现方式
- **知识卡片**：每个概念封装为独立交互卡片，支持收藏和复习
- **渐进式揭示**：从简单到复杂逐步展开概念解释
- **视觉类比**：使用生活中熟悉的例子解释抽象概念
- **互动验证**：概念学习后立即通过互动测验验证理解

```jsx
<ConceptCard
  title="光圈是什么"
  visualComparison={true}
  difficultyLevel="beginner"
  interactiveElements={["aperture-slider", "depth-preview"]}
  everydayAnalogy="窗帘开合度"
/>
```

### 4. 学习体验设计

#### 4.1 用户进阶引导
- **知识关联提示**：学完基础概念后，推荐相关的进阶内容
- **实践建议**：每个概念配有简单的实践练习建议
- **技能树视图**：可视化展示用户已掌握的技能和解锁的新内容

#### 4.2 个性化学习路径
- **学习风格适配**：视觉学习者/实践学习者路径分支
- **进度保存**：自动记录学习进度，支持继续上次学习
- **难度调节**：根据用户理解速度动态调整内容深度

#### 4.3 反馈与强化机制
- **即时反馈**：概念理解测试与即时反馈
- **知识点回顾**：定期提醒复习已学内容
- **成就系统**：完成学习目标获得成就徽章

## 设计与开发规范

### 视觉风格
- **简洁清爽**：减少视觉干扰，突出核心概念
- **形象直观**：优先使用图像和动画解释概念
- **视觉一致性**：与整站保持一致的设计语言
- **层次分明**：清晰的视觉层级，引导注意力流向

### 交互原则
- **即时反馈**：用户操作后立即展示效果变化
- **渐进式控制**：先简单后复杂的参数控制暴露
- **容错设计**：预设合理参数范围，防止极端设置
- **探索鼓励**：鼓励用户尝试不同参数组合

### 技术实现要点
- **组件模块化**：每个交互组件独立封装，便于复用
- **性能优化**：3D和复杂动画需进行性能优化
- **响应式设计**：在不同设备上提供适配的交互体验
- **状态管理**：集中管理用户学习状态和进度

## 与其他模块的衔接

### 前置模块
- 无前置要求（作为第一入口模块）

### 后续推荐模块
- **技术进阶**：深入了解概念背后的原理和机制
- **拍摄技巧**：学习概念的实际应用场景和方法
- **器材指南**：了解如何选择适合的设备

### 知识点交叉引用
- 概念解释中提及的进阶内容链接到相应模块
- 特定场景应用案例链接到拍摄技巧模块
- 设备相关内容链接到器材指南模块

## 开发优先级与迭代计划

### 第一阶段（核心功能）
1. 曝光三角互动实验室
2. 相机构造交互模型
3. 基础知识卡片系统

### 第二阶段（扩展功能）
1. 焦距视角比较器
2. 光线基础实验室
3. 学习路径个性化

### 第三阶段（完善体验）
1. 成就与进度系统
2. 知识点回顾功能
3. 用户测验与反馈机制

---

本模块致力于通过高度可视化和交互式的学习体验，帮助零基础用户建立摄影基础认知框架，为后续深入学习打下坚实基础。通过清晰定位"是什么"的知识边界，避免与其他模块内容重复，确保用户获得连贯而高效的学习体验。 