"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-charcoal-900/85"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-content flex h-16 items-center justify-between sm:h-[4.5rem]"
      >
        <a
          href="#home"
          className="group flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tangerine-400 focus-visible:ring-offset-2"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-tangerine-400 text-white shadow-soft transition-transform duration-300 group-hover:-rotate-6">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="M4.6 15.4c1.7 2.3 5.9 3.6 9.3 2.1 3.7-1.6 5.6-5.6 4.4-8.6-.2-.5-.8-.7-1.2-.4l-3.5 2.2-2.4-.9-.9-2.4 2.2-3.5c.3-.5 0-1.1-.5-1.3-3-1-6.9.9-8.4 4.6-1.2 3 .3 6.4 2 8.2Z"
                fill="currentColor"
              />
              <circle cx="8.1" cy="13.4" r="1.05" fill="#F47738" />
            </svg>
          </span>
          <span className="text-[1.05rem] font-bold tracking-tight text-white">
            Quick<span className="text-tangerine-400">Bite</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tangerine-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#journey" className="btn-primary hidden sm:inline-flex">
            Explore QuickBite
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/10 bg-charcoal-900/95 transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-content flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-[0.95rem] font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-1">
            <a
              href="#journey"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Explore QuickBite
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
