"use client";
import { ResponseData, postDiary } from "@/api/postDiary";
import TreeCanvas from "@/components/tree/TreeCanvas";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

// TextEditor 컴포넌트를 동적 로딩 (SSR을 사용하지 않음)
const TextEditor = dynamic(() => import("@/components/Home/TextEditor"), {
  ssr: false,
});

export default function HomePage() {
  // ReactQuill 에디터를 참조하기 위한 ref 생성
  const quillRef = useRef<ReactQuill | null>(null);
  // 일기 내용을 저장할 상태
  const [htmlContent, setHtmlContent] = useState<string>("");
  // API 응답을 저장할 상태
  const [response, setResponse] = useState<ResponseData>();
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
      setHp(parseInt(storedHp, 10));
    }
  }, []);

  // HP가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("treeHp", hp.toString());
  }, [hp]);

  // 일기 제출 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    const res = await postDiary(htmlContent);
    setResponse(res); // 전체 응답 객체 저장

    // 감정 분석 결과에 따라 HP를 업데이트
    const sentimentEffect = calculateHpChange(res);
    setHp((prevHp) => Math.max(0, prevHp + sentimentEffect)); // HP가 0 미만으로 내려가지 않도록 설정

    setShowTree(true); // TreeCanvas를 보여주도록 설정
  };

  // 감정 분석 결과를 기반으로 HP 변화를 계산하는 함수
  const calculateHpChange = (response: any) => {
    const { positive, negative } = response.document.confidence;
    // HP 변화량 계산 (긍정 - 부정) * 0.1
    return Math.floor(positive * 0.1 - negative * 0.1);
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
    <div className="h-full min-h-screen flex items-center bg-gray-100 gap-30 pr-40 text-30">
      <div className="w-2/4 flex flex-col items-center gap-30">
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
          <button
            onClick={handleResetHp}
            className="font-bold py-2 px-4 bg-white rounded shadow ml-4"
            style={{ marginLeft: "10px" }}
          >
            초기화하기
          </button>
        </div>
        <div>
          <button
            onClick={toggleDayNight}
            className="font-bold py-2 px-4 rounded"
            style={{ marginLeft: "10px" }}
          >
            {day ? "Night" : "Day"}
          </button>
        </div>

        {response && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-2">응답값</h2>
            <pre>감정: {response.document.sentiment}</pre>
            <pre>부정: {response.document.confidence.negative.toFixed(2)}%</pre>
            <pre>긍정: {response.document.confidence.positive.toFixed(2)}%</pre>
            <pre>중립: {response.document.confidence.neutral.toFixed(2)}%</pre>
          </div>
        )}
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-bold">나무 HP</h2>
          <pre>{hp}</pre>
        </div>
      </div>
      {showTree && (
        <div
          className="flex h-800 w-900 justify-center"
          style={{ backgroundColor: day ? "#ffffff" : "#000000" }}
        >
          <TreeCanvas hp={hp} day={day} />
        </div>
      )}
    </div>
  );
}
