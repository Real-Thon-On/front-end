import type { Metadata, Viewport } from 'next';
import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

import './globals.css';
import { pretendard } from '@/public/font';

const APP_NAME = 'ON';
const APP_DEFAULT_TITLE = 'Save Your Minds - ON';
const APP_TITLE_TEMPLATE = '%s - ON';
const APP_DESCRIPTION = 'Next.js PWA project';

async function getStartupImagesFromSnippet(): Promise<{ url: string; media?: string }[]> {
  try {
    const snippetPath = path.join(process.cwd(), 'public', 'pwa', 'pwa-snippet.html');
    const html = await fs.readFile(snippetPath, 'utf8');

    const linkRe = /<link\s+[^>]*rel=["']apple-touch-startup-image["'][^>]*>/g;
    const hrefRe = /href=["']([^"']+)["']/;
    const mediaRe = /media=["']([^"']+)["']/;

    return Array.from(html.matchAll(linkRe))
      .map(m => {
        const tag = m[0];
        let href = hrefRe.exec(tag)?.[1] ?? '';
        const media = mediaRe.exec(tag)?.[1];
        // 스니펫은 "splash-image/..." 상대경로 → /pwa/ 접두 붙여 절대경로로
        if (!href.startsWith('/')) href = `/pwa/${href.replace(/^\.?\//, '')}`;
        return { url: href, media };
      })
      .filter((v): v is { url: string; media: string | undefined } => Boolean(v.url));
  } catch {
    return [];
  }
}

function pickManifestUrl(): string {
  // public/manifest.json 있으면 그걸 쓰고, 없으면 app/manifest.ts의 기본 경로(/manifest.webmanifest)를 가리킴
  const publicManifest = path.join(process.cwd(), 'public', 'manifest.json');
  return fsSync.existsSync(publicManifest) ? '/manifest.json' : '/manifest.webmanifest';
}

export async function generateMetadata(): Promise<Metadata> {
  const startupImage = await getStartupImagesFromSnippet();

  return {
    applicationName: APP_NAME,
    title: { default: APP_DEFAULT_TITLE, template: APP_TITLE_TEMPLATE },
    description: APP_DESCRIPTION,
    manifest: pickManifestUrl(),
    icons: {
      icon: [{ url: '/pwa/splash-image/favicon-196.png', sizes: '196x196', type: 'image/png' }],
      apple: [{ url: '/pwa/splash-image/apple-icon-180.png' }],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: APP_DEFAULT_TITLE,
      startupImage,
    },
    formatDetection: { telephone: false },
    openGraph: {
      type: 'website',
      siteName: APP_NAME,
      title: { default: APP_DEFAULT_TITLE, template: APP_TITLE_TEMPLATE },
      description: APP_DESCRIPTION,
    },
    twitter: {
      card: 'summary',
      title: { default: APP_DEFAULT_TITLE, template: APP_TITLE_TEMPLATE },
      description: APP_DESCRIPTION,
    },
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
