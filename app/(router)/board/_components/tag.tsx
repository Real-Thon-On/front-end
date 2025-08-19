'use client';

import clsx from 'clsx';

export default function Tag({
  children,
  onClick,
  clicked,
  type = 'button',
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  clicked?: boolean;
  type?: 'button' | 'div';
}) {
  const defaultCSS = 'btn2 px-[1.2rem] py-[.8rem] rounded-[1.2rem] !border';

  return (
    <>
      {type === 'div' ? (
        <div className={clsx(defaultCSS, 'text-[var(--gray3)] !border-[var(--gray3)]')}>
          {children}
        </div>
      ) : (
        <button
          name={children?.toString()}
          onClick={onClick}
          className={clsx(
            defaultCSS,
            clicked ? '!border-[var(--black)]' : 'text-[var(--gray2)] !border-[var(--gray2)]'
          )}
        >
          {children}
        </button>
      )}
    </>
  );
}
