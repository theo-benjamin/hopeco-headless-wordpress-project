export type ImageAsset = {
  sourceUrl: string;
  altText: string | null;
};

export type LinkItem = {
  label: string;
  url: string;
};

export type PathCard = {
  title: string;
  description: string;
  label: string;
  url: string;
};

export type ImpactMetric = {
  value: string;
  label: string;
};

export type HeaderContent = {
  links: LinkItem[];
  supportCta: LinkItem;
  donateCta: LinkItem;
};

export type HeroContent = {
  eyebrow: string;
  titleIntro: string;
  titleHighlight: string;
  description: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  mediaLabel: string;
  mediaUrl: string;
};

export type PathwaysContent = {
  eyebrow: string;
  heading: string;
  cards: PathCard[];
};

export type ImpactContent = {
  eyebrow: string;
  heading: string;
  metrics: ImpactMetric[];
  quote: string;
  storyName: string;
  storyRole: string;
  storyImage: ImageAsset | null;
};

export type UpdateCard = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
};

export type UpdatesContent = {
  eyebrow: string;
  heading: string;
  viewAll: LinkItem;
  posts: UpdateCard[];
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonLabel: string;
  newsletterDisclaimer: string;
};

export type FooterContent = {
  blurb: string;
  organizationHeading: string;
  organizationLinks: LinkItem[];
  supportHeading: string;
  supportLinks: LinkItem[];
  accessibilityHeading: string;
  accessibilityText: string;
  accessibilityLink: LinkItem;
  legalText: string;
  privacyLink: LinkItem;
  termsLink: LinkItem;
};

export type PageContent = {
  id: string;
  slug: string;
  title: string;
  content: string;
  heroTitle: string | null;
  heroText: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  heroImage: ImageAsset | null;
};

export type PostContent = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
};

export type HomePageData = {
  siteTitle: string;
  siteDescription: string;
  header: HeaderContent;
  hero: HeroContent;
  pathways: PathwaysContent;
  impact: ImpactContent;
  updates: UpdatesContent;
  footer: FooterContent;
};
