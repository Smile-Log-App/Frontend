import { instance } from "@/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";

interface postLoginReq {
  user_login_id: string;
  password: string;
}

interface PostLoginRes {
  accessToken: string;
  refreshToken: string;
}

const postLogin = async (userData: postLoginReq): Promise<PostLoginRes> => {
  return await instance.post("/auth/login", { ...userData });
};

export const useLoginMutation = () =>
  useMutation({
    mutationFn: postLogin,
    onSuccess: (data: PostLoginRes) => {
      // 로그인 성공 시 accessToken을 localStorage에 저장
      localStorage.setItem("accessToken", data.accessToken);
      // 필요한 경우 refreshToken도 저장
      localStorage.setItem("refreshToken", data.refreshToken);
    },
  });
