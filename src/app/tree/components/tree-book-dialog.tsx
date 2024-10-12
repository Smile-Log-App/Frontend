import DialogDefault from "@/components/common/dialog";
import { useRouter } from "next/navigation";

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
      className="w-100 h-40 bg-blue-100 rounded-lg text-18 font-semibold m-2"
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
  const currentYear = new Date().getFullYear(); // 현재 연도를 가져옵니다.

  const handleMonthClick = (month: number) => {
    const paddedMonth = month.toString().padStart(2, "0"); // 월을 2자리 형식으로 패딩
    router.push(`/tree?year=${currentYear}&month=${paddedMonth}`);
    onOpenChange(); // 다이얼로그 닫기
  };

  return (
    <DialogDefault isOpen={isOpen} onOpenChange={() => onOpenChange()} overlay>
      <div className="w-500 h-300 bg-white rounded-20 p-4 flex flex-wrap justify-center items-center">
        {Array.from({ length: 12 }, (_, i) => (
          <MonthButton
            key={i + 1}
            month={i + 1}
            onClick={() => handleMonthClick(i + 1)}
          />
        ))}
      </div>
    </DialogDefault>
  );
}
