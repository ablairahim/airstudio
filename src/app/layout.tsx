import type { Metadata } from "next";
import { Manrope, Funnel_Display } from "next/font/google";
import "./globals.css";
import "../styles/responsive-typography.css";
import { ConditionalLayout } from '../components/ConditionalLayout';

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
});

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "AirStudio | UX/UI Design & Product Development",
  description: "Professional UX/UI design services and product development solutions",
  keywords: "UX design, UI design, product development, web design",
  robots: "index, follow",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${funnelDisplay.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
