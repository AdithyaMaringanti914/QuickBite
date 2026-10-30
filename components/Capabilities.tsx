import { Boxes, CreditCard, Radar, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import { CAPABILITIES } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  "Demand-aware ordering": ShoppingBag,
  "Availability coordination": Boxes,
  "Reliable payment flows": CreditCard,
  "Transparent order tracking": Radar,
};

const ACCENTS: Record<string, string> = {
  tangerine: "bg-tangerine-400/15 text-tangerine-300",
  turquoise: "bg-turquoise-400/15 text-turquoise-300",
  charcoal: "bg-white/10 text-white/80",
  beige: "bg-beige/15 text-beige",
};

export default function Capabilities() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Core capabilities</span>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            What QuickBite focuses on
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-white/70">
            Four areas shape the concept and the design decisions behind it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((item, index) => {
            const Icon = ICONS[item.title] ?? ShoppingBag;
            return (
              <Reveal key={item.title} delay={index * 0.08} className="h-full">
                <article className="card group h-full hover:-translate-y-1 hover:border-tangerine-300/60">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl ${ACCENTS[item.accent]} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-bold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
