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
      score: number;
      result: string;
      suggestions: string[];
    };
  };
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
