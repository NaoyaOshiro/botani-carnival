/**
 * BOTANI CARNIVAL 特設サイト
 * Design: Tropical Fiesta — メキシカン・フィエスタ × トロピカル・ジャングル × ヴィンテージ・フェスティバル
 * Colors: Carnival Green, Fiesta Orange, Magenta Bloom, Gold Accent, Jungle Dark, Sand Base
 * Fonts: Montserrat (英字ディスプレイ: ロゴ・Overline・日付), Noto Serif JP (見出し明朝), Noto Sans JP (本文)
 */
import { useEffect } from "react";
import { trackSectionView } from "@/lib/analytics";
import HeroSection from "@/components/sections/HeroSection";
import EventInfoSection from "@/components/sections/EventInfoSection";
import BoothMapSection from "@/components/sections/BoothMapSection";
import ExhibitorsSection from "@/components/sections/ExhibitorsSection";
// 協賛セクションは一時的に非表示。復活させるときはこの import と
// TRACKED_SECTIONS・JSX・NavBar の navItems のコメントアウトを戻す。
// import SponsorsSection from "@/components/sections/SponsorsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// GA4 の view_section 用。id は各 <section> の id、name は見出しに合わせた表示名。
const TRACKED_SECTIONS: { id: string; name: string }[] = [
  { id: "hero", name: "トップ" },
  { id: "event-info", name: "イベント情報" },
  { id: "booth-map", name: "ブースマップ" },
  { id: "exhibitors", name: "出店紹介" },
  // { id: "sponsors", name: "協賛" }, // 協賛セクション非表示中
  { id: "faq", name: "よくある質問" },
  { id: "contact", name: "お問い合わせ" },
];

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // セクション閲覧の計測。各セクションが初めて画面に入ったら1回だけ送り、
  // 以降は監視を外す（スクロールで行き来しても二重計上しない）。
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const section = TRACKED_SECTIONS.find((s) => s.id === el.id);
          if (section) trackSectionView(section);
          observer.unobserve(el);
        });
      },
      { threshold: 0.3 }
    );
    TRACKED_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      <NavBar />
      <HeroSection />
      <EventInfoSection />
      <BoothMapSection />
      <ExhibitorsSection />
      {/* <SponsorsSection /> 協賛セクション非表示中 */}
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
