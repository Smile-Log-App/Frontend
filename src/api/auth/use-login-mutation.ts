import { instance } from "@/api/axiosInstance";
import { useAuthGlobalAtom } from "@/app/store/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface postLoginReq {
  user_login_id: string;
  password: string;
}

interface PostLoginRes {
  accessToken: string;
  refreshToken: string;
}

// 로그인 요청 함수
const postLogin = async (userData: postLoginReq): Promise<PostLoginRes> => {
  return await instance.post("/auth/login", userData);
};

// useLoginMutation 훅 정의
export const useLoginMutation = () => {
  const [, setAuth] = useAuthGlobalAtom(); // Jotai의 상태 관리 훅 사용

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data: PostLoginRes) => {
      // Jotai 상태 업데이트: accessToken과 isLoggedIn 설정
      setAuth({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isLoggedIn: true,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
