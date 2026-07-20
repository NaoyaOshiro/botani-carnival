/**
 * ContactSection — お問い合わせ（Instagram DM誘導）
 * Design: Tropical Fiesta — ジャングルダーク背景
 */
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-4"
      style={{ backgroundColor: "oklch(0.18 0.05 145)" }}
    >
      {/* 見出しは左寄せ（エディトリアル）、カードの中身は中央寄せのまま維持する */}
      <div className="max-w-2xl mx-auto">
        <SectionHeading overline="Contact" title="お問い合わせ" tone="dark" />

        <Card className="bg-white/5 border-white/10 rounded-3xl p-10 reveal gap-0 py-0 text-center">
          <p className="text-white/80 leading-relaxed mb-8 text-base">
            イベントに関するご質問・出店のご相談など、<br />
            お気軽に主催者のInstagramまでDMをお送りください。
          </p>

          {/* Instagram profile card */}
          <Card className="bg-white/10 rounded-2xl p-6 mb-8 flex-row items-center gap-4 text-left border-0">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.60 0.22 0), oklch(0.55 0.18 300))" }}
            >
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">@tanikunchu</div>
              <div className="text-white/50 text-sm">BOTANI CARNIVAL 主催者</div>
            </div>
          </Card>

          <Button
            asChild
            className="h-auto gap-3 bg-gradient-to-r from-[oklch(0.72_0.18_55)] via-[oklch(0.60_0.22_0)] to-[oklch(0.55_0.18_300)] text-white font-bold px-8 py-4 rounded-full text-base shadow-xl hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <a
              href="https://www.instagram.com/tanikunchu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="size-5" />
              Instagram DM
            </a>
          </Button>

          <p className="text-white/30 text-xs mt-6">
            ※ お返事にはお時間をいただく場合がございます。ご了承ください。
          </p>
        </Card>
      </div>
    </section>
  );
}

