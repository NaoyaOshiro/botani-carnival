# GA4 アクセス解析メモ

このサイトの計測設定と、データの見方をまとめたもの。

## 基本情報

- 測定ID: `G-M0EZL6R2BQ`
- プロパティ: `botanical-carnibal`
- スニペット設置場所: [client/index.html](../client/index.html) の `<head>`
- 計測コード: [client/src/lib/analytics.ts](../client/src/lib/analytics.ts)

## 送っているイベント

| イベント名 | いつ発火 | 主なパラメータ |
|---|---|---|
| `select_exhibitor` | 出店者カード / ブースをタップして詳細を開いた | `exhibitor_name`, `open_source`(list/booth_map), `day` |
| `click_instagram` | Instagramボタンを押した | `exhibitor_name`, `link_source`(card/dialog) |
| `view_section` | セクションが画面に入った（1回） | `section_name` |

拡張計測機能（ページビュー・スクロール数など）はGA4側でON。

## カスタムディメンション（GA4管理画面で登録済み・すべてイベント範囲）

`exhibitor_name` / `exhibitor_id` / `open_source` / `day` / `link_source` / `section_name`

※ 新しいパラメータを追加したら、GA4管理 → データの表示 → カスタム定義 で登録しないと、レポートで内訳が見えない。

## データの見方

### リアルタイム（即時・動作確認用）
GA4 左メニュー「リアルタイム」→ 別タブでサイトを操作すると数秒でイベントが増える。
下の「イベント数：イベント名別」に `select_exhibitor` などが出ればOK。

### 探索（ランキング・後日の分析用）
GA4 左メニュー「探索」→ **「BOTANI CARNIVAL アクセス分析」** を開く。タブ切り替えで3つのランキング:

| タブ | 行 | フィルタ | 分かること |
|---|---|---|---|
| IG送客 | 出店者名 | `click_instagram` | どの出店者のIGが押されたか |
| 出店者クリック | 出店者名 | `select_exhibitor` | どの出店者が開かれたか |
| セクション閲覧 | セクション名 | `view_section` | どのセクションが見られたか |

いずれも値は「イベント数」の多い順。

## 注意（反映時間）

- リアルタイム: 数秒〜十数秒
- 探索・標準レポート: 数時間〜最大48時間（登録直後のカスタムディメンションは初回だけ丸1日ほどかかることがある）
- 「データがありません」表示は、計測が動いていても集計待ちのため出る。壊れているわけではない。
