import Link from 'next/link';

import Right from '@icons/arrow/arrow2_right.svg';

export default function Select() {
  return (
    <>
      <div className="flex justify-center">
        <h2 className="mt-[3.6rem] w-[19.5rem] h-[7.2rem] text-center">
          심리검사자 유형을 선택해주세요
        </h2>
      </div>
      <div className="flex flex-col gap-[2.4rem] mt-[4rem]">
        <Link
          href={'/mind-test/select/adult'}
          className="relative border border-[var(--primary)] aspect-[326/160] bg-[var(--gray1)] rounded-[1.2rem] p-[.8rem] flex items-center justify-center gap-[2.4rem]"
        >
          <h3 className="flex">성인</h3>
          <div className="absolute right-[.8rem] bottom-[6.8rem]">
            <Right />
          </div>
        </Link>
        <Link
          href={'/mind-test/select/student'}
          className="relative border border-[var(--primary)] aspect-[326/160] bg-[var(--gray1)] rounded-[1.2rem] p-[.8rem] flex items-center justify-center gap-[2.4rem]"
        >
          <h3 className="flex">학생 (보호자)</h3>
          <div className="absolute right-[.8rem] bottom-[6.8rem]">
            <Right />
          </div>
        </Link>
      </div>
    </>
  );
}
