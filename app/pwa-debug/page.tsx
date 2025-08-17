// app/pwa-debug/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [info, setInfo] = useState<any>(null);
  useEffect(() => {
    const w = window;
    const width = w.screen.width;
    const height = w.screen.height;
    const dpr = Math.round(w.devicePixelRatio || 1);
    const minW = Math.min(width, height);
    const maxH = Math.max(width, height);
    setInfo({
      screen: { width, height, dpr },
      portrait: `(device-width: ${minW}px) and (device-height: ${maxH}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait)`,
      landscape: `(device-width: ${minW}px) and (device-height: ${maxH}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: landscape)`,
    });
  }, []);
  return <pre style={{ padding: 16 }}>{JSON.stringify(info, null, 2)}</pre>;
}
