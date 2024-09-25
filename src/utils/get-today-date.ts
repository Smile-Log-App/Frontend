export function getTodayDate() {
  // 현재 날짜를 가져옵니다.
  const date = new Date();

  // 요일 배열 (일요일부터 시작)
  const daysOfWeek = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  // 년, 월, 일, 요일을 가져옵니다.
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()]; // 요일은 0부터 시작 (0: 일요일, 1: 월요일, ...)

  // 결과 문자열을 포맷합니다.
  return `${year}년 ${month}월 ${day}일 ${dayOfWeek}`;
}
