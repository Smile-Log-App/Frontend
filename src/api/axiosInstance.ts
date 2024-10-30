import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { postAccessToken } from "@/api/auth/use-post-aceess-token"; // 기존에 정의된 postAccessToken 함수

// 토큰 재발급이 필요한지 판단하는 함수
const shouldRetryToken = (url: string | undefined): boolean => {
  // 회원가입, 로그인, 혹은 토큰 재발급이 필요하지 않은 API의 URL을 정의
  const excludedUrls = ["/auth/signup"];
  return !excludedUrls.includes(url || "");
};

// AxiosRequestConfig 확장
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // _retry 속성 추가
}

// Axios 인스턴스 생성
export const instance = axios.create({
  // baseURL: "http://3.34.74.208:8000/api",
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 로컬 스토리지에서 'auth' 데이터를 가져오는 함수
export const getAuthData = (): {
  accessToken: string;
  refreshToken: string;
} | null => {
  if (typeof window === "undefined") return null;
  const authData = localStorage.getItem("auth");
  if (!authData) return null;
  return JSON.parse(authData); // accessToken과 refreshToken 모두 반환
};

// 로컬 스토리지에서 accessToken만 가져오는 함수
export const getAccessToken = (): string | null => {
  const authData = getAuthData();
  return authData ? authData.accessToken : null;
};

// 로컬 스토리지에 'auth' 데이터를 저장하는 함수
export const setAccessToken = (accessToken: string) => {
  const authData = getAuthData();
  if (!authData) return;
  authData.accessToken = accessToken;
  localStorage.setItem("auth", JSON.stringify(authData)); // 업데이트된 토큰을 로컬 스토리지에 저장
};

// Axios 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// Axios 인터셉터 설정
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 요청이 없거나 재시도 중인 경우 무한 루프 방지
    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 403 에러 발생 시 토큰 재발급이 필요한 URL인지 확인
    if (
      error.response?.status === 403 &&
      shouldRetryToken(originalRequest.url)
    ) {
      console.log(originalRequest.url);
      originalRequest._retry = true; // 한 번만 재시도하게 설정

      const authData = getAuthData(); // auth 객체에서 refreshToken 가져옴
      const refreshToken = authData ? authData.refreshToken : null;

      console.log(refreshToken);
      // 리프레시 토큰이 없거나 만료된 경우 에러 처리
      if (!refreshToken) {
        console.error("리프레시 토큰이 없습니다.");
        localStorage.removeItem("auth");
        return Promise.reject(
          new Error("리프레시 토큰이 없습니다. 로그아웃 처리됩니다."),
        );
      }

      try {
        // 리프레시 토큰으로 새 액세스 토큰 요청
        const { accessToken } = await postAccessToken(refreshToken);

        // 새 액세스 토큰을 로컬 스토리지에 업데이트
        setAccessToken(accessToken);

        // 리프레시 토큰을 사용하는 중에 발생한 요청이 아니라는 것을 확인
        if (originalRequest.url === "/auth/refresh-token") {
          console.log(
            "리프레시 토큰 요청 중에는 다시 리프레시를 시도하지 않습니다.",
          );
          return Promise.reject(error); // 리프레시 중이면 에러 반환
        }

        // 기존 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest); // 원래 요청 다시 실행
      } catch (refreshError) {
        console.error("토큰 재발급 실패:", refreshError);
        localStorage.removeItem("auth"); // 실패 시 auth 정보 제거
        return Promise.reject(
          new Error("리프레시 토큰이 유효하지 않습니다. 로그아웃 처리됩니다."),
        );
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
