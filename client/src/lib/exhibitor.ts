/**
 * 出店業者データの共通ヘルパー。
 * 出店紹介（一覧カード）とブースマップの両方から使う。
 */
import { asset } from "@/lib/asset";
import { exhibitors, type Exhibitor } from "@/data/exhibitors";

/** 画像未設定時のプレースホルダー（正方形） */
export const noImage = asset("images/no_image_square.jpg");

/** 商品画像のURL配列。未設定なら no_image を1枚返す。 */
export function productImages(e: Exhibitor): string[] {
  if (e.slug && e.images.length > 0) {
    return e.images.map((f) => asset(`images/exhibitors/${e.slug}/${f}`));
  }
  return [noImage];
}

/** アイコン画像のURL。未設定なら null。 */
export function iconSrc(e: Exhibitor): string | null {
  if (e.slug && e.icon) return asset(`images/exhibitors/${e.slug}/${e.icon}`);
  return null;
}

/** InstagramのURL。ハンドルが無ければ null（リンク非表示）。 */
export function instagramUrl(e: Exhibitor): string | null {
  return e.instagram ? `https://www.instagram.com/${e.instagram}/` : null;
}

/** 実体は index.css の日程カラートークン。各セクションで色がずれないよう一元化。 */
export const DAY1_COLOR = "var(--day-1)";
export const DAY2_COLOR = "var(--day-2)";
export const BOTH_COLOR = "var(--day-both)";

/** カードに出す日程バッジ。両日 / 片日 で色分けする。 */
export function dayBadge(e: Exhibitor): { text: string; color: string } {
  const d1 = e.days.includes(1);
  const d2 = e.days.includes(2);
  if (d1 && d2) return { text: "両日", color: BOTH_COLOR };
  if (d1) return { text: "8/29", color: DAY1_COLOR };
  return { text: "8/30", color: DAY2_COLOR };
}

/** Instagramハンドルから出店業者を引く。ブースマップの区画→業者の対応に使う。 */
const byHandle = new Map(
  exhibitors.filter((e) => e.instagram).map((e) => [e.instagram as string, e])
);

export function findByHandle(handle: string): Exhibitor | null {
  return byHandle.get(handle) ?? null;
}
