"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-background to-background/0" />
        <div className="absolute -top-64 left-1/2 w-[800px] h-[800px] -translate-x-1/2 rounded-full bg-purple/20 blur-3xl opacity-40" />
        <div className="absolute -bottom-32 left-1/4 w-[400px] h-[400px] rounded-full bg-gold/10 blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            开启您的摄影之旅
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            通过交互式学习方式，探索摄影的奥秘，释放您的创作潜能
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/basics"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 py-2 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              开始学习
            </Link>
            <Link
              href="/showcase"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 py-2 text-lg font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              浏览作品展示
            </Link>
          </div>
        </motion.div>

        {/* 圆形装饰元素 */}
        <div className="absolute -bottom-16 left-1/4 transform -translate-x-1/2 hidden md:block">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple/40 to-gold/40" />
        </div>
        <div className="absolute -top-8 right-1/4 transform translate-x-1/2 hidden md:block">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gold/40 to-purple/40" />
        </div>
      </div>
    </section>
  );
} 