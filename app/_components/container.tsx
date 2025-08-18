import Link from 'next/link';

import { Default } from '@/components/layout/container/container';
import Right from '@icons/arrow/arrow2_right.svg';
export const Wrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: React.ReactNode | string;
}) => {
  return (
    <div className="mb-[2.4rem]">
      {title && <div className="body1 mb-[1.2rem] text-[var(--gray3)]">{title}</div>}
      {children}
    </div>
  );
};

export const Container = ({
  title,
  content,
  description,
  href,
  SVG,
}: {
  title: string;
  content: string;
  description: string;
  href: string;
  SVG: React.ElementType;
}) => {
  return (
    <Wrapper title={title}>
      <Link href={href}>
        <Default className="justify-between items-center px-[1.2rem] py-[2rem]">
          <div className="flex">
            <div className="rounded-[1.2rem] w-[6rem] aspect-square">
              <SVG />
            </div>
            <div className="flex flex-col justify-between ml-[1.6rem]">
              <div className="body1">{description}</div>
              <h3>{content}</h3>
            </div>
          </div>
          <Right />
        </Default>
      </Link>
    </Wrapper>
  );
};
