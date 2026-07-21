/**
 * ブース配置図のデータ。
 *
 * 【編集のしかた】
 * 区画の移動・入れ替え・追加・削除は、この配列の並びを変えるだけで反映される。
 * 座標は持たないので、1つ動かしても他の区画を直す必要はない。
 *
 * - handle は Instagram のハンドル（@は不要）。exhibitors.ts の instagram と
 *   一致すると屋号・アイコン・詳細ダイアログが自動でつながる。
 * - "" は空き区画。
 * - 1区画を2者で使う場合は "a+b" のように + でつなぐ。
 * - 1行に区画を1つだけ書くと、その区画は横2つ分（全幅）になる。
 *
 * 設備（倉庫・W.C.・建物）は両日共通なので dayLayouts の外に置く。
 */

export interface BoothBlock {
  /** 2列で並べる。1行 = [左, 右] */
  rows: string[][];
}

export interface DayLayout {
  /** 1 = 8/29土, 2 = 8/30日 */
  id: 1 | 2;
  label: string;
  short: string;
  /** テント内のブース。上から順に並ぶ。 */
  tentBlocks: BoothBlock[];
  /** 駐車場エリアのテント内ブース。左から横に並ぶ。 */
  parkingBlocks: BoothBlock[];
  /** キッチンカーエリア（横一列）。数を増減すると幅は自動で割り振られる。 */
  kitchenCarRow: string[];
  /** 駐車場テント右端の縦帯。不要なら null。 */
  kitchenCarSide: string | null;
}

const day1: DayLayout = {
  id: 1,
  label: "8/29（土）",
  short: "8/29",
  tentBlocks: [
    { rows: [["andesfarm.okinawa", "kiri6590"]] },
    {
      rows: [
        ["taka.hirogoya", "3787record"],
        ["plants_factory_island", "db_nursery"],
      ],
    },
    {
      rows: [
        ["taiyo_pharmacyandplants", "zenan.okinawa"],
        ["arakaki_orchid_bikaku", "okinawa_togetogeya"],
      ],
    },
    {
      rows: [
        ["joie.garden", "manoa831"],
        ["ambien_2020", "chipapa_garden"],
      ],
    },
    {
      rows: [
        // 全幅の区画
        ["190cm_botanical"],
        ["y.namihira", "oshiro_factory"],
      ],
    },
    {
      rows: [
        ["taka_misho", "artplantswork"],
        ["8smileplants8", "tanikunchu"],
      ],
    },
  ],
  parkingBlocks: [
    {
      rows: [
        ["luckplantsokinawa", "sunny_branch_"],
        ["ai_plants_okinawa", "ishigaki_jka1995"],
      ],
    },
    {
      rows: [
        ["dorado.plants", "plantjunkielife"],
        ["kanekon_plants", ""],
      ],
    },
  ],
  kitchenCarRow: ["28cubano", "badu_coffee", "marble.3261"],
  kitchenCarSide: null,
};

const day2: DayLayout = {
  id: 2,
  label: "8/30（日）",
  short: "8/30",
  tentBlocks: [
    { rows: [["andesfarm.okinawa", "kiri6590"]] },
    {
      rows: [
        ["163dwarfplanet", "kz.plants"],
        ["plants_factory_island", "db_nursery"],
      ],
    },
    {
      rows: [
        ["yachimunyonamine", "taiyo_pharmacyandplants"],
        ["arakaki_orchid_bikaku", "tanikuya.yuimaru"],
      ],
    },
    {
      rows: [
        ["koizumishun", "zenan.okinawa"],
        ["ambien_2020", "river.labo"],
      ],
    },
    {
      rows: [
        ["chipapa_garden", "rebirth.collection_"],
        ["dorado.plants", "ishigaki_jka1995"],
      ],
    },
    {
      rows: [
        ["cactus_airline", "oshiro_factory"],
        // 1区画を2者で使う
        ["matakichi46", "tanikunchu+yaraTakeshi"],
      ],
    },
  ],
  parkingBlocks: [
    {
      rows: [
        ["nancul_farm78", "d_d_o_s_plants"],
        ["cafe.green09", "chiisana_tanikuyasan"],
      ],
    },
    {
      rows: [
        ["ichitakasasaki", "plantjunkielife"],
        ["", ""],
      ],
    },
  ],
  kitchenCarRow: ["meshiya098", "cafe_jiji_2024", "SUMMER_PIZZA13"],
  kitchenCarSide: null,
};

export const dayLayouts: DayLayout[] = [day1, day2];

/** 設備・建物などブース以外の区画。size は縦方向の比率。両日共通。 */
export interface Facility {
  label: string;
  size: number;
  tone: "plain" | "cream" | "dark";
  /** 補足ラベル（「従業員通路」など） */
  note?: string;
}

/** 会場左側（設備）。 */
export const leftFacilities: Facility[] = [
  { label: "倉庫", size: 1, tone: "plain" },
  { label: "W.C.", size: 2, tone: "cream", note: "従業員通路" },
  { label: "うんたま市場", size: 3, tone: "plain" },
];

/** 会場右側（建物）。 */
export const rightFacilities: Facility[] = [
  { label: "西原劇場", size: 3, tone: "plain" },
  { label: "キッチンスタジオ", size: 2, tone: "plain" },
  { label: "飲食店", size: 2, tone: "plain" },
];
