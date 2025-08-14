import type { Viewport } from 'next';

import './globals.css';
import { pretendard } from '@/public/font';
import { _startupImage } from '@/public/pwa';

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : 'http://localhost:3000';

export const metadata = {
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
    startupImage: _startupImage,
  },
};

export const viewport: Viewport = { themeColor: '#FFF8E7', maximumScale: 1, userScalable: false };

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
