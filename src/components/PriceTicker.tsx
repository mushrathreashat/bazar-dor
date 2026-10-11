import type { Product } from "@/lib/products";
import { bnDigits } from "@/lib/products";
export default function PriceTicker({ products }: { products: Product[] }) {
  const items = products.slice(0, 12);
  if (!items.length) return <div className="bg-ink py-3 text-center text-sm text-white">📊 বাজারদর লোড হচ্ছে — কিছুক্ষণ পর আবার চেষ্টা করুন</div>;
  return <div className="ticker-wrap bg-ink py-3 text-white"><div className="ticker-track">{[...items,...items].map((p,i)=><span key={`${p.id}-${i}`} className="mx-7 inline-flex items-center gap-2 whitespace-nowrap text-sm"><span>{p.emoji}</span><b>{p.name}</b><span>{bnDigits(p.price)} টাকা</span><span className={p.change > 0 ? "text-lime-300" : p.change < 0 ? "text-rose-300" : "text-stone-300"}>{p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"} {bnDigits(Math.abs(p.change))}%</span></span>)}</div></div>;
}
