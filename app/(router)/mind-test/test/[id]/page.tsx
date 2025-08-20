import { redirect } from 'next/navigation';

import { SubmitMindTest } from '@/service/mindTest';

import TestClient from './testClient';

export default function TextPage() {
  async function testUpload(formData: FormData) {
    'use server';
    const choiceCount = formData.get('choiceCount');
    const testId = formData.get('testId');

    if (!choiceCount || !testId) {
      console.error('choiceCount or testId is missing');
      redirect('/mind-test/select');
    }

    const parsedChoiceCount = typeof choiceCount === 'string' ? decodeURI(choiceCount) : '';
    const parsedTestId = typeof testId === 'string' ? decodeURI(testId) : '';

    console.log('choiceCount:', parsedChoiceCount, 'testId:', parsedTestId.split('-')[0]);

    const id = Number(testId);

    const answers = [];
    for (let i = 1; i <= Number(choiceCount); i++) {
      const choiceId = formData.get(`question-${i}`);

      console.log(`question-${i} choiceId:`, choiceId);

      if (!choiceId || isNaN(Number(choiceId))) {
        console.error(`Invalid choice ID for question ${i}:`, choiceId);
        redirect('/mind-test/select');
      }
      answers.push({
        questionId: i,
        choiceId: Number(choiceId),
      });
    }

    console.log('Submitting answers:', answers);

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
