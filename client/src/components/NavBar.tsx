/**
 * NavBar — 常時濃緑のスティッキーナビ
 * Design: Tropical Fiesta
 */
import { asset } from "@/lib/asset";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "イベント情報", href: "#event-info" },
  { label: "ブースマップ", href: "#booth-map" },
  { label: "出店紹介", href: "#exhibitors" },
  { label: "協賛", href: "#sponsors" },
  { label: "よくある質問", href: "#faq" },
  { label: "お問い合わせ", href: "#contact" },
];

export default function NavBar() {
  return (
    <header
      /*
        背景はブースマップ・お問い合わせと同じジャングルダーク。最上部でも
        透明にはせず常に敷くので、文字とアイコンは白で通せる。
      */
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--jungle-dark)]/95 backdrop-blur-md shadow-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          {/*
            イベントアイコン（円形バッジ）。元画像は透過を持たない正方形で、
            四隅の白がヘッダー・フッターの濃緑上で出てしまうため
            rounded-full で円形にクリップする。
          */}
          <img
            src={asset("images/logo-event-144.png")}
            alt="BOTANI CARNIVAL"
            width={144}
            height={144}
            className="w-10 h-10 object-contain rounded-full"
          />
          <div className="leading-tight text-white">
            <div className="font-display font-bold text-sm tracking-[0.15em]">BOTANI</div>
            <div className="font-display font-bold text-sm tracking-[0.15em]">CARNIVAL</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white transition-colors duration-200 hover:text-[oklch(0.72_0.18_55)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger（shadcn/ui Sheet） */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="md:hidden p-2 text-white"
              aria-label="メニューを開く"
            >
              <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
              <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
              <div className="w-6 h-0.5 bg-current transition-all" />
            </button>
          </SheetTrigger>
          {/*
            text-white はここで指定する。shadcn の閉じるボタン(X)は
            currentColor を継承するので、濃背景では白にしないと見えなくなる。
          */}
          <SheetContent
            side="right"
            className="w-64 bg-[var(--jungle-dark)] text-white border-white/15"
          >
            <SheetHeader>
              <SheetTitle className="font-display font-bold tracking-[0.2em] text-white">
                MENU
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col px-2">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a
                    href={item.href}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-white hover:bg-white/10 hover:text-[oklch(0.72_0.18_55)] transition-colors"
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
