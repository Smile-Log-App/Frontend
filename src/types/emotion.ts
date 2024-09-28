// 감정 키를 문자열 리터럴 타입으로 정의
export type EmotionType =
  | "joy"
  | "neutrality"
  | "sadness"
  | "anxiety"
  | "anger"
  | "fatigue";

export interface EmotionAnalysis {
  joy_pct: number;
  sadness_pct: number;
  anxiety_pct: number;
  anger_pct: number;
  neutrality_pct: number;
  fatigue_pct: number;
}

// EmotionAnalysis 타입을 변환하여 pct를 제거한 새로운 객체를 반환
export const removePctFromEmotionAnalysis = (
  emotions: EmotionAnalysis,
): Record<EmotionType, number> => {
  return {
    joy: emotions.joy_pct,
    sadness: emotions.sadness_pct,
    anxiety: emotions.anxiety_pct,
    anger: emotions.anger_pct,
    neutrality: emotions.neutrality_pct,
    fatigue: emotions.fatigue_pct,
  };
};
