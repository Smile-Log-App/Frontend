import { format } from "date-fns";

/**
 * 날짜를 지정된 형식으로 포맷팅하는 함수
 * @param {string} formatString - 원하는 날짜 포맷 형식 (예: 'yyyy-MM-dd', 'MM/dd/yyyy', 'yyyy/MM/dd' 등)
 * @param {Date} [date=new Date()] - 포맷팅할 날짜 (기본값: 현재 날짜)
 * @returns {string} 포맷팅된 날짜 문자열
 */
export const formatDate = (formatString: string, date = new Date()) => {
  return format(date, formatString);
};
