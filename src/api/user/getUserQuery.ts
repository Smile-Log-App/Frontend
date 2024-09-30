import { instance } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

interface GetUserRes {
  username: string;
}

const getUser = async (): Promise<GetUserRes> => {
  return await instance.get(`/user/me`);
};

const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(), // queryFn으로 getMonthlyDiary 함수 사용
  });
};

export default useGetUser;
