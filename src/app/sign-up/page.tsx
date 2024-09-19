"use client";
import Button from "@/components/common/button";
import CheckBox from "@/components/common/check-box";

import { ERROR_PASSWORD_SECOND_EMPTY } from "@/constants/validation";
import Link from "next/link";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Input from "@/components/common/input";

const teamOptions = [
  { value: "Azito" },
  { value: "BeatBuddy" },
  { value: "PetPlate" },
  { value: "Couplelog" },
  { value: "TIG" },
];

const partOptions = [{ value: "프론트엔드" }, { value: "백엔드" }];

function SignupPage() {
  const method = useForm<FieldValues>({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      passwordCheck: "",
      teamName: "",
      part: "",
    },
  });

  const {
    control,
    setError,
    clearErrors,
    getValues,
    formState: { isValid },
    handleSubmit,
  } = method;

  const watchPassword = useWatch({ name: "password", control });
  const watchPasswordCheck = useWatch({ name: "passwordCheck", control });
  const watchPasswordVisibleCheckBox = useWatch({
    name: "passwordVisibleCheckBox",
    control,
  });

  useEffect(() => {
    if (watchPassword !== watchPasswordCheck && watchPasswordCheck) {
      setError("passwordCheck", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다",
      });
    } else {
      clearErrors("passwordCheck");
    }
  }, [watchPassword, watchPasswordCheck, setError, clearErrors]);

  const router = useRouter();

  const queryClient = useQueryClient();

  // const [, setIsLoggedIn] = useAtom(isLoggedInAtom); // useAtom을 사용합니다

  // const signupMutation = useMutation({
  //   mutationFn: (data: PostSignUpReq) => postSignUp(data),

  //   onSuccess: async () => {
  //     try {
  //       const result = await postSignIn({
  //         username: getValues("username"),
  //         password: getValues("password"),
  //       });
  //       if (result.status === 200) {
  //         toast.success("회원가입이 완료되었습니다.");
  //         queryClient.invalidateQueries({ queryKey: ["userInfo"] });
  //         setIsLoggedIn(true);
  //         router.push("/");
  //       }
  //     } catch (loginError) {
  //       console.error("로그인 시도 실패:", loginError);
  //       toast.error("회원가입은 성공했지만, 자동 로그인이 실패했습니다.");
  //     }
  //   },
  //   onError: (e) => {
  //     if (e instanceof AxiosError) {
  //       if (e.response?.data?.message === "이미 존재하는 아이디입니다.") {
  //         setError("username", {
  //           type: "validate",
  //           message: String(e.response?.data?.message),
  //         });
  //       }
  //       if (e.response?.data?.message === "이미 존재하는 이메일입니다.") {
  //         setError("email", {
  //           type: "validate",
  //           message: String(e.response?.data?.message),
  //         });
  //       }
  //     }
  //   },
  // });

  const handleOnSubmit = async (data: FieldValues) => {
    const userData = {
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      teamName: data.teamName,
      part: data.part,
    };
    // signupMutation.mutate(userData);
  };
  return (
    <main className="flex min-h-screen justify-center">
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex-center w-full "
      >
        <div className="flex-column min-h-800 w-800 gap-20 rounded-24 px-60 py-30">
          <Input
            control={control}
            name="name"
            label="이름"
            placeholder="이름을 입력하세요."
            type="text"
          />
          <Input
            control={control}
            name="username"
            label="아이디"
            placeholder="아이디를 입력하세요."
            type="text"
          />
          <Input
            control={control}
            name="password"
            label="비밀번호"
            placeholder="영문자와 숫자 포함 8자 이상 입력하세요."
            type={watchPasswordVisibleCheckBox ? "text" : "password"}
          />
          <Input
            control={control}
            name="passwordCheck"
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            type={watchPasswordVisibleCheckBox ? "text" : "password"}
            rules={{
              required: ERROR_PASSWORD_SECOND_EMPTY,
              validate: {
                matchPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "비밀번호가 일치하지 않습니다";
                },
              },
            }}
          />
          <CheckBox
            control={control}
            name="passwordVisibleCheckBox"
            text="비밀번호 표시"
          />
          <div className="flex-center mt-10">
            {/* <Button disabled={!isValid || signupMutation.isPending}>
              {signupMutation.isPending ? "회원가입 중..." : "회원가입"}
            </Button> */}
            <Button disabled={!isValid}>회원가입</Button>
          </div>
          <div className="flex justify-center gap-7">
            <p>이미 회원이신가요?</p>
            <Link
              href="/login"
              className="text-blue-base underline underline-offset-2"
            >
              로그인 하기
            </Link>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </main>
  );
}

export default SignupPage;
