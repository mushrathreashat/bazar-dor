"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Suspense } from "react";
function SignInForm() {
 const router=useRouter(); const search=useSearchParams(); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [busy,setBusy]=useState(false);
 const callback=search.get("callbackURL") || "/";
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);try{const result=await authClient.signIn.email({email,password});if(result.error){toast.error(result.error.message||"লগইন করা যায়নি");return;}toast.success("সফলভাবে সাইন ইন হয়েছে");router.push(callback);}catch{toast.error("লগইন করা যায়নি। তথ্য যাচাই করুন।");}finally{setBusy(false);}}
 async function social(provider:"google"|"github"){try{await authClient.signIn.social({provider,callbackURL:callback});}catch{toast.error("সোশ্যাল লগইন সেটআপ করা নেই বা ব্যর্থ হয়েছে");}}
 return <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12"><div className="w-full rounded-3xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8"><div className="text-center"><div className="text-4xl">🛒</div><h1 className="mt-3 text-3xl font-black">আবার স্বাগতম!</h1><p className="mt-2 text-sm text-stone-500">আপনার বাজারদরের অ্যাকাউন্টে সাইন ইন করুন।</p></div><form onSubmit={submit} className="mt-7 space-y-4"><label className="block text-sm font-bold">ইমেইল<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-market" placeholder="name@example.com"/></label><label className="block text-sm font-bold">পাসওয়ার্ড<input required minLength={8} type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-market" placeholder="কমপক্ষে ৮ অক্ষর"/></label><button disabled={busy} className="btn-primary w-full disabled:opacity-60">{busy?"লগইন হচ্ছে…":"সাইন ইন"}</button></form><div className="my-5 flex items-center gap-3 text-xs text-stone-400"><span className="h-px flex-1 bg-stone-200"/>অথবা<span className="h-px flex-1 bg-stone-200"/></div><div className="grid grid-cols-2 gap-3"><button onClick={()=>social("google")} className="btn-outline">Google</button><button onClick={()=>social("github")} className="btn-outline">GitHub</button></div><p className="mt-6 text-center text-sm text-stone-500">অ্যাকাউন্ট নেই? <Link href="/signup" className="font-bold text-market">সাইন আপ করুন</Link></p></div></main>;
}
export default function SignInPage(){return <Suspense fallback={<main className="p-12 text-center">লোড হচ্ছে…</main>}><SignInForm/></Suspense>;}
