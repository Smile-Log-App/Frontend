export default function HomePage() {
  return (
    <>
      <div className="h-full w-screen min-h-screen flex flex-col items-center bg-blue-100 text-center gap-8 p-10">
        {/* Header */}
        <div className="flex flex-col items-center">
          <img
            src="/path/to/logo.png"
            alt="Smile Log Logo"
            className="w-40 h-40 mb-30"
          />
          <h1 className="text-7xl font-bold mb-30">Smile Log :)</h1>
        </div>

        {/* Steps and Description */}
        <div className="w-900 h-200 max-w-4xl grid grid-cols-2 gap-50">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-4xl font-bold mb-20 mt-20">Step 1.</h2>
            <p className="text-lg mb-10">
              오늘 하루 있었던 일을 되돌아보며 작성하세요.
            </p>
            <p className="text-lg">
              내가 무슨 상황에서 어떤 감정을 느꼈는지 다시 생각해봅시다.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">유담이의 일기</h2>
          </div>
        </div>

        {/* Step 2 */}
        <div className="w-900 h-200 max-w-4xl grid grid-cols-2 gap-50 mt-50">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-20 mt-20">Step 2.</h2>
            <p className="text-lg mb-10">
              제출하기를 누르면 AI가 일기를 분석해서
            </p>
            <p className="text-lg mb-10">오늘의 감정에 대해 알려줍니다.</p>
            <p className="text-lg">
              오늘의 감정에 따른 색이 반영된 나무가 자라나요.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <img
              src="/path/to/tree-visual.png"
              alt="Emotion Tree Visualization"
              className="w-full h-40 object-contain"
            />
            <div className="text-lg mt-4">
              <strong>Today Feeling:</strong>
              <ul>
                <li>행복: 30%</li>
                <li>슬픔: 0%</li>
                <li>불안: 0%</li>
                <li>화남: 35%</li>
                <li>평온: 0%</li>
                <li>피곤: 35%</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-900 h-200 max-w-4xl grid grid-cols-2 gap-50 mt-50">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-4xl font-bold mb-20 mt-20">Step 3.</h2>
            <p className="text-lg mb-10">
              오늘 하루 있었던 일을 되돌아보며 작성하세요.
            </p>
            <p className="text-lg">
              내가 무슨 상황에서 어떤 감정을 느꼈는지 다시 생각해봅시다.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">유담이의 일기</h2>
          </div>
        </div>

        <div className="w-900 h-200 max-w-4xl grid grid-cols-2 gap-50 mt-50">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-4xl font-bold mb-20 mt-20">Step 4.</h2>
            <p className="text-lg mb-10">
              오늘 하루 있었던 일을 되돌아보며 작성하세요.
            </p>
            <p className="text-lg">
              내가 무슨 상황에서 어떤 감정을 느꼈는지 다시 생각해봅시다.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">유담이의 일기</h2>
          </div>
        </div>
      </div>
    </>
  );
}
