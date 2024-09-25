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
  joy: number;
  sad: number;
  anxiety: number;
  angry: number;
  peace: number;
  tired: number;
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
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ entry: htmlContent }),
      });

      // 응답 상태 코드 확인
      if (!res.ok) {
        throw new Error("감정 분석 요청에 실패했습니다."); // API 요청 실패 시 에러 발생
      }

      // 응답 데이터 파싱
      const data: AnalyzeResponse = await res.json();
      setResponse(data); // 응답 저장
    } catch (error) {
      console.error("감정 분석 중 오류가 발생했습니다.", error);
      toast.error("감정 분석 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  // 오늘 날짜 가져오기
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
            <h2 className="text-2xl font-bold mb-2">감정 분석 결과</h2>
            <div className="space-y-2">
              <p>기쁨 (Joy): {response.joy}%</p>
              <p>슬픔 (Sad): {response.sad}%</p>
              <p>불안 (Anxiety): {response.anxiety}%</p>
              <p>화남 (Angry): {response.angry}%</p>
              <p>평온 (Peace): {response.peace}%</p>
              <p>피곤 (Tired): {response.tired}%</p>
            </div>
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
