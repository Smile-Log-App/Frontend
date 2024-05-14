// import quill & css
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMemo, memo, useRef } from "react";

// props 타입 정의
type TextEditorProps = {
  quillRef: React.MutableRefObject<ReactQuill | null>;
  htmlContent: string;
  setHtmlContent: (content: string) => void;
};

const TextEditor = memo(
  ({ quillRef, htmlContent, setHtmlContent }: TextEditorProps) => {
    const modules = useMemo(
      () => ({
        toolbar: {
          // 툴바에 넣을 기능
          container: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: ["small", false, "large", "huge"] }, { color: [] }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
              { align: [] },
            ],
          ],
        },
      }),
      []
    );

    return (
      <>
        <ReactQuill
          ref={(element) => {
            if (element !== null) {
              quillRef.current = element;
            }
          }}
          value={htmlContent}
          onChange={setHtmlContent}
          modules={modules}
          theme="snow"
          style={{ height: "85%", marginBottom: "6%" }} // style
        />
      </>
    );
  }
);

TextEditor.displayName = "TextEditor";

export default TextEditor;
