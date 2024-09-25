"use client";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";

import { useAnalyzeEmotionMutation } from "@/api/use-analyze-emotion-mutation";
import { EmotionBarList } from "@/components/calendar/EmotionBarList";
import TreeCanvas from "@/components/tree/TreeCanvas";
import { EMOTION_COLORS } from "@/constants/emotion-color";
import { EmotionType } from "@/types/emotion";
import { getTodayDate } from "@/utils/get-today-date";
import toast from "react-hot-toast";

// TextEditor 컴포넌트를 동적 로딩 (SSR을 사용하지 않음)
const TextEditor = dynamic(() => import("@/components/diary/TextEditor"), {
  ssr: false,
});

export default function DiaryPage() {
  // ReactQuill 에디터를 참조하기 위한 ref 생성
  const quillRef = useRef<ReactQuill | null>(null);
  // 일기 내용을 저장할 상태
  const [htmlContent, setHtmlContent] = useState<string>("");
  // API 응답을 저장할 상태
  const [response, setResponse] = useState<Record<EmotionType, number> | null>(
    null,
  );

  // 감정 분석 API 호출 훅
  const analyzeEmotionMutation = useAnalyzeEmotionMutation();

  // 일기 제출 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    // 감정 분석 API 호출
    analyzeEmotionMutation.mutate(
      { entry: htmlContent },
      {
        onSuccess: (data) => {
          setResponse(data); // 성공 시 응답 저장
          toast.success("감정 분석이 완료되었습니다.");
        },
        onError: (error) => {
          console.error("감정 분석 중 오류가 발생했습니다.", error);
          toast.error("감정 분석 중 오류가 발생했습니다. 다시 시도해 주세요.");
        },
      },
    );
  };

  // 오늘 날짜 가져오기
  const todayDate = getTodayDate();

  // 상위 3개의 감정에 해당하는 색상과 비율을 함께 추출
  const [topThreeColors, topThreeRatios] = useMemo(() => {
    if (!response) return [[], []];

    // 응답 객체를 배열로 변환하고 퍼센트를 기준으로 정렬
    const sortedEmotions = Object.entries(response)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3); // 상위 3개의 감정만 추출

    // 상위 3개의 감정에 해당하는 색상 및 비율 추출
    const colors = sortedEmotions.map(
      ([emotion]) => EMOTION_COLORS[emotion as EmotionType],
    );
    const ratios = sortedEmotions.map(([, ratio]) => ratio / 100);

    return [colors, ratios];
  }, [response]);

  return (
    <div className="h-full min-h-screen flex items-center justify-between px-40 text-30">
      <div className=" flex flex-col items-center gap-30">
        <p className="text-30">{todayDate}</p>
        <h1 className="text-40 font-bold mb-8 text-center">유담이의 일기</h1>
        <div className="mb-4 w-600">
          <TextEditor
            quillRef={quillRef}
            htmlContent={htmlContent}
            setHtmlContent={setHtmlContent}
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleSubmit}
            className="font-bold py-2 px-4 bg-white rounded shadow"
            disabled={analyzeEmotionMutation.isPending}
          >
            {analyzeEmotionMutation.isPending ? "분석 중..." : "제출하기"}
          </button>
        </div>
      </div>

      <>
        <div className="px-20 flex h-600 w-600 justify-center ">
          <TreeCanvas
            colors={topThreeColors}
            hp={90}
            day={1}
            widthRatio={3 / 5}
            emotionRatios={topThreeRatios} // 비율 전달
          />
        </div>
      </>
      {/* 감정 분석 결과를 EmotionBarList로 표시 */}
      {response && (
        <div className="mt-4 p-4 rounded shadow">
          <EmotionBarList emotions={response} />
        </div>
      )}
    </div>
  );
}
