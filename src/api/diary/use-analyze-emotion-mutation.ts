import { EmotionAnalysis } from "@/types/emotion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface AnalyzeRequest {
  entry: string;
}

// 감정 분석 API 호출 함수
export const analyzeEmotion = async (
  entry: AnalyzeRequest,
): Promise<EmotionAnalysis> => {
  const response = await axios.post("/api/analyze", entry, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// 감정 분석 API를 호출하는 React Query 훅
export const useAnalyzeEmotionMutation = () => {
  return useMutation({
    mutationFn: analyzeEmotion,
  });
};
