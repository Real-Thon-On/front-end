import Header from '@/components/layout/header/header';
import Left from '@icons/arrow/arrow1_left.svg';
import Basket from '@icons/basket.svg';
import Search from '@icons/search.svg';

export default function DiaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        left={{
          icon: <Left />,
          ariaLabel: '뒤로 가기',
        }}
        title="마켓"
        right={[
          {
            icon: <Search />,
            ariaLabel: '검색',
          },
          {
            icon: <Basket />,
            ariaLabel: '장바구니',
            href: '/market/cart',
          },
        ]}
      />
      <main className="px-[3.2rem] mt-[2rem]">{children}</main>
    </>
  );
}
