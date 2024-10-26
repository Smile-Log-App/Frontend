import DiaryForm from "@/app/diary/components/diary-form";
import { formatDate } from "@/utils/get-today-date";

interface EmptyDiaryPageProps {
  userName: string;
  date: string | null;
}

// 일기 내용이 없을 때 페이지
export default function EmptyDiaryPage({
  userName,
  date,
}: EmptyDiaryPageProps) {
  return (
    <div className="h-full flex items-center justify-center py-80 gap-60 text-30">
      <div className="flex flex-col items-center gap-30">
        <p className="text-30 text-black">{date && formatDate(date)}</p>
        <h1 className="text-40 text-black font-bold mb-8 text-center">
          {userName}의 일기
        </h1>
        <DiaryForm />
      </div>
    </div>
  );
}
