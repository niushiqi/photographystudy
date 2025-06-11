import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

// 标志性风格组件
export function IconicStyles() {
  return (
    <div className="space-y-8">
      {/* 介绍部分 */}
      <section className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 p-6 rounded-xl">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">标志性摄影风格</h3>
          <p className="text-muted-foreground mb-4">
            每位伟大的摄影师都拥有独特的视觉语言和标志性风格。通过学习这些经典风格，你可以丰富自己的创作词汇，并找到灵感来发展个人风格。
          </p>
          <p className="text-sm mb-2 text-purple-500 dark:text-purple-400">从下面选择一位摄影大师，深入了解他们的标志性风格：</p>
        </div>
      </section>

      {/* 摄影师风格选择器 */}
      <Tabs defaultValue="hcb" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="hcb">亨利·卡蒂埃-布列松</TabsTrigger>
          <TabsTrigger value="ansel">安塞尔·亚当斯</TabsTrigger>
          <TabsTrigger value="avedon">理查德·阿维顿</TabsTrigger>
          <TabsTrigger value="arbus">黛安·阿勃丝</TabsTrigger>
        </TabsList>
        
        {/* 亨利·卡蒂埃-布列松 */}
        <TabsContent value="hcb">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="h-full bg-white/80 dark:bg-gray-900/80">
                <CardHeader>
                  <CardTitle className="text-xl">亨利·卡蒂埃-布列松</CardTitle>
                  <div className="flex flex-wrap gap-2 my-2">
                    <Badge variant="outline">决定性瞬间</Badge>
                    <Badge variant="outline">街头摄影</Badge>
                    <Badge variant="outline">黑白影像</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    法国摄影大师，被誉为"现代摄影之父"，Magnum图片社创始人。以捕捉"决定性瞬间"的能力著称，对街头摄影有巨大影响。
                  </p>
                  <p className="text-sm text-muted-foreground">活跃时期: 1930s-1970s</p>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    进一步了解 <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    风格特点 
                    <span className="inline-block h-1 w-10 bg-purple-500 rounded-full ml-2"></span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "决定性瞬间",
                        description: "捕捉那一刻，当视觉和内容的所有元素完美聚合，揭示主题的本质。"
                      },
                      {
                        title: "图形化构图",
                        description: "强烈的几何结构和形式感，追求构图平衡与视觉和谐。"
                      },
                      {
                        title: "自然光影",
                        description: "纯粹使用自然光线，拒绝闪光灯，强调光影的真实记录。"
                      },
                      {
                        title: "人文主义视角",
                        description: "对普通人的生活和情感体验给予温暖关注，展现人性的普遍性。"
                      },
                    ].map((item, i) => (
                      <Card key={i} className="bg-purple-50/50 dark:bg-purple-900/20 border-none">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4">技术方法</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-xs text-purple-800 dark:text-purple-300 mt-0.5">1</div>
                      <div>
                        <p className="font-medium">徕卡相机 + 50mm镜头</p>
                        <p className="text-sm text-muted-foreground">偏爱轻便的徕卡相机，多使用标准50mm视角</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-xs text-purple-800 dark:text-purple-300 mt-0.5">2</div>
                      <div>
                        <p className="font-medium">黑白胶片</p>
                        <p className="text-sm text-muted-foreground">几乎全部作品使用黑白胶片，强调光影与形式</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-xs text-purple-800 dark:text-purple-300 mt-0.5">3</div>
                      <div>
                        <p className="font-medium">预设对焦距离</p>
                        <p className="text-sm text-muted-foreground">使用区域对焦技术，提前设定对焦点，随时准备拍摄</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-xs text-purple-800 dark:text-purple-300 mt-0.5">4</div>
                      <div>
                        <p className="font-medium">不裁剪原则</p>
                        <p className="text-sm text-muted-foreground">坚持在取景器中完成构图，拒绝后期裁剪</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 风格练习与启示 */}
          <div className="mt-10 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <h4 className="text-xl font-bold mb-4">从布列松风格中学习</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-3">练习方法</h5>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>在繁忙的公共场所等待并捕捉情绪或行为高潮的瞬间</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>限制自己使用一个焦距（优选35mm或50mm）拍摄一整天</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>练习预判场景发展，提前构图等待关键时刻</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>尝试黑白创作，关注形式、线条和几何感而非色彩</p>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-3">现代应用</h5>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>手机摄影中应用决定性瞬间理念</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>在社交媒体快节奏内容中融入精准时机的重要性</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>用几何构图原则提升日常拍摄的视觉冲击力</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>培养观察力和预判能力，即使在使用现代自动对焦系统时</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                探索布列松风格案例分析 <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* 安塞尔·亚当斯 */}
        <TabsContent value="ansel">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="h-full bg-white/80 dark:bg-gray-900/80">
                <CardHeader>
                  <CardTitle className="text-xl">安塞尔·亚当斯</CardTitle>
                  <div className="flex flex-wrap gap-2 my-2">
                    <Badge variant="outline">自然风光</Badge>
                    <Badge variant="outline">区域系统</Badge>
                    <Badge variant="outline">黑白摄影</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    美国摄影大师，环保主义者，以其震撼人心的黑白风景摄影闻名，尤其是对约塞米蒂国家公园的记录。发明了著名的区域系统。
                  </p>
                  <p className="text-sm text-muted-foreground">活跃时期: 1920s-1980s</p>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    进一步了解 <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    风格特点 
                    <span className="inline-block h-1 w-10 bg-purple-500 rounded-full ml-2"></span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "极致清晰度",
                        description: "追求从前景到背景的全景深清晰度，让画面中每个细节都纤毫毕现。"
                      },
                      {
                        title: "宏伟场景",
                        description: "偏好壮丽的自然景观，展现大自然的壮美和力量。"
                      },
                      {
                        title: "精准曝光",
                        description: "通过区域系统实现从深黑到纯白的丰富灰阶层次。"
                      },
                      {
                        title: "环保意识",
                        description: "作品蕴含对自然环境保护的强烈信念，展现自然的神圣性。"
                      },
                    ].map((item, i) => (
                      <Card key={i} className="bg-purple-50/50 dark:bg-purple-900/20 border-none">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4">技术方法</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-xs text-purple-800 dark:text-purple-300 mt-0.5">1</div>
                      <div>
                        <p className="font-medium">大画幅相机</p>
                        <p className="text-sm text-muted-foreground">使用8×10英寸大画幅相机捕捉最大细节</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-xs text-purple-800 dark:text-purple-300 mt-0.5">2</div>
                      <div>
                        <p className="font-medium">区域系统</p>
                        <p className="text-sm text-muted-foreground">创新性的曝光和冲洗系统，将场景划分为10个亮度区域</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-xs text-purple-800 dark:text-purple-300 mt-0.5">3</div>
                      <div>
                        <p className="font-medium">红色滤镜</p>
                        <p className="text-sm text-muted-foreground">使用深红色滤镜使天空变暗，增强云彩与天空对比</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-xs text-purple-800 dark:text-purple-300 mt-0.5">4</div>
                      <div>
                        <p className="font-medium">精确暗房处理</p>
                        <p className="text-sm text-muted-foreground">强调暗房技术对最终作品的重要性，精细控制冲印过程</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 风格练习与启示 */}
          <div className="mt-10 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <h4 className="text-xl font-bold mb-4">从亚当斯风格中学习</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-3">练习方法</h5>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>使用小光圈拍摄风景，追求最大景深和清晰度</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>实践亮度分区法，学习如何测光以保留亮部和暗部细节</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>尝试黑白风景摄影，关注光影、质感和形式而非色彩</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>在后期处理中加强对比度，追求黑白照片的戏剧性效果</p>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-3">现代应用</h5>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>利用HDR技术实现现代版的区域系统效果</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>将亚当斯的构图原则应用于手机摄影的风景拍摄</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>在数字后期中模拟亚当斯标志性的黑白处理风格</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <p>结合环保主题，用影像讲述自然保育的重要性</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                探索亚当斯风格案例分析 <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* 简短的占位内容 - 理查德·阿维顿 */}
        <TabsContent value="avedon">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="h-full bg-white/80 dark:bg-gray-900/80">
                <CardHeader>
                  <CardTitle className="text-xl">理查德·阿维顿</CardTitle>
                  <div className="flex flex-wrap gap-2 my-2">
                    <Badge variant="outline">时尚摄影</Badge>
                    <Badge variant="outline">肖像摄影</Badge>
                    <Badge variant="outline">白色背景</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    美国摄影大师，时尚与肖像摄影领域的传奇人物。以其简约、富有感染力的肖像作品闻名，曾为《Vogue》等杂志工作多年。
                  </p>
                  <p className="text-sm text-muted-foreground">活跃时期: 1940s-2000s</p>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    进一步了解 <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2 flex items-center justify-center p-16 bg-gray-100 dark:bg-gray-800/50 rounded-xl">
              <p className="text-muted-foreground text-center">
                点击"理查德·阿维顿"标签探索其标志性风格、技术方法和创作理念
              </p>
            </div>
          </div>
        </TabsContent>

        {/* 简短的占位内容 - 黛安·阿勃丝 */}
        <TabsContent value="arbus">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="h-full bg-white/80 dark:bg-gray-900/80">
                <CardHeader>
                  <CardTitle className="text-xl">黛安·阿勃丝</CardTitle>
                  <div className="flex flex-wrap gap-2 my-2">
                    <Badge variant="outline">边缘人物</Badge>
                    <Badge variant="outline">黑白摄影</Badge>
                    <Badge variant="outline">社会纪实</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    美国摄影艺术家，以拍摄社会边缘人物和不寻常主题闻名。她的作品充满诚实、直接和引人深思的特质，挑战了传统的社会规范和美学。
                  </p>
                  <p className="text-sm text-muted-foreground">活跃时期: 1950s-1970s</p>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    进一步了解 <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2 flex items-center justify-center p-16 bg-gray-100 dark:bg-gray-800/50 rounded-xl">
              <p className="text-muted-foreground text-center">
                点击"黛安·阿勃丝"标签探索其标志性风格、技术方法和创作理念
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* 风格学习资源推荐 */}
      <section className="mt-10 p-6 bg-purple-50 dark:bg-purple-950/30 rounded-xl">
        <h3 className="text-xl font-bold mb-4">深入学习资源</h3>
        <p className="mb-4">
          通过这些资源进一步探索标志性摄影风格，加深你对摄影视觉语言的理解：
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: "摄影师传记与文集",
              description: "了解大师的思想过程和创作哲学"
            },
            {
              title: "风格分析专著",
              description: "深入解析著名摄影师的视觉语言系统"
            },
            {
              title: "摄影历史课程",
              description: "在历史背景下理解风格的发展和演变"
            },
            {
              title: "精选摄影展览",
              description: "亲身体验原作的视觉冲击力与细节"
            },
          ].map((item, i) => (
            <Card key={i} className="bg-white/80 dark:bg-gray-900/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button className="bg-purple-600 hover:bg-purple-700">
            浏览完整学习资源库
          </Button>
        </div>
      </section>
    </div>
  );
} 