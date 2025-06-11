"use client";

import { motion } from "framer-motion";
import { Timeline } from "./shared/timeline";

export function PhotographyHistory() {
  const photographyEras = [
    {
      id: "early",
      name: "早期摄影",
      period: "1826-1900",
      color: "purple",
      events: [
        {
          id: "niepce",
          year: "1826",
          title: "世界上第一张永久摄影",
          description: "约瑟夫·尼埃普斯创造了世界上第一张永久性摄影图像《从窗户看出去的景色》，使用沥青涂料感光，曝光时间长达8小时。",
          significance: "标志着摄影技术的正式诞生，开创了机械化图像复制的新时代。这一技术突破为后续摄影发展奠定了基础。",
          keyFigures: ["约瑟夫·尼埃普斯"]
        },
        {
          id: "daguerreotype",
          year: "1839",
          title: "银版摄影术公布",
          description: "路易·达盖尔公布了银版摄影法，该技术使用银版和碘化物，能创造高度详细的正像，大幅缩短了曝光时间。",
          significance: "使摄影成为实用性技术，标志着摄影走向大众化的开始。银版摄影的流行催生了第一批专业摄影工作室。",
          keyFigures: ["路易·达盖尔", "威廉·亨利·福克斯·塔尔博特"]
        },
        {
          id: "calotype",
          year: "1841",
          title: "卡罗型摄影术发明",
          description: "威廉·亨利·福克斯·塔尔博特发明了卡罗型摄影术，这是第一种使用负片-正片工艺的摄影技术，允许多次复制同一图像。",
          significance: "为现代摄影奠定了基础，引入了负片-正片流程，使得图像的批量复制成为可能，开创了摄影传播的新时代。",
          keyFigures: ["威廉·亨利·福克斯·塔尔博特"]
        },
        {
          id: "wet-collodion",
          year: "1851",
          title: "湿版摄影术发明",
          description: "弗雷德里克·斯科特·阿彻尔发明了湿版摄影术，这种技术比早期方法更便宜、更快捷，同时保持了高质量。",
          significance: "提高了摄影的普及度和可行性，为后来的肖像摄影和战地摄影等应用创造了条件。",
          keyFigures: ["弗雷德里克·斯科特·阿彻尔", "罗杰·芬顿"]
        },
        {
          id: "dry-plate",
          year: "1871",
          title: "干版摄影术问世",
          description: "理查德·利奇·马多克斯发明了明胶干版，摄影师可以提前准备感光板，无需在拍摄现场进行复杂的化学处理。",
          significance: "极大简化了摄影过程，为快照摄影和手持相机的发展铺平了道路，使业余摄影成为可能。",
          keyFigures: ["理查德·利奇·马多克斯"]
        },
        {
          id: "kodak",
          year: "1888",
          title: "第一台柯达相机上市",
          description: "乔治·伊士曼推出了第一台柯达相机，使用胶卷并采用了'你按下快门，我们做剩下的事'的营销理念。",
          significance: "将摄影带入大众市场，开创了业余摄影的时代，摄影从专业技术变成了普通人的休闲活动。",
          keyFigures: ["乔治·伊士曼"]
        }
      ]
    },
    {
      id: "modernist",
      name: "现代主义摄影",
      period: "1900-1945",
      color: "purple",
      events: [
        {
          id: "pictorialism",
          year: "1902",
          title: "照相分离派的成立",
          description: "阿尔弗雷德·斯蒂格利兹等人成立了照相分离派，主张摄影应被视为一种艺术形式，强调主观表达。",
          significance: "为摄影争取到了作为独立艺术形式的地位，开创了艺术摄影的传统，对后续的摄影美学产生了深远影响。",
          keyFigures: ["阿尔弗雷德·斯蒂格利兹", "爱德华·斯泰肯", "格特鲁德·卡塞比尔"]
        },
        {
          id: "straight-photography",
          year: "1916-1920",
          title: "直接摄影运动兴起",
          description: "保罗·斯特兰德和其他摄影师开始倡导'直接摄影'，强调清晰的细节、客观的记录和摄影媒介的纯粹性。",
          significance: "确立了摄影的独特美学，强调其区别于绘画的特性，为20世纪摄影的主流方向奠定了基础。",
          keyFigures: ["保罗·斯特兰德", "安塞尔·亚当斯", "爱德华·韦斯顿"]
        },
        {
          id: "new-vision",
          year: "1920年代",
          title: "新视觉摄影的兴起",
          description: "包豪斯学校的摄影师们探索了新的视角和技术，如俯视、仰视、特写和抽象形式，挑战了传统的视觉认知。",
          significance: "拓展了摄影的表现可能性，将实验性和前卫性引入摄影实践，影响了后来的广告和时尚摄影。",
          keyFigures: ["拉斯洛·莫霍利-纳吉", "亚历山大·罗德琴科"]
        },
        {
          id: "documentary",
          year: "1930年代",
          title: "纪实摄影的黄金时期",
          description: "美国大萧条时期，纪实摄影成为记录社会现实的重要工具，政府资助了许多纪实摄影项目。",
          significance: "确立了摄影作为社会见证和批评工具的角色，开创了视觉新闻报道的传统，深刻影响了后来的纪实摄影实践。",
          keyFigures: ["多萝西娅·兰格", "沃克·埃文斯", "亨利·卡蒂埃-布列松"]
        },
        {
          id: "surrealist",
          year: "1924-1940",
          title: "超现实主义摄影",
          description: "受超现实主义运动影响，摄影师们开始探索梦境、潜意识和心理世界，使用多重曝光、拼贴和暗房技术创造奇异图像。",
          significance: "扩展了摄影的表现领域，将摄影从表面现实引向心理空间的探索，影响了后来的观念摄影和艺术摄影。",
          keyFigures: ["曼·雷", "李·米勒", "布拉萨伊"]
        }
      ]
    },
    {
      id: "postwar",
      name: "战后摄影",
      period: "1945-1980",
      color: "purple",
      events: [
        {
          id: "street-photography",
          year: "1950年代",
          title: "街头摄影兴起",
          description: "轻便35mm相机的普及使街头摄影成为主流，摄影师们在城市街头捕捉自然的、决定性的瞬间。",
          significance: "发展了一种独特的摄影美学，强调直觉、速度和真实性，成为20世纪后半叶最有影响力的摄影流派之一。",
          keyFigures: ["亨利·卡蒂埃-布列松", "罗伯特·弗兰克", "加里·温诺格兰德"]
        },
        {
          id: "new-documents",
          year: "1967",
          title: "《新文件》展览",
          description: "纽约现代艺术博物馆举办了《新文件》展览，展示了黛安·阿勃丝等摄影师的作品，他们采用了一种更为主观和个人化的纪实方式。",
          significance: "标志着纪实摄影向更为个人和艺术的方向转变，影响了后来的美国新纪实摄影和观念摄影的发展。",
          keyFigures: ["黛安·阿勃丝", "加里·温诺格兰德", "李·弗里德兰德"]
        },
        {
          id: "conceptual-photography",
          year: "1960-1970年代",
          title: "观念摄影的兴起",
          description: "受观念艺术影响，摄影开始被用作表达思想和概念的媒介，而非仅仅记录视觉现实。",
          significance: "将摄影引入当代艺术的语境，挑战了摄影的传统定义和功能，开创了后现代摄影的先河。",
          keyFigures: ["约瑟夫·科苏斯", "约翰·希尔利亚德", "贝歇夫妇"]
        },
        {
          id: "new-topographics",
          year: "1975",
          title: "《新地志学》展览",
          description: "乔治·伊斯特曼故居举办的展览，展示了一群摄影师对美国景观的'无风格'、客观记录，特别关注了人造环境。",
          significance: "开创了一种新的风景摄影美学，摒弃了浪漫主义传统，关注日常环境和人类对景观的改造，影响了后来的环境摄影。",
          keyFigures: ["罗伯特·亚当斯", "刘易斯·巴尔茨", "斯蒂芬·肖尔"]
        },
        {
          id: "color-acceptance",
          year: "1976",
          title: "彩色摄影获得艺术认可",
          description: "威廉·艾格尔斯顿的彩色摄影在纽约现代艺术博物馆展出，这是该博物馆首次举办彩色摄影个展。",
          significance: "打破了黑白摄影在艺术摄影中的主导地位，为彩色摄影在艺术领域的接受和发展铺平了道路。",
          keyFigures: ["威廉·艾格尔斯顿", "斯蒂芬·肖尔", "乔尔·迈耶罗维茨"]
        }
      ]
    },
    {
      id: "contemporary",
      name: "当代摄影",
      period: "1980至今",
      color: "purple",
      events: [
        {
          id: "postmodern",
          year: "1980年代",
          title: "后现代摄影兴起",
          description: "受后现代理论影响，摄影师开始质疑摄影的真实性和客观性，探索身份、表征和媒介本身的问题。",
          significance: "将批判理论引入摄影实践，挑战了摄影的传统价值观和假设，开创了更为自反性和理论化的摄影实践。",
          keyFigures: ["辛迪·舍曼", "芭芭拉·克鲁格", "理查德·普林斯"]
        },
        {
          id: "digital-revolution",
          year: "1990年代",
          title: "数字摄影革命",
          description: "数字相机和图像处理软件的出现彻底改变了摄影实践，使图像的创作、编辑和分享变得前所未有的便利。",
          significance: "引发了对摄影本质和真实性的重新思考，模糊了摄影与其他视觉媒介的界限，开创了影像创作的新可能性。",
          keyFigures: ["安德烈亚斯·古尔斯基", "托马斯·鲁夫", "杰夫·沃尔"]
        },
        {
          id: "global-expansion",
          year: "2000年代",
          title: "摄影的全球化扩张",
          description: "非西方摄影师和摄影传统获得了更多关注和认可，摄影实践和理论变得更加多元化和全球化。",
          significance: "挑战了西方中心的摄影史叙事，丰富了摄影的文化视角和表达方式，促进了跨文化对话和交流。",
          keyFigures: ["张晓刚", "皮埃罗·曼佐尼", "Zanele Muholi"]
        },
        {
          id: "social-media",
          year: "2010年代",
          title: "社交媒体摄影时代",
          description: "智能手机和社交媒体平台的普及彻底改变了图像的生产、分享和消费方式，使人人都成为影像创作者。",
          significance: "民主化了摄影实践，但也引发了关于影像过剩、注意力经济和隐私等问题的讨论，重新定义了摄影的社会角色。",
          keyFigures: ["Instagram", "自拍文化", "公民摄影"]
        },
        {
          id: "ai-photography",
          year: "2020年代",
          title: "AI与摄影的融合",
          description: "人工智能技术开始深入摄影领域，从智能相机功能到AI生成图像，模糊了摄影、绘画和数字艺术的界限。",
          significance: "引发了关于创作者身份、原创性和摄影本质的深刻思考，预示着影像创作的范式转变和新边界的探索。",
          keyFigures: ["AI生成艺术", "计算摄影", "神经网络影像"]
        }
      ]
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
        <h2 className="text-3xl font-bold mb-6">摄影史与思潮</h2>
        <p className="text-lg text-muted-foreground mb-8">
          摄影的历史不仅是技术进步的历程，更是艺术思想、社会变革和文化发展的见证。
          了解摄影史与重要思潮，有助于我们理解摄影艺术的根源和可能性，为自己的创作寻找历史坐标。
        </p>
      </motion.div>

      <section className="mb-10">
        <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/10 rounded-lg p-6 mb-12">
          <h3 className="text-xl font-bold mb-4">摄影史的多重维度</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">技术史维度</h4>
              <p className="text-sm text-muted-foreground">
                从最早的银版摄影到数字影像，摄影技术的演进持续改变着影像创作的可能性。
                每一次技术突破都为摄影师提供了新的表现工具，同时也挑战着人们对摄影本质的理解。
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">艺术史维度</h4>
              <p className="text-sm text-muted-foreground">
                摄影与其他艺术形式的互动和对话，从早期模仿绘画到发展出独特的视觉语言。
                摄影艺术的发展历程反映了更广泛的艺术思潮变迁，同时也重塑了视觉艺术的边界。
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">社会史维度</h4>
              <p className="text-sm text-muted-foreground">
                摄影作为记录和表达工具，与社会变革和历史事件紧密相连。
                不同时期的摄影实践反映了当时的社会价值观、政治气候和文化语境，同时也积极参与了社会变革。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-8">摄影发展时间线</h3>
        <Timeline eras={photographyEras} />
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">摄影的范式转变</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-accent/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">从记录到表达</h4>
            <p className="text-sm mb-4">
              摄影最初被视为客观记录现实的工具，摄影师的角色类似于"透明窗口"。随着时间推移，摄影师的主观表达和个人视角逐渐被重视，摄影被视为一种创造性媒介而非纯粹的记录工具。
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>客观记录</span>
                <span>主观表达</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full" style={{ width: "100%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>早期纪实摄影</span>
                <span>现代艺术摄影</span>
              </div>
            </div>
          </div>
          
          <div className="bg-accent/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">从稀缺到泛滥</h4>
            <p className="text-sm mb-4">
              摄影初期，图像的创作和复制都是昂贵且复杂的过程，每张照片都珍贵稀有。数字技术和网络的发展使影像创作成本几乎为零，导致图像泛滥，改变了人们对摄影的价值认知和使用方式。
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>影像稀缺</span>
                <span>影像泛滥</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full" style={{ width: "100%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>胶片时代</span>
                <span>社交媒体时代</span>
              </div>
            </div>
          </div>
          
          <div className="bg-accent/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">从真实到构建</h4>
            <p className="text-sm mb-4">
              摄影长期被视为"真实的指示物"，具有天然的证据性。后现代理论和数字技术的发展挑战了这一假设，使人们认识到所有影像都是构建的，摄影的真实性变得复杂且具有争议。
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>信任真实</span>
                <span>质疑构建</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full" style={{ width: "100%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>摄影即证据</span>
                <span>摄影即解释</span>
              </div>
            </div>
          </div>
          
          <div className="bg-accent/10 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">从专业到普及</h4>
            <p className="text-sm mb-4">
              摄影最初是少数专业人士的领域，需要专业知识和设备。随着相机的简化和普及，特别是智能手机的出现，摄影成为日常活动，摄影师身份的边界变得模糊，公民摄影和参与式文化兴起。
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>专业领域</span>
                <span>大众实践</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full" style={{ width: "100%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>专业摄影师</span>
                <span>人人都是创作者</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">摄影史研究的意义</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-purple-200/20 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">对创作者的价值</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <p className="text-sm">提供历史参照系，帮助定位自己的创作在更广阔的摄影传统中的位置</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <p className="text-sm">启发创作灵感，通过了解经典作品和传统技法拓展表现可能性</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <p className="text-sm">深化对摄影本质的理解，避免重复历史已探索过的路径</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <p className="text-sm">培养批判性思维，能够分析和评价摄影作品和思潮</p>
              </li>
            </ul>
          </div>
          <div className="border border-purple-200/20 rounded-lg p-6">
            <h4 className="text-xl font-medium mb-4">对观看者的价值</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <p className="text-sm">提高鉴赏能力，能够更深入地理解和欣赏摄影作品</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <p className="text-sm">发展媒介素养，以更批判的眼光看待日常接触的影像</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <p className="text-sm">了解影像如何塑造历史叙事和集体记忆</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <p className="text-sm">认识影像在不同文化和社会背景下的多元意义</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 