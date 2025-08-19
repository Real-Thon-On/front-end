import { Default } from '@/components/layout/container/container';
import Cart from '@icons/cart.svg';

export default function NewProduct({
  label,
  tags,
  price,
}: {
  label: string;
  tags: string[];
  price: number;
}) {
  return (
    <Default className="relative p-[1.2rem] mb-[1.2rem]">
      <div className="bg-[var(--gray1)] rounded-[1.2rem] w-[10rem] aspect-square"></div>
      <div className="ml-[1.2rem]">
        <h3>{label}</h3>
        <h3 className="mt-[.8rem] flex items-center">
          <span>{price.toLocaleString()}</span>
          <span className="body2 ml-[.2rem] mt-[.2rem]">원</span>
        </h3>
        <div className="flex gap-[.4rem] mt-[1rem]">
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      </div>
      <button className="absolute bottom-[1.2rem] right-[1.2rem]">
        <Cart />
      </button>
    </Default>
  );
}

const Tag = ({ children }: { children: React.ReactNode }) => (
  <div className="caption rounded-[1.2rem] text-[var(--gray2)] border border-[var(--gray2)] px-[.8rem] py-[.4rem]">
    {children}
  </div>
);
