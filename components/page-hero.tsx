import Image from "next/image";
import Link from "next/link";

import type { PageContent } from "@/lib/types";

type PageHeroProps = {
  page: PageContent;
};

export function PageHero({ page }: PageHeroProps) {
  const heading = page.heroTitle ?? page.title;

  return (
    <section className="hero-panel page-hero">
      <div className="page-hero-copy">
        <p className="eyebrow">Page / {page.slug}</p>
        <h1>{heading}</h1>
        <p className="lede">
          {page.heroText ?? "Add hero copy in WordPress to customize this panel."}
        </p>

        <div dangerouslySetInnerHTML={{ __html: page.content }} />

        {page.ctaLabel && page.ctaUrl ? (
          <div className="hero-actions">
            <Link className="button button-primary" href={page.ctaUrl}>
              {page.ctaLabel}
            </Link>
          </div>
        ) : null}
      </div>

      <div className="page-hero-image-wrap">
        {page.heroImage ? (
          <Image
            alt={page.heroImage.altText || heading}
            className="page-hero-image"
            height={960}
            src={page.heroImage.sourceUrl}
            width={960}
          />
        ) : null}
      </div>
    </section>
  );
}

