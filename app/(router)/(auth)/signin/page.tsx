import Symbol from '@icons/symbol.svg';
import Link from 'next/link';

import Logo from '@/public/on_logo.svg';
import styles from '@styles/signin.module.css';

import SocialLoginBtn from './_components/socialLogin';

export default function SignIn() {
  return (
    <main className="flex justify-center items-center min-h-dvh">
      <div className="flex flex-col items-center">
        <section
          className="mb-[4rem]"
          style={{ marginTop: 'clamp(3rem, calc(3rem + 0.6 * (100svh - 690px)), 11rem)' }}
        >
          <h4 className={styles.symbol}>따뜻함을 켜다</h4>
          <Symbol />
        </section>
        <Logo />
        <section
          style={{
            marginTop: 'clamp(6rem, calc(6rem + 0.7 * (100svh - 844px)), 8.5rem)',
            marginBottom: '3rem',
          }}
        >
          <div className="flex flex-col gap-[1.2rem]">
            <SocialLoginBtn social="kakao" />
            <SocialLoginBtn social="google" />
            <SocialLoginBtn social="apple" />
          </div>
          <Link
            href={'/signup'}
            className="block text-center mt-[4rem]"
          >
            <span className={styles.signupLink}>회원가입하기</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
