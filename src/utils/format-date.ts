import { format } from "date-fns";

// /**
//  * 년도와 월을 입력받아 'yyyy-MM' 형식으로 포맷팅하는 함수
//  * @param {Date} date - 포맷팅할 날짜 객체
//  * @returns {string} 'yyyy-MM' 형식의 날짜 문자열
//  */

// export const formatYearMonth = (date: Date): string => {
//   return format(date, "yyyy-MM");
// };

/**
 * 년도와 월, 일을 입력받아 'yyyy-MM-dd' 형식으로 포맷팅하는 함수
 * @param {number} year - 연도
 * @param {number} month - 월 (1부터 12까지)
 * @param {number} day - 일 (1부터 31까지)
 * @returns {string} 'yyyy-MM-dd' 형식의 날짜 문자열
 */
export const formatYearMonthDay = (
  year: number,
  month: number,
  day: number,
): string => {
  const date = new Date(year, month - 1, day); // Date 객체의 month는 0부터 시작하므로 -1 필요
  return format(date, "yyyy-MM-dd");
};

/**
 * 특정 날짜(Date 객체)를 'yyyy-MM-dd' 형식으로 포맷팅하는 함수
 * @param {Date} date - 포맷팅할 날짜 객체
 * @returns {string} 'yyyy-MM-dd' 형식의 날짜 문자열
 */
export const formatDateToISO = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

/**
 * 특정 날짜(Date 객체)를 'yyyy년 MM월 dd일 (E)' 형식으로 포맷팅하는 함수
 * @param {Date} date - 포맷팅할 날짜 객체
 * @returns {string} 'yyyy년 MM월 dd일 (E)' 형식의 날짜 문자열
 */
export const formatDateToKorean = (date: Date): string => {
  return format(date, "yyyy년 MM월 dd일 (E)");
};
