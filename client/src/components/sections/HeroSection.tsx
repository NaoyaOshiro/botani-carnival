/**
 * HeroSection — フライヤービジュアルをベースにしたフルスクリーンヒーロー
 * Design: Tropical Fiesta
 * Background: フライヤー画像 + 生成したヒーロー背景
 */
import { useEffect, useState } from "react";

// Bunting flag SVG component
function BuntingFlags({ count = 8, colors }: { count?: number; colors: string[] }) {
  return (
    <div className="flex items-end justify-center w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center" style={{ margin: "0 2px" }}>
          <div className="w-px bg-yellow-200/60" style={{ height: "20px" }} />
          <svg width="20" height="24" viewBox="0 0 20 24" className="animate-bunting" style={{ animationDelay: `${i * 0.2}s` }}>
            <polygon points="0,0 20,0 10,24" fill={colors[i % colors.length]} opacity="0.9" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const flagColors = ["#e74c3c", "#f39c12", "#27ae60", "#3498db", "#9b59b6", "#e67e22", "#1abc9c", "#e91e63"];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background: フライヤー画像 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/manus-storage/flyer_ec004d74.jpg')" }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Bunting flags top */}
      <div className="absolute top-16 left-0 right-0 z-10 px-4">
        <BuntingFlags count={16} colors={flagColors} />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 pt-24 pb-16 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="inline-block bg-black/30 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
          <span className="text-yellow-300 text-sm font-medium tracking-widest">珍奇植物市場 Vol.9</span>
        </div>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white mb-2 drop-shadow-2xl leading-none">
          BOTANI
        </h1>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white mb-6 drop-shadow-2xl leading-none">
          CARNIVAL
        </h1>

        <p
          className="text-xl md:text-2xl text-white/90 mb-2 drop-shadow"
          style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 700 }}
        >
          植物が主役の、真夏の祭典。
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 mb-10">
          <div className="bg-[oklch(0.72_0.18_55)] text-white rounded-full px-5 py-2 text-sm font-bold shadow-lg">
            2026年8月29日（土）・30日（日）
          </div>
          <div className="bg-[oklch(0.42_0.16_145)] text-white rounded-full px-5 py-2 text-sm font-bold shadow-lg">
            時間：11:00〜16:00
          </div>
          <div className="bg-[oklch(0.60_0.22_0)] text-white rounded-full px-5 py-2 text-sm font-bold shadow-lg">
            場所：西原さわふじ広場
          </div>
          <div className="bg-white text-[oklch(0.18_0.05_145)] rounded-full px-5 py-2 text-sm font-bold shadow-lg">
            🎉 入場無料
          </div>
        </div>

        <a
          href="#event-info"
          className="inline-block bg-[oklch(0.72_0.18_55)] hover:bg-[oklch(0.65_0.18_55)] text-white font-bold px-8 py-4 rounded-full text-lg shadow-xl transition-all duration-150 active:scale-95 hover:scale-105"
        >
          イベント詳細を見る ↓
        </a>
      </div>

      {/* Bottom bunting */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-2">
        <BuntingFlags count={20} colors={flagColors} />
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px" }}>
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,60 L0,60 Z" fill="oklch(0.96 0.03 85)" />
        </svg>
      </div>
    </section>
  );
}
