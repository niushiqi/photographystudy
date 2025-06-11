"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// 此页面用于重定向到/techniques，以解决路由变更问题
export default function ShootingTipsPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/techniques");
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600 dark:text-gray-400">重定向中...</p>
    </div>
  );
} 