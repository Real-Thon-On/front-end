export interface UploadDiary {
  method: 'POST';
  endpoint: '/api/ai/diary/analyze';
  req: {
    todayDate: string;
    userDiaryText: string;
  };
  res: {
    success: boolean;
    data: {
      analysis: {
        dominant_emotion: string;
        emotion_scores: Record<string, number>;
        valence: number;
        arousal: number;
        temperature: number;
        weather: string;
        color_hex: string;
        keywords: string[];
        risk_flag: boolean;
      };
      suggestions: {
        reframing: string;
        encouragement: string;
        gentle_action_tip: string;
        local_cue?: string;
      };
      replyText: string;
    };
  };
}

export interface RecommendedEvent {
  id: number;
  title: string;
  url: string;
  mainCategory: string;
  matchedKeywords: string;
  imageUrl: string;
}

export interface GetAnalyzeDiary {
  method: 'GET';
  endpoint: '/api/ai/diary/analyze/result';
  req: undefined;
  res: {
    success: boolean;
    data: AnalyzedDiary;
  };
}

export interface AnalyzedDiary {
  analysis: {
    dominant_emotion: string;
    emotion_scores: Record<string, number>;
    valence: number;
    arousal: number;
    temperature: number;
    weather: string;
    color_hex: string;
    keywords: string[];
    risk_flag: boolean;
  };
  suggestions: {
    good: string;
    suggest: string;
    feedback: string;
    total_summary: string;
  };
  replyText: string;
  recommendedEvents: RecommendedEvent[];
}

//   {
//     "success": "true",
//     "data": {
//         "analysis": {
//             "valence": -0.36,
//             "arousal": 0.48,
//             "temperature": 48,
//             "weather": "CLOUDY",
//             "keywords": [
//                 "우울",
//                 "큰일",
//                 "실수",
//                 "샤워",
//                 "따뜻한 물"
//             ],
//             "dominant_emotion": "우울",
//             "emotion_scores": {
//                 "joy": 0.0,
//                 "sad": 0.68,
//                 "anger": 0.0,
//                 "fear": 0.0,
//                 "anxiety": 0.0,
//                 "calm": 0.0,
//                 "tired": 0.0,
//                 "lonely": 0.0,
//                 "hope": 0.32
//             },
//             "color_hex": "#E38B8B",
//             "risk_flag": false
//         },
//         "suggestions": {
//             "good": "오늘은 퇴근 후 집에 와서 따뜻한 물로 샤워를 한 것을 좋게 생각했다.",
//             "suggest": "매일매일 작은 성공과 행복을 찾아보도록 해.",
//             "feedback": "우울한 감정과 실수의 아픔을 더 잘 관리하고, 자신감을 키워가도록 노력해 보세요. 그리고 작은 성공과 행복을 찾아보는 것도 좋습니다. 만약에 우울한 감정이 계속되어서 자신감이 떨어져서 힘들다면, 전문가의 도움을 받는 것을 추천합니다.",
//             "total_summary": "우울한 감정과 실수의 아픔을 관리하며, 자신감"
//         },
//         "replyText": "```\n\n \n우리는 함께 이 어려운 감정을 나누고, 해결하는 것을 도와드리겠습니다. 오늘은 마음이 무거웠지만, 퇴근 후 집에 와서 샤워를 한 것이 좋은 경험이었다고 생각합니다. 우울한 감정을 관리하는 방법과 자신감을 키워가는 방법을 함께 찾아보겠습니다. 매일매일 작은 성공과 행복을 찾아보는 것도 좋은 방법이라고 생각합니다. 또한, 우울한 감정이 계속되어서 자신감이 떨어져서 힘들다면, 전문가의 도움을 받는 것을 추천합니다. 지금부터는 작은 실수도 큰 실수라고 생각하지 말고, 실수는 고쳐 쓰면 끝이라고 스스로에게 말해보겠습니다. 그리고 tomorrow에 새로운 기회를 찾으러 가겠습니다. 잘 쉬어보세요. 또한, 내일부터는 매일매일 작은 성공과 행복을 찾아가는 것을 목표로 해보겠습니다. 그리고, 오늘의 실수와 어려움을 되돌아보는 시간을 가졌습니다. 만약에 내일도 우울한 감정이 들면, 따뜻한 물로 샤워를 하고, 좋은 경험들을 기억하고, 자신감을 키워가는 것을 기억해 보겠습니다. 잘 쉬어보세요.",
//         "recommendedEvents": [
//             {
//                 "id": 966,
//                 "title": "음향크루 입문 (경상권)",
//                 "url": "https://hrd.arko.or.kr/course/active/detail.do?courseActiveSeq=4427&courseMasterSeq=634",
//                 "mainCategory": "교육",
//                 "matchedKeywords": "키워드와의 직접 매칭이 적지만 제목이 관련 있어 보입니다.",
//                 "imageUrl": "https://hrd.arko.or.kr/storage/image/temp/2025/06/26/mgliyzA3yCzqJSsmqaHU.jpg"
//             },
//             {
//                 "id": 965,
//                 "title": "이미지로 읽는 문학, 텍스트를 담은 예술",
//                 "url": "https://inmun360.culture.go.kr/b2bc/com/pro/calDetail/2425?menuCd=NS_PRO_CAL",
//                 "mainCategory": "교육",
//                 "matchedKeywords": "키워드와의 직접 매칭이 적지만 제목이 관련 있어 보입니다.",
//                 "imageUrl": "https://inmun360.culture.go.kr/b2bc/file/download/40285"
//             },
//             {
//                 "id": 964,
//                 "title": "차 한 잔으로 펼치는 인문학: 오늘은 차(茶)고 내일은 따뜻하겠지",
//                 "url": "https://inmun360.culture.go.kr/b2bc/com/pro/calDetail/2521?menuCd=NS_PRO_CAL",
//                 "mainCategory": "교육",
//                 "matchedKeywords": "키워드와의 직접 매칭이 적지만 제목이 관련 있어 보입니다.",
//                 "imageUrl": "https://inmun360.culture.go.kr/b2bc/file/download/41316"
//             }
//         ]
//     }
// }
