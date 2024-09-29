import { EmotionType } from "@/types/emotion";

/**
 * 감정 비중을 계산하는 함수
 * @param emotions - 감정 데이터를 포함한 배열
 * @returns 각 감정의 비중이 100이 되도록 정규화된 감정 비중 객체
 */
export const calculateEmotionDistribution = (
  emotions: { top_emotion: string }[],
): Record<EmotionType, number> => {
  // 감정 빈도수를 저장할 객체 초기화
  const emotionCounts: Record<EmotionType, number> = {
    joy: 0,
    sadness: 0,
    anxiety: 0,
    anger: 0,
    neutrality: 0,
    fatigue: 0,
  };

  const totalDays = emotions.length;

  // 감정 빈도수 계산
  emotions.forEach((emotionData) => {
    const emotion = emotionData.top_emotion as EmotionType;
    if (emotionCounts[emotion] !== undefined) {
      emotionCounts[emotion]++;
    }
  });

  // 각 감정 비중을 정수로 변환하여 퍼센트 계산
  const emotionPercentage = Object.keys(emotionCounts).reduce(
    (acc, key) => {
      const emotionKey = key as EmotionType;
      acc[emotionKey] = Math.floor(
        (emotionCounts[emotionKey] / totalDays) * 100,
      );
      return acc;
    },
    {} as Record<EmotionType, number>,
  );

  // 퍼센트의 총합이 100이 되도록 조정
  const percentageSum = Object.values(emotionPercentage).reduce(
    (sum, percentage) => sum + percentage,
    0,
  );

  // 차이를 감지하고, 차이를 조정
  const diff = 100 - percentageSum;
  if (diff !== 0) {
    // 가장 높은 감정의 비율에 차이를 반영하여 100%를 맞춤
    const emotionWithMaxPercentage = Object.keys(emotionPercentage).reduce(
      (maxEmotion, currentEmotion) =>
        emotionPercentage[currentEmotion as EmotionType] >
        emotionPercentage[maxEmotion as EmotionType]
          ? currentEmotion
          : maxEmotion,
      "joy",
    );

    emotionPercentage[emotionWithMaxPercentage as EmotionType] += diff;
  }

  return emotionPercentage;
};
