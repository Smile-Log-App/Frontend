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
    <div className="h-40 flex items-center mb-6">
      <Image src={src} alt={label} width={44} height={44} className="mr-2" />
      <span className="text-20 mr-4">{label}</span>
      <div className="flex-1 w-full h-4 rounded-full bg-gray-100 mr-4">
        <div
          className="h-4 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
      <span className="text-20">{percentage}%</span>
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
