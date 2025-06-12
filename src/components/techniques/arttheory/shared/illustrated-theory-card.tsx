"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface IllustratedTheoryCardProps {
  title: string;
  icon?: ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
  footer?: ReactNode;
  className?: string;
  delay?: number;
  imagePosition?: "top" | "side";
}

export function IllustratedTheoryCard({
  title,
  icon,
  description,
  imageSrc,
  imageAlt,
  footer,
  className = "",
  delay = 0,
  imagePosition = "top",
}: IllustratedTheoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="h-full"
    >
      <Card className={`h-full overflow-hidden border border-purple-200/20 hover:border-purple-400/40 transition-colors ${className}`}>
        {imagePosition === "top" && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image 
              src={imageSrc} 
              alt={imageAlt} 
              fill 
              sizes="100%"
              className="object-cover transition-transform hover:scale-105 duration-700"
            />
          </div>
        )}
        
        <div className={`flex flex-col ${imagePosition === "side" ? "md:flex-row" : ""}`}>
          {imagePosition === "side" && (
            <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
              <Image 
                src={imageSrc} 
                alt={imageAlt} 
                fill 
                sizes="100%"
                className="object-cover transition-transform hover:scale-105 duration-700"
              />
            </div>
          )}
          
          <div className={`flex-1 ${imagePosition === "side" ? "md:max-w-2/3" : ""}`}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                {icon && <div className="text-purple-500">{icon}</div>}
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{description}</p>
            </CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
          </div>
        </div>
      </Card>
    </motion.div>
  );
} 