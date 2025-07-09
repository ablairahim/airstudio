import type { Metadata } from "next";
import { Manrope, Funnel_Display } from "next/font/google";
import "./globals.css";
import "../styles/responsive-typography.css";
import { ConditionalLayout } from '../components/ConditionalLayout';
import Script from 'next/script';

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
  description: "Professional UX/UI design services and product development solutions by Ablai Rakhimbekov",
  keywords: "UX design, UI design, product development, web design, digital design, Ablai Rakhimbekov",
  authors: [{ name: "Ablai Rakhimbekov" }],
  creator: "Ablai Rakhimbekov",
  publisher: "AirStudio",
  robots: "index, follow",
  icons: {
    icon: "/img/favicon.png",
    apple: "/img/favicon.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://airstudio.design'),
  openGraph: {
    title: "AirStudio | UX/UI Design & Product Development",
    description: "Professional UX/UI design services and product development solutions",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://airstudio.design',
    siteName: "AirStudio",
    type: 'website',
    images: [
      {
        url: "/img/OG.png",
        width: 1200,
        height: 630,
        alt: "AirStudio - UX/UI Design Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AirStudio | UX/UI Design & Product Development",
    description: "Professional UX/UI design services and product development solutions",
    images: ["/img/OG.png"],
  },
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
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/img/ablai.png" as="image" />
        <link rel="preload" href="/img/Logo_SVG-Black.svg" as="image" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="AirStudio" />
      </head>
      <body className={`${manrope.variable} ${funnelDisplay.variable}`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        
        {/* Performance monitoring script */}
        <Script
          id="performance-monitor"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Basic performance monitoring
              if (typeof window !== 'undefined' && '${process.env.NODE_ENV}' === 'production') {
                // Measure page load time
                window.addEventListener('load', () => {
                  const loadTime = performance.now();
                  console.log('Page load time:', loadTime);
                });
                
                // Preload critical resources
                const criticalImages = ['/img/ablai.png', '/img/Logo_SVG-Black.svg'];
                criticalImages.forEach(src => {
                  const link = document.createElement('link');
                  link.rel = 'preload';
                  link.as = 'image';
                  link.href = src;
                  document.head.appendChild(link);
                });
              }
            `
          }}
        />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `
              }}
            />
          </>
        )}
        
        {/* JSON-LD Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ablai Rakhimbekov",
              "jobTitle": "UX/UI Designer & Product Developer",
              "description": "Digital designer, creative technologist, and product builder with 5 years of experience designing brand systems, scalable products, and technical implementations.",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://airstudio.design",
              "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://airstudio.design"}/img/ablai.png`,
              "email": "hi@airstudio.work",
              "worksFor": {
                "@type": "Organization",
                "name": "AirStudio",
                "url": process.env.NEXT_PUBLIC_SITE_URL || "https://airstudio.design"
              },
              "knowsAbout": [
                "UX Design",
                "UI Design", 
                "Product Development",
                "Web Design",
                "Digital Design",
                "Brand Systems",
                "Creative Technology"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Design Education"
              },
              "award": "Gold recognition",
              "sameAs": [
                // Добавить links когда будут social media
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
