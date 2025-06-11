"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "交互式学习体验",
    description:
      "告别枯燥的文字教程，通过互动练习、视觉引导和实时反馈，让学习变得更加直观有趣。",
  },
  {
    title: "视觉优先的设计",
    description:
      "大量高质量的示例图片和视频演示，直观展示摄影技巧的应用效果和操作过程。",
  },
  {
    title: "个性化学习路径",
    description:
      "根据您的兴趣、经验水平和设备类型，定制专属学习计划，循序渐进提升技能。",
  },
  {
    title: "专业摄影师指导",
    description:
      "来自专业摄影师的教程和点评，分享行业经验和创作心得，助您掌握专业技巧。",
  },
];

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 左侧图片 */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple to-gold opacity-20 blur-2xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-card shadow-lg flex items-center justify-center overflow-hidden border-8 border-white dark:border-gray-800">
                  <div className="w-full h-full bg-gradient-to-br from-purple/80 to-gold/80 flex items-center justify-center text-white text-5xl font-bold">
                    摄影
                  </div>
                </div>
              </div>
              {/* 装饰性圆点 */}
              <div className="absolute top-10 left-0 w-12 h-12 rounded-full bg-purple-light" />
              <div className="absolute bottom-10 right-0 w-16 h-16 rounded-full bg-gold-light" />
              <div className="absolute top-1/2 right-10 w-8 h-8 rounded-full bg-purple-dark" />
            </div>
          </div>

          {/* 右侧内容 */}
          <div>
            <h2 className="text-3xl font-bold mb-6">关于我们的平台</h2>
            <p className="text-muted-foreground mb-8">
              我们的平台致力于为摄影爱好者和专业人士提供现代化、交互式的学习体验，
              摒弃传统文章阅读式学习方式，通过更直观、有趣的方式传授摄影技巧。
            </p>

            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                了解更多关于我们
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
} 