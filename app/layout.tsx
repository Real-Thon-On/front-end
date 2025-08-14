import type { Metadata, Viewport } from 'next';
import fs from 'node:fs/promises';
import path from 'node:path';

import './globals.css';
import { pretendard } from '@/public/font';

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

async function getStartupImagesFromSnippet(): Promise<{ url: string; media?: string }[]> {
  try {
    const html = await fs.readFile(
      path.join(process.cwd(), 'public', 'pwa', 'pwa-snippet.html'),
      'utf8'
    );
    const linkRe = /<link\s+[^>]*rel=["']apple-touch-startup-image["'][^>]*>/g;
    const hrefRe = /href=["']([^"']+)["']/;
    const mediaRe = /media=["']([^"']+)["']/;
    return Array.from(html.matchAll(linkRe))
      .map(m => {
        let href = hrefRe.exec(m[0])?.[1] ?? '';
        const media = mediaRe.exec(m[0])?.[1];
        if (!href.startsWith('/')) href = `/pwa/${href.replace(/^\.?\//, '')}`;
        return { url: href, media };
      })
      .filter(Boolean) as { url: string; media?: string }[];
  } catch {
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const startupImage = await getStartupImagesFromSnippet();
  return {
    metadataBase: new URL(SITE_ORIGIN),
    manifest: '/manifest.webmanifest', // ★ 고정 (건드리지 않기)
    applicationName: 'ON',
    title: { default: 'Save Your Minds - ON', template: '%s - ON' },
    description: 'Next.js PWA project',
    icons: {
      icon: [{ url: '/pwa/splash-image/favicon-196.png', sizes: '196x196', type: 'image/png' }],
      apple: [{ url: '/pwa/splash-image/apple-icon-180.png' }],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Save Your Minds - ON',
      startupImage,
    },
    themeColor: '#FFFFFF',
  };
}
export const viewport: Viewport = { themeColor: '#FFFFFF' };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>{children}</body>
    </html>
  );
}
