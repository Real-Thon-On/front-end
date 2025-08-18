import Header from '@/components/layout/header/header';
import Left from '@icons/arrow/arrow1_left.svg';

export default function DiaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        left={{
          icon: <Left />,
          ariaLabel: '뒤로 가기',
        }}
        title="온심이 기록지"
      />
      <main className="px-[3.2rem] mt-[.8rem]">{children}</main>
    </>
  );
}
