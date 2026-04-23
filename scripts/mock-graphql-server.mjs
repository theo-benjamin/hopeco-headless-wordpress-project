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
    editorBlocks: [
      {
        id: "home-block-header",
        name: "core/group",
        renderedHtml:
          '<header class="site-header editorial-section block-site-header"><div class="editorial-header"><div class="brand-lockup"><p class="brand-overline">Institutional nonprofit newsroom</p><a class="brand-mark" href="/">The Editorial Advocate</a></div><ul class="editorial-nav-list"><li><a href="#mission">Our Mission</a></li><li><a href="#programs">Programs</a></li><li><a href="#impact">Impact</a></li><li><a href="#resources">Resources</a></li></ul><div class="editorial-header-actions"><a class="button button-secondary" href="#programs">Get Help Now</a><a class="button button-dark" href="#programs">Donate Now</a></div></div></header>',
      },
      {
        id: "home-block-hero",
        name: "core/group",
        renderedHtml:
          '<section class="editorial-section editorial-hero" id="mission"><div class="section-label">Mission</div><div class="hero-layout"><div class="hero-copy"><p class="eyebrow">High contrast, ARIA labels, clear CTAs</p><h1 class="hero-title"><span class="hero-title-intro">Advocating for</span><span class="hero-title-highlight">Human Dignity.</span></h1><p class="hero-description">We provide sanctuary, resources, and unwavering support to those navigating systemic crises. Your journey matters here.</p><div class="hero-actions"><a class="button button-dark" href="#programs">Get Support</a><a class="button button-outline" href="#impact">Watch Our Story</a></div><ul class="hero-assurance-row"><li>Evidence-led</li><li>Human-centered</li><li>Accessible by default</li></ul></div><div class="hero-media"><div class="hero-media-frame"><div class="hero-media-play" aria-hidden="true"><span></span></div><p class="hero-media-kicker">Story video placeholder</p></div><p class="hero-media-caption">video_placeholder.mp4</p></div></div></section>',
      },
      {
        id: "home-block-pathways",
        name: "core/group",
        renderedHtml:
          '<section class="editorial-section block-pathways" id="programs"><div class="section-label">Distinct blocks, logical tab order, keyboard focus</div><div class="section-heading"><h2>Choose Your Path</h2><p class="section-supporting">Structured ways to engage with support, community, partnership, and sustained giving.</p></div><div class="pathways-grid"><article class="pathway-card pathway-card-1"><div class="pathway-icon-wrap">↗</div><h3>Get Support</h3><p>Access immediate resources and safe spaces.</p><p class="text-link"><a href="#resources">Get Support</a></p></article><article class="pathway-card pathway-card-2"><div class="pathway-icon-wrap">✦</div><h3>Volunteer</h3><p>Join our network of advocates on the ground.</p><p class="text-link"><a href="#resources">Volunteer</a></p></article><article class="pathway-card pathway-card-1"><div class="pathway-icon-wrap">●</div><h3>Partner</h3><p>Collaborate with us to expand our reach.</p><p class="text-link"><a href="#resources">Partner</a></p></article><article class="pathway-card pathway-card-2"><div class="pathway-icon-wrap">◎</div><h3>Donate</h3><p>Fund the mission. Every contribution matters.</p><p class="text-link"><a href="#resources">Donate</a></p></article></div></section>',
      },
      {
        id: "home-block-impact",
        name: "core/group",
        renderedHtml:
          '<section class="editorial-section block-impact" id="impact"><div class="section-label">Screen reader friendly metrics + personal story</div><div class="impact-grid"><div class="impact-metrics-panel"><div class="section-heading"><h2>Our Impact</h2><p class="section-supporting">Measured outcomes paired with testimony from the people this work is designed to serve.</p></div><ul class="impact-metrics-list"><li class="impact-metric"><span class="impact-value">10,000+</span><span class="impact-label">Families Supported</span></li><li class="impact-metric"><span class="impact-value">50</span><span class="impact-label">Sanctuaries Built</span></li><li class="impact-metric"><span class="impact-value">$2.5M</span><span class="impact-label">In Direct Aid</span></li></ul></div><div class="impact-story-panel"><article class="impact-story-card"><p class="impact-story-quote-mark">“</p><blockquote>The sanctuary wasn’t just a roof. It was the first time in months I felt seen.</blockquote><div class="impact-story-person"><div class="impact-story-avatar impact-story-avatar-fallback">IMG</div><div><p class="impact-story-name">Maria V.</p><p class="impact-story-role">Program Participant</p></div></div></article></div></div></section>',
      },
      {
        id: "home-block-updates",
        name: "core/group",
        renderedHtml:
          '<section class="editorial-section block-updates" id="resources"><div class="section-label">Feed + Newsletter Opt-in</div><div class="updates-grid"><div class="updates-feed"><div class="updates-header"><div class="section-heading"><h2>Latest Updates</h2><p class="section-supporting">Timely reporting, public-interest programming, and calls to stay informed.</p></div><p class="updates-view-all"><a href="/updates">View All</a></p></div><ul class="updates-list"><li class="update-row"><div class="update-thumb" aria-hidden="true"></div><div class="update-copy"><p class="update-meta">EVENT · Oct 12</p><h3><a href="/posts/annual-community-town-hall">Annual Community Town Hall</a></h3><p>Join us for an open discussion on the upcoming policy changes affecting our neighborhoods.</p></div></li><li class="update-row"><div class="update-thumb" aria-hidden="true"></div><div class="update-copy"><p class="update-meta">NEWS · Sep 28</p><h3><a href="/posts/new-sanctuary-opened-in-westside">New Sanctuary Opened in Westside</a></h3><p>We are thrilled to announce the opening of our newest facility providing emergency housing.</p></div></li></ul></div><aside class="newsletter-card"><p class="eyebrow">Newsletter</p><h3>Stay Informed</h3><p>Subscribe to our newsletter for crucial updates and stories from the field.</p><form action="#" class="newsletter-form"><label class="sr-only" for="newsletter-email">Email address</label><input class="newsletter-input" id="newsletter-email" name="email" placeholder="Email Address" type="email" /><button class="button button-dark newsletter-button" type="submit">Subscribe</button></form><p class="newsletter-note">We respect your privacy. Unsubscribe anytime.</p><p class="newsletter-secondary-action"><a class="button button-secondary" href="/updates">Review latest coverage</a></p></aside></div></section>',
      },
      {
        id: "home-block-footer",
        name: "core/group",
        renderedHtml:
          '<footer class="editorial-footer editorial-section" id="footer"><div class="footer-brand"><p class="eyebrow">Editorial Advocate</p><h2>The Editorial Advocate</h2><p>Building a digital sanctuary for those navigating systemic crises.</p></div><div class="footer-column"><p class="footer-heading">Organization</p><div class="footer-links"><a href="#mission">Our Mission</a><a href="#programs">Programs</a><a href="#impact">Impact</a><a href="#resources">Careers</a></div></div><div class="footer-column"><p class="footer-heading">Support</p><div class="footer-links"><a href="#programs">Get Help Now</a><a href="#resources">Resources</a><a href="#footer">Contact Us</a><a href="#programs">Donate</a></div></div><div class="footer-column footer-accessibility"><p class="footer-heading">Accessibility</p><p>We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone.</p><p class="footer-statement-link"><a href="#footer">Read our Statement</a></p><p class="footer-legal">© 2024 The Editorial Advocate. Designed for Sanctuary.</p><div class="footer-legal-links"><a href="#footer">Privacy Policy</a><a href="#footer">Terms of Service</a></div></div></footer>',
      },
    ],
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
