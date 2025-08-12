import createWithPWA from '@ducanh2912/next-pwa';
import type { NextConfig } from 'next';

const withPWA = createWithPWA({
  dest: 'public', // sw.js, workbox-*.js 출력 위치
  disable: process.env.NODE_ENV === 'development', // 개발 중에는 SW 비활성 권장
  // disable: false,
  register: true, // 클라이언트에서 SW 자동 등록
  cacheOnFrontEndNav: true, // next/link 네비게이션 시 추가 캐싱
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true, // 오프라인에서 온라인으로 전환 시 SW 재등록
  workboxOptions: {
    disableDevLogs: true, // 개발 중 Workbox 로그 비활성화
  },
  // App 시작 URL이 로그인/비로그인에 따라 다른 HTML을 내면:
  // cacheStartUrl: true,
  // dynamicStartUrl: true,
  // dynamicStartUrlRedirect: '/login', // 시작 URL이 리다이렉트된다면 추천
  // runtimeCaching는 아래 5)에서 예시 제공
});

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack: config => {
    // @ts-expect-error 타입 에러 무시
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              ext: 'tsx',
            },
          },
        ],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

export default withPWA(nextConfig);
