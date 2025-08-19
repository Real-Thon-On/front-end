import Link from 'next/link';
import { JSX } from 'react';

import ButtonBox from '@/components/button/buttonBox';
import Apple from '@icons/social/Apple.svg';
import Google from '@icons/social/Google.svg';
import Kakao from '@icons/social/KakaoTalk.svg';
import Naver from '@icons/social/Naver.svg'; // Assuming you have a Naver icon

interface SocialItemsProps {
  icon: JSX.Element;
  bgColor: string;
  text: string;
  textColor?: string;
  redirectUrl: string;
}
const socialItems: Record<string, SocialItemsProps> = {
  kakao: {
    icon: <Kakao />,
    bgColor: '#FEE500',
    text: '카카오 로그인',
    redirectUrl: `${process.env.BACKEND_API}/oauth2/authorization/kakao`,
  },
  google: {
    icon: <Google />,
    bgColor: '#FFFFFF',
    text: '구글로 로그인',
    redirectUrl: `${process.env.BACKEND_API}/oauth2/authorization/google`,
  },
  apple: {
    icon: <Apple />,
    bgColor: '#000000',
    textColor: '#FFFFFF',
    text: '애플로 로그인',
    redirectUrl: `${process.env.BACKEND_API}/oauth2/authorization/apple`,
  },
  naver: {
    icon: <Naver />,
    bgColor: '#06CC80',
    text: '네이버 로그인',
    redirectUrl: `${process.env.BACKEND_API}/oauth2/authorization/naver`,
  },
};

export default function SocialLoginBtn({
  social,
}: Readonly<{
  social: 'kakao' | 'google' | 'apple' | 'naver';
}>) {
  const { icon, bgColor, textColor, text, redirectUrl } = socialItems[social];

  return (
    <Link href={redirectUrl}>
      <ButtonBox
        bgColor={bgColor}
        className="max-w-[32.6rem]"
      >
        <div className="flex justify-center items-center gap-[1.2rem]">
          {icon}
          <span
            className="tracking-[-0.04rem]"
            style={{
              color: textColor && textColor,
            }}
          >
            {text}
          </span>
        </div>
      </ButtonBox>
    </Link>
  );
}
