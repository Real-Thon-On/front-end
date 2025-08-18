import Link from 'next/link';
import { JSX } from 'react';

import ButtonBox from '@/components/button/buttonBox';
import Apple from '@icons/social/Apple.svg';
import Google from '@icons/social/Google.svg';
import Kakao from '@icons/social/KakaoTalk.svg';

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
    redirectUrl: `${process.env.BACKEND_URL}/oauth2/authorization/kakao`,
  },
  google: {
    icon: <Google />,
    bgColor: '#FFFFFF',
    text: '구글로 로그인',
    redirectUrl: `${process.env.BACKEND_URL}/oauth2/authorization/google`,
  },
  apple: {
    icon: <Apple />,
    bgColor: '#000000',
    textColor: '#FFFFFF',
    text: '애플로 로그인',
    redirectUrl: `${process.env.BACKEND_URL}/oauth2/authorization/apple`,
  },
};

export default function SocialLoginBtn({
  social,
}: Readonly<{
  social: 'kakao' | 'google' | 'apple';
}>) {
  const { icon, bgColor, textColor, text, redirectUrl } = socialItems[social];

  return (
    <Link href={redirectUrl}>
      <ButtonBox bgColor={bgColor}>
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
