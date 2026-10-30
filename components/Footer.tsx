import { NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="container-content grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-tangerine-400 text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M4.6 15.4c1.7 2.3 5.9 3.6 9.3 2.1 3.7-1.6 5.6-5.6 4.4-8.6-.2-.5-.8-.7-1.2-.4l-3.5 2.2-2.4-.9-.9-2.4 2.2-3.5c.3-.5 0-1.1-.5-1.3-3-1-6.9.9-8.4 4.6-1.2 3 .3 6.4 2 8.2Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="text-[1.05rem] font-bold tracking-tight text-white">
              Quick<span className="text-tangerine-400">Bite</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            A demand-driven food delivery and order orchestration concept,
            designed around primary customer research.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/45">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-tangerine-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/45">
            The journey
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            The delivery journey runs as the page background and is driven
            entirely by your scroll position — no autoplay, no looping.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} QuickBite — a design and engineering project.</p>
          <p>Built with Next.js, Tailwind CSS and Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
