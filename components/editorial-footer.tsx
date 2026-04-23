import Link from "next/link";

import type { FooterContent } from "@/lib/types";

type EditorialFooterProps = {
  siteTitle: string;
  footer: FooterContent;
};

export function EditorialFooter({
  siteTitle,
  footer,
}: EditorialFooterProps) {
  return (
    <footer className="editorial-footer editorial-section" id="footer">
      <div className="footer-brand">
        <h2>{siteTitle}</h2>
        <p>{footer.blurb}</p>
        <div className="footer-socials" aria-label="Social links">
          <span>◎</span>
          <span>@</span>
        </div>
      </div>

      <div className="footer-column">
        <p className="footer-heading">{footer.organizationHeading}</p>
        <div className="footer-links">
          {footer.organizationLinks.map((link) => (
            <Link key={`${link.label}-${link.url}`} href={link.url}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-column">
        <p className="footer-heading">{footer.supportHeading}</p>
        <div className="footer-links">
          {footer.supportLinks.map((link) => (
            <Link key={`${link.label}-${link.url}`} href={link.url}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-column footer-accessibility">
        <p className="footer-heading">{footer.accessibilityHeading}</p>
        <p>{footer.accessibilityText}</p>
        <Link className="footer-statement-link" href={footer.accessibilityLink.url}>
          {footer.accessibilityLink.label}
        </Link>
        <p className="footer-legal">{footer.legalText}</p>
        <div className="footer-legal-links">
          <Link href={footer.privacyLink.url}>{footer.privacyLink.label}</Link>
          <Link href={footer.termsLink.url}>{footer.termsLink.label}</Link>
        </div>
      </div>
    </footer>
  );
}

