# 🎪 BOTANI CARNIVAL 特設サイト

**珍奇植物市場 Vol.9「BOTANI CARNIVAL」** の公式特設サイトです。

> 植物が主役の、真夏の祭典。  
> 2026年8月29日（土）・30日（日）11:00〜16:00  
> 西原さわふじ広場

---

## 🛠 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | React 19 + TypeScript |
| スタイリング | Tailwind CSS v4 |
| UIコンポーネント | shadcn/ui + Radix UI |
| アニメーション | Framer Motion |
| ルーティング | Wouter |
| ビルドツール | Vite |
| パッケージマネージャー | pnpm |

---

## 📁 ディレクトリ構成

```
botani-carnival/
├── client/
│   ├── public/           # favicon等の静的ファイル
│   └── src/
│       ├── components/
│       │   ├── sections/ # 各セクションコンポーネント
│       │   │   ├── HeroSection.tsx        # ヒーロー（フライヤー画像）
│       │   │   ├── EventInfoSection.tsx   # イベント情報
│       │   │   ├── BoothMapSection.tsx    # 会場配置図
│       │   │   ├── ExhibitorsSection.tsx  # 出店業者紹介
│       │   │   ├── SponsorsSection.tsx    # 協賛紹介
│       │   │   ├── FaqSection.tsx         # よくある質問
│       │   │   └── ContactSection.tsx     # お問い合わせ
│       │   └── ui/       # shadcn/ui コンポーネント
│       ├── pages/
│       │   └── Home.tsx  # メインページ（1ページ構成）
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css     # グローバルスタイル・カラーパレット
├── server/               # 静的ファイルサーバー（Express）
└── shared/               # 共有型定義
```

---

## 🎨 デザイン方針

フライヤーのビジュアルトーンに合わせた **Tropical Fiesta** スタイルを採用しています。

- **カラーパレット**：カーニバルグリーン・フィエスタオレンジ・マゼンタ・ゴールド
- **フォント**：英語見出しに `Pacifico`、日本語に `Noto Serif JP`
- **装飾モチーフ**：バンティングフラッグ・熱帯植物シルエット・スタンプ風バッジ

詳細は [`ideas.md`](./ideas.md) を参照してください。

---

## 📄 ページ構成

1ページスクロール型のサイトです。

| # | セクション | 内容 |
|---|---|---|
| 1 | ヒーロー | PC/SP別フライヤー画像（レスポンシブ切り替え） |
| 2 | イベント情報 | 日時・場所・入場無料・キッチンカー情報 |
| 3 | 会場配置図 | 8/29（土）・8/30（日）の2枚を縦並び表示 |
| 4 | 出店業者紹介 | 日別セクション（各約30社）、カード＋モーダル表示 |
| 5 | 協賛紹介 | 協賛3社のロゴ・リンク |
| 6 | よくある質問 | アコーディオン形式のQ&A |
| 7 | お問い合わせ | @tanikunchu へのInstagram DM誘導 |

---

## 🚀 開発環境のセットアップ

```bash
# 依存パッケージのインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build
```

開発サーバーは `http://localhost:3000` で起動します。

---

## 🌐 デプロイ（GitHub Pages）

`main` ブランチに push すると、GitHub Actions（`.github/workflows/deploy.yml`）が自動でビルドして GitHub Pages に公開します。

公開URL: **https://naoyaoshiro.github.io/botani-carnival/**

### 初回のみ必要な設定

リポジトリの **Settings → Pages → Build and deployment → Source** を **「GitHub Actions」** に設定してください（一度だけ）。

### 仕組み・注意点

- プロジェクトページはサブパス（`/botani-carnival/`）で配信されるため、Vite の `base` を本番ビルド時のみ `/botani-carnival/` に設定しています（`vite.config.ts`）。
- 画像などの静的アセットは `asset()` ヘルパー、クライアントルーティングは wouter の `base` により、サブパスでも正しく解決されます。
- 独自ドメインや別ホスト（ルート直下配信）に移す場合は、ビルド時に環境変数 `VITE_BASE_PATH=/` を指定すれば base を変更できます。

---

## 🖼 画像・アセットの管理

商品画像・ロゴ等の静的アセットは `client/public/images/` に配置します。コード側では、GitHub Pages のサブパス配信に対応するため `asset("images/ファイル名")`（`client/src/lib/asset.ts`）ヘルパー経由で参照しています。

現在コードから参照されているが未配置のファイル（Manus環境からダウンロードして配置してください）：

- `logo-mark_44fa6323.png`（ヘッダー・フッターのロゴ）
- `flyer_pc_72483ab8.webp`（ヒーロー画像 PC用）
- `flyer_ec004d74.jpg`（ヒーロー画像 SP用）
- `booth-map-placeholder_3616fca9.jpg`（会場配置図）
- `kitchen-car_6061db9c.jpg`（キッチンカー紹介）
- `oshiro_logo_f2699919.jpg`（おーしろ製作所アイコン）
- `oshiro_product2_b2892d60.jpg` / `oshiro_product3_813b6ba1.jpg`（おーしろ製作所 商品画像）
- `section-plants_f29bcf52.jpg`（出店業者カードの画像読み込み失敗時フォールバック）

なお出店業者カードの商品画像（おーしろ製作所以外）は Unsplash の外部URLを暫定利用しています。

---

## 📝 出店業者データの更新方法

`client/src/components/sections/ExhibitorsSection.tsx` 内の `saturdayExhibitors` / `sundayExhibitors` 配列を編集してください。

各出店者のデータ構造：

```ts
{
  id: number,
  name: string,           // 屋号
  instagram: string,      // @アカウント名
  category: Category,     // "plants" | "pots" | "goods" | "food" | "other"
  description: string,    // 出店者コメント
  icon: string,           // アイコン画像URL
  images: string[],       // 商品画像URL（2〜3枚）
}
```

---

## 📬 お問い合わせ

イベントに関するお問い合わせは [@tanikunchu](https://www.instagram.com/tanikunchu/) のInstagram DMまでお願いします。
