import { useAnalyzeEmotionMutation } from "@/api/diary/use-analyze-emotion-mutation";
import { usePostDiaryMutation } from "@/api/diary/use-post-diary-mutation";
import Button from "@/components/common/button";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function DiaryForm() {
  const [htmlContent, setHtmlContent] = useState<string>("");

  // 감정 분석 API 호출 훅
  const analyzeEmotionMutation = useAnalyzeEmotionMutation();
  // 일기 POST 요청 훅
  const postDiaryMutation = usePostDiaryMutation();

  const queryClient = useQueryClient();
  const searchParam = useSearchParams();
  const date = searchParam.get("date");

  // 일기 제출 버튼 클릭 시 호출되는 함수
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // 감정 분석 API 호출
    analyzeEmotionMutation.mutate(
      { entry: htmlContent },
      {
        onSuccess: (data) => {
          toast.success("감정 분석이 완료되었습니다.");
          const {
            joy_pct,
            sadness_pct,
            anxiety_pct,
            anger_pct,
            neutrality_pct,
            fatigue_pct,
          } = data;
          if (!date) return; // 감정 분석이 완료된 후, 일기 데이터를 서버에 전송
          postDiaryMutation.mutate(
            {
              date: date,
              content: htmlContent,
              emotionAnalysis: {
                joy_pct,
                sadness_pct,
                anxiety_pct,
                anger_pct,
                neutrality_pct,
                fatigue_pct,
              },
            },
            {
              onSuccess: () => {
                toast.success("일기가 성공적으로 저장되었습니다.");
                queryClient.invalidateQueries({ queryKey: ["diary"] });
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
        },
      },
    );
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col items-center gap-30"
    >
      <textarea
        className="p-20 w-800 h-300 text-20 resize-none rounded-10 shadow-lg leading-30 focus:outline-none"
        value={htmlContent}
        onChange={(e) => {
          setHtmlContent(e.target.value);
        }}
      />
      <div className="w-full flex justify-center">
        <Button disabled={analyzeEmotionMutation.isPending}>
          {analyzeEmotionMutation.isPending ? "저장 중..." : "저장하기"}
        </Button>
      </div>
    </form>
  );
}
