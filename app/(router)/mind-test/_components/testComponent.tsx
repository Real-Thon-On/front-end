import Link from 'next/link';

import { Default } from '@/components/layout/container/container';
import { MindTestResponseDate } from '@/service/interfaces';
import GrayPen from '@icons/gray_pen.svg';
export default function TestComponent({ params }: { params: MindTestResponseDate }) {
  const {
    id,
    name,
    scale,
    questionCount,
    scoringMethod,
    scoreRangeMin,
    scoreRangeMax,
    resultMapping,
  } = params;

  return (
    <Link href={`/mind-test/test/${id}`}>
      <Default className="flex-col p-[2rem] pb-[1.6rem]">
        <h3>{name} 검사</h3>
        <div className="body3 mt-[.8rem]">{scoringMethod}</div>
        <div className="flex items-center mt-[3rem] px-[.8rem] py-[.7rem] border border-[var(--gray3)] rounded-[1.2rem]">
          <GrayPen />
          <span className="caption ml-[.4rem] text-[var(--gray3)]">심리검사</span>
          <div className="ml-[1.2rem]">
            <span className="caption ml-[.4rem] text-[var(--gray2)]">
              기본 {questionCount}문항 | {scoreRangeMin} ~ {scoreRangeMax} 점
            </span>
            <span className="caption ml-[.4rem]"></span>
          </div>
        </div>
      </Default>
    </Link>
  );
}
