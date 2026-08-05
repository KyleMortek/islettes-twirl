# Image assets

## Generated from the team logo

These are built from the logo embedded in
`Islettes_Elite_Handbook_2025_2026.docx`. The white background was keyed
out and the artwork auto-cropped, so they sit cleanly on any colour.

| File | Size | Used for |
|---|---|---|
| `logo.png` | 1200×1156 | Footer, and anywhere on a light background |
| `logo-on-dark.png` | 1200×1156 | Hero, and anywhere on navy — cream line work instead of navy, so it stays legible |
| `logo-mark.png` | 420×405 | Header |
| `og-image.png` | 1200×630 | Link previews (Facebook, iMessage, Slack) |
| `../icons/favicon.svg` | vector | Browser tab (modern browsers) |
| `../icons/favicon-32.png` | 32×32 | Browser tab fallback |
| `../icons/apple-touch-icon.png` | 180×180 | iOS home screen |

## Hand-authored SVG

`ladybug.svg`, `star-constellation.svg`, `baton.svg`, `divider-wave.svg`.

Each accepts CSS custom properties for colour, so they recolour with the
theme instead of needing separate light and dark files:

```css
.my-thing { --ladybug-shell: #A23F3D; --ladybug-ink: #1A3057; }
```

## Photo slots — where real photos go

Anywhere you see a maroon-to-navy gradient panel with a faded ladybug,
that's a `.photo-slot` waiting for a real photo.

### On `about.html`

```html
<div class="photo-slot photo-slot-wide">
  <span class="slot-label">Team photo coming soon</span>
</div>
```

Replace the whole `<div>` with an `<img>`:

```html
<img src="assets/images/team-2026.jpg"
     alt="The full Islettes' Elite team at the 2026 state competition"
     width="1600" height="900" loading="lazy">
```

**Target: 1600×900 (16:9), JPEG, under 400 KB.**

### In the gallery (`gallery.html`)

The gallery is currently six placeholder `.photo-slot` tiles inside
`.gallery-grid`. To add a real photo, replace one tile:

```html
<figure class="gallery-item">
  <img src="assets/images/gallery/parade-2026-07.jpg"
       alt="Rising Stars twirlers marching in the Hamburg Fourth of July parade"
       loading="lazy" decoding="async">
  <figcaption>Hamburg Fourth of July Parade, 2026</figcaption>
</figure>
```

`js/main.js` automatically makes any `.gallery-item` with an `<img>`
inside it open in the lightbox on click — no other wiring needed. Put the
image files in a new `assets/images/gallery/` folder.

**Target: 1600×1200 (4:3), JPEG, under 500 KB.**

## Alt text is required

Every real photo needs a real `alt` attribute — describe what's
happening ("Rising Stars twirlers marching in the Hamburg Fourth of July
parade"), not "photo" or "image". Screen-reader users get nothing useful
from the latter.

## Before uploading photos of children

These pages are public and indexed by search engines. Worth agreeing with
families first on whether twirlers are named in captions. The safe
default, and what the site does now, is to describe the unit and the
event rather than individual children.
