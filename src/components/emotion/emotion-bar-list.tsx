import { EMOTION_COLORS } from "@/constants/emotion-color";
import { EMOTION_LABEL } from "@/constants/emotion-label";
import { EmotionType } from "@/types/emotion";

// Emotion 타입 정의
export interface Emotion {
  label: string;
  percentage: number;
}

// EmotionBar 컴포넌트 타입 정의
interface EmotionBarProps {
  label: string;
  percentage: number;
  color: string;
}

function EmotionBar({ label, percentage, color }: EmotionBarProps) {
  return (
    <div className="w-160 h-30 flex flex-col gap-12 mb-4">
      <div className="flex justify-between items-center">
        <span className="text-20">{label}</span>
        <span className="text-20">{percentage}%</span>
      </div>
      <div className="w-full rounded-full h-4">
        <div
          className="h-4 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }} // 색상 코드 적용
        ></div>
      </div>
    </div>
  );
}

// EmotionBarList 컴포넌트 타입 정의
interface EmotionBarListProps {
  emotions: Record<EmotionType, number> | null;
  label: string;
}

export function EmotionBarList({ emotions, label }: EmotionBarListProps) {
  if (!emotions) return;
  return (
    <div className="h-300 flex gap-10 flex-col p-4 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-20 font-bold mb-6 text-center">{label}</h2>
      <div className="flex flex-col gap-10">
        {Object.keys(emotions).map((emotion) => (
          <EmotionBar
            key={emotion}
            label={EMOTION_LABEL[emotion as EmotionType]} // emotion을 EmotionType으로 단언
            percentage={emotions[emotion as EmotionType]} // emotion을 EmotionType으로 단언
            color={EMOTION_COLORS[emotion as EmotionType]} // emotion을 EmotionType으로 단언
          />
        ))}
      </div>
    </div>
  );
}
