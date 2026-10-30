import { ArrowRight, Search, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import { DESIGN_THINKING } from "@/lib/site";

export default function DesignThinking() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-content">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">Design thinking</span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Designed around real frustrations
            </h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-white/70">
              QuickBite began with primary research rather than assumptions: 28
              survey responses were collected, then turned into empathy maps,
              personas and a mapped end-to-end customer journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80">
                <Users className="h-3.5 w-3.5 text-tangerine-300" />
                28 survey responses
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80">
                <Search className="h-3.5 w-3.5 text-turquoise-300" />
                Empathy mapping
              </span>
            </div>
          </Reveal>

          <ol className="relative space-y-5 border-l border-white/20 pl-8">
            {DESIGN_THINKING.map((item, index) => (
              <Reveal
                key={item.step}
                as="li"
                delay={index * 0.08}
                className="relative rounded-2xl border border-white/15 bg-white/[0.04] p-5 transition-all duration-300 hover:border-turquoise-300/60"
              >
                <span className="absolute -left-[2.6rem] top-6 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full border-2 border-charcoal-900 bg-turquoise-400 text-[0.6rem] font-bold text-white">
                  {item.step}
                </span>
                <h3 className="text-[0.95rem] font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {item.body}
                </p>
                {index < DESIGN_THINKING.length - 1 ? (
                  <ArrowRight className="absolute -bottom-4 left-5 h-4 w-4 rotate-90 text-white/30" />
                ) : null}
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
