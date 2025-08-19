'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ButtonBox from '@/components/button/buttonBox';
import Header from '@/components/layout/header/header';
import Modal from '@/components/layout/modal/modal';
import { MindTestQuestion } from '@/service/interfaces';
import Left from '@icons/arrow/arrow2_left.svg';

import Question from '../../_components/question';

type Props = (formData: FormData) => Promise<void>;

export default function TestClient({ action }: { action: Props }) {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const name = params.name;

  const [open, setOpen] = useState(false);
  const [questionList, setQuestionList] = useState<MindTestQuestion[]>([]);

  useEffect(() => {
    if (!id) {
      console.error('Invalid id parameter:', id);
      router.push('/mind-test/select');
    }

    const fetchMindTestList = async () => {
      try {
        const response = await fetch(`/api/mind-test/q?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch mind test list');
        }
        const data = await response.json();
        const mindTestList: MindTestQuestion[] = data.data;

        setQuestionList(mindTestList);

        console.log('Fetched mind test list:', data);
      } catch (error) {
        console.error('Error fetching mind test list:', error);
        router.push('/mind-test/select');
      }
    };
    fetchMindTestList();
  }, [id, router]);

  return (
    <>
      <Header
        left={{
          icon: <Left />,
          ariaLabel: '뒤로 가기',
        }}
        title={name}
        border={true}
      />
      <main className="px-[3.2rem] mt-[2.4rem] mb-[12rem]">
        <form
          id="mindTestUpload"
          action={action}
        >
          <input
            type="hidden"
            name="choiceCount"
            value={questionList.length}
          />
          <input
            type="hidden"
            name="testId"
            value={id}
          />
          {questionList.length > 0 ? (
            <div className="flex flex-col gap-[1.6rem]">
              {questionList.map(question => (
                <Question
                  key={question.id}
                  params={question}
                />
              ))}
            </div>
          ) : (
            <p>No questions available for this test.</p>
          )}
          <div className="fixed flex justify-center inset-x-0 bottom-[3.2rem]">
            <div className="flex w-full justify-end max-w-[50rem] px-[3.2rem]">
              <ButtonBox
                onClick={() => setOpen(true)}
                bgColor="var(--primary)"
                className="max-w-[43.6rem]"
                wFull
              >
                분석하기
              </ButtonBox>
            </div>
          </div>
          {open && (
            <Modal
              formId="mindTestUpload"
              title="테스트를 끝내시겠습니까?"
              loadingText="분석 중입니다."
              onCancel={() => setOpen(false)}
              open={open}
            />
          )}
        </form>
      </main>
    </>
  );
}
