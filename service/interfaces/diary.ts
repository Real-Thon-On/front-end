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
