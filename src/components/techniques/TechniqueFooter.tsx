"use client";

import Link from "next/link";

export function TechniqueFooter() {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">
              相关模块推荐
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/basics" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  基础知识
                </Link>
                <span className="text-neutral-600 dark:text-neutral-400 text-sm ml-2">
                  — 掌握摄影核心概念与参数
                </span>
              </li>
              <li>
                <Link 
                  href="/advanced" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  技术进阶
                </Link>
                <span className="text-neutral-600 dark:text-neutral-400 text-sm ml-2">
                  — 深入理解摄影原理与设备
                </span>
              </li>
              <li>
                <Link 
                  href="/styles" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  场景与风格
                </Link>
                <span className="text-neutral-600 dark:text-neutral-400 text-sm ml-2">
                  — 探索不同拍摄风格与表达
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">
              学习资源
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/resources/books" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  推荐书籍
                </Link>
              </li>
              <li>
                <Link 
                  href="/resources/videos" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  教学视频
                </Link>
              </li>
              <li>
                <Link 
                  href="/resources/practice" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  实践练习
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center text-neutral-600 dark:text-neutral-400 text-sm">
          © {new Date().getFullYear()} 摄影技术学习网站 • 实战技巧模块
        </div>
      </div>
    </footer>
  );
} 