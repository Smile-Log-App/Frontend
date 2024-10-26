import DiaryPage from "@/app/diary/page/diary-page";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={null}>
      <DiaryPage />
    </Suspense>
  );
}
