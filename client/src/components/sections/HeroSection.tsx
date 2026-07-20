/**
 * HeroSection — フライヤー画像のみ表示（レスポンシブ切り替え）
 * PC (md以上): 横長フライヤー（珍奇植物市場Vol9_PC.webp）を全幅表示
 * SP (md未満): 縦フライヤー（珍奇植物市場Vol9.jpg）を中央表示
 * Design: Tropical Fiesta
 */

function BuntingFlags({ count = 20, colors }: { count?: number; colors: string[] }) {
  return (
    <div className="flex items-end justify-center w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center" style={{ margin: "0 3px" }}>
          <div className="w-px bg-yellow-200/60" style={{ height: "16px" }} />
          <svg width="18" height="22" viewBox="0 0 18 22" className="animate-bunting" style={{ animationDelay: `${i * 0.2}s` }}>
            <polygon points="0,0 18,0 9,22" fill={colors[i % colors.length]} opacity="0.9" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const flagColors = ["#e74c3c", "#f39c12", "#27ae60", "#3498db", "#9b59b6", "#e67e22", "#1abc9c", "#e91e63"];

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-start overflow-hidden pt-16"
      style={{ backgroundColor: "oklch(0.18 0.05 145)" }}
    >
      {/* Bunting flags */}
      <div className="w-full px-4 py-2 z-10">
        <BuntingFlags count={20} colors={flagColors} />
      </div>

      {/* PC: 横長フライヤー（md以上で表示） */}
      <div className="hidden md:block w-full">
        <img
          src="/images/flyer_pc_72483ab8.webp"
          alt="BOTANI CARNIVAL 珍奇植物市場 Vol.9 フライヤー"
          className="w-full object-cover"
          style={{ display: "block" }}
        />
      </div>

      {/* SP: 縦フライヤー（md未満で表示） */}
      <div className="block md:hidden w-full flex justify-center px-4">
        <img
          src="/images/flyer_ec004d74.jpg"
          alt="BOTANI CARNIVAL 珍奇植物市場 Vol.9 フライヤー"
          className="w-full max-w-lg object-contain"
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
