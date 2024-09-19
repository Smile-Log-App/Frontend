"use client";
import TreeCanvas from "@/components/tree/TreeCanvas";
import { useState } from "react";

export default function TreePage() {
  // 나무 HP를 저장할 상태 (기본 HP는 50으로 설정)
  const [hp, setHp] = useState<number>(50);
  // 낮/밤 모드를 저장할 상태
  const [day, setDay] = useState<boolean>(true);

  return (
    <div className="flex h-800 bg-white w-full justify-center">
      <TreeCanvas hp={hp} day={day} widthRatio={2 / 5} />
    </div>
  );
}
