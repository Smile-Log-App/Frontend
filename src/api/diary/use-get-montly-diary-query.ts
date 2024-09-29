import { useQuery } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";

interface MonthlyDiaryRes {
  monthly_emotions: {
    date: string;
    top_emotion: string;
  }[];
}

const getMonthlyDiary = async (
  year: string,
  month: string,
): Promise<MonthlyDiaryRes> => {
  return await instance.get(`/monthly?year=${year}&month=${month}`);
};

const useGetMonthlyDiaryQuery = (year: string, month: string) => {
  return useQuery({
    queryKey: ["diary", year, month],
    queryFn: () => getMonthlyDiary(year, month), // queryFn으로 getMonthlyDiary 함수 사용
    enabled: !!year && !!month, // year와 month가 모두 존재할 때만 쿼리 실행
  });
};

export default useGetMonthlyDiaryQuery;
