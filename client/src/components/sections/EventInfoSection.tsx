/**
 * EventInfoSection — イベント詳細情報
 * Design: エディトリアル — タイポグラフィ主役のミニマル構成。
 * 大きな日付見出し + 定義リスト。装飾（バンティング・葉・色カード）は持たない。
 * SAT/SUN の色は出店業者一覧の日程フィルタ（緑=8/29 / 赤=8/30）と揃えている。
 */
import { asset } from "@/lib/asset";

const INK = "oklch(0.18 0.05 145)"; // 見出し・本文の濃緑
const MUTED = "oklch(0.50 0.05 145)"; // 補足テキスト
const LINE = "oklch(0.88 0.04 85)"; // 罫線
const DAY1_COLOR = "oklch(0.42 0.16 145)"; // 土 = 緑（出店業者フィルタと同色）
const DAY2_COLOR = "oklch(0.55 0.22 0)"; // 日 = 赤（同上）

// 定義リストの行データ
const details = [
  { label: "時間", value: "11:00 – 16:00", note: "両日共通" },
  { label: "場所", value: "西原さわふじ広場", note: "西原さわふじマルシェ" },
  { label: "入場", value: "無料", note: "どなたでもご来場いただけます" },
  { label: "グルメ", value: "キッチンカー出店", note: "フード・ドリンク・スイーツ" },
];

export default function EventInfoSection() {
  return (
    <section
      id="event-info"
      className="py-20 px-4"
      style={{ backgroundColor: "oklch(0.96 0.03 85)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="mb-12 reveal">
          <p
            className="text-xs font-bold tracking-[0.35em] uppercase mb-3"
            style={{ color: DAY1_COLOR }}
          >
            Event Info
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif JP', serif", color: INK }}
          >
            イベント情報
          </h2>
        </div>

        {/* Date — 大きなタイポグラフィ */}
        <div className="mb-12 reveal">
          <p className="text-sm tracking-[0.3em] mb-2" style={{ color: MUTED }}>
            2026
          </p>
          <p
            className="font-bold leading-none tracking-tight tabular-nums"
            style={{ color: INK, fontSize: "clamp(2.75rem, 9vw, 5.5rem)" }}
          >
            8.29
            <span className="text-[0.35em] font-bold align-middle ml-2 mr-4" style={{ color: DAY1_COLOR }}>
              SAT
            </span>
            <span style={{ color: LINE }}>—</span>
            <span className="ml-4">8.30</span>
            <span className="text-[0.35em] font-bold align-middle ml-2" style={{ color: DAY2_COLOR }}>
              SUN
            </span>
          </p>
        </div>

        {/* Lead copy */}
        <div className="mb-12 reveal">
          <p
            className="text-lg md:text-xl leading-relaxed mb-4"
            style={{ fontFamily: "'Noto Serif JP', serif", color: INK }}
          >
            今年の珍奇植物市場は、いつもとはひと味違う。
            <br />
            会場全体が植物たちのカーニバルに──
          </p>
          <p className="text-sm leading-relaxed max-w-prose" style={{ color: MUTED }}>
            色鮮やかな装飾、フォトスポット、そして集まる珍奇植物たち。
            見て、出会って、お気に入りの一株を探す2日間。
            初心者の方からコレクターまで楽しめる、夏限定の植物イベントです。
          </p>
        </div>

        {/* Details — 定義リスト */}
        <dl className="reveal">
          {details.map((d) => (
            <div
              key={d.label}
              className="grid grid-cols-[5rem_1fr] items-baseline gap-4 py-4 border-t"
              style={{ borderColor: LINE }}
            >
              <dt className="text-xs font-bold tracking-widest" style={{ color: MUTED }}>
                {d.label}
              </dt>
              <dd className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-base md:text-lg font-bold" style={{ color: INK }}>
                  {d.value}
                </span>
                <span className="text-xs" style={{ color: MUTED }}>
                  {d.note}
                </span>
              </dd>
            </div>
          ))}
          <div className="border-t" style={{ borderColor: LINE }} />
        </dl>

        {/* Kitchen car — 控えめな写真バナー */}
        <figure className="mt-12 reveal">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={asset("images/kitchen-car.webp")}
              alt="キッチンカー"
              className="w-full aspect-[21/9] object-cover"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-2 text-xs" style={{ color: MUTED }}>
            キッチンカーも出店。植物と一緒にグルメもお楽しみください。
          </figcaption>
        </figure>
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
