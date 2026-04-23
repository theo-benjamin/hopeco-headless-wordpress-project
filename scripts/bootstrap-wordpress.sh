#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

if [[ ! -f .env.wordpress ]]; then
  echo ".env.wordpress is missing."
  exit 1
fi

set -a
source .env.wordpress
set +a

CONTENT_BLOCKS_RELEASE_URL="${CONTENT_BLOCKS_RELEASE_URL:-https://github.com/wpengine/wp-graphql-content-blocks/releases/latest/download/wp-graphql-content-blocks.zip}"

run_wp() {
  docker compose --env-file .env.wordpress exec -T wpcli bash -lc "$1"
}

wait_for_wordpress() {
  echo "Waiting for WordPress core files..."

  for _ in {1..40}; do
    if run_wp "wp core version --allow-root" >/dev/null 2>&1; then
      return 0
    fi

    sleep 3
  done

  echo "WordPress did not become ready in time."
  exit 1
}

ensure_wordpress() {
  if run_wp "wp core is-installed --allow-root" >/dev/null 2>&1; then
    echo "WordPress is already installed."
    return
  fi

  echo "Installing WordPress core..."
  run_wp "wp core install --url='$WORDPRESS_SITE_URL' --title='$WORDPRESS_SITE_TITLE' --admin_user='$WORDPRESS_ADMIN_USER' --admin_password='$WORDPRESS_ADMIN_PASSWORD' --admin_email='$WORDPRESS_ADMIN_EMAIL' --skip-email --allow-root"
}

ensure_plugin() {
  local plugin_slug="$1"

  if run_wp "wp plugin is-installed $plugin_slug --allow-root" >/dev/null 2>&1; then
    run_wp "wp plugin activate $plugin_slug --allow-root" >/dev/null
    echo "Plugin ready: $plugin_slug"
    return
  fi

  echo "Installing plugin: $plugin_slug"
  run_wp "wp plugin install $plugin_slug --activate --allow-root" >/dev/null
}

ensure_plugin_from_url() {
  local plugin_slug="$1"
  local plugin_url="$2"

  if run_wp "wp plugin is-installed $plugin_slug --allow-root" >/dev/null 2>&1; then
    run_wp "wp plugin activate $plugin_slug --allow-root" >/dev/null
    echo "Plugin ready: $plugin_slug"
    return
  fi

  echo "Installing plugin from URL: $plugin_slug"
  run_wp "wp plugin install '$plugin_url' --activate --allow-root" >/dev/null
}

seed_homepage_blocks() {
  local post_id="$1"
  run_wp 'CONTENT="$(cat /scripts/editorial-homepage-blocks.html)"; wp post update '"$post_id"' --post_content="$CONTENT" --allow-root' >/dev/null
}

seed_page_hero() {
  local post_id="$1"
  local title="$2"
  local text="$3"
  local cta_label="$4"
  local cta_url="$5"

  run_wp "wp eval \"update_field('field_hopeco_hero_title', '$title', $post_id); update_field('field_hopeco_hero_text', '$text', $post_id); update_field('field_hopeco_cta_label', '$cta_label', $post_id); update_field('field_hopeco_cta_url', '$cta_url', $post_id);\" --allow-root" >/dev/null
}

create_page_if_missing() {
  local slug="$1"
  local title="$2"
  local content="$3"

  local existing_id
  existing_id="$(run_wp "wp post list --post_type=page --name=$slug --field=ID --posts_per_page=1 --allow-root" | tail -n 1)"

  if [[ -n "$existing_id" ]]; then
    echo "$existing_id"
    return
  fi

  run_wp "wp post create --post_type=page --post_status=publish --post_title=\"$title\" --post_name=$slug --post_content=\"$content\" --porcelain --allow-root" | tail -n 1
}

create_post_if_missing() {
  local slug="$1"
  local title="$2"
  local content="$3"

  local existing_id
  existing_id="$(run_wp "wp post list --post_type=post --name=$slug --field=ID --posts_per_page=1 --allow-root" | tail -n 1)"

  if [[ -n "$existing_id" ]]; then
    echo "$existing_id"
    return
  fi

  run_wp "wp post create --post_type=post --post_status=publish --post_title=\"$title\" --post_name=$slug --post_content=\"$content\" --porcelain --allow-root" | tail -n 1
}

