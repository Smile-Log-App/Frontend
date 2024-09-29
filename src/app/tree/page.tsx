"use client";
import { useMemo } from "react";
import TreeCanvas from "@/components/tree/TreeCanvas";

import useGetMonthlyDiaryQuery from "@/api/diary/use-get-montly-diary-query"; // 월별 감정 데이터를 가져오는 쿼리 훅
import { calculateEmotionDistribution } from "@/utils/calculate-emotion-distribution";
import { getTopThreeEmotionColors } from "@/utils/get-top-three-emotion-colors";
import { removePctFromEmotionAnalysis } from "@/types/emotion";

export default function TreePage() {
  const { data: monthlyDiary } = useGetMonthlyDiaryQuery(
    "2024", // 예시로 2024년으로 설정 (필요한 연도와 월을 동적으로 설정할 수 있습니다)
    "09", // 예시로 9월로 설정
  );

  // 감정 비중을 계산 (monthly_emotions를 기반으로 계산)
  const emotionDistribution = useMemo(() => {
    if (!monthlyDiary || !monthlyDiary.monthly_emotions) return null;
    return calculateEmotionDistribution(monthlyDiary.monthly_emotions);
  }, [monthlyDiary]);

  // 상위 3개의 감정 색상을 추출
  const topThreeColors = useMemo(() => {
    return getTopThreeEmotionColors(emotionDistribution);
  }, [emotionDistribution]);

  return (
    <div className="h-full flex justify-center">
      <div className="flex h-800 w-900 translate-y-[-25%]  ">
        {emotionDistribution && (
          <TreeCanvas
            colors={topThreeColors} // 상위 3개의 감정 색상
            hp={90} // 감정에 따른 HP
            day={2}
            widthRatio={2 / 5}
          />
        )}
      </div>
    </div>
  );
}
