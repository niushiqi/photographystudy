"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// 使用any类型绕过类型检查问题
type ThemeProviderProps = {
  children: React.ReactNode;
  [key: string]: any;
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
} 