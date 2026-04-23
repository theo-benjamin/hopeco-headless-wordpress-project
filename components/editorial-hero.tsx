import { ButtonLink } from "@/components/button-link";
import type { HeroContent } from "@/lib/types";

type EditorialHeroProps = {
  hero: HeroContent;
};

export function EditorialHero({ hero }: EditorialHeroProps) {
  return (
    <section className="editorial-section editorial-hero" id="mission">
      <div className="section-label">Mission</div>

      <div className="hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className="hero-title">
          <span className="hero-title-intro">{hero.titleIntro}</span>
          <span className="hero-title-highlight">{hero.titleHighlight}</span>
        </h1>
        <p className="hero-description">{hero.description}</p>

        <div className="hero-actions">
          <ButtonLink href={hero.primaryCta.url} variant="dark">
            {hero.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={hero.secondaryCta.url} variant="outline">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>

        <div className="hero-assurance-row" aria-label="Organizational principles">
          <span>Evidence-led</span>
          <span>Human-centered</span>
          <span>Accessible by default</span>
        </div>
      </div>

      <div className="hero-media" aria-label={hero.mediaLabel}>
        <div className="hero-media-frame">
          <div className="hero-media-play" aria-hidden="true">
            <span />
          </div>
          <p className="hero-media-kicker">{hero.mediaLabel}</p>
        </div>
        <p className="hero-media-caption">{hero.mediaUrl}</p>
      </div>
    </section>
  );
}
