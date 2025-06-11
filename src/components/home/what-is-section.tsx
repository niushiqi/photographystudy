"use client";

import { motion } from "framer-motion";

export function WhatIsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* 装饰背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold md:text-4xl mb-4">
            什么是<span className="bg-clip-text text-transparent bg-gradient-purple">摄影技术学习平台</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            摄影技术学习平台是一个革命性的学习环境，完全摒弃传统文章形式，通过交互式组件、可视化体验和知识卡片，将复杂的摄影概念转化为直观易懂的学习内容。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-card border rounded-2xl p-8 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-purple-600" />
            <div className="mb-6 relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                  <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">全交互式学习体验</h3>
            <p className="text-muted-foreground">
              所有学习内容都以交互组件呈现，让您通过调整参数实时查看效果变化，边做边学。
            </p>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-700 opacity-10 rounded-tl-full transform translate-x-8 translate-y-8 transition-all duration-300 group-hover:opacity-20" />
          </motion.div>

          <motion.div
            className="bg-card border rounded-2xl p-8 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-purple-500" />
            <div className="mb-6 relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                  <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
                  <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">视觉化学习优先</h3>
            <p className="text-muted-foreground">
              通过动态演示和可视化展示摄影概念，降低学习门槛，让复杂理论变得简单易懂。
            </p>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500 opacity-10 rounded-tl-full transform translate-x-8 translate-y-8 transition-all duration-300 group-hover:opacity-20" />
          </motion.div>

          <motion.div
            className="bg-card border rounded-2xl p-8 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-purple-400" />
            <div className="mb-6 relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-purple-400/10 flex items-center justify-center text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">情境化知识架构</h3>
            <p className="text-muted-foreground">
              按照用户实际需求和场景组织知识，而非传统的理论分类，让学习内容与实际应用紧密结合。
            </p>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400 opacity-10 rounded-tl-full transform translate-x-8 translate-y-8 transition-all duration-300 group-hover:opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 