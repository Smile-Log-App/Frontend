"use client";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import axios from "axios";

const TextEditor = dynamic(() => import("@/components/Home/TextEditor"), {
  ssr: false,
});

export default function HomePage() {
  const quillRef = useRef<ReactQuill | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3001/diary", {
        content: htmlContent,
      });
      console.log("Response from server:", res.data);
      setResponse(JSON.stringify(res.data, null, 2)); // 응답 데이터를 보기 쉽게 JSON 문자열로 변환
    } catch (error) {
      console.error("Error submitting diary entry:", error);
      setResponse("Error submitting diary entry. Please try again.");
    }
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
      </div>

      {response && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-2">응답값</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}
