/**
 * Single source of truth for QuickBite site content.
 * Only copy that is genuinely supported by the project is kept here.
 */

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "The Journey", href: "#journey" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Technology", href: "#technology" },
  { label: "About", href: "#about" },
] as const;

/**
 * The cinematic journey is rendered from frames extracted directly from the
 * supplied delivery-rider video (1920x1080, 24 FPS, ~9.96s, 239 source frames).
 *
 * Frames were sampled uniformly at 15 FPS and written to /public/quickbite-frames.
 */
export const JOURNEY = {
  videoSrc: "/videos/quickbite-delivery.mp4",
  posterSrc: "/quickbite-poster.jpg",
  frameDir: "/quickbite-frames",
  framePrefix: "frame_",
  frameExtension: ".webp",
  framePad: 3,
  /** Actual number of frames produced from the source video. */
  frameCount: 149,
  /** Source video aspect ratio (1920 x 1080). */
  aspect: 16 / 9,
} as const;

export const ORDER_STEPS = [
  {
    title: "A customer places an order",
    body: "The customer builds a basket from the visible menu and confirms delivery details.",
  },
  {
    title: "Availability is checked",
    body: "Requested items are validated against current availability so the basket stays honest.",
  },
  {
    title: "Payment is processed",
    body: "The order and its payment flow through a defined transaction path with clear states.",
  },
  {
    title: "Preparation is coordinated",
    body: "Restaurant preparation and delivery progress are tracked as one continuous workflow.",
  },
  {
    title: "The customer is kept informed",
    body: "Meaningful updates are surfaced across the order journey instead of silence.",
  },
] as const;

export const CAPABILITIES = [
  {
    title: "Demand-aware ordering",
    body: "Designed around customer needs and order demand rather than a static menu flow.",
    accent: "tangerine" as const,
  },
  {
    title: "Availability coordination",
    body: "A design focus on accurate item availability and inventory coordination.",
    accent: "turquoise" as const,
  },
  {
    title: "Reliable payment flows",
    body: "A focus on clear payment processing and appropriate order-state handling.",
    accent: "charcoal" as const,
  },
  {
    title: "Transparent order tracking",
    body: "A focus on providing meaningful updates across the customer's order journey.",
    accent: "beige" as const,
  },
] as const;

export const ARCHITECTURE_NODES = [
  { id: "customer", label: "Customer interface", note: "Ordering experience" },
  { id: "gateway", label: "API entry point", note: "Requests enter here" },
  { id: "orchestration", label: "Order orchestration", note: "State and sequencing" },
  { id: "inventory", label: "Inventory & availability", note: "Item truth" },
  { id: "payment", label: "Payment processing", note: "Transaction handling" },
  { id: "fulfilment", label: "Restaurant fulfilment", note: "Preparation workflow" },
  { id: "tracking", label: "Delivery & tracking", note: "Live order status" },
] as const;

/**
 * Design thinking is grounded in the project's own research method:
 * 28 survey responses, empathy mapping, personas and customer journey mapping.
 * No survey results, quotes or percentages are invented here.
 */
export const DESIGN_THINKING = [
  {
    step: "01",
    title: "User research",
    body: "28 survey responses collected around ordering habits and delivery expectations.",
  },
  {
    step: "02",
    title: "Empathy mapping",
    body: "Responses organised into what customers say, think, do and feel.",
  },
  {
    step: "03",
    title: "Personas",
    body: "Personas derived from the mapped patterns to keep decisions customer-anchored.",
  },
  {
    step: "04",
    title: "Customer journey map",
    body: "The order journey mapped end-to-end to expose where clarity breaks down.",
  },
  {
    step: "05",
    title: "Proposed system",
    body: "Insights translated into the ordering, availability and tracking concept.",
  },
] as const;
