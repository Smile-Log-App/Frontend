import DialogDefault from "@/components/common/dialog";
import CloseIcon from "#/icons/ic-close.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import ChatInput from "@/app/diary/components/chat-input";

export default function ChatBotDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setInputValue("");
  };

  return (
    <DialogDefault isOpen={isOpen} onClose={onClose} overlay>
      <div className="bg-white w-400 h-500 rounded-20 ">
        <button
          className="flex w-full p-20 justify-end focus:outline-none"
          onClick={onClose}
        >
          <CloseIcon alt="닫기 아이콘" />
        </button>
        <form
          onSubmit={handleInputSubmit}
          className="absolute bottom-4 w-full max-w-md bg-gray-100 p-4 rounded-lg flex gap-2 items-center shadow"
        >
          <ChatInput
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onSubmit={handleInputSubmit}
          />
        </form>
      </div>
    </DialogDefault>
  );
}
