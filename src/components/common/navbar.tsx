"use client";
import useGetUser from "@/api/user/getUserQuery";
import { useAuthGlobalAtom } from "@/app/store/auth.store";
import { formatDateToISO } from "@/utils/format-date";
import { getYearMonth } from "@/utils/get-year-and-month";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [auth, setAuth] = useAuthGlobalAtom();
  const { isLoggedIn } = auth;
  const { data: user } = useGetUser();

  const today = new Date();
  // 오늘 날짜를 'YYYY-MM-DD' 형식으로 포맷팅
  const todayDate = formatDateToISO(today);
  const { year, month } = getYearMonth(today);
  const router = useRouter();
  const handleLogout = () => {
    setAuth({
      accessToken: "",
      isLoggedIn: false,
    });
    router.push("/");
  };

  return (
    <nav className="bg-white px-20 py-20 relative  z-10 shadow-md border-solid border-1 border-gray-300">
      <div className="flex justify-between text-30 items-center">
        <Link href="/home" className="text-25 p-10 pl-30 font-bold">
          Smile Log
        </Link>
        <div className="flex gap-15 text-20 space-x-10 mr-40">
          {isLoggedIn ? (
            <>
              <Link
                href={`/diary?date=${todayDate}`} // 현재 날짜를 쿼리 파라미터로 추가
                className="text-gray-700 hover:text-black-900"
              >
                오늘의 일기
              </Link>
              <Link
                href={`/calendar`}
                className="text-gray-700 hover:text-black-900"
              >
                캘린더
              </Link>
              <Link
                href={`/tree?year=${year}&month=${month}`}
                className="text-gray-700 hover:text-black-900"
              >
                이 달의 나무
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
