import DialogDefault from "@/components/common/dialog";
import CloseIcon from "#/icons/ic-close.svg";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ChatList from "@/app/diary/components/chat-list";
import ChatInput from "@/app/diary/components/chat-input";
import { Message, useChatBotMutation } from "@/api/chat/use-chat-mutation";
import LoadingSpinner from "@/components/common/loading-spinner";

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
  const { mutate, isPending } = useChatBotMutation(); // 리액트 쿼리 훅 사용

  // 챗봇이 모달을 열 때 첫 메시지를 보내도록 설정
  useEffect(() => {
    if (messages.length === 0) {
      handleBotResponse(diary, true);
    }
  }, [messages.length]);

  // 입력 변경 핸들러
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  // 챗봇 응답 처리 함수
  const handleBotResponse = (userInput: string, isFirstRequest = false) => {
    const newUserMessage: Message = {
      id: String(messages.length),
      text: userInput,
      createdAt: new Date().toISOString(),
      isBot: false,
    };

    if (!isFirstRequest) {
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    }

    const updatedMessages = [...messages, newUserMessage];

    mutate(updatedMessages, {
      onSuccess: (botMessage) => {
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      },
      onError: (error) => {
        console.error("챗봇 응답 실패:", error);
      },
    });
  };

  // 메시지 제출 핸들러
  const handleInputSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    handleBotResponse(inputValue);
    setInputValue("");
  };

  return (
    <DialogDefault isOpen={isOpen} onClose={onClose} overlay>
      <div className="bg-white w-600 h-600 rounded-20 px-20 pb-10 flex flex-col gap-4">
        <button className="self-end mt-10 mr-[-10px]" onClick={onClose}>
          <CloseIcon alt="닫기 아이콘" />
        </button>

        {/* 채팅 리스트 */}
        <ChatList messages={messages} />

        {/* 로딩 스피너 표시 */}
        {isPending && (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        )}

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
