export default function HomePage() {
  return (
    <>
      <div className="h-full w-screen min-h-screen flex flex-col items-center bg-blue-100 text-center gap-8 p-10">
        {/* Header */}
        <div className="flex flex-row items-center justify-center">
          <img
            src="/images/스마일로그logo.png"
            alt="Smile Log Logo"
            className="w-300 h-300 mb-10"
          />
          <h1 className="text-60 font-bold text-white">Smile Log :)</h1>
        </div>

        {/* Steps and Description */}
        <div className="w-900 h-200 max-w-4xl grid grid-cols-2 gap-50">
          <div className="w-420 h-200 bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-30 font-bold mb-20 mt-20">Step 1.</h2>
            <p className="text-lg mb-10">
              오늘 하루 있었던 일을 되돌아보며 작성하세요.
            </p>
            <p className="text-lg">
              내가 무슨 상황에서 어떤 감정을 느꼈는지 다시 생각해봅시다.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-2xl font-bold mb-4">유담이의 일기</h2>
          </div>
        </div>

        {/* Step 2 */}
        <div className="w-900 h-200 max-w-4xl grid grid-cols-2 gap-50 mt-50">
          <div className="w-420 h-200 bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-30 font-bold mb-20 mt-20">Step 2.</h2>
            <p className="text-lg mb-10">
              제출하기를 누르면 AI가 일기를 분석해서
            </p>
            <p className="text-lg mb-10">오늘의 감정에 대해 알려줍니다.</p>
            <p className="text-lg">
              오늘의 감정에 따른 색이 반영된 나무가 자라나요.
            </p>
          </div>
          {/* <div className="bg-white p-6 shadow-lg rounded-10 items-center justify-center"> */}
          <img
            src="/images/tree1.png"
            alt="Emotion Tree Visualization"
            className="w-400 h-200 ml-10 rounded-10 shadow-lg"
          />
          {/* </div> */}
        </div>

        <div className="w-900 h-200 max-w-4xl grid grid-cols-2 gap-50 mt-50">
          <div className="bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-30 font-bold mb-20 mt-20">Step 3.</h2>
            <p className="text-lg mb-10">
              오늘 하루 있었던 일을 되돌아보며 작성하세요.
            </p>
            <p className="text-lg">
              내가 무슨 상황에서 어떤 감정을 느꼈는지 다시 생각해봅시다.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-2xl font-bold mb-4">유담이의 일기</h2>
          </div>
        </div>

        <div className="w-900 h-200 max-w-4xl grid grid-cols-2 gap-50 mt-50">
          <div className="bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-30 font-bold mb-20 mt-20">Step 4.</h2>
            <p className="text-lg mb-10">
              오늘 하루 있었던 일을 되돌아보며 작성하세요.
            </p>
            <p className="text-lg">
              내가 무슨 상황에서 어떤 감정을 느꼈는지 다시 생각해봅시다.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-10">
            <h2 className="text-2xl font-bold mb-4">유담이의 일기</h2>
          </div>
        </div>
      </div>
    </>
  );
}
