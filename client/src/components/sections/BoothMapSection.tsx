/**
 * BoothMapSection — 出展ブース配置図
 *
 * 配置は client/src/data/boothMap.ts のデータから描画する。
 * 画像ではなくCSSレイアウトなので、区画の移動は配列の並び替えだけで済み、
 * 屋号・アイコン・詳細は exhibitors.ts から自動で引ける。
 *
 * Design: 濃緑のセクションに「1枚の会場図」を敷く構成。
 * 区画は白いチップとして浮かせ、設備は沈ませて主役（出店ブース）を立たせる。
 */
import { useState } from "react";
import type { Exhibitor } from "@/data/exhibitors";
import { findByHandle, iconSrc, noImage } from "@/lib/exhibitor";
import {
  kitchenCarRow,
  kitchenCarSide,
  leftFacilities,
  parkingBlocks,
  rightFacilities,
  tentBlocks,
  type BoothBlock,
  type Facility,
} from "@/data/boothMap";
import SectionHeading from "@/components/SectionHeading";
import ExhibitorDialog from "@/components/ExhibitorDialog";
import BoothMapDecor from "@/components/sections/BoothMapDecor";

const INK = "oklch(0.18 0.05 145)";
const MUTED = "oklch(0.50 0.05 145)";
const LINE = "oklch(0.87 0.03 85)";

/** 区画に入る出店者1者ぶんの表示。データにあれば押して詳細を開ける。 */
function Occupant({
  handle,
  onOpen,
}: {
  handle: string;
  onOpen: (e: Exhibitor) => void;
}) {
  const exhibitor = findByHandle(handle);
  // スマホは屋号を出さずアイコンだけにする（横スクロールを無くすため）。
  // 屋号はボタンの aria-label とタップ後のダイアログで担保する。
  const base =
    "flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md px-1 py-1 text-left transition-all sm:justify-start";

  const inner = (
    <>
      <img
        src={exhibitor ? (iconSrc(exhibitor) ?? noImage) : noImage}
        alt=""
        loading="lazy"
        decoding="async"
        className="size-9 flex-shrink-0 rounded-full object-cover ring-1 ring-black/5 sm:size-7"
      />
      <span className="hidden min-w-0 flex-1 text-[10px] leading-tight font-bold break-words sm:block">
        {exhibitor?.name ?? handle}
      </span>
    </>
  );

  // データに無い区画（前回限りの出店者など）は押せないので静的に出す
  if (!exhibitor) {
    return (
      <div className={base} style={{ color: INK }}>
        {inner}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(exhibitor)}
      className={`${base} cursor-pointer hover:bg-black/5`}
      style={{ color: INK }}
      aria-label={`${exhibitor.name} の詳細を開く`}
    >
      {inner}
    </button>
  );
}

/**
 * 1区画。"a+b" のように複数入る場合は、区画を分けずに中で並べ、
 * それぞれ個別に押せるようにする（どちらの詳細を開くか選べる）。
 */
function Booth({
  handle,
  wide,
  onOpen,
}: {
  handle: string;
  /** 横2つ分に広げる（1行に1区画だけ置いた場合） */
  wide?: boolean;
  onOpen: (e: Exhibitor) => void;
}) {
  const span = wide ? "col-span-2" : "";

  // 空き区画は何も描かない。グリッドの位置だけ確保して並びを崩さない。
  if (!handle) {
    return <div className={`${span} min-h-[3.25rem]`} />;
  }

  const handles = handle.split("+");

  return (
    <div
      className={`${span} flex min-h-[3.25rem] items-center gap-1 rounded-lg border px-1.5 py-1.5 transition-all hover:-translate-y-0.5 hover:shadow-md`}
      style={{
        backgroundColor: "white",
        borderColor: LINE,
      }}
    >
      {handles.map((h) => (
        <Occupant key={h} handle={h} onOpen={onOpen} />
      ))}
    </div>
  );
}

/** 駐車場エリア右端の縦長区画（キッチンカー1台分）。 */
function SideStrip({ handle, onOpen }: { handle: string; onOpen: (e: Exhibitor) => void }) {
  const exhibitor = findByHandle(handle);
  const content = (
    <>
      <img
        src={exhibitor ? (iconSrc(exhibitor) ?? noImage) : noImage}
        alt=""
        loading="lazy"
        decoding="async"
        className="size-9 rounded-full object-cover ring-1 ring-black/5 sm:size-7"
      />
      {/* 区画と同じく、スマホでは屋号を出さない */}
      <span className="hidden text-center text-[10px] leading-tight font-bold break-words sm:block">
        {exhibitor?.name ?? handle}
      </span>
    </>
  );
  const cls =
    "flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-lg border px-1 py-3 transition-all";
  const style = { backgroundColor: "white", borderColor: LINE, color: INK };

  if (!exhibitor) {
    return (
      <div className={cls} style={style}>
        {content}
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onOpen(exhibitor)}
      className={`${cls} cursor-pointer hover:-translate-y-0.5 hover:shadow-md`}
      style={style}
      aria-label={`${exhibitor.name} の詳細を開く`}
    >
      {content}
    </button>
  );
}

function Block({ block, onOpen }: { block: BoothBlock; onOpen: (e: Exhibitor) => void }) {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {block.rows.flatMap((row, r) =>
        row.map((handle, c) => (
          <Booth
            key={`${r}-${c}`}
            handle={handle}
            // 1行に1つだけなら全幅の区画として扱う
            wide={row.length === 1}
            onOpen={onOpen}
          />
        ))
      )}
    </div>
  );
}

