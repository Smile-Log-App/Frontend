import DialogDefault from "@/components/common/dialog";
import CloseIcon from "#/icons/ic-close.svg";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ChatList from "@/app/diary/components/chat-list";
import ChatInput from "@/app/diary/components/chat-input";
import axios from "axios";

// Message 타입 정의
export interface Message {
  id: string;
  text: string;
  createdAt: string;
  isBot: boolean;
}

export default function ChatBotDialog({
  isOpen,
  onClose,
  diary,
}: {
  isOpen: boolean;
  onClose: () => void;
  diary: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  // 챗봇이 모달을 열 때 첫 메시지를 보내도록 설정
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleBotResponse(diary);
    }
  }, [isOpen]);

  // 입력 변경 핸들러
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  // 챗봇 응답 처리 함수
  const handleBotResponse = async (userInput: string) => {
    try {
      const response = await axios.post("/api/chat", {
        messages: [{ text: userInput, isBot: false }],
      });

      const botMessage: Message = {
        id: String(messages.length),
        text: response.data.message,
        createdAt: new Date().toISOString(),
        isBot: true,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("챗봇 응답 실패:", error);
    }
  };

  // 메시지 제출 핸들러
  const handleInputSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: String(messages.length),
      text: inputValue,
      createdAt: new Date().toISOString(),
      isBot: false,
    };

    setMessages([...messages, newMessage]);
    setInputValue(""); // 입력 필드 초기화

    // 챗봇 응답 호출
    handleBotResponse(inputValue);
  };

  return (
    <DialogDefault isOpen={isOpen} onClose={onClose} overlay>
      <div className="bg-white w-600 h-600 rounded-20 px-20 pb-10 flex flex-col gap-4">
        <button className="self-end mt-10 mr-[-10px]" onClick={onClose}>
          <CloseIcon alt="닫기 아이콘" />
        </button>

        {/* 채팅 리스트 */}
        <ChatList messages={messages} />

        {/* 입력 폼 */}
        <ChatInput
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSubmit={handleInputSubmit}
        />
      </div>
    </DialogDefault>
  );
}
