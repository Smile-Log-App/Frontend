"use client";
import Button from "@/components/common/button";
import CheckBox from "@/components/common/check-box";
import { ERROR_PASSWORD_SECOND_EMPTY } from "@/constants/validation";
import Link from "next/link";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Input from "@/components/common/input";
import { useSignUpMutation } from "@/api/auth/use-sign-up-mutation";
import toast from "react-hot-toast";

function SignupPage() {
  const signUpMutation = useSignUpMutation();
  const method = useForm<FieldValues>({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      userId: "",
      password: "",
      passwordCheck: "",
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
  // 회원가입 처리 함수

  const handleOnSubmit = async (data: FieldValues) => {
    const userData = {
      username: data.username,
      user_login_id: data.userId,
      password: data.password,
    };

    signUpMutation.mutate(userData, {
      onSuccess: (response) => {
        toast.success("회원가입이 성공적으로 완료되었습니다.");
        router.push("/login"); // 회원가입 성공 후 로그인 페이지로 이동
      },
      onError: (error) => {
        alert(`회원가입 중 오류가 발생했습니다: ${error.message}`);
      },
    });
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
            name="username"
            label="닉네임"
            placeholder="닉네임을 입력하세요."
            type="text"
          />
          <Input
            control={control}
            name="userId"
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
            <Button disabled={!isValid || signUpMutation.isPending}>
              {signUpMutation.isPending ? "회원가입 중..." : "회원가입"}
            </Button>
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
