import DiaryPage from "@/app/diary/diary-page";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={null}>
      <DiaryPage />
    </Suspense>
  );
}
