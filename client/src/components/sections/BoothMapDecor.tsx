/**
 * 会場図の装飾（植物のシルエット）。
 *
 * フライヤーの世界観を足すための飾りで、情報は持たない。
 * 2層に分けている:
 *   back  … 区画の下。余白を埋める大きな株。濃いめ。
 *   front … 区画の上に覆いかぶさる葉。薄く、当たり判定は持たない。
 * 形を変えたいときはこのファイルのSVGだけを触ればよい。
 */

const GREEN = "oklch(0.42 0.16 145)";

/** アガベ（放射状の葉）。根元 (50,96) から扇状に伸ばす。 */
function Agave({ className }: { className?: string }) {
  // 角度を足し引きすると葉の広がりが変わる
  const angles = [-78, -60, -42, -25, -8, 8, 25, 42, 60, 78];
  return (
    <svg viewBox="0 0 100 100" className={className} fill={GREEN} aria-hidden="true">
      {angles.map((a) => (
        <path key={a} d="M50 96 L45 42 L50 22 L55 42 Z" transform={`rotate(${a} 50 96)`} />
      ))}
    </svg>
  );
}

/** 柱サボテン。中央の柱と左右の腕。 */
function Cactus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill={GREEN} aria-hidden="true">
      <rect x="42" y="14" width="18" height="84" rx="9" />
      <rect x="16" y="50" width="12" height="38" rx="6" />
      <rect x="16" y="58" width="32" height="11" rx="5.5" />
      <rect x="72" y="36" width="12" height="52" rx="6" />
      <rect x="54" y="44" width="30" height="11" rx="5.5" />
    </svg>
  );
}

/** ヤシの葉。中心の葉柄に沿って小葉を並べる。 */
function Frond({ className }: { className?: string }) {
  const leaflets = [10, 22, 34, 46, 58, 70, 82, 94];
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g fill={GREEN}>
        {leaflets.map((t, i) => {
          // 葉柄は左下から右上へ。先端側ほど小葉は短くなる。
          const x = 12 + t * 0.95;
          const y = 106 - t * 1.05;
          const len = 34 - i * 2.8;
          return (
            <g key={t}>
              <ellipse cx={x} cy={y - len / 2} rx="6" ry={len / 2} transform={`rotate(26 ${x} ${y})`} />
              <ellipse cx={x} cy={y + len / 2} rx="6" ry={len / 2} transform={`rotate(26 ${x} ${y})`} />
            </g>
          );
        })}
        <path d="M8 112 L108 4" stroke={GREEN} strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/**
 * モンステラ。中央の葉脈から左右に裂けた葉（ロブ）を並べる。
 * 珍奇植物の顔なので、覆いかぶさる前景に使う。
 */
function Monstera({ className }: { className?: string }) {
  // [葉脈上の位置, ロブの長さ] 先端に向かって短くなる
  const lobes = [
    [18, 40],
    [34, 46],
    [50, 44],
    [66, 38],
    [80, 28],
    [92, 18],
  ];
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g fill={GREEN}>
        {lobes.map(([t, len]) => (
          <g key={t}>
            <ellipse cx={60 - len / 2} cy={t} rx={len / 2} ry="9" />
            <ellipse cx={60 + len / 2} cy={t} rx={len / 2} ry="9" />
          </g>
        ))}
        {/* 葉脈と葉柄 */}
        <path d="M60 10 L60 100" stroke={GREEN} strokeWidth="7" strokeLinecap="round" />
        <path d="M60 96 L60 118" stroke={GREEN} strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function BoothMapDecor({ layer }: { layer: "back" | "front" }) {
  if (layer === "back") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* 左下：駐車場エリアが右寄せのため大きく空く場所 */}
        <Agave className="absolute -bottom-16 -left-10 size-96 opacity-[0.16]" />
        <Cactus className="absolute -bottom-6 left-56 size-56 opacity-[0.12]" />
        {/* 右上 */}
        <Frond className="absolute -top-10 -right-12 size-72 opacity-[0.13] -scale-x-100" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* 左上から区画の上に垂れ下がる */}
      <Monstera className="absolute -top-20 -left-16 size-72 rotate-[24deg] opacity-[0.1]" />
      {/* 右側の建物列にかかる */}
      <Monstera className="absolute top-1/3 -right-20 size-64 -rotate-[36deg] opacity-[0.09]" />
      {/* 下辺から立ち上がる */}
      <Frond className="absolute -bottom-24 right-1/3 size-72 rotate-[100deg] opacity-[0.08]" />
    </div>
  );
}
