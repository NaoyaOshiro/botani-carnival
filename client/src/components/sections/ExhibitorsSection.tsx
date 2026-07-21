/**
 * ExhibitorsSection — 出店業者紹介（日程フィルタ付き単一リスト）
 * データは client/src/data/exhibitors.ts（CSV由来）を参照。
 * カード: 出店日バッジ・アイコン・屋号・Instagramリンク・商品画像カルーセル・説明文
 * タップ: カード→詳細ダイアログ / Instagramアイコン→外部遷移
 *
 * ヘルパー・カルーセル・ダイアログはブースマップと共用（@/lib/exhibitor ほか）。
 */
import React, { useEffect, useState } from "react";
import { ChevronRight, Instagram } from "lucide-react";
import { exhibitors, type Exhibitor } from "@/data/exhibitors";
import {
  BOTH_COLOR,
  DAY1_COLOR,
  DAY2_COLOR,
  dayBadge,
  iconSrc,
  instagramUrl,
  noImage,
  productImages,
} from "@/lib/exhibitor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/SectionHeading";
import ExhibitorCarousel from "@/components/ExhibitorCarousel";
import ExhibitorDialog from "@/components/ExhibitorDialog";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 出店日が未確定の業者は非表示。両日出店の業者も1枚だけ描画し、
// 日程はカード上のバッジで示す（同じカードを2度出さないための単一リスト）。
const allExhibitors = exhibitors.filter((e) => e.days.length > 0);

// フィルタ定義。すべて / 各日 の3種。
// short はモバイル用。3つ並べると375px幅で曜日カッコが入りきらないため。
const FILTERS = [
  { id: "all", label: "すべて", short: "すべて", color: "oklch(0.30 0.06 145)", match: () => true },
  { id: "day1", label: "8/29（土）", short: "8/29", color: DAY1_COLOR, match: (e: Exhibitor) => e.days.includes(1) },
  { id: "day2", label: "8/30（日）", short: "8/30", color: DAY2_COLOR, match: (e: Exhibitor) => e.days.includes(2) },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

function ExhibitorCard({ exhibitor }: { exhibitor: Exhibitor }) {
  const images = productImages(exhibitor);
  const icon = iconSrc(exhibitor);
  const igUrl = instagramUrl(exhibitor);
  const badge = dayBadge(exhibitor);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <Card
        // ベースはブース配置図・協賛などのセクション背景と共通のジャングルダーク。
        // 文字は白系に反転する。
        className="bg-[var(--jungle-dark)] rounded-xl overflow-hidden shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-150 cursor-pointer border-0 gap-0 py-0"
        onClick={() => setOpen(true)}
      >
        {/* 1. 商品画像カルーセル（正方形） + 出店日バッジ */}
        <div className="relative">
          <ExhibitorCarousel images={images} size="card" />
          <Badge
            className="absolute top-2 left-2 z-10 text-white border-transparent text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm pointer-events-none"
            style={{ backgroundColor: badge.color }}
          >
            {badge.text}
          </Badge>
        </div>

        {/* 2. アイコン + 屋号（ゴシック体） */}
        <div className="flex items-center gap-2 px-3 pt-1.5 pb-0.5">
          <img
            src={icon ?? noImage}
            alt={`${exhibitor.name} アイコン`}
            loading="lazy"
            decoding="async"
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
          <div className="font-bold text-[11px] leading-tight text-white truncate flex-1">
            {exhibitor.name}
          </div>
        </div>

        {/* 3. 説明文（スマホ1行 / sm以上は2行省略） */}
        <div className="px-3 py-0.5">
          <p className="text-xs text-white/60 leading-relaxed line-clamp-1 sm:line-clamp-2">
            {exhibitor.description || " "}
          </p>
        </div>

        {/*
          4. Instagramアイコン（左） + 詳細を開けることを示すアイコン（右）
          mt-auto でカード下端に固定する。説明文が無い／1行／2行で行数が
          変わるため、これが無いと横に並ぶカード間で位置がズレる。
          （Cardは flex-col、グリッド項目は stretch するので下端が揃う）
        */}
        <div className="mt-auto flex items-center px-3 pb-1.5 pt-0.5">
          {igUrl && (
            <Button
              asChild
              variant="ghost"
              size="icon-sm"
              className="rounded-full text-white/80 hover:bg-white/15 hover:text-white"
            >
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Instagramを見る"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </Button>
          )}

          {/*
            カード全体が開くトリガーなので、これは操作要素ではなく目印。
            クリックは下のCardのonClickに任せる（pointer-events-none）。
          */}
          <span
            className="ml-auto flex items-center gap-1 text-white/60 pointer-events-none"
            aria-hidden="true"
          >
            <span className="text-[10px] font-bold hidden sm:inline">詳細</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </Card>

      {/* 詳細ダイアログ（ブースマップと共用） */}
      <ExhibitorDialog exhibitor={exhibitor} open={open} onOpenChange={setOpen} />
    </>
  );
}

