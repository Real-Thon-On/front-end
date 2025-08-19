import { redirect } from 'next/navigation';

import { SubmitMindTest } from '@/service/mindTest';

import TestClient from './testClient';

export default function TextPage() {
  async function testUpload(formData: FormData) {
    'use server';
    const choiceCount = formData.get('choiceCount');
    const testId = formData.get('testId');

    if (!choiceCount || isNaN(Number(choiceCount))) {
      console.error('Invalid choice count:', choiceCount);
      redirect('/mind-test/select');
    }
    if (!testId || isNaN(Number(testId))) {
      console.error('Invalid test ID:', testId);
      redirect('/mind-test/select');
    }

    const id = Number(testId);

    const answers = [];
    for (let i = 1; i <= Number(choiceCount); i++) {
      const choiceId = formData.get(`question-${i}`);
      if (!choiceId || isNaN(Number(choiceId))) {
        console.error(`Invalid choice ID for question ${i}:`, choiceId);
        redirect('/mind-test/select');
      }
      answers.push({
        questionId: i,
        choiceId: Number(choiceId),
      });
    }

    const res = await SubmitMindTest(id, answers);
    if (!res.success) {
      redirect(`/mind-test/test/${id}?error=upload_failed`);
    }
    redirect(`/mind-test/test/${id}/result`);
  }

  return (
    <>
      <TestClient action={testUpload}></TestClient>
    </>
  );
}
