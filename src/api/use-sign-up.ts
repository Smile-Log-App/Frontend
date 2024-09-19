import { instance } from "@/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
interface postSignUpReq {
  username: string;
  user_login_id: string;
  password: string;
}
const postSignUp = (userData: postSignUpReq) => {
  return instance.post("/auth/register", { userData });
};
export const useSignUpMutation = useMutation({ mutationFn: postSignUp });
