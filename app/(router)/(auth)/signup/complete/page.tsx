import { redirect } from 'next/navigation';

import { RegisterUser } from '@/service/authorization';
import { deleteCookie, getCookie } from '@/utils/cookie';

import SignupClient from './_components/signupClient';

export default function SignupComplete() {
  async function signup(formData: FormData) {
    'use server';

    const nick = formData.get('nickname');
    const mail = formData.get('email');

    const nickname = typeof nick === 'string' ? nick.trim() : null;
    const email = typeof mail === 'string' ? mail.trim() : null;
    console.log('nickname:', nickname, 'email:', email);

    if (!nickname || !email) {
      redirect('/signup/complete?error=required');
    }

    const res = await RegisterUser({ nickname, email });
    if (res) redirect('/oauth/signup');
  }

  return <SignupClient action={signup} />;
}