create_category_if_missing() {
  local slug="$1"
  local name="$2"

  local existing_id
  existing_id="$(run_wp "wp term list category --slug=$slug --field=term_id --allow-root" | tail -n 1)"

  if [[ -n "$existing_id" ]]; then
    echo "$existing_id"
    return
  fi

  run_wp "wp term create category \"$name\" --slug=$slug --porcelain --allow-root" | tail -n 1
}

assign_category_to_post() {
  local post_id="$1"
  local category_slug="$2"

  run_wp "wp post term set $post_id category $category_slug --by=slug --allow-root" >/dev/null
}

configure_site() {
  run_wp "wp option update permalink_structure '/%postname%/' --allow-root" >/dev/null
  run_wp "wp option update blogdescription 'Building a digital sanctuary for those navigating systemic crises.' --allow-root" >/dev/null
}

verify_editor_blocks_support() {
  local graphql_url
  local response

  command -v curl >/dev/null 2>&1 || {
    echo "curl is required to verify editorBlocks support."
    exit 1
  }

  graphql_url="http://${WORDPRESS_HOST_BIND:-127.0.0.1}:${WORDPRESS_HOST_PORT:-8080}/graphql"
  response="$(
    curl -s \
      -H "Content-Type: application/json" \
      --data '{"query":"query VerifyEditorBlocks { nodeByUri(uri: \"/home/\") { __typename ... on Page { editorBlocks(flat: false) { id name } } } }"}' \
      "$graphql_url"
  )"

  if printf '%s' "$response" | grep -q '"editorBlocks"'; then
    echo "Verified editorBlocks support at ${graphql_url}"
    return
  fi

  echo "WPGraphQL Content Blocks is not active in the schema."
  echo "GraphQL response: $response"
  exit 1
}

seed_content() {
  local home_id
  local about_id
  local event_category_id
  local news_category_id
  local event_post_id
  local news_post_id

  home_id="$(create_page_if_missing "home" "Home" "<p>This page is the editorial homepage in the headless build. Update the ACF fields below to reshape the sections block by block.</p>")"
  about_id="$(create_page_if_missing "about" "About" "<p>Use this page to verify ACF-backed hero content coming through GraphQL.</p>")"

  event_category_id="$(create_category_if_missing "event" "Event")"
  news_category_id="$(create_category_if_missing "news" "News")"

  event_post_id="$(create_post_if_missing "annual-community-town-hall" "Annual Community Town Hall" "<p>Join us for an open discussion on the upcoming policy changes affecting our neighborhoods.</p>")"
  news_post_id="$(create_post_if_missing "new-sanctuary-opened-in-westside" "New Sanctuary Opened in Westside" "<p>We are thrilled to announce the opening of our newest facility providing emergency housing.</p>")"

  assign_category_to_post "$event_post_id" "event"
  assign_category_to_post "$news_post_id" "news"

  run_wp "wp option update show_on_front page --allow-root" >/dev/null
  run_wp "wp option update page_on_front $home_id --allow-root" >/dev/null
  seed_homepage_blocks "$home_id"
  seed_page_hero "$about_id" "Built for a clean editorial workflow" "This page demonstrates a second published page with its own ACF hero fields." "Return home" "/"
}

echo "Starting Docker services..."
docker compose --env-file .env.wordpress up -d mysql wordpress wpcli

wait_for_wordpress
ensure_wordpress
ensure_plugin advanced-custom-fields
ensure_plugin wp-graphql
ensure_plugin wpgraphql-acf
ensure_plugin_from_url wp-graphql-content-blocks "$CONTENT_BLOCKS_RELEASE_URL"
configure_site
seed_content
verify_editor_blocks_support

echo "WordPress bootstrap complete."
echo "Admin URL: ${WORDPRESS_SITE_URL}/wp-admin"
echo "GraphQL URL: ${WORDPRESS_SITE_URL}/graphql"
