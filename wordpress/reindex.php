<?php
/**
 * TravelMeister – one-time reindex
 *
 * Copy of a DEACTIVATED Code Snippets snippet. Needs destination-index.php to be active.
 * Use: activate → open /wp-admin/?tm_reindex=1 while logged in → deactivate again.
 */

add_action('admin_init', function () {
    if (!current_user_can('manage_options') || !isset($_GET['tm_reindex'])) return;

    $ids = get_posts([
        'post_type'      => TM_INDEXED_TYPES,
        'post_status'    => 'any',
        'posts_per_page' => -1,
        'fields'         => 'ids',
    ]);
    foreach ($ids as $id) tm_sync_destination_ids($id);

    wp_die('Reindexed ' . count($ids) . ' posts.');
});
