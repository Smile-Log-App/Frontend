"use client";
import { ResponseData, postDiary } from "@/api/postDiary";
import TreeCanvas from "@/components/tree/TreeCanvas";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
// TreeCanvas 컴포넌트 경로에 맞게 수정

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
    return storedHp ? parseInt(storedHp, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("treeHp", hp.toString());
  }, [hp]);

  const handleSubmit = async () => {
    const res = await postDiary(htmlContent);

    setResponse(res); // 전체 응답 객체 저장

    // 응답 값에서 필요한 데이터를 추출
    const newHp = res.document.confidence.positive * 0.1;
    setHp((prevHp) => prevHp + newHp); // hp 값을 상태로 설정

    setShowTree(true); // TreeCanvas를 보여주도록 설정
  };

  const handleResetHp = () => {
    setHp(0);
    localStorage.setItem("treeHp", "0");
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
          <TreeCanvas hp={hp} day={true} />
        </div>
      )}
    </div>
  );
}
