# Access

Numbers to check, for polish 12 and 16. Component libraries' defaults often miss them: pale focus rings, pale input borders, light placeholders and small icon buttons.

1. **Focus ring.** Every control shows a ring on keyboard focus (`:focus-visible`) with at least 3:1 contrast against what's next to it, on every surface level. A scroll container clips rings, so give the ring room or draw it inset.
2. **Focus never hidden.** Sticky headers, footers and banners never fully cover the focused element. Set `scroll-padding-top` and `scroll-padding-bottom` to their height.
3. **Targets.** Every click target is at least 24×24 px. A smaller one passes only if a 24 px circle centred on it touches neither another target nor another undersized target's circle. Links inside sentences are exempt.
4. **Contrast, measured.**
   - Text needs 4.5:1, or 3:1 at 24 px and up (18.5 px and up if bold). Placeholders and muted text count, measured on the surface they actually sit on.
   - Stand-alone icons, checkbox and switch outlines, and any edge that is the only way to identify a control or its state (an input's border, an unselected card's outline) need 3:1. Decorative card edges don't.
   - Disabled controls are exempt. Don't round: 4.49:1 fails.
5. **Not colour alone.** Selected, error and status states also show a word, an icon, a weight or an underline.
6. **Inline feedback is announced.** "Saved" and result counts go in a `role="status"` region. `role="alert"` is only for errors that block the person. A button showing a spinner keeps its label.
7. **Errors are tied to fields.** See [forms.md](forms.md).
8. **Reasons aren't hover-only.** An unavailable control's reason is reachable from the keyboard and on touch, not only on mouse hover.
9. **Tooltips work from the keyboard.** A tooltip opens on focus as well as hover, stays up while the pointer moves onto it, and closes on Esc.
10. **Zoom.** At 320 px wide (400% zoom), content reflows and nothing is clipped. Only regions whose use needs two dimensions (data tables, code, maps, editing canvases) scroll sideways, and sticky bars don't take over the screen.
11. **Drag has a click path.** Drag-to-reorder also offers move up and move down, or a menu.
