'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ButtonBox from '@/components/button/buttonBox';
import { type TagType, type TagTypeEN, toEnTag, toKoTag } from '@/constants/types';
import Down from '@icons/arrow/down.svg';
import Pen from '@icons/pen.svg';

import Post from '../_components/post';
import Tag from '../_components/tag';

interface ContentResType {
  id: number;
  img?: string;
  nickname: string;
  tags: string[];
  content: string;
  heart: number;
  comment: number;
}

export default function Community() {
  const router = useRouter();
  const [tag, setTag] = useState<TagType>('넋두리');
  const [contents, setContents] = useState<ContentResType[]>([]);

  const tags: TagTypeEN[] = ['NEOKDURI', 'JABDAM', 'CHIYU'];

  const ContentTags = ['20대', '힘듬', '소통'];

  const handleTagClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedTag = e.currentTarget.name as TagType;
    setTag(clickedTag);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/board/posts/?tag=${toEnTag(tag)}`);
      if (!res.ok) {
        console.error('Failed to fetch posts');
        return;
      }
      const data = await res.json();
      console.log('Fetched posts:', data);

      setContents(data);
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
            href={`/board/detail/${content.id}`}
            key={index}
          >
            <Post
              key={index}
              img={content.img}
              nickname={content.nickname}
              tags={content.tags}
              content={content.content}
              heart={content.heart}
              comment={content.comment}
            />
          </Link>
        )) || <div className="body1">게시글이 없습니다.</div>}
      </div>
      <div className="fixed flex justify-center inset-x-0 bottom-[3.2rem]">
        <div className="flex w-full justify-end max-w-[43.6rem] h-[6rem] gap-[1.6rem]">
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
