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
- **Focus on close:** focus returns to the trigger. If the trigger is gone (its row was deleted), focus the next row or the list. After an "Add" dialog, focus the new item.

## Smaller patterns

- **Tabs** are only for panels within one view. Views with their own URL are links styled as tabs.
- **Clickable card:** make the title the link and stretch it over the card (`after:absolute after:inset-0`). Never wrap the whole card in `<a>` or `<button>`. Buttons inside the card sit above it with `relative`.
- **Menu that sets a value:** use radio items, with a check on the current one (`DropdownMenuRadioGroup`).
- **Numbers:** format with `Intl.NumberFormat`. Columns of numbers use `tabular-nums`.

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

Use Sonner (load `ask-sonner`). Position follows the project. Per polish 13, a toast reports something that happened in the background; feedback on an action the person just took stays on the control.

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

One shared confirm component, used by every delete or remove action, including removing an item from a list. Its confirm button is solid red and names what is lost ("Delete 3 keys").
