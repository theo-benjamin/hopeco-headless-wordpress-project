<?php
/**
 * Plugin Name: Hopeco Headless Fields
 * Description: Registers starter ACF fields for standard pages in the headless demo.
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

    $image = function ($key, $label, $name) {
        return [
            'key' => $key,
            'label' => $label,
            'name' => $name,
            'type' => 'image',
            'return_format' => 'array',
            'preview_size' => 'large',
            'library' => 'all',
            'show_in_graphql' => 1,
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
            $text('field_hopeco_hero_title', 'Hero Title', 'hero_title'),
            $textarea('field_hopeco_hero_text', 'Hero Text', 'hero_text'),
            $text('field_hopeco_cta_label', 'CTA Label', 'cta_label'),
            $url('field_hopeco_cta_url', 'CTA URL', 'cta_url'),
            $image('field_hopeco_hero_image', 'Hero Image', 'hero_image'),
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
});
