/**
 * public/ 配下の静的アセットへのパスを解決する。
 *
 * Vite の base（GitHub Pages のプロジェクトページでは "/botani-carnival/" のような
 * サブパス）を先頭に付与するため、ルート直下配信でもサブパス配信でもパスが壊れない。
 *
 * 例: asset("images/logo.png")
 *   - ローカル開発:        "/images/logo.png"
 *   - GitHub Pages 本番:   "/botani-carnival/images/logo.png"
 */
export function asset(path: string): string {
  // import.meta.env.BASE_URL は末尾が必ず "/"（例: "/" or "/botani-carnival/"）
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\/+/, "")}`;
}
