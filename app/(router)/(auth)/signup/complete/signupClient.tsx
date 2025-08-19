'use client';

import clsx from 'clsx';
import { useState } from 'react';

import ButtonBox from '@/components/button/buttonBox';
import Modal from '@/components/layout/modal/modal';
import styles from '@styles/inputRadio.module.css';

type Props = { action: (formData: FormData) => Promise<void> };

export default function SignupClient({ action }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <form
      id="signupForm"
      action={action}
      className="flex flex-col gap-[3.2rem]"
    >
      <div>
        <div className="body1">
          닉네임 <span className="text-[red]">*</span>
        </div>
        <input
          type="text"
          name="nickname"
          className={clsx('caption', styles.input)}
          placeholder="닉네임을 입력하세요"
          required
        />
      </div>
      <div>
        <div className="body1">
          이메일 <span className="text-[red]">*</span>
        </div>
        <input
          type="email"
          name="email"
          className={clsx('caption', styles.input)}
          placeholder="이메일을 입력하세요"
          required
        />
      </div>
      <div>
        <div className="body1">생년월일</div>
        <input
          type="text"
          name="birth"
          className={clsx('caption', styles.input)}
          placeholder="8자리 입력 (예: 19900101)"
        />
      </div>
      <div>
        <div className="body1">성별</div>
        <fieldset className="flex gap-[4rem] mt-[2.8rem]">
          <label className={clsx('body2', styles.label)}>
            <input
              type="radio"
              name="gender"
              className={clsx(styles.genderInput)}
              value="female"
            />
            <div className={styles.img} />
            <span className="ml-[.8rem]">여성</span>
          </label>
          <label className={clsx('body2', styles.label)}>
            <input
              type="radio"
              name="gender"
              className={clsx(styles.genderInput)}
              value="male"
            />
            <div className={styles.img} />
            <span className="ml-[.8rem]">남성</span>
          </label>
        </fieldset>
      </div>
      <div className="fixed flex justify-center inset-x-0 bottom-[3.2rem]">
        <div className="flex w-full justify-end max-w-[50rem] px-[3.2rem]">
          <ButtonBox
            onClick={() => setOpen(true)}
            bgColor="var(--primary)"
            className="max-w-[43.6rem]"
            wFull
          >
            가입하기
          </ButtonBox>
        </div>
      </div>
      {open && (
        <Modal
          formId="signupForm"
          title="이 정보로 회원가입할까요?"
          loadingText="반영 중입니다."
          onCancel={() => setOpen(false)}
          open={open}
        />
      )}
    </form>
  );
}
