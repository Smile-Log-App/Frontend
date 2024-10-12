import { format } from "date-fns";

/**
 * Date 객체를 입력받아 연도와 월을 객체로 반환하는 함수
 * @param {Date} date - Date 객체
 * @returns {{ year: string, month: string }} 연도와 월을 포함하는 객체 (월은 두 자리 숫자 형식)
 */
export const getYearMonth = (date: Date): { year: number; month: number } => {
  const year = parseInt(format(date, "yyyy"), 10); // 연도는 4자리 숫자
  const month = parseInt(format(date, "MM"), 10); // 월은 2자리 숫자
  return { year, month };
};
