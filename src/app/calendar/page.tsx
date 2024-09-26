"use client";
import { useState } from "react";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

export const showTodayDate = () => {
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;
  const curDay = now.getDate();
  const curHour = now.getHours();
  const curMinute = now.getMinutes();

  return { curYear, curMonth, curDay, curHour, curMinute };
};

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

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
      <div className="text-30 font-bold">{`${year}.${String(month).padStart(2, "0")}`}</div>
      <button onClick={onNextMonth} className="text-30 font-semibold">
        &gt;
      </button>
    </div>
  );
}

interface CalendarDayProps {
  day: number;
  onClick: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, onClick }) => (
  <div
    className={`p-10 h-100 font-bold text-20 text-center relative cursor-pointer border-1 border-gray-300`}
    onClick={onClick}
  >
    {day}
  </div>
);

function Calendar() {
  const { curYear, curMonth } = showTodayDate();
  const [year, setYear] = useState<number>(curYear);
  const [month, setMonth] = useState<number>(curMonth);
  const [day, setDay] = useState<number>(0);

  const daysInMonth = new Date(year, month, 0).getDate();
  const dayOfWeek = new Date(`${year}-${month}-01`).getDay();
  const allDays = Array.from({ length: daysInMonth }, (_, v) => v + 1);
  const emptyFirstCards = Array.from({ length: dayOfWeek }, (_, v) => v + 1);

  const handlePrevMonth = () => {
    setYear((prev) => prev - (month === 1 ? 1 : 0));
    setMonth((prev) => (prev === 1 ? 12 : prev - 1));
  };

  const handleNextMonth = () => {
    setYear((prev) => (month === 12 ? prev + 1 : prev));
    setMonth((prev) => (prev === 12 ? 1 : prev + 1));
  };

  return (
    <div className=" flex  justify-center items-center h-screen mt-30">
      <div className="w-[800px] p-6 bg-white/50 rounded-2xl shadow-lg">
        <CalendarHeader
          year={year}
          month={month}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
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

          {allDays.map((day) => (
            <CalendarDay
              key={day}
              day={day}
              onClick={() => setDay(day)}
            ></CalendarDay>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
