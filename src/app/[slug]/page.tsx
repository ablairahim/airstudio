"use client";

import { getCaseStudyBySlug } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const caseStudy = await getCaseStudyBySlug(params.slug);
  if (!caseStudy) return {};
  return {
    title: `${caseStudy.title} – Ablai Rakhimbekov`,
    description: caseStudy.summary,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      url: `https://airstudio.work/${params.slug}`,
      images: [caseStudy.cover?.asset.url].filter(Boolean),
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const data = await getCaseStudyBySlug(params.slug);
  if (!data) notFound();

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <article>
        <header style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: "2.25rem", lineHeight: 1.1 }}>{data.title}</h1>
          {data.summary && <p style={{ maxWidth: 640 }}>{data.summary}</p>}
          {data.cover?.asset?.url && (
            <Image
              src={`${data.cover.asset.url}?w=1200&auto=format`}
              alt={data.cover.alt || data.title}
              width={1200}
              height={700}
              style={{ width: "100%", height: "auto", marginTop: 24, borderRadius: 16 }}
              priority
            />
          )}
        </header>

        {/* Simple render of Portable Text blocks that are paragraphs/images/videos */}
        {data.content?.map((block, i) => {
          if (block._type === "textSection" && block.text) {
            return (
              <section key={i} style={{ marginBottom: 32 }}>
                {block.heading && <h2>{block.heading}</h2>}
                {block.text.map((pt: any, idx: number) => (
                  <p key={idx}>{pt.children?.[0]?.text}</p>
                ))}
              </section>
            );
          }
          if (block._type === "imageBlock") {
            return (
              <figure key={i} style={{ marginBottom: 32 }}>
                <Image
                  src={`${block.image.asset.url}?w=1200&auto=format`}
                  alt={block.image.alt || "Project image"}
                  width={1200}
                  height={700}
                  loading="lazy"
                  style={{ width: "100%", height: "auto", borderRadius: 16 }}
                />
              </figure>
            );
          }
          if (block._type === "videoBlock" && block.video?.asset?.url) {
            return (
              <figure key={i} style={{ marginBottom: 32 }}>
                <video
                  src={block.video.asset.url}
                  controls
                  poster={block.poster?.asset?.url}
                  style={{ width: "100%", height: "auto", borderRadius: 16 }}
                />
              </figure>
            );
          }
          return null;
        })}

        <footer style={{ marginTop: 48 }}>
          <Link href="/">← Back to work</Link>
        </footer>
      </article>
    </main>
  );
} 