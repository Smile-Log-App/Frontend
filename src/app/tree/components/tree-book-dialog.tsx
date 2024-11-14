import DialogDefault from "@/components/common/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 월별 버튼 컴포넌트
function MonthButton({
  month,
  onClick,
}: {
  month: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-100 h-60 bg-blue-100 rounded-lg text-20 font-semibold m-10"
    >
      {month}월
    </button>
  );
}

// 다이얼로그 컴포넌트
export default function TreeBookDialog({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const router = useRouter();
  const [year, setYear] = useState(new Date().getFullYear()); // 현재 연도 상태로 설정

  const handleMonthClick = (month: number) => {
    const paddedMonth = month.toString().padStart(2, "0"); // 월을 2자리 형식으로 패딩
    router.push(`/tree?year=${year}&month=${paddedMonth}`);
    onOpenChange(); // 다이얼로그 닫기
  };

  const handlePrevYear = () => setYear((prev) => prev - 1); // 이전 연도로 이동
  const handleNextYear = () => setYear((prev) => prev + 1); // 다음 연도로 이동

  return (
    <DialogDefault isOpen={isOpen} onOpenChange={() => onOpenChange()} overlay>
      <div className="w-500 bg-white gap-20 rounded-20 p-10 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-5 px-5">
          <button
            onClick={handlePrevYear}
            className="text-2xl font-bold text-gray-500"
          >
            &lt;
          </button>
          <span className="text-2xl font-semibold">{year}년</span>
          <button
            onClick={handleNextYear}
            className="text-2xl font-bold text-gray-500"
          >
            &gt;
          </button>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          {Array.from({ length: 12 }, (_, i) => (
            <MonthButton
              key={i + 1}
              month={i + 1}
              onClick={() => handleMonthClick(i + 1)}
            />
          ))}
        </div>
      </div>
    </DialogDefault>
  );
}
