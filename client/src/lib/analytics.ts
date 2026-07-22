/**
 * GA4 カスタムイベントの送信を1か所にまとめる。
 *
 * gtag() は index.html のスニペットが window に生やす。広告ブロッカーや
 * 開発時の未ロードなどで gtag が無いこともあるので、その場合は握りつぶす
 * （計測できないだけで、サイトの動作には一切影響させない）。
 *
 * ■ 送っているイベント（GA4管理画面で「カスタムディメンション」に登録すると
 *   パラメータ別に集計できる。登録しないと数は溜まるが内訳が見えない）
 *   - select_exhibitor : 出店者の詳細を開いた（exhibitor_name / exhibitor_id / open_source / day）
 *   - click_instagram  : Instagramボタンを押した（exhibitor_name / exhibitor_id / link_source）
 *   - view_section     : セクションが画面に入った（section_id / section_name）
 */

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

/** 詳細を開いた導線。一覧のカード経由か、ブースマップ経由か。 */
export type OpenSource = "list" | "booth_map";

/** Instagramボタンの設置場所。カードのアイコンか、詳細ダイアログのボタンか。 */
export type LinkSource = "card" | "dialog";

/**
 * 出店日の配列を集計用の文字列にする。
 * [1] → "day1", [2] → "day2", [1,2] → "both"
 */
export function dayKey(days: number[]): string {
  const d1 = days.includes(1);
  const d2 = days.includes(2);
  if (d1 && d2) return "both";
  if (d1) return "day1";
  if (d2) return "day2";
  return "unknown";
}

/** 出店者の詳細ダイアログを開いたとき。 */
export function trackSelectExhibitor(args: {
  name: string;
  handle: string | null;
  source: OpenSource;
  /** どの日程の文脈で開いたか。ブースマップは開いた日の地図、一覧は出店日から。 */
  day: string;
}): void {
  track("select_exhibitor", {
    exhibitor_name: args.name,
    exhibitor_id: args.handle ?? args.name,
    open_source: args.source,
    day: args.day,
  });
}

/** Instagramボタンを押したとき。 */
export function trackInstagramClick(args: {
  name: string;
  handle: string | null;
  source: LinkSource;
}): void {
  track("click_instagram", {
    exhibitor_name: args.name,
    exhibitor_id: args.handle ?? args.name,
    link_source: args.source,
  });
}

/** セクションが初めて画面に入ったとき（ページ表示ごとに1回）。 */
export function trackSectionView(args: { id: string; name: string }): void {
  track("view_section", {
    section_id: args.id,
    section_name: args.name,
  });
}
