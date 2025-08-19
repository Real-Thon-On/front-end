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
// {
//   "success": "true",
//   "data": {
//       "analysis": {
//           "valence": -0.6,
//           "arousal": 0.4,
//           "temperature": 40,
//           "weather": "RAIN",
//           "keywords": [
//               "일",
//               "부족",
//               "팀원",
//               "걱정"
//           ],
//           "dominant_emotion": "sadness",
//           "emotion_scores": {
//               "joy": 0.0,
//               "sad": 0.6,
//               "anger": 0.2,
//               "fear": 0.0,
//               "anxiety": 0.2,
//               "calm": 0.0,
//               "tired": 0.0,
//               "lonely": 0.0,
//               "hope": 0.0
//           },
//           "color_hex": "#E38B8B",
//           "risk_flag": false
//       },
//       "suggestions": {
//           "reframing": "어떤 일이든 부족함을 느껴도, 팀원들과 함께 힘을 합쳐 해결할 수 있으니까요.",
//           "encouragement": "힘내세요! 어려운 일도 도전을 통해 자신감을 높일 수 있습니다.",
//           "gentle_action_tip": "5분간 자신감을 높이는 노래를 듣고, 내일의 일에 대한 긍정적인 생각을 할 수 있습니다.",
//           "local_cue": ""
//       },
//       "replyText": "```\n\n \n\n당신은 슬픔과 걱정의 감정에 뒤섬하고 있습니다. 하지만 오늘의 일기 또한 도전의 기회가 될 수 있습니다. 일기를 쓰는 순간부터, 당신은 지금 자신이 느끼는 감정과 어려움에 대하여 명확하게 생각할 수 있습니다. 그리고 이 감정과 어려움을 나누고, 팀원들과 함께 힘을 합쳐 해결할 수 있으니까요. 힘내세요! 어려운 일도 도전을 통해 자신감을 높일 수 있습니다. 5분간 자신감을 높이는 노래를 듣고, 내일의 일에 대한 긍정적인 생각을 할 수 있습니다.",
//       "recommendedEvents": [
//           {
//               "id": 964,
//               "title": "차 한 잔으로 펼치는 인문학: 오늘은 차(茶)고 내일은 따뜻하겠지",
//               "url": "https://inmun360.culture.go.kr/b2bc/com/pro/calDetail/2521?menuCd=NS_PRO_CAL",
//               "mainCategory": "교육",
//               "matchedKeywords": "매칭 키워드: 일",
//               "imageUrl": "https://inmun360.culture.go.kr/b2bc/file/download/41316"
//           },
//           {
//               "id": 806,
//               "title": "차 한 잔으로 펼치는 인문학: 오늘은 차(茶)고 내일은 따뜻하겠지",
//               "url": "https://inmun360.culture.go.kr/b2bc/com/pro/calDetail/2521?menuCd=NS_PRO_CAL",
//               "mainCategory": "교육",
//               "matchedKeywords": "매칭 키워드: 일",
//               "imageUrl": "https://inmun360.culture.go.kr/b2bc/file/download/41316"
//           },
//           {
//               "id": 647,
//               "title": "차 한 잔으로 펼치는 인문학: 오늘은 차(茶)고 내일은 따뜻하겠지",
//               "url": "https://inmun360.culture.go.kr/b2bc/com/pro/calDetail/2521?menuCd=NS_PRO_CAL",
//               "mainCategory": "교육",
//               "matchedKeywords": "매칭 키워드: 일",
//               "imageUrl": "https://inmun360.culture.go.kr/b2bc/file/download/41316"
//           }
//       ]
//   }
// }
