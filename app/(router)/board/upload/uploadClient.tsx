'use client';

import { useRef, useState } from 'react';

import ButtonBox from '@/components/button/buttonBox';
import Modal from '@/components/layout/modal/modal';
import Down from '@icons/arrow/down.svg';
import Plus from '@icons/plus.svg';

import ImageInput from '../_components/imageInput';

type Props = { action: (formData: FormData) => Promise<void> };

export default function UploadClient({ action }: Props) {
  const [hashtag, setHashtag] = useState<string[]>([]);
  const [isPlusClicked, setIsPlusClicked] = useState(false);
  const [textLength, setTextLength] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

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
      e.preventDefault();
      setHashtag([...hashtag, inputRef.current.value]);
      inputRef.current.value = '';
      setIsPlusClicked(false);
    }
  };

  return (
    <form
      id="uploadPostForm"
      action={action}
    >
      <ImageInput />
      <div className="mt-[1.6rem]">
        {/* 제목과 타입 선택 */}
        <div>
          <div className="body1">제목</div>
          <div className="grid grid-cols-[auto_8.2rem] caption bg-white rounded-[1.2rem] border border-[var(--gray2)] mt-[.4rem]">
            <input
              type="text"
              name="title"
              className="pl-[1.6rem] py-[2.1rem]"
              placeholder="글 제목"
              required
            />
            <div className="relative flex justify-between items-center pr-[1.6rem]">
              <label
                htmlFor="contentType"
                className="w-[.1rem] h-[2.4rem] border-r border-[var(--gray1)]"
              ></label>

              <select
                id="contentType"
                name="type"
                className="px-[1.2rem] py-[2.1rem] pr-[4rem] appearance-none"
                defaultValue="NEOKDURI"
              >
                <option value="NEOKDURI">넋두리</option>
                <option value="JABDAM">잡담</option>
                <option value="CHIYU">치유</option>
              </select>

              <Down
                className="pointer-events-none absolute right-[1.2rem] top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* 내용 */}
        <div className="mt-[2rem]">
          <div className="body1">내용</div>
          <div className="relative caption mt-[.4rem]">
            <textarea
              name="contents"
              className="w-full min-h-[40rem]"
              placeholder="글을 작성해주세요."
              maxLength={500}
              onChange={e => setTextLength(e.target.value.length)}
              required
            />
            <div className="absolute bottom-[1.6rem] right-[1.6rem] text-[var(--gray2)]">
              {textLength}/500
            </div>
          </div>
        </div>

        {/* 해시태그 */}
        <div className="mt-[2rem]">
          <div className="body1">해시태그</div>
          <div className="flex items-center caption h-[6rem] bg-white rounded-[1.2rem] border border-[var(--gray2)] px-[1.2rem] py-[1.3rem] mt-[.4rem]">
            <div className="flex items-center">
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
                  autoFocus
                />
              ) : (
                <button
                  onClick={handleHashTagPlus}
                  className="ml-[1.2rem]"
                >
                  <Plus />
                </button>
              )}
            </div>
          </div>
        </div>
        <input
          type="hidden"
          name="hashtag"
          value={hashtag}
        />
      </div>
      <div className="fixed flex justify-center inset-x-0 bottom-[3.2rem]">
        <div className="flex w-full justify-end max-w-[50rem] px-[3.2rem]">
          <ButtonBox
            onClick={() => setOpen(true)}
            bgColor="var(--primary)"
            className="max-w-[43.6rem]"
            wFull
          >
            기록하기
          </ButtonBox>
        </div>
      </div>
      {open && (
        <Modal
          formId="uploadPostForm"
          title="글을 업로드 할까요?"
          loadingText="업로드 중입니다."
          onCancel={() => setOpen(false)}
          open={open}
        />
      )}
    </form>
  );
}
