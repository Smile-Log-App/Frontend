"use client";
import { formatDateToISO } from "@/utils/format-date";
import Link from "next/link";

export default function HomePage() {
  // 오늘 날짜를 'YYYY-MM-DD' 형식으로 포맷팅
  const todayDate = formatDateToISO(new Date());

  return (
    <>
      <div className="h-full w-screen min-h-screen flex flex-col items-center bg-blue-100 text-center gap-8 p-10">
        {/* Header */}
        <div className="flex flex-row items-center justify-center">
          <img
            src="/images/logo.png"
            alt="Smile Log Logo"
            className="w-300 h-300 mb-10"
          />
          <h1
            className="text-70 font-bold text-white"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            Smile Log :)
          </h1>
        </div>
        <h1 className="text-20 font-light text-grey mb-15">
          가족과 다투고, 일은 마음대로 안되고, 괜히 우울한 밤에 마음껏 감정을
          털어놓고 싶지만
        </h1>
        <h1 className="text-20 font-light text-grey mb-15">
          너무 늦은 시간이라 누군가에게 연락하지 못하고 망설인 적이 있나요?
        </h1>
        <h1 className="text-20 font-light text-gre mb-15">
          깊어지는 고민에도 높은 비용의 상담을 시작하기가 망설여졌다면 언제든
        </h1>
        <h1 className="text-20 font-light text-grey mb-110">
          가벼운 마음으로 시작할 수 있는{" "}
          <span className="text-30 text-blue-600"> 스마일리 </span>와
          얘기해보세요!
        </h1>

        <Link
          className="flex justify-center items-center mb-130 w-200 h-50 shadow-lg rounded-10 bg-white text-20"
          href={`/diary?date=${todayDate}`}
        >
          일기 쓰러가기
        </Link>

        <h1 className="text-30 font-light text-grey mb-130">
          저희 스마일로그는 다음과 같은 기능들을 제시합니다
        </h1>

        <div className="w-1000 h-200 grid grid-cols-3 gap-50 mb-400">
          <div className="w-300 h-400 bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-30 font-bold mb-40 mt-100">일기 작성</h2>
            <img src="/images/diaryIcon.png" className="w-100 h-100 ml-90" />
          </div>

          <div className="w-300 h-400 bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-30 font-bold mb-40 mt-100">AI 챗봇</h2>
            <img src="/images/chatbotIcon.png" className="w-100 h-100 ml-90" />
          </div>
          <div className="w-300 h-400 bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-30 font-bold mb-40 mt-100">나무 시각화</h2>
            <img
              src="/images/blackTreeIcon.png"
              className="w-100 h-100 ml-90"
            />
          </div>
        </div>

        <h1 className="text-30 font-light text-grey mb-30">
          저희 서비스 스마일로그를 사용할 수 있는 방법을
        </h1>
        <h1 className="text-30 font-light text-grey mb-130">
          자세하게 알려드릴게요 !
        </h1>

        {/* Steps and Description */}
        <div className="w-1000 h-200 grid grid-cols-2 gap-100 mb-300">
          <div className="w-450 h-400 bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-30 font-bold mb-40 mt-120">Step 1.</h2>
            <p className="text-lg mb-20">
              오늘 하루 있었던 일을 되돌아보며 작성하세요.
            </p>
            <p className="text-lg">
              내가 무슨 상황에서 어떤 감정을 느꼈는지 다시 생각해봅시다.
            </p>
          </div>
          <img
            src="/images/diary.png"
            alt="Emotion Tree Visualization"
            className="w-450 h-400 ml-0 rounded-10 shadow-lg"
          />
        </div>
        {/* Step 2 */}
        <div className="w-1000 h-200 grid grid-cols-2 gap-100 mt-50 mb-150">
          <div className="w-450 h-240 bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-30 font-bold mb-30 mt-20">Step 2.</h2>
            <p className="text-lg mb-20">
              저장하기를 누르면 AI가 일기를 분석해서
            </p>
            <p className="text-lg mb-20">오늘의 감정에 대해 알려줍니다.</p>
            <p className="text-lg mb-20">
              오늘의 감정에 따른 색이 반영된 나무가 자라나요.
            </p>
          </div>
          {/* <div className="bg-white p-6 shadow-lg rounded-10 items-center justify-center"> */}
          <img
            src="/images/tree1.png"
            alt="Emotion Tree Visualization"
            className="w-450 h-240 ml-0 rounded-10 shadow-lg"
          />
          {/* </div> */}
        </div>
        <div className="w-1000 h-200 grid grid-cols-2 gap-100 mt-50 mb-170">
          <div className="w-450 h-260 bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-30 font-bold mb-40 mt-40">Step 3.</h2>
            <p className="text-lg mb-20">
              달력 화면에는 이번 달 나의 감정들을 한 눈에 확인할 수 있어요 !
            </p>
            <p className="text-lg">
              이번 달 어떤 감정들이 크게 자리 잡았는지 통계도 볼 수 있답니다
            </p>
          </div>
          <img
            src="/images/calendar.png"
            alt="Emotion Tree Visualization"
            className="w-450 h-260 ml-0 rounded-10 shadow-lg"
          />
        </div>
        <div className="w-1000 h-200 grid grid-cols-2 gap-100 mt-50 mb-200">
          <div className="w-450 h-260 bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-30 font-bold mb-30 mt-20">Step 4.</h2>
            <p className="text-lg mb-20">
              선택한 날짜의 감정 분석 결과를 기반으로 챗봇과 대화할 수 있어요.
            </p>
            <p className="text-lg mb-20">
              챗봇은 작성된 일기의 주요 감정을 탐구하며,
              <br /> 감정의 원인과 영향을 질문을 통해 알아가도록 도와줍니다.
            </p>
          </div>
          <img
            src="/images/diaryRecord.png"
            alt="Chatbot Interaction Screen"
            className="w-450 h-260 ml-0 rounded-10 shadow-lg"
          />
        </div>
      </div>
    </>
  );
}
