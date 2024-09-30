import instance from "@/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
export const postAccessToken = async (
  refreshToken: string,
): Promise<{ accessToken: string }> => {
  console.log("액세스 토큰 재발급 요청 ");
  return await instance.post(
    "/auth/refresh-token",
    { refreshToken },
    {
      headers: {
        Authorization: "", // Authorization 헤더를 비워둠
      },
    },
  );
};

export const usePostAccessTokenMutation = () => {
  return useMutation({
    mutationFn: postAccessToken,
  });
};
