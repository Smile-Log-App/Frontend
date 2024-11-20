import SendIcon from "#/icons/ic-send.svg";
import { ChangeEvent, FormEvent, KeyboardEvent, useRef } from "react";

// ChatInput 컴포넌트
export default function ChatInput({
  inputValue,
  onInputChange,
  onSubmit,
}: {
  inputValue: string;
  onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // shift + enter로 줄 바꿈 기능
  const handleKeyDownShiftEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      onSubmit(e);
      resetTextAreaHeight();
    }
  };

  // textarea 높이 초기화
  const resetTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }
  };

  // textarea 높이 자동 조정
  const handleResizeTextAreaHeight = () => {
    if (!textAreaRef.current) return;
    resetTextAreaHeight();
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  return (
    <div className="relative items-center justify-center flex-1">
      <textarea
        ref={textAreaRef}
        rows={1}
        onKeyDown={handleKeyDownShiftEnter}
        placeholder="메시지"
        onChange={(e) => {
          onInputChange(e);
          handleResizeTextAreaHeight();
        }}
        value={inputValue}
        className="  py-10 text-30 w-full resize-none overflow-hidden border border-gray-300 rounded-20 pl-10 pr-40 text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      {inputValue && (
        <button
          type="submit"
          className="absolute right-3 top-[calc(50%-2px)] transform -translate-y-1/2 text-blue-500"
        >
          <SendIcon alt="보내기 아이콘" />
        </button>
      )}
    </div>
  );
}
