---
name: polish-ui
description: Rules for interfaces that explain themselves, with clear hierarchy, shared components and clean surfaces. Use when designing, building, restyling or changing any screen, component or mockup, when fixing UI states, when reviewing UI, or when briefing another agent or design tool on UI work.
---

# Polish UI

A screen is **self-evident** when a person can tell what it is, where to look and what to do without reading an explanation. Every rule below serves that. Apply them while you build, not only at the end.

Cite rules as "polish 4". Read the matching file when the work touches its area:

- Any text on screen: [copy.md](copy.md)
- Laying out a view, cards, tables, columns or dashboards: [layout.md](layout.md)
- Building or changing a form: [forms.md](forms.md)
- Interactive controls, states and overlays (focus, contrast, targets, announcements): [access.md](access.md)
- Web code (React, Tailwind, HTML mockups), including text rendering, icons, motion and the handover scan: [web.md](web.md)
- Any delete or remove, in every stack: [web.md](web.md#destructive-actions)

In other stacks, keep the intent of each web rule and implement it with what the stack offers.

## Before you build a new view

For a new view, or a substantial reorganisation of one, write its content and actions as a numbered list, most important first, with no layout yet. Item 1 becomes the focal point (polish 4). Ask of each item whether it belongs on this view at all. Items the current task doesn't need go one step away (polish 7); frequent actions stay visible.

## Rules

**Words**

1. **The UI explains itself.** Show state, purpose and the next action through layout, controls and placement. Text appears where a person needs it to act: a label, a button, a value, an error, an empty state. Before writing helper text, fix the label, unit, default or layout. If a line still needs "might" or "if… then" to explain an interaction, change the design, not the text. See [copy.md](copy.md).
2. **One fact per spot.** Put each fact where it is used. Facts chained with "·", "|" or "*" ("12 items · Synced · v2.1") are split up or cut down to the one that matters.
3. **Our text fits its space.**
   - Labels, buttons, chips, headings and one-line messages stay on one line at normal widths: shorten the text or give it room. At narrow widths or high zoom they wrap rather than get clipped.
   - Amounts, statuses and any value people compare across rows, IDs included, never truncate; the column grows instead.
   - Other data (names, paths, IDs nobody compares) may truncate with "…" when the full value is reachable on hover, focus and touch.

**Hierarchy**

4. **One focal point.** At a glance a person sees what the view is and its main action. The largest text is what the person came for, which may be a number or the main list rather than the page title. Each view, and each bounded task area such as a dialog, has one primary button: the action the person came to do, in the solid action style. Secondary actions are outlined or quiet, tertiary ones look like links, and rare ones go in a "…" menu. Controls sit next to what they affect.
5. **Quiet the rest.** To make one thing stand out, turn its neighbours down instead of turning it up. Inactive items use lighter text, secondary panels lose their fill and border, and metadata sits after its title, smaller and lighter. Build text hierarchy with colour and weight before adding another font size.
6. **Action colour means clickable.** The action colour goes only on interactive elements, and its solid fill only on the primary action. Data and status colours follow the product's tokens. Badges, tags and icon tiles never look like buttons.
7. **Calm density.** Show what the task needs now and put the rest one step away: an accordion, a "…" menu, a sheet, a dialog. One step away works only when the trigger's label makes the destination obvious. A tooltip only names or describes its control; anything needed to finish the task stays visible. Forms and bulky editors open in a dialog or sheet; only simple single fields stay inline.

**Consistency**

8. **Reuse before you build.** Every dialog, input, select, tooltip, accordion, table, badge, toast and skeleton comes from the project's shared components and tokens, and comparable tables and cards share one anatomy ([layout.md](layout.md)). The same job looks and behaves the same on every page. When a shared component is missing, add it as a shared one.
9. **Same meaning, same look.** One icon per meaning and one meaning per icon, from the project's icon library. One badge style, in Capitalized text. One set of button styles. A delete or remove trigger looks like any other secondary action. Irreversible loss, a material effect on other people and large batches deleted at once go through the shared confirm, whose final button alone is solid red and names what is lost. Other changes the person can undo from a named place (Trash, Archive) act at once and offer Undo ([web.md](web.md#destructive-actions)).
10. **Keep what wasn't asked.** For a targeted change (restyle a card, fix a state), keep the layout and behaviour outside the request; the product's tokens win over any general style advice. In a redesign, every existing workflow stays reachable and frequent actions stay visible.

**Space and surfaces**

11. **Space follows relatedness.** The gap inside a group is smaller than the gap between groups, and a heading sits closer to its content than to the section above. A screen that uses one gap everywhere fails. Elements sit on shared edges, one alignment per region, and nothing touches its neighbour. See [layout.md](layout.md).
12. **Group with space before boxes.** Try grouping by spacing, then matching style, then alignment, and add a container only if those fail. A list of same-type items is one list, not a box per item. Where raised surfaces are needed, each level is one clear step lighter than the one below, in light and dark mode alike, and a section holds at most one level of cards. Inputs, light buttons and unselected cards have an edge that identifies them against their background ([access.md](access.md) gives the number). Separators are rare.

**Feedback and states**

13. **Feedback where the action happened.** A clicked control responds at once: it shows its pending state, then the result. An error and its retry sit next to what failed, and unsaved changes show next to what changed. A failed save keeps every typed value and keeps its dialog open. Toasts are for background events, or an optional Undo shortcut after an item leaves the view ([web.md](web.md#destructive-actions)). A toast is never the only record or recovery path.
14. **Loading without flashes.** Show a skeleton only for content that takes longer than about a second, so fast loads never flash one. Once shown, one skeleton shaped like the final layout stays until the content or an error replaces it. A refetch keeps the current content on screen. Long jobs (uploads, exports, runs) show measured progress ("3 of 50") when the system can count it, otherwise a labelled pending state, and a Cancel when the job supports it.
15. **Say which empty it is.** Nothing yet: what goes here, and a button that adds it. No matches: name the filter and offer to clear it. Still loading: the skeleton. "No items" never shows before the load finishes.
16. **Every state designed.**
    - Interactive elements have a pointer cursor, hover, visible keyboard focus and a disabled state.
    - A prerequisite the person must fix to continue shows beside the action. A supplementary reason may sit in a tooltip on a control that can still take focus ([web.md](web.md)).
    - A submit button stays enabled while the form has errors ([forms.md](forms.md)). The one exception is a type-the-name confirm ([web.md](web.md#destructive-actions)).
    - A placeholder only shows an example value. A format or limit the person needs while typing goes in a visible hint.
    - Controls revealed on hover have their space reserved, so revealing them never resizes or shifts the row.
    - Code and JSON get syntax highlighting.
    - Numbers are formatted for reading, for example 12,480.

**Motion**

17. **Motion goes through Emil Kowalski's skills** ([emilkowalski/skills](https://github.com/emilkowalski/skills)). When they're installed, load the one that fits instead of improvising; [web.md](web.md) lists which skill covers which need.

## Briefing another agent or a design tool

Tell it to load `polish-ui`. If it can't load skills (Claude Design, an external tool), paste the rules above into the brief.

## Before you hand over

Check what you changed against the rules that apply, and in web code run the scan at the end of [web.md](web.md#before-you-hand-over). If you can render it, blur a screenshot: the view's subject and its main action are the first two things you see. When implementing, fix in-scope failures and check again. When only reviewing, report findings without editing. Report unresolved and out-of-scope failures, and mark every check you couldn't run "Not verified".
