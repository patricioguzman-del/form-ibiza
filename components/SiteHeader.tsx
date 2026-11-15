"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { localizePath, parsePublicPath } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { LanguageSwitch } from "./LanguageSwitch";
import { Wordmark } from "./Wordmark";
import { getMenuItems } from "./nav";

/** How far down the page before the slim bar may appear (the full header is 120px tall). */
const SLIM_BAR_AFTER = 160;

function MenuButton({
  label,
  onClick,
  buttonRef,
}: {
  label: string;
  onClick: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className="t-label flex min-h-[44px] min-w-[44px] cursor-pointer items-center gap-[14px] border-0 bg-transparent p-0 text-ink"
    >
      <span aria-hidden="true" className="flex flex-col gap-[6px]">
        <span className="block h-px w-[30px] bg-ink" />
        <span className="block h-px w-[30px] bg-ink" />
      </span>
      <span className="hidden md:inline">{label}</span>
      <span className="sr-only md:hidden">{label}</span>
    </button>
  );
}

function HomeLink({ lang, label, onClick }: { lang: Locale; label: string; onClick?: () => void }) {
  return (
    <Link href={localizePath("/", lang)} aria-label={label} onClick={onClick} className="text-ink no-underline">
      <Wordmark />
    </Link>
  );
}

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname() || "/";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [slimVisible, setSlimVisible] = useState(false);

  const items = getMenuItems(dict);
  const currentPath = parsePublicPath(pathname).canonicalPath;
  const isCurrent = (path: string) => (path === "/" ? currentPath === "/" : currentPath.startsWith(path));

  const openMenu = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("menu-open");
    }
  }, []);

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Unlock scrolling however the menu closes (button, Escape key, link).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => document.documentElement.classList.remove("menu-open");
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("close", onClose);
      document.documentElement.classList.remove("menu-open");
    };
  }, []);

  // Close the menu when the page changes.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  // The slim bar appears when the visitor scrolls up, and goes away when they scroll down or reach the top.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y <= SLIM_BAR_AFTER) {
        setSlimVisible(false);
      } else if (y < lastY - 4) {
        setSlimVisible(true);
      } else if (y > lastY + 4) {
        setSlimVisible(false);
      }
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* The full header: 120px on desktop, 72px on phones. It scrolls away with the page. */}
      <header className="column grid min-h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-3 md:min-h-[120px] md:gap-6">
        <div className="flex justify-start">
          <MenuButton label={dict.menu.open} onClick={openMenu} />
        </div>
        <HomeLink lang={lang} label={dict.homeLabel} />
        <LanguageSwitch lang={lang} label={dict.languageNav} names={dict.languageNames} />
      </header>

      {/* The slim bar: 64px, paper, wordmark + Menu + EN / ES. Appears on scroll up. Opacity only. */}
      <div
        aria-hidden={!slimVisible}
        // `inert` removes the hidden bar from keyboard and screen-reader use.
        inert={!slimVisible}
        className={`fixed inset-x-0 top-0 z-30 border-b border-rule bg-paper transition-[opacity,visibility] duration-[400ms] ease-in-out ${
          slimVisible ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="column grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
          <div className="flex justify-start">
            <MenuButton label={dict.menu.open} onClick={openMenu} />
          </div>
          <HomeLink lang={lang} label={dict.homeLabel} />
          <LanguageSwitch lang={lang} label={dict.languageNav} names={dict.languageNames} />
        </div>
      </div>

      {/* The menu: a full-screen paper sheet with a short list of italic links. */}
      <dialog
        ref={dialogRef}
        aria-label={dict.menu.title}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-y-auto border-0 bg-paper p-0 text-ink backdrop:bg-transparent open:animate-[menu-fade_0.4s_ease-in-out]"
      >
        <div className="flex min-h-full flex-col">
          <div className="column grid min-h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-3 md:min-h-[120px] md:gap-6">
            <div className="flex justify-start">
              <button
                type="button"
                onClick={closeMenu}
                className="t-label flex min-h-[44px] min-w-[44px] cursor-pointer items-center border-0 bg-transparent p-0 text-ink"
              >
                {dict.menu.close}
              </button>
            </div>
            <HomeLink lang={lang} label={dict.homeLabel} onClick={closeMenu} />
            <LanguageSwitch lang={lang} label={dict.languageNav} names={dict.languageNames} />
          </div>

          <nav aria-label={dict.menu.title} className="column flex flex-1 flex-col items-center justify-center py-s5">
            <ul className="m-0 flex list-none flex-col items-center gap-s1 p-0 text-center">
              {items.map((item) => {
                const current = isCurrent(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      href={localizePath(item.path, lang)}
                      onClick={closeMenu}
                      aria-current={current ? "page" : undefined}
                      className={`inline-flex min-h-[44px] items-center font-heading text-[26px] italic leading-[1.45] tracking-[0.03em] no-underline ${
                        current ? "text-accent hover:text-accent" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="m-0 mt-s5 flex list-none flex-col items-center gap-0 p-0 text-center">
              <li>
                <Link
                  href={localizePath("/private-office", lang)}
                  onClick={closeMenu}
                  aria-current={isCurrent("/private-office") ? "page" : undefined}
                  className="t-ui inline-flex min-h-[44px] items-center underline decoration-1 underline-offset-[6px]"
                >
                  {dict.menuExtras.privateOffice}
                </Link>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-ui inline-flex min-h-[44px] items-center underline decoration-1 underline-offset-[6px]"
                >
                  {dict.menuExtras.instagram}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
