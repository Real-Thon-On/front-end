import Link from 'next/link';

import ButtonBox from '@/components/button/buttonBox';
import { Default } from '@/components/layout/container/container';

export default function TestResult() {
  return (
    <>
      <div className="flex items-end">
        <h3>온심이</h3>
        <span className="body1 ml-[.4rem]">님의 분석 결과예요.</span>
      </div>
      <Default className="flex-col px-[1.3rem] py-[2.4rem] mt-[4rem]">
        <div>
          <h2 className="text-center">심한수준</h2>
          <div className="text-center mt-[1rem]">
            <span className="body1">외상 후 스트레스 장애 검진 결과</span>
            <h3 className="!text-[2.4rem] text-[var(--primary)] mt-[.4rem]">{4}점</h3>
          </div>
        </div>
        <div className="border-b border-[var(--gray2)] my-[2.5rem]"></div>
        <div className="text-center break-keep body3">
          외상 사건과 관련된 반응으로 심한 불편감을 호소하고 있습니다. 평소보다 일상생활에
          적응하는데 어려움을 느낄 수 있습니다. 추가적인 평가나 정신건강 전문가의 도움을 받아
          보시기를 권해드립니다.
        </div>
      </Default>

      <div className="fixed flex justify-center inset-x-0 bottom-[3.2rem]">
        <Link
          href={'/'}
          className="flex w-full justify-end max-w-[50rem] px-[3.2rem]"
        >
          <ButtonBox
            bgColor="var(--primary)"
            className="max-w-[43.6rem]"
            wFull
          >
            메인으로
          </ButtonBox>
        </Link>
      </div>
    </>
  );
}
