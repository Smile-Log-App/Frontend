// import quill & css
"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMemo, memo, useRef } from "react";

// props 타입 정의
type TextEditorProps = {
  quillRef: React.MutableRefObject<ReactQuill | null>; // ReactQuill 에디터를 참조하기 위한 ref
  htmlContent: string; // 에디터에 입력된 HTML 콘텐츠
  setHtmlContent: (content: string) => void; // HTML 콘텐츠를 업데이트하는 함수
};

// 메모이제이션을 적용하여 불필요한 리렌더링 방지
const TextEditor = memo(
  ({ quillRef, htmlContent, setHtmlContent }: TextEditorProps) => {
    // useMemo를 사용하여 툴바 모듈 설정
    const modules = useMemo(
      () => ({
        toolbar: {
          // 툴바에 넣을 기능 설정
          container: [
            ["bold", "italic", "underline", "strike", "blockquote"], // 텍스트 스타일링
            [{ size: ["small", false, "large", "huge"] }, { color: [] }], // 텍스트 크기 및 색상
            [
              { list: "ordered" }, // 순서있는 목록
              { list: "bullet" }, // 순서없는 목록
              { indent: "-1" }, // 들여쓰기 감소
              { indent: "+1" }, // 들여쓰기 증가
              { align: [] }, // 텍스트 정렬
            ],
          ],
        },
      }),
      [], // 의존성 배열이 비어있어 한 번만 생성됨
    );

    return (
      <>
        <ReactQuill
          ref={(element) => {
            if (element !== null) {
              quillRef.current = element; // ReactQuill 에디터를 ref에 할당
            }
          }}
          value={htmlContent} // 에디터의 내용 설정
          onChange={setHtmlContent} // 에디터 내용이 변경될 때 호출되는 함수
          modules={modules} // 툴바 모듈 설정
          theme="snow" // Quill의 테마 설정
          style={{ height: "85%", marginBottom: "6%" }} // 스타일 설정
        />
      </>
    );
  },
);

// 컴포넌트의 displayName 설정
TextEditor.displayName = "TextEditor";

export default TextEditor;
