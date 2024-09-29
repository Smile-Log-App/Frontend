import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

export function formatDate(dateString: string) {
  // dateString이 ISO 형식 (예: "2024-09-29")이라고 가정하고 변환
  const date = parseISO(dateString);

  // 'yyyy년 MM월 dd일 EEEE' 형식으로 변환 (ko는 한국어 로케일 사용)
  return format(date, "yyyy년 M월 d일 EEEE", { locale: ko });
}
