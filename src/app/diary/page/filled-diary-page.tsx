import { GetDailyDiaryRes } from "@/api/diary/use-get-daily-diary-query";
import ChatBotDialog from "@/app/diary/components/chat-bot-dialog";
import { EmotionBarList } from "@/components/emotion/emotion-bar-list";
import TreeCanvas from "@/components/tree/TreeCanvas";
import { removePctFromEmotionAnalysis } from "@/types/emotion";
import { formatDate } from "@/utils/get-today-date";
import { useState } from "react";
import CloseIcon from "#/icons/ic-close.svg";
import Image from "next/image";

interface DiaryContentPageProps {
  diary: GetDailyDiaryRes;
  userName: string;
  date: string | null;
  topThreeColors: string[];
}

export default function FilledDiaryPage({
  diary,
  userName,
  date,
  topThreeColors,
}: DiaryContentPageProps) {
  return (
    <div className="h-full flex items-center justify-center py-80 gap-60 text-30">
      <div className="flex flex-col items-center gap-30">
        <p className="text-30 text-black">{date && formatDate(date)}</p>
        <h1 className="text-40 text-black font-bold mb-8 text-center">
          {userName}의 일기
        </h1>
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-lg max-w-lg">
          <p className="text-20 mb-4 whitespace-pre-wrap leading-relaxed tracking-wide">
            {diary.content}
          </p>
        </div>
      </div>
      <div className="px-20 flex h-600 w-640 justify-center">
        <TreeCanvas
          colors={topThreeColors}
          hp={80}
          day={1}
          widthRatio={3 / 5}
        />
      </div>
      <div className="mt-4 rounded shadow">
        <EmotionBarList
          label="Today Feeling"
          emotions={removePctFromEmotionAnalysis(diary.emotionAnalysis)}
        />
        <ChatButton diaryContent={diary.content} />
      </div>
    </div>
  );
}

interface ChatButtonProps {
  diaryContent: string;
}

function ChatButton({ diaryContent }: ChatButtonProps) {
  const [isChatBotDialogOpen, setIsChatBotDialogOpen] = useState(false);

  const [isDetailOpen, setIsDetailOpen] = useState(true);
  const handleChatBotButtonClick = () => {
    setIsChatBotDialogOpen(true);
  };

  const handleClose = () => {
    setIsChatBotDialogOpen(false);
  };

  return (
    <div className="fixed bottom-80 right-80 flex flex-col items-end gap-4">
      <ChatBotDialog
        isOpen={isChatBotDialogOpen}
        onClose={handleClose}
        diary={diaryContent}
      />

      {/* 안내 메시지 박스 */}
      {isDetailOpen && (
        <div className="relative bg-white p-10  mr-4 rounded-lg shadow-lg border border-gray-200 text-gray-800 flex items-center w-320">
          <span className="text-gray-500 text-20">
            오늘의 감정을 챗봇과 함께 탐구해봐요
          </span>
          <button
            onClick={() => setIsDetailOpen(false)}
            className="absolute top-10 right-4"
          >
            <CloseIcon className=" text-gray-500" alt="닫기 아이콘" />
          </button>
        </div>
      )}

      {/* 챗봇 시작 버튼 */}
      <button
        onClick={handleChatBotButtonClick}
        className="bg-purple-500  flex items-center justify-center rounded-full shadow-lg"
      >
        <Image
          alt="챗봇 아이콘"
          src={"/images/chatbot.webp"}
          width={50}
          height={50}
          className="rounded-[20px]"
        />
      </button>
    </div>
  );
}
