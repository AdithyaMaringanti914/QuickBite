"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { ARCHITECTURE_NODES } from "@/lib/site";

type Node = (typeof ARCHITECTURE_NODES)[number] & { x: number; y: number };

const LAYOUT: Record<string, { x: number; y: number }> = {
  customer: { x: 50, y: 9 },
  gateway: { x: 50, y: 31 },
  orchestration: { x: 50, y: 53 },
  inventory: { x: 15, y: 77 },
  payment: { x: 50, y: 77 },
  fulfilment: { x: 85, y: 77 },
  tracking: { x: 50, y: 93 },
};

const NODES: Node[] = ARCHITECTURE_NODES.map((node) => ({
  ...node,
  ...(LAYOUT[node.id] ?? { x: 50, y: 50 }),
}));

const LINKS: [string, string][] = [
  ["customer", "gateway"],
  ["gateway", "orchestration"],
  ["orchestration", "inventory"],
  ["orchestration", "payment"],
  ["orchestration", "fulfilment"],
  ["fulfilment", "tracking"],
  ["payment", "tracking"],
];

const byId = (id: string) => NODES.find((node) => node.id === id) as Node;

export default function Architecture() {
  const reduced = useReducedMotion();

  return (
    <section
      id="technology"
      className="scroll-mt-24 py-20 text-white sm:py-28"
    >
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <span className="eyebrow text-tangerine-300">Technology</span>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            How the concept connects
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-white/60">
            A customer-facing experience backed by an order orchestration flow.
            The diagram shows the components the concept builds on.
          </p>
        </Reveal>

        {/* Desktop / tablet diagram. */}
        <Reveal className="mt-14 hidden lg:block">
          <div className="relative h-[600px] w-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 stage-glow">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {LINKS.map(([from, to], index) => {
                const a = byId(from);
                const b = byId(to);
                return (
                  <motion.path
                    key={`${from}-${to}`}
                    d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
                    fill="none"
                    stroke="rgba(244,119,56,0.55)"
                    strokeWidth={1.25}
                    vectorEffect="non-scaling-stroke"
                    initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                    whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                );
              })}
            </svg>

            {NODES.map((node, index) => (
              // The outer element owns the centering transform; the animated
              // child owns the entrance transform. Keeping them separate stops
              // Framer Motion's inline transform from cancelling the centering.
              <div
                key={node.id}
                className="absolute w-[26%] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <motion.div
                  className="rounded-2xl border border-white/15 bg-charcoal-800/85 px-4 py-3 shadow-lift"
                  initial={reduced ? undefined : { opacity: 0, y: 12 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p className="text-[0.82rem] font-semibold leading-snug text-white">
                    {node.label}
                  </p>
                  <p className="mt-1 text-[0.68rem] leading-snug text-white/50">
                    {node.note}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Stacked variant for narrow screens. */}
        <ol className="mt-12 space-y-3 lg:hidden">
          {NODES.map((node, index) => (
            <Reveal
              key={node.id}
              as="li"
              delay={index * 0.05}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-tangerine-400/15 text-[0.7rem] font-bold text-tangerine-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">
                  {node.label}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-white/50">
                  {node.note}
                </span>
              </span>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-8 text-xs leading-relaxed text-white/40">
            Components shown describe the QuickBite concept build. They are not
            presented as a running production deployment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
