"use client";
import { ResponseData, postDiary } from "@/api/postDiary";
import TreeCanvas from "@/components/tree/TreeCanvas";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

const TextEditor = dynamic(() => import("@/components/Home/TextEditor"), {
  ssr: false,
});

export default function HomePage() {
  const quillRef = useRef<ReactQuill | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [response, setResponse] = useState<ResponseData>();
  const [showTree, setShowTree] = useState<boolean>(false);
  const [hp, setHp] = useState<number>(() => {
    const storedHp = localStorage.getItem("treeHp");
    return storedHp ? parseInt(storedHp, 10) : 50; // 기본 HP를 50으로 설정
  });
  const [day, setDay] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem("treeHp", hp.toString());
  }, [hp]);

  const handleSubmit = async () => {
    const res = await postDiary(htmlContent);
    setResponse(res); // 전체 응답 객체 저장

    // 감정 분석 결과에 따라 HP를 업데이트
    const sentimentEffect = calculateHpChange(res);
    setHp((prevHp) => Math.max(0, prevHp + sentimentEffect)); // HP가 0 미만으로 내려가지 않도록 설정

    setShowTree(true); // TreeCanvas를 보여주도록 설정
  };

  const calculateHpChange = (response: any) => {
    const { positive, negative } = response.document.confidence;
    // 긍정적인 영향은 긍정 점수에, 부정적인 영향은 부정 점수에 2를 곱하여 더 큰 영향을 줌
    return Math.floor(positive * 0.1 - negative * 0.1);
  };

  const handleResetHp = () => {
    setHp(50); // HP 초기화
    localStorage.setItem("treeHp", "50");
  };

  const toggleDayNight = () => {
    setDay((prevDay) => !prevDay);
    document.body.classList.toggle("black");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-30pxr">
      <h1 className="text-4xl font-bold mb-8 text-center">유담이의 일기</h1>

      <div className="mb-4 w-full">
        <TextEditor
          quillRef={quillRef}
          htmlContent={htmlContent}
          setHtmlContent={setHtmlContent}
        />
      </div>
      <div className="w-full flex justify-center">
        <button onClick={handleSubmit} className="font-bold py-2 px-4 rounded">
          제출하기
        </button>
        <button
          onClick={handleResetHp}
          className="font-bold py-2 px-4 rounded ml-4"
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
        <h2 className="text-2xl font-bold mb-2">나무 HP</h2>
        <pre>{hp}</pre>
      </div>

      {showTree && (
        <div className="mt-8 w-full flex justify-center">
          <TreeCanvas hp={hp} day={day} />
        </div>
      )}
    </div>
  );
}
