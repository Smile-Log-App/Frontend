"use client";
import { useState } from "react";

import useGetMonthlyDiaryQuery from "@/api/diary/use-get-montly-diary-query";
import Calendar from "@/app/calendar/components/Calendar";

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

function CalendarPage() {
  const { curYear, curMonth } = showTodayDate();
  const [year, setYear] = useState<number>(curYear);
  const [month, setMonth] = useState<number>(curMonth);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // 감정 데이터를 가져오는 쿼리 훅 호출
  const { data: monthlyDiary } = useGetMonthlyDiaryQuery(
    String(year),
    String(month).padStart(2, "0"), // 월을 두 자리로 맞추기
  );

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setYear((prev) => prev - (month === 1 ? 1 : 0));
    setMonth((prev) => (prev === 1 ? 12 : prev - 1));
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setYear((prev) => (month === 12 ? prev + 1 : prev));
    setMonth((prev) => (prev === 12 ? 1 : prev + 1));
  };

  return (
    <Calendar
      year={year}
      month={month}
      emotions={monthlyDiary?.monthly_emotions || []} // 감정 데이터를 props로 전달
      onPrevMonth={handlePrevMonth}
      onNextMonth={handleNextMonth}
      onSelectDay={(day) => setSelectedDay(day)} // 선택한 날짜 설정
    />
  );
}

export default CalendarPage;
