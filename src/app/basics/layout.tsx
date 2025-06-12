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
    <div className="min-h-screen">
      {children}
    </div>
  );
} 