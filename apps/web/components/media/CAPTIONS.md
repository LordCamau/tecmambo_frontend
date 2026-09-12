# Image captions and credits

This is the permanent tecMAMBO presentation rule for captioned images:

- Render the caption and credit as plain text in normal document flow directly below the image.
- Never overlay caption or credit text on an image.
- End caption text with a period.
- Render attribution as `Credit: Publisher.` Never use `Image Credit:` or `Image credit:`.
- Use the shared `ImageCaption` component for rendered image captions and the shared `formatImageCaption` formatter for non-HTML mirrors such as Markdown.
- Cards and social previews may omit captions. If a template displays caption content, it must use this same below-image presentation and wording.

The component contract lives in `ImageCaption.tsx`. Do not recreate caption strings or caption styling inside individual article, card, hub, or embed templates.
