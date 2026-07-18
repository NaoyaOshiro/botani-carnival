/**
 * ExhibitorsSection — 出店業者紹介（日別セクション）
 * Design: Tropical Fiesta — マーケット・ポスターボード感
 * 各社：ロゴ、アイコン、屋号、カテゴリ、Instagramリンク、商品画像×2
 */
import React from "react";

type Category = "植物" | "植木鉢" | "雑貨" | "植物・植木鉢" | "植物・雑貨";

interface Exhibitor {
  id: number;
  name: string;
  category: Category;
  instagram: string;
  productImages: [string, string];
}

const plantImages = [
  "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&q=80",
  "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80",
  "https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=400&q=80",
  "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80",
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80",
  "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
];

const iconColors = [
  "oklch(0.42 0.16 145)", "oklch(0.65 0.18 55)", "oklch(0.55 0.22 0)",
  "oklch(0.50 0.18 220)", "oklch(0.55 0.15 300)", "oklch(0.45 0.20 170)",
  "oklch(0.65 0.15 30)", "oklch(0.40 0.18 120)",
];

const categories: Category[] = ["植物", "植木鉢", "雑貨", "植物・植木鉢", "植物・雑貨"];

const categoryConfig: Record<string, { label: string; bg: string; text: string; icon: string }> = {
  "植物": { label: "植物", bg: "oklch(0.88 0.12 145)", text: "oklch(0.25 0.12 145)", icon: "🌵" },
  "植木鉢": { label: "植木鉢", bg: "oklch(0.92 0.10 55)", text: "oklch(0.35 0.14 55)", icon: "🪴" },
  "雑貨": { label: "雑貨", bg: "oklch(0.92 0.08 300)", text: "oklch(0.35 0.12 300)", icon: "🎁" },
  "植物・植木鉢": { label: "植物・鉢", bg: "oklch(0.88 0.12 145)", text: "oklch(0.25 0.12 145)", icon: "🌿" },
  "植物・雑貨": { label: "植物・雑貨", bg: "oklch(0.92 0.08 0)", text: "oklch(0.40 0.15 0)", icon: "✨" },
};

function generateExhibitors(dayOffset: number): Exhibitor[] {
  const names = [
    "アガベ農園", "サボテン工房", "塊根植物店", "多肉の森", "ユーフォルビア屋",
    "グリーンマーケット", "植物雑貨店", "鉢のアトリエ", "珍奇植物専門店", "ボタニカルショップ",
    "熱帯植物園", "砂漠の植物屋", "葉っぱ工房", "根っこ農園", "花と緑の店",
    "植物と暮らす", "グリーンライフ", "ジャングルショップ", "多肉天国", "珍奇の森",
    "アロエ専門店", "コーデックス屋", "ハオルチア園", "リトープス農場", "ガステリア店",
    "セダム工房", "エケベリア農園", "アデニウム屋", "パキポジウム専門", "ディッキア農場",
  ];
  return names.map((name, i) => ({
    id: dayOffset * 100 + i,
    name,
    category: categories[(i + dayOffset) % categories.length],
    instagram: `https://www.instagram.com/botani_shop_${i + 1 + dayOffset * 30}/`,
    productImages: [
      plantImages[(i * 2 + dayOffset) % plantImages.length],
      plantImages[(i * 2 + 1 + dayOffset) % plantImages.length],
    ],
  }));
}

const day1Exhibitors = generateExhibitors(0);
const day2Exhibitors = generateExhibitors(1);

