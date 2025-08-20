import Link from 'next/link';
import { redirect } from 'next/navigation';

import ButtonBox from '@/components/button/buttonBox';
import { Default } from '@/components/layout/container/container';
import { MindTestResult } from '@/service/interfaces';
import { GetTestResultData } from '@/service/mindTest';

export default async function TestResult() {
  const fetchData = async (): Promise<MindTestResult[]> => {
    const res = await GetTestResultData();

    if (!res.success) {
      console.error('Failed to fetch test result data');
      redirect('/mind-test/select?error=result_fetch_failed');
    }
    return res.data;
  };

  // const infoData = await fetchData();
  const asdf = {
    success: 'true',
    data: {
      id: 1,
      userName: null,
      testName: '우울',
      totalScore: 9,
      resultState: '경도',
      resultMessage:
        '가벼운 우울 증상을 보이고 있습니다. 스트레스 관리와 생활습관 개선이 필요할 수 있습니다.',
    },
  };
  const { userName, testName, totalScore, resultState, resultMessage } = asdf.data;

  return (
    <>
      <div className="flex items-end">
        <h3>{userName ? userName : '온심이'}</h3>
        <span className="body1 ml-[.4rem]">님의 분석 결과예요.</span>
      </div>
      <Default className="flex-col px-[1.3rem] py-[2.4rem] mt-[4rem]">
        <div>
          <h2 className="text-center">{resultState}</h2>
          <div className="text-center mt-[1rem]">
            <span className="body1">{testName} 검진 결과</span>
            <h3 className="!text-[2.4rem] text-[var(--primary)] mt-[.4rem]">{totalScore}점</h3>
          </div>
        </div>
        <div className="border-b border-[var(--gray2)] my-[2.5rem]"></div>
        <div className="text-center break-keep body3">{resultMessage}</div>
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
