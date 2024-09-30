"use client";

import { atom, useAtom } from "jotai";
import { withImmer } from "jotai-immer";
import { atomWithStorage } from "jotai/utils";

// 로컬 스토리지 키 상수
const LOCAL_STORAGE_KEY = "auth";

// AuthType 정의
interface AuthType {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
}

// 초기 상태
const initialAuthState: AuthType = {
  isLoggedIn: false,
  accessToken: "",
  refreshToken: "",
};

// 로컬 스토리지와 연동되는 atom 생성
const authAtom = withImmer(
  atomWithStorage<AuthType>(LOCAL_STORAGE_KEY, initialAuthState),
);

// 커스텀 훅: atom 사용 및 업데이트 함수 반환
export const useAuthGlobalAtom = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const updateAuth = (partialAuth: Partial<AuthType>) => {
    setAuth((prev) => ({
      ...prev,
      ...partialAuth,
    }));
  };
  return [auth, updateAuth] as const;
};
