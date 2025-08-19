import Image from 'next/image';
import Link from 'next/link';

import ButtonBox from '@/components/button/buttonBox';
import { Default } from '@/components/layout/container/container';
import { RecommendedEvent } from '@/service/interfaces';
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

export default function DiaryResult() {
  return (
    <>
      <div className="flex mb-[.4rem] items-center">
        <h3>온심이</h3>
        <span className="ml-[.4rem] mt-[.2rem] body1">님의 일기 분석 결과예요.</span>
      </div>
      <HelpComment
        title="이런 점이 좋았어요"
        content="오늘의 일기에서 느낀 감정과 생각을 솔직하게 표현해주셔서 감사합니다. 온심이는 당신의 감정을 이해하고, 더 나은 하루를 위해 도와줄 거예요."
      />
      <HelpComment
        title="이런 점은 아쉬웠어요"
        content="오늘의 일기에서 감정이나 생각을 더 자세히 표현해주시면, 온심이가 더 정확하게 분석하고 도와줄 수 있어요."
      />
      <HelpComment
        title="이런 점은 같이 개선해보아요"
        content="온심이는 당신의 감정을 이해하고, 더 나은 하루를 위해 도와줄 거예요. 오늘의 일기를 통해 당신의 감정을 더 잘 이해하고, 함께 성장해나가요."
      />
      <div className="mt-[6rem]">
        <div className="flex mb-[1.6rem] items-center">
          <h3>온심이</h3>
          <span className="ml-[.4rem] mt-[.2rem] body1">님께 이런 프로그램을 추천드려요</span>
        </div>
        {exampleEvents.length === 0 ? (
          <div className="body1">추천할 프로그램이 없어요.</div>
        ) : (
          <RecommendedEvents events={exampleEvents} />
        )}
      </div>
      <Default className="flex-col my-[6rem] px-[1.3rem] py-[2rem]">
        <div className="text-center">
          <h3>종합 의견</h3>
          <div className="body1 text-center mt-[1.6rem]">
            다른 이들의 말에 대해서 너무 깊게 생각하지 말아요!
          </div>
        </div>
        <div className="my-[2rem] border-b border-[var(--gray2)]" />
        <div className="body3 text-center break-keep">
          다른 사람들의 말에 마음이 왜 그토록 무겁게 느껴지는지 생각해보셨나요? 자신을 이해하고
          받아들이는 것도 중요해요. 작은 말 한마디에도 상처받는 것은 깊이 있는 사람이기 때문일
          거예요. 내일은 오늘보다 조금 더 자신을 이해하고 사랑하는 하루가 되길 바랄게요.
        </div>
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
            className="block"
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
          </Link>
        </div>
      ))}
    </div>
  );
};
