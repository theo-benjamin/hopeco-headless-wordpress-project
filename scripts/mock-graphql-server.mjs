import http from "node:http";

const homePageData = {
  generalSettings: {
    title: "Hopeco Headless CMS",
    description: "Building a digital sanctuary for those navigating systemic crises.",
  },
  nodeByUri: {
    __typename: "Page",
    id: "page-home",
    slug: "home",
    title: "Home",
    editorialHomePage: {
      headerNav: {
        missionLabel: "Our Mission",
        missionUrl: "#mission",
        programsLabel: "Programs",
        programsUrl: "#programs",
        impactLabel: "Impact",
        impactUrl: "#impact",
        resourcesLabel: "Resources",
        resourcesUrl: "#resources",
        supportLabel: "Get Help Now",
        supportUrl: "#programs",
        donateLabel: "Donate Now",
        donateUrl: "#programs",
      },
      heroSection: {
        eyebrow: "High contrast, ARIA labels, clear CTAs",
        titleIntro: "Advocating for",
        titleHighlight: "Human Dignity.",
        description:
          "We provide sanctuary, resources, and unwavering support to those navigating systemic crises. Your journey matters here.",
        primaryCtaLabel: "Get Support",
        primaryCtaUrl: "#programs",
        secondaryCtaLabel: "Watch Our Story",
        secondaryCtaUrl: "#impact",
        mediaLabel: "Story video placeholder",
        mediaUrl: "video_placeholder.mp4",
      },
      pathwaysSection: {
        eyebrow: "Distinct blocks, logical tab order, keyboard focus",
        heading: "Choose Your Path",
      },
      pathCardOne: {
        title: "Get Support",
        description: "Access immediate resources and safe spaces.",
        label: "Get Support",
        url: "#resources",
      },
      pathCardTwo: {
        title: "Volunteer",
        description: "Join our network of advocates on the ground.",
        label: "Volunteer",
        url: "#resources",
      },
      pathCardThree: {
        title: "Partner",
        description: "Collaborate with us to expand our reach.",
        label: "Partner",
        url: "#resources",
      },
      pathCardFour: {
        title: "Donate",
        description: "Fund the mission. Every contribution matters.",
        label: "Donate",
        url: "#resources",
      },
      impactSection: {
        eyebrow: "Screen reader friendly metrics + personal story",
        heading: "Our Impact",
        metricOneValue: "10,000+",
        metricOneLabel: "Families Supported",
        metricTwoValue: "50",
        metricTwoLabel: "Sanctuaries Built",
        metricThreeValue: "$2.5M",
        metricThreeLabel: "In Direct Aid",
        storyQuote:
          "The sanctuary wasn’t just a roof. It was the first time in months I felt seen.",
        storyName: "Maria V.",
        storyRole: "Program Participant",
        storyImage: null,
      },
      updatesSection: {
        eyebrow: "Feed + Newsletter Opt-in",
        heading: "Latest Updates",
        viewAllLabel: "View All",
        viewAllUrl: "/updates",
        newsletterHeading: "Stay Informed",
        newsletterDescription:
          "Subscribe to our newsletter for crucial updates and stories from the field.",
        newsletterPlaceholder: "Email Address",
        newsletterButtonLabel: "Subscribe",
        newsletterDisclaimer: "We respect your privacy. Unsubscribe anytime.",
      },
      footerSection: {
        blurb: "Building a digital sanctuary for those navigating systemic crises.",
        organizationHeading: "Organization",
        organizationLinkOneLabel: "Our Mission",
        organizationLinkOneUrl: "#mission",
        organizationLinkTwoLabel: "Programs",
        organizationLinkTwoUrl: "#programs",
        organizationLinkThreeLabel: "Impact",
        organizationLinkThreeUrl: "#impact",
        organizationLinkFourLabel: "Careers",
        organizationLinkFourUrl: "#resources",
        supportHeading: "Support",
        supportLinkOneLabel: "Get Help Now",
        supportLinkOneUrl: "#programs",
        supportLinkTwoLabel: "Resources",
        supportLinkTwoUrl: "#resources",
        supportLinkThreeLabel: "Contact Us",
        supportLinkThreeUrl: "#footer",
        supportLinkFourLabel: "Donate",
        supportLinkFourUrl: "#programs",
        accessibilityHeading: "Accessibility",
        accessibilityText:
          "We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone.",
        accessibilityLinkLabel: "Read our Statement",
        accessibilityLinkUrl: "#footer",
        legalText: "© 2024 The Editorial Advocate. Designed for Sanctuary.",
        privacyLabel: "Privacy Policy",
        privacyUrl: "#footer",
        termsLabel: "Terms of Service",
        termsUrl: "#footer",
      },
    },
  },
  posts: {
    nodes: [
      {
        id: "post-event",
        slug: "annual-community-town-hall",
        title: "Annual Community Town Hall",
        date: "2026-10-12T00:00:00",
        excerpt:
          "<p>Join us for an open discussion on the upcoming policy changes affecting our neighborhoods.</p>",
        categories: {
          nodes: [{ name: "Event" }],
        },
      },
      {
        id: "post-news",
        slug: "new-sanctuary-opened-in-westside",
        title: "New Sanctuary Opened in Westside",
        date: "2026-09-28T00:00:00",
        excerpt:
          "<p>We are thrilled to announce the opening of our newest facility providing emergency housing.</p>",
        categories: {
          nodes: [{ name: "News" }],
        },
      },
    ],
  },
};

