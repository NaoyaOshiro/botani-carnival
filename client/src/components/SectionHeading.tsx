/**
 * SectionHeading — 全セクション共通の見出し
 *
 * Design: エディトリアル — 左寄せの Overline（英字・広いトラッキング）＋ 明朝の日本語見出し。
 * 絵文字・中央寄せ・下線バーは持たない。
 *
 * 各セクションが見出しを個別に組んでいた結果、イベント情報／協賛だけが
 * エディトリアル調、他4つが旧スタイルという分裂が起きていたため共通化する。
 *
 * tone は背景の明暗。サンドベース上なら "light"、ジャングルダーク上なら "dark"。
 */
import type { ReactNode } from "react";

const INK = "oklch(0.18 0.05 145)";
const ACCENT_LIGHT = "oklch(0.42 0.16 145)"; // カーニバルグリーン
const ACCENT_DARK = "oklch(0.80 0.16 85)"; // ゴールド

export default function SectionHeading({
  overline,
  title,
  tone = "light",
  children,
}: {
  /** 英字のラベル（例: "Event Info"） */
  overline: string;
  /** 日本語見出し */
  title: string;
  tone?: "light" | "dark";
  /** 見出し直下の補足テキスト。無ければ省略可。 */
  children?: ReactNode;
}) {
  const isDark = tone === "dark";

  return (
    <div className="mb-12 reveal">
      <p
        className="font-display text-xs font-bold tracking-[0.35em] uppercase mb-3"
        style={{ color: isDark ? ACCENT_DARK : ACCENT_LIGHT }}
      >
        {overline}
      </p>
      <h2
        className="text-3xl md:text-4xl font-bold"
        style={{
          fontFamily: "'Noto Serif JP', serif",
          color: isDark ? "#fff" : INK,
        }}
      >
        {title}
      </h2>
      {children && (
        <div
          className="mt-4 text-sm leading-relaxed max-w-prose"
          style={{ color: isDark ? "rgba(255,255,255,0.55)" : "oklch(0.50 0.05 145)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
