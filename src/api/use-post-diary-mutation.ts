import instance from "@/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";

// 요청에 필요한 데이터 타입 정의
interface EmotionAnalysis {
  joy_pct: number;
  sadness_pct: number;
  anxiety_pct: number;
  anger_pct: number;
  neutrality_pct: number;
  fatigue_pct: number;
}

interface PostDiaryRequest {
  date?: string; // 날짜는 선택적 필드로 설정 (생략 가능)
  content: string; // 일기 내용
  emotionAnalysis: EmotionAnalysis; // 감정 분석 결과
}

// 감정 일기 POST 요청 함수
const postDiary = async (data: PostDiaryRequest) => {
  // date가 없는 경우, 현재 날짜로 설정
  if (!data.date) {
    data.date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식의 현재 날짜
  }

  // 일기 데이터를 서버로 전송
  const response = await instance.post("/diary", data);
  return response.data;
};

// usePostDiaryMutation 훅
export const usePostDiaryMutation = () => {
  return useMutation({
    mutationFn: postDiary,
  });
};
