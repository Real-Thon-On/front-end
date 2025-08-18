import Header from '@/components/layout/header/header';
import Left from '@icons/arrow/arrow1_left.svg';

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        left={{
          icon: <Left />,
          ariaLabel: '뒤로 가기',
        }}
        title="회원가입"
      />
      <main className="px-[3.2rem] mt-[4rem]">{children}</main>
    </>
  );
}
