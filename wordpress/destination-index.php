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

// URL slug for an item: the nearest destination in its chain that is NOT a neighborhood.
// Montmartre → Montmartre is a neighborhood, so → Paris → "paris".
function tm_url_destination_slug(array $chain) {
    foreach ($chain as $destination_id) {
        $type = get_term(tm_first_id(get_field('destination_type', $destination_id, false)));
        $is_neighborhood = $type && !is_wp_error($type) && $type->slug === 'neighborhood';

        if (!$is_neighborhood) {
            return get_post_field('post_name', $destination_id);
        }
    }
    return '';
}

// Rebuild destination_ids + url_destination for ONE item.
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

    update_post_meta($post_id, 'url_destination', tm_url_destination_slug($ids));
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
// (parent changed, type changed, slug changed → destination_ids and url_destination update).
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

// REST: expose url_destination as meta.url_destination (read-only).
add_action('init', function () {
    foreach (TM_INDEXED_TYPES as $type) {
        // Meta only shows up in the REST API if the post type supports custom fields.
        add_post_type_support($type, 'custom-fields');

        register_post_meta($type, 'url_destination', [
            'type'          => 'string',
            'single'        => true,
            'show_in_rest'  => true,
            'auth_callback' => '__return_false', // computed – nobody writes it via the API
        ]);
    }
});
