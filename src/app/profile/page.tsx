"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function ProfilePage(){
 const router=useRouter();const {data:session,isPending}=authClient.useSession();const [name,setName]=useState("");
 useEffect(()=>{if(session?.user?.name)setName(session.user.name);if(!isPending&&!session)router.replace("/signin");},[session,isPending,router]);
 async function update(e:React.FormEvent){e.preventDefault();const result=await authClient.updateUser({name});if(result.error)toast.error(result.error.message||"নাম আপডেট হয়নি");else toast.success("প্রোফাইল আপডেট হয়েছে");}
 if(isPending||!session)return <main className="p-12 text-center">লোড হচ্ছে…</main>;
 return <main className="mx-auto min-h-[60vh] max-w-xl px-4 py-12"><div className="rounded-3xl border border-stone-100 bg-white p-6 sm:p-8"><div className="text-4xl">👤</div><h1 className="mt-3 text-3xl font-black">আমার প্রোফাইল</h1><p className="mt-2 text-stone-500">{session.user.email}</p><form onSubmit={update} className="mt-7"><label className="block text-sm font-bold">নাম আপডেট করুন<input value={name} onChange={e=>setName(e.target.value)} required className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-market"/></label><button className="btn-primary mt-4 w-full">Update Information</button></form><Link href="/" className="mt-5 inline-block text-sm font-bold text-market">← হোম পেজে ফিরে যান</Link></div></main>;
}
