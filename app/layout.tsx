import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';

import { _startupImage } from '@/lib/pwa_startup';
import { pretendard } from '@/public/font';

import './globals.css';

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  manifest: '/manifest.webmanifest',
  applicationName: 'ON',
  title: { default: 'Save Your Minds - ON', template: '%s - ON' },
  description: '따뜻함을 켜다 - ON | Turn on the warmth - ON',
  icons: {
    icon: [{ url: '/pwa/splash-image/favicon-196.png', sizes: '196x196', type: 'image/png' }],
    apple: [{ url: '/pwa/splash-image/apple-icon-180.png' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage: [..._startupImage, { url: '/pwa/splash-image/apple-splash-750-1334.jpg' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#f1f0ea',
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scrollbar-hidden"
    >
      <body
        className={clsx(
          pretendard.variable,
          'relative antialiased min-h-dvh h-full bg-main',
          'overscroll-y-contain'
        )}
      >
        <div
          className={clsx(
            'relative mx-auto w-full max-w-[500px]',
            'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]',
            'min-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom))]',
            'h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom))]'
          )}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
