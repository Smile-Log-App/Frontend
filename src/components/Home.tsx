// Home.tsx

import TextEditor from "components/TextEditor";
import { useState, useRef } from "react";
import ReactQuill from "react-quill";

export default function Home() {
  const quillRef = useRef<ReactQuill | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");

  const handleSubmit = () => {
    console.log("HtmlContent:", htmlContent);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">유담이의 일기</h1>

      <div className="mb-4 w-full">
        <TextEditor
          quillRef={quillRef}
          htmlContent={htmlContent}
          setHtmlContent={setHtmlContent}
        />
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          제출하기
        </button>
      </div>
    </div>
  );
}
