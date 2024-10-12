import Image from "next/image";
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
  src: string;
}

function EmotionBar({ label, percentage, color, src }: EmotionBarProps) {
  return (
    <div className="h-40 flex flex-col mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Image src={src} alt={label} width={44} height={44} />
          <span className="text-20">{label}</span>
        </div>
        <span className="text-20">{percentage}%</span>
      </div>
      <div className="w-full rounded-full h-4">
        <div
          className="h-4 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
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
  if (!emotions) return null;
  return (
    <div className="h-360 w-200 flex flex-col p-4 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-20 font-bold mb-6 text-center">{label}</h2>
      <div className="flex flex-col gap-10">
        {Object.keys(emotions).map((emotion) => (
          <EmotionBar
            key={emotion}
            label={EMOTION_LABEL[emotion as EmotionType]} // 감정 라벨
            percentage={emotions[emotion as EmotionType]} // 감정 퍼센트
            color={EMOTION_COLORS[emotion as EmotionType]} // 감정 색상
            src={`/images/emoji/${emotion}.png`} // 감정 아이콘 경로
          />
        ))}
      </div>
    </div>
  );
}

export default EmotionBarList;
