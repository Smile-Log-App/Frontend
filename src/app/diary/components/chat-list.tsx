import { Message } from "@/app/diary/components/chat-bot-dialog";
import { formatDateToTime } from "@/utils/format-date-to-time";
import { useEffect, useRef } from "react";

interface ChatListProps {
  messages: Message[];
}

export default function ChatList({ messages }: ChatListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 h-[40rem] py-4 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isBot ? "justify-start" : "justify-end"} gap-3`}
        >
          <div className="flex gap-10">
            {message.isBot || (
              <p className="text-sm text-gray-500 self-end">
                {formatDateToTime(message.createdAt)}
              </p>
            )}
            <div
              className={`max-w-xs px-8 py-4 rounded-2xl whitespace-pre-wrap word-breaks ${
                message.isBot
                  ? "rounded-bl-none bg-green-200 text-black"
                  : "rounded-br-none bg-blue-200 text-black"
              }`}
            >
              <p className="text-base text-20">{message.text}</p>
            </div>
            {message.isBot && (
              <p className="text-sm text-gray-500 self-end">
                {formatDateToTime(message.createdAt)}
              </p>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
