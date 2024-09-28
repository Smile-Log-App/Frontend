import instance from "@/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const postAccessToken = async (
  refreshToken: string,
): Promise<{ accessToken: string }> => {
  return await instance.post("/auth/refresh-token", { refreshToken });
};

export const usePostAccessToken = useMutation({
  mutationFn: postAccessToken,
});
