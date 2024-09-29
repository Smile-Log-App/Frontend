// 요일 배열
const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

// 감정 데이터 타입
interface EmotionData {
  date: string;
  top_emotion: string;
}

// Props 타입 정의
interface CalendarDayProps {
  day: number;
  emotion?: string;
  onClick: () => void;
}

// Props 타입 정의
interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

// Props 타입 정의
interface CalendarProps {
  year: number;
  month: number;
  emotions?: EmotionData[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (day: number) => void;
}

// CalendarHeader 컴포넌트
function CalendarHeader({
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4 p-20">
      <button onClick={onPrevMonth} className="text-30 font-semibold">
        &lt;
      </button>
      <div className="text-30 font-bold">{`${year}.${String(month).padStart(
        2,
        "0",
      )}`}</div>
      <button onClick={onNextMonth} className="text-30 font-semibold">
        &gt;
      </button>
    </div>
  );
}

import Image from "next/image";

interface CalendarDayProps {
  day: number;
  emotion?: string;
  onClick: () => void;
}

function CalendarDay({ day, emotion, onClick }: CalendarDayProps) {
  return (
    <div
      className={`p-10 h-100 font-bold text-20 text-center items-center flex flex-col relative cursor-pointer border-1 border-gray-300`}
      onClick={onClick}
    >
      {day}
      {emotion && (
        <Image
          src={`/images/emoji/${emotion}.png`}
          alt={emotion}
          width={60}
          height={70}
        />
      )}
    </div>
  );
}

// Calendar 컴포넌트
function Calendar({
  year,
  month,
  emotions = [],
  onPrevMonth,
  onNextMonth,
  onSelectDay,
}: CalendarProps) {
  // 날짜 계산
  const daysInMonth = new Date(year, month, 0).getDate();
  const dayOfWeek = new Date(`${year}-${month}-01`).getDay();
  const allDays = Array.from({ length: daysInMonth }, (_, v) => v + 1);
  const emptyFirstCards = Array.from({ length: dayOfWeek }, (_, v) => v + 1);

  return (
    <div className="flex justify-center items-center h-screen mt-30">
      <div className="w-[800px] p-6 bg-white/50 rounded-2xl shadow-lg">
        <CalendarHeader
          year={year}
          month={month}
          onPrevMonth={onPrevMonth}
          onNextMonth={onNextMonth}
        />

        <div className="grid grid-cols-7 gap-0">
          {WEEK.map((day) => (
            <div
              key={day}
              className="flex items-center justify-center h-50 text-center font-bold text-25"
            >
              {day}
            </div>
          ))}

          {emptyFirstCards.map((_, idx) => (
            <div key={idx} className="p-2"></div>
          ))}

          {allDays.map((day) => {
            // 현재 날짜와 매치되는 감정 데이터를 찾음
            const emotion = emotions.find(
              (emotionData) =>
                emotionData.date ===
                `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
            )?.top_emotion;

            return (
              <CalendarDay
                key={day}
                day={day}
                emotion={emotion} // 감정 데이터가 있으면 전달
                onClick={() => onSelectDay(day)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
