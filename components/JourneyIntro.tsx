import { Bike, CheckCircle2, Clock3, MapPinned } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function JourneyIntro() {
  return (
    <section
      id="journey"
      className="scroll-mt-24 pt-16 pb-10 sm:pt-24 lg:pt-28"
    >
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Bike className="h-3.5 w-3.5" />
            Delivery experience
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Built for confidence from checkout to doorstep.
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-white/75">
            QuickBite focuses on the parts customers actually feel: honest availability,
            timely updates, and a delivery flow that stays readable from start to finish.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Reveal className="rounded-2xl border border-white/12 bg-white/[0.04] p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-tangerine-400/15 text-tangerine-300">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-white">Clear availability</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Menus reflect what can actually be fulfilled, so customers are not surprised later.
            </p>
          </Reveal>

          <Reveal className="rounded-2xl border border-white/12 bg-white/[0.04] p-6" delay={0.08}>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-turquoise-400/15 text-turquoise-300">
              <Clock3 className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-white">Meaningful updates</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Each stage communicates real progress instead of generic waiting states.
            </p>
          </Reveal>

          <Reveal className="rounded-2xl border border-white/12 bg-white/[0.04] p-6" delay={0.16}>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white/80">
              <MapPinned className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-white">Joined-up routing</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Ordering, payment, preparation, and delivery feel like one connected system.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
