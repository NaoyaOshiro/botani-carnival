/**
 * ExhibitorsSection — 出店業者紹介（日別セクション）
 * Design: Tropical Fiesta — マーケット・ポスターボード感
 * データは client/src/data/exhibitors.ts（CSV由来）を参照。
 * カード: アイコン・屋号・Instagramリンク・商品画像カルーセル・説明文2行省略
 * タップ: カード→モーダル詳細表示 / Instagramアイコン→外部遷移
 */
import React, { useState, useRef } from "react";
import { asset } from "@/lib/asset";
import { exhibitors, type Exhibitor } from "@/data/exhibitors";

// 画像未設定時のプレースホルダー（正方形）
const noImage = asset("images/no_image_square.jpg");

const iconColors = [
  "oklch(0.42 0.16 145)", "oklch(0.65 0.18 55)", "oklch(0.55 0.22 0)",
  "oklch(0.50 0.18 220)", "oklch(0.55 0.15 300)", "oklch(0.45 0.20 170)",
  "oklch(0.65 0.15 30)", "oklch(0.40 0.18 120)",
];

// 文字列から安定した色インデックスを得る（アイコン未設定時のフォールバック用）
function hashIndex(s: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % mod;
}

// 商品画像のURL配列。未設定なら no_image を1枚返す。
function productImages(e: Exhibitor): string[] {
  if (e.slug && e.images.length > 0) {
    return e.images.map((f) => asset(`images/exhibitors/${e.slug}/${f}`));
  }
  return [noImage];
}

// アイコン画像のURL。未設定なら null（頭文字バッジにフォールバック）。
function iconSrc(e: Exhibitor): string | null {
  if (e.slug && e.icon) return asset(`images/exhibitors/${e.slug}/${e.icon}`);
  return null;
}

// InstagramのURL。ハンドルが無ければ null（リンク非表示）。
function instagramUrl(e: Exhibitor): string | null {
  return e.instagram ? `https://www.instagram.com/${e.instagram}/` : null;
}

const day1Exhibitors = exhibitors.filter((e) => e.days.includes(1));
const day2Exhibitors = exhibitors.filter((e) => e.days.includes(2));

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

function ModalCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { if (diff > 0) next(); else prev(); }
    touchStartX.current = null;
  };
  return (
    <div className="relative bg-[oklch(0.95_0.02_85)]" style={{ height: "200px" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <img
        src={images[idx]}
        alt={`商品${idx + 1}`}
        className="w-full h-full object-cover transition-opacity duration-200"
        onError={(e) => { (e.target as HTMLImageElement).src = noImage; }}
      />
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center text-lg hover:bg-black/60 transition-colors" aria-label="前の画像">‹</button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center text-lg hover:bg-black/60 transition-colors" aria-label="次の画像">›</button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full transition-colors" style={{ backgroundColor: i === idx ? "white" : "rgba(255,255,255,0.4)" }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ExhibitorCard({ exhibitor }: { exhibitor: Exhibitor }) {
  const images = productImages(exhibitor);
  const icon = iconSrc(exhibitor);
  const igUrl = instagramUrl(exhibitor);
  const igHandle = exhibitor.instagram ? `@${exhibitor.instagram}` : "";
  const bgColor = iconColors[hashIndex(exhibitor.instagram ?? exhibitor.name, iconColors.length)];
  const initial = exhibitor.name.charAt(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  };
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i + 1) % images.length);
  };
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setImgIndex((i) => (i + 1) % images.length);
      else setImgIndex((i) => (i - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  };

  return (
    <>
      {/* Card */}
      <div
        className="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-150 cursor-pointer border border-[oklch(0.90_0.04_85)] flex flex-col"
        onClick={() => setOpen(true)}
      >
        {/* 1. 商品画像カルーセル（正方形） */}
        <div
          className="relative overflow-hidden bg-[oklch(0.95_0.02_85)] aspect-square w-full"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <img
            src={images[imgIndex]}
            alt={`商品${imgIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-200"
            onError={(e) => { (e.target as HTMLImageElement).src = noImage; }}
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center text-xs hover:bg-black/60 transition-colors"
                aria-label="前の画像"
              >‹</button>
              <button
                onClick={nextImg}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center text-xs hover:bg-black/60 transition-colors"
                aria-label="次の画像"
              >›</button>
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    style={{ backgroundColor: idx === imgIndex ? "white" : "rgba(255,255,255,0.4)" }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* 2. アイコン + 屋号（ゴシック体） */}
        <div className="flex items-center gap-2 px-3 pt-3 pb-1">
          {icon ? (
            <img
              src={icon}
              alt={`${exhibitor.name} アイコン`}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-[oklch(0.90_0.04_85)]"
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: bgColor }}
            >
              {initial}
            </div>
          )}
          <div className="font-bold text-sm text-[oklch(0.12_0.02_145)] truncate flex-1">
            {exhibitor.name}
          </div>
        </div>

        {/* 3. 説明文（2行省略） */}
        <div className="px-3 py-1 min-h-[2.8rem]">
          <p className="text-xs text-[oklch(0.45_0.05_145)] leading-relaxed line-clamp-2">
            {exhibitor.description || " "}
          </p>
        </div>

        {/* 4. Instagramアイコン（左） */}
        <div className="flex items-center px-3 pb-3 pt-1 min-h-[2.5rem]">
          {igUrl && (
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-[oklch(0.95_0.02_85)] transition-colors"
              aria-label="Instagramを見る"
              style={{ color: "oklch(0.40 0.10 300)" }}
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center gap-3 p-4 border-b border-[oklch(0.92_0.02_85)]">
              {icon ? (
                <img
                  src={icon}
                  alt={`${exhibitor.name} アイコン`}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-[oklch(0.90_0.04_85)]"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ backgroundColor: bgColor }}
                >
                  {initial}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-base text-[oklch(0.18_0.05_145)]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                  {exhibitor.name}
                </div>
                {igHandle && (
                  <div className="text-xs text-[oklch(0.50_0.05_145)] mt-0.5 truncate">{igHandle}</div>
                )}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[oklch(0.50_0.05_145)] hover:bg-[oklch(0.95_0.02_85)] transition-colors text-lg"
                aria-label="閉じる"
              >×</button>
            </div>

            {/* Modal image carousel */}
            <ModalCarousel images={images} />

            {/* Modal body */}
            <div className="p-4">
              {exhibitor.description && (
                <p className="text-sm text-[oklch(0.35_0.05_145)] leading-relaxed mb-4 whitespace-pre-line">
                  {exhibitor.description}
                </p>
              )}
              {igUrl && (
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
                >
                  <InstagramIcon className="w-4 h-4" />
                  Instagramを見る（{igHandle}）
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
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
          <ExhibitorCard key={`${ex.instagram ?? ex.name}-${i}`} exhibitor={ex} />
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
