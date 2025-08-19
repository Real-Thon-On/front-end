import Header from '@/components/layout/header/header';
import Left from '@icons/arrow/arrow1_left.svg';

export default function TestResultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        left={{
          icon: <Left />,
          ariaLabel: '뒤로 가기',
        }}
        title="분석결과"
        border
      />
      <main className="px-[3.2rem] mt-[2.4rem]">{children}</main>
    </>
  );
}
