import { EMOTION_COLORS } from "@/constants/emotion-color";
import { EmotionAnalysis, EmotionType } from "@/types/emotion";

/**
 * 상위 3개의 감정에 해당하는 색상 배열을 생성하는 함수
 * @param emotion - 감정 분석 객체
 * @returns 상위 3개의 감정 색상 배열
 */
export const getTopThreeEmotionColors = (
  emotion: Record<EmotionType, number> | null,
): string[] => {
  if (!emotion) return [];

  const sortedEmotions = Object.entries(emotion)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const nonZeroEmotions = sortedEmotions.filter(
    ([, percentage]) => percentage > 0,
  );

  let colors = nonZeroEmotions.map(([emotion]) => {
    const color = EMOTION_COLORS[emotion as EmotionType];
    return color;
  });

  if (colors.length === 1) {
    colors = Array(3).fill(colors[0]);
  }

  if (colors.length === 2) {
    colors = [colors[0], colors[1]];
  }

  if (colors.length === 0) {
    colors = ["#000000", "#000000", "#000000"];
  }

  console.log("Final top three colors:", colors); // 추가: 최종 색상 배열 로그
  return colors;
};
