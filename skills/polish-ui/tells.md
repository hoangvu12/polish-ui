# Tells

A **tell** is a pattern models reach for by default, so it marks a page as generated. One tell alone rarely gives a page away; a page stacking several does. In one study of 120 AI-built pages, 57 showed six or more tells and only 20 showed two or fewer.

A tell stays only when someone chose it: the brand's tokens, the project's design policy or an explicit request (polish 10). Everything else gets the fix in its row. Text tells cost nothing to cut, so cut them on sight. Visual tells (a font, a background, a glow) are never the default you reach for, and stay when the brand already uses them.

When reviewing, count the tells on each page and report the count with the list. Several on one page is the finding, even where each alone would pass.

Claude's own most frequent tells come first: an arrow on button text (on 91% of Opus 5.5 pages in one benchmark) and coloured left-border callouts. Check for these before anything else in work you produced.

## Words

| Tell | Fix |
|---|---|
| "→" or "↗" on button or link text | The label alone; an arrow only on a link that leaves the site |
| Eyebrow labels: small spaced capitals above a heading ("FEATURES", "THE GAP") | Cut; the heading names the section |
| Stacked label tiers: eyebrow, heading, subheading, caption on one block | One heading, plus its content |
| A subtitle under every heading, a blurb under every list item, when the names already tell the items apart | Cut the subtitles |
| Facts joined with "·" ("macOS · Linux · Windows · MIT licensed") | Polish 2 |
| Decorative numbering ("01 / 02 / 03") on things that aren't a sequence the person follows | Cut the numbers |
| Fake-state badges and dots: "NEW", "AI", "LIVE", a pulsing green dot, "48/48 NOMINAL" not rendered from real state | Show real state, or nothing |
| An announcement pill above the headline ("v2.4 parallel sub-agents are here →") | Cut, unless it links to a real release the page is about |
| Slogans and two-word fragments ("One gateway. Every agent." "Built different.") | One plain sentence saying what the product does |
| Copy that states a benefit and never says how the product works | Say what it does, using names from the product |
| Sentences chaining several claims | One claim per sentence, the one that matters |
| Marketing sections dressed as technical readouts (monospace spec sheets, status consoles) | Plain sections; monospace only for code |
| Mood words: "quiet", "real" ("for people who do the real work"), "unhurried", "effortless", "seamless" | The concrete fact the word stands in for |
| Stats nobody measured ("99.99% uptime", "12B steps") | The product's real numbers, or cut the strip |
| "WORD — fragment" labels | A plain label |

## Type

| Tell | Fix |
|---|---|
| One italic, coloured, underlined or gradient word in a headline | Set the whole headline in one style |
| Instrument Serif, or another editorial serif, picked without a brand reason | The project's type tokens; a new project picks a face for its content |
| No font chosen, or Inter by default on a marketing page | Choose one on purpose (Inter is fine when the design system uses it) |
| Every section heading centred, headline centred over everything | Left-align sections; centre only a short hero when the layout calls for it |
| Monospace for labels that aren't code | The UI font |

## Icons

| Tell | Fix |
|---|---|
| Sparkles, a lightning bolt or a brain to mean "AI" or "magic" ("Start for free ✨") | Cut, or an icon for what the feature does |
| Icons in tinted boxes, emoji in headings, buttons and labels | Cut |
| The same icon on every row of a single-type list | Cut |

An icon stays when it is the control, or when every item in a toolbar or menu has one. Lucide and shadcn's default palette are tells only on a page with no design system; in a project built on them, they are the system (polish 8).

## Surfaces and layout

| Tell | Fix |
|---|---|
| Cream or paper background (#F4F1EA and its neighbours) outside the brand tokens | The project's background token |
| Blurred colour glows behind the hero or the input, light with no source | Cut |
| Coloured left border on callouts, quotes and testimonials | Space and type set the quote apart; a border only from the design system's callout |
| Three or four icon cards in a row as the features section | Show the product: a screenshot, a real example, or a plain list |
| Everything in a card | Polish 12 |
| Tilted cards, phones and stickers | Straight; show the product at its real angle |
| Dithering, grain or noise as decoration | Cut |
| A recognisable stock look: purple-gradient SaaS, dark glass with frosted panels, a bento grid under "FEATURES", cream with serif and one italic orange word | Start from the content list (SKILL.md "Before you build a new view") and the brand, not a look |

## Motion

Load `remove-animations` to cut these, or `animate` when one should stay and needs fixing.

| Tell | Fix |
|---|---|
| Every section fading or sliding up on scroll | Content is there on load |
| Cards fading up one by one into an empty grid | Show the grid at once |
| Every card lifting on hover, clickable or not | Hover only on interactive elements (polish 16) |
| Numbers counting up from 0 | Show the number |
| A headline typing itself out | Show the headline |
| Slow transitions between pages | Instant, or short enough to go unnoticed |
