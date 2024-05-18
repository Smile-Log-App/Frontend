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
      <body className="align-center flex min-h-screen justify-center">
        <Providers>
          <div className="flex-column">
            <div className="pb-48pxr">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
