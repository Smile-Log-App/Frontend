"use client";
import { useGetDailyDiaryQuery } from "@/api/diary/use-get-daily-diary-query";
import useGetUser from "@/api/user/getUserQuery";
import { getTopThreeEmotionColors } from "@/utils/get-top-three-emotion-colors";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import EmptyDiaryPage from "@/app/diary/page/empty-diary-page";
import FilledDiaryPage from "@/app/diary/page/filled-diary-page";
import { removePctFromEmotionAnalysis } from "@/types/emotion";

export default function DiaryPage() {
  const { data: diary } = useGetDailyDiaryQuery();
  const { data: user } = useGetUser();
  const searchParam = useSearchParams();
  const date = searchParam.get("date");

  const topThreeColors = useMemo(() => {
    if (!diary || !diary.emotionAnalysis) return [];
    return getTopThreeEmotionColors(
      removePctFromEmotionAnalysis(diary.emotionAnalysis),
    );
  }, [diary]);

  if (!user) return null;

  return diary?.content ? (
    <FilledDiaryPage
      diary={diary}
      userName={user.username}
      date={date}
      topThreeColors={topThreeColors}
    />
  ) : (
    <EmptyDiaryPage userName={user.username} date={date} />
  );
}
