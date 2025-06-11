import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              以<span className="text-blue-400">交互</span>代替文章<br />
              <span className="text-blue-400">直观</span>理解摄影技术
            </h1>
            <p className="text-xl text-gray-300 max-w-lg">
              完全摒弃传统文章形式，通过可视化体验和交互式组件，让摄影学习变得生动、高效且充满乐趣。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/basics" 
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                开始学习
                <ArrowRight size={18} />
              </Link>
              <Link 
                href="/about" 
                className="px-6 py-3 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                了解更多
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-60"></div>
            <div className="relative bg-gray-800 rounded-lg overflow-hidden h-96">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/80 to-transparent z-10"></div>
              <div className="grid grid-cols-2 gap-1 h-full">
                <div className="bg-cover bg-center" style={{backgroundImage: "url('/images/hero-1.jpg')"}}></div>
                <div className="grid grid-rows-2 gap-1">
                  <div className="bg-cover bg-center" style={{backgroundImage: "url('/images/hero-2.jpg')"}}></div>
                  <div className="bg-cover bg-center" style={{backgroundImage: "url('/images/hero-3.jpg')"}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 