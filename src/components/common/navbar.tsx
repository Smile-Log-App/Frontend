"use client";
import Link from "next/link";
import { useAuthGlobalAtom } from "@/app/store/auth.store";

export default function Navbar() {
  const [auth, setAuth] = useAuthGlobalAtom();
  const { isLoggedIn } = auth;

  const handleLogout = () => {
    setAuth({
      accessToken: "",
      isLoggedIn: false,
    });
  };
  return (
    <nav className="bg-white p-20 shadow-md border-solid border-1 border-gray-300">
      <div className="flex justify-between items-center">
        <Link href="/home" className="text-25 p-10 pl-30 font-bold">
          Smile Log
        </Link>
        <div className="flex gap-15 text-20 space-x-10">
          {isLoggedIn ? (
            <>
              <Link
                href="/diary"
                className="text-gray-700 hover:text-black-900"
              >
                일기
              </Link>
              <Link
                href="/calendar"
                className="text-gray-700 hover:text-black-900"
              >
                달력
              </Link>
              <Link
                href="/tree"
                className="text-gray-700 hover:text-black-900 pr-50"
              >
                나무
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-black-900 pr-50"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-black-900"
              >
                로그인
              </Link>
              <Link
                href="/sign-up"
                className="text-gray-700 hover:text-black-900"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
