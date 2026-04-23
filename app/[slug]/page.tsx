import { notFound } from "next/navigation";

import { PageHero } from "@/components/page-hero";
import { SiteHeader } from "@/components/site-header";
import { fetchPageBySlug, fetchPageSlugs } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchPageSlugs();

  return slugs.map((slug) => ({ slug }));
}

export default async function PageEntry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="shell">
      <SiteHeader
        title="Hopeco Headless Starter"
        description="Example page rendered from WordPress page data and ACF fields."
      />
      <PageHero page={page} />
    </main>
  );
}

