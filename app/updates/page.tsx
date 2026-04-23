import Link from "next/link";

import { fetchPosts } from "@/lib/wordpress";
import { formatDateShort, stripHtml } from "@/lib/utils";

export const revalidate = 60;

export default async function UpdatesPage() {
  const posts = await fetchPosts();

  return (
    <main className="shell">
      <section className="article article-intro">
        <p className="eyebrow">Editorial Feed</p>
        <h1>Latest Updates</h1>
        <p className="lede">
          Published posts from WordPress, available to the homepage feed and the
          full archive.
        </p>
      </section>

      <section className="updates-archive">
        {posts.map((post) => (
          <article className="archive-card" key={post.id}>
            <p className="update-meta">
              {post.category.toUpperCase()} · {formatDateShort(post.date)}
            </p>
            <h2>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{stripHtml(post.excerpt)}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
