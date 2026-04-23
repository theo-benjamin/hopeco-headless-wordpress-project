import Image from "next/image";

import type { ImpactContent } from "@/lib/types";

type EditorialImpactProps = {
  impact: ImpactContent;
};

export function EditorialImpact({ impact }: EditorialImpactProps) {
  return (
    <section className="editorial-section" id="impact">
      <div className="section-label">{impact.eyebrow}</div>

      <div className="impact-grid">
        <div className="impact-metrics-panel">
          <div className="section-heading">
            <h2>{impact.heading}</h2>
            <p className="section-supporting">
              Measured outcomes paired with testimony from the people this work
              is designed to serve.
            </p>
          </div>

          <div className="impact-metrics-list" aria-label="Impact metrics">
            {impact.metrics.map((metric) => (
              <div className="impact-metric" key={metric.label}>
                <p className="impact-value">{metric.value}</p>
                <p className="impact-label">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="impact-story-panel">
          <article className="impact-story-card">
            <p className="impact-story-quote-mark" aria-hidden="true">
              &ldquo;
            </p>
            <blockquote>{impact.quote}</blockquote>

            <div className="impact-story-person">
              {impact.storyImage ? (
                <Image
                  alt={impact.storyImage.altText || impact.storyName}
                  className="impact-story-avatar"
                  height={72}
                  src={impact.storyImage.sourceUrl}
                  width={72}
                />
              ) : (
                <div className="impact-story-avatar impact-story-avatar-fallback" aria-hidden="true">
                  IMG
                </div>
              )}

              <div>
                <p className="impact-story-name">{impact.storyName}</p>
                <p className="impact-story-role">{impact.storyRole}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
