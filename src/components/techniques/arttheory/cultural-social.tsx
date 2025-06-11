"use client";

import { motion } from "framer-motion";
import { TheoryCard } from "./shared/theory-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CulturalSocial() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-6">摄影的文化与社会维度</h2>
        <p className="text-lg text-muted-foreground mb-8">
          摄影从诞生之日起就与社会文化语境紧密相连，既是文化的产物，也是塑造文化的力量。
          理解摄影的社会文化维度，有助于我们创作出更具意识和批判性的作品，并认识到影像在公共话语中的重要作用。
        </p>
      </motion.div>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影的社会功能</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">见证与记录</h4>
            <p className="text-sm text-muted-foreground mb-4">
              摄影作为历史和社会现实的见证者，记录关键事件、社会变革和日常生活。这种见证功能既提供了历史档案，
              也塑造了集体记忆和公共叙事。著名的战地摄影、社会纪实项目和新闻摄影都展示了摄影的这一核心功能。
            </p>
            <div className="bg-black/20 p-3 rounded-lg">
              <h5 className="text-sm font-medium mb-2">案例：美国农业安置管理局(FSA)项目</h5>
              <p className="text-xs text-muted-foreground">
                1935-1944年间，美国政府资助的大型摄影项目，记录大萧条对农村地区的影响。多萝西娅·兰格、沃克·埃文斯等摄影师的工作不仅记录了历史，
                还极大影响了公众对经济危机的认识，推动了社会政策的改变。这一项目展示了摄影如何能成为社会见证和变革的工具。
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">批评与干预</h4>
            <p className="text-sm text-muted-foreground mb-4">
              摄影不仅记录现实，还可以质疑和挑战现状，揭示社会问题和不公正。摄影师通过选择性地关注被忽视的议题，
              使隐形问题可见，促使公众关注和讨论。批判性摄影作品可以引发情感反应，激发同理心，促进社会变革。
            </p>
            <div className="bg-black/20 p-3 rounded-lg">
              <h5 className="text-sm font-medium mb-2">案例：塞巴斯蒂奥·萨尔加多的《矿工》系列</h5>
              <p className="text-xs text-muted-foreground">
                巴西摄影师萨尔加多记录了全球各地矿工的艰辛劳动条件，以强烈的黑白影像展现了资源开采的人力代价。
                他的作品不仅揭示了工人面临的危险和剥削，还质疑了全球经济体系中的不平等关系，引发了对劳工权利和环境问题的广泛讨论。
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">认同与表征</h4>
            <p className="text-sm text-muted-foreground mb-4">
              摄影在个人和集体认同的构建中扮演重要角色，影响我们如何看待自己和他人。肖像摄影、家庭相册、社区摄影项目等都参与了认同的形成和表达。
              同时，摄影也涉及权力关系，影响着谁被如何表征，以及谁控制这些表征。
            </p>
            <div className="bg-black/20 p-3 rounded-lg">
              <h5 className="text-sm font-medium mb-2">案例：Zanele Muholi的《面孔与阶段》</h5>
              <p className="text-xs text-muted-foreground">
                南非视觉活动家Muholi创作了一系列黑白肖像，记录南非LGBTQ+社区成员。这个项目既是对这一常被边缘化群体的视觉档案，
                也是对传统表征方式的挑战。通过让被摄者参与创作过程，作品重新分配了表征权力，使主体成为自己形象的共同创作者。
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">商品与消费</h4>
            <p className="text-sm text-muted-foreground mb-4">
              在消费社会中，摄影成为创造欲望和推动消费的强大工具。广告摄影、时尚摄影、旅游摄影等领域利用图像的力量塑造生活方式理想和消费欲望。
              同时，摄影本身也成为消费品，从艺术市场的收藏品到社交媒体上的数字货币。
            </p>
            <div className="bg-black/20 p-3 rounded-lg">
              <h5 className="text-sm font-medium mb-2">案例：Instagram与影像消费</h5>
              <p className="text-xs text-muted-foreground">
                社交媒体平台改变了摄影的生产、分享和消费方式。Instagram上的影像既是个人表达，也是社会资本和商业工具。
                "Instagrammable"场所的兴起、影响者经济和视觉趋势的快速传播，展示了当代数字文化中摄影与消费主义的复杂交织关系。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影的文化语境</h3>
        <Tabs defaultValue="historical" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-start gap-2 bg-transparent p-0 mb-6">
            <TabsTrigger 
              value="historical" 
              className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-4 py-1.5 transition-all"
            >
              历史语境
            </TabsTrigger>
            <TabsTrigger 
              value="geographical" 
              className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-4 py-1.5 transition-all"
            >
              地理语境
            </TabsTrigger>
            <TabsTrigger 
              value="institutional" 
              className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-4 py-1.5 transition-all"
            >
              制度语境
            </TabsTrigger>
            <TabsTrigger 
              value="technological" 
              className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white rounded-full px-4 py-1.5 transition-all"
            >
              技术语境
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="historical" className="animate-fade-in">
            <div className="bg-accent/10 rounded-lg p-6">
              <h4 className="text-xl font-medium mb-4">历史语境</h4>
              <p className="text-muted-foreground mb-4">
                摄影作品总是在特定历史时期创作的，反映了当时的社会条件、文化价值观和政治气候。
                理解这一历史语境有助于我们更深入地解读摄影作品，认识到它们如何受到时代精神的影响和限制。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="border border-purple-200/20 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">现代主义摄影(1920-1940)</h5>
                  <p className="text-sm text-muted-foreground">
                    现代主义摄影反映了工业化、城市化和科技进步带来的变革。这一时期的摄影强调形式实验、抽象元素和机械美学，
                    体现了对进步和理性的信念，同时也反映了社会动荡和两次世界大战带来的不确定性。
                  </p>
                </div>
                <div className="border border-purple-200/20 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">后现代摄影(1970-1990)</h5>
                  <p className="text-sm text-muted-foreground">
                    后现代摄影质疑真实性、权威和客观性的概念，反映了对大叙事的怀疑和身份政治的兴起。
                    这一时期的摄影常采用挪用、讽刺和引用等策略，体现了消费文化、媒体饱和和身份碎片化的后现代社会特征。
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="geographical" className="animate-fade-in">
            <div className="bg-accent/10 rounded-lg p-6">
              <h4 className="text-xl font-medium mb-4">地理语境</h4>
              <p className="text-muted-foreground mb-4">
                不同地区和文化传统对摄影的理解和实践各不相同。摄影的发展历程在全球各地呈现出多元化的路径，
                受到本地文化传统、视觉习惯和社会需求的影响。跨文化摄影交流既带来创新，也可能导致误解和文化霸权。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="border border-purple-200/20 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">非西方摄影传统</h5>
                  <p className="text-sm text-muted-foreground">
                    非西方社会对摄影的接受和发展路径往往不同于西方。例如，日本摄影强调物质性和情感表达；
                    中国摄影融合传统美学与政治功能；非洲当代摄影则常关注后殖民身份和本土视觉传统的恢复。这些多元传统丰富了全球摄影语言。
                  </p>
                </div>
                <div className="border border-purple-200/20 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">全球化与本土化</h5>
                  <p className="text-sm text-muted-foreground">
                    全球化使摄影风格和实践跨越地理边界传播，但这一过程也伴随着本土化和混合形式的出现。
                    当代摄影既受全球美学潮流影响，也体现了对本地视觉传统和文化特性的重新重视，形成了丰富的跨文化视觉对话。
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="institutional" className="animate-fade-in">
            <div className="bg-accent/10 rounded-lg p-6">
              <h4 className="text-xl font-medium mb-4">制度语境</h4>
              <p className="text-muted-foreground mb-4">
                摄影的生产、传播和接受受到各种制度的影响，包括美术馆、出版机构、学术机构、市场和政府政策。
                这些制度环境决定了哪些摄影作品被看见、如何被解读，以及什么样的摄影实践被认可和支持。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="border border-purple-200/20 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">美术馆系统</h5>
                  <p className="text-sm text-muted-foreground">
                    美术馆和博物馆通过收藏、展览和出版活动，赋予摄影作品文化权威和历史意义。
                    机构的收藏政策和策展实践塑造了摄影史的主流叙事，决定了哪些摄影师和流派被纳入艺术史典范，哪些则被边缘化。
                  </p>
                </div>
                <div className="border border-purple-200/20 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">媒体生态</h5>
                  <p className="text-sm text-muted-foreground">
                    媒体平台的变迁深刻影响了摄影的生产和传播。从印刷媒体到电视，再到社交媒体和数字平台，
                    不同媒体环境塑造了不同的视觉文化和摄影实践，影响了影像的形式、内容和观看方式。
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="technological" className="animate-fade-in">
            <div className="bg-accent/10 rounded-lg p-6">
              <h4 className="text-xl font-medium mb-4">技术语境</h4>
              <p className="text-muted-foreground mb-4">
                摄影技术的发展不仅改变了图像的制作方式，也重塑了我们与影像的关系和摄影的社会功能。
                每一次技术变革都带来美学可能性的扩展，同时也引发对摄影本质和功能的重新思考。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="border border-purple-200/20 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">数字革命</h5>
                  <p className="text-sm text-muted-foreground">
                    数字技术彻底改变了摄影的创作、编辑、分享和保存方式。数字摄影的即时性、可编辑性和分享便捷性
                    不仅改变了专业摄影实践，也使摄影成为日常交流和自我表达的普遍语言，引发了关于摄影真实性、原创性和民主化的讨论。
                  </p>
                </div>
                <div className="border border-purple-200/20 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">算法摄影</h5>
                  <p className="text-sm text-muted-foreground">
                    AI和机器学习技术正在重新定义摄影的边界。计算摄影、AI图像生成和自动化编辑挑战了传统的摄影概念，
                    模糊了摄影、绘画和数字艺术之间的界限，引发关于创作者身份、技能和摄影本质的深刻思考。
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影的权力与政治</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TheoryCard
            title="凝视与权力"
            description="摄影涉及'谁看谁'的权力关系。拍摄行为本身就建立了摄影师与被摄主体之间的权力不对称。殖民凝视、男性凝视、医学凝视等概念揭示了摄影如何可能强化现有的权力结构，以及如何通过视觉控制客体化被拍摄者。"
            delay={0.1}
          />
          <TheoryCard
            title="表征的政治"
            description="影像不仅描述世界，还积极参与塑造我们对不同群体的认知。摄影的表征政治关注形象再现中的权力不平等，以及特定群体如何被系统性地误表征或缺乏表征。批判性摄影实践探索更公正、多元的表征方式。"
            delay={0.2}
          />
          <TheoryCard
            title="抵抗与赋权"
            description="摄影也可以成为挑战主流叙事和权力结构的工具。自我表征、参与式摄影、社区媒体等实践重新分配了影像创作的控制权，使边缘化群体能够讲述自己的故事，创造反主流的视觉叙事和身份表达。"
            delay={0.3}
          />
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影的伦理责任</h3>
        <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-medium mb-4">伦理考量</h4>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">1</span>
                  <div>
                    <p className="font-medium">知情同意</p>
                    <p className="text-sm text-muted-foreground mt-1">被摄主体应充分了解并同意照片的拍摄和使用方式。特别是涉及弱势群体、敏感情境或私人场合时，摄影师有责任尊重主体的知情权和控制权。</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">2</span>
                  <div>
                    <p className="font-medium">尊严与尊重</p>
                    <p className="text-sm text-muted-foreground mt-1">摄影应尊重被摄主体的尊严和完整性，避免客体化、异国情调化或简化复杂处境。这要求摄影师反思自己的位置和偏见，以及自己的表现方式如何影响对主体的理解。</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">3</span>
                  <div>
                    <p className="font-medium">真实与操控</p>
                    <p className="text-sm text-muted-foreground mt-1">不同类型的摄影对真实性有不同标准，但透明度是普遍要求。摄影师应清晰传达作品的创作方法和真实性承诺，避免误导观众或违背主体信任。</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-medium mb-4">实践框架</h4>
              <div className="space-y-4">
                <div className="border border-purple-200/20 rounded-lg p-4">
                  <h5 className="font-medium mb-2">协作摄影</h5>
                  <p className="text-sm text-muted-foreground">协作方法将被摄主体视为创作过程的合作者，而非被动对象。通过共同决策、故事共享和技能交流，协作摄影重新平衡了摄影关系中的权力，创造更公平、尊重的影像创作模式。</p>
                </div>
                <div className="border border-purple-200/20 rounded-lg p-4">
                  <h5 className="font-medium mb-2">反思性实践</h5>
                  <p className="text-sm text-muted-foreground">反思性摄影要求创作者持续质疑自己的假设、特权和盲点。通过明确自己的位置并将其作为作品的一部分，摄影师可以更负责任地处理复杂议题，避免再现有害的刻板印象。</p>
                </div>
                <div className="border border-purple-200/20 rounded-lg p-4">
                  <h5 className="font-medium mb-2">长期投入</h5>
                  <p className="text-sm text-muted-foreground">建立持久、深入的关系，而非短暂的"拍摄飞行"。长期投入使摄影师能够发展对主题的深入理解，建立信任关系，创造更具洞察力和尊重性的作品。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">实践应用：社会参与摄影</h3>
        <div className="bg-accent/10 rounded-lg p-6">
          <p className="text-muted-foreground mb-8">
            社会参与摄影是一种将艺术实践与社会行动结合的方法，使摄影成为促进对话、意识提升和社会变革的工具。
            这种实践重视过程与合作，而非仅关注最终产品，强调摄影的变革潜力和社会责任。
          </p>
          
          <h4 className="text-xl font-medium mb-5">实践方法</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-purple-200/20 p-5 rounded-lg">
              <h5 className="font-medium mb-3">参与式摄影</h5>
              <p className="text-sm text-muted-foreground mb-3">
                将相机交给社区成员，使他们能够记录自己的生活和关注的问题。这种方法打破了传统的"摄影师/主体"二元关系，
                使社区成员成为自己故事的讲述者和形象的创造者。
              </p>
              <div className="bg-black/20 p-2 rounded">
                <p className="text-xs text-muted-foreground">
                  <strong>案例：</strong> "照相声音"项目让边缘化社区的年轻人使用摄影表达他们的观点和经历，
                  作品通过展览、出版物和社区活动分享，为公共政策讨论提供了新的视角。
                </p>
              </div>
            </div>
            <div className="border border-purple-200/20 p-5 rounded-lg">
              <h5 className="font-medium mb-3">社区档案建设</h5>
              <p className="text-sm text-muted-foreground mb-3">
                与社区合作收集、保存和分享历史照片和故事，创建代表社区自身历史和身份的视觉档案。
                这类项目帮助社区保存集体记忆，抵抗历史遗忘和外部刻板印象。
              </p>
              <div className="bg-black/20 p-2 rounded">
                <p className="text-xs text-muted-foreground">
                  <strong>案例：</strong> "家庭相册项目"收集和数字化社区家庭照片，结合口述历史创建线上档案，
                  展示了官方历史中常被忽视的普通人生活和社区变迁。
                </p>
              </div>
            </div>
          </div>
          
          <h4 className="text-xl font-medium mb-5">关键原则</h4>
          <div className="space-y-4">
            <div className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">1</span>
              <div>
                <p className="font-medium">互惠性</p>
                <p className="text-sm text-muted-foreground mt-1">确保项目对所有参与者都有价值和意义，而非仅服务于摄影师或机构的需求。建立公平的交流关系，所有参与者都是贡献者也是受益者。</p>
              </div>
            </div>
            <div className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">2</span>
              <div>
                <p className="font-medium">可持续性</p>
                <p className="text-sm text-muted-foreground mt-1">设计能够持续发展的项目，而非一次性干预。考虑长期影响、能力建设和退出策略，避免创造依赖或在项目结束后留下空白。</p>
              </div>
            </div>
            <div className="flex">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">3</span>
              <div>
                <p className="font-medium">批判性反思</p>
                <p className="text-sm text-muted-foreground mt-1">持续评估项目的假设、方法和影响，开放接受反馈和调整。认识到好意不足以确保积极成果，关注实际效果而非理想化目标。</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 