/** 設備・建物。主役ではないので塗りも文字も落ち着かせる。 */
function FacilityBox({ facility }: { facility: Facility }) {
  const cream = facility.tone === "cream";
  return (
    <div className="flex flex-col" style={{ flexGrow: facility.size, flexBasis: 0 }}>
      {facility.note && (
        <div
          className="pb-0.5 text-center text-[8px] font-bold tracking-wider"
          style={{ color: "oklch(0.58 0.18 25)" }}
        >
          {facility.note}
        </div>
      )}
      <div
        // スマホは列幅が40px前後しかないため縦書きにする
        className="flex flex-1 items-center justify-center rounded-lg px-1 py-3 text-center text-[10px] font-bold tracking-wider [writing-mode:vertical-rl] sm:text-xs sm:[writing-mode:horizontal-tb]"
        style={{
          backgroundColor: cream ? "oklch(0.95 0.04 85)" : "oklch(0.99 0.01 85)",
          border: `1px solid ${LINE}`,
          color: MUTED,
        }}
      >
        {facility.label}
      </div>
    </div>
  );
}

/**
 * 「テント」などのエリア見出し。
 * フライヤーの木板サインに寄せる（wood-sign は index.css）。
 * エリアの幅いっぱいに渡す帯にして、元の配置図の「テント」バンドとも揃える。
 */
function AreaLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="wood-sign font-display mb-2 rounded-md py-1.5 text-center text-[10px] font-bold tracking-[0.3em] text-white uppercase">
      {children}
    </div>
  );
}

export default function BoothMapSection() {
  // マップ全体で1つのダイアログを使い回す（区画ごとに持つと数十個できてしまう）
  const [selected, setSelected] = useState<Exhibitor | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (e: Exhibitor) => {
    setSelected(e);
    setOpen(true);
  };

  return (
    <section
      id="booth-map"
      className="py-24 px-4"
      style={{ backgroundColor: "oklch(0.18 0.05 145)" }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading overline="Booth Map" title="ブースマップ" tone="dark">
          区画をタップすると出店業者の詳細をご覧いただけます。
          <br />
          ※こちらは前回（Vol.8）の配置図です。Vol.9の配置は決まり次第公開します。
        </SectionHeading>

        {/* map-paper は index.css。紙のムラとざらつきを持つ地。 */}
        <div className="map-paper reveal relative overflow-x-auto rounded-2xl p-4 shadow-xl sm:p-6">
          <BoothMapDecor layer="back" />
          {/* 装飾より上に描くため relative を付ける */}
          <div className="relative sm:min-w-[42rem]">
            <div className="flex gap-3">
              {/* 左: 設備 */}
              <div className="flex w-[13%] flex-col gap-2">
                {leftFacilities.map((f) => (
                  <FacilityBox key={f.label} facility={f} />
                ))}
              </div>

              {/* 中央: テント */}
              <div className="flex flex-1 flex-col">
                {/* 島どうしの間隔＝通路。区画内の gap-1.5 とは別物。 */}
                <div className="flex flex-1 flex-col gap-6">
                  {tentBlocks.map((b, i) => (
                    <Block key={i} block={b} onOpen={handleOpen} />
                  ))}
                  <div
                    className="rounded-lg py-2.5 text-center text-[11px] font-bold tracking-widest text-white"
                    style={{ backgroundColor: "oklch(0.30 0.10 145)" }}
                  >
                    モニュメント
                  </div>
                </div>
              </div>

              {/* 梱包スペース */}
              <div className="flex w-[5%] flex-col justify-around py-12">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center rounded-md py-5 text-[9px] font-bold [writing-mode:vertical-rl] sm:[writing-mode:horizontal-tb]"
                    style={{ backgroundColor: "oklch(0.93 0.02 85)", color: MUTED }}
                  >
                    梱包
                  </div>
                ))}
              </div>

              {/* 右: 建物 */}
              <div className="flex w-[16%] flex-col gap-2">
                {rightFacilities.map((f) => (
                  <FacilityBox key={f.label} facility={f} />
                ))}
              </div>
            </div>

            {/* 駐車場エリア */}
            <div className="mt-8 flex justify-end">
              <div className="w-[72%]">
                <AreaLabel>Parking Area</AreaLabel>

                {/* テント: ブロックを横に並べる */}
                <div className="flex gap-6">
                  {parkingBlocks.map((b, i) => (
                    <div key={i} className="flex-1">
                      <Block block={b} onOpen={handleOpen} />
                    </div>
                  ))}
                  {/* 右端の縦帯（キッチンカー1台分） */}
                  {kitchenCarSide && (
                    <div className="w-[14%]">
                      <SideStrip handle={kitchenCarSide} onOpen={handleOpen} />
                    </div>
                  )}
                </div>

                {/* キッチンカーエリア: 横一列 */}
                <div className="mt-3">
                  <AreaLabel>Kitchen Car</AreaLabel>
                  <div
                    className="grid gap-1.5"
                    style={{ gridTemplateColumns: `repeat(${kitchenCarRow.length}, minmax(0, 1fr))` }}
                  >
                    {kitchenCarRow.map((h) => (
                      <Booth key={h} handle={h} onOpen={handleOpen} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 区画の上に覆いかぶさる葉。pointer-events-none なのでタップは通る。 */}
          <BoothMapDecor layer="front" />
        </div>
      </div>

      <ExhibitorDialog exhibitor={selected} open={open} onOpenChange={setOpen} />

      {/* Wave divider */}
      <div className="relative mt-16 -mb-24 -mx-4">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "60px" }}
          aria-hidden="true"
        >
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.96 0.03 85)" />
        </svg>
      </div>
    </section>
  );
}
