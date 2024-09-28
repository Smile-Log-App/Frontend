"use client";
import { useMemo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getTodayDate } from "@/utils/get-today-date";
import { EmotionAnalysis, EmotionType } from "@/types/emotion";
import { getTopThreeEmotionColors } from "@/utils/get-top-three-emotion-colors";
import TreeCanvas from "@/components/tree/TreeCanvas";
import { EmotionBarList } from "@/components/calendar/EmotionBarList";
import DiaryForm from "@/app/diary/diary-form";
import { useGetTodayDiaryQuery } from "@/api/diary/use-get-today-diary-query";
import { useSearchParams } from "next/navigation";

export default function DiaryPage() {
  const searchParam = useSearchParams();
  const date = searchParam.get("date");

  const { data: diary } = useGetTodayDiaryQuery(date);

  // 감정 분석 결과 상태
  const [emotionAnalysisResult, setEmotionAnalysisResult] =
    useState<EmotionAnalysis | null>(null);

  // diary가 업데이트될 때마다 emotionAnalysisResult를 설정
  useEffect(() => {
    if (diary && diary.emotionAnalysis) {
      setEmotionAnalysisResult(diary.emotionAnalysis);
    }
  }, [diary]);

  // 상위 3개의 감정 색상 계산
  const topThreeColors = useMemo(() => {
    const result = getTopThreeEmotionColors(emotionAnalysisResult);
    return result;
  }, [emotionAnalysisResult]);

  return (
    <div className="h-full min-h-screen flex items-center justify-between px-40 text-30">
      <div className="flex flex-col items-center gap-30">
        <p className="text-30">{getTodayDate()}</p>
        <h1 className="text-40 font-bold mb-8 text-center">유담이의 일기</h1>
        {diary ? (
          <div className="bg-white p-6 rounded shadow-md max-w-lg">
            <h2 className="text-25 font-bold mb-4">작성된 일기</h2>
            <p className="text-20 mb-4">{diary.content}</p>
          </div>
        ) : (
          <DiaryForm
            onDiarySubmit={(emotionAnalysisResult) => {
              setEmotionAnalysisResult(emotionAnalysisResult);
            }}
          />
        )}
      </div>

      {/* 감정 분석 결과를 TreeCanvas로 표시 */}
      {emotionAnalysisResult && (
        <>
          <div className="px-20 flex h-600 w-600 justify-center ">
            <TreeCanvas
              colors={topThreeColors}
              hp={90}
              day={1}
              widthRatio={3 / 5}
            />
          </div>
          <div className="mt-4 p-4 rounded shadow">
            <EmotionBarList
              emotions={removePctFromEmotionAnalysis(emotionAnalysisResult)}
            />
          </div>
        </>
      )}
    </div>
  );
}

// EmotionAnalysis 타입을 변환하여 pct를 제거한 새로운 객체를 반환
const removePctFromEmotionAnalysis = (
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
