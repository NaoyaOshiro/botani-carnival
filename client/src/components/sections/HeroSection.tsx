/**
 * HeroSection — フライヤー画像のみ表示（レスポンシブ切り替え）
 * PC (md以上): 横長フライヤー flyer-pc.jpg
 * SP (md未満): 縦フライヤー flyer-sp.jpg
 *
 * 切り替えは <picture> + <source media> で行う。
 * CSS（hidden md:block）で出し分けると display:none 側もダウンロードされ、
 * PC・SP 両方のフライヤーを取りに行ってしまうため。
 *
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
      {/*
        ページ内で唯一の h1。イベント名がドキュメント構造上どこにも
        存在しない状態だったため、視覚的には隠して見出しだけ与える。
      */}
      <h1 className="sr-only">
        BOTANI CARNIVAL 珍奇植物市場 Vol.9 — 2026年8月29日（土）・30日（日）西原さわふじ広場
      </h1>

      <picture className="block w-full">
        <source media="(min-width: 768px)" srcSet={asset("images/flyer-pc.jpg")} />
        <img
          src={asset("images/flyer-sp.jpg")}
          alt="BOTANI CARNIVAL 珍奇植物市場 Vol.9 フライヤー。2026年8月29日（土）・30日（日）11:00〜16:00、西原さわふじ広場にて開催。入場無料。"
          /* LCP要素。遅延させず優先的に取りに行かせる */
          fetchPriority="high"
          decoding="async"
          /*
            aspect比を先に確保して読み込み時のガタつき（CLS）を防ぐ。
            SPとPCで元画像の比率が違うので、ブレークポイントで切り替える。
          */
          className="block w-full object-cover aspect-[1054/1492] md:aspect-[1448/1086]"
        />
      </picture>

      {/* Wave divider */}
      <div className="w-full -mb-1">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "60px" }}
          aria-hidden="true"
        >
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,60 L0,60 Z" fill="oklch(0.96 0.03 85)" />
        </svg>
      </div>
    </section>
  );
}
