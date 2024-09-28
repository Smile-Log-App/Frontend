"use client";
import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import toast from "react-hot-toast";
import { getTodayDate } from "@/utils/get-today-date";
import { useAnalyzeEmotionMutation } from "@/api/use-analyze-emotion-mutation";
import { EmotionBarList } from "@/components/calendar/EmotionBarList";
import { EmotionType } from "@/types/emotion";
import TreeCanvas from "@/components/tree/TreeCanvas";
import { usePostDiaryMutation } from "@/api/use-post-diary-mutation";
import { getTopThreeEmotionColors } from "@/utils/get-top-three-emotion-colors";

// // TextEditor 컴포넌트를 동적 로딩 (SSR을 사용하지 않음)
// const TextEditor = dynamic(() => import("@/components/diary/TextEditor"), {
//   ssr: false,
// });

export default function DiaryPage() {
  // ReactQuill 에디터를 참조하기 위한 ref 생성
  const quillRef = useRef<ReactQuill | null>(null);
  // 일기 내용을 저장할 상태
  const [htmlContent, setHtmlContent] = useState<string>("");
  // API 응답을 저장할 상태
  const [emotionAnalysisResult, setEmotionAnalysisResult] = useState<Record<
    EmotionType,
    number
  > | null>(null);

  // 감정 분석 API 호출 훅
  const analyzeEmotionMutation = useAnalyzeEmotionMutation();
  // 일기 POST 요청 훅
  const postDiaryMutation = usePostDiaryMutation();

  // 일기 제출 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    // 감정 분석 API 호출
    analyzeEmotionMutation.mutate(
      { entry: htmlContent },
      {
        onSuccess: (data) => {
          setEmotionAnalysisResult(data);
          toast.success("감정 분석이 완료되었습니다.");
          // 감정 분석이 완료된 후, 일기 데이터를 서버에 전송
          postDiaryMutation.mutate(
            {
              content: htmlContent,
              emotionAnalysis: {
                joy_pct: data.joy,
                sadness_pct: data.sadness,
                anxiety_pct: data.anxiety,
                anger_pct: data.anger,
                neutrality_pct: data.neutrality,
                fatigue_pct: data.fatigue,
              },
            },
            {
              onSuccess: () => {
                toast.success("일기가 성공적으로 저장되었습니다.");
              },
              onError: (error) => {
                console.error("일기 저장 중 오류가 발생했습니다.", error);
                toast.error(
                  "일기 저장 중 오류가 발생했습니다. 다시 시도해 주세요.",
                );
              },
            },
          );
        },
        onError: (error) => {
          console.error("감정 분석 중 오류가 발생했습니다.", error);
          toast.error("감정 분석 중 오류가 발생했습니다. 다시 시도해 주세요.");
          return;
        },
      },
    );
  };

  const todayDate = getTodayDate();
  // emotionAnalysisResult가 변경될 때만 topThreeColors를 계산
  const topThreeColors = useMemo(() => {
    return getTopThreeEmotionColors(emotionAnalysisResult);
  }, [emotionAnalysisResult]);

  return (
    <div className="h-full min-h-screen flex items-center justify-between px-40 text-30">
      <div className=" flex flex-col items-center gap-30">
        <p className="text-30">{todayDate}</p>
        <h1 className="text-40 font-bold mb-8 text-center">유담이의 일기</h1>
        {/* <div className="mb-4 w-600">
          <TextEditor
            quillRef={quillRef}
            htmlContent={htmlContent}
            setHtmlContent={setHtmlContent}
          />
        </div> */}
        <textarea
          className="w-600 h-200 text-20"
          value={htmlContent}
          onChange={(e) => {
            setHtmlContent(e.target.value);
          }}
        />
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

      {/* 감정 분석 결과를 EmotionBarList로 표시 */}
      {emotionAnalysisResult && (
        <>
          <div className="px-20 flex h-600 w-600 justify-center ">
            <TreeCanvas
              colors={topThreeColors}
              hp={90}
              day={1}
              widthRatio={3 / 5}
            />
          </div>
          <div className="mt-4 p-4 rounded shadow">
            <EmotionBarList emotions={emotionAnalysisResult} />
          </div>
        </>
      )}
    </div>
  );
}
