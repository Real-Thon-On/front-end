'use client';

import { useState } from 'react';

import Check from '@icons/check.svg';
import Close from '@icons/close.svg';

export default function CartProduct({
  label,
  arriveDate,
  price,
}: {
  label: string;
  arriveDate: string;
  price: number;
}) {
  const [count, setCount] = useState(1);

  return (
    <div className="relative py-[2.4rem] px-[3.2rem] border-t border-[var(--gray2)]">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <Check stroke="#A4AAA7" />
          <h3 className="ml-[1.2rem]">{label}</h3>
        </div>
        <Close />
      </div>
      <div className="flex mt-[1.6rem]">
        <div className="bg-[var(--gray1)] rounded-[1.2rem] w-[8rem] aspect-square"></div>
        <div className="flex flex-col justify-center">
          <div className="body3 ml-[1.2rem]">{arriveDate}</div>
          <div className="flex items-center mt-[.8rem]">
            <h3 className="ml-[1.2rem] flex items-center">
              <span>{price.toLocaleString()}</span>
              <span className="body2 ml-[.2rem] mt-[.2rem]">원</span>
            </h3>
            <div className="ml-[3.6rem]">
              <div className="flex py-[.5rem] px-[.4rem] items-center gap-[.8rem] border border-[var(--gray2)] rounded-[1.2rem]">
                <button
                  type="button"
                  onClick={() => setCount(count > 1 ? count - 1 : 1)}
                  className="btn2 text-[var(--gray2)]"
                >
                  <div className="w-[1.6rem] aspect-square">-</div>
                </button>
                <span className="caption">{count}</span>
                <button
                  type="button"
                  onClick={() => setCount(count + 1)}
                  className="btn2 text-[var(--gray2)]"
                >
                  <div className="w-[1.6rem] aspect-square">+</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
