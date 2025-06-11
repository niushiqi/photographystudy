"use client";

import { motion } from "framer-motion";

export default function TechniqueHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="relative py-12 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-700/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="mb-4">
              <span className="block gradient-text animated-gradient font-bold">
                技术进阶
              </span>
              <span className="mt-2 block text-xl md:text-2xl font-medium text-muted-foreground">
                参数背后的科学
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="mb-8 text-lg text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            深入理解摄影技术原理与机制，揭示参数背后的科学奥秘。通过交互式实验和可视化工具，
            将抽象的摄影理论转化为直观易懂的知识，帮助你从"会用"升级到"懂原理"。
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground"
            variants={itemVariants}
          >
            <span className="px-3 py-1 bg-purple-900/30 rounded-full border border-purple-700/30">曝光与动态范围</span>
            <span className="px-3 py-1 bg-purple-900/30 rounded-full border border-purple-700/30">光学成像原理</span>
            <span className="px-3 py-1 bg-purple-900/30 rounded-full border border-purple-700/30">测光与对焦系统</span>
            <span className="px-3 py-1 bg-purple-900/30 rounded-full border border-purple-700/30">传感器技术</span>
            <span className="px-3 py-1 bg-purple-900/30 rounded-full border border-purple-700/30">高级拍摄模式</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 