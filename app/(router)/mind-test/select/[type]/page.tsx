'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MindTestResponseDate } from '@/service/interfaces';

import TestComponent from '../../_components/testComponent';

export default function MindTest() {
  const router = useRouter();
  const params = useParams();
  const type = params.type;

  const [TestList, setTestList] = useState<MindTestResponseDate[]>([]);

  useEffect(() => {
    if (!type || (type !== 'adult' && type !== 'student')) {
      console.error('Invalid type parameter:', type);
      router.push('/mind-test/select');
    }

    const fetchMindTestList = async () => {
      try {
        const response = await fetch(`/api/mind-test?type=${type}`);
        const data = await response.json();
        const mindTestList: MindTestResponseDate[] = data.data;

        setTestList(mindTestList);

        console.log('Fetched mind test list:', data);
      } catch (error) {
        console.error('Error fetching mind test list:', error);
        router.push('/mind-test/select');
      }
    };
    fetchMindTestList();
  }, [type, router]);

  return (
    <>
      {TestList.length > 0 ? (
        <div className="flex flex-col gap-[1.6rem]">
          {TestList.map(test => (
            <TestComponent
              key={test.id}
              params={test}
            />
          ))}
        </div>
      ) : (
        <p>No tests available for this type.</p>
      )}
    </>
  );
}
