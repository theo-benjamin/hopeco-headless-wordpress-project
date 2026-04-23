import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { fetchPostBySlug, fetchPostSlugs } from "@/lib/wordpress";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchPostSlugs();

  return slugs.map((slug) => ({ slug }));
}

export default async function PostEntry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="shell">
      <SiteHeader
        title="Journal"
        description="Published WordPress posts fetched through WPGraphQL."
      />

      <article className="article">
        <p className="eyebrow">{formatDate(post.date)}</p>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  );
}

