import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { ORDER_STEPS } from "@/lib/site";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            The order journey, end to end
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-white/70">
            QuickBite treats an order as one continuous journey rather than a set
            of disconnected steps.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {ORDER_STEPS.map((step, index) => (
            <Reveal
              key={step.title}
              as="li"
              delay={index * 0.07}
              className="h-full"
            >
              <div className="relative flex h-full flex-col rounded-2xl border border-white/15 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-tangerine-300/60">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-tangerine-400/15 text-tangerine-300">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span className="mt-5 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-bold leading-snug text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
