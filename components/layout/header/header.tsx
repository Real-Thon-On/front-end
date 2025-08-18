'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

type Action = {
  icon: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  title?: string;
};

export interface HeaderProps {
  title?: ReactNode;
  left?: Action;
  right?: Action[];
  className?: string;
  safeArea?: boolean; // iOS PWA notch 여백 적용 (확정 아님)
  border?: boolean;
}

export default function Header({
  title,
  left,
  right,
  className,
  safeArea = true,
  border = false,
}: HeaderProps) {
  return (
    <header
      className={clsx(
        'w-full bg-main backdrop-blur',
        'sticky top-0 z-50',
        border && 'border-b border-[var(--gray2)]',
        className
      )}
      // style={safeArea ? { paddingTop: 'env(safe-area-inset-top)' } : undefined}
      role="banner"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center h-24 px-4 md:px-6">
        {/* Left */}
        <div className="justify-self-start min-w-0">
          {left ? (
            <ActionButton
              action={left}
              align="left"
            />
          ) : null}
        </div>

        {/* Center */}
        <div className="justify-self-center text-center min-w-0">
          {title ? (
            <div className="mx-auto max-w-[min(80vw,48rem)] body1 truncate">{title}</div>
          ) : null}
        </div>

        {/* Right */}
        <div className="justify-self-end min-w-0">
          <div className="flex items-center gap-2">
            {(right ?? []).slice(0, 2).map((a, i) => (
              <ActionButton
                key={i}
                action={a}
                align="right"
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function ActionButton({ action, align }: { action: Action; align?: 'left' | 'right' }) {
  const common = 'flex items-center justify-center transition';
  const className = clsx(common, align === 'left' ? 'justify-start' : 'justify-end');

  if (action.href && !action.disabled) {
    return (
      <Link
        href={action.href}
        aria-label={action.ariaLabel}
        title={action.title}
        className={className}
      >
        {action.icon}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={action.ariaLabel}
      title={action.title}
      onClick={action.onClick}
      className={className}
      disabled={action.disabled}
    >
      {action.icon}
    </button>
  );
}
