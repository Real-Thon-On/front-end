import clsx from 'clsx';

export default function ButtonBox({
  children,
  bgColor,
  className,
  innerClassName,
}: Readonly<{
  children: React.ReactNode;
  bgColor: string;
  className?: string;
  innerClassName?: string;
}>) {
  return (
    <button
      className={clsx('w-[32.6rem] h-[6rem] rounded-[1.6rem]', className)}
      style={{ backgroundColor: bgColor }}
    >
      <div className={clsx('btn1', innerClassName)}>{children}</div>
    </button>
  );
}
