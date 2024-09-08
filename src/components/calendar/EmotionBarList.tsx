import React from "react";

// Emotion 타입 정의
interface Emotion {
  label: string;
  percentage: number;
  color: string;
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
      <div className="w-full bg-gray-300 rounded-full h-4">
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
  emotions: Emotion[];
}

export function EmotionBarList({ emotions }: EmotionBarListProps) {
  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Today Feeling</h2>
      {emotions.map((emotion, index) => (
        <EmotionBar
          key={index}
          label={emotion.label}
          percentage={emotion.percentage}
          color={emotion.color}
        />
      ))}
    </div>
  );
}

// 감정 데이터
export const emotionsData: Emotion[] = [
  { label: "행복", percentage: 80, color: "#FFD700" }, // 노란색
  { label: "짜증", percentage: 40, color: "#FF4500" }, // 빨간색
  { label: "슬픔", percentage: 20, color: "#1E90FF" }, // 파란색
  { label: "우울", percentage: 50, color: "#6A5ACD" }, // 보라색
  { label: "화남", percentage: 10, color: "#FF0000" }, // 진한 빨간색
];
