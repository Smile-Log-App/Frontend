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
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <span className="text-lg">{label}</span>
        <span className="text-sm">{percentage}%</span>
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
    <div className=" p-4 bg-blue-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{label}</h2>
      {Object.keys(emotions).map((emotion) => (
        <EmotionBar
          key={emotion}
          label={EMOTION_LABEL[emotion as EmotionType]} // emotion을 EmotionType으로 단언
          percentage={emotions[emotion as EmotionType]} // emotion을 EmotionType으로 단언
          color={EMOTION_COLORS[emotion as EmotionType]} // emotion을 EmotionType으로 단언
        />
      ))}
    </div>
  );
}
