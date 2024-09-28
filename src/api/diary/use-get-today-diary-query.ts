import instance from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getTodayDiary = async (date: string) => {
  const response = await instance.get(`/diary?date=${date}`);
  return response.data;
};

export const useGetTodayDiaryQuery = (date: string) => {
  return useQuery({
    queryKey: ["diary", date], // queryKey에 date를 포함하여 날짜별로 고유하게 만듦
    queryFn: () => getTodayDiary(date), // queryFn에 date 전달
    enabled: !!date, // date가 존재할 때만 쿼리 실행
  });
};
