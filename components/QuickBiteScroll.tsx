"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { JOURNEY } from "@/lib/site";

const { frameCount, frameDir, framePrefix, frameExtension, framePad, posterSrc } =
  JOURNEY;

/** How many frames are fetched at the same time. */
const CONCURRENCY = 6;
/** Coarse stride used so the whole timeline becomes scrubbable quickly. */
const COARSE_STRIDE = 6;

const frameSrc = (index: number) =>
  `${frameDir}/${framePrefix}${String(index + 1).padStart(framePad, "0")}${frameExtension}`;

/**
 * Full-page background layer.
 *
 * The delivery-rider animation is painted onto a fixed canvas that sits behind
 * the entire document and is scrubbed by the page's own scroll position, so the
 * journey moves as the visitor reads. It never autoplays and never loops.
 */
export default function QuickBiteScroll() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const percentRef = useRef<HTMLSpanElement | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const framesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: frameCount }, () => null),
  );
  const readyRef = useRef<boolean[]>(Array.from({ length: frameCount }, () => false));
  const posterRef = useRef<HTMLImageElement | null>(null);

  const targetRef = useRef(0);
  const drawnRef = useRef(-1);
  const sizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(true);
  const loadedRef = useRef(0);
  const essentialRef = useRef(Math.ceil(frameCount / COARSE_STRIDE) + 1);

  /* ---------------------------------------------------------------- scroll */
  // Whole-document progress: the page itself is the timeline.
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    // Clamp to 0..1 so the timeline never overshoots or restarts.
    const progress = value < 0 ? 0 : value > 1 ? 1 : value;
    // Map normalized progress onto the real frame count of the source video.
    targetRef.current = Math.round(progress * (frameCount - 1));
  });

  /* ------------------------------------------------------------- rendering */
  /** Nearest already-decoded frame, so scrubbing never shows a blank gap. */
  const pickFrame = useCallback((index: number) => {
    if (readyRef.current[index]) return framesRef.current[index];
    for (let d = 1; d < frameCount; d += 1) {
      const after = index + d;
      const before = index - d;
      if (after < frameCount && readyRef.current[after]) return framesRef.current[after];
      if (before >= 0 && readyRef.current[before]) return framesRef.current[before];
    }
    return null;
  }, []);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const { w, h } = sizeRef.current;
      if (!ctx || !canvas || !w || !h) return;

      const image = pickFrame(index) ?? posterRef.current;
      ctx.clearRect(0, 0, w, h);
      if (!image) return;

      // Cover-fit: the frame always fills the viewport, centred so the rider,
      // scooter and parcel stay in view on every screen shape.
      const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight);
      const dw = image.naturalWidth * scale;
      const dh = image.naturalHeight * scale;
      ctx.drawImage(image, (w - dw) / 2, (h - dh) / 2, dw, dh);
    },
    [pickFrame],
  );

  /** Size the canvas to the viewport and device pixel ratio. */
  const applySize = useCallback(() => {
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    if (!layer || !canvas) return;

    const rect = layer.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    sizeRef.current = { w, h };

    // Force a repaint against the new dimensions.
    drawnRef.current = -1;
  }, []);

  /* ----------------------------------------------------------- paint loop */
  useEffect(() => {
    if (reducedMotion) return;

    const tick = () => {
      if (visibleRef.current && targetRef.current !== drawnRef.current) {
        drawFrame(targetRef.current);
        drawnRef.current = targetRef.current;
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [drawFrame, reducedMotion]);

  /* --------------------------------------------------- reduced-motion flag */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  /* ------------------------------------------------------ size + visibility */
  useEffect(() => {
    if (reducedMotion) return;

    applySize();
    window.addEventListener("resize", applySize);
    window.addEventListener("orientationchange", applySize);
    return () => {
      window.removeEventListener("resize", applySize);
      window.removeEventListener("orientationchange", applySize);
    };
  }, [applySize, reducedMotion]);

  // The layer is always on screen, so only pause painting for hidden tabs.
  useEffect(() => {
    if (reducedMotion) return;
    const onVisibility = () => {
      visibleRef.current = !document.hidden;
      if (!document.hidden) drawnRef.current = -1;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [reducedMotion]);

  /* ------------------------------------------------------------ frame load */
  const paintLoader = useCallback((ratio: number) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
    if (percentRef.current) {
      percentRef.current.textContent = `${Math.round(ratio * 100)}%`;
    }
  }, []);

  const hideLoader = useCallback(() => {
    const loader = loaderRef.current;
    if (!loader) return;
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let cursor = 0;
    let inFlight = 0;

    // Coarse pass first so the entire timeline is scrubbable early,
    // then everything in between, in chronological order.
    const order: number[] = [];
    for (let i = 0; i < frameCount; i += COARSE_STRIDE) order.push(i);
    if (order[order.length - 1] !== frameCount - 1) order.push(frameCount - 1);
    for (let i = 0; i < frameCount; i += 1) {
      if (order.indexOf(i) === -1) order.push(i);
    }

    // Opening frame doubles as the poster until real frames arrive.
    const poster = new Image();
    poster.decoding = "async";
    poster.onload = () => {
      if (cancelled) return;
      posterRef.current = poster;
      if (drawnRef.current === -1) drawnRef.current = -2;
    };
    poster.src = posterSrc;
    if (poster.complete && poster.naturalWidth > 0) {
      posterRef.current = poster;
    }

    const finish = () => {
      if (cancelled) return;
      if (loadedRef.current === 0) {
        setUnavailable(true);
        hideLoader();
      } else {
        paintLoader(1);
      }
    };

    const loadNext = () => {
      if (cancelled || cursor >= order.length) {
        if (!cancelled && inFlight === 0 && cursor >= order.length) finish();
        return;
      }

      const index = order[cursor];
      cursor += 1;
      inFlight += 1;

      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        if (cancelled) return;
        inFlight -= 1;
        readyRef.current[index] = true;
        framesRef.current[index] = image;
        loadedRef.current += 1;

        const ratio = loadedRef.current / frameCount;
        paintLoader(ratio);
        if (loadedRef.current >= essentialRef.current) hideLoader();

        // Repaint once so newly decoded detail appears immediately.
        if (targetRef.current === index) drawnRef.current = -1;
        loadNext();
      };
      image.onerror = () => {
        if (cancelled) return;
        inFlight -= 1;
        framesRef.current[index] = null;
        loadNext();
      };
      image.src = frameSrc(index);
    };

    for (let i = 0; i < CONCURRENCY; i += 1) loadNext();

    return () => {
      cancelled = true;
    };
  }, [hideLoader, paintLoader, reducedMotion]);

  /* --------------------------------------------------------------- markup */
  if (reducedMotion) {
    return (
      <div aria-hidden="true" className="fixed inset-0 z-0 bg-charcoal-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-900/55" />
      </div>
    );
  }

  return (
    <>
      <div
        ref={layerRef}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-charcoal-900"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Scroll-controlled animation of the QuickBite rider delivering an order to a customer's house."
          className="absolute inset-0 block h-full w-full"
        />

        {unavailable ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={posterSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        {/* Scrim keeps foreground text readable wherever it sits. */}
        <div aria-hidden="true" className="absolute inset-0 bg-charcoal-900/55" />
        <div aria-hidden="true" className="stage-glow absolute inset-0 opacity-30" />
      </div>

      {/* Loading state — hidden as soon as the timeline is scrubbable. */}
      <div
        ref={loaderRef}
        className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex flex-col items-center gap-2 transition-opacity duration-500"
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/70">
          Preparing the journey
        </span>
        <span className="relative block h-[3px] w-40 overflow-hidden rounded-full bg-white/20">
          <span
            ref={barRef}
            className="absolute inset-0 origin-left rounded-full bg-tangerine-400"
            style={{ transform: "scaleX(0)" }}
          />
        </span>
        <span ref={percentRef} className="text-[0.65rem] tabular-nums text-white/50">
          0%
        </span>
      </div>
    </>
  );
}
