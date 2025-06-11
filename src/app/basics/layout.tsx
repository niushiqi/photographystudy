import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '基础知识 | 摄影技术学习',
  description: '通过交互式组件和可视化体验，快速掌握摄影的基础概念和原理。',
};

export default function BasicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              <Link href="/basics">摄影基础知识</Link>
            </h1>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <Link 
                    href="/" 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    首页
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/techniques" 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    拍摄技巧
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/advanced" 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    技术进阶
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 