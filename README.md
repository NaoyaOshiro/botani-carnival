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

## 🖼 画像・アセットの管理

商品画像・ロゴ等の静的アセットは `/home/ubuntu/webdev-static-assets/` に保存し、`manus-upload-file --webdev` でアップロードしたURLを使用しています。

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
