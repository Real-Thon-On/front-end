'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Default } from '@/components/layout/container/container';
import { BoardPostInfo } from '@/service/interfaces/board';
import Chat from '@icons/chat.svg';
import CommentUpload from '@icons/comment_upload.svg';
import NotHeart from '@icons/not_heart.svg';

import Tag from '../../_components/tag';
import { dummyPosts } from '../../posts/page';

type Props = (formData: FormData) => Promise<void>;

export default function CommentClient({ action }: { action: Props }) {
  const params = useParams();
  const id = params.id;
  const [postInfo, setPostInfo] = useState<BoardPostInfo>({
    boardId: 0,
    title: '',
    content: '',
    userId: 0,
    userName: '',
    boardType: 'NEOKDURI',
    hashtags: [],
    createdAt: '',
    modifiedAt: '',
  });

  useEffect(() => {
    if (!id) {
      console.error('Post ID is required');
      return;
    }
    const fetchPostDetails = async () => {
      const res = await fetch(`/api/boards/post/detail?id=${id}`);
      for (let i = 0; i < dummyPosts.length; i++) {
        if (dummyPosts[i].boardId === Number(id)) {
          setPostInfo(dummyPosts[i]);
          return;
        }
      }

      // const data = await res.json();
      // setPostInfo(data);
    };
    fetchPostDetails();
  }, [id]);

  const img = '';
  const tags = ['20대', '힘듬', '소통'];
  const nickname = '온심이';
  const content =
    '오늘 하루 직장상사에게 시달려서 정신적으로 너무 지치네요 ㅠㅠ 여러분은 이럴 때 어떻게 이겨내셨나요?';
  const heart = 10;

  const CommentArray = [
    {
      id: 1,
      nickname: '김도현',
      content: '힘내세요! 저도 그런 날이 많았어요.',
      heart: 2,
      comment: 1,
      subComments: [
        {
          id: 1,
          nickname: '온심이',
          content: '감사합니다! 힘내볼게요.',
        },
      ],
    },
    {
      id: 2,
      nickname: '이수진',
      content: '저도 비슷한 경험이 있어요. 같이 힘내요!',
    },
  ];

  return (
    <>
      <div className="mt-[1.6rem]">
        {/* 게시글 내용 */}
        <Default className="flex-col gap-[2.4rem] pt-[2rem] px-[1.2rem] pb-[1.6rem]">
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
            <div className="w-full body3 max-h-[8rem] break-words">{postInfo.content}</div>
            <div className="flex items-center">
              <NotHeart />
              <span className="ml-[.4rem]">{0}</span>
            </div>
          </div>
        </Default>
      </div>
      <div className="mx-[1.2rem] mt-[1.9rem]">
        <div className="body3">댓글 {11}</div>
        <section>
          {CommentArray.map((comment, index) => (
            <div
              key={index}
              className="flex flex-col mt-[2rem]"
            >
              <div className="flex items-center gap-[.8rem]">
                {/* profile */}
                <div className="w-[3.2rem] aspect-square bg-gray-400 rounded-full"></div>
                <span className="body3">{comment.nickname}</span>
              </div>
              <div className="body3 pl-[4rem] mt-[.4rem]">{comment.content}</div>
              <div className="flex items-center gap-[1.6rem] mt-[1.2rem] ml-[4rem] caption">
                <div className="flex items-center gap-[.4rem]">
                  <NotHeart />
                  <span>{comment.heart}</span>
                </div>
                <div className="flex items-center gap-[.4rem]">
                  <Chat />
                  <span>{comment.comment}</span>
                </div>
              </div>
              {comment.subComments && comment.subComments.length > 0 && (
                <div className="ml-[4rem] mt-[2rem]">
                  {comment.subComments.map((subComment, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex flex-col gap-[1rem]"
                    >
                      <div>
                        <div className="flex items-center gap-[.8rem]">
                          {/* profile */}
                          <div className="w-[2.4rem] aspect-square bg-gray-400 rounded-full"></div>
                          <span className="caption">{comment.nickname}</span>
                        </div>
                      </div>
                      <span className="caption ml-[3.2rem]">{subComment.content}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
      <form
        action={action}
        className="fixed flex justify-center bottom-0 inset-x-0"
      >
        <input
          type="hidden"
          name="postId"
          value={id}
        />
        <div className="w-full max-w-[43.6rem] h-[8rem] px-[1.2rem] mb-[2rem] border-t border-[var(--gray2)] flex items-center gap-[.8rem]">
          <input
            type="text"
            name="comment"
            className="body3 w-full bg-white rounded-[1.2rem] px-[1.2rem] py-[.7rem]"
            placeholder="댓글을 입력해주세요."
          />
          <button
            type="submit"
            className="btn2 text-[var(--primary)] h-[3.2rem] px-[1.2rem]"
          >
            <CommentUpload />
          </button>
        </div>
      </form>
    </>
  );
}
