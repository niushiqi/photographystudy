"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Camera, 
  BookOpen, 
  Image, 
  PaintBucket, 
  Palette, 
  Layers, 
  Users, 
  Mountain, 
  Camera as StreetCamera,
  Building,
  Menu,
  X 
} from "lucide-react";

// 导航链接数据
const navLinks = [
  { 
    href: "/basics", 
    label: "基础知识", 
    icon: <BookOpen className="w-4 h-4" /> 
  },
  { 
    href: "/techniques", 
    label: "拍摄技巧", 
    icon: <Camera className="w-4 h-4" /> 
  },
  { 
    href: "/equipment", 
    label: "器材指南", 
    icon: <Camera className="w-4 h-4" /> 
  },
  { 
    href: "/styles", 
    label: "场景与风格", 
    icon: <Palette className="w-4 h-4" /> 
  },
  { 
    href: "/postprocessing", 
    label: "后期处理", 
    icon: <PaintBucket className="w-4 h-4" /> 
  },
  { 
    href: "/showcase", 
    label: "作品展示", 
    icon: <Image className="w-4 h-4" /> 
  },
];

// 场景导航数据
const sceneLinks = [
  { 
    href: "/styles?scene=portrait", 
    label: "人像摄影", 
    icon: <Users className="w-4 h-4" /> 
  },
  { 
    href: "/styles?scene=landscape", 
    label: "风景摄影", 
    icon: <Mountain className="w-4 h-4" /> 
  },
  { 
    href: "/styles?scene=street", 
    label: "街头摄影", 
    icon: <StreetCamera className="w-4 h-4" /> 
  },
  { 
    href: "/styles?scene=architecture", 
    label: "建筑摄影", 
    icon: <Building className="w-4 h-4" /> 
  },
];

export function MainNav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSceneMenuOpen, setIsSceneMenuOpen] = useState(false);
  
  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-md py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="gradient-purple p-1.5 rounded-lg">
              <Camera className="w-5 h-5 text-white" />
            </span>
            <span className={`font-bold text-lg ${
              isScrolled 
                ? "text-purple-800 dark:text-purple-300" 
                : "text-purple-700 dark:text-purple-400"
            }`}>
              摄影技术学习
            </span>
          </Link>
          
          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-purple-600 hover:bg-purple-50/50 dark:hover:text-purple-300 dark:hover:bg-purple-900/20"
                  }`}
                >
                  {link.icon}
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* 场景快速导航 */}
            <div className="relative ml-1">
              <button
                className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors text-neutral-600 dark:text-neutral-300 hover:text-purple-600 hover:bg-purple-50/50 dark:hover:text-purple-300 dark:hover:bg-purple-900/20"
                onClick={() => setIsSceneMenuOpen(!isSceneMenuOpen)}
              >
                <Layers className="w-4 h-4" />
                场景导航
              </button>
              
              {isSceneMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-purple-100 dark:border-purple-900 py-2 z-50">
                  {sceneLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300"
                      onClick={() => setIsSceneMenuOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
          
          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {/* 移动端导航菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    isActive
                      ? "text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30"
                      : "text-neutral-600 dark:text-neutral-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/20"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
            
            <div className="pt-2 mt-2 border-t border-neutral-200 dark:border-neutral-700">
              <p className="px-4 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                场景导航
              </p>
              {sceneLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 text-neutral-600 dark:text-neutral-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 