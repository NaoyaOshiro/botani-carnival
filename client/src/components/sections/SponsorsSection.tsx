/**
 * SponsorsSection — 協賛紹介
 * Design: Tropical Fiesta — ジャングルダーク背景
 */
import { Card } from "@/components/ui/card";

const sponsors = [
  {
    id: 1,
    name: "スポンサー企業 A",
    url: "#",
    description: "植物・ガーデニング用品の総合メーカー",
  },
  {
    id: 2,
    name: "スポンサー企業 B",
    url: "#",
    description: "沖縄発の植物専門オンラインショップ",
  },
  {
    id: 3,
    name: "スポンサー企業 C",
    url: "#",
    description: "珍奇植物の輸入・卸売専門商社",
  },
];

export default function SponsorsSection() {
  return (
    <section
      id="sponsors"
      className="py-24 px-4"
      style={{ backgroundColor: "oklch(0.18 0.05 145)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-2xl">🤝</span>
            <span className="text-sm font-bold tracking-widest text-[oklch(0.80_0.16_85)] uppercase">Sponsors</span>
            <span className="text-2xl">🤝</span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            協賛
          </h2>
          <div className="w-16 h-1 bg-[oklch(0.80_0.16_85)] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="h-full bg-white/5 border-white/10 rounded-2xl p-8 text-center text-white gap-0 py-0 hover:bg-white/10 hover:-translate-y-1 transition-all duration-150">
                {/* Logo placeholder */}
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
                  style={{ backgroundColor: "oklch(0.30 0.08 145)" }}
                >
                  {sponsor.name.charAt(0)}
                </div>
                <div className="font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                  {sponsor.name}
                </div>
                <div className="text-white/50 text-sm leading-relaxed">
                  {sponsor.description}
                </div>
                <div className="mt-4 text-[oklch(0.80_0.16_85)] text-xs font-medium group-hover:underline">
                  ウェブサイトを見る →
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative mt-16 -mb-24 -mx-4">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px" }}>
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="oklch(0.96 0.03 85)" />
        </svg>
      </div>
    </section>
  );
}
