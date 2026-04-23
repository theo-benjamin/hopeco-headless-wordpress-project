import Link from "next/link";

import type { HeaderContent } from "@/lib/types";

type EditorialHeaderProps = {
  siteTitle: string;
  header: HeaderContent;
};

export function EditorialHeader({
  siteTitle,
  header,
}: EditorialHeaderProps) {
  return (
    <header className="editorial-header" aria-label="Primary">
      <Link className="brand-mark" href="/">
        {siteTitle}
      </Link>

      <nav className="editorial-nav" aria-label="Section navigation">
        {header.links.map((link) => (
          <Link key={`${link.label}-${link.url}`} href={link.url}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="editorial-header-actions">
        <Link className="button button-secondary" href={header.supportCta.url}>
          {header.supportCta.label}
        </Link>
        <Link className="button button-dark" href={header.donateCta.url}>
          {header.donateCta.label}
        </Link>
      </div>
    </header>
  );
}

