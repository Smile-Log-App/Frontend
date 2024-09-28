import { instance } from "@/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
interface postSignUpReq {
  username: string;
  user_login_id: string;
  password: string;
}
const postSignUp = async (userData: postSignUpReq) => {
  const result = await instance.post("/auth/register", { ...userData });
  return result;
};
export const useSignUpMutation = () => useMutation({ mutationFn: postSignUp });
