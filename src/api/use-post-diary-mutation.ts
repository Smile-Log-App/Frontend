import instance from "@/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";

// 요청에 필요한 데이터 타입 정의
interface EmotionAnalysis {
  joyful_pct: number;
  sad_pct: number;
  anxious_pct: number;
  annoyed_pct: number;
  neutral_pct: number;
  tired_pct: number;
}

interface PostDiaryRequest {
  user_id: number; // Int형
  content: string; // 일기 내용
  emotionAnalysis: EmotionAnalysis; // 감정 분석 결과
}

// 감정 일기 POST 요청 함수
const postDiary = async (data: PostDiaryRequest) => {
  const response = await instance.post("/diary", data);
  return response;
};

// usePostDiaryMutation 훅
export const usePostDiaryMutation = () => {
  return useMutation({
    mutationFn: postDiary,
  });
};
