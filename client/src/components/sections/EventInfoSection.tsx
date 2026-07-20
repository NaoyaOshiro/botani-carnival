/**
 * EventInfoSection — イベント詳細情報
 * Design: Tropical Fiesta — サンドベース背景
 * Motifs: スタンプバッジ、バンティングフラッグ、葉シルエット
 */
import { asset } from "@/lib/asset";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function LeafDecor({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 110 C40 110 5 70 10 30 C15 -10 65 -10 70 30 C75 70 40 110 40 110Z" fill="currentColor" opacity="0.15" />
      <line x1="40" y1="110" x2="40" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="40" y1="80" x2="15" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <line x1="40" y1="60" x2="65" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.15" />
    </svg>
  );
}

function StampBadge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <Badge
      variant="outline"
      className="gap-2 px-5 py-2.5 rounded-full font-bold text-sm border-2 border-dashed bg-transparent"
      style={{ borderColor: color, color }}
    >
      {children}
    </Badge>
  );
}

function BuntingRow({ colors }: { colors: string[] }) {
  return (
    <div className="flex items-end justify-center w-full overflow-hidden py-1">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center" style={{ margin: "0 3px" }}>
          <div className="w-px bg-current opacity-30" style={{ height: "16px" }} />
          <svg width="18" height="22" viewBox="0 0 18 22" style={{ animationDelay: `${i * 0.15}s` }} className="animate-bunting">
            <polygon points="0,0 18,0 9,22" fill={colors[i % colors.length]} opacity="0.85" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function EventInfoSection() {
  const flagColors = ["#e74c3c", "#f39c12", "#27ae60", "#3498db", "#9b59b6", "#e67e22", "#1abc9c", "#e91e63"];

  return (
    <section id="event-info" className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: "oklch(0.96 0.03 85)" }}>
      {/* Leaf decorations */}
      <LeafDecor className="absolute -left-6 top-20 w-20 h-30 text-[oklch(0.42_0.16_145)] rotate-12" />
      <LeafDecor className="absolute -right-6 top-40 w-20 h-30 text-[oklch(0.42_0.16_145)] -rotate-12" />
      <LeafDecor className="absolute left-10 bottom-20 w-16 h-24 text-[oklch(0.72_0.18_55)] rotate-45" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <BuntingRow colors={flagColors} />
          <div className="mt-6 mb-3">
            <Badge
              className="font-display text-sm tracking-widest px-4 py-1 rounded-full text-white border-transparent"
              style={{ backgroundColor: "oklch(0.42 0.16 145)" }}
            >
              Event Info
            </Badge>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[oklch(0.18_0.05_145)]"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            イベント情報
          </h2>
          <div className="w-16 h-1 bg-[oklch(0.72_0.18_55)] mx-auto mt-4 rounded-full" />
        </div>

        {/* Main description */}
        <Card className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-10 reveal border-l-4 border-[oklch(0.42_0.16_145)] gap-0 py-0">
          <p className="text-lg md:text-xl text-[oklch(0.25_0.05_145)] leading-relaxed mb-6" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
            今年の珍奇植物市場は、いつもとはひと味違う。<br />
            会場全体が植物たちの<strong className="text-[oklch(0.42_0.16_145)]">カーニバル</strong>に──
          </p>
          <p className="text-base text-[oklch(0.35_0.05_145)] leading-relaxed mb-8">
            色鮮やかな装飾、フォトスポット、そして集まる珍奇植物たち。
            見て、出会って、お気に入りの一株を探す2日間。
            初心者の方からコレクターまで楽しめる、夏限定の植物イベントです。
          </p>
          <div className="flex flex-wrap gap-3">
            <StampBadge color="oklch(0.42 0.16 145)">🌵 珍奇植物大集合</StampBadge>
            <StampBadge color="oklch(0.65 0.18 55)">🚚 キッチンカーあり</StampBadge>
            <StampBadge color="oklch(0.55 0.22 0)">📸 フォトスポットあり</StampBadge>
            <StampBadge color="oklch(0.60 0.16 85)">🎉 入場無料</StampBadge>
          </div>
        </Card>

        {/* Info cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
          {/* Date */}
          <Card className="rounded-2xl p-6 shadow-lg text-center text-white relative overflow-hidden gap-0 py-0 border-0" style={{ backgroundColor: "oklch(0.42 0.16 145)" }}>
            <LeafDecor className="absolute -right-4 -bottom-4 w-20 h-28 text-white" />
            <div className="relative z-10">
              <div className="font-display font-bold mb-3 opacity-90" style={{fontSize: '30px'}}>Date</div>
              <div className="text-lg font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                2026年<br />
                8月29日（土）<br />
                8月30日（日）
              </div>
            </div>
          </Card>

          {/* Time */}
          <Card className="rounded-2xl p-6 shadow-lg text-center text-white relative overflow-hidden gap-0 py-0 border-0" style={{ backgroundColor: "oklch(0.65 0.18 55)" }}>
            <LeafDecor className="absolute -right-4 -bottom-4 w-20 h-28 text-white" />
            <div className="relative z-10">
              <div className="font-display font-bold mb-3 opacity-90" style={{fontSize: '30px'}}>Time</div>
              <div className="text-lg font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                11:00〜16:00<br />
                <span className="text-sm font-normal opacity-80">両日同じ時間</span>
              </div>
            </div>
          </Card>

          {/* Location */}
          <Card className="rounded-2xl p-6 shadow-lg text-center text-white relative overflow-hidden gap-0 py-0 border-0" style={{ backgroundColor: "oklch(0.55 0.22 0)" }}>
            <LeafDecor className="absolute -right-4 -bottom-4 w-20 h-28 text-white" />
            <div className="relative z-10">
              <div className="font-display font-bold mb-3 opacity-90" style={{fontSize: '30px'}}>Location</div>
              <div className="text-lg font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                西原さわふじ広場<br />
                <span className="text-sm font-normal opacity-80">（西原さわふじマルシェ）</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Kitchen car info */}
        <div className="mt-10 reveal">
          <Card className="rounded-3xl overflow-hidden shadow-xl flex-col md:flex-row items-stretch gap-0 py-0 border-0" style={{ backgroundColor: "oklch(0.18 0.05 145)" }}>
            <div className="md:w-1/2 h-52 md:h-auto overflow-hidden">
              <img
                src={asset("images/kitchen-car.webp")}
                alt="キッチンカー"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 text-white flex flex-col justify-center">
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                キッチンカーも出店！
              </h3>
              <p className="text-white/80 leading-relaxed text-sm mb-4">
                植物を楽しみながら、美味しいグルメも満喫できます。
                家族や友人と一緒に、一日中楽しめるイベントです。
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-white/10 border border-white/20 text-white/80 px-3 py-1 rounded-full text-xs">🍜 フード</span>
                <span className="bg-white/10 border border-white/20 text-white/80 px-3 py-1 rounded-full text-xs">🧃 ドリンク</span>
                <span className="bg-white/10 border border-white/20 text-white/80 px-3 py-1 rounded-full text-xs">🍦 スイーツ</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative mt-16 -mb-20 -mx-4">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px" }}>
          <path d="M0,20 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.18 0.05 145)" />
        </svg>
      </div>
    </section>
  );
}
