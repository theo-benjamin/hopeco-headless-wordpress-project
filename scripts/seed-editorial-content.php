<?php

if (!defined('ABSPATH')) {
    exit(1);
}

if (!function_exists('update_field')) {
    fwrite(STDERR, "ACF must be active before seeding editorial content.\n");
    exit(1);
}

$home_id = (int) getenv('HOME_PAGE_ID');
$about_id = (int) getenv('ABOUT_PAGE_ID');

if (!$home_id || !$about_id) {
    fwrite(STDERR, "HOME_PAGE_ID and ABOUT_PAGE_ID are required.\n");
    exit(1);
}

$homepage_sections = [
    [
        'section_type' => 'header',
        'header_section' => [
            'nav_links' => [
                ['label' => 'Our Mission', 'url' => '#mission'],
                ['label' => 'Programs', 'url' => '#programs'],
                ['label' => 'Impact', 'url' => '#impact'],
                ['label' => 'Resources', 'url' => '#resources'],
            ],
            'support_cta_label' => 'Get Help Now',
            'support_cta_url' => '#programs',
            'donate_cta_label' => 'Donate Now',
            'donate_cta_url' => '#programs',
        ],
    ],
    [
        'section_type' => 'hero',
        'hero_section' => [
            'eyebrow' => 'High contrast, ARIA labels, clear CTAs',
            'title_intro' => 'Advocating for',
            'title_highlight' => 'Human Dignity.',
            'description' => 'We provide sanctuary, resources, and unwavering support to those navigating systemic crises. Your journey matters here.',
            'primary_cta_label' => 'Get Support',
            'primary_cta_url' => '#programs',
            'secondary_cta_label' => 'Watch Our Story',
            'secondary_cta_url' => '#impact',
            'media_label' => 'Story video placeholder',
            'media_url' => 'video_placeholder.mp4',
        ],
    ],
    [
        'section_type' => 'pathways',
        'pathways_section' => [
            'eyebrow' => 'Distinct blocks, logical tab order, keyboard focus',
            'heading' => 'Choose Your Path',
            'cards' => [
                [
                    'title' => 'Get Support',
                    'description' => 'Access immediate resources and safe spaces.',
                    'label' => 'Get Support',
                    'url' => '#resources',
                ],
                [
                    'title' => 'Volunteer',
                    'description' => 'Join our network of advocates on the ground.',
                    'label' => 'Volunteer',
                    'url' => '#resources',
                ],
                [
                    'title' => 'Partner',
                    'description' => 'Collaborate with us to expand our reach.',
                    'label' => 'Partner',
                    'url' => '#resources',
                ],
                [
                    'title' => 'Donate',
                    'description' => 'Fund the mission. Every contribution matters.',
                    'label' => 'Donate',
                    'url' => '#resources',
                ],
            ],
        ],
    ],
    [
        'section_type' => 'impact',
        'impact_section' => [
            'eyebrow' => 'Screen reader friendly metrics + personal story',
            'heading' => 'Our Impact',
            'metrics' => [
                ['value' => '10,000+', 'label' => 'Families Supported'],
                ['value' => '50', 'label' => 'Sanctuaries Built'],
                ['value' => '$2.5M', 'label' => 'In Direct Aid'],
            ],
            'story_quote' => 'The sanctuary wasn’t just a roof. It was the first time in months I felt seen.',
            'story_name' => 'Maria V.',
            'story_role' => 'Program Participant',
        ],
    ],
    [
        'section_type' => 'updates',
        'updates_section' => [
            'eyebrow' => 'Feed + Newsletter Opt-in',
            'heading' => 'Latest Updates',
            'view_all_label' => 'View All',
            'view_all_url' => '/updates',
            'newsletter_heading' => 'Stay Informed',
            'newsletter_description' => 'Subscribe to our newsletter for crucial updates and stories from the field.',
            'newsletter_placeholder' => 'Email Address',
            'newsletter_button_label' => 'Subscribe',
            'newsletter_disclaimer' => 'We respect your privacy. Unsubscribe anytime.',
        ],
    ],
    [
        'section_type' => 'footer',
        'footer_section' => [
            'blurb' => 'Building a digital sanctuary for those navigating systemic crises.',
            'organization_heading' => 'Organization',
            'organization_links' => [
                ['label' => 'Our Mission', 'url' => '#mission'],
                ['label' => 'Programs', 'url' => '#programs'],
                ['label' => 'Impact', 'url' => '#impact'],
                ['label' => 'Careers', 'url' => '#resources'],
            ],
            'support_heading' => 'Support',
            'support_links' => [
                ['label' => 'Get Help Now', 'url' => '#programs'],
                ['label' => 'Resources', 'url' => '#resources'],
                ['label' => 'Contact Us', 'url' => '#footer'],
                ['label' => 'Donate', 'url' => '#programs'],
            ],
            'accessibility_heading' => 'Accessibility',
            'accessibility_text' => 'We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone.',
            'accessibility_link_label' => 'Read our Statement',
            'accessibility_link_url' => '#footer',
            'legal_text' => '© 2024 The Editorial Advocate. Designed for Sanctuary.',
            'privacy_label' => 'Privacy Policy',
            'privacy_url' => '#footer',
            'terms_label' => 'Terms of Service',
            'terms_url' => '#footer',
        ],
    ],
];

update_field('field_hopeco_homepage_sections', $homepage_sections, $home_id);
update_field('field_hopeco_hero_title', 'Built for a clean editorial workflow', $about_id);
update_field('field_hopeco_hero_text', 'This page demonstrates a second published page with its own ACF hero fields.', $about_id);
update_field('field_hopeco_cta_label', 'Return home', $about_id);
update_field('field_hopeco_cta_url', '/', $about_id);

echo "Editorial content seeded.\n";
