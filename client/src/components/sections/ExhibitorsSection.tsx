/**
 * ExhibitorsSection — 出店業者紹介（日程フィルタ付き単一リスト）
 * Design: Tropical Fiesta — マーケット・ポスターボード感
 * データは client/src/data/exhibitors.ts（CSV由来）を参照。
 * カード: 出店日バッジ・アイコン・屋号・Instagramリンク・商品画像カルーセル・説明文2行省略
 * タップ: カード→モーダル詳細表示 / Instagramアイコン→外部遷移
 */
import React, { useEffect, useState } from "react";
import { ChevronRight, Instagram } from "lucide-react";
import { asset } from "@/lib/asset";
import { exhibitors, type Exhibitor } from "@/data/exhibitors";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/SectionHeading";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// 画像未設定時のプレースホルダー（正方形）
const noImage = asset("images/no_image_square.jpg");

// 商品画像のURL配列。未設定なら no_image を1枚返す。
function productImages(e: Exhibitor): string[] {
  if (e.slug && e.images.length > 0) {
    return e.images.map((f) => asset(`images/exhibitors/${e.slug}/${f}`));
  }
  return [noImage];
}

// アイコン画像のURL。未設定なら null（頭文字バッジにフォールバック）。
function iconSrc(e: Exhibitor): string | null {
  if (e.slug && e.icon) return asset(`images/exhibitors/${e.slug}/${e.icon}`);
  return null;
}

// InstagramのURL。ハンドルが無ければ null（リンク非表示）。
function instagramUrl(e: Exhibitor): string | null {
  return e.instagram ? `https://www.instagram.com/${e.instagram}/` : null;
}

// 出店日が未確定の業者は非表示。両日出店の業者も1枚だけ描画し、
// 日程はカード上のバッジで示す（同じカードを2度出さないための単一リスト）。
const allExhibitors = exhibitors.filter((e) => e.days.length > 0);

// 実体は index.css の日程カラートークン。各セクションで色がずれないよう一元化。
const DAY1_COLOR = "var(--day-1)";
const DAY2_COLOR = "var(--day-2)";
const BOTH_COLOR = "var(--day-both)";

// カードに出す日程バッジ。両日 / 片日 で色分けする。
function dayBadge(e: Exhibitor): { text: string; color: string } {
  const d1 = e.days.includes(1);
  const d2 = e.days.includes(2);
  if (d1 && d2) return { text: "両日", color: BOTH_COLOR };
  if (d1) return { text: "8/29", color: DAY1_COLOR };
  return { text: "8/30", color: DAY2_COLOR };
}

