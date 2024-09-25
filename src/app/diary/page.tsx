"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import TreeCanvas from "@/components/tree/TreeCanvas";

// TextEditor 컴포넌트를 동적 로딩 (SSR을 사용하지 않음)
const TextEditor = dynamic(() => import("@/components/diary/TextEditor"), {
  ssr: false,
});

interface AnalyzeResponse {
  analysis: string;
}

interface ErrorResponse {
  error: string;
}

export default function DiaryPage() {
  // ReactQuill 에디터를 참조하기 위한 ref 생성
  const quillRef = useRef<ReactQuill | null>(null);
  // 일기 내용을 저장할 상태
  const [htmlContent, setHtmlContent] = useState<string>("");
  // API 응답을 저장할 상태
  const [response, setResponse] = useState<AnalyzeResponse | null>(null);
  // TreeCanvas를 보여줄지 여부를 저장할 상태
  const [showTree, setShowTree] = useState<boolean>(false);
  // 나무 HP를 저장할 상태 (기본 HP는 50으로 설정)
  const [hp, setHp] = useState<number>(50);
  // 낮/밤 모드를 저장할 상태
  const [day, setDay] = useState<boolean>(true);

  // 클라이언트 사이드에서만 실행되도록 useEffect 내부에서 localStorage에 접근
  useEffect(() => {
    const storedHp = localStorage.getItem("treeHp");
    if (storedHp) {
      setHp(parseInt(storedHp, 50));
    }
  }, []);

  // HP가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("treeHp", hp.toString());
  }, [hp]);

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

      if (!response.ok) {
        throw new Error("감정 분석 요청에 실패했습니다.");
      }

      const data = (await response.json()) as AnalyzeResponse | ErrorResponse;

      if ("error" in data) {
        alert("감정 분석에 실패했습니다. 다시 시도해 주세요.");
      } else {
        setResponse(data); // 응답 저장
        setShowTree(true); // TreeCanvas를 보여주도록 설정
      }
    } catch (error) {
      console.error("감정 분석 중 오류가 발생했습니다.", error);
      alert("감정 분석 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  // HP를 초기화하는 함수
  const handleResetHp = () => {
    setHp(50); // HP 초기화
    localStorage.setItem("treeHp", "50");
  };

  // 낮/밤 모드를 토글하는 함수
  const toggleDayNight = () => {
    setDay((prevDay) => !prevDay);
    document.body.classList.toggle("black");
  };

  return (
    <div className="h-full min-h-screen flex items-center justify-between px-40 text-30">
      <div className=" flex flex-col items-center gap-30">
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
        {/* <div>
          <button
            onClick={toggleDayNight}
            className="font-bold py-2 px-4 rounded"
            style={{ marginLeft: "10px" }}
          >
            {day ? "Night" : "Day"}
          </button>
        </div> */}

        {response && (
          <div className="mt-4 p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">응답값</h2>
            <pre>감정 분석: {response.analysis}</pre>
          </div>
        )}
        {/* <div className="mt-4 p-4  rounded shadow">
          <h2 className="text-2xl font-bold">나무 HP</h2>
          <pre>{hp}</pre>
        </div> */}
      </div>
      {showTree && (
        <>
          <div className="px-20 flex h-800 w-700 justify-center ">
            <TreeCanvas hp={60} day={1} widthRatio={1 / 5} />
          </div>
        </>
      )}
    </div>
  );
}
