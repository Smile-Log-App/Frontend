import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/app/ReactQueryProvider";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen justify-center items-center">
        <Providers>
          <div className="flex flex-col min-h-screen h-full w-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
