"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "这个平台适合初学者使用吗？",
    answer:
      "非常适合！我们的平台专为各种水平的摄影爱好者设计，特别是初学者。基础知识模块特别针对零基础用户，提供交互式学习内容，让您轻松理解摄影核心概念。",
  },
  {
    question: "如何充分利用交互式学习功能？",
    answer:
      "我们建议您在学习时积极调整各种参数、拖动控件，观察实时效果变化。结合理论知识和实际操作，尝试将学到的技巧应用到自己的摄影创作中，并利用平台提供的案例分析加深理解。",
  },
  {
    question: "平台的内容会定期更新吗？",
    answer:
      "是的，我们会定期更新所有模块的内容，包括新的教程、案例分析和交互组件。我们跟踪摄影技术的最新发展，确保内容始终保持新鲜和相关性。",
  },
  {
    question: "如何根据我的兴趣定制学习路径？",
    answer:
      "您可以从任何感兴趣的模块开始学习。我们会根据您的浏览历史和完成的内容自动推荐相关教程。您也可以使用标签系统筛选特定主题，如人像、风景、产品摄影等，打造个性化学习体验。",
  },
  {
    question: "平台上的知识如何应用到实际拍摄中？",
    answer:
      "每个知识点都配有实际应用案例和练习建议。我们鼓励您在学习后立即进行实践，并可以将作品上传到平台获取反馈。'拍摄技巧'和'场景与风格'模块特别关注实际应用场景，提供可直接使用的技巧。",
  },
  {
    question: "我需要什么设备才能利用这个平台学习？",
    answer:
      "只需一台能上网的设备（电脑、平板或手机）即可。虽然拥有相机会帮助实践，但许多概念和技巧也可以用智能手机相机练习。平台的交互式内容兼容各种设备，确保良好的学习体验。",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold md:text-4xl mb-4">常见问题</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            对摄影技术学习平台有疑问？这里是用户最常提问的几个问题及解答。
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFaq(index)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border bg-background p-4 text-left text-lg font-medium transition-all",
                  openIndex === index
                    ? "rounded-b-none border-b-0"
                    : "hover:bg-muted/50"
                )}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={cn("h-5 w-5 transition-transform", {
                    "rotate-180": openIndex === index,
                  })}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <div
                className={cn(
                  "overflow-hidden rounded-b-lg border border-t-0 bg-background transition-all",
                  openIndex === index ? "block" : "hidden"
                )}
              >
                <div className="p-4 text-muted-foreground">{faq.answer}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="text-muted-foreground">
            还有其他问题？{" "}
            <a
              href="#contact"
              className="text-primary font-medium hover:underline"
            >
              联系我们获取帮助
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
} 