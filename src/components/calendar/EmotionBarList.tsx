import React from "react";

// Emotion 타입 정의
export interface Emotion {
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
