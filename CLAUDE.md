# CLAUDE.md - AI Assistant Guide for Islettes Twirl Team Website

## Project Overview

Static website for the Islettes Twirl Team, a competitive baton twirling organization. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no package manager.

## Tech Stack

- **HTML5** (semantic markup with ARIA attributes)
- **CSS3** (custom properties, Flexbox, Grid — no CSS frameworks)
- **Vanilla JavaScript** (ES5+, IIFE pattern, strict mode)
- **GitHub Pages** for hosting, **GitHub Actions** for deployment

## Project Structure

```
islettes-twirl/
├── index.html          # Home page (hero, program overview, CTAs)
├── about.html          # Team history, coaches, achievements
├── programs.html       # Program offerings by age/level
├── events.html         # Competitions and events calendar
├── gallery.html        # Photo galleries
├── contact.html        # Contact form and FAQ
├── css/
│   └── main.css        # Single stylesheet (CSS variables at :root)
├── js/
│   └── main.js         # All JS in one IIFE, feature-grouped functions
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages auto-deploy on push to main
├── .gitignore
├── README.md
└── LICENSE             # MIT
```

## Key Architecture Decisions

- **Zero dependencies**: No npm, no bundlers, no transpilation. Files are served as-is.
- **Single CSS file**: All styles in `css/main.css`, organized by component sections with comment headers. CSS variables defined in `:root`.
- **Single JS file**: All code in `js/main.js` wrapped in an IIFE with `'use strict'`. Feature modules are individual functions called from `init()`.
- **No build step**: Deployment uploads the repo root directly to GitHub Pages.

## CSS Conventions

- Use CSS custom properties (variables) defined in `:root` for colors, spacing, typography, and layout values.
- Color palette: `--primary-color` (deep purple #8b4789), `--secondary-color` (coral red #e84855), `--accent-gold` (#f4a261).
- Responsive breakpoints: 768px (tablets), 480px (mobile).
- Organize new styles under the appropriate section comment header (e.g., `/* BUTTONS */`, `/* CARDS */`).
- Mobile-first approach.

## JavaScript Conventions

- All code must stay inside the existing IIFE in `js/main.js`.
- Each feature is its own function (e.g., `initMobileNav()`, `initFormHandling()`).
- New features: create a named function, add it to the `init()` function.
- Use `document.querySelector` / `querySelectorAll` for DOM access.
- Always add ARIA attributes for accessibility (aria-expanded, aria-label, role, etc.).
- Use passive event listeners for scroll/touch events.

## HTML Conventions

- Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- Every page has the same header/nav and footer structure.
- Include SEO meta tags (description, keywords, Open Graph, Twitter Cards) on each page.
- All images must have `alt` attributes.
- Use `id="main-content"` on the `<main>` element for skip-link accessibility.

## Accessibility Requirements (WCAG 2.1 AA)

- Keyboard navigation must work for all interactive elements.
- Skip-to-content link on every page.
- ARIA labels and roles on dynamic elements.
- Sufficient color contrast ratios.
- Focus indicators must be visible.
- Respect `prefers-reduced-motion` media query.

## Git Workflow

- **Branch strategy**: `develop` for development, `main` for production.
- **Commit format**: Conventional Commits — `type: description`
  - `feat:` new feature
  - `fix:` bug fix
  - `docs:` documentation
  - `style:` styling/formatting
  - `chore:` maintenance
- Deployment is automatic via GitHub Actions when `main` is updated.

## Local Development

No install step needed. Serve files with any static server:

```bash
python -m http.server 8000
# or
npx http-server
```

Then open `http://localhost:8000` in a browser.

## Testing

No automated test framework is configured. Changes should be manually verified:

- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Responsive testing (desktop, tablet, mobile viewports)
- Keyboard navigation testing
- Screen reader compatibility

## Common Tasks

**Adding a new page**: Copy an existing HTML file, update the `<title>`, meta tags, `<main>` content, and active nav link. Ensure the header/footer match other pages.

**Adding a CSS section**: Add a new comment header block in `css/main.css` following the existing pattern, and use CSS variables for colors/spacing.

**Adding JS functionality**: Create a new named function in `js/main.js` inside the IIFE, then call it from `init()`.

**Modifying the color scheme**: Update the CSS custom properties in the `:root` block of `css/main.css`.
