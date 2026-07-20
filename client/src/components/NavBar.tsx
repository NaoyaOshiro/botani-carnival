/**
 * NavBar — スクロールで背景が変わるスティッキーナビ
 * Design: Tropical Fiesta
 */
import { useState, useEffect } from "react";

const navItems = [
  { label: "イベント情報", href: "#event-info" },
  { label: "会場マップ", href: "#booth-map" },
  { label: "出店業者", href: "#exhibitors" },
  { label: "協賛", href: "#sponsors" },
  { label: "よくある質問", href: "#faq" },
  { label: "お問い合わせ", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img
            src="/images/logo-mark_44fa6323.png"
            alt="BOTANI CARNIVAL"
            className="w-10 h-10 object-contain"
          />
          <div className={`leading-tight transition-colors duration-300 ${scrolled ? "text-[oklch(0.18_0.05_145)]" : "text-white"}`}>
            <div className="font-display text-sm">BOTANI</div>
            <div className="font-display text-sm">CARNIVAL</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-[oklch(0.72_0.18_55)] ${
                scrolled ? "text-[oklch(0.18_0.05_145)]" : "text-white drop-shadow"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 transition-colors ${scrolled ? "text-[oklch(0.18_0.05_145)]" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
          <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
          <div className="w-6 h-0.5 bg-current transition-all" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-[oklch(0.88_0.04_85)]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-6 py-3 text-sm font-medium text-[oklch(0.18_0.05_145)] hover:bg-[oklch(0.96_0.03_85)] hover:text-[oklch(0.42_0.16_145)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
