/**
 * Footer — BOTANI CARNIVAL
 * Design: Tropical Fiesta — ジャングルダーク背景
 */
import { asset } from "@/lib/asset";

export default function Footer() {
  return (
    <footer
      className="py-12 px-4 text-center"
      style={{ backgroundColor: "oklch(0.18 0.05 145)", color: "oklch(0.80 0.05 85)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src={asset("images/logo-event-144.png")}
            alt="BOTANI CARNIVAL"
            width={144}
            height={144}
            loading="lazy"
            /* 元画像は透過なし。濃緑背景で四隅の白が出るため円形にクリップする */
            className="w-12 h-12 object-contain rounded-full opacity-90"
          />
          <div className="text-left">
            <div className="font-display text-xl text-white">BOTANI CARNIVAL</div>
            <div className="text-xs opacity-70">珍奇植物市場 Vol.9</div>
          </div>
        </div>
        <p className="text-sm opacity-60 mb-2">
          2026年8月29日（土）・30日（日）11:00〜16:00
        </p>
        <p className="text-sm opacity-60 mb-6">西原さわふじ広場</p>
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs opacity-40">
            © 2026 BOTANI CARNIVAL / 珍奇植物市場 Vol.9. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
