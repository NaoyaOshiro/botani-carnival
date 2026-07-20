/**
 * ContactSection — お問い合わせ（Instagram DM誘導）
 * Design: エディトリアル — 罫線区切りの行リスト（協賛と同じ文法）。
 * 以前は「プロフィールカード」と「DMボタン」で同じInstagramへの導線が
 * 二重にあったため、行全体をリンクにして1本化する。
 */
import { ArrowUpRight, Instagram } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const IG_URL = "https://www.instagram.com/tanikunchu/";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-4"
      style={{ backgroundColor: "oklch(0.18 0.05 145)" }}
    >
      <div className="max-w-3xl mx-auto">
        <SectionHeading overline="Contact" title="お問い合わせ" tone="dark">
          イベントに関するご質問・出店のご相談など、
          お気軽に主催者のInstagramまでDMをお送りください。
        </SectionHeading>

        <div className="reveal">
          {/* 行全体がリンク。タップ領域を大きく取るため py を厚めに。 */}
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border-t border-white/15 py-6"
          >
            {/* Instagramのブランドグラデーション。ダーク背景の中で導線を目立たせる。 */}
            <div
              className="flex size-12 flex-shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.60 0.22 0), oklch(0.55 0.18 300))",
              }}
            >
              <Instagram className="size-6 text-white" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-lg font-bold text-white transition-colors group-hover:text-[oklch(0.80_0.16_85)] md:text-xl">
                @tanikunchu
              </div>
              <div className="mt-1 text-xs text-white/50">
                BOTANI CARNIVAL 主催者 — InstagramでDMを送る
              </div>
            </div>

            <ArrowUpRight className="size-5 flex-shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[oklch(0.80_0.16_85)]" />
          </a>
          <div className="border-t border-white/15" />
        </div>

        <p className="mt-6 text-xs text-white/30">
          ※ お返事にはお時間をいただく場合がございます。ご了承ください。
        </p>
      </div>
    </section>
  );
}
