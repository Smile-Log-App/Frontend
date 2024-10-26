import TreePage from "@/app/tree/tree-page";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <TreePage />
    </Suspense>
  );
}
