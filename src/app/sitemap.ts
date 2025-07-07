import { NextResponse } from "next/server";
import { getAllCaseStudies } from "@/lib/sanity";

export async function GET() {
  const base = "https://airstudio.work";
  const staticPages = ["", "#about", "#contact"].map((p) => `${base}/${p}`);
  const cases = await getAllCaseStudies();
  const caseUrls = cases.map((c) => `${base}/${c.slug.current}`);
  const urls = [...staticPages, ...caseUrls]
    .map((url) => `<url><loc>${url}</loc><changefreq>monthly</changefreq></url>`)  
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
} 