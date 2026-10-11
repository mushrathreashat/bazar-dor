"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LogIn, ShoppingBasket } from "lucide-react";

const categories = [
  { label: "সব পণ্য", href: "/#সব-পণ্য" },
  { label: "চাল", href: "/category/chal" },
  { label: "ডাল", href: "/category/dal" },
  { label: "সবজি", href: "/category/shobji" },
  { label: "মাছ ও মাংস", href: "/category/mach-mangsho" }
];
export default function Header() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  return <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
      <Link href="/" className="flex items-center gap-2">
        <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white"><Image src="/images/bazar-logo.jpg" alt="বাজার দর লোগো" fill sizes="44px" className="object-contain" priority /></span>
        <span><strong className="block text-xl font-black tracking-tight">বাজার দর</strong><small className="text-xs text-stone-500">{new Date().toLocaleDateString("bn-BD",{weekday:"long",day:"numeric",month:"long"})}</small></span>
      </Link>
      <div className="flex items-center gap-2">
        {session?.user ? <>
          <Link href="/profile" className="hidden rounded-full border px-3 py-2 text-sm sm:block">{session.user.name || "আমার প্রোফাইল"}</Link>
          <button className="btn-outline" onClick={async()=>{await authClient.signOut(); window.location.href="/";}}>সাইন আউট</button>
        </> : <>
          <Link href="/signin" className="hidden items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold sm:flex"><LogIn size={16}/> সাইন ইন</Link>
          <Link href="/signup" className="btn-primary text-sm">সাইন আপ</Link>
        </>}
      </div>
    </div>
    <nav className="scrollbar-hide mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3">
      {categories.map(c => <Link key={c.href} href={c.href} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${pathname === c.href ? "bg-market text-white" : "bg-stone-100 text-stone-700 hover:bg-green-50 hover:text-market"}`}>{c.label}</Link>)}
    </nav>
  </header>;
}
