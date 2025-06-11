"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface TheoryCardProps {
  title: string;
  icon?: ReactNode;
  description: string;
  footer?: ReactNode;
  className?: string;
  delay?: number;
}

export function TheoryCard({
  title,
  icon,
  description,
  footer,
  className = "",
  delay = 0,
}: TheoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <Card className={`h-full overflow-hidden border border-purple-200/20 hover:border-purple-400/40 transition-colors ${className}`}>
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
      </Card>
    </motion.div>
  );
} 