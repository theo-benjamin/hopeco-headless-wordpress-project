#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

if [[ ! -f .env.wordpress ]]; then
  echo ".env.wordpress is missing."
  exit 1
fi

if [[ ! -f scripts/editorial-homepage-blocks.html ]]; then
  echo "scripts/editorial-homepage-blocks.html is missing."
  exit 1
fi

set -a
source .env.wordpress
set +a

run_wp() {
  docker compose --env-file .env.wordpress exec -T wpcli bash -lc "$1"
}

wait_for_wordpress() {
  echo "Waiting for WordPress..."

  for _ in {1..40}; do
    if run_wp "wp core is-installed --allow-root" >/dev/null 2>&1; then
      return 0
    fi

    sleep 3
  done

  echo "WordPress did not become ready in time."
  exit 1
}

find_or_create_home_page() {
  local home_id
  home_id="$(run_wp "wp post list --post_type=page --name=home --field=ID --posts_per_page=1 --allow-root" | tail -n 1)"

  if [[ -n "$home_id" ]]; then
    echo "$home_id"
    return
  fi

  run_wp "wp post create --post_type=page --post_status=publish --post_title='Home' --post_name=home --porcelain --allow-root" | tail -n 1
}

seed_homepage_blocks() {
  local post_id="$1"
  run_wp 'CONTENT="$(cat /scripts/editorial-homepage-blocks.html)"; wp post update '"$post_id"' --post_title="Home" --post_name=home --post_status=publish --post_content="$CONTENT" --allow-root' >/dev/null
}

set_front_page() {
  local post_id="$1"
  run_wp "wp option update show_on_front page --allow-root" >/dev/null
  run_wp "wp option update page_on_front $post_id --allow-root" >/dev/null
}

wait_for_wordpress

home_id="$(find_or_create_home_page)"
seed_homepage_blocks "$home_id"
set_front_page "$home_id"

echo "Homepage seeded."
echo "Home page ID: $home_id"
