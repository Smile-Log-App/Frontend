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
      <body className=" min-h-screen w-screen ">
        <Providers>
          <div className="flex flex-col min-h-screen h-full w-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
