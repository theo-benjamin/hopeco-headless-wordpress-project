# Hopeco Headless WordPress

Next.js frontend + Dockerized WordPress + WPGraphQL + Gutenberg blocks for section-based composition.

## Stack

- Next.js App Router with TypeScript
- WordPress + MySQL in Docker Compose
- `WPGraphQL`
- `Advanced Custom Fields`
- `WPGraphQL for ACF`
- `WPGraphQL Content Blocks`

## Local Setup

1. Install frontend dependencies:

   ```bash
   npm install
   ```

2. Bootstrap WordPress:

   ```bash
   chmod +x scripts/bootstrap-wordpress.sh
   ./scripts/bootstrap-wordpress.sh
   ```

3. Configure the frontend environment:

   ```bash
   cp .env.local.example .env.local
   ```

4. Start the frontend:

   ```bash
   npm run dev
   ```

## Local URLs

- Next.js: `http://localhost:3000`
- WordPress admin: `http://localhost:8080/wp-admin`
- GraphQL endpoint: `http://localhost:8080/graphql`

If port `8080` is already in use on your machine or server, change `WORDPRESS_HOST_PORT` in `.env.wordpress` and keep `WORDPRESS_SITE_URL` aligned with it.

Default WordPress admin credentials come from `.env.wordpress`:

- Username: `admin`
- Password: `admin12345`

## Seeded Content

The bootstrap script installs WordPress, activates the required plugins, sets permalinks, and creates:

- a `home` front page with section-based ACF fields matching the HopeCo==ci wireframe
- an `about` page with starter ACF hero fields
- two seeded update posts for the homepage feed

## ACF Field Group

The repo ships a small MU plugin at `wordpress/wp-content/mu-plugins/hopeco-headless-fields.php`.

It registers:

- `pageHero` for regular pages

The homepage itself is now managed in the native WordPress block editor and queried via `editorBlocks` from `WPGraphQL Content Blocks`.

The seeded front page is built from Gutenberg blocks:

- group
- columns
- heading
- paragraph
- list
- buttons
- latest posts
- small HTML fragments where core blocks are not enough

This means editors can reorder, duplicate, and edit homepage sections directly in Gutenberg without ACF Pro.

## Reseed The Home Page

If WordPress content drifts or the home page needs to be overwritten with the repo's styled Gutenberg seed again, run:

```bash
bash scripts/seed-homepage.sh
```

This updates the `home` page content from `scripts/editorial-homepage-blocks.html` and reassigns it as the static front page.

The homepage feed pulls the latest WordPress posts over GraphQL, and `/updates` renders a simple archive view.

The page field group exposed in GraphQL as `pageHero` includes:

- `heroTitle`
- `heroText`
- `ctaLabel`
- `ctaUrl`
- `heroImage`

## Verification

After bootstrap:

```bash
curl http://localhost:8080/graphql \
  -H 'Content-Type: application/json' \
  --data '{"query":"{ generalSettings { title } pages(first: 2) { nodes { slug title pageHero { heroTitle } } } }"}'
```

Then run:

```bash
npm run lint
npm run build
```

## Deployment Hook

A bare-repo `post-receive` deployment hook template is included at `scripts/post-receive`.

Setup notes are in `docs/deploy-hook.md`.

For production process management, a `systemd` unit template for the Next.js app is included at `docs/systemd/hopeco-next.service`.
