import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "QuickBite — Great food. Better journeys.",
  description:
    "QuickBite rethinks food delivery through thoughtful design, smarter order orchestration and a clearer customer experience.",
  metadataBase: new URL("https://quickbite.local"),
  openGraph: {
    title: "QuickBite — Great food. Better journeys.",
    description:
      "A customer-centered food delivery and order orchestration concept.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
