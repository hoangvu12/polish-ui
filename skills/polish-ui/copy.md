# Copy

How polish 1 and 2 apply to every string on a screen. Cut first: deleting is the default fix. A rewrite states only what the product already shows. It never adds a number, a speed or a benefit you can't point to in the code.

## Words first

Put the word a person scans for first and drop the lead-in:

- "This is the total cost" becomes "Total cost".
- "You have entered the wrong password" becomes "Wrong password".
- Headings name what follows ("API keys"), never "Overview" or "Here you can manage…".

Headings, card titles and captions inside an app stay at five words or fewer.

## Text that stays

- **Labels.** One visible label per field. A control that already shows its meaning (a type selector, a search field with a magnifier) needs no label above it.
- **Values and data.** A label for displayed data is a last resort.
  - Drop it when the format says what it is: an email, a price, a date.
  - Otherwise fold it into the value: "12 left in stock", "3 bedrooms".
  - A label that must stay is smaller and lighter than its value.
- **Buttons and links.** A button names its result in two or three words: "Create workflow", "Use default".
  - A confirm button repeats the dialog's verb and object: "Delete project?" leads to "Delete project".
  - Never "OK", "Submit", "Confirm", "Get started" or "Learn more".
  - Add "…" when more input follows.
  - One command has one label everywhere, and its result keeps the name: "Publish" leads to "Published".
  - Link text makes sense on its own.
- **Hints.** Write one only when a choice is still hard after fixing the label, unit, default or layout. It is one short line next to the control, true for most people, and never repeats the label.
- **Errors.**
  - Say what happened and what to do, next to the cause, reusing the field label's words: "Enter an email like name@example.com".
  - Keep what the person typed.
  - Never show a library's raw message ("Invalid input", "String must contain at least 1 character(s)") or a raw code; a code goes behind "Details".
  - No "invalid", "please", "sorry" or "oops".
  - A problem the person can't fix (no permission, service down) is its own state, with a next step.
- **Empty states.** Say which empty it is (polish 15). The action is a button that does it, not a sentence that describes how.
- **Confirmations of destructive actions.** Name what will be lost.
- **Constraints a person can't guess.** Shown before they type, for example "At least 12 characters".
- **Progress on long jobs.** Concrete counts or steps when they can be measured: "Updating 3 of 50".

## Text that goes

Each line is a real case from past reviews.

| Kind | Example | Fix |
|---|---|---|
| Narrating the visible | "Enter sends it as a steer" | Cut. Show a send button when there's text, a stop button when the input is empty. |
| Narrating the visible | "Drag across a screen to compare, or use Before / After to see one whole." | Cut. |
| How it works | "Settings this run used. To run with other settings, start a new analysis." | Cut. |
| How it works | "Pinning to Upstream Key key-1 is a test-only setting: these snippets are routed like any Caller's Request." | Cut. |
| Narrating internals while loading | "Resolving the HS hierarchy and your selected product codes…" | Cut; the loading state says it. For long jobs, follow polish 14. |
| Explaining a disabled state on screen | A sentence saying why a control is grey | One short reason next to the control, or in its tooltip (polish 16). |
| A note about the note | "Notes you might act on, like "a question is waiting on you", would move inside the card…" | Cut. |
| Too long for its spot | "Applying updates the draft. Test and verify it before releasing or running" wrapping onto two lines | Cut to what the person acts on, or cut entirely. |
| Status string | "MetaBrain Studio · Advisor · 82 screens · 8 areas" | Keep the one fact that matters, or none. |
| Intro blurb | "Every advisor page now runs on one shared set of tokens and components. Each frame below shows…" | Cut. Show the designs. |

Also cut on sight. These are the marks of generated UI:

- **Eyebrow labels.** Small caps above a heading ("FEATURES", "HOW IT WORKS").
- **Decorative numbering.** "01 / 02 / 03", unless it's a real sequence the person follows.
- **Reflex subtitles.** A subtitle under every heading, or a blurb under every list item, when the names alone already tell the items apart.
- **Fake-state badges and dots.** "NEW", "AI", "LIVE" and pulsing dots that don't render from real state.
- **Decorative icons.**
  - Icons in tinted boxes, emoji in headings, buttons and labels.
  - The same icon on every row of a single-type list.
  - An icon stays when it is the control, or when every item in a toolbar or menu has one.
- **"→" tacked onto button or link text.**
- **"WORD — fragment" labels.**
- **One accented word in a headline.**
- **Monospace for labels that aren't code.**
- **Slogans.** "Built different." "Ship faster. Think less."

## Words

- Use plain words the viewer knows. A term only the team uses ("Đã đưa lại") gets replaced with what it means.
- One name per thing, the same everywhere in the product.
- Status badges in Capitalized form ("Draft", "Published"), not "draft" or "DRAFT".
- Never point by colour or position ("the green button", "the menu on the left").
- Full sentences (errors, empty states, hero copy) are plain and specific, with no filler and no em dashes. When the `unslop` skill is installed ([cursor/plugins](https://github.com/cursor/plugins/tree/main/pstack/skills/unslop)), follow it.

## Design deliverables for people

Boards, before/after pages and reports show the designs. Text stays minimal:

- Annotations only where a viewer would be confused.
- Annotations say why something changed, not what is visible.
- Write in the viewer's language.
- Questions and long notes stay out of the deliverable; ask them in chat.

## Guardrails

- Icon buttons keep an accessible name. When cut text was an icon button's only name, move it into `aria-label`. A text field keeps a visible label or a control that shows its meaning; `aria-label` alone isn't enough for fields.
- Text from translation files, a CMS or data is changed at its source, or reported.
- When you delete an element, delete its empty wrapper, its leftover margin and its unused imports too.
