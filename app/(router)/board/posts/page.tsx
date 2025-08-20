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

export const dummyPosts: BoardPostInfo[] = [
  {
    boardId: 1,
    title: '힘드네요',
    content: '과제가 너무 많아요',
    userId: 101,
    userName: '박선영',
    boardType: 'NEOKDURI',
    hashtags: ['20대', '대학생'],
    createdAt: '2025-08-18T10:30:00',
    modifiedAt: '2025-08-19T12:00:00',
  },
  {
    boardId: 2,
    title: '리얼톤 대회',
    content: '너무 기대가 됩니다',
    userId: 102,
    userName: '서정호',
    boardType: 'JABDAM',
    hashtags: ['자기계발', '해커톤'],
    createdAt: '2025-08-17T09:15:00',
    modifiedAt: '2025-08-18T14:00:00',
  },
  {
    boardId: 3,
    title: '하 인생',
    content: '살기 싫어요',
    userId: 103,
    userName: '김성원',
    boardType: 'CHIYU',
    hashtags: ['공감', '우울'],
    createdAt: '2025-08-19T08:00:00',
    modifiedAt: '2025-08-20T11:00:00',
  },
  {
    boardId: 4,
    title: '야호 신난다',
    content: '모두 행복하세요~',
    userId: 104,
    userName: '박민수',

    boardType: 'JABDAM',
    hashtags: ['신나', '행복'],
    createdAt: '2025-08-16T13:45:00',
    modifiedAt: '2025-08-17T15:20:00',
  },
  {
    boardId: 5,
    title: '사랑',
    content: '좋아하는 사람이 생겼어요! 이런 게 사랑일까요?',
    userId: 105,
    userName: '최지우',
    boardType: 'NEOKDURI',
    hashtags: ['연애', '설렘', '짝사랑'],
    createdAt: '2025-08-15T11:00:00',
    modifiedAt: '2025-08-16T12:30:00',
  },
];

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

    // fetchData();
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
        {dummyPosts.map((content, index) => (
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
