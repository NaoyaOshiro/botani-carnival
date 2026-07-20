/**
 * BoothMapSection — 出展ブース配置図（2日分）
 * Design: Tropical Fiesta — ジャングルダーク背景
 */
import { asset } from "@/lib/asset";

export default function BoothMapSection() {
  return (
    <section
      id="booth-map"
      className="py-24 px-4"
      style={{ backgroundColor: "oklch(0.18 0.05 145)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-2xl">🗺️</span>
            <span className="text-sm font-bold tracking-widest text-[oklch(0.80_0.16_85)] uppercase">Booth Map</span>
            <span className="text-2xl">🗺️</span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            出展ブース配置図
          </h2>
          <div className="w-16 h-1 bg-[oklch(0.80_0.16_85)] mx-auto mt-4 rounded-full" />
        </div>

        {/* Day 1 */}
        <div className="mb-12 reveal">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-[oklch(0.72_0.18_55)] text-white font-bold px-5 py-2 rounded-full text-sm">
              8月29日（土）
            </div>
            <div className="flex-1 h-px bg-white/20" />
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <img
              src={asset("images/booth-map-placeholder_3616fca9.jpg")}
              alt="8月29日（土）ブース配置図"
              className="w-full object-contain"
              style={{ maxHeight: "500px" }}
            />
            <div className="p-4 text-center">
              <p className="text-white/40 text-sm">※配置図は準備中です。公開まで今しばらくお待ちください。</p>
            </div>
          </div>
        </div>

        {/* Day 2 */}
        <div className="reveal">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-[oklch(0.60_0.22_0)] text-white font-bold px-5 py-2 rounded-full text-sm">
              8月30日（日）
            </div>
            <div className="flex-1 h-px bg-white/20" />
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <img
              src={asset("images/booth-map-placeholder_3616fca9.jpg")}
              alt="8月30日（日）ブース配置図"
              className="w-full object-contain"
              style={{ maxHeight: "500px" }}
            />
            <div className="p-4 text-center">
              <p className="text-white/40 text-sm">※配置図は準備中です。公開まで今しばらくお待ちください。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative mt-16 -mb-24">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px" }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.96 0.03 85)" />
        </svg>
      </div>
    </section>
  );
}