const pageByUri = {
  "/home/": {
    nodeByUri: {
      __typename: "Page",
      id: "page-home",
      slug: "home",
      title: "Home",
      content:
        "<p>This is the seeded home page content from the bootstrap script.</p>",
      pageHero: {
        heroTitle: "Headless content without the WordPress theme layer",
        heroText:
          "Edit this copy in WordPress, then watch the Next.js page update after revalidation.",
        ctaLabel: "Read launch note",
        ctaUrl: "/posts/launch-note",
        heroImage: null,
      },
    },
  },
  "/about/": {
    nodeByUri: {
      __typename: "Page",
      id: "page-about",
      slug: "about",
      title: "About",
      content:
        "<p>Use this page to verify ACF-backed hero content coming through GraphQL.</p>",
      pageHero: {
        heroTitle: "Built for a clean editorial workflow",
        heroText:
          "This page demonstrates a second published page with its own ACF hero fields.",
        ctaLabel: "Return home",
        ctaUrl: "/",
        heroImage: null,
      },
    },
  },
};

const postBySlug = {
  "annual-community-town-hall": {
    post: {
      id: "post-event",
      slug: "annual-community-town-hall",
      title: "Annual Community Town Hall",
      date: "2026-10-12T00:00:00",
      excerpt:
        "<p>Join us for an open discussion on the upcoming policy changes affecting our neighborhoods.</p>",
      content:
        "<p>Join us for an open discussion on the upcoming policy changes affecting our neighborhoods.</p>",
      categories: {
        nodes: [{ name: "Event" }],
      },
    },
  },
  "new-sanctuary-opened-in-westside": {
    post: {
      id: "post-news",
      slug: "new-sanctuary-opened-in-westside",
      title: "New Sanctuary Opened in Westside",
      date: "2026-09-28T00:00:00",
      excerpt:
        "<p>We are thrilled to announce the opening of our newest facility providing emergency housing.</p>",
      content:
        "<p>We are thrilled to announce the opening of our newest facility providing emergency housing.</p>",
      categories: {
        nodes: [{ name: "News" }],
      },
    },
  },
};

const server = http.createServer((req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const payload = body ? JSON.parse(body) : {};
    const query = payload.query ?? "";
    let data = {};

    if (query.includes("HomePageQuery")) {
      data = homePageData;
    } else if (query.includes("PageSlugsQuery")) {
      data = {
        pages: {
          nodes: [{ slug: "home" }, { slug: "about" }],
        },
      };
    } else if (query.includes("PageByUriQuery")) {
      data = pageByUri[payload.variables?.uri] ?? { nodeByUri: null };
    } else if (query.includes("PostSlugsQuery")) {
      data = {
        posts: {
          nodes: [
            { slug: "annual-community-town-hall" },
            { slug: "new-sanctuary-opened-in-westside" },
          ],
        },
      };
    } else if (query.includes("PostBySlugQuery")) {
      data = postBySlug[payload.variables?.slug] ?? { post: null };
    } else if (query.includes("PostsQuery")) {
      data = {
        posts: {
          nodes: Object.values(postBySlug).map((entry) => entry.post),
        },
      };
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data }));
  });
});

server.listen(4010, "127.0.0.1", () => {
  console.log("mock-graphql-ready");
});
