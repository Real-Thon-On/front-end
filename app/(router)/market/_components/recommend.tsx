import { Default } from '@/components/layout/container/container';

export default function Recommend({
  label,
  description,
  price,
}: {
  label: string;
  description: string;
  price: number;
}) {
  return (
    <Default className="!grid !grid-rows-[18rem_auto] min-w-[28rem] !shadow-none">
      <div className="bg-[var(--gray1)] rounded-t-[1.2rem]"></div>
      <Default className="p-[1.2rem] flex-col">
        <h3>{label}</h3>
        <p className="caption leading-[160%] text-[var(--gray3)] my-[.8rem]">{description}</p>
        <h3>{price.toLocaleString()}원</h3>
      </Default>
    </Default>
  );
}
