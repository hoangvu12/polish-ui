# Alignment

How polish 11's shared edges are built and checked: every container has two or three named vertical lines, and every item either sits on one or has a written reason not to. Draw the lines first, then move the items. By eye, a pass drifts 2 to 4 px per panel and nobody can say which edge was meant.

This file covers horizontal edges and the vertical centre of rows. Row height, section spacing, hit areas and type size follow the other rules.

Adapted from [pritamux/gridlines](https://github.com/pritamux/gridlines) (MIT, [gridlines/LICENSE](gridlines/LICENSE)), which draws on Karri Saarinen's redraw of the Linear sidebar and the layout chapter of Apple's Human Interface Guidelines.

## The lines

### Text line and box line

Every container has one **text line** (labels, headings, values, bare icons) and at most one **box line** (buttons, selects, inputs, pills, chips). A boxed control at the edge is inset so its own label lands on the text line: box line = text line minus the box's horizontal padding. With a 16 px text line and 8 px button padding, the box sits at 8 px and nests in the corner while its label continues the text above it. Readers track text, not boxes.

### Sidebars and lists

- **Icons sit on one column**: left-aligned on the box line, or centred on one vertical line, one choice per sidebar. Icons of different widths (a 14 px dot beside a 20 px glyph) centre on the column, so the labels after them start together.
- **Labels start on one text line** after the icon column and its gap, in every row: nav items, workspace switcher, favourites, teams.
- **Section headers** ("Workspace", "Favourites") start on the icon column's leading edge, left of the labels, which shows they own the group.
- **Nested items indent by exactly one column**: the child's icon sits where the parent's label starts. A child without an icon starts its label on the child text line.
- **A logo or avatar wider than the icon column** starts on the box line and still puts its name on the text line; size the gap after it.
- **Trailing badges and counts** sit on the trailing line or the trailing centre line, the same one the toolbar buttons above them use.

### Bars and toolbars

- Every item in a bar centres on one horizontal line. Measure centres, not tops: a 24 px button and a 16 px icon in one bar share a centre.
- In a desktop app window, the first bar centres on the window controls (the macOS traffic lights), not on the bar's own middle.
- A toolbar is a row of the panel below it: its first item starts on that panel's text or box line, its last ends on the trailing line or centres on the trailing centre line.
- Trailing controls of different widths (a count, a 28 px icon button, a 20 px icon) centre on one vertical line; same-width controls align their trailing edge.

### Panels and the frame

- Panels that share an edge share the line: a table toolbar's filters end exactly under the trailing edge of the panel above.
- The window frame (navbar, status bar) has its own line from the window edge, shared by the first and last item of every frame bar.
- Within one product area every panel uses the same text line. Areas may differ (dense data panels at 8 px, settings at 16 px) when the project's design policy says so.

### Optical corrections

- **Align the content, not the affordance.** When a select's label must end on a trailing line, put its chevron before the label.
- **Invisible borders count.** A transparent 1 px border shifts the label 1 px; take it back with a −1 px margin on that side.
- **Icon viewBox padding counts.** A 24 px icon drawn in a 20 px area sits 2 px in from its box. Correct with the icon's size or the column, once, not per row.
- **Tabs align their label, not their hit area.** Drop the tab list's padding and pull the strip in so the first label's ink sits on the text line.
- **Icons centre on their weight, not their box.** An icon alone in a button, avatar or tile is centred where its ink is heaviest: a play triangle moves about 1 px toward its point, a pencil-on-square moves toward the pencil. Measure each icon's offset with `PW_DIR=<dir with playwright> node <this skill>/gridlines/icon-centre.mjs <svg files or folder> --size <rendered px>`, which prints the nudge rounded to 0.25 px. Apply it once per icon, in the icon component or a CSS `translate` keyed by icon name, so every button using that icon gets it. Nudges under 0.25 px are noise; leave those icons alone.
- **Round shapes look smaller.** A circle on a line overhangs it by about 1 px compared with a square of the same size.
- **Text side bearing is 0 to 1 px.** Leave it alone.

### Shapes

Buttons and fields in one container are all rounded rectangles or all pills. One special control may differ, such as a single primary compose button, with the reason recorded in the design policy.

## Alignment pass

Run it when asked to align, fix padding or line things up, when a layout "looks off" and the cause is edges, and in the handover check for a changed sidebar, toolbar, menu, list, dialog or table you can render.

1. **Read the policy.** If the project's design policy records edge lines ("text 16 px in, controls 8 px in"), those are the target; changing them needs the owner's approval. Run the app with real data where you can; empty and logged-out states hide most misaligned rows, so say so in the report if that is all you could reach.
2. **Draw.** Run the probe on every page, panel and overlay in scope, at 1440 px and 390 px, with every menu, select, popover, dialog, sheet and command palette the page owns opened:
   - Headless: `PW_DIR=<dir with playwright> node <this skill>/gridlines/audit.mjs <url> .gridlines [width] [prep.mjs]`. Install Playwright into a scratch folder if missing (`npm i --prefix <scratch> playwright`, then `npx --prefix <scratch> playwright install chromium`), or set `CHROMIUM_PATH`. `prep.mjs` default-exports `async (page) => {}` to open the menu, tab or dialog to measure. Other options (`SCHEME`, `SETTLE_MS`, `CONTAINERS`, `TAG`) are in the script's header. On Windows, pass a `file:///C:/…` URL and Windows-style `PW_DIR` (`cygpath -m` in Git Bash).
   - Live browser: evaluate [gridlines/probe.js](gridlines/probe.js) in the page, then `window.__gridlines()`.

   Save captures under `.gridlines/` in the project and keep that folder out of version control. The probe measures ink, not boxes (a glyph's bounds, an SVG's bounds, and for a control with a fill, full border or shadow, the box), and draws per container: lead line and label line in solid red, box line in faint red, icon-column centre in fainter red, trailing line in blue, trailing centre in amber.
3. **Read.** For each container write down its lines (lead, box, icon centre, label, trailing, trailing centre) and every `MISS`: item, edge (`leading`, `label`, `icon-column`, `trailing`, `vertical-centre`), distance, intended line. Confirm each miss in the capture, since the probe groups rows by centre and can mis-assign an item.
4. **Decide the lines.** Policy names them: use them. Otherwise a container sharing an edge with a neighbour (stacked panels, toolbar over table) takes the neighbour's line. Otherwise take the line most rows already sit on. Then class every row as edge-positioned or centred; an item 3 px off-centre and 5 px off the edge belongs to neither and reads as a mistake.
5. **Fix.**
   - Move the outlier, never the majority: if 9 rows sit at 8 px and the tab strip at 20 px, the tab strip moves.
   - Fix in the container, through its padding or a shared inset variable (`--row-inset`, `--table-inset`) that rows and header both read, so the next row added inherits it. A one-off nudge on one item (`ml-[3px]`) is a miss waiting for the next row.
   - Use the spacing tokens. A line that needs an off-scale value means the container's padding is wrong.
   - When removing a padding someone chose on purpose (a comment explains it), update the comment with the new reason.
   - Row heights, hit areas, control sizes, colours, type sizes, radii and behaviour stay as they are (polish 10). If closing a gap needs one of them, leave the gap, note its size, and ask.
6. **Re-draw.** Run the probe again on the same states. Done when every item is within 1 px of its line (the glyph's side bearing; 2 px is a miss) and, at 390 px, wrapped toolbars still end on the trailing line.
7. **Record and report.** Add any new line to the project's design policy beside the existing edge rules, with the date and who set it. Report a table per page (where, before, after), the guide captures inline, and what was not covered: states you couldn't reach and gaps left on purpose.
