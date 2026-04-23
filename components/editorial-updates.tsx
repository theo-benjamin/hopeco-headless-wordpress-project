import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import type { UpdatesContent } from "@/lib/types";
import { formatDateShort, stripHtml } from "@/lib/utils";

type EditorialUpdatesProps = {
  updates: UpdatesContent;
};

export function EditorialUpdates({ updates }: EditorialUpdatesProps) {
  return (
    <section className="editorial-section" id="resources">
      <div className="section-label">{updates.eyebrow}</div>

      <div className="updates-grid">
        <div className="updates-feed">
          <div className="updates-header">
            <div className="section-heading">
              <h2>{updates.heading}</h2>
              <p className="section-supporting">
                Timely reporting, public-interest programming, and calls to stay
                informed.
              </p>
            </div>
            <Link className="updates-view-all" href={updates.viewAll.url}>
              {updates.viewAll.label}
            </Link>
          </div>

          <div className="updates-list">
            {updates.posts.map((post) => (
              <article className="update-row" key={post.id}>
                <div className="update-thumb" aria-hidden="true" />
                <div className="update-copy">
                  <p className="update-meta">
                    {post.category.toUpperCase()} · {formatDateShort(post.date)}
                  </p>
                  <h3>
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{stripHtml(post.excerpt)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="newsletter-card">
          <p className="eyebrow">Newsletter</p>
          <h3>{updates.newsletterHeading}</h3>
          <p>{updates.newsletterDescription}</p>

          <form action="#" className="newsletter-form">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              className="newsletter-input"
              id="newsletter-email"
              name="email"
              placeholder={updates.newsletterPlaceholder}
              type="email"
            />
            <button className="button button-dark newsletter-button" type="submit">
              {updates.newsletterButtonLabel}
            </button>
          </form>

          <p className="newsletter-note">{updates.newsletterDisclaimer}</p>
          <ButtonLink className="newsletter-secondary-action" href={updates.viewAll.url} variant="secondary">
            Review latest coverage
          </ButtonLink>
        </aside>
      </div>
    </section>
  );
}
