/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",  // 启用静态导出
  distDir: "out",    // 输出目录（默认是 "out"）
  trailingSlash: true,  // 可选：添加尾部斜杠
  images: {
    domains: ['images.unsplash.com', 'miro.medium.com', 'www.anseladams.com', 'upload.wikimedia.org', 'www.moma.org', 'www.magnumphotos.com'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.anseladams.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.moma.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.magnumphotos.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig 