"use client";

import { motion } from "framer-motion";

const advantages = [
  {
    title: "交互式而非静态",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
      </svg>
    ),
    traditional: "传统文章阅读，被动接收信息",
    ours: "调整参数，实时查看效果变化，边做边学",
  },
  {
    title: "可视化而非抽象",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
      </svg>
    ),
    traditional: "晦涩难懂的技术术语和原理解释",
    ours: "动态可视化展示，让复杂原理变得直观",
  },
  {
    title: "系统化而非碎片",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z" clipRule="evenodd" />
      </svg>
    ),
    traditional: "零散的技巧和教程，缺乏体系",
    ours: "完整的学习路径，从入门到精通的清晰框架",
  },
  {
    title: "个性化而非统一",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
      </svg>
    ),
    traditional: "千篇一律的学习内容和进度",
    ours: "根据兴趣和水平推荐内容，定制学习体验",
  },
];

const benefits = [
  "学习效率提高60%", 
  "摄影技能快速提升", 
  "作品质量明显提高", 
  "培养独特创作风格"
];

export function WhyComponent() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* 装饰背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-background via-purple-900/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700/5 rounded-full blur-3xl" />
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
            为什么选择<span className="bg-clip-text text-transparent bg-gradient-purple">我们的平台</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            与传统摄影学习方式相比，我们提供更高效、更直观、更有趣的学习体验。
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 mb-16">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              className="bg-card border rounded-xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`p-6 relative overflow-hidden ${index % 2 === 0 ? "bg-purple-700" : "bg-purple-600"}`}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg text-white">
                    {advantage.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {advantage.title}
                  </h3>
                </div>
                <div className="absolute -right-4 -bottom-8 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -right-10 -bottom-10 w-16 h-16 bg-white/5 rounded-full" />
              </div>
              
              <div className="grid grid-cols-1 divide-y">
                <div className="p-4 bg-card/50">
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-400 shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-sm text-muted-foreground font-medium mb-1">传统学习方式</div>
                      <p>{advantage.traditional}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-background">
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-500 shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-sm text-muted-foreground font-medium mb-1">我们的平台</div>
                      <p>{advantage.ours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-card border rounded-xl p-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-purple" />
            <h3 className="text-xl font-bold mb-6 text-center">用户收益</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="relative bg-background rounded-lg border p-4 text-center hover:border-purple-600 transition-colors overflow-hidden group"
                >
                  <div className="relative z-10">
                    <div className="mb-3 flex justify-center">
                      <div className="w-8 h-8 rounded-full bg-purple-600/10 flex items-center justify-center text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm font-medium">{benefit}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0 bg-purple-500 opacity-10 transition-all duration-300 group-hover:h-full" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 