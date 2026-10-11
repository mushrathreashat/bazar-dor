"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProducts, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft } from "lucide-react";
const names: Record<string,string> = { chal:"চাল", dal:"ডাল", shobji:"সবজি", "mach-mangsho":"মাছ ও মাংস", tel:"তেল", moshla:"মসলা" };
function matchCategory(p: Product, slug: string) {
 const t=(p.name+" "+p.category).toLowerCase();
 if(slug==="chal") return /চাল|rice|chal/.test(t);
 if(slug==="dal") return /ডাল|dal|lentil|ছোলা/.test(t);
 if(slug==="shobji") return /সবজি|আলু|পেঁয়াজ|পেঁয়াজ|টমেটো|বেগুন|vegetable|potato|onion/.test(t);
 if(slug==="mach-mangsho") return /মাছ|মাংস|মুরগি|ইলিশ|fish|meat|chicken/.test(t);
 if(slug==="tel") return /তেল|oil/.test(t);
 if(slug==="moshla") return /মসলা|মরিচ|রসুন|আদা|spice|chili/.test(t);
 return false;
}
export default function CategoryPage() {
 const params=useParams<{slug:string}>(); const slug=decodeURIComponent(params.slug);
 const [products,setProducts]=useState<Product[]>([]); const [loading,setLoading]=useState(true); const [sort,setSort]=useState("default");
 useEffect(()=>{ getProducts().then(setProducts).finally(()=>setLoading(false)); },[]);
 const filtered=useMemo(()=>{const list=products.filter(p=>matchCategory(p,slug)); if(sort==="asc") list.sort((a,b)=>a.price-b.price); if(sort==="desc") list.sort((a,b)=>b.price-a.price); return list;},[products,slug,sort]);
 const valid=Boolean(names[slug]);
 return <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-10 sm:py-14"><Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-market"><ArrowLeft size={16}/> হোম পেজ</Link>
 <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-bold text-market">ক্যাটাগরি অনুযায়ী বাজারদর</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">{names[slug] || "ক্যাটাগরি পাওয়া যায়নি"}</h1><p className="mt-2 text-stone-500">এই বিভাগের পণ্যের দাম এক নজরে দেখুন।</p></div>{valid&&<label className="text-sm font-semibold text-stone-600">সাজান: <select value={sort} onChange={e=>setSort(e.target.value)} className="ml-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-ink outline-none focus:border-market"><option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select></label>}</div>
 {!valid?<div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-sm"><div className="text-5xl">🔎</div><h2 className="mt-4 text-2xl font-black">ক্যাটাগরি পাওয়া যায়নি</h2><Link href="/" className="btn-primary mt-5">হোম পেজে ফিরে যান</Link></div>:loading?<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{Array.from({length:8},(_,i)=><div key={i} className="h-60 skeleton"/>)}</div>:filtered.length?<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="mt-8 rounded-3xl border border-dashed p-10 text-center"><p className="text-lg font-bold">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p><Link href="/" className="btn-primary mt-5">হোম পেজে ফিরে যান</Link></div>}
 </main>;
}
