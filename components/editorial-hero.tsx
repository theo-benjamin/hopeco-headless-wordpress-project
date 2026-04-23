import Link from "next/link";

import type { HeroContent } from "@/lib/types";

type EditorialHeroProps = {
  hero: HeroContent;
};

export function EditorialHero({ hero }: EditorialHeroProps) {
  return (
    <section className="editorial-section editorial-hero" id="mission">
      <div className="section-label">Strong &quot;Why&quot;, large tap targets, prominent media</div>

      <div className="hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>
          {hero.titleIntro}
          <span>{hero.titleHighlight}</span>
        </h1>
        <p className="hero-description">{hero.description}</p>

        <div className="hero-actions">
          <Link className="button button-secondary" href={hero.primaryCta.url}>
            {hero.primaryCta.label}
          </Link>
          <Link className="button button-outline" href={hero.secondaryCta.url}>
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="hero-media" aria-label={hero.mediaLabel}>
        <div className="hero-media-play" aria-hidden="true">
          <span />
        </div>
        <p className="hero-media-caption">{hero.mediaUrl}</p>
      </div>
    </section>
  );
}

