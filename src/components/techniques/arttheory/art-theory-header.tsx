"use client";

import { motion } from "framer-motion";

export function ArtTheoryHeader() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-purple mb-4">
            摄影的艺术思维
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            探索摄影的美学、哲学与文化维度，建立个人艺术观念和批判性审美能力
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 max-w-3xl mx-auto text-center"
        >
          <p className="text-base md:text-lg mb-6">
            超越技术的限制，理解摄影作为艺术媒介的深层含义，培养批判性思维和创造性表达
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-accent/30 px-4 py-2 rounded-full text-sm">
              批判性思维
            </div>
            <div className="bg-accent/30 px-4 py-2 rounded-full text-sm">
              艺术语言
            </div>
            <div className="bg-accent/30 px-4 py-2 rounded-full text-sm">
              文化理解
            </div>
            <div className="bg-accent/30 px-4 py-2 rounded-full text-sm">
              思想创新
            </div>
            <div className="bg-accent/30 px-4 py-2 rounded-full text-sm">
              视觉叙事
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-purple-500 blur-[80px]"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-purple-700 blur-[100px]"></div>
      </div>
    </section>
  );
} 