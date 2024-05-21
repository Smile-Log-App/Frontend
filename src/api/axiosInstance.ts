import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
  params: {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
  },
});

// 항상 패칭 요청을 보내면 response.data가 값이 리턴되게
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  // 에러 일괄 처리
  async (error) => {
    console.log(error.message);
    return Promise.reject(error);
  },
);
