"use client";

import { motion } from "framer-motion";
import { CameraIcon, SparklesIcon, PaintBrushIcon, CpuChipIcon, WrenchScrewdriverIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const features = [
  {
    title: "基础知识",
    description: "从零开始，建立摄影认知地基，掌握相机结构、曝光原理、焦距特性等基本概念。",
    icon: CameraIcon,
    href: "/basics",
    color: "from-purple-600 to-purple-400",
  },
  {
    title: "技术进阶",
    description: "深入探索摄影原理，理解参数背后的科学逻辑，掌握曝光、测光与对焦系统等技术。",
    icon: CpuChipIcon,
    href: "/techniques",
    color: "from-purple-600 to-purple-400",
  },
  {
    title: "拍摄技巧",
    description: "解决实战问题的操作指南，覆盖人像、风景、街拍等各类题材的专业拍摄方法。",
    icon: SparklesIcon,
    href: "/shooting-tips",
    color: "from-purple-600 to-purple-400",
  },
  {
    title: "场景与风格",
    description: "探索不同场景的视觉语言，学习如何建立个人风格，解码经典摄影师的创作密码。",
    icon: PaintBrushIcon,
    href: "/styles",
    color: "from-purple-600 to-purple-400",
  },
  {
    title: "器材指南",
    description: "基于实际场景的器材选购与使用建议，避开参数陷阱，找到真正适合的工具。",
    icon: WrenchScrewdriverIcon,
    href: "/equipment",
    color: "from-purple-600 to-purple-400",
  },
  {
    title: "艺术理论",
    description: "超越技术层面的思考，探讨摄影的艺术本质，建立个人创作理念和视觉哲学。",
    icon: BookOpenIcon,
    href: "/arttheory",
    color: "from-purple-600 to-purple-400",
  },
];

export function FeaturesSection() {
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
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold md:text-4xl mb-4">
            探索摄影世界的六大模块
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            我们将摄影知识体系分为六大核心板块，每个模块针对特定领域，形成完整的学习路径。
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Link
                href={feature.href}
                className="block h-full group"
              >
                <div className="bg-card border rounded-lg p-6 h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-br ${feature.color} mb-5`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 