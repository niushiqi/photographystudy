"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinks = [
  {
    title: "学习内容",
    links: [
      { name: "基础知识", href: "/basics" },
      { name: "技术进阶", href: "/techniques" },
      { name: "拍摄技巧", href: "/shooting-tips" },
      { name: "场景与风格", href: "/styles" },
    ],
  },
  {
    title: "进阶学习",
    links: [
      { name: "后期处理", href: "/postprocessing" },
      { name: "器材指南", href: "/equipment" },
      { name: "艺术理论", href: "/arttheory" },
      { name: "作品展示", href: "/showcase" },
    ],
  },
  {
    title: "关于我们",
    links: [
      { name: "平台介绍", href: "/about" },
      { name: "联系我们", href: "/contact" },
      { name: "使用条款", href: "/terms" },
      { name: "隐私政策", href: "/privacy" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里应该有实际的订阅逻辑
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-card text-card-foreground border-t relative z-10 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="h-8 w-8 rounded-full bg-gradient-to-r from-purple to-gold" />
              <span className="text-xl font-bold">摄影技术学习</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              一个现代、交互式的摄影技术学习平台，完全摒弃传统文章形式，通过交互式组件、可视化体验和知识卡片，将复杂的摄影概念转化为直观易懂的学习内容。
            </p>
            <div className="flex space-x-4">
              {/* 社交媒体图标 */}
              <SocialIcon type="weibo" />
              <SocialIcon type="wechat" />
              <SocialIcon type="zhihu" />
              <SocialIcon type="bilibili" />
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">订阅我们的通讯</h3>
            {subscribed ? (
              <p className="text-sm text-muted-foreground">
                感谢您的订阅！您将收到我们的最新摄影技巧和教程。
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  订阅我们的通讯，获取最新摄影教程、技巧和创作灵感。
                </p>
                <div className="flex max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="您的邮箱地址"
                    required
                    className="flex h-10 w-full rounded-md rounded-r-none border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <button
                    type="submit"
                    className="h-10 rounded-md rounded-l-none border border-l-0 border-input bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                  >
                    订阅
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} 摄影技术学习平台. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ type }: { type: "weibo" | "wechat" | "zhihu" | "bilibili" }) {
  const iconClasses = "h-5 w-5 fill-current";

  return (
    <Link
      href={`#${type}`}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
      )}
      aria-label={type}
    >
      {type === "weibo" && (
        <svg
          viewBox="0 0 24 24"
          className={iconClasses}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.098 20c-3.297 0-6-2.097-6-4.681 0-2.584 3.769-6.13 6.213-4.557.975-1.013.244-2.684-.893-2.684-.699 0-1.279.575-1.293 1.286-.014.7-.132.873-.928.874-.94.001-.786-.84-.786-1.284 0-1.715 1.404-3.026 3.02-3.026 2.144 0 3.648 1.956 2.799 4.028 2.044-.318 3.94.307 4.626 1.88.605 1.384.445 2.833-.443 4.075-.967 1.348-2.74 2.901-4.53 3.312 1.152.3 2.375.301 3.395-.126 1.185-.494 1.729-1.39 1.423-2.076-.18-.397-.04-.704.431-.704.338 0 .633.264.722.625.549 2.23-2.056 3.058-4.431 3.058-.772 0-1.52-.098-2.21-.26-.063-.014-.128-.027-.185-.041-3.41-.717-5.93-3.328-5.93-6.203 0-3.862 3.93-6.811 8.81-6.801 5.055.01 9.167 2.8 9.167 6.668 0 3.682-3.624 6.436-8.477 6.437" />
        </svg>
      )}
      {type === "wechat" && (
        <svg
          viewBox="0 0 24 24"
          className={iconClasses}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.5 7a7.398 7.398 0 0 0-2.89.59 7.588 7.588 0 0 0-3.79 4.049A7.203 7.203 0 0 0 2 14.957c.041.86.29 1.73.712 2.525.424.794 1.01 1.478 1.73 2.012l-.224.446c-.1.224-.16.447-.224.671l-.058.306.27-.112.796-.306.894-.377.199.06c.821.24 1.68.365 2.544.368a7.483 7.483 0 0 0 2.89-.59 7.588 7.588 0 0 0 3.79-4.05 7.19 7.19 0 0 0 .82-3.317 7.19 7.19 0 0 0-.822-3.317A7.588 7.588 0 0 0 12.39 7.59 7.398 7.398 0 0 0 9.5 7m9 1.39c.967.242 1.892.645 2.73 1.194a6.585 6.585 0 0 1 2.167 2.242c.5.913.754 1.953.73 3.01a6.41 6.41 0 0 1-.731 3.01 6.585 6.585 0 0 1-2.166 2.242 6.337 6.337 0 0 1-2.73 1.194l-.268.059-.11.046-.87-.389-.723-.318.035-.077c-.617-.439-1.154-.995-1.574-1.635a6.03 6.03 0 0 1-.87-3.133 6.03 6.03 0 0 1 .87-3.133 6.585 6.585 0 0 1 2.167-2.242 6.337 6.337 0 0 1 2.73-1.194l.268-.059.11-.047.87.39.723.317-.035.077c.617.44 1.154.995 1.574 1.635.55.942.83 2.028.798 3.133" />
        </svg>
      )}
      {type === "zhihu" && (
        <svg
          viewBox="0 0 24 24"
          className={iconClasses}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.56C21.751 24 24 21.75 24 18.281V5.72C24 2.249 21.75 0 18.281 0zm1.964 4.078c-.271.73.07 1.31.3 1.93.105.315.256.632.435.95.06.108.22.5.33.73.265.39.354.838.354.838l.949.095s.001.72-.033 1.045c-.035.328-.331 1.239-.331 1.239-.318.789-1.746 1.909-1.746 1.909l.882 2.205.951 2.228c.444.449 1.095 1.889 1.095 1.889l-3.273-.103s-.135-.336-.405-.902c-.271-.566-1.075-1.459-1.075-1.459-.306.283-.757.487-1.12.66-.362.173-.635.211-.635.211V17h-2.37v-8.93h2.37s.913.018 1.515-.31c.603-.327.809-.882.809-.882s.197-.408.287-.645c.089-.237.44-1.16-.017-1.638-.457-.477-1.772-.674-1.772-.674zm8.87 1.684h4.55l-.525 2.947h-2.865S17.522 14.268 17.5 14.288c-.023.02-.215.518-.398.518-.183 0-1.28 0-1.28 0v3.74h2.854l-.38 2.467h-7.326l.383-2.467h2.693V10.1s-1.328.02-1.675.02c-.348 0-.629.566-.629.566L10.15 8.709h2.468V5.646h3.936zm-10.12.623c.67.14.395.58.317.948-.078.368-.35.75-.828.864-.476.115-1.01-.143-1.073-.591-.064-.448.293-.944.713-1.01.42-.066.871-.21.871-.21z" />
        </svg>
      )}
      {type === "bilibili" && (
        <svg
          viewBox="0 0 24 24"
          className={iconClasses}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
        </svg>
      )}
    </Link>
  );
} 