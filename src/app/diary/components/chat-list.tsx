import { User, Message } from "@/app/diary/components/chat-bot-dialog";
import { formatDateToTime } from "@/utils/format-date-to-time";

import { useEffect, useRef } from "react";

interface ChatListProps {
  messages: Message[];
  me: User;
}

export default function ChatList({ messages, me }: ChatListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 메시지 목록이 업데이트될 때마다 scrollToBottom 함수를 호출
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 h-[40rem] py-4 overflow-y-auto">
      {messages.map((message) => {
        const isMyMessage = message.senderId === me.id;

        return (
          <div
            key={message.id}
            className={`flex ${isMyMessage ? "justify-end" : "justify-start"} gap-3`}
          >
            <div className="flex gap-10">
              {/* 메시지 전송 시간 */}
              <p className="text-sm text-gray-500 self-end">
                {formatDateToTime(message.createdAt)}
              </p>

              {/* 메시지 박스 */}
              <div
                className={`max-w-xs p-3 rounded-2xl ${
                  isMyMessage
                    ? "rounded-br-none bg-blue-200 text-white"
                    : "rounded-bl-none bg-gray-100 text-black"
                }`}
              >
                <p className="text-base">{message.text}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
