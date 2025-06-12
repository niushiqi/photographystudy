"use client";

import { motion } from "framer-motion";
import { Camera, Lightbulb, Image, BookOpen, Palette, Settings } from "lucide-react";
import Link from "next/link";

export function FeaturesSection() {
  const features = [
    {
      title: "基础知识",
      description: "从基本概念到相机操作，掌握摄影的核心知识和理论基础。",
      icon: <BookOpen className="w-5 h-5" />,
      href: "/basics",
      color: "bg-neutral-200 dark:bg-neutral-700"
    },
    {
      title: "拍摄技巧",
      description: "针对不同场景和主题的实用拍摄方法和专业技巧指导。",
      icon: <Camera className="w-5 h-5" />,
      href: "/techniques",
      color: "bg-neutral-200 dark:bg-neutral-700"
    },
    {
      title: "场景与风格",
      description: "探索不同摄影风格的视觉语言和美学特征，发现和培养个人风格。",
      icon: <Palette className="w-5 h-5" />,
      href: "/styles",
      color: "bg-purple-100 dark:bg-purple-900/60",
      highlight: true
    },
    {
      title: "后期处理",
      description: "从基础调整到高级修饰，全面提升照片的视觉表现力。",
      icon: <Image className="w-5 h-5" />,
      href: "/postprocessing",
      color: "bg-neutral-200 dark:bg-neutral-700"
    },
    {
      title: "器材指南",
      description: "相机、镜头和配件的选择建议与使用技巧解析。",
      icon: <Settings className="w-5 h-5" />,
      href: "/equipment",
      color: "bg-neutral-200 dark:bg-neutral-700"
    },
    {
      title: "创意灵感",
      description: "突破思维局限，激发创作灵感，拓展摄影表现力。",
      icon: <Lightbulb className="w-5 h-5" />,
      href: "/showcase",
      color: "bg-neutral-200 dark:bg-neutral-700"
    },
  ];

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-800 dark:text-white">探索摄影的多维学习空间</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            从入门基础到专业技巧，我们提供系统化的学习路径和互动式的学习体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl ${feature.highlight ? 'interactive-card border-2 border-purple-300 dark:border-purple-700 shadow-md' : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'}`}
            >
              <Link href={feature.href}>
                <div className="h-full flex flex-col">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 ${feature.highlight ? 'text-purple-700 dark:text-purple-300' : 'text-neutral-700 dark:text-neutral-300'}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-neutral-800 dark:text-white">{feature.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">{feature.description}</p>
                  {feature.highlight && (
                    <div className="mt-auto pt-4 flex items-center text-purple-600 dark:text-purple-400 font-medium">
                      <span>立即探索</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 场景与风格特别推荐 */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-300">发现摄影风格</h3>
              <p className="text-purple-700 dark:text-purple-400 mb-6">
                探索不同摄影风格的视觉语言和特点，找到适合自己的表达方式，提升作品的艺术性和个人风格。
              </p>
              <Link 
                href="/styles" 
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
              >
                <Palette className="w-4 h-4 mr-2" />
                进入场景与风格
              </Link>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden bg-white dark:bg-neutral-800 shadow-sm">
                <div className="h-40 bg-purple-200 dark:bg-purple-900/40 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd" 
                    alt="电影感摄影风格" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <span className="text-white font-medium">电影感风格</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    通过色彩、构图和光线，营造出仿佛电影画面的视觉效果和故事感。
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden bg-white dark:bg-neutral-800 shadow-sm">
                <div className="h-40 bg-purple-200 dark:bg-purple-900/40 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1617608338809-03a2d30e3203" 
                    alt="极简主义风格" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <span className="text-white font-medium">极简主义</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    注重简洁留白和形式纯粹性，通过减法创造强大的视觉冲击力。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 