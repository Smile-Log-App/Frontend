import axios from "axios";

// Axios 인스턴스 생성
export const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 로컬 스토리지에서 'auth' 데이터를 가져오는 함수
export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  const authData = localStorage.getItem("auth"); // auth 키로 로컬 스토리지에서 데이터 가져오기
  if (!authData) return null;
  const auth = JSON.parse(authData); // JSON 파싱
  return auth.accessToken; // accessToken 반환
};

// request 인터셉터 설정: 요청 전에 accessToken을 헤더에 추가
instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  },
);

// 항상 패칭 요청을 보내면 response.data가 값이 리턴되게 설정
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // 에러 일괄 처리
    console.error("API 요청 오류:", error.message);
    return Promise.reject(error);
  },
);

export default instance;
