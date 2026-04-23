import { readFileSync } from "node:fs";
import path from "node:path";

import { getRevalidateSeconds, getWordPressGraphqlUrl } from "@/lib/env";
import {
  HOME_PAGE_FALLBACK_QUERY,
  HOME_PAGE_QUERY,
  PAGE_BY_URI_QUERY,
  PAGE_SLUGS_QUERY,
  POST_BY_SLUG_QUERY,
  POSTS_QUERY,
  POST_SLUGS_QUERY,
} from "@/lib/queries";
import type { HomePageData, PageContent, PostContent } from "@/lib/types";

type GraphqlResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

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
    editorBlocks: Array<{
      id: string | null;
      name: string | null;
      renderedHtml: string | null;
    }> | null;
  } | null;
};

type HomePageFallbackQueryData = {
  generalSettings: {
    title: string;
    description: string;
  };
  nodeByUri: {
    __typename: "Page";
    id: string;
    slug: string;
    title: string;
    content: string;
  } | null;
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

function getFallbackHomeBlocks() {
  let seededMarkup = "";

  try {
    seededMarkup = readFileSync(
      path.join(process.cwd(), "scripts", "editorial-homepage-blocks.html"),
      "utf8",
    );
  } catch {
    seededMarkup = "";
  }

  if (seededMarkup.trim()) {
    return [
      {
        id: "fallback-seeded-homepage",
        name: "core/post-content",
        renderedHtml: seededMarkup,
      },
    ];
  }

  return [
    {
      id: "fallback-header",
      name: "core/group",
      renderedHtml:
        '<header class="site-header editorial-section block-site-header"><div class="editorial-header"><div class="brand-lockup"><p class="brand-overline">Institutional nonprofit newsroom</p><a class="brand-mark" href="/">The Editorial Advocate</a></div><ul class="editorial-nav-list"><li><a href="#mission">Our Mission</a></li><li><a href="#programs">Programs</a></li><li><a href="#impact">Impact</a></li><li><a href="#resources">Resources</a></li></ul><div class="editorial-header-actions"><a class="button button-secondary" href="#programs">Get Help Now</a><a class="button button-dark" href="#programs">Donate Now</a></div></div></header>',
    },
    {
      id: "fallback-hero",
      name: "core/group",
      renderedHtml:
        '<section class="editorial-section editorial-hero" id="mission"><div class="section-label">Mission</div><div class="hero-layout"><div class="hero-copy"><p class="eyebrow">High contrast, ARIA labels, clear CTAs</p><h1 class="hero-title"><span class="hero-title-intro">Advocating for</span><span class="hero-title-highlight">Human Dignity.</span></h1><p class="hero-description">We provide sanctuary, resources, and unwavering support to those navigating systemic crises. Your journey matters here.</p><div class="hero-actions"><a class="button button-dark" href="#programs">Get Support</a><a class="button button-outline" href="#impact">Watch Our Story</a></div><ul class="hero-assurance-row"><li>Evidence-led</li><li>Human-centered</li><li>Accessible by default</li></ul></div><div class="hero-media"><div class="hero-media-frame"><div class="hero-media-play" aria-hidden="true"><span></span></div><p class="hero-media-kicker">Story video placeholder</p></div><p class="hero-media-caption">video_placeholder.mp4</p></div></div></section>',
    },
  ];
}

export async function fetchHomePageData(): Promise<HomePageData> {
  let data: HomePageQueryData | null = null;
  let fallbackData: HomePageFallbackQueryData | null = null;

  try {
    data = await fetchWordPress<HomePageQueryData>(HOME_PAGE_QUERY);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('Cannot query field "editorBlocks"')
    ) {
      fallbackData = await fetchWordPress<HomePageFallbackQueryData>(
        HOME_PAGE_FALLBACK_QUERY,
      );
    } else {
      throw error;
    }
  }

  if (fallbackData) {
    if (!fallbackData.nodeByUri || fallbackData.nodeByUri.__typename !== "Page") {
      throw new Error('Expected a published "home" page at /home/.');
    }

    const content = fallbackData.nodeByUri.content || "";
    const looksLikeStyledSeed =
      content.includes("block-site-header") ||
      content.includes("hero-layout") ||
      content.includes("newsletter-card");

    return {
      siteTitle: fallbackData.generalSettings.title,
      siteDescription: fallbackData.generalSettings.description,
      blocks: looksLikeStyledSeed
        ? [
            {
              id: "home-content-fallback",
              name: "core/post-content",
              renderedHtml: content,
            },
          ]
        : getFallbackHomeBlocks(),
    };
  }

  if (!data) {
    throw new Error("Home page query returned no data.");
  }

  if (!data.nodeByUri || data.nodeByUri.__typename !== "Page") {
    throw new Error('Expected a published "home" page at /home/.');
  }

  const blocks =
    data.nodeByUri.editorBlocks
      ?.filter((block) => Boolean(block.renderedHtml))
      .map((block, index) => ({
        id: block.id || `home-block-${index}`,
        name: block.name || "core/html",
        renderedHtml: block.renderedHtml || "",
      })) ?? [];

  return {
    siteTitle: data.generalSettings.title,
    siteDescription: data.generalSettings.description,
    blocks: blocks.length > 0 ? blocks : getFallbackHomeBlocks(),
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
