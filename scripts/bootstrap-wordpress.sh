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

run_wp() {
  docker compose run --rm wpcli "$@"
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

set_acf_text_field() {
  local post_id="$1"
  local meta_key="$2"
  local field_key="$3"
  local value="$4"

  run_wp "wp post meta update $post_id $meta_key \"$value\" --allow-root" >/dev/null
  run_wp "wp post meta update $post_id _$meta_key $field_key --allow-root" >/dev/null
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

  set_acf_text_field "$home_id" "hero_title" "field_hopeco_hero_title" "Headless content without the WordPress theme layer"
  set_acf_text_field "$home_id" "hero_text" "field_hopeco_hero_text" "Edit this copy in WordPress, then watch the Next.js page update after revalidation."
  set_acf_text_field "$home_id" "cta_label" "field_hopeco_cta_label" "View updates"
  set_acf_text_field "$home_id" "cta_url" "field_hopeco_cta_url" "/updates"

  set_acf_text_field "$home_id" "header_nav_mission_label" "field_hopeco_header_mission_label" "Our Mission"
  set_acf_text_field "$home_id" "header_nav_mission_url" "field_hopeco_header_mission_url" "#mission"
  set_acf_text_field "$home_id" "header_nav_programs_label" "field_hopeco_header_programs_label" "Programs"
  set_acf_text_field "$home_id" "header_nav_programs_url" "field_hopeco_header_programs_url" "#programs"
  set_acf_text_field "$home_id" "header_nav_impact_label" "field_hopeco_header_impact_label" "Impact"
  set_acf_text_field "$home_id" "header_nav_impact_url" "field_hopeco_header_impact_url" "#impact"
  set_acf_text_field "$home_id" "header_nav_resources_label" "field_hopeco_header_resources_label" "Resources"
  set_acf_text_field "$home_id" "header_nav_resources_url" "field_hopeco_header_resources_url" "#resources"
  set_acf_text_field "$home_id" "header_nav_support_label" "field_hopeco_header_support_label" "Get Help Now"
  set_acf_text_field "$home_id" "header_nav_support_url" "field_hopeco_header_support_url" "#programs"
  set_acf_text_field "$home_id" "header_nav_donate_label" "field_hopeco_header_donate_label" "Donate Now"
  set_acf_text_field "$home_id" "header_nav_donate_url" "field_hopeco_header_donate_url" "#programs"

  set_acf_text_field "$home_id" "hero_section_eyebrow" "field_hopeco_hero_eyebrow" "High contrast, ARIA labels, clear CTAs"
  set_acf_text_field "$home_id" "hero_section_title_intro" "field_hopeco_hero_title_intro" "Advocating for"
  set_acf_text_field "$home_id" "hero_section_title_highlight" "field_hopeco_hero_title_highlight" "Human Dignity."
  set_acf_text_field "$home_id" "hero_section_description" "field_hopeco_hero_description" "We provide sanctuary, resources, and unwavering support to those navigating systemic crises. Your journey matters here."
  set_acf_text_field "$home_id" "hero_section_primary_cta_label" "field_hopeco_hero_primary_cta_label" "Get Support"
  set_acf_text_field "$home_id" "hero_section_primary_cta_url" "field_hopeco_hero_primary_cta_url" "#programs"
  set_acf_text_field "$home_id" "hero_section_secondary_cta_label" "field_hopeco_hero_secondary_cta_label" "Watch Our Story"
  set_acf_text_field "$home_id" "hero_section_secondary_cta_url" "field_hopeco_hero_secondary_cta_url" "#impact"
  set_acf_text_field "$home_id" "hero_section_media_label" "field_hopeco_hero_media_label" "Story video placeholder"
  set_acf_text_field "$home_id" "hero_section_media_url" "field_hopeco_hero_media_url" "video_placeholder.mp4"

  set_acf_text_field "$home_id" "pathways_section_eyebrow" "field_hopeco_pathways_eyebrow" "Distinct blocks, logical tab order, keyboard focus"
  set_acf_text_field "$home_id" "pathways_section_heading" "field_hopeco_pathways_heading" "Choose Your Path"

  set_acf_text_field "$home_id" "path_card_one_title" "field_hopeco_path_card_one_title" "Get Support"
  set_acf_text_field "$home_id" "path_card_one_description" "field_hopeco_path_card_one_description" "Access immediate resources and safe spaces."
  set_acf_text_field "$home_id" "path_card_one_label" "field_hopeco_path_card_one_label" "Get Support"
  set_acf_text_field "$home_id" "path_card_one_url" "field_hopeco_path_card_one_url" "#resources"

  set_acf_text_field "$home_id" "path_card_two_title" "field_hopeco_path_card_two_title" "Volunteer"
  set_acf_text_field "$home_id" "path_card_two_description" "field_hopeco_path_card_two_description" "Join our network of advocates on the ground."
  set_acf_text_field "$home_id" "path_card_two_label" "field_hopeco_path_card_two_label" "Volunteer"
  set_acf_text_field "$home_id" "path_card_two_url" "field_hopeco_path_card_two_url" "#resources"

  set_acf_text_field "$home_id" "path_card_three_title" "field_hopeco_path_card_three_title" "Partner"
  set_acf_text_field "$home_id" "path_card_three_description" "field_hopeco_path_card_three_description" "Collaborate with us to expand our reach."
  set_acf_text_field "$home_id" "path_card_three_label" "field_hopeco_path_card_three_label" "Partner"
  set_acf_text_field "$home_id" "path_card_three_url" "field_hopeco_path_card_three_url" "#resources"

  set_acf_text_field "$home_id" "path_card_four_title" "field_hopeco_path_card_four_title" "Donate"
  set_acf_text_field "$home_id" "path_card_four_description" "field_hopeco_path_card_four_description" "Fund the mission. Every contribution matters."
  set_acf_text_field "$home_id" "path_card_four_label" "field_hopeco_path_card_four_label" "Donate"
  set_acf_text_field "$home_id" "path_card_four_url" "field_hopeco_path_card_four_url" "#resources"

  set_acf_text_field "$home_id" "impact_section_eyebrow" "field_hopeco_impact_eyebrow" "Screen reader friendly metrics + personal story"
  set_acf_text_field "$home_id" "impact_section_heading" "field_hopeco_impact_heading" "Our Impact"
  set_acf_text_field "$home_id" "impact_section_metric_one_value" "field_hopeco_metric_one_value" "10,000+"
  set_acf_text_field "$home_id" "impact_section_metric_one_label" "field_hopeco_metric_one_label" "Families Supported"
  set_acf_text_field "$home_id" "impact_section_metric_two_value" "field_hopeco_metric_two_value" "50"
  set_acf_text_field "$home_id" "impact_section_metric_two_label" "field_hopeco_metric_two_label" "Sanctuaries Built"
  set_acf_text_field "$home_id" "impact_section_metric_three_value" "field_hopeco_metric_three_value" '$2.5M'
  set_acf_text_field "$home_id" "impact_section_metric_three_label" "field_hopeco_metric_three_label" "In Direct Aid"
  set_acf_text_field "$home_id" "impact_section_story_quote" "field_hopeco_story_quote" "The sanctuary wasn’t just a roof. It was the first time in months I felt seen."
  set_acf_text_field "$home_id" "impact_section_story_name" "field_hopeco_story_name" "Maria V."
  set_acf_text_field "$home_id" "impact_section_story_role" "field_hopeco_story_role" "Program Participant"

  set_acf_text_field "$home_id" "updates_section_eyebrow" "field_hopeco_updates_eyebrow" "Feed + Newsletter Opt-in"
  set_acf_text_field "$home_id" "updates_section_heading" "field_hopeco_updates_heading" "Latest Updates"
  set_acf_text_field "$home_id" "updates_section_view_all_label" "field_hopeco_updates_view_all_label" "View All"
  set_acf_text_field "$home_id" "updates_section_view_all_url" "field_hopeco_updates_view_all_url" "/updates"
  set_acf_text_field "$home_id" "updates_section_newsletter_heading" "field_hopeco_newsletter_heading" "Stay Informed"
  set_acf_text_field "$home_id" "updates_section_newsletter_description" "field_hopeco_newsletter_description" "Subscribe to our newsletter for crucial updates and stories from the field."
  set_acf_text_field "$home_id" "updates_section_newsletter_placeholder" "field_hopeco_newsletter_placeholder" "Email Address"
  set_acf_text_field "$home_id" "updates_section_newsletter_button_label" "field_hopeco_newsletter_button_label" "Subscribe"
  set_acf_text_field "$home_id" "updates_section_newsletter_disclaimer" "field_hopeco_newsletter_disclaimer" "We respect your privacy. Unsubscribe anytime."

  set_acf_text_field "$home_id" "footer_section_blurb" "field_hopeco_footer_blurb" "Building a digital sanctuary for those navigating systemic crises."
  set_acf_text_field "$home_id" "footer_section_organization_heading" "field_hopeco_footer_organization_heading" "Organization"
  set_acf_text_field "$home_id" "footer_section_organization_link_one_label" "field_hopeco_footer_org_one_label" "Our Mission"
  set_acf_text_field "$home_id" "footer_section_organization_link_one_url" "field_hopeco_footer_org_one_url" "#mission"
  set_acf_text_field "$home_id" "footer_section_organization_link_two_label" "field_hopeco_footer_org_two_label" "Programs"
  set_acf_text_field "$home_id" "footer_section_organization_link_two_url" "field_hopeco_footer_org_two_url" "#programs"
  set_acf_text_field "$home_id" "footer_section_organization_link_three_label" "field_hopeco_footer_org_three_label" "Impact"
  set_acf_text_field "$home_id" "footer_section_organization_link_three_url" "field_hopeco_footer_org_three_url" "#impact"
  set_acf_text_field "$home_id" "footer_section_organization_link_four_label" "field_hopeco_footer_org_four_label" "Careers"
  set_acf_text_field "$home_id" "footer_section_organization_link_four_url" "field_hopeco_footer_org_four_url" "#resources"
  set_acf_text_field "$home_id" "footer_section_support_heading" "field_hopeco_footer_support_heading" "Support"
  set_acf_text_field "$home_id" "footer_section_support_link_one_label" "field_hopeco_footer_support_one_label" "Get Help Now"
  set_acf_text_field "$home_id" "footer_section_support_link_one_url" "field_hopeco_footer_support_one_url" "#programs"
  set_acf_text_field "$home_id" "footer_section_support_link_two_label" "field_hopeco_footer_support_two_label" "Resources"
  set_acf_text_field "$home_id" "footer_section_support_link_two_url" "field_hopeco_footer_support_two_url" "#resources"
  set_acf_text_field "$home_id" "footer_section_support_link_three_label" "field_hopeco_footer_support_three_label" "Contact Us"
  set_acf_text_field "$home_id" "footer_section_support_link_three_url" "field_hopeco_footer_support_three_url" "#footer"
  set_acf_text_field "$home_id" "footer_section_support_link_four_label" "field_hopeco_footer_support_four_label" "Donate"
  set_acf_text_field "$home_id" "footer_section_support_link_four_url" "field_hopeco_footer_support_four_url" "#programs"
  set_acf_text_field "$home_id" "footer_section_accessibility_heading" "field_hopeco_footer_accessibility_heading" "Accessibility"
  set_acf_text_field "$home_id" "footer_section_accessibility_text" "field_hopeco_footer_accessibility_text" "We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone."
  set_acf_text_field "$home_id" "footer_section_accessibility_link_label" "field_hopeco_footer_accessibility_link_label" "Read our Statement"
  set_acf_text_field "$home_id" "footer_section_accessibility_link_url" "field_hopeco_footer_accessibility_link_url" "#footer"
  set_acf_text_field "$home_id" "footer_section_legal_text" "field_hopeco_footer_legal_text" "© 2024 The Editorial Advocate. Designed for Sanctuary."
  set_acf_text_field "$home_id" "footer_section_privacy_label" "field_hopeco_footer_privacy_label" "Privacy Policy"
  set_acf_text_field "$home_id" "footer_section_privacy_url" "field_hopeco_footer_privacy_url" "#footer"
  set_acf_text_field "$home_id" "footer_section_terms_label" "field_hopeco_footer_terms_label" "Terms of Service"
  set_acf_text_field "$home_id" "footer_section_terms_url" "field_hopeco_footer_terms_url" "#footer"

  set_acf_text_field "$about_id" "hero_title" "field_hopeco_hero_title" "Built for a clean editorial workflow"
  set_acf_text_field "$about_id" "hero_text" "field_hopeco_hero_text" "This page demonstrates a second published page with its own ACF hero fields."
  set_acf_text_field "$about_id" "cta_label" "field_hopeco_cta_label" "Return home"
  set_acf_text_field "$about_id" "cta_url" "field_hopeco_cta_url" "/"

  run_wp "wp option update show_on_front page --allow-root" >/dev/null
  run_wp "wp option update page_on_front $home_id --allow-root" >/dev/null
}

echo "Starting Docker services..."
docker compose up -d mysql wordpress

wait_for_wordpress
ensure_wordpress
ensure_plugin advanced-custom-fields
ensure_plugin wp-graphql
ensure_plugin wpgraphql-acf
configure_site
seed_content

echo "WordPress bootstrap complete."
echo "Admin URL: ${WORDPRESS_SITE_URL}/wp-admin"
echo "GraphQL URL: ${WORDPRESS_SITE_URL}/graphql"
