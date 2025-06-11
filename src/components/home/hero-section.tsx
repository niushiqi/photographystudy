"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理搜索逻辑
    console.log("搜索:", searchQuery);
  };

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
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-700/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="mb-6">
              <span className="block gradient-text animated-gradient font-extrabold">
                摄影技术学习平台
              </span>
              <span className="mt-2 block text-xl md:text-2xl font-medium text-muted-foreground">
                交互式学习体验，从入门到精通
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            探索摄影的奥秘，掌握专业技巧，通过实践案例和互动教程，
            在愉悦的学习过程中成为更优秀的摄影师。
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <Link
              href="/courses"
              className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-purple px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              开始学习
            </Link>
            <Link
              href="/about"
              className="inline-flex h-11 items-center justify-center rounded-full border border-purple-700/30 bg-purple-900/30 px-8 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-purple-800/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              了解更多
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 圆形装饰元素 */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <div className="w-20 h-20 rounded-full bg-gradient-purple opacity-80" />
      </div>
    </section>
  );
}

function SearchIcon({ className }: { className?: string }) {
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
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
} 