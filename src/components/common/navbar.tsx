"use client";
import Link from "next/link";
import { useAuthGlobalAtom } from "@/app/store/auth.store";
import { formatDateToISO } from "@/utils/format-date";
import useGetUser from "@/api/user/getUserQuery";

export default function Navbar() {
  const [auth, setAuth] = useAuthGlobalAtom();
  const { isLoggedIn } = auth;
  const { data: user } = useGetUser();
  // 오늘 날짜를 'YYYY-MM-DD' 형식으로 포맷팅
  const todayDate = formatDateToISO(new Date());

  const handleLogout = () => {
    setAuth({
      accessToken: "",
      isLoggedIn: false,
    });
  };

  return (
    <nav className="bg-white p-20 relative  z-10 shadow-md border-solid border-1 border-gray-300">
      <div className="flex justify-between items-center">
        <Link href="/home" className="text-25 p-10 pl-30 font-bold">
          Smile Log
        </Link>
        <div className="flex gap-15 text-20 space-x-10">
          {isLoggedIn ? (
            <>
              <Link
                href={`/diary?date=${todayDate}`} // 현재 날짜를 쿼리 파라미터로 추가
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
              <Link href="/tree" className="text-gray-700 hover:text-black-900">
                나무
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-black-900 pr-50"
              >
                로그아웃
              </button>
              <p>{user?.username}님 안녕하세요!</p>
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
