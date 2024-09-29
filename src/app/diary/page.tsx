"use client";
import { useMemo } from "react";
import { formatDate } from "@/utils/get-today-date";
import { removePctFromEmotionAnalysis } from "@/types/emotion";
import { getTopThreeEmotionColors } from "@/utils/get-top-three-emotion-colors";
import TreeCanvas from "@/components/tree/TreeCanvas";
import { EmotionBarList } from "@/components/calendar/EmotionBarList";
import DiaryForm from "@/app/diary/diary-form";
import { useGetDailyDiaryQuery } from "@/api/diary/use-get-daily-diary-query";
import { useSearchParams } from "next/navigation";

export default function DiaryPage() {
  const { data: diary } = useGetDailyDiaryQuery();
  const searchParam = useSearchParams();
  const date = searchParam.get("date");

  // 상위 3개의 감정 색상 계산
  const topThreeColors = useMemo(() => {
    if (!diary || !diary.emotionAnalysis) return [];
    return getTopThreeEmotionColors(
      removePctFromEmotionAnalysis(diary.emotionAnalysis),
    );
  }, [diary]);

  return (
    <div className="h-full min-h-screen flex items-center justify-between px-40 text-30">
      <div className="flex flex-col items-center gap-30">
        <p className="text-30">{date && formatDate(date)}</p>
        <h1 className="text-40 font-bold mb-8 text-center">유담이의 일기</h1>
        {diary ? (
          <div className="p-6 rounded shadow-md max-w-lg">
            <p className="text-20 mb-4">{diary.content}</p>
          </div>
        ) : (
          <DiaryForm />
        )}
      </div>
      {diary && diary.emotionAnalysis && (
        <>
          <div className="px-20 flex h-650 w-600 justify-center">
            <TreeCanvas
              colors={topThreeColors}
              hp={80}
              day={1}
              widthRatio={3 / 5}
            />
          </div>
          <div className="mt-4 rounded shadow">
            <EmotionBarList
              label="Today Feeling"
              emotions={removePctFromEmotionAnalysis(diary.emotionAnalysis)}
            />
          </div>
        </>
      )}
    </div>
  );
}
