<?php
/**
 * TravelMeister – destination index
 *
 * Copy of the ACTIVE Code Snippets snippet in WordPress. Keep both in sync.
 * Explanation: see README.md in this folder.
 */

const TM_INDEXED_TYPES = ['place', 'experience', 'itinerary', 'post'];

function tm_first_id($v) {
    return (int) (is_array($v) ? ($v[0] ?? 0) : $v);
}

// URL hub for an item: the nearest destination in its chain with "is_hub" ticked (ACF true/false).
// Kreuzberg (no hub) → Berlin (hub). A village in Asturias → Asturias.
// Returns the destination ID, or 0 if no hub is found.
function tm_url_destination_id(array $chain) {
    foreach ($chain as $destination_id) {
        if (get_field('is_hub', $destination_id)) return $destination_id;
    }
    return 0;
}

// Rebuild destination_ids + url_destination + url_destination_title for ONE item.
function tm_sync_destination_ids($post_id) {
    if (!in_array(get_post_type($post_id), TM_INDEXED_TYPES, true)) return;

    // Chain: primary_destination, its parent, grandparent, …
    $id  = tm_first_id(get_field('primary_destination', $post_id, false));
    $ids = [];
    while ($id && !in_array($id, $ids, true)) {
        $ids[] = $id;
        $id = tm_first_id(get_field('parent_destination', $id, false));
    }

    delete_post_meta($post_id, 'destination_ids');
    foreach ($ids as $d) add_post_meta($post_id, 'destination_ids', $d);

    $hub_id = tm_url_destination_id($ids);
    update_post_meta($post_id, 'url_destination',       $hub_id ? get_post_field('post_name', $hub_id) : '');
    update_post_meta($post_id, 'url_destination_title', $hub_id ? get_the_title($hub_id) : '');
}
add_action('acf/save_post', 'tm_sync_destination_ids', 20);

// Every destination at or below $destination_id.
function tm_destination_subtree($destination_id) {
    $all   = [(int) $destination_id];
    $queue = [(int) $destination_id];

    while ($queue) {
        $current  = array_pop($queue);
        $children = get_posts([
            'post_type'      => 'destination',
            'post_status'    => 'any',
            'posts_per_page' => -1,
            'fields'         => 'ids',
            // parent_destination is a Post Object (single) → stored as 186.
            // The LIKE also matches the older relationship format a:1:{i:0;s:3:"186";}.
            'meta_query'     => [
                'relation' => 'OR',
                ['key' => 'parent_destination', 'value' => $current],
                ['key' => 'parent_destination', 'value' => '"' . $current . '"', 'compare' => 'LIKE'],
            ],
        ]);
        foreach ($children as $child) {
            if (!in_array($child, $all, true)) {
                $all[]   = $child;
                $queue[] = $child;
            }
        }
    }
    return $all;
}

// When a DESTINATION is saved, re-index everything beneath it
// (parent, is_hub, slug or title changed → destination_ids and url_destination(_title) update).
function tm_resync_destination_subtree($post_id) {
    if (get_post_type($post_id) !== 'destination') return;

    $targets = get_posts([
        'post_type'      => TM_INDEXED_TYPES,
        'post_status'    => 'any',
        'posts_per_page' => -1,
        'fields'         => 'ids',
        'meta_query'     => [[
            'key'     => 'primary_destination',
            'value'   => tm_destination_subtree($post_id),
            'compare' => 'IN',
        ]],
    ]);

    foreach ($targets as $id) tm_sync_destination_ids($id);
}
add_action('acf/save_post', 'tm_resync_destination_subtree', 20);

// REST: ?destination=12 → subtree · ?destination=12&exact=1 → that one only
function tm_rest_destination_filter($args, $request) {
    $ids = wp_parse_id_list($request->get_param('destination'));
    if (!$ids) return $args;

    $key = $request->get_param('exact') ? 'primary_destination' : 'destination_ids';

    $args['meta_query'][] = [
        'key'     => $key,
        'value'   => $ids,
        'compare' => 'IN',
    ];
    return $args;
}
add_filter('rest_place_query',      'tm_rest_destination_filter', 10, 2);
add_filter('rest_experience_query', 'tm_rest_destination_filter', 10, 2);
add_filter('rest_itinerary_query',  'tm_rest_destination_filter', 10, 2);
add_filter('rest_post_query',       'tm_rest_destination_filter', 10, 2);

// REST: expose meta.url_destination and meta.url_destination_title (read-only).
add_action('init', function () {
    foreach (TM_INDEXED_TYPES as $type) {
        // Meta only shows up in the REST API if the post type supports custom fields.
        add_post_type_support($type, 'custom-fields');

        foreach (['url_destination', 'url_destination_title'] as $key) {
            register_post_meta($type, $key, [
                'type'          => 'string',
                'single'        => true,
                'show_in_rest'  => true,
                'auth_callback' => '__return_false', // computed – nobody writes it via the API
            ]);
        }
    }
});
