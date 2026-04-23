function readRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing ${name}. Add it to .env.local before starting the Next.js app.`,
    );
  }

  return value;
}

export function getWordPressGraphqlUrl() {
  return readRequiredEnv("WORDPRESS_GRAPHQL_URL");
}

export function getRevalidateSeconds() {
  const value = process.env.REVALIDATE_SECONDS;

  if (!value) {
    return 60;
  }

  const parsed = Number.parseInt(value, 10);

  return Number.isNaN(parsed) ? 60 : parsed;
}

