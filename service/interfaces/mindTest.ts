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

export interface GetTestResultData {
  method: 'GET';
  endpoint: `/api/psych-tests/result/me`;
  req: undefined;
  res: {
    success: boolean;
    data: MindTestResult[];
  };
}

export interface MindTestResult {
  id: number;
  userName: string | null;
  testName: string;
  totalScore: number;
  resultState: string;
  resultMessage: string;
}

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
