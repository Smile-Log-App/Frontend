"use client";
import TreeIcon from "#/icons/ic-tree.svg";
import useGetMonthlyDiaryQuery from "@/api/diary/use-get-montly-diary-query"; // 월별 감정 데이터를 가져오는 쿼리 훅
import TreeBookDialog from "@/app/tree/components/tree-book-dialog";
import { EmotionBarList } from "@/components/emotion/emotion-bar-list";
import TreeCanvas from "@/components/tree/TreeCanvas";
import { calculateEmotionDistribution } from "@/utils/calculate-emotion-distribution";
import { getTopThreeEmotionColors } from "@/utils/get-top-three-emotion-colors";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function TreePage() {
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  if (!year || !month) {
    return null;
  }

  const { data: monthlyDiary } = useGetMonthlyDiaryQuery(year, month);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 감정 비중을 계산 (monthly_emotions를 기반으로 계산)
  const emotionDistribution = useMemo(() => {
    if (!monthlyDiary || !monthlyDiary.monthly_emotions) return null;
    return calculateEmotionDistribution(monthlyDiary.monthly_emotions);
  }, [monthlyDiary]);

  // 상위 3개의 감정 색상을 추출
  const topThreeColors = useMemo(() => {
    return getTopThreeEmotionColors(emotionDistribution);
  }, [emotionDistribution]);

  const handleTreeButtonClick = () => {
    setIsDialogOpen(true);
  };

  // monthlyDiary가 빈 배열일 경우 메시지와 버튼을 표시
  if (monthlyDiary && monthlyDiary.monthly_emotions.length === 0) {
    return (
      <div className="flex flex-col items-center mt-100 h-screen text-center gap-20">
        <p className="text-2xl font-semibold mb-4">
          해당 년, 월에 작성한 일기가 없습니다.
        </p>
        <Link
          className="flex justify-center items-center mb-100 w-200 h-50 shadow-lg rounded-10 bg-white text-20"
          href={`/calendar`}
        >
          일기 작성하러 가기
        </Link>
      </div>
    );
  }
  return (
    <div className="relative justify-between pt-160 h-full flex px-100 gap-40">
      <div className="flex flex-col gap-20">
        <p className="text-center text-2xl text-black font-semibold mb-4">
          {year}년 {month}월 <br />
          감정 나무
        </p>
        <EmotionBarList
          label="Monthly Feeling"
          emotions={emotionDistribution}
        />
      </div>
      <div className="flex h-600 w-900 translate-y-[-20%]  ">
        {emotionDistribution && (
          <TreeCanvas
            colors={topThreeColors} // 상위 3개의 감정 색상
            hp={90} // 감정에 따른 HP
            day={2}
            widthRatio={2 / 5}
          />
        )}
      </div>

      {emotionDistribution && (
        <div className="flex flex-col items-center gap-10">
          <button
            onClick={handleTreeButtonClick}
            className="pt-60 flex flex-col gap-20 items-center mb-20"
          >
            <TreeIcon alt="나무 아이콘" />
            <p className="text-24 text-black">나무 도감</p>
          </button>
        </div>
      )}
      <TreeBookDialog
        isOpen={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
