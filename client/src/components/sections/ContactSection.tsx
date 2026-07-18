/**
 * ContactSection — お問い合わせ（Instagram DM誘導）
 * Design: Tropical Fiesta — ジャングルダーク背景
 */
export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-4"
      style={{ backgroundColor: "oklch(0.18 0.05 145)" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Section header */}
        <div className="mb-12 reveal">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-2xl">📩</span>
            <span className="text-sm font-bold tracking-widest text-[oklch(0.80_0.16_85)] uppercase">Contact</span>
            <span className="text-2xl">📩</span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            お問い合わせ
          </h2>
          <div className="w-16 h-1 bg-[oklch(0.80_0.16_85)] mx-auto mt-4 rounded-full" />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 reveal">
          <p className="text-white/80 leading-relaxed mb-8 text-base">
            イベントに関するご質問・出店のご相談など、<br />
            お気軽に主催者のInstagramまでDMをお送りください。
          </p>

          {/* Instagram profile card */}
          <div className="bg-white/10 rounded-2xl p-6 mb-8 flex items-center gap-4 text-left">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.60 0.22 0), oklch(0.55 0.18 300))" }}
            >
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <div>
              <div className="text-white font-bold text-lg">@tanikunchu</div>
              <div className="text-white/50 text-sm">BOTANI CARNIVAL 主催者</div>
            </div>
          </div>

          <a
            href="https://www.instagram.com/tanikunchu/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[oklch(0.72_0.18_55)] via-[oklch(0.60_0.22_0)] to-[oklch(0.55_0.18_300)] text-white font-bold px-8 py-4 rounded-full text-base shadow-xl hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram DMを送る
          </a>

          <p className="text-white/30 text-xs mt-6">
            ※ お返事にはお時間をいただく場合がございます。ご了承ください。
          </p>
        </div>
      </div>
    </section>
  );
}

