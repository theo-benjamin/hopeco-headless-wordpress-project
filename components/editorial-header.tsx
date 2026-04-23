import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
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
      <div className="brand-lockup">
        <p className="brand-overline">Institutional nonprofit newsroom</p>
        <Link className="brand-mark" href="/">
          {siteTitle}
        </Link>
      </div>

      <nav className="editorial-nav" aria-label="Section navigation">
        {header.links.map((link) => (
          <Link className="editorial-nav-link" key={`${link.label}-${link.url}`} href={link.url}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="editorial-header-actions">
        <ButtonLink href={header.supportCta.url} variant="secondary">
          {header.supportCta.label}
        </ButtonLink>
        <ButtonLink href={header.donateCta.url} variant="dark">
          {header.donateCta.label}
        </ButtonLink>
      </div>
    </header>
  );
}
