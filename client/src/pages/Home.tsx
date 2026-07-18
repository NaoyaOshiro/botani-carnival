/**
 * BOTANI CARNIVAL 特設サイト
 * Design: Tropical Fiesta — メキシカン・フィエスタ × トロピカル・ジャングル × ヴィンテージ・フェスティバル
 * Colors: Carnival Green, Fiesta Orange, Magenta Bloom, Gold Accent, Jungle Dark, Sand Base
 * Fonts: Pacifico (display), Noto Serif JP (JP headings), Noto Sans JP (body)
 */
import { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import EventInfoSection from "@/components/sections/EventInfoSection";
import BoothMapSection from "@/components/sections/BoothMapSection";
import ExhibitorsSection from "@/components/sections/ExhibitorsSection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

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

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      <NavBar />
      <HeroSection />
      <EventInfoSection />
      <BoothMapSection />
      <ExhibitorsSection />
      <SponsorsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
