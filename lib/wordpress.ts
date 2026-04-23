import { getRevalidateSeconds, getWordPressGraphqlUrl } from "@/lib/env";
import {
  HOME_PAGE_QUERY,
  PAGE_BY_URI_QUERY,
  PAGE_SLUGS_QUERY,
  POST_BY_SLUG_QUERY,
  POSTS_QUERY,
  POST_SLUGS_QUERY,
} from "@/lib/queries";
import type {
  HomePageData,
  LinkItem,
  PageContent,
  PathCard,
  PostContent,
  UpdateCard,
} from "@/lib/types";

type GraphqlResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

async function fetchWordPress<T>(
  query: string,
  variables?: Record<string, unknown>,
) {
  const response = await fetch(getWordPressGraphqlUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: getRevalidateSeconds(),
    },
  });

  if (!response.ok) {
    throw new Error(
      `WordPress GraphQL request failed with status ${response.status}.`,
    );
  }

  const payload = (await response.json()) as GraphqlResponse<T>;

  if (payload.errors?.length) {
    const messages = payload.errors.map((error) => error.message).join(", ");
    throw new Error(`WordPress GraphQL returned errors: ${messages}`);
  }

  if (!payload.data) {
    throw new Error("WordPress GraphQL returned no data.");
  }

  return payload.data;
}

type HomePageQueryData = {
  generalSettings: {
    title: string;
    description: string;
  };
  nodeByUri: {
    __typename: "Page";
    id: string;
    slug: string;
    title: string;
    editorialHomePage: {
      headerNav: {
        missionLabel: string | null;
        missionUrl: string | null;
        programsLabel: string | null;
        programsUrl: string | null;
        impactLabel: string | null;
        impactUrl: string | null;
        resourcesLabel: string | null;
        resourcesUrl: string | null;
        supportLabel: string | null;
        supportUrl: string | null;
        donateLabel: string | null;
        donateUrl: string | null;
      } | null;
      heroSection: {
        eyebrow: string | null;
        titleIntro: string | null;
        titleHighlight: string | null;
        description: string | null;
        primaryCtaLabel: string | null;
        primaryCtaUrl: string | null;
        secondaryCtaLabel: string | null;
        secondaryCtaUrl: string | null;
        mediaLabel: string | null;
        mediaUrl: string | null;
      } | null;
      pathwaysSection: {
        eyebrow: string | null;
        heading: string | null;
      } | null;
      pathCardOne: {
        title: string | null;
        description: string | null;
        label: string | null;
        url: string | null;
      } | null;
      pathCardTwo: {
        title: string | null;
        description: string | null;
        label: string | null;
        url: string | null;
      } | null;
      pathCardThree: {
        title: string | null;
        description: string | null;
        label: string | null;
        url: string | null;
      } | null;
      pathCardFour: {
        title: string | null;
        description: string | null;
        label: string | null;
        url: string | null;
      } | null;
      impactSection: {
        eyebrow: string | null;
        heading: string | null;
        metricOneValue: string | null;
        metricOneLabel: string | null;
        metricTwoValue: string | null;
        metricTwoLabel: string | null;
        metricThreeValue: string | null;
        metricThreeLabel: string | null;
        storyQuote: string | null;
        storyName: string | null;
        storyRole: string | null;
        storyImage: {
          node: {
            sourceUrl: string;
            altText: string | null;
          } | null;
        } | null;
      } | null;
      updatesSection: {
        eyebrow: string | null;
        heading: string | null;
        viewAllLabel: string | null;
        viewAllUrl: string | null;
        newsletterHeading: string | null;
        newsletterDescription: string | null;
        newsletterPlaceholder: string | null;
        newsletterButtonLabel: string | null;
        newsletterDisclaimer: string | null;
      } | null;
      footerSection: {
        blurb: string | null;
        organizationHeading: string | null;
        organizationLinkOneLabel: string | null;
        organizationLinkOneUrl: string | null;
        organizationLinkTwoLabel: string | null;
        organizationLinkTwoUrl: string | null;
        organizationLinkThreeLabel: string | null;
        organizationLinkThreeUrl: string | null;
        organizationLinkFourLabel: string | null;
        organizationLinkFourUrl: string | null;
        supportHeading: string | null;
        supportLinkOneLabel: string | null;
        supportLinkOneUrl: string | null;
        supportLinkTwoLabel: string | null;
        supportLinkTwoUrl: string | null;
        supportLinkThreeLabel: string | null;
        supportLinkThreeUrl: string | null;
        supportLinkFourLabel: string | null;
        supportLinkFourUrl: string | null;
        accessibilityHeading: string | null;
        accessibilityText: string | null;
        accessibilityLinkLabel: string | null;
        accessibilityLinkUrl: string | null;
        legalText: string | null;
        privacyLabel: string | null;
        privacyUrl: string | null;
        termsLabel: string | null;
        termsUrl: string | null;
      } | null;
    } | null;
  } | null;
  posts: {
    nodes: Array<{
      id: string;
      slug: string;
      title: string;
      date: string;
      excerpt: string;
      categories: {
        nodes: Array<{
          name: string;
        }>;
      };
    }>;
  };
};

