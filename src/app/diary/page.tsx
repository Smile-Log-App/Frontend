"use client";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getTodayDate } from "@/utils/get-today-date";
import { EmotionType } from "@/types/emotion";
import { getTopThreeEmotionColors } from "@/utils/get-top-three-emotion-colors";
import TreeCanvas from "@/components/tree/TreeCanvas";
import { EmotionBarList } from "@/components/calendar/EmotionBarList";
import DiaryForm from "@/app/diary/diary-form";

export default function DiaryPage() {
  // API 응답을 저장할 상태
  const [emotionAnalysisResult, setEmotionAnalysisResult] = useState<Record<
    EmotionType,
    number
  > | null>(null);

  const todayDate = getTodayDate();

  // emotionAnalysisResult가 변경될 때만 topThreeColors를 계산
  const topThreeColors = useMemo(() => {
    return getTopThreeEmotionColors(emotionAnalysisResult);
  }, [emotionAnalysisResult]);

  return (
    <div className="h-full min-h-screen flex items-center justify-between px-40 text-30">
      <div className="flex flex-col items-center gap-30">
        <p className="text-30">{todayDate}</p>
        <h1 className="text-40 font-bold mb-8 text-center">유담이의 일기</h1>
        <DiaryForm onDiarySubmit={setEmotionAnalysisResult} />
      </div>

      {/* 감정 분석 결과를 EmotionBarList로 표시 */}
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
            <EmotionBarList emotions={emotionAnalysisResult} />
          </div>
        </>
      )}
    </div>
  );
}
