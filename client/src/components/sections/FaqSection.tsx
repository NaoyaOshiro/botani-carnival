/**
 * FaqSection — よくある質問
 * Design: エディトリアル — 罫線区切りのアコーディオン（イベント情報の定義リストと同じ文法）。
 * 白カード・Q/Aの丸バッジ・影は持たない。質問文自体が見出しとして機能する。
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/SectionHeading";

const INK = "oklch(0.18 0.05 145)";
const MUTED = "oklch(0.45 0.05 145)";
const LINE = "oklch(0.88 0.04 85)";

const faqs = [
  {
    q: "入場料はかかりますか？",
    a: "入場は無料です。どなたでもお気軽にご来場いただけます。初めての方も、植物に詳しくない方も大歓迎です！",
  },
  {
    q: "駐車場はありますか？",
    a: "西原さわふじ広場には駐車場がございます。ただし、混雑が予想されますので、公共交通機関のご利用もご検討ください。詳細は会場の公式情報をご確認ください。",
  },
  {
    q: "雨天の場合はどうなりますか？",
    a: "小雨の場合は開催予定です。荒天の場合は主催者のInstagram（@tanikunchu）にてお知らせいたします。当日の朝にご確認ください。",
  },
  {
    q: "ペットを連れて入場できますか？",
    a: "ペット同伴でのご来場は、他のお客様や植物への影響を考慮し、ご遠慮いただいております。ご理解のほどよろしくお願いいたします。",
  },
  {
    q: "出店に興味があるのですが、どうすればよいですか？",
    a: "出店のお問い合わせは、主催者のInstagram（@tanikunchu）のDMよりご連絡ください。次回以降のイベントへのご参加についてもお気軽にご相談ください。",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-24 px-4" style={{ backgroundColor: "oklch(0.96 0.03 85)" }}>
      <div className="max-w-3xl mx-auto">
        <SectionHeading overline="FAQ" title="よくある質問" />

        <Accordion type="single" collapsible className="reveal">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`q${i}`}
              className="border-b-0 border-t"
              style={{ borderColor: LINE }}
            >
              <AccordionTrigger
                className="gap-4 py-5 text-left text-base font-bold hover:no-underline [&>svg]:size-5"
                style={{ fontFamily: "'Noto Serif JP', serif", color: INK }}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm leading-relaxed" style={{ color: MUTED }}>
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
          {/* 最終行の下辺。イベント情報・協賛のリストと同じ閉じ方に揃える。 */}
          <div className="border-t" style={{ borderColor: LINE }} />
        </Accordion>
      </div>

      {/* Wave divider */}
      <div className="relative mt-16 -mb-24 -mx-4">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "60px" }}
          aria-hidden="true"
        >
          <path d="M0,20 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.18 0.05 145)" />
        </svg>
      </div>
    </section>
  );
}
