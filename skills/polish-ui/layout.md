# Layout

How polish 4, 8, 11 and 12 are built. The examples are CSS; other stacks use their own equivalents.

## Ranking dashboards and home views

Rank in this order:

1. Warnings and items that need action.
2. The most global numbers, at the top left.
3. The overview.
4. The breakdown.

Data that serves none of the view's goals is left out, even when it exists.

## The parent owns spacing

- Siblings are spaced by their parent's `gap`. Components carry no outer margin, so padding never doubles and the last child leaves no stray gap.
- Gaps grow as relationships loosen. Use the project's spacing scale; inside a group, use a small step, and between groups at least double that.

## One anatomy for comparable things

- **Tables.** Comparable lists use the same table anatomy everywhere: title, filters, columns, row actions, and the loading, empty and error states, in the same places.
- **Cards.** Comparable cards put their title, controls and actions in the same places.
- **Visual treatment.** Match nearby product surfaces and icon treatments before adding gradients, tinted tiles or decorative shells.

## Cards in a row

- A card is a column. Its footer gets `margin-top: auto`, so buttons line up across cards of different heights.
- Equal groups that must switch together (stat cards, steps, equal panels) show as one row or one column, never two plus a stretched leftover. Use a container query that switches from one column to one row, or Every Layout's Switcher: `display: flex; flex-wrap: wrap;` with each child at `flex-grow: 1; flex-basis: calc((<threshold> - 100%) * 999);`.
- A grid of many cards (a gallery, a list of projects) uses `repeat(auto-fill, minmax(<min>, 1fr))`, which keeps the remaining items aligned to the columns.
- When a padded card sits beside a bare column, line up their first content, not the box tops.

## Nested surfaces

Where a rounded surface holds another at an even inset smaller than its radius, outer radius = inner radius + padding + border. Keep the outer radius and shrink the inner one to the nearest radius token: with Tailwind's default radii, a `rounded-2xl p-2` card holds a `rounded-lg` child, not another `rounded-2xl`. Change a shared outer surface's radius only when asked (polish 10). When the padding is as large as the outer radius, or uneven, each surface keeps its own radius token; never make a child square to fit the formula. This applies to surfaces (inner panels, images, code blocks); shared controls keep their component's radius (polish 8).

## Main area and side panels

- A main area beside a side panel stacks based on its own width, not the viewport, because resizable panes and collapsible sidebars make viewport breakpoints guess wrong. Use a container query, or Every Layout's Sidebar:
  - the wrapper: `display: flex; flex-wrap: wrap; gap: <gap>;`
  - the side panel: `flex-basis: <panel width>; flex-grow: 1;`
  - the main area: `flex-basis: 0; flex-grow: 999; min-inline-size: 50%;`
- Anything shown on hover also shows on keyboard focus. Important information and controls are never hover-only.

## Width

- Prose (descriptions, docs, chat messages) caps at about 65 characters per line (`max-width: 65ch`), with line-height 1.4 to 1.6.
- Forms and settings share one max width across the product.
- Tables, charts and dashboards may use the full width of the app shell.

## Long and narrow

Content changes size. Build for it:

- A flex child that holds truncating text needs `min-width: 0`. If content forces a flexible grid track wider than its container, use `minmax(0, 1fr)` and handle the overflow inside it: wrap prose, and put a wide table in its own horizontal scroller. Never clip values people compare (polish 3).
- Size normal content to its container. `100vw` includes the scrollbar, so if it causes sideways scroll, use `width: 100%` or natural block sizing. Keep intentional full-bleed layouts and check them with a scrollbar showing.
- Text containers use `min-height`, not a fixed height.
- Long names, long words and other languages don't break the row (polish 3).
