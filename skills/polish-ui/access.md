# Access

Checks for polish 12 and 16. Component libraries' defaults often miss them: pale focus rings, pale input borders, light placeholders and small icon buttons.

1. **Focus ring.** Every control shows a ring on keyboard focus (`:focus-visible`) with at least 3:1 contrast against what's next to it, on every surface level. A scroll container clips rings, so give the ring room or draw it inset.
2. **Focus never hidden.** Sticky headers, footers and banners never fully cover the focused element. Set `scroll-padding-top` and `scroll-padding-bottom` to their height.
3. **Targets.** Every click target is at least 24×24 px. A smaller one passes only if a 24 px circle centred on it touches neither another target nor another undersized target's circle. Links inside sentences are exempt.
4. **Contrast, measured.**
   - Text needs 4.5:1, or 3:1 at 24 px and up (about 18.7 px and up if bold, which is 14 pt). Placeholders and muted text count, measured on the surface they actually sit on.
   - Stand-alone icons, checkbox and switch outlines, and any edge that is the only way to identify a control or its state (an input's border, an unselected card's outline) need 3:1. Decorative card edges don't. An edge drawn only with `box-shadow` disappears in forced-colors mode; give it a border only in that mode (Tailwind's `forced-colors:border`), or a `border: 1px solid transparent` where the extra pixel doesn't change a shared control's size.
   - Disabled controls are exempt. Don't round: 4.49:1 fails.
   - Compute the ratio from the actual colours (alpha composited) in every theme the product ships, never judge by eye. Text on an alpha colour, a translucent bar or an image is measured where it's worst, or gets a solid surface or scrim.
   - When building, fix failing pairs in the elements you add or were asked to change by switching to another semantic token or pairing. If no other token passes, the token's value is the problem: don't patch it locally or change it unless asked; report it (polish 8, 10). When only reviewing, report without editing. Report unresolved or out-of-scope failures with the location, theme or state, the pair, its measured ratio and the threshold; if you couldn't measure, say "Not verified".
5. **Not colour alone.** Selected, error and status states also show a word, an icon, a weight or an underline.
6. **Inline feedback is announced.** "Saved" and result counts go in a `role="status"` region. `role="alert"` is only for errors that block the person. Render the region empty on mount and change only its text; a region mounted together with its message (`{msg && <div role="status">}`) is often not read. A button showing a spinner keeps its label.
7. **Errors are tied to fields.** See [forms.md](forms.md).
8. **Reasons aren't hover-only.** An unavailable control's reason is reachable from the keyboard and on touch, not only on mouse hover.
9. **Tooltips work from the keyboard.** A tooltip opens on focus as well as hover, stays up while the pointer moves onto it, and closes on Esc.
10. **Zoom.** At 320 px wide (400% zoom), content reflows and nothing is clipped. Only regions whose use needs two dimensions (data tables, code, maps, editing canvases) scroll sideways, and sticky bars don't take over the screen. Never set `maximum-scale=1` or `user-scalable=no`.
11. **Drag has a click path.** Drag-to-reorder also offers move up and move down, or a menu.
12. **Native elements, natural order.** Actions are `<button>` and navigation is `<a href>`, never `<div onClick>`. `tabindex` is only `0` or `-1`. Focus order follows the visual order; where `order`, `*-reverse` or grid placement makes focus jump, fix the DOM order.
