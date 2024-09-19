import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="  bg-white p-10 shadow-md border-solid border-1 border-gray-300">
      <div className="flex justify-between items-center">
        <Link href="/home" className="text-25 p-20 pl-50 font-bold">
          Smile Log
        </Link>
        <div className="flex gap-15 text-20 space-x-10">
          <Link href="/diary" className="text-gray-700 hover:text-black-900">
            일기
          </Link>

          <Link
            className=" text-gray-700 hover:text-black-900"
            href="/calendar"
          >
            달력
          </Link>

          <Link
            className="text-gray-700 hover:text-black-900 pr-50"
            href="/tree"
          >
            나무
          </Link>
        </div>
      </div>
    </nav>
  );
}
