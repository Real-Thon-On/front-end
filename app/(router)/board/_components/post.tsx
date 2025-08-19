import Image from 'next/image';

import Chat from '@icons/chat.svg';
import Heart from '@icons/heart.svg';

import Tag from './tag';

interface PostProps {
  img?: string;
  nickname: string;
  tags: string[];
  content: string;
  heart: number;
  comment: number;
}
export default function Post({ img, nickname, tags, content, heart, comment }: PostProps) {
  return (
    <div className="py-[2.4rem] border-t border-[var(--gray2)]">
      <div className="flex flex-col gap-[2.4rem]">
        <div className="flex gap-[.8rem] items-center">
          {img ? (
            <Image
              src={img}
              alt="프로필 이미지"
              className="w-[4rem] aspect-square rounded-full"
            />
          ) : (
            <div className="w-[4rem] aspect-square bg-gray-400 rounded-full"></div>
          )}
          <h3>{nickname}</h3>
        </div>
        <div className="flex gap-[.8rem]">
          {tags.map((tag, index) => (
            <Tag
              key={index}
              type="div"
            >
              {tag}
            </Tag>
          ))}
        </div>
        <div className="w-full body3 max-h-[8rem] overflow-ellipsis overflow-hidden break-words line-clamp-3">
          {content}
        </div>
      </div>
      <div className="flex justify-end gap-[.8rem] mt-[1.6rem]">
        <div className="flex gap-[.4rem]">
          <Heart />
          <span>{heart}</span>
        </div>
        <div className="flex gap-[.4rem]">
          <Chat />
          <span>{comment}</span>
        </div>
      </div>
    </div>
  );
}
