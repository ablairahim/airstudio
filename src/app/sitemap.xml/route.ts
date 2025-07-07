import { NextResponse } from "next/server";
import { getAllCaseStudies } from "@/lib/sanity";

export async function GET() {
  const base = "https://airstudio.work";
  const today = new Date().toISOString().split('T')[0];

  // Static pages with priorities and frequencies
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" },
    { url: "#about", priority: "0.8", changefreq: "weekly" },
    { url: "#contact", priority: "0.8", changefreq: "weekly" },
    { url: "#work", priority: "0.9", changefreq: "daily" },
    { url: "#benefits", priority: "0.7", changefreq: "monthly" }
  ].map(p => ({
    loc: `${base}/${p.url}`,
    priority: p.priority,
    lastmod: today,
    changefreq: p.changefreq
  }));

  // Case studies with higher priority
  const cases = await getAllCaseStudies();
  const caseUrls = cases.map(c => ({
    loc: `${base}/${c.slug.current}`,
    priority: "0.9",
    lastmod: today,
    changefreq: "weekly"
  }));

  const urls = [...staticPages, ...caseUrls]
    .map(({ loc, priority, lastmod, changefreq }) => 
      `<url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset \n  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"\n  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 \n                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"\n>${urls}</urlset>`;

  return new NextResponse(xml, { 
    headers: { 
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
    } 
  });
} 