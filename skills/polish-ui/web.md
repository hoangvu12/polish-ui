# Web

How the polish rules are implemented on the web (React, Tailwind, HTML mockups).

## Components

Use the component library the project already has (shadcn on Radix or Base UI, UI SDK, or another). Its primitives bring keyboard support, accessibility and motion that hand-rolled components miss, so check how the library is used instead of hand-writing ARIA. A project with no library: load `pick-ui-library` before choosing one.

## Pointer cursor

Tailwind v4 dropped the pointer cursor on buttons. Put this back in the base layer once per project:

```css
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

Anything else that is clickable (rows that open, clickable cards, menu items) also gets `cursor-pointer`.

## Disabled controls

A natively `disabled` button can't take focus, and shadcn's disabled styles add `pointer-events-none`, so a tooltip on it never opens. When an unavailable control needs a tooltip, use `aria-disabled="true"` instead and block the action in code for clicks, keyboard activation and form submission. Or wrap the button in a focusable element that carries the tooltip.

## Dialogs

- **Taller than the window:** the background page stays locked, and the overlay scrolls, carrying the whole dialog. This is the pattern from shadcn-ui/ui#16, and the one Radix documents as its scrollable overlay:
  - The overlay is the scroll container: `fixed inset-0 overflow-y-auto`, using grid to centre a short dialog.
  - The content sits inside the overlay with vertical margin, not fixed in the middle with a `max-height`.
  - The wheel then works anywhere on screen, and the dialog's header and footer scroll into reach. A long list inside a dialog (thousands of models, pasted keys) keeps its own scroll.
- **Scroll containment:** give an overlay's own scroller (the scrolling overlay above, a drawer, a menu, an overlay side panel) `overscroll-behavior-y: contain`, so scrolling past its end never moves the page behind. Keep the modal page lock too. Leave it off a list nested inside a dialog, so scrolling past the list's end moves the dialog and its footer stays reachable.
- **Focus on open:** focus moves inside, Tab stays inside, and the page behind is inert. The shared dialog primitive does this; don't hand-roll it. A destructive confirm opens with focus on Cancel; a type-the-name confirm, on its field.
- **Focus on close:** focus returns to the trigger. If the trigger is gone (its row was deleted), focus the next row or the list. After an "Add" dialog, focus the new item.

## Smaller patterns

- **Tabs** are only for panels within one view. Views with their own URL are links styled as tabs.
- **Clickable card:** make the title the link and stretch it over the card (`after:absolute after:inset-0`). Never wrap the whole card in `<a>` or `<button>`. Buttons inside the card sit above it with `relative`.
- **Menu that sets a value:** use radio items, with a check on the current one (`DropdownMenuRadioGroup`).
- **Numbers and dates:** format numbers with `Intl.NumberFormat`, and dates, relative times and lists with `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat` and `Intl.ListFormat` in the app's locale. Never build a date from `getMonth()` or join names with `", "` and `" and "`. Columns of numbers, and timers, counters and prices that update, use `tabular-nums`.

## Text

Use the project's type tokens. Where you set text yourself:

- Line-height is never in px. Descriptions, card bodies and other running text get at least 1.4, even in a tight row. `leading-none` and `leading-tight` are only for headings and one-line labels.
- Text under 18 px uses weight 400 or heavier. Light weights (`font-thin`, `font-extralight`, `font-light`) are for display sizes, about 28 px and up, unless the project's type tokens say otherwise.
- Headings and short descriptions get `text-wrap: balance`; paragraphs get `text-wrap: pretty`, never balance. Apply it to text you add or restyle (`text-balance`, `text-pretty`); add it to the base layer (`h1, h2, h3, h4, h5, h6 { text-wrap: balance } p { text-wrap: pretty }`) only when setting up the project or when asked.
- A long URL, ID or word in prose, messages or cards that could escape its box gets `overflow-wrap: anywhere`; in a table, follow polish 3.

## Icons

- In single-colour UI icons, replace hardcoded `fill` and `stroke` colours with `currentColor` on import, and keep `fill="none"` and `stroke="none"`. State colour comes from CSS, never from a second asset. Multicolour artwork and logos keep theirs.
- Where the set has outline and filled variants, outline is the default and fill marks the active or selected state, unless the product already has another convention.
- Match the stroke of the icons already on the surface. Setting up icons fresh: stroke follows the weight of the text beside it, about 1.5 px beside 400 and 2 px beside 500–600; with Lucide, `absoluteStrokeWidth` keeps that true when an icon is drawn smaller than its grid.
- Inline icons are 1em to 1.25em of their text.

## Motion

Per polish 17, load the skill that fits. These skills, like `pick-ui-library` and `ask-sonner` on this page, come from [emilkowalski/skills](https://github.com/emilkowalski/skills).

| Need | Skill |
|---|---|
| Add new motion | `animate` |
| Check existing motion | `review-animations` |
| Several elements moving together | `choreograph` |
| Jank or dropped frames | `animation-performance` |
| Too much motion | `remove-animations` |
| Press, hover, popover and tooltip details | `emil-design-eng` |

## Toasts

Use Sonner (load `ask-sonner`). Position follows the project. Per polish 13, a toast reports something that happened in the background; feedback on an action the person just took stays on the control. An Undo toast may add a shortcut after an item leaves the view, never the only way to recover it ([Destructive actions](#destructive-actions)).

## Skeletons

Use Skullet: https://skullet.lochie.me/. Read its docs before using it; it has options beyond the defaults.

- The skeleton has the final layout's shape, and content takes over without a layout shift.
- A refetch keeps the old content on screen instead of going back to the skeleton.
- Loading rows can't be clicked, tapped or tabbed into.

Large data is where it gets slow. The cost is the switch from skeleton to content, not the sweep animation. These fixes took one app's 100-row tables from 442 ms frames to under 60 ms; treat the numbers as starting points:

- Large tables fade in as one block, not row by row.
- Only the first screenful of rows animates in; the rest render a frame later.
- Logos and images load after the fade.
- A remembered skeleton (smart mode) is capped at about one screen.
- Very tall skeletons (dozens of rows) pulse instead of sweeping.

## Destructive actions

Remove at once, with no confirm, anything the person can put back in one step from what is still on screen, when it discards no entered work and has no material effect on other people: an empty draft row, a filter chip, a tag or label on a record. Discarding work the person entered counts as loss even if it was never saved. Otherwise, apply the first match:

1. **Permanent deletion of an account, workspace, organisation or repository:** the shared confirm, plus a field where the person types its name, shown in the field label. The confirm button stays disabled until the name matches.
2. **Irreversible loss, a material effect on other people, or a large batch deleted at once:** the one shared confirm component, even if Undo is available. The title names the verb and object ("Delete 12 files?"). The body says what is lost, with counts and who is affected. The solid red button repeats the title ("Delete 12 files"), next to Cancel.
3. **Low risk and fully reversible** (archive, move, delete to Trash, remove from a list while the item stays in its library): act at once, with no confirm, only when the change can be undone from a named place that stays reachable by keyboard and touch (Trash, Archive, the previous folder) and restores what changed. After success, announce the result (access 6) and offer Undo near the action. Keep focus on the trigger if it remains; otherwise move it to the next row or the list. If the item leaves the view and an inline Undo doesn't fit, a toast may offer the shortcut, and recovery still works after the toast is gone. Without reliable recovery, use tier 2.

## Before you hand over

Search the changed web code for these. A match is a lead to check in the rendered UI, not an automatic finding.

| Pattern | Fix |
|---|---|
| Same `rounded-*` on a parent and a child inset by less than that radius | Inner = outer − padding − border, to the nearest token ([layout.md](layout.md#nested-surfaces)) |
| `fill="#…"` or `stroke="#…"` in a single-colour UI icon | `currentColor` |
| `{msg && <div role="status">` | Mount the region empty, change its text |
| Positive `tabIndex`, `<div onClick` | `0` and DOM order; `<button>` or `<a href>` |
| `outline-none` with no `focus-visible` style | A visible focus ring ([access.md](access.md)); in Tailwind v4, `outline-hidden` keeps the forced-colors fallback that `outline-none` removes |
| `disabled={!isValid}` | Keep submit enabled ([forms.md](forms.md)), except a type-the-name confirm |
| In translated code: `=== 1 ? "" : "s"`, a string joined around a variable (`"Deleted " + n + " files"`) | One message with placeholders and a plural |
| `leading-none` or `leading-tight` on a description, card body or other running text | 1.4 or more |
| `text-balance` on a paragraph | `text-pretty` |
| `Are you sure`, `>OK<`, `>Yes<`, `successfully` | Verb and object, or cut |
| `text-white` on a `-500` fill, text on an `/NN` alpha colour | Measure it ([access.md](access.md)) |
| `<img` with no `alt` | `alt=""` if decorative, otherwise what it shows or does |
| `...` at the end of a string or JSX text | `…` |
| `maximum-scale=1`, `user-scalable=no` | Remove it |
| `100vw` on ordinary content | Check for sideways scroll with a scrollbar showing; size to the container if it overflows |
| `→`, `↗`, `ArrowRight`, `ArrowUpRight` inside a button or link label; `Sparkles`, `Zap`, `Brain` imports; `·` in JSX text | [tells.md](tells.md) |
| `uppercase` with `tracking-wide`/`tracking-widest` above a heading; `italic` or a colour span inside an `h1`/`h2` | [tells.md](tells.md) |
| `Instrument_Serif`, `Instrument Serif`; hard-coded off-white backgrounds (`#F4F1EA`, `#FAF7F2`, `bg-[#F…]`); `blur-2xl`/`blur-3xl` on an absolute decorative element; `border-l-2`/`border-l-4` with a colour | [tells.md](tells.md) |
| `animate-pulse` on a dot; `whileInView`, an `IntersectionObserver` fade, or a count-up on section content; `hover:-translate-y` on a card that isn't clickable | [tells.md](tells.md#motion) |
| `quiet`, `real`, `unhurried`, `seamless`, `effortless` in copy; a percentage or big number not read from data | [tells.md](tells.md#words) |

Then, for what you changed, check behaviour in the rendered flow: tab through it in both directions; run each delete or remove against [Destructive actions](#destructive-actions), including recovery after any toast is gone; scroll past the end of each overlay; view edges drawn only with a `box-shadow` in forced-colors mode ([access.md](access.md)); and narrow the window over flexible grid tracks holding wide content ([layout.md](layout.md#long-and-narrow)).
