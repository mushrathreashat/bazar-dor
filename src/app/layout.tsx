import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = { title: "বাজার দর | BazarDor", description: "প্রয়োজনীয় পণ্যের দাম এক নজরে — বাজারদর জানুন, সচেতন থাকুন।" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bn"><body><Header/><Toaster position="top-right" toastOptions={{duration:3500}}/>{children}<footer className="mt-20 bg-ink text-white"><div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-9 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-black">🛒 বাজার দর</h2><p className="mt-1 text-sm text-stone-300">প্রয়োজনীয় পণ্যের দাম এক নজরে।</p></div><p className="max-w-md text-sm leading-6 text-stone-300">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p></div></footer></body></html>;
}
