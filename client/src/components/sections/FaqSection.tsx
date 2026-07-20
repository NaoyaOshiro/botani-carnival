/**
 * FaqSection — よくある質問
 * Design: Tropical Fiesta — サンドベース背景
 * アコーディオンは shadcn/ui の Accordion を使用。
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

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
        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-2xl">❓</span>
            <span className="text-sm font-bold tracking-widest text-[oklch(0.42_0.16_145)] uppercase">FAQ</span>
            <span className="text-2xl">❓</span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[oklch(0.18_0.05_145)]"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            よくある質問
          </h2>
          <div className="w-16 h-1 bg-[oklch(0.42_0.16_145)] mx-auto mt-4 rounded-full" />
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <Card
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border-[oklch(0.88_0.04_85)] reveal gap-0 py-0"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <AccordionItem value={`q${i}`} className="border-b-0">
                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[oklch(0.98_0.02_85)] [&>svg]:text-[oklch(0.42_0.16_145)] [&>svg]:mt-2">
                  <span className="flex items-start gap-4 flex-1">
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: "oklch(0.42 0.16 145)" }}
                    >
                      Q
                    </span>
                    <span
                      className="flex-1 font-bold text-[oklch(0.18_0.05_145)] text-base leading-relaxed"
                      style={{ fontFamily: "'Noto Serif JP', serif" }}
                    >
                      {faq.q}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6">
                  <div className="flex gap-4">
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: "oklch(0.72 0.18 55)" }}
                    >
                      A
                    </span>
                    <p className="text-[oklch(0.35_0.05_145)] leading-relaxed text-sm pt-1">
                      {faq.a}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Card>
          ))}
        </Accordion>
      </div>

      {/* Wave divider */}
      <div className="relative mt-16 -mb-24 -mx-4">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px" }}>
          <path d="M0,20 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.18 0.05 145)" />
        </svg>
      </div>
    </section>
  );
}
