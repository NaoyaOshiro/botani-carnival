/**
 * BoothMapSection — 出展ブース配置図（2日分）
 * Design: エディトリアル — 罫線で日程を区切り、画像は figure + figcaption で置く。
 * 白枠カード（bg-white/5 + border + rounded）は持たない。
 */
import { asset } from "@/lib/asset";
import SectionHeading from "@/components/SectionHeading";

// 日程カラーは index.css のトークン。濃い背景なので on-dark 系を使う。
const days = [
  { label: "8月29日（土）", badge: "var(--day-1-on-dark)" },
  { label: "8月30日（日）", badge: "var(--day-2-on-dark)" },
];

export default function BoothMapSection() {
  return (
    <section
      id="booth-map"
      className="py-24 px-4"
      style={{ backgroundColor: "oklch(0.18 0.05 145)" }}
    >
      <div className="max-w-3xl mx-auto">
        <SectionHeading overline="Booth Map" title="ブースマップ" tone="dark">
          当日の各ブースの位置をご確認いただけます。
        </SectionHeading>

        <div className="reveal">
          {days.map((day) => (
            <figure key={day.label} className="border-t border-white/15 py-8">
              <div
                className="inline-block rounded-full px-4 py-1.5 text-xs font-bold"
                style={{
                  backgroundColor: day.badge,
                  color: "var(--day-on-dark-foreground)",
                }}
              >
                {day.label}
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl">
                <img
                  src={asset("images/booth-map.webp")}
                  alt={`${day.label}のブース配置図`}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-contain"
                  style={{ maxHeight: "500px" }}
                />
              </div>

              <figcaption className="mt-3 text-xs text-white/40">
                ※配置図は準備中です。公開まで今しばらくお待ちください。
              </figcaption>
            </figure>
          ))}
          <div className="border-t border-white/15" />
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative mt-16 -mb-24 -mx-4">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "60px" }}
          aria-hidden="true"
        >
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.96 0.03 85)" />
        </svg>
      </div>
    </section>
  );
}
