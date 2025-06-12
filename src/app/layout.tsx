import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConditionalFooter } from "@/components/layout/conditional-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "摄影技术学习 - 交互式摄影学习平台",
  description: "一个现代、交互式的摄影技术学习平台，提供丰富的摄影教程、技巧和实践案例，帮助您成为更优秀的摄影师。",
  keywords: "摄影, 学习, 技术, 教程, 摄影教程, 摄影技巧, 相机使用, 后期处理",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex flex-col">
              <div className="page-transition-enter-active flex-grow">
                {children}
              </div>
            </main>
            <ConditionalFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 