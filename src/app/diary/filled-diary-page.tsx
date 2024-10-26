import { GetDailyDiaryRes } from "@/api/diary/use-get-daily-diary-query";
import { EmotionBarList } from "@/components/emotion/emotion-bar-list";
import TreeCanvas from "@/components/tree/TreeCanvas";
import { removePctFromEmotionAnalysis } from "@/types/emotion";
import { formatDate } from "@/utils/get-today-date";

interface DiaryContentPageProps {
  diary: GetDailyDiaryRes;
  userName: string;
  date: string | null;
  topThreeColors: string[];
}

// 일기 내용이 있을 때 페이지
export default function FilledDiaryPage({
  diary,
  userName,
  date,
  topThreeColors,
}: DiaryContentPageProps) {
  return (
    <div className="h-full flex items-center justify-center py-80 gap-60 text-30">
      <div className="flex flex-col items-center gap-30">
        <p className="text-30 text-black">{date && formatDate(date)}</p>
        <h1 className="text-40 text-black font-bold mb-8 text-center">
          {userName}의 일기
        </h1>
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-lg max-w-lg">
          <p className="text-20 mb-4 whitespace-pre-wrap leading-relaxed tracking-wide">
            {diary.content}
          </p>
        </div>
      </div>
      <div className="px-20 flex h-600 w-640 justify-center">
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
    </div>
  );
}
