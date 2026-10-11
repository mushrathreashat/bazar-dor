export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  unit: string;
  price: number;
  change: number;
  emoji: string;
  description: string;
  markets: { name: string; price: number }[];
};

const emojiByName: Record<string, string> = {
  chal: "🍚", rice: "🍚", dal: "🫘", onion: "🧅", peyaj: "🧅", potato: "🥔",
  alu: "🥔", fish: "🐟", chicken: "🍗", egg: "🥚", tomato: "🍅", oil: "🫙",
  chili: "🌶️", garlic: "🧄", ginger: "🫚", milk: "🥛", default: "🛒"
};
const bnDigits = (value: number) => Math.round(value).toLocaleString("bn-BD");
function getEmoji(name: string, category: string) {
  const text = `${name} ${category}`.toLowerCase();
  const key = Object.keys(emojiByName).find(k => k !== "default" && text.includes(k));
  if (key) return emojiByName[key];
  if (/চাল/.test(text)) return "🍚";
  if (/ডাল|ছোলা/.test(text)) return "🫘";
  if (/পেঁয়াজ|পেঁয়াজ/.test(text)) return "🧅";
  if (/আলু/.test(text)) return "🥔";
  if (/মাছ|ইলিশ/.test(text)) return "🐟";
  if (/মুরগি|মাংস|চিকেন/.test(text)) return "🍗";
  if (/ডিম/.test(text)) return "🥚";
  if (/তেল/.test(text)) return "🫙";
  if (/মরিচ/.test(text)) return "🌶️";
  return emojiByName.default;
}
function numberFrom(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const western = value.replace(/[০-৯]/g, d => String("০১২৩৪৫৬৭৮৯".indexOf(d))).replace(/,/g, "");
    const found = western.match(/-?\d+(\.\d+)?/);
    if (found) return Number(found[0]);
  }
  return 0;
}
function first(obj: Record<string, unknown>, keys: string[], fallback: unknown = ""): unknown {
  for (const key of keys) if (obj[key] !== undefined && obj[key] !== null) return obj[key];
  return fallback;
}
export function normalizeProducts(raw: unknown): Product[] {
  let list: unknown = raw;
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>;
    list = o.data ?? o.products ?? o.result ?? o.items ?? raw;
    if (list && typeof list === "object" && !Array.isArray(list)) {
      const nested = list as Record<string, unknown>;
      list = nested.products ?? nested.items ?? nested.data ?? list;
    }
  }
  if (!Array.isArray(list)) return [];
  return list.map((item, index) => {
    const p = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
    const name = String(first(p, ["name", "productName", "title", "bn_name", "product_name"], `পণ্য ${index + 1}`));
    const category = String(first(p, ["category", "categoryName", "type", "category_name"], "অন্যান্য"));
    const price = numberFrom(first(p, ["price", "currentPrice", "todayPrice", "averagePrice", "current_price", "avg_price"], 0));
    const change = numberFrom(first(p, ["change", "percentageChange", "changePercent", "priceChange", "change_percentage"], 0));
    const rawId = String(first(p, ["id", "_id", "slug"], index + 1));
    const slug = String(first(p, ["slug"], name.toLowerCase().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}-]/gu, ""))) || rawId;
    const unit = String(first(p, ["unit", "measurement", "quantityUnit"], "প্রতি কেজি"));
    const description = String(first(p, ["description", "summary", "details"], `${name} এর আজকের বাজারদর এক নজরে দেখুন।`));
    const marketData = first(p, ["markets", "bazars", "marketPrices", "market_prices"], []);
    const markets = Array.isArray(marketData) ? marketData.map((m, i) => {
      const market = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
      return { name: String(first(market, ["name", "market", "bazaar", "bazarName"], `বাজার ${i + 1}`)), price: numberFrom(first(market, ["price", "currentPrice", "amount"], price)) };
    }) : [];
    return { id: rawId, name, slug, category, unit, price, change, emoji: getEmoji(name, category), description, markets: markets.length ? markets : [{name:"ঢাকা — গড় বাজারদর", price}] };
  });
}
export { bnDigits };
export async function getProducts(): Promise<Product[]> {
  const urls = [
    "https://openapi.programming-hero.com/api/bazardor/products",
    "https://api.api-store.workers.dev/api/bazardor/products",
    "https://api.abcz.workers.dev/api/bazardor/products"
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { next: { revalidate: 300 }, signal: AbortSignal.timeout(7000) });
      if (!res.ok) continue;
      const json: unknown = await res.json();
      const products = normalizeProducts(json);
      if (products.length) return products;
    } catch { /* try the next documented API base */ }
  }
  return [];
}
