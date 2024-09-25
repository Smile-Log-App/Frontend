import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface AnalyzeResponse {
  joy: number;
  sad: number;
  anxiety: number;
  angry: number;
  peace: number;
  tired: number;
}

export interface AnalyzeRequest {
  entry: string;
}

// 감정 분석 API 호출 함수
export const analyzeEmotion = async (
  entry: AnalyzeRequest,
): Promise<AnalyzeResponse> => {
  const response = await axios.post<AnalyzeResponse>("/api/analyze", entry, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// 감정 분석 API를 호출하는 React Query 훅
export const useAnalyzeEmotion = () => {
  return useMutation({
    mutationFn: analyzeEmotion,
  });
};
