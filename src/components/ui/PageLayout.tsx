"use client";
import PlateEditorClient from "@/components/editor/PlateEditorClient";
import { useRouter } from "next/navigation";

type PageLayoutProps = {
  color: string;                    // Tailwind background color (e.g. "yellow-100")
  header: string;                   // Page header text
  plateEditorMode: "happy" | "sad"; // Mode passed down to PlateEditorClient
};

// Generic page wrapper for sentiment rewriting pages
// - Provides consistent layout, header, back button, and editor instance
export default function PageLayout({ color, header, plateEditorMode }: PageLayoutProps) {
  const router = useRouter();

  // Ensure color matches expected format (e.g., "yellow-100")
  if (!/^[a-z]+-\d{3}$/.test(color)) {
    throw new Error("Invalid color input");
  }

  return (
    <div className={`h-screen w-screen bg-${color} flex flex-col items-center justify-center`}>
      {/* Back button to homepage */}
      <button
        className="cursor-pointer absolute top-10 left-10 font-bold rounded-md border-2 border-black bg-white p-3"
        onClick={() => router.push("/")}
      >
        Back
      </button>

      <h1 className="text-4xl font-bold mb-40 -translate-y-20">{header}</h1>
      <div className="w-full max-w-2xl -translate-y-20">
        <PlateEditorClient mode={plateEditorMode} />
      </div>
    </div>
  );
}