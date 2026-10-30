import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function ClosingCTA() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="container-content">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/15 px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "radial-gradient(50% 60% at 50% 0%, rgba(244,119,56,0.14) 0%, transparent 62%), radial-gradient(45% 55% at 12% 100%, rgba(62,150,145,0.14) 0%, transparent 64%)",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-[2.6rem]">
                Every order deserves a better journey.
              </h2>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-white/70">
                Explore how QuickBite brings customer-centered design and food
                delivery orchestration together.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#journey" className="btn-primary">
                  Ride the Journey Again
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#how-it-works" className="btn-ghost">
                  See How It Works
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
