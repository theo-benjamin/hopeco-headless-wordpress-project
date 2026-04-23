export const HOME_PAGE_QUERY = /* GraphQL */ `
  query HomePageQuery {
    generalSettings {
      title
      description
    }
    nodeByUri(uri: "/home/") {
      __typename
      ... on Page {
        id
        slug
        title
        editorBlocks(flat: false) {
          id
          name
          renderedHtml
        }
      }
    }
  }
`;

export const PAGE_SLUGS_QUERY = /* GraphQL */ `
  query PageSlugsQuery {
    pages(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

export const PAGE_BY_URI_QUERY = /* GraphQL */ `
  query PageByUriQuery($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on Page {
        id
        slug
        title
        content
        pageHero {
          heroTitle
          heroText
          ctaLabel
          ctaUrl
          heroImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export const POST_SLUGS_QUERY = /* GraphQL */ `
  query PostSlugsQuery {
    posts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

export const POST_BY_SLUG_QUERY = /* GraphQL */ `
  query PostBySlugQuery($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      date
      content
      excerpt
      categories {
        nodes {
          name
        }
      }
    }
  }
`;

export const POSTS_QUERY = /* GraphQL */ `
  query PostsQuery($first: Int!) {
    posts(first: $first) {
      nodes {
        id
        slug
        title
        date
        excerpt
        content
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;
