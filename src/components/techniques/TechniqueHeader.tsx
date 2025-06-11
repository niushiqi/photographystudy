"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function TechniqueHeader() {
  return (
    <header className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            拍摄技巧
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-6 text-amber-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            实战场景动作手册，为您提供即学即用的操作模板和具体解决方案
          </motion.p>
          
          <motion.div
            className="flex space-x-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="hover:underline">
              首页
            </Link>
            <span>/</span>
            <span className="font-medium">拍摄技巧</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
} 