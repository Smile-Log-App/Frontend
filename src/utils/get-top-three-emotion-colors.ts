import { EMOTION_COLORS } from "@/constants/emotion-color";
import { EmotionType } from "@/types/emotion";

/**
 * 상위 3개의 감정에 해당하는 색상 배열을 생성하는 함수
 * @param emotion - 감정 분석 객체
 * @returns 상위 3개의 감정 색상 배열
 */
export const getTopThreeEmotionColors = (
  emotion: Record<EmotionType, number> | null,
): string[] => {
  if (!emotion) return [];

  // 응답 객체를 배열로 변환하고 퍼센트를 기준으로 정렬
  const sortedEmotions = Object.entries(emotion)
    .sort(([, a], [, b]) => b - a) // 퍼센트 내림차순으로 정렬
    .slice(0, 3); // 상위 3개의 감정만 추출

  // 퍼센트가 0인 감정 필터링
  const nonZeroEmotions = sortedEmotions.filter(
    ([, percentage]) => percentage > 0,
  );

  // 퍼센트가 0이 아닌 감정의 색상 추출
  let colors = nonZeroEmotions.map(([emotion]) => {
    return EMOTION_COLORS[emotion as EmotionType];
  });

  // 퍼센트가 0이 아닌 감정이 1개만 있는 경우, 최상위 감정을 반복해서 채워 길이를 3으로 맞춤
  if (colors.length === 1) {
    colors = Array(3).fill(colors[0]);
  }

  // 퍼센트가 0이 아닌 감정이 2개만 있는 경우, 해당 색상들로 배열 길이를 2로 설정
  if (colors.length === 2) {
    colors = [colors[0], colors[1]];
  }

  // 퍼센트가 0이 아닌 감정이 없는 경우, 상위 3개의 감정으로 검정색("#000000") 배열을 채움
  if (colors.length === 0) {
    colors = ["#000000", "#000000", "#000000"];
  }

  return colors;
};
