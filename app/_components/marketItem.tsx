import Link from 'next/link';

import { Default } from '@/components/layout/container/container';

export default function MarketItem({
  item,
}: {
  item: { id: number; title: string; price: number };
}) {
  return (
    <Link href={'/market/' + item.id}>
      <Default className="flex-col justify-center items-center px-[1rem] py-[.8rem]">
        <div className="w-full h-[8.6rem] rounded-[1.6rem] bg-gray-400"></div>
        <div className="mt-[.4rem]">
          <p className="caption">{item.title}</p>
          <div className="text-center">
            <span className="body1">{item.price}</span> <span className="caption">원</span>
          </div>
        </div>
      </Default>
    </Link>
  );
}
