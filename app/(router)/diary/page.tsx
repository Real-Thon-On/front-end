'use client';

import { useEffect, useRef, useState } from 'react';

import Plus from '@icons/plus.svg';

export default function Diary() {
  const today = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일 ${
    days[today.getDay()]
  }요일`;

  const [hashtag, setHashtag] = useState<string[]>([]);
  const [isPlusClicked, setIsPlusClicked] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleHashTagPlus = () => setIsPlusClicked(true);

  const handleBlur = () => {
    if (inputRef.current?.value) {
      setHashtag([...hashtag, inputRef.current.value]);
      inputRef.current.value = '';
    }
    setIsPlusClicked(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current?.value) {
      setHashtag([...hashtag, inputRef.current.value]);
      inputRef.current.value = '';
      setIsPlusClicked(false);
    }
  };

  useEffect(() => {
    if (isPlusClicked) inputRef.current?.focus();
  }, [isPlusClicked]);

  return (
    <>
      <div className="body1 mb-[2.8rem]">{formattedDate}</div>
      <div className="flex mb-[2.8rem]">
        <div className="body1">날씨 : </div>
        <input
          type="text"
          className="ml-[.5rem] body1"
          placeholder="오늘의 날씨를 입력해주세요"
        />
      </div>
      <div className="mb-[2.4rem]">
        <div className="body1">해시태그</div>
        <div className="flex items-center mt-[1.2rem]">
          {hashtag.length !== 0 && (
            <div className="flex gap-[1.2rem] mr-[1.2rem]">
              {hashtag.map((tag, index) => (
                <span
                  key={index}
                  className="btn2 text-[var(--gray3)] py-[.8rem]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          {isPlusClicked ? (
            <input
              type="text"
              ref={inputRef}
              className="ml-[1.2rem] btn2 text-[var(--gray3)]"
              placeholder="해시태그를 입력해주세요"
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          ) : (
            <button onClick={handleHashTagPlus}>
              <Plus />
            </button>
          )}
        </div>
      </div>
      <textarea className="w-full h-full bg-white rounded-[1.2rem] p-[1.6rem]" />
    </>
  );
}
