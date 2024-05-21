"use client";

// 서버 컴포넌트에서는 useState나 useRef를 사용할 수 없기 때문에 이 부분을 따로 'use client'가 명시된 파일로 분리
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// QueryClient를 생성하는 함수
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR(서버 사이드 렌더링)에서는 클라이언트에서 즉시 다시 데이터를 가져오는 것을
        // 방지하기 위해 기본 staleTime을 0보다 높게 설정하는 경우가 많습니다.
        staleTime: 60 * 1000, // 1분
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

// QueryClient를 가져오는 함수
function getQueryClient() {
  if (typeof window === "undefined") {
    // 서버: 항상 새로운 QueryClient를 만듦
    return makeQueryClient();
  } else {
    // 브라우저: 기존에 QueryClient가 없으면 새로운 QueryClient를 만듦
    // React가 초기 렌더링 중에 서스펜드(suspend)될 경우 새로운 클라이언트를 다시 만드는 일을 방지하기 위해 필요
    // 만약 suspense boundary가 QueryClient 생성 아래에 있다면 이 부분이 필요 없을 수도 있음

    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

// Providers 컴포넌트
export default function Providers({ children }: { children: ReactNode }) {
  // 주의: QueryClient를 초기화할 때 useState를 사용 X
  //       이 컴포넌트와 서스펜드될 수 있는 코드 사이에 suspense boundary가 없다면
  //       React는 초기 렌더링 중에 클라이언트를 버림
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}
