import Link from 'next/link';

import { Default } from '@/components/layout/container/container';
import { marketItems } from '@/constants';
import CustomRight from '@icons/arrow/arrow2_right_custom.svg';
import Banner from '@icons/banner.svg';
import Board from '@icons/board.svg';
import Diary from '@icons/diary.svg';
import Symbol from '@icons/symbol_header.svg';

import { Container, Wrapper } from './_components/container';
import MarketItem from './_components/marketItem';

export default function Home() {
  return (
    <div className="mx-[3.2rem]">
      <header className="py-[2.4rem]">
        <Symbol />
      </header>
      <main className="mt-[3.6rem]">
        <Container
          title="Life On"
          content="하루 일기 작성하기"
          description="오늘 하루는 어떠셨나요?"
          href="/diary"
          SVG={Diary}
        />
        <Container
          title="커뮤니티"
          content="우리 동네 근처 사람들은?"
          description="커뮤니티 구경하기"
          href="/board/posts"
          SVG={Board}
        />

        <Wrapper title="심리검사">
          <div className="grid grid-cols-2 gap-[1.2rem]">
            <Link href={'/mind-test/select'}>
              <Default className="justify-center items-center py-[2.6rem]">
                <h3>지금 검사하기</h3>
              </Default>
            </Link>
            <Link href={'/mind-test/test/1/result'}>
              <Default className="justify-center items-center py-[2.6rem]">
                <h3>검사결과 확인</h3>
              </Default>
            </Link>
          </div>
        </Wrapper>

        <Wrapper>
          <div className="overflow-x-scroll scrollbar-hidden">
            <Banner />
          </div>
        </Wrapper>

        <Wrapper
          title={
            <Link
              href="/market"
              className="flex"
            >
              <span className="mr-[.4rem]">마켓</span>
              <CustomRight fill="#616264" />
            </Link>
          }
        >
          <div className="grid grid-cols-3 grid-rows-2 gap-x-[.8rem] gap-y-[.4rem] pb-[2.4rem]">
            {marketItems.map((item, index) => (
              <MarketItem
                key={index}
                item={item}
              />
            ))}
          </div>
        </Wrapper>
      </main>
    </div>
  );
}
