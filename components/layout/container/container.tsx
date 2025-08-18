import clsx from 'clsx';

import styles from '@styles/container.module.css';

export function Default({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx(styles.default, className)}>{children}</div>;
}

export function Primary({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx(styles.primary, className)}>{children}</div>;
}

export function Inner({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx(styles.inner, className)}>{children}</div>;
}
