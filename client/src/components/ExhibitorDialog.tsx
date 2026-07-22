/**
 * 出店業者の詳細ダイアログ。
 * 出店紹介の一覧カードと、ブースマップの区画の両方から同じものを開く。
 */
import { Instagram } from "lucide-react";
import type { Exhibitor } from "@/data/exhibitors";
import { trackInstagramClick } from "@/lib/analytics";
import {
  DAY1_COLOR,
  DAY2_COLOR,
  iconSrc,
  instagramUrl,
  noImage,
  productImages,
} from "@/lib/exhibitor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExhibitorCarousel from "@/components/ExhibitorCarousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ExhibitorDialog({
  exhibitor,
  open,
  onOpenChange,
}: {
  /** null の間は中身を描画しない（マップ側は1つのダイアログを使い回すため） */
  exhibitor: Exhibitor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {exhibitor && <Body exhibitor={exhibitor} />}
    </Dialog>
  );
}

function Body({ exhibitor }: { exhibitor: Exhibitor }) {
  const images = productImages(exhibitor);
  const icon = iconSrc(exhibitor);
  const igUrl = instagramUrl(exhibitor);
  const igHandle = exhibitor.instagram ? `@${exhibitor.instagram}` : "";

  // 最後にアイコン画像も見せる。商品画像が無い場合は no_image を出さずアイコン1枚にする。
  const modalImages = icon
    ? exhibitor.images.length > 0
      ? [...images, icon]
      : [icon]
    : images;

  return (
    /*
      カードと同じジャングルダーク。text-white は閉じるボタン(X)にも効かせるため
      ここで指定する（shadcn の Close は currentColor を継承するので、
      白地前提のままだと濃背景でほぼ見えなくなる）。
    */
    <DialogContent className="p-0 gap-0 overflow-hidden max-w-[21.5rem] sm:max-w-sm bg-[var(--jungle-dark)] text-white border-white/15">
      <div className="max-h-[85vh] overflow-y-auto">
        <DialogHeader className="flex-row items-center gap-3 space-y-0 px-4 py-2 pr-10 text-left border-b border-white/15">
          <img
            src={icon ?? noImage}
            alt={`${exhibitor.name} アイコン`}
            loading="lazy"
            decoding="async"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            {/*
              屋号はゴシック。カード側は11pxで明朝だと潰れるためゴシックにして
              おり、同じ情報が場所によって書体が変わらないよう合わせる。
              明朝は「語りかける言葉」（見出し・リード文・FAQの質問）に限る。
            */}
            <DialogTitle className="font-bold text-base text-white truncate">
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

        <ExhibitorCarousel images={modalImages} size="modal" />

        <div className="p-4">
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
              style={{
                background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              }}
            >
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackInstagramClick({
                    name: exhibitor.name,
                    handle: exhibitor.instagram,
                    source: "dialog",
                  })
                }
              >
                <Instagram className="w-4 h-4" />
                Instagramを見る
              </a>
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  );
}
