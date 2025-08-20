'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ButtonBox from '@/components/button/buttonBox';
import { type TagType, type TagTypeEN, toEnTag, toKoTag } from '@/constants/types';
import { BoardPostInfo } from '@/service/interfaces';
import Down from '@icons/arrow/down.svg';
import Pen from '@icons/pen.svg';

import Post from '../_components/post';
import Tag from '../_components/tag';

export default function Community() {
  const router = useRouter();
  const [tag, setTag] = useState<TagType>('넋두리');
  const [contents, setContents] = useState<BoardPostInfo[]>([]);

  const tags: TagTypeEN[] = ['NEOKDURI', 'JABDAM', 'CHIYU'];

  const handleTagClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedTag = e.currentTarget.name as TagType;
    setTag(clickedTag);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/board/posts/?tag=${toEnTag(tag)}`);
      const response = await res.json();
      const result = response.data as BoardPostInfo[];

      if (!result || result.length === 0) {
        console.error('No posts found for the selected tag:', tag);
        return;
      }

      console.log('Fetched posts:', result);

      setContents(result);
    };

    fetchData();
  }, [tag]);

  return (
    <div>
      <header>
        <div className="flex mb-[2.4rem]">
          <h2>삼산동</h2>
          <button>
            <Down />
          </button>
        </div>
        <div className="flex gap-[.8rem]">
          {tags.map(tagItem => (
            <Tag
              key={tagItem}
              onClick={handleTagClick}
              clicked={tag === toKoTag(tagItem)}
            >
              {toKoTag(tagItem)}
            </Tag>
          ))}
        </div>
      </header>
      <div className="border-b border-[var(--gray2)] mt-[2.8rem]">
        {contents.map((content, index) => (
          <Link
            href={`/board/detail/${content.boardId}`}
            key={index}
          >
            <Post
              key={index}
              nickname={content.userName}
              tags={content.hashtags}
              content={content.content}
            />
          </Link>
        )) || <div className="body1">게시글이 없습니다.</div>}
      </div>
      <div className="fixed flex justify-center inset-x-0 bottom-[3.2rem]">
        <div className="flex w-full justify-end max-w-[50rem] px-[3.2rem] h-[6rem] gap-[1.6rem]">
          <ButtonBox
            className="!w-[11.2rem] h-[6rem]"
            bgColor="var(--primary)"
            innerClassName="flex items-center"
            onClick={() => {
              router.push('/board/upload');
            }}
          >
            <Pen />
            <span className="ml-[.8rem]">글쓰기</span>
          </ButtonBox>
        </div>
      </div>
    </div>
  );
}
