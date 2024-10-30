import DialogDefault from "@/components/common/dialog";
import CloseIcon from "#/icons/ic-close.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import ChatList from "@/app/diary/components/chat-list";
import ChatInput from "@/app/diary/components/chat-input";
import axios from "axios";

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
}
const mockUser: User = { id: "1", username: "User1" }; // 예시 사용자 정보
const botUser: User = { id: "bot", username: "ChatBot" }; // 챗봇 정보

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

  const diary =
    "여기 다양한 감정이 혼합된 예시 일기를 작성해 드릴게요. 오늘은 기분이 참 묘하다. 아침에는 날씨가 너무 좋아서 기분이 상쾌했는데, 점심쯤 일이 갑자기 몰려와서 스트레스가 쌓였다. 평소엔 괜찮지만, 오늘은 이상하게 집중이 안 되고 머리도 지끈거렸다. 그 와중에 동료가 도움을 줘서 고마웠고, 덕분에 일이 좀 풀렸다. 하지만 오후 늦게 들어온 이메일 때문에 화가 났다. 내가 열심히 해온 일이 제대로 인정받지 못한 것 같아서 속상했다.퇴근 후에는 친구를 만나서 오랜만에 웃고 즐거웠지만, 집에 돌아오는 길에 왠지 모르게 공허한 기분이 들었다. 요즘 내가 잘하고 있는지, 그리고 앞으로 어떻게 해야 할지 고민도 많아졌다. 침대에 누워서 하루를 돌아보니 피곤이 몰려오지만, 동시에 내일은 좀 더 나은 하루가 되기를 바라게 된다.";
  // 챗봇 응답 처리 함수

  const handleBotResponse = async (userMessage: Message) => {
    try {
      const response = await axios.post("/api/chat", {
        entry: diary,
        messages, // 기존 대화 내용을 함께 전달
      });

      const botMessage: Message = {
        id: String(messages.length + 2),
        senderId: botUser.id,
        text: response.data.message,
        createdAt: new Date().toISOString(),
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

    // 새 메시지를 생성하고 기존 메시지 리스트에 추가
    const newMessage: Message = {
      id: String(messages.length + 1),
      senderId: mockUser.id,
      text: inputValue,
      createdAt: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInputValue(""); // 입력 필드 초기화

    // 챗봇 응답 호출
    handleBotResponse(newMessage);
  };

  return (
    <DialogDefault isOpen={isOpen} onClose={onClose} overlay>
      <div className="bg-white w-600 h-600 rounded-20 px-20 pb-10 flex flex-col gap-4">
        <button className="self-end mt-10 mr-[-10px] " onClick={onClose}>
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
