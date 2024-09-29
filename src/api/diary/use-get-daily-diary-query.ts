import instance from "@/api/axiosInstance";
import { EmotionAnalysis } from "@/types/emotion";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

// 서버에서 받아온 감정 분석 결과를 포함한 일기 데이터 타입
interface GetDailyDiaryRes {
  diary_id: number; // 일기 ID
  user_id: number; // 사용자 ID
  date: string; // 일기 작성 날짜 (ISO 형식의 문자열)
  content: string; // 일기 내용
  emotionAnalysis: EmotionAnalysis & { analysis_id: number; diary_id: number }; // 감정 분석 결과 객체
}

// 감정 분석 결과에서 ID 필드 제거하는 함수
const removeIdsFromEmotionAnalysis = (
  emotionAnalysis: EmotionAnalysis & { analysis_id: number; diary_id: number },
): EmotionAnalysis => {
  // EmotionAnalysis 타입으로 변환 (analysis_id와 diary_id 제거)
  const { analysis_id, diary_id, ...rest } = emotionAnalysis;
  return rest;
};

// 서버에서 받아온 데이터를 클라이언트에서 사용할 데이터로 변환
const getDailyDiary = async (
  date: string | null,
): Promise<
  Omit<GetDailyDiaryRes, "emotionAnalysis"> & {
    emotionAnalysis: EmotionAnalysis;
  }
> => {
  // 이미 인터셉터에서 response.data를 반환하므로 바로 할당
  const data: GetDailyDiaryRes = await instance.get(`/daily?date=${date}`);

  // emotionAnalysis에서 ID 필드 제거
  const transformedEmotionAnalysis = removeIdsFromEmotionAnalysis(
    data.emotionAnalysis,
  );

  // 변환된 데이터를 포함한 일기 객체 반환
  return {
    ...data,
    emotionAnalysis: transformedEmotionAnalysis,
  };
};

export const useGetDailyDiaryQuery = () => {
  const searchParam = useSearchParams();
  const date = searchParam.get("date");

  return useQuery({
    queryKey: ["diary", date], // queryKey에 date를 포함하여 날짜별로 고유하게 만듦
    queryFn: () => getDailyDiary(date), // queryFn에 date 전달
    enabled: !!date, // date가 존재할 때만 쿼리 실행
  });
};
