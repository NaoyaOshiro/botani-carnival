/**
 * BoothMapSection — 出展ブース配置図（2日分）
 * Design: Tropical Fiesta — ジャングルダーク背景
 */
import { asset } from "@/lib/asset";
import { Separator } from "@/components/ui/separator";
import SectionHeading from "@/components/SectionHeading";

export default function BoothMapSection() {
  return (
    <section
      id="booth-map"
      className="py-24 px-4"
      style={{ backgroundColor: "oklch(0.18 0.05 145)" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading overline="Booth Map" title="出展ブース配置図" tone="dark" />

        {/* Day 1 */}
        <div className="mb-12 reveal">
          <div className="flex items-center gap-3 mb-5">
            {/*
              濃い背景上なので on-dark トークン（明度高め＋濃色文字）を使う。
              以前はここだけ 8/29 がオレンジで、他セクションの緑と食い違っていた。
            */}
            <div className="bg-[var(--day-1-on-dark)] text-[var(--day-on-dark-foreground)] font-bold px-5 py-2 rounded-full text-sm">
              8月29日（土）
            </div>
            <Separator className="flex-1 bg-white/20" />
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <img
              src={asset("images/booth-map.webp")}
              alt="8月29日（土）ブース配置図"
              loading="lazy"
              decoding="async"
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
            <div className="bg-[var(--day-2-on-dark)] text-[var(--day-on-dark-foreground)] font-bold px-5 py-2 rounded-full text-sm">
              8月30日（日）
            </div>
            <Separator className="flex-1 bg-white/20" />
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <img
              src={asset("images/booth-map.webp")}
              alt="8月30日（日）ブース配置図"
              loading="lazy"
              decoding="async"
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
      <div className="relative mt-16 -mb-24 -mx-4">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px" }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.96 0.03 85)" />
        </svg>
      </div>
    </section>
  );
}
