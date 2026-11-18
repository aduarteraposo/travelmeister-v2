# WordPress snippets

WordPress runs headless; the frontend reads it via the REST API. These files are copies of the
PHP snippets installed in WordPress with the **Code Snippets** plugin (WP admin → Snippets).
The repo copy is the documentation – when you change a snippet in WordPress, update the file here too.

## Why PHP at all?

The REST API cannot filter by ACF fields. Without help, `/posts?destination=186` is silently
ignored and returns all posts. These snippets add exactly that filter – nothing else.

## destination-index.php (active)

**What it stores:** for every post, place, experience and itinerary, a hidden field
`destination_ids` = its `primary_destination` plus all parents.
Example: an article on Montmartre gets `[Montmartre, Paris, France]`.

**URL hub:** it also stores `url_destination` (slug) and `url_destination_title` (title) =
the nearest destination in the chain with the ACF true/false field **`is_hub`** ticked.
This is the first URL segment: `/berlin/hotels/x`, also for a hotel in Kreuzberg.
The frontend shows "Kreuzberg, Berlin" from `destination` + `url_destination_title`.
Hubs are set by hand on the destination (Berlin, New York, Asturias), never per post.
Both are exposed read-only as `meta.url_destination` and `meta.url_destination_title`.

**When it updates:**
- saving an item in the admin → that item is re-indexed
- saving a destination → every item in it and below it is re-indexed (e.g. after changing a parent
  or ticking `is_hub` – **this changes URLs**; the frontend 301s old URLs because it looks up by slug)

**What it adds to the REST API** (`/posts`, `/place`, `/experience`, `/itinerary`):

| Query | Returns |
|---|---|
| `?destination=186` | everything inside 186, including all sub-destinations |
| `?destination=186&exact=1` | only items whose `primary_destination` is 186 |
| `?destination=186,187` | inside 186 or 187 |

**Test:** `/wp-json/wp/v2/posts?destination=PARIS_ID&_fields=id,slug` should include Montmartre
articles; with `&exact=1` it should not.

## reindex.php (deactivated, run when needed)

Re-indexes everything at once. Needed after adding a new type to `TM_INDEXED_TYPES`, or if the
index ever looks wrong. Activate → open `/wp-admin/?tm_reindex=1` → deactivate.

## Good to know

- `parent_destination` is an ACF Post Object field (Select Multiple off), stored as a plain ID
  (`186`). It used to be a relationship field, stored as a list (`a:1:{i:0;s:3:"186";}`), so the
  subtree search matches both formats.
- Deactivating `destination-index.php` stops the filter; the stored `destination_ids` stay in the
  database but are unused. No cleanup needed.
- Items created via the REST API (the hotel agent) may not trigger `acf/save_post`. If such an item
  shows no results in the filter, re-save it in the admin or run the reindex. (Not yet verified.)
