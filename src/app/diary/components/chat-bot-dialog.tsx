import DialogDefault from "@/components/common/dialog";
import CloseIcon from "#/icons/ic-close.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import ChatList from "@/app/diary/components/chat-list";
import ChatInput from "@/app/diary/components/chat-input";
// User 타입: 유저 ID와 사용자 이름을 포함
export interface User {
  id: string;
  username: string;
}

// Message 타입: 메시지 ID, 보낸 사람 ID, 텍스트, 전송 시간 및 답장 메시지의 ID 포함
export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
  replyTo: string | null; // 답장 메시지 ID, 없을 경우 null
}
const mockUser: User = { id: "1", username: "User1" }; // 예시 사용자 정보

export default function ChatBotDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  // 메시지 입력 변경 핸들러
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  // 메시지 제출 핸들러
  const handleInputSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 새 메시지를 생성하고 기존 메시지 리스트에 추가
    const newMessage: Message = {
      id: String(messages.length + 1),
      senderId: mockUser.id,
      text: inputValue,
      createdAt: new Date().toISOString(),
      replyTo: null,
    };
    setMessages([...messages, newMessage]);
    setInputValue(""); // 입력 필드 초기화
  };

  return (
    <DialogDefault isOpen={isOpen} onClose={onClose} overlay>
      <div className="bg-white w-600 h-600 rounded-20 p-4 flex flex-col gap-4">
        <button className="self-end focus:outline-none" onClick={onClose}>
          <CloseIcon alt="닫기 아이콘" />
        </button>

        {/* 채팅 리스트 */}
        <ChatList messages={messages} me={mockUser} />

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
