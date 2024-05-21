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
    <div>
      {/* <h1>{diary.title}</h1>
      <p>{diary.content}</p> */}
      <div>
        <button onClick={toggleDay}>{day ? "Night" : "Day"}</button>
        <input
          type="range"
          min="0"
          max="100"
          value={hp}
          onChange={(e) => setHp(parseInt(e.target.value))}
          id="hpSlider"
        />
        <span id="hpValue">{hp}</span>
      </div>
      <TreeCanvas hp={hp} day={day} />
    </div>
  );
};

export default DiaryPage;
