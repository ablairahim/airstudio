import { getCaseStudyBySlug } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = await getCaseStudyBySlug(params.slug);
  if (!caseStudy) return {};

  const ogImage = caseStudy.cover?.asset.url;
  
  return {
    title: `${caseStudy.title} – Ablai Rakhimbekov`,
    description: caseStudy.summary,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      url: `https://airstudio.work/${params.slug}`,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      type: "article",
      publishedTime: caseStudy._createdAt,
      modifiedTime: caseStudy._updatedAt,
      authors: ["Ablai Rakhimbekov"],
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.title,
      description: caseStudy.summary,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: `https://airstudio.work/${params.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const data = await getCaseStudyBySlug(params.slug);
  if (!data) notFound();

  // Structured data for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.summary,
    image: data.cover?.asset.url,
    datePublished: data._createdAt,
    dateModified: data._updatedAt,
    author: {
      "@type": "Person",
      name: "Ablai Rakhimbekov",
      url: "https://airstudio.work",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen p-10">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold leading-tight mb-4">{data.title}</h1>
            {data.summary && (
              <p className="text-xl text-gray-600 max-w-2xl">{data.summary}</p>
            )}
            {data.cover?.asset?.url && (
              <Image
                src={`${data.cover.asset.url}?auto=format&w=1200`}
                alt={data.cover.alt || data.title}
                width={1200}
                height={700}
                className="w-full h-auto mt-6 rounded-lg"
                priority
              />
            )}
          </header>

          {data.content?.map((block, i) => {
            if (block._type === "textSection" && block.text) {
              return (
                <section key={i} className="mb-8">
                  {block.heading && (
                    <h2 className="text-2xl font-semibold mb-4">{block.heading}</h2>
                  )}
                  {block.text.map((pt: any, idx: number) => (
                    <p key={idx} className="mb-4 text-lg">
                      {pt.children?.[0]?.text}
                    </p>
                  ))}
                </section>
              );
            }
            if (block._type === "imageBlock") {
              return (
                <figure key={i} className="mb-8">
                  <Image
                    src={`${block.image.asset.url}?auto=format&w=1200`}
                    alt={block.image.alt || "Project image"}
                    width={1200}
                    height={700}
                    loading="lazy"
                    className="w-full h-auto rounded-lg"
                  />
                </figure>
              );
            }
            if (block._type === "videoBlock" && block.video?.asset?.url) {
              return (
                <figure key={i} className="mb-8">
                  <video
                    src={block.video.asset.url}
                    controls
                    poster={block.poster?.asset?.url}
                    className="w-full h-auto rounded-lg"
                  />
                </figure>
              );
            }
            return null;
          })}

          <footer className="mt-12 border-t pt-8">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to work
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
} 