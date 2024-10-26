import { useEffect, useRef } from "react";
import { Message, User } from "types/ChatData";
import { formatDateToTime } from "util/formatDateToTime";
import findReplyTargetName from "util/findReplyTargetName";

interface ChatListProps {
  messages: Message[] | null;
  me: User;
}

function ChatList({ messages, me }: ChatListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const selectReplyMessage = (message: Message) => {
    console.log("Selected reply message:", message);
  };

  // 메시지 목록이 업데이트될 때마다 scrollToBottom 함수를 호출
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 h-[66rem] py-10 overflow-y-auto">
      {messages?.map((message, idx) => {
        const isSameTime =
          idx < messages.length - 1 &&
          formatDateToTime(message.createdAt) ===
            formatDateToTime(messages[idx + 1]?.createdAt);

        const isMyMessage = message.senderId === me.id;

        return (
          <div
            onClick={() => selectReplyMessage(message)}
            className={`flex ${isMyMessage ? "justify-end" : "justify-start"} gap-3`}
            key={message.id}
          >
            <div className="flex flex-col gap-2">
              {/* 메시지 시간이 동일하지 않으면 시간을 표시 */}
              {!isSameTime && (
                <p className="text-sm text-gray-500 self-end">
                  {formatDateToTime(message.createdAt)}
                </p>
              )}
              <div
                className={`max-w-xs p-3 rounded-2xl ${
                  isMyMessage
                    ? "rounded-br-none bg-blue-200 text-white"
                    : "rounded-bl-none bg-white border"
                } cursor-pointer`}
              >
                {message.replyTo && (
                  <div className="flex gap-2 mb-1 items-start">
                    <div className="w-1 h-16 bg-blue-500" />
                    <div>
                      <p className="text-blue-500 text-sm">
                        {findReplyTargetName(
                          messages[+message.replyTo - 1].senderId,
                        )}
                      </p>
                      <p className="text-black truncate text-sm">
                        {messages[+message.replyTo - 1].text}
                      </p>
                    </div>
                  </div>
                )}
                <p className="text-base">{message.text}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default ChatList;
