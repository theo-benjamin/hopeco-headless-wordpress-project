import Link from "next/link";

import { ButtonLink } from "@/components/button-link";

const buttonVariants = [
  { label: "Primary", variant: "dark" as const },
  { label: "Secondary", variant: "secondary" as const },
  { label: "Outline", variant: "outline" as const },
  { label: "Filled Accent", variant: "primary" as const },
];

const swatches = [
  { name: "Canvas", token: "--color-canvas", className: "system-swatch-canvas" },
  { name: "Surface", token: "--color-surface", className: "system-swatch-surface" },
  { name: "Brand", token: "--color-brand", className: "system-swatch-brand" },
  { name: "Brand Strong", token: "--color-brand-strong", className: "system-swatch-brand-strong" },
  { name: "Ink", token: "--color-ink", className: "system-swatch-ink" },
  { name: "Border", token: "--color-border", className: "system-swatch-border" },
];

export default function DesignSystemPage() {
  return (
    <main className="design-shell">
      <section className="editorial-section system-hero">
        <div className="section-label">Design System</div>
        <div className="system-hero-copy">
          <p className="eyebrow">Institutional nonprofit</p>
          <h1 className="hero-title">
            <span className="hero-title-intro">A high-fidelity system</span>
            <span className="hero-title-highlight">for the Editorial Advocate.</span>
          </h1>
          <p className="hero-description">
            This reference surface captures the live tokens, components, and
            interaction patterns used by the wireframe-to-production homepage.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/" variant="dark">
              View homepage
            </ButtonLink>
            <ButtonLink href="/updates" variant="outline">
              Review content archive
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="section-label">Foundations</div>
        <div className="section-heading">
          <h2>Color and tone</h2>
          <p className="section-supporting">
            Warm civic neutrals, disciplined blue-green brand anchors, and
            strong editorial contrast.
          </p>
        </div>
        <div className="system-swatch-grid">
          {swatches.map((swatch) => (
            <article className="system-swatch-card" key={swatch.name}>
              <div className={`system-swatch ${swatch.className}`} />
              <h3>{swatch.name}</h3>
              <p>{swatch.token}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section">
        <div className="section-label">Typography</div>
        <div className="system-specimen-grid">
          <article className="system-card">
            <p className="eyebrow">Display</p>
            <h1 className="system-type-display">Advocacy with editorial clarity.</h1>
            <p>
              Display type is reserved for mission-critical messaging and
              campaign-level hierarchy.
            </p>
          </article>
          <article className="system-card">
            <p className="eyebrow">Hierarchy</p>
            <h2>Section title for program narratives</h2>
            <h3>Card title for tactical pathways</h3>
            <p className="system-body-copy">
              Body copy stays grounded, readable, and service-oriented.
            </p>
            <p className="update-meta">Metadata · Apr 23</p>
          </article>
        </div>
      </section>

      <section className="editorial-section">
        <div className="section-label">Actions</div>
        <div className="section-heading">
          <h2>Buttons and links</h2>
          <p className="section-supporting">
            CTA hierarchy supports urgency without overpowering the editorial
            tone.
          </p>
        </div>
        <div className="system-button-row">
          {buttonVariants.map((button) => (
            <ButtonLink href="/design-system" key={button.label} variant={button.variant}>
              {button.label}
            </ButtonLink>
          ))}
        </div>
        <div className="system-inline-links">
          <Link className="text-link" href="/updates">
            Read the archive
          </Link>
          <Link className="updates-view-all" href="/">
            Return to homepage
          </Link>
        </div>
      </section>

      <section className="editorial-section">
        <div className="section-label">Components</div>
        <div className="system-component-grid">
          <article className="pathway-card pathway-card-1">
            <div className="pathway-icon-wrap" aria-hidden="true">
              <span className="system-glyph">↗</span>
            </div>
            <h3>Pathway card</h3>
            <p>
              Reusable for support tracks, programs, and campaign entry points.
            </p>
            <Link className="text-link" href="/design-system">
              Learn more
            </Link>
          </article>

          <article className="impact-story-card system-card">
            <p className="impact-story-quote-mark" aria-hidden="true">
              &ldquo;
            </p>
            <blockquote>
              The system should feel trustworthy, warm, and institutionally
              credible at once.
            </blockquote>
            <div className="impact-story-person">
              <div className="impact-story-avatar impact-story-avatar-fallback" aria-hidden="true">
                DS
              </div>
              <div>
                <p className="impact-story-name">Design principle</p>
                <p className="impact-story-role">Narrative + service alignment</p>
              </div>
            </div>
          </article>

          <aside className="newsletter-card">
            <p className="eyebrow">Form system</p>
            <h3>Newsletter pattern</h3>
            <p>Inputs use high-contrast surfaces with calm but visible borders.</p>
            <form action="#" className="newsletter-form">
              <label className="sr-only" htmlFor="system-email">
                Email address
              </label>
              <input
                className="newsletter-input"
                id="system-email"
                placeholder="Email address"
                type="email"
              />
              <button className="button button-dark newsletter-button" type="submit">
                Subscribe
              </button>
            </form>
          </aside>
        </div>
      </section>
    </main>
  );
}
