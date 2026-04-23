import Link from "next/link";

import type { PathwaysContent } from "@/lib/types";

type EditorialPathwaysProps = {
  pathways: PathwaysContent;
};

function PathIcon({ index }: { index: number }) {
  const iconPaths = [
    "M12 4l6 3v5c0 4.2-2.6 8.1-6 9-3.4-.9-6-4.8-6-9V7l6-3zm0 4v9m-3-5h6",
    "M5 15l4-4 3 3 7-7m-9 0h4v4",
    "M7 8h10M7 12h10M7 16h6",
    "M12 6a4 4 0 014 4c0 2.6-4 8-4 8s-4-5.4-4-8a4 4 0 014-4z",
  ];

  return (
    <svg
      aria-hidden="true"
      className="pathway-icon"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d={iconPaths[index] || iconPaths[0]}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function EditorialPathways({ pathways }: EditorialPathwaysProps) {
  return (
    <section className="editorial-section" id="programs">
      <div className="section-label">{pathways.eyebrow}</div>
      <div className="section-heading">
        <h2>{pathways.heading}</h2>
        <p className="section-supporting">
          Structured ways to engage with support, community, partnership, and
          sustained giving.
        </p>
      </div>

      <div className="pathways-grid">
        {pathways.cards.map((card, index) => (
          <article
            className={`pathway-card pathway-card-${(index % 2) + 1}`}
            key={`${card.title}-${index}`}
          >
            <div className="pathway-icon-wrap">
              <PathIcon index={index} />
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <Link className="text-link" href={card.url}>
              {card.label}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
