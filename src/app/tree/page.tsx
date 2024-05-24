import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TreeCanvas from "@/components/tree/TreeCanvas";

const DiaryPage = () => {
  const router = useRouter();

  const [diary, setDiary] = useState(null);
  const [hp, setHp] = useState(0);
  const [day, setDay] = useState(true);

  const toggleDay = () => {
    setDay(!day);
  };

  if (!diary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full h-full bg-[#f0eedd] overflow-hidden">
      <div className="absolute right-5 top-5">
        <button
          onClick={toggleDay}
          className={`cursor-pointer ${day ? "text-white" : ""}`}
        >
          <span className="text-4xl">{day ? "Night" : "Day"}</span>
        </button>
      </div>
      <div className="absolute left-5 top-5 flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={hp}
          onChange={(e) => setHp(parseInt(e.target.value))}
          id="hpSlider"
          className="mr-2"
        />
        <span id="hpValue" className="text-lg font-bold">
          {hp}
        </span>
      </div>
      <TreeCanvas hp={hp} day={day} />
    </div>
  );
};

export default DiaryPage;
