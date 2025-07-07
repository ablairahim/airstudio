import { getAllCaseStudies } from "@/lib/sanity";

export default async function generateStaticParams() {
  const data = await getAllCaseStudies();
  return data.map((c) => ({ slug: c.slug.current }));
} 