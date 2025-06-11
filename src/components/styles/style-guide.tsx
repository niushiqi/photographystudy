import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Layers, Lightbulb, Repeat, ThumbsUp } from "lucide-react";

export function StyleGuide() {
  return (
    <div className="space-y-8">
      {/* 介绍部分 */}
      <section className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 p-6 rounded-xl">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">发展个人摄影风格</h3>
          <p className="text-muted-foreground mb-6">
            建立个人风格是每位摄影师成长路径上的重要里程碑。本指南将帮助你发现、培养和完善属于自己的视觉语言。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white/80 dark:bg-gray-900/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Compass className="h-5 w-5 text-purple-500" />
                  风格的意义
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>个人风格不仅能让你的作品从人群中脱颖而出，更是传达个人视角和情感的方式，是对自身创意视野的表达。</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-gray-900/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-purple-500" />
                  风格与技术
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>风格不仅是技术的集合，更是你对世界的独特视角。合理的技术选择能帮助你更好地表达这种视角。</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 风格发展路径 */}
      <section>
        <h3 className="text-2xl font-bold mb-6">风格发展路径</h3>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800/30"></div>
          <div className="space-y-8">
            {[
              {
                icon: <Compass />,
                title: "探索与学习",
                description: "研究不同风格、摄影师和视觉语言，收集启发你的参考作品，建立视觉词汇库。",
                tips: ["每周选择一位新摄影师学习", "收集激发灵感的图片", "参加摄影展览和讲座"],
              },
              {
                icon: <Repeat />,
                title: "实验与尝试",
                description: "尝试多种技术、主题和风格，找出最能引起你共鸣的元素，进行有意识的实验。",
                tips: ["每月挑战一种新摄影风格", "在相同场景尝试不同处理方法", "记录每次实验的感受"],
              },
              {
                icon: <ThumbsUp />,
                title: "选择与专注",
                description: "识别你最喜爱的元素，锁定能代表你视角的风格特征，开始培养一致性。",
                tips: ["创建个人最爱作品集", "找出作品中的共同元素", "向信任的人征求反馈"],
              },
              {
                icon: <Layers />,
                title: "完善与进化",
                description: "精炼你的风格，加强一致性但保持创新空间，让风格随你的成长而自然演变。",
                tips: ["制定风格指南记录你的选择", "定期复盘作品集演变", "寻找微小变化而非剧烈转型"],
              },
            ].map((step, index) => (
              <div key={index} className="relative pl-16">
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500 dark:bg-purple-600 text-white flex items-center justify-center">
                    {React.cloneElement(step.icon, { className: "h-5 w-5" })}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <h5 className="font-medium mb-2">实践建议:</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {step.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 风格分析工具 */}
      <section>
        <h3 className="text-2xl font-bold mb-6">风格分析工具</h3>
        <Tabs defaultValue="visual">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="visual">视觉元素分析</TabsTrigger>
            <TabsTrigger value="technical">技术特征分析</TabsTrigger>
            <TabsTrigger value="emotional">情感影响分析</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>视觉元素检查表</CardTitle>
                <CardDescription>
                  分析你的作品中出现的视觉模式和偏好
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "构图倾向（对称/不对称/最小化）",
                    "主要色彩模式和色调",
                    "光影处理风格和偏好",
                    "主体与背景关系处理",
                    "空间利用和视觉重量分布",
                    "纹理细节与整体处理",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="mt-1 h-4 w-4 rounded-full border-2 border-purple-500"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>技术特征分析</CardTitle>
                <CardDescription>
                  识别你在技术选择上的一致性模式
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "偏好的焦距范围",
                    "光圈选择模式",
                    "快门速度倾向",
                    "后期处理标志性步骤",
                    "锐度和对比度处理",
                    "噪点和颗粒感处理",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="mt-1 h-4 w-4 rounded-full border-2 border-purple-500"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emotional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>情感影响分析</CardTitle>
                <CardDescription>
                  了解你的作品传达的情感和氛围
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "作品引发的主要情绪",
                    "传达的主题和信息",
                    "观者反应的一致性",
                    "情绪塑造的主要视觉元素",
                    "叙事风格和故事性",
                    "个人表达与普遍共鸣的平衡",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="mt-1 h-4 w-4 rounded-full border-2 border-purple-500"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* 行动计划 */}
      <section className="mt-10">
        <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">开始你的风格之旅</h3>
          <p className="mb-6">
            创建个人风格是一个持续的旅程，需要时间、反思和实践。开始建立你的风格档案，记录你的进展和发现。
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700">
            创建风格档案 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
} 