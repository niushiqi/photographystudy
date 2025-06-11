"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface WorkCardProps {
  id: string;
  title: string;
  photographer: string;
  year: number;
  imageUrl: string;
  category: string;
  technique?: string;
  description?: string;
  onClick?: () => void;
}

export function WorkCard({
  title,
  photographer,
  year,
  imageUrl,
  category,
  technique,
  description,
  onClick,
}: WorkCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-lg cursor-pointer",
        "bg-secondary/30 border border-border hover:border-primary/50 transition-all"
      )}
      whileHover={{ y: -5 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[3/4] overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={`${title} - ${photographer}`}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            isHovered ? "scale-105" : "scale-100"
          )}
        />

        {/* 渐变覆盖层 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

        {/* 作品信息 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-sm opacity-90">{photographer}</p>
            <p className="text-sm opacity-70">{year}</p>
          </div>
          
          {/* 技术与类别标签 */}
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs">
              {category}
            </span>
            {technique && (
              <span className="px-2 py-0.5 bg-secondary/50 text-secondary-foreground rounded-full text-xs">
                {technique}
              </span>
            )}
          </div>

          {/* 描述 (仅在悬停时显示) */}
          {description && (
            <motion.p
              className="text-xs mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0, y: 10 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
} 