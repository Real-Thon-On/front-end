import { MindTestType } from '@/constants/types';

export interface GetMindTestList {
  method: 'GET';
  endpoint: `/api/psych-tests?type=${MindTestType}`;
  req: undefined;
  res: {
    success: boolean;
    data: MindTestResponseDate[];
  };
}

export interface GetMindTestQuestionList {
  method: 'GET';
  endpoint: `/api/psych-tests/${number}`;
  req: undefined;
  res: {
    success: boolean;
    data: MindTestQuestion[];
  };
}

export interface SubmitMindTest {
  method: 'POST';
  endpoint: `/api/psych-tests/${number}/submit`;
  req: {
    answers: {
      questionId: number;
      choiceId: number;
    }[];
  };
  res: {
    success: boolean;
    data: {
      id: number;
      userName: string | null;
      testName: string;
      totalScore: number;
      resultState: string;
      resultMessage: string;
    };
  };
}

// {
//   "success": "true",
//   "data": {
//       "id": 1,
//       "userName": null,
//       "testName": "우울",
//       "totalScore": 9,
//       "resultState": "경도",
//       "resultMessage": "가벼운 우울 증상을 보이고 있습니다. 스트레스 관리와 생활습관 개선이 필요할 수 있습니다."
//   }
// }

export interface MindTestQuestion {
  id: number;
  questionText: string;
  choiceCount: number;
  choices: {
    id: number;
    text: string;
  }[];
}

export interface MindTestResponseDate {
  id: number;
  name: string;
  scale: string;
  questionCount: number;
  scoringMethod: string;
  scoreRangeMin: number;
  scoreRangeMax: number;
  resultMapping: string;
}
