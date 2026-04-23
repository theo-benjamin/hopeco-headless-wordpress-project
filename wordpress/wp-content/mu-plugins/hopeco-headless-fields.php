<?php
/**
 * Plugin Name: Hopeco Headless Fields
 * Description: Registers starter ACF fields for the headless demo.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    $text = function ($key, $label, $name) {
        return [
            'key' => $key,
            'label' => $label,
            'name' => $name,
            'type' => 'text',
            'show_in_graphql' => 1,
        ];
    };

    $url = function ($key, $label, $name) {
        return [
            'key' => $key,
            'label' => $label,
            'name' => $name,
            'type' => 'url',
            'show_in_graphql' => 1,
        ];
    };

    $textarea = function ($key, $label, $name, $rows = 4) {
        return [
            'key' => $key,
            'label' => $label,
            'name' => $name,
            'type' => 'textarea',
            'rows' => $rows,
            'new_lines' => 'wpautop',
            'show_in_graphql' => 1,
        ];
    };

    $group = function ($key, $label, $name, $fields) {
        return [
            'key' => $key,
            'label' => $label,
            'name' => $name,
            'type' => 'group',
            'layout' => 'block',
            'show_in_graphql' => 1,
            'sub_fields' => $fields,
        ];
    };

    acf_add_local_field_group([
        'key' => 'group_hopeco_page_hero',
        'title' => 'Page Hero',
        'show_in_graphql' => 1,
        'graphql_field_name' => 'pageHero',
        'map_graphql_types_from_location_rules' => 0,
        'graphql_types' => ['Page'],
        'fields' => [
            [
                'key' => 'field_hopeco_hero_title',
                'label' => 'Hero Title',
                'name' => 'hero_title',
                'type' => 'text',
                'show_in_graphql' => 1,
            ],
            [
                'key' => 'field_hopeco_hero_text',
                'label' => 'Hero Text',
                'name' => 'hero_text',
                'type' => 'textarea',
                'rows' => 4,
                'new_lines' => 'wpautop',
                'show_in_graphql' => 1,
            ],
            [
                'key' => 'field_hopeco_cta_label',
                'label' => 'CTA Label',
                'name' => 'cta_label',
                'type' => 'text',
                'show_in_graphql' => 1,
            ],
            [
                'key' => 'field_hopeco_cta_url',
                'label' => 'CTA URL',
                'name' => 'cta_url',
                'type' => 'url',
                'show_in_graphql' => 1,
            ],
            [
                'key' => 'field_hopeco_hero_image',
                'label' => 'Hero Image',
                'name' => 'hero_image',
                'type' => 'image',
                'return_format' => 'array',
                'preview_size' => 'large',
                'library' => 'all',
                'show_in_graphql' => 1,
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'page',
                ],
            ],
        ],
    ]);

    acf_add_local_field_group([
        'key' => 'group_hopeco_editorial_home',
        'title' => 'Editorial Home Page',
        'show_in_graphql' => 1,
        'graphql_field_name' => 'editorialHomePage',
        'map_graphql_types_from_location_rules' => 0,
        'graphql_types' => ['Page'],
        'fields' => [
            $group('field_hopeco_header_nav', 'Header Navigation', 'header_nav', [
                $text('field_hopeco_header_mission_label', 'Mission Label', 'mission_label'),
                $url('field_hopeco_header_mission_url', 'Mission URL', 'mission_url'),
                $text('field_hopeco_header_programs_label', 'Programs Label', 'programs_label'),
                $url('field_hopeco_header_programs_url', 'Programs URL', 'programs_url'),
                $text('field_hopeco_header_impact_label', 'Impact Label', 'impact_label'),
                $url('field_hopeco_header_impact_url', 'Impact URL', 'impact_url'),
                $text('field_hopeco_header_resources_label', 'Resources Label', 'resources_label'),
                $url('field_hopeco_header_resources_url', 'Resources URL', 'resources_url'),
                $text('field_hopeco_header_support_label', 'Support CTA Label', 'support_label'),
                $url('field_hopeco_header_support_url', 'Support CTA URL', 'support_url'),
                $text('field_hopeco_header_donate_label', 'Donate CTA Label', 'donate_label'),
                $url('field_hopeco_header_donate_url', 'Donate CTA URL', 'donate_url'),
            ]),
            $group('field_hopeco_hero_section', 'Hero Section', 'hero_section', [
                $text('field_hopeco_hero_eyebrow', 'Eyebrow', 'eyebrow'),
                $text('field_hopeco_hero_title_intro', 'Title Intro', 'title_intro'),
                $text('field_hopeco_hero_title_highlight', 'Title Highlight', 'title_highlight'),
                $textarea('field_hopeco_hero_description', 'Description', 'description', 5),
                $text('field_hopeco_hero_primary_cta_label', 'Primary CTA Label', 'primary_cta_label'),
                $url('field_hopeco_hero_primary_cta_url', 'Primary CTA URL', 'primary_cta_url'),
                $text('field_hopeco_hero_secondary_cta_label', 'Secondary CTA Label', 'secondary_cta_label'),
                $url('field_hopeco_hero_secondary_cta_url', 'Secondary CTA URL', 'secondary_cta_url'),
                $text('field_hopeco_hero_media_label', 'Media Label', 'media_label'),
                $text('field_hopeco_hero_media_url', 'Media URL or Caption', 'media_url'),
            ]),
            $group('field_hopeco_pathways_section', 'Pathways Section', 'pathways_section', [
                $text('field_hopeco_pathways_eyebrow', 'Eyebrow', 'eyebrow'),
                $text('field_hopeco_pathways_heading', 'Heading', 'heading'),
            ]),
            $group('field_hopeco_path_card_one', 'Path Card One', 'path_card_one', [
                $text('field_hopeco_path_card_one_title', 'Title', 'title'),
                $textarea('field_hopeco_path_card_one_description', 'Description', 'description'),
                $text('field_hopeco_path_card_one_label', 'Link Label', 'label'),
                $url('field_hopeco_path_card_one_url', 'Link URL', 'url'),
            ]),
            $group('field_hopeco_path_card_two', 'Path Card Two', 'path_card_two', [
                $text('field_hopeco_path_card_two_title', 'Title', 'title'),
                $textarea('field_hopeco_path_card_two_description', 'Description', 'description'),
                $text('field_hopeco_path_card_two_label', 'Link Label', 'label'),
                $url('field_hopeco_path_card_two_url', 'Link URL', 'url'),
            ]),
            $group('field_hopeco_path_card_three', 'Path Card Three', 'path_card_three', [
                $text('field_hopeco_path_card_three_title', 'Title', 'title'),
                $textarea('field_hopeco_path_card_three_description', 'Description', 'description'),
                $text('field_hopeco_path_card_three_label', 'Link Label', 'label'),
                $url('field_hopeco_path_card_three_url', 'Link URL', 'url'),
            ]),
            $group('field_hopeco_path_card_four', 'Path Card Four', 'path_card_four', [
                $text('field_hopeco_path_card_four_title', 'Title', 'title'),
                $textarea('field_hopeco_path_card_four_description', 'Description', 'description'),
                $text('field_hopeco_path_card_four_label', 'Link Label', 'label'),
                $url('field_hopeco_path_card_four_url', 'Link URL', 'url'),
            ]),
            $group('field_hopeco_impact_section', 'Impact Section', 'impact_section', [
                $text('field_hopeco_impact_eyebrow', 'Eyebrow', 'eyebrow'),
                $text('field_hopeco_impact_heading', 'Heading', 'heading'),
                $text('field_hopeco_metric_one_value', 'Metric One Value', 'metric_one_value'),
                $text('field_hopeco_metric_one_label', 'Metric One Label', 'metric_one_label'),
                $text('field_hopeco_metric_two_value', 'Metric Two Value', 'metric_two_value'),
                $text('field_hopeco_metric_two_label', 'Metric Two Label', 'metric_two_label'),
                $text('field_hopeco_metric_three_value', 'Metric Three Value', 'metric_three_value'),
                $text('field_hopeco_metric_three_label', 'Metric Three Label', 'metric_three_label'),
                $textarea('field_hopeco_story_quote', 'Story Quote', 'story_quote', 5),
                $text('field_hopeco_story_name', 'Story Name', 'story_name'),
                $text('field_hopeco_story_role', 'Story Role', 'story_role'),
                [
                    'key' => 'field_hopeco_story_image',
                    'label' => 'Story Image',
                    'name' => 'story_image',
                    'type' => 'image',
                    'return_format' => 'array',
                    'preview_size' => 'large',
                    'library' => 'all',
                    'show_in_graphql' => 1,
                ],
            ]),
            $group('field_hopeco_updates_section', 'Updates Section', 'updates_section', [
                $text('field_hopeco_updates_eyebrow', 'Eyebrow', 'eyebrow'),
                $text('field_hopeco_updates_heading', 'Heading', 'heading'),
                $text('field_hopeco_updates_view_all_label', 'View All Label', 'view_all_label'),
                $url('field_hopeco_updates_view_all_url', 'View All URL', 'view_all_url'),
                $text('field_hopeco_newsletter_heading', 'Newsletter Heading', 'newsletter_heading'),
                $textarea('field_hopeco_newsletter_description', 'Newsletter Description', 'newsletter_description'),
                $text('field_hopeco_newsletter_placeholder', 'Newsletter Placeholder', 'newsletter_placeholder'),
                $text('field_hopeco_newsletter_button_label', 'Newsletter Button Label', 'newsletter_button_label'),
                $text('field_hopeco_newsletter_disclaimer', 'Newsletter Disclaimer', 'newsletter_disclaimer'),
            ]),
            $group('field_hopeco_footer_section', 'Footer Section', 'footer_section', [
                $textarea('field_hopeco_footer_blurb', 'Footer Blurb', 'blurb'),
                $text('field_hopeco_footer_organization_heading', 'Organization Heading', 'organization_heading'),
                $text('field_hopeco_footer_org_one_label', 'Organization Link One Label', 'organization_link_one_label'),
                $url('field_hopeco_footer_org_one_url', 'Organization Link One URL', 'organization_link_one_url'),
                $text('field_hopeco_footer_org_two_label', 'Organization Link Two Label', 'organization_link_two_label'),
                $url('field_hopeco_footer_org_two_url', 'Organization Link Two URL', 'organization_link_two_url'),
                $text('field_hopeco_footer_org_three_label', 'Organization Link Three Label', 'organization_link_three_label'),
                $url('field_hopeco_footer_org_three_url', 'Organization Link Three URL', 'organization_link_three_url'),
                $text('field_hopeco_footer_org_four_label', 'Organization Link Four Label', 'organization_link_four_label'),
                $url('field_hopeco_footer_org_four_url', 'Organization Link Four URL', 'organization_link_four_url'),
                $text('field_hopeco_footer_support_heading', 'Support Heading', 'support_heading'),
                $text('field_hopeco_footer_support_one_label', 'Support Link One Label', 'support_link_one_label'),
                $url('field_hopeco_footer_support_one_url', 'Support Link One URL', 'support_link_one_url'),
                $text('field_hopeco_footer_support_two_label', 'Support Link Two Label', 'support_link_two_label'),
                $url('field_hopeco_footer_support_two_url', 'Support Link Two URL', 'support_link_two_url'),
                $text('field_hopeco_footer_support_three_label', 'Support Link Three Label', 'support_link_three_label'),
                $url('field_hopeco_footer_support_three_url', 'Support Link Three URL', 'support_link_three_url'),
                $text('field_hopeco_footer_support_four_label', 'Support Link Four Label', 'support_link_four_label'),
                $url('field_hopeco_footer_support_four_url', 'Support Link Four URL', 'support_link_four_url'),
                $text('field_hopeco_footer_accessibility_heading', 'Accessibility Heading', 'accessibility_heading'),
                $textarea('field_hopeco_footer_accessibility_text', 'Accessibility Text', 'accessibility_text', 5),
                $text('field_hopeco_footer_accessibility_link_label', 'Accessibility Link Label', 'accessibility_link_label'),
                $url('field_hopeco_footer_accessibility_link_url', 'Accessibility Link URL', 'accessibility_link_url'),
                $text('field_hopeco_footer_legal_text', 'Legal Text', 'legal_text'),
                $text('field_hopeco_footer_privacy_label', 'Privacy Label', 'privacy_label'),
                $url('field_hopeco_footer_privacy_url', 'Privacy URL', 'privacy_url'),
                $text('field_hopeco_footer_terms_label', 'Terms Label', 'terms_label'),
                $url('field_hopeco_footer_terms_url', 'Terms URL', 'terms_url'),
            ]),
        ],
        'location' => [
            [
                [
                    'param' => 'page_type',
                    'operator' => '==',
                    'value' => 'front_page',
                ],
            ],
        ],
    ]);
});
