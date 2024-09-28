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
