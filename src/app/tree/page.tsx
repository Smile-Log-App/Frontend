"use client";
import { useMemo } from "react";
import TreeCanvas from "@/components/tree/TreeCanvas";
import useGetMonthlyDiaryQuery from "@/api/diary/use-get-montly-diary-query"; // 월별 감정 데이터를 가져오는 쿼리 훅
import { calculateEmotionDistribution } from "@/utils/calculate-emotion-distribution";
import { getTopThreeEmotionColors } from "@/utils/get-top-three-emotion-colors";
import EmotionList from "@/components/emotion/emotion-list";
import { getYearMonth } from "@/utils/get-year-and-month";

export default function TreePage() {
  const { year, month } = getYearMonth(new Date());
  const { data: monthlyDiary } = useGetMonthlyDiaryQuery(year, month);

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
    <div className="h-full flex items-center justify-center">
      <EmotionList />

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
