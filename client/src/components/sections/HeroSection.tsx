/**
 * HeroSection — フライヤー画像のみ表示（レスポンシブ切り替え）
 * PC (md以上): 横長フライヤー（珍奇植物市場Vol9_PC.webp）を全幅表示
 * SP (md未満): 縦フライヤー（珍奇植物市場Vol9.jpg）を中央表示
 * Design: Tropical Fiesta
 */
import { asset } from "@/lib/asset";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-start overflow-hidden pt-16"
      style={{ backgroundColor: "oklch(0.18 0.05 145)" }}
    >
      {/* PC: 横長フライヤー（md以上で表示） */}
      <div className="hidden md:block w-full">
        <img
          src={asset("images/flyer-pc.png")}
          alt="BOTANI CARNIVAL 珍奇植物市場 Vol.9 フライヤー"
          className="w-full object-cover"
          style={{ display: "block" }}
        />
      </div>

      {/* SP: 縦フライヤー（md未満で表示）。
          左右いっぱいに表示するため padding と max-width は付けない。 */}
      <div className="block md:hidden w-full">
        <img
          src={asset("images/flyer-sp.jpg")}
          alt="BOTANI CARNIVAL 珍奇植物市場 Vol.9 フライヤー"
          className="w-full object-contain"
          style={{ display: "block" }}
        />
      </div>

      {/* Wave divider */}
      <div className="w-full -mb-1">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px" }}>
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,60 L0,60 Z" fill="oklch(0.96 0.03 85)" />
        </svg>
      </div>
    </section>
  );
}
