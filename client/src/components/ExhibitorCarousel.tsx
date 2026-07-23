/**
 * 商品画像カルーセル（shadcn/ui Carousel = embla。スワイプ・キーボード対応）
 * size="card": 一覧カードの正方形サムネイル / size="modal": ダイアログ内の大きめ表示
 */
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { noImage } from "@/lib/exhibitor";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function ExhibitorCarousel({
  images,
  size,
}: {
  images: string[];
  size: "card" | "modal";
}) {
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
  const arrowClass = size === "card" ? "w-6 h-6" : "w-8 h-8";
  /*
    矢印はフォントの文字（‹ ›）ではなくアイコンを使う。
    Noto Sans JP の ‹ › は約物なので字面が円の中心より 1.7px ほど下に描かれ、
    ボタンを中央揃えしても矢印が沈んで見えてしまう。
  */
  const iconClass = size === "card" ? "w-3.5 h-3.5" : "w-4 h-4";
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="w-full bg-[oklch(0.95_0.02_85)]">
      <CarouselContent className="ml-0">
        {images.map((src, i) => (
          <CarouselItem key={i} className="pl-0 basis-full">
            {/*
              カルーセルは全スライドをDOMに置くので、lazy が無いと
              一覧の全カード分の画像を一斉にダウンロードしてしまう。
            */}
            <img
              src={src}
              alt={`商品${i + 1}`}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = noImage;
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {multiple && (
        <>
          <button
            onClick={(e) => {
              stop(e);
              api?.scrollPrev();
            }}
            className={`absolute ${size === "card" ? "left-1" : "left-2"} top-1/2 -translate-y-1/2 ${arrowClass} rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors`}
            aria-label="前の画像"
          >
            <ChevronLeft className={iconClass} strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => {
              stop(e);
              api?.scrollNext();
            }}
            className={`absolute ${size === "card" ? "right-1" : "right-2"} top-1/2 -translate-y-1/2 ${arrowClass} rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors`}
            aria-label="次の画像"
          >
            <ChevronRight className={iconClass} strokeWidth={2.5} />
          </button>
          <div
            className={`absolute ${size === "card" ? "bottom-1.5 gap-1" : "bottom-2 gap-1.5"} left-1/2 -translate-x-1/2 flex`}
          >
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