function ExhibitorCard({ exhibitor, boothNum }: { exhibitor: Exhibitor; boothNum: number }) {
  const bgColor = iconColors[exhibitor.id % iconColors.length];
  const initial = exhibitor.name.charAt(0);
  const cat = categoryConfig[exhibitor.category];

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-150 group border border-[oklch(0.90_0.04_85)]">
      {/* Booth number badge */}
      <div className="relative">
        <div className="grid grid-cols-2 h-28">
          <img
            src={exhibitor.productImages[0]}
            alt="商品1"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = "/manus-storage/section-plants_f29bcf52.jpg"; }}
          />
          <img
            src={exhibitor.productImages[1]}
            alt="商品2"
            className="w-full h-full object-cover border-l-2 border-white"
            onError={(e) => { (e.target as HTMLImageElement).src = "/manus-storage/section-plants_f29bcf52.jpg"; }}
          />
        </div>
        {/* Booth number */}
        <div
          className="absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
          style={{ backgroundColor: bgColor }}
        >
          {boothNum}
        </div>
        {/* Category badge */}
        <div
          className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ backgroundColor: cat.bg, color: cat.text }}
        >
          {cat.icon} {cat.label}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: bgColor }}
          >
            {initial}
          </div>
          <div className="font-bold text-sm text-[oklch(0.18_0.05_145)] truncate flex-1" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            {exhibitor.name}
          </div>
        </div>
        <a
          href={exhibitor.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium transition-colors"
          style={{ color: "oklch(0.50 0.15 300)" }}
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Instagram
        </a>
      </div>
    </div>
  );
}

function DaySection({ day, date, color, exhibitors, dayLabel }: {
  day: string;
  date: string;
  color: string;
  exhibitors: Exhibitor[];
  dayLabel: string;
}) {
  return (
    <div className="mb-20 reveal">
      {/* Day header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="text-white font-bold px-6 py-3 rounded-full text-base shadow-lg font-display"
          style={{ backgroundColor: color }}
        >
          {day}
        </div>
        <div>
          <div className="font-bold text-[oklch(0.18_0.05_145)] text-lg" style={{ fontFamily: "'Noto Serif JP', serif" }}>{date}</div>
          <div className="text-sm text-[oklch(0.50_0.05_145)]">{exhibitors.length}店舗出店予定</div>
        </div>
        <div className="flex-1 h-px" style={{ backgroundColor: `${color}50` }} />
        <div
          className="text-white text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: color, opacity: 0.7 }}
        >
          {dayLabel}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {exhibitors.map((ex, i) => (
          <ExhibitorCard key={ex.id} exhibitor={ex} boothNum={i + 1} />
        ))}
      </div>
    </div>
  );
}

export default function ExhibitorsSection() {
  return (
    <section id="exhibitors" className="py-24 px-4 relative overflow-hidden" style={{ backgroundColor: "oklch(0.96 0.03 85)" }}>
      {/* Background texture dots */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle, oklch(0.42 0.16 145) 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-2xl">🌿</span>
            <span
              className="font-display text-sm tracking-widest px-4 py-1 rounded-full text-white"
              style={{ backgroundColor: "oklch(0.42 0.16 145)" }}
            >
              Exhibitors
            </span>
            <span className="text-2xl">🌿</span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[oklch(0.18_0.05_145)]"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            出店業者紹介
          </h2>
          <div className="w-16 h-1 bg-[oklch(0.42_0.16_145)] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-[oklch(0.50_0.05_145)] text-sm">
            ※現在出店者情報を収集中です。随時更新予定です。
          </p>
        </div>

        <DaySection
          day="Day 1"
          date="8月29日（土）"
          color="oklch(0.42 0.16 145)"
          exhibitors={day1Exhibitors}
          dayLabel="1日目"
        />
        <DaySection
          day="Day 2"
          date="8月30日（日）"
          color="oklch(0.55 0.22 0)"
          exhibitors={day2Exhibitors}
          dayLabel="2日目"
        />
      </div>

      {/* Wave divider */}
      <div className="relative mt-8 -mb-24">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px" }}>
          <path d="M0,20 C480,60 960,0 1440,20 L1440,60 L0,60 Z" fill="oklch(0.18 0.05 145)" />
        </svg>
      </div>
    </section>
  );
}
