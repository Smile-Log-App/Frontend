"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import TreeCanvas from "@/components/tree/TreeCanvas";
import toast from "react-hot-toast";
import { getTodayDate } from "@/utils/get-today-date";

// TextEditor 컴포넌트를 동적 로딩 (SSR을 사용하지 않음)
const TextEditor = dynamic(() => import("@/components/diary/TextEditor"), {
  ssr: false,
});

interface AnalyzeResponse {
  analysis: string;
}

export default function DiaryPage() {
  // ReactQuill 에디터를 참조하기 위한 ref 생성
  const quillRef = useRef<ReactQuill | null>(null);
  // 일기 내용을 저장할 상태
  const [htmlContent, setHtmlContent] = useState<string>("");
  // API 응답을 저장할 상태
  const [response, setResponse] = useState<AnalyzeResponse | null>(null);

  // 일기 제출 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ entry: htmlContent }),
      });

      // fetch API는 HTTP 응답 상태 코드가 4xx나 5xx일 때도 Promise를 정상적으로 반환합니다. 즉, fetch 호출 자체는 성공한 것으로 간주하고, 이를 catch 블록에서는 잡아내지 않습니다.
      if (!response.ok) {
        throw new Error("감정 분석 요청에 실패했습니다."); // API 요청 실패 시 에러 발생
      }

      const data = (await response.json()) as AnalyzeResponse;
      setResponse(data); // 응답 저장
    } catch (error) {
      console.error("감정 분석 중 오류가 발생했습니다.", error);
      toast.error("감정 분석 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const todayDate = getTodayDate();
  return (
    <div className="h-full min-h-screen flex items-center justify-between px-40 text-30">
      <div className=" flex flex-col items-center gap-30">
        <p className="text-30">{todayDate}</p>
        <h1 className="text-40 font-bold mb-8 text-center">유담이의 일기</h1>
        <div className="mb-4 w-600">
          <TextEditor
            quillRef={quillRef}
            htmlContent={htmlContent}
            setHtmlContent={setHtmlContent}
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleSubmit}
            className="font-bold py-2 px-4 bg-white rounded shadow"
          >
            제출하기
          </button>
        </div>

        {response && (
          <div className="mt-4 p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">응답값</h2>
            <pre>감정 분석: {response.analysis}</pre>
          </div>
        )}
      </div>

      <>
        <div className="px-20 flex h-600 w-600 justify-center ">
          <TreeCanvas hp={90} day={1} widthRatio={3 / 5} />
        </div>
      </>
    </div>
  );
}
