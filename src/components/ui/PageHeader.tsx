"use client";

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  description?: string;
  bgGradient?: boolean;
  icon?: string; // Optional icon path
}

export function PageHeader({
  title,
  description,
  bgGradient = true,
  icon,
}: PageHeaderProps) {
  return (
    <div className={`mb-10 ${
      bgGradient ? 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/10' : ''
    } rounded-lg p-6`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {icon && (
          <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-full shadow-md">
            <Image src={icon} alt={`${title} icon`} width={48} height={48} />
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-900 dark:text-purple-100">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
} 