import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="  bg-gray-100 p-30 shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/home" className="text-30 font-bold">
          Smile Log
        </Link>
        <div className="flex gap-15 text-30 space-x-8">
          <Link href="/diary" className="text-gray-700 hover:text-gray-900">
            일기
          </Link>

          <Link className=" text-gray-700 hover:text-gray-900" href="/calendar">
            달력
          </Link>

          <Link className="text-gray-700 hover:text-gray-900" href="/tree">
            나무
          </Link>
        </div>
      </div>
    </nav>
  );
}
