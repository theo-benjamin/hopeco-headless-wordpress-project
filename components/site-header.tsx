import Link from "next/link";

type SiteHeaderProps = {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteHeader({
  title,
  description,
  ctaHref,
  ctaLabel,
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header-copy">
        <p className="eyebrow">Hopeco</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {ctaHref && ctaLabel ? (
        <Link className="button button-secondary" href={ctaHref}>
          {ctaLabel}
        </Link>
      ) : null}
    </header>
  );
}

