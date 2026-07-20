/**
 * SponsorsSection — 協賛紹介
 * Design: エディトリアル — 罫線区切りの行リスト（イベント情報と同じ文法）。
 * ダーク背景はセクションのリズム（サンド⇄ダーク交互）を保つため維持。
 */
import { ArrowUpRight } from "lucide-react";

const GOLD = "oklch(0.80 0.16 85)"; // ダーク背景上のアクセント（他セクションと共通）

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
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="mb-12 reveal">
          <p
            className="text-xs font-bold tracking-[0.35em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Sponsors
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            協賛
          </h2>
        </div>

        {/* Sponsor rows — 行全体がリンク */}
        <div className="reveal">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 py-6 border-t border-white/15"
            >
              <div className="flex-1 min-w-0">
                <div className="text-lg md:text-xl font-bold text-white transition-colors group-hover:text-[oklch(0.80_0.16_85)]">
                  {sponsor.name}
                </div>
                <div className="mt-1 text-xs text-white/50">
                  {sponsor.description}
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-white/40 transition-all group-hover:text-[oklch(0.80_0.16_85)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
          <div className="border-t border-white/15" />
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