type PageByUriQueryData = {
  nodeByUri: {
    __typename: "Page";
    id: string;
    slug: string;
    title: string;
    content: string;
    pageHero: {
      heroTitle: string | null;
      heroText: string | null;
      ctaLabel: string | null;
      ctaUrl: string | null;
      heroImage: {
        node: {
          sourceUrl: string;
          altText: string | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

type PageSlugsQueryData = {
  pages: {
    nodes: Array<{
      slug: string | null;
    }>;
  };
};

type PostBySlugQueryData = {
  post: {
    id: string;
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    categories: {
      nodes: Array<{
        name: string;
      }>;
    };
  } | null;
};

type PostSlugsQueryData = {
  posts: {
    nodes: Array<{
      slug: string | null;
    }>;
  };
};

type PostsQueryData = {
  posts: {
    nodes: Array<{
      id: string;
      slug: string;
      title: string;
      date: string;
      excerpt: string;
      content: string;
      categories: {
        nodes: Array<{
          name: string;
        }>;
      };
    }>;
  };
};

function buildLink(
  label: string | null | undefined,
  url: string | null | undefined,
  fallbackLabel: string,
  fallbackUrl: string,
): LinkItem {
  return {
    label: label || fallbackLabel,
    url: url || fallbackUrl,
  };
}

function buildPathCard(
  card:
    | {
        title: string | null;
        description: string | null;
        label: string | null;
        url: string | null;
      }
    | null
    | undefined,
  fallback: PathCard,
): PathCard {
  return {
    title: card?.title || fallback.title,
    description: card?.description || fallback.description,
    label: card?.label || fallback.label,
    url: card?.url || fallback.url,
  };
}

function mapUpdateCard(post: {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: {
    nodes: Array<{
      name: string;
    }>;
  };
}): UpdateCard {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    category: post.categories.nodes[0]?.name || "News",
  };
}

export async function fetchHomePageData(): Promise<HomePageData> {
  const data = await fetchWordPress<HomePageQueryData>(HOME_PAGE_QUERY);
  const homePage = data.nodeByUri?.editorialHomePage;

  if (!data.nodeByUri || data.nodeByUri.__typename !== "Page") {
    throw new Error('Expected a published "home" page at /home/.');
  }

  const posts =
    data.posts.nodes.length > 0
      ? data.posts.nodes.map(mapUpdateCard)
      : [
          {
            id: "fallback-event",
            slug: "annual-community-town-hall",
            title: "Annual Community Town Hall",
            date: "2026-10-12T00:00:00",
            excerpt:
              "<p>Join us for an open discussion on the upcoming policy changes affecting our neighborhoods.</p>",
            category: "Event",
          },
          {
            id: "fallback-news",
            slug: "westside-sanctuary-opened",
            title: "New Sanctuary Opened in Westside",
            date: "2026-09-28T00:00:00",
            excerpt:
              "<p>We are thrilled to announce the opening of our newest facility providing emergency housing.</p>",
            category: "News",
          },
        ];

  return {
    siteTitle: data.generalSettings.title,
    siteDescription: data.generalSettings.description,
    header: {
      links: [
        buildLink(
          homePage?.headerNav?.missionLabel,
          homePage?.headerNav?.missionUrl,
          "Our Mission",
          "#mission",
        ),
        buildLink(
          homePage?.headerNav?.programsLabel,
          homePage?.headerNav?.programsUrl,
          "Programs",
          "#programs",
        ),
        buildLink(
          homePage?.headerNav?.impactLabel,
          homePage?.headerNav?.impactUrl,
          "Impact",
          "#impact",
        ),
        buildLink(
          homePage?.headerNav?.resourcesLabel,
          homePage?.headerNav?.resourcesUrl,
          "Resources",
          "#resources",
        ),
      ],
      supportCta: buildLink(
        homePage?.headerNav?.supportLabel,
        homePage?.headerNav?.supportUrl,
        "Get Help Now",
        "#programs",
      ),
      donateCta: buildLink(
        homePage?.headerNav?.donateLabel,
        homePage?.headerNav?.donateUrl,
        "Donate Now",
        "#programs",
      ),
    },
    hero: {
      eyebrow: homePage?.heroSection?.eyebrow || "Accessible Advocacy",
      titleIntro: homePage?.heroSection?.titleIntro || "Advocating for",
      titleHighlight: homePage?.heroSection?.titleHighlight || "Human Dignity.",
      description:
        homePage?.heroSection?.description ||
        "We provide sanctuary, resources, and unwavering support to those navigating systemic crises. Your journey matters here.",
      primaryCta: buildLink(
        homePage?.heroSection?.primaryCtaLabel,
        homePage?.heroSection?.primaryCtaUrl,
        "Get Support",
        "#programs",
      ),
      secondaryCta: buildLink(
        homePage?.heroSection?.secondaryCtaLabel,
        homePage?.heroSection?.secondaryCtaUrl,
        "Watch Our Story",
        "#impact",
      ),
      mediaLabel:
        homePage?.heroSection?.mediaLabel || "Editorial advocate introduction video",
      mediaUrl: homePage?.heroSection?.mediaUrl || "video_placeholder.mp4",
    },
    pathways: {
      eyebrow:
        homePage?.pathwaysSection?.eyebrow ||
        "Distinct blocks, logical tab order, keyboard focus",
      heading: homePage?.pathwaysSection?.heading || "Choose Your Path",
      cards: [
        buildPathCard(homePage?.pathCardOne, {
          title: "Get Support",
          description: "Access immediate resources and safe spaces.",
          label: "Get Support",
          url: "#resources",
        }),
        buildPathCard(homePage?.pathCardTwo, {
          title: "Volunteer",
          description: "Join our network of advocates on the ground.",
          label: "Volunteer",
          url: "#resources",
        }),
        buildPathCard(homePage?.pathCardThree, {
          title: "Partner",
          description: "Collaborate with us to expand our reach.",
          label: "Partner",
          url: "#resources",
        }),
        buildPathCard(homePage?.pathCardFour, {
          title: "Donate",
          description: "Fund the mission. Every contribution matters.",
          label: "Donate",
          url: "#resources",
        }),
      ],
    },
    impact: {
      eyebrow:
        homePage?.impactSection?.eyebrow ||
        "Screen reader friendly metrics + personal story",
      heading: homePage?.impactSection?.heading || "Our Impact",
      metrics: [
        {
          value: homePage?.impactSection?.metricOneValue || "10,000+",
          label: homePage?.impactSection?.metricOneLabel || "Families Supported",
        },
        {
          value: homePage?.impactSection?.metricTwoValue || "50",
          label: homePage?.impactSection?.metricTwoLabel || "Sanctuaries Built",
        },
        {
          value: homePage?.impactSection?.metricThreeValue || "$2.5M",
          label: homePage?.impactSection?.metricThreeLabel || "In Direct Aid",
        },
      ],
      quote:
        homePage?.impactSection?.storyQuote ||
        "The sanctuary wasn’t just a roof. It was the first time in months I felt seen.",
      storyName: homePage?.impactSection?.storyName || "Maria V.",
      storyRole: homePage?.impactSection?.storyRole || "Program Participant",
      storyImage: homePage?.impactSection?.storyImage?.node ?? null,
    },
    updates: {
      eyebrow:
        homePage?.updatesSection?.eyebrow || "Feed + Newsletter Opt-in",
      heading: homePage?.updatesSection?.heading || "Latest Updates",
      viewAll: buildLink(
        homePage?.updatesSection?.viewAllLabel,
        homePage?.updatesSection?.viewAllUrl,
        "View All",
        "/updates",
      ),
      posts,
      newsletterHeading:
        homePage?.updatesSection?.newsletterHeading || "Stay Informed",
      newsletterDescription:
        homePage?.updatesSection?.newsletterDescription ||
        "Subscribe to our newsletter for crucial updates and stories from the field.",
      newsletterPlaceholder:
        homePage?.updatesSection?.newsletterPlaceholder || "Email Address",
      newsletterButtonLabel:
        homePage?.updatesSection?.newsletterButtonLabel || "Subscribe",
      newsletterDisclaimer:
        homePage?.updatesSection?.newsletterDisclaimer ||
        "We respect your privacy. Unsubscribe anytime.",
    },
    footer: {
      blurb:
        homePage?.footerSection?.blurb ||
        "Building a digital sanctuary for those navigating systemic crises.",
      organizationHeading:
        homePage?.footerSection?.organizationHeading || "Organization",
      organizationLinks: [
        buildLink(
          homePage?.footerSection?.organizationLinkOneLabel,
          homePage?.footerSection?.organizationLinkOneUrl,
          "Our Mission",
          "#mission",
        ),
        buildLink(
          homePage?.footerSection?.organizationLinkTwoLabel,
          homePage?.footerSection?.organizationLinkTwoUrl,
          "Programs",
          "#programs",
        ),
        buildLink(
          homePage?.footerSection?.organizationLinkThreeLabel,
          homePage?.footerSection?.organizationLinkThreeUrl,
          "Impact",
          "#impact",
        ),
        buildLink(
          homePage?.footerSection?.organizationLinkFourLabel,
          homePage?.footerSection?.organizationLinkFourUrl,
          "Careers",
          "#resources",
        ),
      ],
      supportHeading: homePage?.footerSection?.supportHeading || "Support",
      supportLinks: [
        buildLink(
          homePage?.footerSection?.supportLinkOneLabel,
          homePage?.footerSection?.supportLinkOneUrl,
          "Get Help Now",
          "#programs",
        ),
        buildLink(
          homePage?.footerSection?.supportLinkTwoLabel,
          homePage?.footerSection?.supportLinkTwoUrl,
          "Resources",
          "#resources",
        ),
        buildLink(
          homePage?.footerSection?.supportLinkThreeLabel,
          homePage?.footerSection?.supportLinkThreeUrl,
          "Contact Us",
          "#footer",
        ),
        buildLink(
          homePage?.footerSection?.supportLinkFourLabel,
          homePage?.footerSection?.supportLinkFourUrl,
          "Donate",
          "#programs",
        ),
      ],
      accessibilityHeading:
        homePage?.footerSection?.accessibilityHeading || "Accessibility",
      accessibilityText:
        homePage?.footerSection?.accessibilityText ||
        "We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone.",
      accessibilityLink: buildLink(
        homePage?.footerSection?.accessibilityLinkLabel,
        homePage?.footerSection?.accessibilityLinkUrl,
        "Read our Statement",
        "#footer",
      ),
      legalText:
        homePage?.footerSection?.legalText ||
        "© 2024 The Editorial Advocate. Designed for Sanctuary.",
      privacyLink: buildLink(
        homePage?.footerSection?.privacyLabel,
        homePage?.footerSection?.privacyUrl,
        "Privacy Policy",
        "#footer",
      ),
      termsLink: buildLink(
        homePage?.footerSection?.termsLabel,
        homePage?.footerSection?.termsUrl,
        "Terms of Service",
        "#footer",
      ),
    },
  };
}

export async function fetchPageSlugs() {
  const data = await fetchWordPress<PageSlugsQueryData>(PAGE_SLUGS_QUERY);

  return data.pages.nodes
    .map((page) => page.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export async function fetchPageBySlug(slug: string): Promise<PageContent | null> {
  const data = await fetchWordPress<PageByUriQueryData>(PAGE_BY_URI_QUERY, {
    uri: `/${slug}/`,
  });

  if (!data.nodeByUri || data.nodeByUri.__typename !== "Page") {
    return null;
  }

  return {
    id: data.nodeByUri.id,
    slug: data.nodeByUri.slug,
    title: data.nodeByUri.title,
    content: data.nodeByUri.content,
    heroTitle: data.nodeByUri.pageHero?.heroTitle ?? null,
    heroText: data.nodeByUri.pageHero?.heroText ?? null,
    ctaLabel: data.nodeByUri.pageHero?.ctaLabel ?? null,
    ctaUrl: data.nodeByUri.pageHero?.ctaUrl ?? null,
    heroImage: data.nodeByUri.pageHero?.heroImage?.node ?? null,
  };
}

export async function fetchPostSlugs() {
  const data = await fetchWordPress<PostSlugsQueryData>(POST_SLUGS_QUERY);

  return data.posts.nodes
    .map((post) => post.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export async function fetchPostBySlug(slug: string): Promise<PostContent | null> {
  const data = await fetchWordPress<PostBySlugQueryData>(POST_BY_SLUG_QUERY, {
    slug,
  });

  if (!data.post) {
    return null;
  }

  return {
    ...data.post,
    category: data.post.categories.nodes[0]?.name || "News",
  };
}

export async function fetchPosts(first = 12): Promise<PostContent[]> {
  const data = await fetchWordPress<PostsQueryData>(POSTS_QUERY, { first });

  return data.posts.nodes.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    content: post.content,
    category: post.categories.nodes[0]?.name || "News",
  }));
}
