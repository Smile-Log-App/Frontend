import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/app/ReactQueryProvider";
import Navbar from "@/components/common/navbar";

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
          <Navbar />
          <div className="bg-blue-50 flex flex-col min-h-screen h-full w-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
