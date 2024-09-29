import Image from "next/image";

// 감정 아이템 컴포넌트
const EmotionItem = ({ src, label }: { src: string; label: string }) => (
  <div className="flex gap-10 items-center justify-center mb-6">
    <p className="ml-4 text-2xl">{label}</p>
    <Image src={src} alt={label} width={60} height={60} />
  </div>
);

// 감정 리스트 컴포넌트
const EmotionList = () => {
  return (
    <div className="flex flex-col h-600 w-200 p-8 rounded-2xl text-center">
      <h1 className="text-3xl font-bold mb-6">나의 감정</h1>
      <EmotionItem src="/images/emoji/joy.png" label="행복" />
      <EmotionItem src="/images/emoji/neutrality.png" label="평온" />
      <EmotionItem src="/images/emoji/sadness.png" label="슬픔" />
      <EmotionItem src="/images/emoji/anxiety.png" label="불안" />
      <EmotionItem src="/images/emoji/anger.png" label="화남" />
      <EmotionItem src="/images/emoji/fatigue.png" label="피곤" />
    </div>
  );
};

export default EmotionList;
