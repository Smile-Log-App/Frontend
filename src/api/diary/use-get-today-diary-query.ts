import instance from "@/api/axiosInstance";
import { EmotionAnalysis } from "@/types/emotion";
import { useQuery } from "@tanstack/react-query";

interface getTodayDiaryRes {
  diary_id: number; // 일기 ID
  user_id: number; // 사용자 ID
  date: string; // 일기 작성 날짜 (ISO 형식의 문자열)
  content: string; // 일기 내용
  emotionAnalysis: EmotionAnalysis & { analysis_id: number }; // 감정 분석 결과 객체
}

const getTodayDiary = async (date: string): Promise<getTodayDiaryRes> => {
  return await instance.get(`/diary?date=${date}`);
};

export const useGetTodayDiaryQuery = (date: string) => {
  return useQuery({
    queryKey: ["diary", date], // queryKey에 date를 포함하여 날짜별로 고유하게 만듦
    queryFn: () => getTodayDiary(date), // queryFn에 date 전달
    enabled: !!date, // date가 존재할 때만 쿼리 실행
  });
};
