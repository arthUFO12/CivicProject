"use client";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-pink-200 flex flex-col justify-center items-center ">
      <h1 className="text-4xl font-bold text-center -translate-y-30">Select Your Rewriter</h1>
      <div className="flex items-center justify-center space-x-10 w-full">
        <button className="cursor-pointer flex-1 rounded-md border-3 border-black bg-yellow-100 px-10 py-6 font-bold text-xl max-w-xs" onClick={() => router.push("/happy")}>
          Go to Happy Rewriter
        </button>
        <button className="cursor-pointer flex-1 rounded-md border-3 border-black bg-blue-100 px-10 py-6 font-bold text-xl max-w-xs" onClick={() => router.push("/sad")}>
          Go to Sad Rewriter
        </button>
      </div>
    </div>
  )
}