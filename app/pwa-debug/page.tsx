// app/pwa-debug/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';

import { _startupImage } from '@/lib/pwa_startup';

type Row = {
  url: string;
  absoluteUrl: string;
  isAbsolute: boolean;
  media?: string;
  matches?: boolean;
  status?: number;
  ok?: boolean;
  error?: string;
};

export default function PWADebugPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [device, setDevice] = useState({
    width: 0,
    height: 0,
    dpr: 1,
    orientation: 'portrait' as 'portrait' | 'landscape',
    portraitMQ: '',
    landscapeMQ: '',
  });

  const refresh = async () => {
    const w = window;
    const width = w.screen.width;
    const height = w.screen.height;
    const dpr = Math.round(w.devicePixelRatio || 1);
    const orientation = w.matchMedia('(orientation: landscape)').matches ? 'landscape' : 'portrait';
    const minW = Math.min(width, height);
    const maxH = Math.max(width, height);
    const portraitMQ = `(device-width: ${minW}px) and (device-height: ${maxH}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait)`;
    const landscapeMQ = `(device-width: ${minW}px) and (device-height: ${maxH}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: landscape)`;

    setDevice({ width, height, dpr, orientation, portraitMQ, landscapeMQ });

    // 목록 구성 + 매칭 판단
    const list: Row[] = _startupImage.map(item => {
      const isAbsolute = item.url.startsWith('/');
      const absoluteUrl = new URL(item.url, window.location.origin).toString();
      const matches = item.media ? window.matchMedia(item.media).matches : undefined; // media 없는 폴백은 undefined
      return { url: item.url, absoluteUrl, isAbsolute, media: item.media, matches };
    });

    // 접근성(200) 확인: HEAD가 막힌 환경도 있으니 GET으로 no-store
    const probed = await Promise.all(
      list.map(async r => {
        try {
          const res = await fetch(r.absoluteUrl, { method: 'GET', cache: 'no-store' });
          return { ...r, status: res.status, ok: res.ok };
        } catch (e: any) {
          return { ...r, error: e?.message ?? String(e) };
        }
      })
    );

    setRows(probed);
  };

  useEffect(() => {
    refresh();
    // 화면 회전/툴바 변화 등으로 값이 달라질 수 있어, orientation 변경 시 다시 체크
    const mq = window.matchMedia('(orientation: landscape)');
    const onChange = () => refresh();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  const matched = useMemo(() => rows.filter(r => r.matches), [rows]);
  const allAbsolute = useMemo(() => rows.every(r => r.isAbsolute), [rows]);

  return (
    <main
      style={{ padding: 16, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}
    >
      <h1 style={{ fontSize: 18, marginBottom: 8 }}>PWA iOS Splash Debug</h1>

      <section style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, marginBottom: 4 }}>Device</h2>
        <pre style={{ padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
          {JSON.stringify(device, null, 2)}
        </pre>
        <button
          onClick={refresh}
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: 8,
            background: '#fff',
          }}
        >
          Re-check
        </button>
      </section>

      <section style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, marginBottom: 4 }}>Summary</h2>
        <ul style={{ margin: 0, paddingLeft: 16 }}>
          <li>
            Absolute path check:{' '}
            <strong>{allAbsolute ? 'OK (all start with "/")' : 'Found relative URL(s)'}</strong>
          </li>
          <li>
            Media match candidates now: <strong>{matched.length}</strong>
          </li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: 16, marginBottom: 4 }}>Startup Images ({rows.length})</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <th style={th}>#</th>
                <th style={th}>abs</th>
                <th style={th}>match</th>
                <th style={th}>status</th>
                <th style={th}>url</th>
                <th style={th}>media</th>
                <th style={th}>open</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.url + i}
                  style={{ background: i % 2 ? '#fafafa' : '#fff' }}
                >
                  <td style={td}>{i + 1}</td>
                  <td style={td}>{r.isAbsolute ? '✓' : '✗'}</td>
                  <td style={td}>{r.matches === undefined ? '-' : r.matches ? '✓' : '—'}</td>
                  <td style={td}>
                    {r.error ? 'ERR' : r.status ?? ''}
                    {r.ok === false ? ' (X)' : r.ok ? ' (OK)' : ''}
                  </td>
                  <td style={{ ...td, wordBreak: 'break-all' }}>{r.url}</td>
                  <td style={{ ...td, wordBreak: 'break-all' }}>{r.media || ''}</td>
                  <td style={td}>
                    <a
                      href={r.absoluteUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      view
                    </a>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td
                    colSpan={7}
                    style={{ ...td, textAlign: 'center', color: '#888' }}
                  >
                    No data yet. Click “Re-check”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 6px',
  borderBottom: '1px solid #eee',
};
const td: React.CSSProperties = { padding: '8px 6px', verticalAlign: 'top' };