const GRID_CLASS = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4";

function ExhibitorGrid({ list }: { list: Exhibitor[] }) {
  return (
    // 骨組みから実カードへ切り替わる瞬間をフェードで繋ぐ。
    // pending が解けるとこの div は新規マウントされるので毎回再生される。
    <div className={`${GRID_CLASS} animate-in fade-in-0 duration-300 ease-out`}>
      {list.map((ex, i) => (
        <ExhibitorCard key={`${ex.instagram ?? ex.name}-${i}`} exhibitor={ex} />
      ))}
    </div>
  );
}

// 実カードと同じ骨格（正方形画像→アイコン+屋号→説明2行→Instagram）にして
// 切替時に高さが飛ばないようにする。
function SkeletonCard() {
  return (
    <Card className="bg-[var(--jungle-dark)] rounded-xl overflow-hidden shadow-md border-0 gap-0 py-0">
      {/* 画像部分だけは実カードでも写真が入るまで明るいので、そのまま淡色にする */}
      <Skeleton className="aspect-square w-full rounded-none bg-[oklch(0.92_0.02_85)]" />
      <div className="flex items-center gap-2 px-3 pt-3 pb-1">
        <Skeleton className="w-9 h-9 rounded-full flex-shrink-0 bg-white/15" />
        <Skeleton className="h-4 flex-1 bg-white/15" />
      </div>
      <div className="px-3 py-1 min-h-[2.8rem] space-y-1.5">
        <Skeleton className="h-3 w-full bg-white/15" />
        <Skeleton className="h-3 w-4/5 bg-white/15" />
      </div>
      <div className="flex items-center px-3 pb-3 pt-1 min-h-[2.5rem]">
        <Skeleton className="w-6 h-6 rounded-full bg-white/15" />
      </div>
    </Card>
  );
}

function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className={GRID_CLASS} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

// 骨組みを見せる時間。短すぎると認識できず、長すぎると待たされる。
const SKELETON_MS = 400;

export default function ExhibitorsSection() {
  const [filter, setFilter] = useState<FilterId>("all");
  // タブを押した直後だけ骨組みを出し、切り替わったことを知覚させる。
  // データはローカルなので実際の待ち時間は無く、演出目的の遅延。
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(() => setPending(false), SKELETON_MS);
    return () => clearTimeout(timer);
  }, [pending, filter]);

  const handleFilterChange = (value: string) => {
    if (value === filter) return;
    setFilter(value as FilterId);
    setPending(true);
  };

  return (
    <section id="exhibitors" className="py-24 px-4 relative overflow-hidden" style={{ backgroundColor: "oklch(0.96 0.03 85)" }}>
      {/* Background texture dots */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle, oklch(0.42 0.16 145) 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading overline="Exhibitors" title="出店紹介">
          全{allExhibitors.length}の出店業者が参加予定です。
          <br />
          ※現在出店者情報を収集中です。随時更新予定です。
        </SectionHeading>

        {/* 日程フィルタ + 一覧（両日出店の業者も1枚のみ描画） */}
        <Tabs value={filter} onValueChange={handleFilterChange} className="gap-0">
          {/* 見出しが左寄せになったので、フィルタも左に揃える */}
          <TabsList className="mr-auto mb-8 h-auto gap-1 rounded-full bg-[oklch(0.91_0.03_85)] p-1.5 reveal">
            {FILTERS.map((f) => (
              <TabsTrigger
                key={f.id}
                value={f.id}
                className="rounded-full px-3 py-2 text-sm font-bold text-[oklch(0.40_0.05_145)] transition-colors sm:px-5 data-[state=active]:bg-[var(--tab-active)] data-[state=active]:text-white data-[state=active]:shadow-md"
                style={{ "--tab-active": f.color } as React.CSSProperties}
              >
                <span className="sm:hidden">{f.short}</span>
                <span className="hidden sm:inline">{f.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/*
            パネルに reveal は付けない。Home.tsx の IntersectionObserver は
            マウント時に一度 .reveal を集めるだけなので、タブ切替で後から
            マウントされるパネルは永久に非表示のままになる。加えて43枚の
            グリッドは背が高く、threshold:0.1 を満たしにくい。
            非アクティブなパネルは Radix が未マウントに保つため描画は1つ分。
          */}
          {FILTERS.map((f) => {
            const list = allExhibitors.filter(f.match);
            return (
              <TabsContent key={f.id} value={f.id}>
                {pending ? <SkeletonGrid count={list.length} /> : <ExhibitorGrid list={list} />}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      {/* Wave divider */}
      <div className="relative mt-8 -mb-24 -mx-4">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px" }}>
          <path d="M0,20 C480,60 960,0 1440,20 L1440,60 L0,60 Z" fill="oklch(0.18 0.05 145)" />
        </svg>
      </div>
    </section>
  );
}