// フィルタ定義。すべて / 各日 の3種。
// short はモバイル用。3つ並べると375px幅で曜日カッコが入りきらないため。
const FILTERS = [
  { id: "all", label: "すべて", short: "すべて", color: "oklch(0.30 0.06 145)", match: () => true },
  { id: "day1", label: "8/29（土）", short: "8/29", color: DAY1_COLOR, match: (e: Exhibitor) => e.days.includes(1) },
  { id: "day2", label: "8/30（日）", short: "8/30", color: DAY2_COLOR, match: (e: Exhibitor) => e.days.includes(2) },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

// 商品画像カルーセル（shadcn/ui Carousel = embla。スワイプ・キーボード対応）
// size="card": 正方形サムネイル / size="modal": モーダル内の大きめ表示
function ImageCarousel({ images, size }: { images: string[]; size: "card" | "modal" }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const multiple = images.length > 1;
  const imgClass = "aspect-square w-full object-cover";
  const arrowClass = size === "card" ? "w-6 h-6 text-xs" : "w-8 h-8 text-lg";
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="w-full bg-[oklch(0.95_0.02_85)]">
      <CarouselContent className="ml-0">
        {images.map((src, i) => (
          <CarouselItem key={i} className="pl-0 basis-full">
            {/*
              カルーセルは全スライドをDOMに置くので、lazy が無いと
              43枚のカード分（約84枚・14MB）を一斉にダウンロードしてしまう。
            */}
            <img
              src={src}
              alt={`商品${i + 1}`}
              loading="lazy"
              decoding="async"
              className={imgClass}
              onError={(e) => { (e.target as HTMLImageElement).src = noImage; }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {multiple && (
        <>
          <button
            onClick={(e) => { stop(e); api?.scrollPrev(); }}
            className={`absolute ${size === "card" ? "left-1" : "left-2"} top-1/2 -translate-y-1/2 ${arrowClass} rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors`}
            aria-label="前の画像"
          >‹</button>
          <button
            onClick={(e) => { stop(e); api?.scrollNext(); }}
            className={`absolute ${size === "card" ? "right-1" : "right-2"} top-1/2 -translate-y-1/2 ${arrowClass} rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors`}
            aria-label="次の画像"
          >›</button>
          <div className={`absolute ${size === "card" ? "bottom-1.5 gap-1" : "bottom-2 gap-1.5"} left-1/2 -translate-x-1/2 flex`}>
            {images.map((_, i) => (
              <div
                key={i}
                className={`${size === "card" ? "w-1.5 h-1.5" : "w-2 h-2"} rounded-full transition-colors`}
                style={{ backgroundColor: i === current ? "white" : "rgba(255,255,255,0.4)" }}
              />
            ))}
          </div>
        </>
      )}
    </Carousel>
  );
}

function ExhibitorCard({ exhibitor }: { exhibitor: Exhibitor }) {
  const images = productImages(exhibitor);
  const icon = iconSrc(exhibitor);
  // モーダルでは最後にアイコン画像も見せる。
  // 商品画像が無い場合は no_image を出さずアイコン1枚にする。
  const modalImages = icon
    ? exhibitor.images.length > 0
      ? [...images, icon]
      : [icon]
    : images;
  const igUrl = instagramUrl(exhibitor);
  const igHandle = exhibitor.instagram ? `@${exhibitor.instagram}` : "";
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
          <ImageCarousel images={images} size="card" />
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

      {/* Modal（shadcn/ui Dialog） */}
      <Dialog open={open} onOpenChange={setOpen}>
        {/*
          カードと同じジャングルダーク。text-white は閉じるボタン(X)にも効かせるため
          ここで指定する（shadcn の Close は currentColor を継承するので、
          白地前提のままだと濃背景でほぼ見えなくなる）。
        */}
        <DialogContent className="p-0 gap-0 overflow-hidden max-w-[21.5rem] sm:max-w-sm bg-[var(--jungle-dark)] text-white border-white/15">
          <div className="max-h-[85vh] overflow-y-auto">
            {/* Modal header */}
            <DialogHeader className="flex-row items-center gap-3 space-y-0 px-4 py-2 pr-10 text-left border-b border-white/15">
              <img
                src={icon ?? noImage}
                alt={`${exhibitor.name} アイコン`}
                loading="lazy"
                decoding="async"
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <DialogTitle
                  className="font-bold text-base text-white truncate"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  {exhibitor.name}
                </DialogTitle>
                {igHandle ? (
                  <DialogDescription className="text-xs text-white/50 mt-0.5 truncate">
                    {igHandle}
                  </DialogDescription>
                ) : (
                  <DialogDescription className="sr-only">出店業者の詳細</DialogDescription>
                )}
              </div>
            </DialogHeader>

            {/* Modal image carousel */}
            <ImageCarousel images={modalImages} size="modal" />

            {/* Modal body */}
            <div className="p-4">
              {/* 出店日 */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {exhibitor.days.includes(1) && (
                  <Badge
                    className="text-white border-transparent text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: DAY1_COLOR }}
                  >
                    8月29日（土）
                  </Badge>
                )}
                {exhibitor.days.includes(2) && (
                  <Badge
                    className="text-white border-transparent text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: DAY2_COLOR }}
                  >
                    8月30日（日）
                  </Badge>
                )}
              </div>
              {exhibitor.description && (
                <p className="text-sm text-white/70 leading-relaxed mb-4 whitespace-pre-line">
                  {exhibitor.description}
                </p>
              )}
              {igUrl && (
                <Button
                  asChild
                  className="w-full h-auto py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 hover:bg-transparent"
                  style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
                >
                  <a href={igUrl} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4" />
                    Instagramを見る
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
        <SectionHeading overline="Exhibitors" title="出店業者紹介">
          全{allExhibitors.length}の出店業者が参加予定です。
          両日出店の業者には <span className="font-bold" style={{ color: BOTH_COLOR }}>両日</span> バッジが付きます。
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
