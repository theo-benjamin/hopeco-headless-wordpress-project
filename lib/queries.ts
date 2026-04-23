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
        editorialHomePage {
          headerNav {
            missionLabel
            missionUrl
            programsLabel
            programsUrl
            impactLabel
            impactUrl
            resourcesLabel
            resourcesUrl
            supportLabel
            supportUrl
            donateLabel
            donateUrl
          }
          heroSection {
            eyebrow
            titleIntro
            titleHighlight
            description
            primaryCtaLabel
            primaryCtaUrl
            secondaryCtaLabel
            secondaryCtaUrl
            mediaLabel
            mediaUrl
          }
          pathwaysSection {
            eyebrow
            heading
          }
          pathCardOne {
            title
            description
            label
            url
          }
          pathCardTwo {
            title
            description
            label
            url
          }
          pathCardThree {
            title
            description
            label
            url
          }
          pathCardFour {
            title
            description
            label
            url
          }
          impactSection {
            eyebrow
            heading
            metricOneValue
            metricOneLabel
            metricTwoValue
            metricTwoLabel
            metricThreeValue
            metricThreeLabel
            storyQuote
            storyName
            storyRole
            storyImage {
              node {
                sourceUrl
                altText
              }
            }
          }
          updatesSection {
            eyebrow
            heading
            viewAllLabel
            viewAllUrl
            newsletterHeading
            newsletterDescription
            newsletterPlaceholder
            newsletterButtonLabel
            newsletterDisclaimer
          }
          footerSection {
            blurb
            organizationHeading
            organizationLinkOneLabel
            organizationLinkOneUrl
            organizationLinkTwoLabel
            organizationLinkTwoUrl
            organizationLinkThreeLabel
            organizationLinkThreeUrl
            organizationLinkFourLabel
            organizationLinkFourUrl
            supportHeading
            supportLinkOneLabel
            supportLinkOneUrl
            supportLinkTwoLabel
            supportLinkTwoUrl
            supportLinkThreeLabel
            supportLinkThreeUrl
            supportLinkFourLabel
            supportLinkFourUrl
            accessibilityHeading
            accessibilityText
            accessibilityLinkLabel
            accessibilityLinkUrl
            legalText
            privacyLabel
            privacyUrl
            termsLabel
            termsUrl
          }
        }
      }
    }
    posts(first: 2) {
      nodes {
        id
        slug
        title
        date
        excerpt
        categories {
          nodes {
            name
          }
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
