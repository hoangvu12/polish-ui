# Forms

How polish 13 and 16 apply to forms. Error wording lives in [copy.md](copy.md).

## When validation runs

- A field is checked after the person has entered something and left it, or on submit. Tabbing through an empty field shows no error.
- Once an error shows, check again on every keystroke, so it clears the moment the value is valid.
- With react-hook-form, `mode: "onTouched"` is the closest built-in (it also flags required fields that were only tabbed through, so leave the required check to submit), and never `mode: "onChange"`.
- Passwords, tokens and keys are validated and sent exactly as typed. For every other field, trim surrounding whitespace and accept common notations (spaces or dashes in phone numbers, a pasted email with a trailing space) before validating, and save the cleaned value.

## Submitting

- The submit button stays enabled while the form has errors. Clicking it shows every error next to its field and focuses the first invalid one. It is disabled only while the request is in flight, showing its pending state ("Creating…"), or in a type-the-name confirm until the name matches ([web.md](web.md#destructive-actions)).
- A failed submit keeps every value and keeps the dialog open.
- A server error about one field ("Name already taken") goes on that field. Any other error sits above the submit button.

## Labels and hints

- Every field has a visible label, or a control that shows its meaning. Clicking a label focuses its field.
- A format or rule the person needs while typing ("MM/YYYY", "At least 12 characters") goes in a hint linked to the field (`aria-describedby`; in shadcn, `FormDescription`). A placeholder only shows an example value, because it disappears on the first keystroke.
- A group of radios, checkboxes or switches has a legend (`fieldset` and `legend`, or `role="group"` with `aria-labelledby`).
- A field that depends on another option appears only once that option is on.
- Personal details, passwords and codes get the right `type`, `inputmode` and `autocomplete` (`email`, `tel`, `current-password`, `one-time-code`), so autofill and password managers work. Never block paste.

## Errors in markup

The message is text linked to its field with `aria-describedby`, and the field gets `aria-invalid`. A red border alone isn't an error message.
