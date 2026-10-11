import Link from "next/link";
import type { Product } from "@/lib/products";
import { bnDigits } from "@/lib/products";
export default function ProductCard({ product }: { product: Product }) {
  const up = product.change > 0, down = product.change < 0;
  return <Link href={`/product/${encodeURIComponent(product.slug)}`} className="product-card group">
    <div className="flex items-start justify-between">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#f2f5e9] text-3xl">{product.emoji}</span>
      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${up ? "bg-green-50 text-green-700" : down ? "bg-red-50 text-red-600" : "bg-stone-100 text-stone-500"}`}>{up ? "▲" : down ? "▼" : "—"} {bnDigits(Math.abs(product.change))}%</span>
    </div>
    <div className="mt-4">
      <h3 className="text-lg font-extrabold group-hover:text-market">{product.name}</h3>
      <p className="mt-1 text-sm text-stone-500">{product.unit} · {product.category}</p>
    </div>
    <div className="mt-5 flex items-end justify-between border-t border-stone-100 pt-4">
      <div><p className="text-xs text-stone-500">আজকের দাম</p><p className="mt-1 text-xl font-black text-ink">{bnDigits(product.price)} <span className="text-sm font-semibold">টাকা</span></p></div>
      <span className="text-sm font-bold text-market">বিস্তারিত ↗</span>
    </div>
  </Link>;
}
