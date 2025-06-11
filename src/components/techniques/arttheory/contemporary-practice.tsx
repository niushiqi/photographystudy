"use client";

import { motion } from "framer-motion";
import { TheoryCard } from "./shared/theory-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ContemporaryPractice() {
  const contemporaryTrends = [
    {
      name: "后摄影",
      description: "指数字化后摄影实践的转变，强调摄影不再仅是记录工具，而是成为信息流中的一部分。图像更多被视为可操作的数据而非固定的记录。",
      examples: ["艺术家Joan Fontcuberta的「Googlegrams」系列", "Trevor Paglen对监控技术的探索", "Penelope Umbrico的「Suns from Flickr」"]
    },
    {
      name: "交互式摄影",
      description: "将观众参与融入作品体验，通过数字技术、装置艺术或参与式方法创造沉浸式体验，使观者从被动接受者变为主动参与者。",
      examples: ["Rafael Lozano-Hemmer的互动装置", "参与式摄影项目", "增强现实摄影应用"]
    },
    {
      name: "跨媒介实践",
      description: "打破摄影与其他艺术形式之间的界限，将摄影与雕塑、绘画、视频、音乐、文学等融合，创造综合性的视觉体验和叙事。",
      examples: ["Christian Boltanski的混合媒介装置", "Carrie Mae Weems结合文字的作品", "安塞尔·亚当斯摄影书项目"]
    },
    {
      name: "社会参与摄影",
      description: "强调摄影的社会功能和伦理责任，通过协作方法和社区参与，探讨社会议题，促进对话和变革，质疑传统摄影关系中的权力不平等。",
      examples: ["LaToya Ruby Frazier的家庭和社区记录", "JR的大型公共参与项目", "Susan Meiselas的协作式纪录片"]
    }
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-6">当代艺术实践</h2>
        <p className="text-lg text-muted-foreground mb-8">
          当代摄影艺术实践已远远超越了传统摄影的界限，融合了多种媒介、技术和概念方法。
          这一领域持续进化，反映了数字时代的技术变革、全球化的文化交流和对社会议题的深度关注。
          了解当代实践趋势，有助于摄影师将自己的工作置于更广阔的艺术语境中，并探索新的创作可能性。
        </p>
      </motion.div>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">当代艺术摄影特征</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">概念性</h4>
            <p className="text-sm text-muted-foreground mb-4">
              当代艺术摄影通常强调概念胜于形式，理念先于技术。作品往往围绕特定的思想、问题或理论框架构建，
              而视觉元素则服务于这些概念的表达。这种方法与现代主义对纯粹形式的追求形成对比，更关注摄影的思想内涵和文化意义。
            </p>
            <div className="bg-black/20 p-3 rounded-lg">
              <h5 className="text-sm font-medium mb-2">案例：索菲·卡勒的「自传」系列</h5>
              <p className="text-xs text-muted-foreground">
                卡勒在这一系列中将自己伪装成不同身份和场景，质疑摄影的真实性和身份的流动性。作品的力量不在于技术精湛，
                而在于其概念上的复杂性和对自传体裁与摄影真实性传统的挑战。这种实践展示了当代摄影如何成为哲学和身份理论的视觉探索媒介。
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">跨学科性</h4>
            <p className="text-sm text-muted-foreground mb-4">
              当代摄影打破了传统媒介界限，与其他艺术形式、科学领域和社会实践交叉融合。艺术家可能结合装置、表演、
              数字技术、档案研究或社区参与等方法，创造混合媒介作品。这种跨学科方法反映了当代社会的复杂性和知识体系的相互渗透。
            </p>
            <div className="bg-black/20 p-3 rounded-lg">
              <h5 className="text-sm font-medium mb-2">案例：Trevor Paglen的衍生艺术</h5>
              <p className="text-xs text-muted-foreground">
                Paglen的作品融合摄影、地理学、调查研究和政治理论，揭示军事基地、监控系统等隐藏的权力结构。
                他的实践跨越艺术、科学和政治行动的边界，使用先进技术（如天文望远镜）创作具有政治意义的影像，
                展示了摄影如何成为跨学科批判性探索的工具。
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">语境意识</h4>
            <p className="text-sm text-muted-foreground mb-4">
              当代摄影实践高度关注作品的展示和接受语境。作品不仅关注图像本身，也关注其被创作、展示和解读的条件。
              艺术家对展示方式、观众经验和机构框架保持批判性意识，将这些元素视为作品意义的组成部分。
            </p>
            <div className="bg-black/20 p-3 rounded-lg">
              <h5 className="text-sm font-medium mb-2">案例：Christopher Williams的策展式实践</h5>
              <p className="text-xs text-muted-foreground">
                Williams的作品考量摄影的物质性和机构语境，常将展览设计作为作品的一部分。他精心安排图像
                与展示空间的关系，通过非标准的安装高度、特殊的展示框架和细致的空间编排，引导观众反思观看行为和机构框架如何塑造我们对图像的理解。
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">批判性立场</h4>
            <p className="text-sm text-muted-foreground mb-4">
              当代摄影经常采取批判性和反思性立场，质疑权力结构、社会规范和知识体系。摄影被用作探索性工具，
              挑战和干扰主流叙事，揭示被掩盖的历史和经验，促进对复杂社会议题的思考和对话。
            </p>
            <div className="bg-black/20 p-3 rounded-lg">
              <h5 className="text-sm font-medium mb-2">案例：Walid Raad的《阿特拉斯小组》</h5>
              <p className="text-xs text-muted-foreground">
                Raad创造了一个虚构的研究集体，通过档案、照片和文件记录黎巴嫩内战历史。这一项目通过混合真实和虚构元素，
                质疑关于历史真相、集体记忆和档案真实性的假设，提供了一种思考创伤历史表征的另类方式，体现了摄影在批判性历史探索中的角色。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">当代摄影趋势</h3>
        
        <Tabs defaultValue="trend1" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-start gap-2 bg-transparent p-0 mb-6">
            {contemporaryTrends.map((trend, index) => (
              <TabsTrigger 
                key={index}
                value={`trend${index + 1}`} 
                className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-4 py-1.5 text-sm transition-all"
              >
                {trend.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {contemporaryTrends.map((trend, index) => (
            <TabsContent key={index} value={`trend${index + 1}`} className="animate-fade-in">
              <div className="bg-accent/10 rounded-lg p-6">
                <h4 className="text-xl font-medium mb-4">{trend.name}</h4>
                <p className="text-muted-foreground mb-6">{trend.description}</p>
                
                <h5 className="font-medium mb-3 text-sm">代表性案例：</h5>
                <ul className="list-disc list-inside space-y-2">
                  {trend.examples.map((example, i) => (
                    <li key={i} className="text-sm text-muted-foreground">{example}</li>
                  ))}
                </ul>
                
                <div className="mt-6 bg-black/20 rounded-lg aspect-video flex items-center justify-center">
                  <p className="text-xs text-muted-foreground text-center px-4">趋势示例图位置</p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">实验性技术与方法</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TheoryCard
            title="算法与AI创作"
            description="利用人工智能、机器学习和算法工具创作或协作生成图像。这些实践反思人类创造力与技术的关系，质疑摄影的本质和创作者的定义。从GAN生成的肖像到算法策划的图像集，这一领域模糊了摄影、编程和概念艺术的边界。"
            delay={0.1}
          />
          <TheoryCard
            title="材料实验"
            description="挑战摄影的二维平面属性，通过实验材料、表面和呈现方式创造立体和触觉体验。摄影师可能在非传统表面上打印，操纵相纸物理性质，或将照片融入雕塑和装置中，强调摄影作为物质对象而非纯粹影像的维度。"
            delay={0.2}
          />
          <TheoryCard
            title="替代工艺复兴"
            description="重新发现和重新解释历史摄影工艺，如湿版火棉胶、蓝晒、铂金印相等。这种回归手工过程不仅是技术怀旧，也是对数字摄影标准化美学的反思，强调制作过程、物质性和偶然性在摄影创作中的价值。"
            delay={0.3}
          />
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">艺术市场与机构动态</h3>
        <div className="bg-accent/10 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-medium mb-4">收藏与市场趋势</h4>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">1</span>
                  <div>
                    <p className="font-medium">摄影艺术地位的稳固</p>
                    <p className="text-sm text-muted-foreground mt-1">摄影作品在当代艺术市场中的地位持续上升，主要拍卖行和画廊设立专门的摄影部门，博物馆扩大摄影收藏。早期对摄影可复制性的担忧已被限量版、签名和证书等策略克服。</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">2</span>
                  <div>
                    <p className="font-medium">规模与装置趋势</p>
                    <p className="text-sm text-muted-foreground mt-1">大幅面摄影和复杂装置在当代市场受到青睐，博物馆和私人收藏家增加了对需要特殊展示空间的大型作品的收藏。这一趋势反映了摄影在规模和存在感上与传统艺术形式的竞争。</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">3</span>
                  <div>
                    <p className="font-medium">数字资产新趋势</p>
                    <p className="text-sm text-muted-foreground mt-1">NFT(非同质化代币)等区块链技术正在为数字摄影作品创造新的收藏和交易模式。这些技术旨在解决数字图像易复制的问题，建立数字稀缺性和所有权验证机制，代表摄影收藏可能的未来方向。</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-medium mb-4">展示与传播方式</h4>
              <div className="space-y-4">
                <div className="border border-purple-200/20 rounded-lg p-4">
                  <h5 className="font-medium mb-2">沉浸式展览</h5>
                  <p className="text-sm text-muted-foreground">当代摄影展览越来越注重创造沉浸式体验，通过多媒体元素、空间设计和互动技术增强观众参与。这种方法反映了对传统"白墙上的照片"展示模式的挑战，适应了当代观众期望更加动态和参与式的艺术体验。</p>
                </div>
                <div className="border border-purple-200/20 rounded-lg p-4">
                  <h5 className="font-medium mb-2">出版与印刷转型</h5>
                  <p className="text-sm text-muted-foreground">尽管数字媒体普及，摄影书籍和独立出版物仍然蓬勃发展，甚至经历复兴。艺术家出版物、小批量手工制作的书籍和摄影杂志成为重要的创作和传播平台，提供不同于屏幕体验的物质互动和线性叙事可能性。</p>
                </div>
                <div className="border border-purple-200/20 rounded-lg p-4">
                  <h5 className="font-medium mb-2">数字平台的作用</h5>
                  <p className="text-sm text-muted-foreground">Instagram等社交媒体平台和专业摄影网站改变了艺术摄影的发现、分享和讨论方式。这些平台提供了传统机构外的展示机会，但也引发关于筛选、语境化和注意力经济的问题，以及算法如何塑造视觉文化和审美偏好。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">开发个人艺术实践</h3>
        <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
          <h4 className="text-xl font-medium mb-5">创建可持续艺术实践的策略</h4>
          <ol className="space-y-6">
            <li className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">1</span>
              <div>
                <p className="font-medium">研究与语境化</p>
                <p className="text-sm text-muted-foreground mt-1">深入研究历史和当代摄影实践，理解你的工作如何与更广泛的艺术对话相关联。认识到每一个创作决定都有其前因和影响，将你的实践置于有意义的语境中，避免无意中重复已有工作。</p>
                <div className="mt-2 bg-black/20 p-2 rounded">
                  <p className="text-xs text-muted-foreground"><strong>行动点：</strong> 创建个人"影响地图"，识别对你有启发的艺术家和运动，分析它们如何影响你的视觉语言和概念方法。</p>
                </div>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">2</span>
              <div>
                <p className="font-medium">概念发展与批判性思维</p>
                <p className="text-sm text-muted-foreground mt-1">培养超越技术考量的概念思维能力。学习分析视觉文化，质疑表面意义，理解社会政治语境。通过阅读、写作和讨论深化你对自己工作的理解，发展能够支持长期艺术探索的思想框架。</p>
                <div className="mt-2 bg-black/20 p-2 rounded">
                  <p className="text-xs text-muted-foreground"><strong>行动点：</strong> 为每个项目创建概念文档，包括核心问题、理论参考和方法论解释，随着作品发展不断修改和扩展。</p>
                </div>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">3</span>
              <div>
                <p className="font-medium">实验与风险承担</p>
                <p className="text-sm text-muted-foreground mt-1">将实验性和风险承担纳入你的工作方法。尝试新技术、材料和概念方法，挑战你的舒适区和已建立的模式。创建安全的"游乐场"，允许失败和意外，这些常常是最有价值的发现之源。</p>
                <div className="mt-2 bg-black/20 p-2 rounded">
                  <p className="text-xs text-muted-foreground"><strong>行动点：</strong> 定期进行"约束练习"，如使用不熟悉的设备，遵循特定规则工作，或与来自其他领域的创作者协作，打破常规思维模式。</p>
                </div>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">4</span>
              <div>
                <p className="font-medium">反思性实践</p>
                <p className="text-sm text-muted-foreground mt-1">培养持续的反思习惯，定期回顾和评估你的作品、过程和意图。保持视觉日记，记录影响和观察，追踪想法的演变。接受外部反馈，同时发展判断什么对你的实践真正有价值的能力。</p>
                <div className="mt-2 bg-black/20 p-2 rounded">
                  <p className="text-xs text-muted-foreground"><strong>行动点：</strong> 创建反思工作流程，包括定期回顾、同行讨论和批评会，以及维护过程档案，捕捉决策点和发展路径。</p>
                </div>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">5</span>
              <div>
                <p className="font-medium">社区与对话</p>
                <p className="text-sm text-muted-foreground mt-1">建立支持性的艺术社区，与志同道合的实践者分享想法和资源。参与更广泛的艺术对话，通过展览、出版物、讲座和在线平台分享你的工作。通过教学和合作深化你的理解和实践。</p>
                <div className="mt-2 bg-black/20 p-2 rounded">
                  <p className="text-xs text-muted-foreground"><strong>行动点：</strong> 创建或加入批评小组，定期与其他艺术家会面讨论作品；参与艺术活动；为相关平台撰写或策划内容，发展你的声音和存在。</p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
} 