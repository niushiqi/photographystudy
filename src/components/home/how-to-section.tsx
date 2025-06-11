"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "选择感兴趣的模块",
    description:
      "根据您的需求和兴趣，选择基础知识、技术进阶、拍摄技巧等六大模块中的任一主题。",
  },
  {
    number: "02",
    title: "体验交互式学习",
    description:
      "通过调整参数、拖动控件、查看实时效果变化，深入理解摄影原理和技术。",
  },
  {
    number: "03",
    title: "实践案例分析",
    description:
      "通过解析真实摄影作品和场景，了解专业摄影师如何运用技术实现创意想法。",
  },
  {
    number: "04",
    title: "建立个人风格",
    description:
      "掌握基础技能后，探索不同摄影风格，形成自己独特的视觉语言和创作方向。",
  },
];

export function HowToSection() {
  return (
    <section className="py-24 bg-purple-950/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold md:text-4xl mb-4">
            如何使用<span className="bg-clip-text text-transparent bg-gradient-purple">平台学习</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            我们设计了清晰的学习路径，引导您从入门到精通，建立完整的摄影知识体系。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border rounded-xl p-6 relative overflow-hidden group"
              whileHover={{ y: -5 }}
            >
              {/* 背景装饰 */}
              <div 
                className={`absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-10 transform translate-x-8 -translate-y-8 transition-all duration-300 group-hover:opacity-20 ${
                  index % 2 === 0 ? 'bg-purple-700' : 'bg-purple-500'
                }`}
              />
              
              {/* 序号指示器 */}
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                  index % 2 === 0 ? 'bg-gradient-purple' : 'bg-purple-600'
                }`}>
                  {step.number}
                </div>
                <h3 className="ml-4 text-xl font-bold">{step.title}</h3>
              </div>
              
              <p className="text-muted-foreground pl-14">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 