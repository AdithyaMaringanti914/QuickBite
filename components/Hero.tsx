"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Compass, Radar, ShieldCheck, Sparkles } from "lucide-react";

const HIGHLIGHTS = [
  { label: "Order orchestration", value: "One coherent flow" },
  { label: "Availability", value: "Checked, not assumed" },
  { label: "Customer clarity", value: "Meaningful updates" },
];

const SHOWCASE = [
  {
    icon: Radar,
    title: "Live order visibility",
    body: "Customers, restaurants, and delivery flow stay aligned through one clear status model.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable fulfillment",
    body: "Availability, payment, and routing are handled as one joined experience instead of isolated steps.",
  },
  {
    icon: Sparkles,
    title: "Calmer product design",
    body: "The interface focuses on clarity, trust, and steady feedback rather than noisy delivery mechanics.",
  },
] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.08,
        delayChildren: reduced ? 0 : 0.05,
      },
    },
  };

  const item: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(48% 42% at 82% 6%, rgba(244,119,56,0.16) 0%, transparent 60%), radial-gradient(42% 38% at 6% 30%, rgba(62,150,145,0.16) 0%, transparent 62%)",
        }}
      />

      <div className="container-content relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="eyebrow">
            <Compass className="h-3.5 w-3.5" />
            Food delivery, rethought
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-[4.1rem]"
          >
            Great food.
            <br />
            <span className="text-tangerine-400">Better journeys.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/70 sm:text-lg"
          >
            Rethinking food delivery through thoughtful design, smarter order
            orchestration, and a clearer customer experience.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a href="#journey" className="btn-primary">
              Experience the Journey
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#technology" className="btn-ghost">
              Explore the Technology
            </a>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-12 grid max-w-xl grid-cols-1 gap-x-8 gap-y-5 border-t border-white/15 pt-8 sm:grid-cols-3"
          >
            {HIGHLIGHTS.map((entry) => (
              <div key={entry.label}>
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/50">
                  {entry.label}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold text-white">
                  {entry.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="relative rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8"
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduced ? 0 : 0.8,
            delay: reduced ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="eyebrow">What makes QuickBite feel better</span>
          <h2 className="mt-5 max-w-md text-2xl font-bold leading-tight text-white sm:text-3xl">
            A clearer delivery product, not another noisy rider demo.
          </h2>
          <div className="mt-8 space-y-4">
            {SHOWCASE.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-white/12 bg-charcoal-900/45 p-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/8 text-tangerine-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
