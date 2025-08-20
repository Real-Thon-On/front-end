import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import ButtonBox from '@/components/button/buttonBox';
import { Default } from '@/components/layout/container/container';
import { GetAnalyzeDiary } from '@/service/diary';
import { AnalyzedDiary, RecommendedEvent } from '@/service/interfaces';
import ExampleImage from '@icons/exampleImage.svg';

import ThumbComponent from '../_components/thumbComponent';

const exampleEvents: RecommendedEvent[] = [
  {
    id: 964,
    title: '차 한 잔으로 펼치는 인문학: 오늘은 차(茶)고 내일은 따뜻하겠지',
    url: 'https://inmun360.culture.go.kr/b2bc/com/pro/calDetail/2521?menuCd=NS_PRO_CAL',
    mainCategory: '교육',
    matchedKeywords: '매칭 키워드: 일',
    imageUrl: 'https://inmun360.culture.go.kr/b2bc/file/download/41316',
  },
  {
    id: 806,
    title: '차 한 잔으로 펼치는 인문학: 오늘은 차(茶)고 내일은 따뜻하겠지',
    url: 'https://inmun360.culture.go.kr/b2bc/com/pro/calDetail/2521?menuCd=NS_PRO_CAL',
    mainCategory: '교육',
    matchedKeywords: '매칭 키워드: 일',
    imageUrl: 'https://inmun360.culture.go.kr/b2bc/file/download/41316',
  },
  {
    id: 647,
    title: '차 한 잔으로 펼치는 인문학: 오늘은 차(茶)고 내일은 따뜻하겠지',
    url: 'https://inmun360.culture.go.kr/b2bc/com/pro/calDetail/2521?menuCd=NS_PRO_CAL',
    mainCategory: '교육',
    matchedKeywords: '매칭 키워드: 일',
    imageUrl: 'https://inmun360.culture.go.kr/b2bc/file/download/41316',
  },
];

export default async function DiaryResult() {
  const fetchData = async (): Promise<AnalyzedDiary> => {
    const res = await GetAnalyzeDiary();

    if (!res.success) {
      console.error('Failed to fetch test result data');
      redirect('/mind-test/select?error=result_fetch_failed');
    }
    return res.data;
  };

  const infoData = await fetchData();
  const { analysis, suggestions, replyText, recommendedEvents } = infoData;

  function cleanReplyText(input: string): string {
    return (
      input
        // 코드펜스/백틱 제거
        .replace(/```/g, '') // ``` 세 개
        .replace(/`/g, '') // 나머지 단일 백틱
        // 이스케이프된 제어문자 → 공백
        .replace(/\\n|\\r|\\t/g, ' ')
        // 실제 제어문자 → 공백
        .replace(/[\r\n\t]+/g, ' ')
        // 다중 공백 정리
        .replace(/\s{2,}/g, ' ')
        .trim()
    );
  }
  const parsedReplyText = cleanReplyText(replyText);

  return (
    <>
      <div className="flex mb-[.4rem] items-center">
        <h3>온심이</h3>
        <span className="ml-[.4rem] mt-[.2rem] body1">님의 일기 분석 결과예요.</span>
      </div>
      <HelpComment
        title="이런 점이 좋았어요"
        content={suggestions.good}
      />
      <HelpComment
        title="이런 점은 같이 개선해보아요"
        content={suggestions.feedback}
      />
      <div className="mt-[6rem]">
        <div className="flex mb-[1.6rem] items-center">
          <h3>온심이</h3>
          <span className="ml-[.4rem] mt-[.2rem] body1">님께 이런 프로그램을 추천드려요</span>
        </div>
        {exampleEvents.length === 0 ? (
          <div className="body1">추천할 프로그램이 없어요.</div>
        ) : (
          <RecommendedEvents events={recommendedEvents} />
        )}
      </div>
      <Default className="flex-col my-[6rem] px-[1.3rem] py-[2rem]">
        <div className="text-center">
          <h3>종합 의견</h3>
          <div className="body1 text-center mt-[1.6rem]">{suggestions.total_summary}</div>
        </div>
        <div className="my-[2rem] border-b border-[var(--gray2)]" />
        <div className="body3 text-center break-keep">{parsedReplyText}</div>
        <div className="mt-[2rem] caption text-center">
          <span className="text-[var(--gray2)]">이 답장이 마음에 드셨나요?</span>
          <ThumbComponent />
        </div>
      </Default>
      <div className="h-[8rem]"></div>

      <Link
        href={'/'}
        className="w-full max-w-[43.6rem] mx-[7.5rem]"
      ></Link>
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

const HelpComment = ({ title, content }: { title: string; content: string }) => {
  return (
    <div className="mt-[2rem]">
      <div className="body2">{title}</div>
      <div className="caption mt-[.4rem] text-[var(--gray3)]">{content}</div>
    </div>
  );
};

const RecommendedEvents = ({ events }: { events: RecommendedEvent[] }) => {
  return (
    <div className="grid grid-cols-3 mt-[1.6rem]">
      {events.map(event => (
        <div
          key={event.id}
          className="flex justify-center"
        >
          <Link
            href={event.url}
            className="flex flex-col items-center"
            target="_blank"
          >
            {/* <Image
              width={300}
              height={200}
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-[200px] object-cover"
            /> */}
            <ExampleImage />
            <div className="mt-[.8rem] body1 text-center">{event.mainCategory}</div>
            <div className="caption mt-[.4rem] text-[var(--gray2)] text-center w-[12rem] break-keep">
              {event.title}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
