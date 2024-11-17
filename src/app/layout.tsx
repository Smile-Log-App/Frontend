import Providers from "@/app/ReactQueryProvider";
import Navbar from "@/components/common/navbar";
import { Provider as JotaiProvider } from "jotai";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { makePageMetadata } from "@/utils/make-page-metadata";

export const metadata: Metadata = {
  ...makePageMetadata({}),
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
          <JotaiProvider>
            <Toaster containerStyle={{ fontSize: "1rem", fontWeight: "600" }} />
            <Navbar />
            <div className="bg-blue-50 flex flex-col min-h-screen h-full w-screen">
              {children}
            </div>
          </JotaiProvider>
        </Providers>
      </body>
    </html>
  );
}
