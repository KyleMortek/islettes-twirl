# Islettes' Elite Dance Twirl Team

The website for Islettes' Elite Dance Twirl Team — a baton twirling team in
Western New York with four units from Pre-K through college, competing in NBTA
and Twirling Unlimited events.

**Live site:** <https://kylemortek.github.io/islettes-twirl/>

All content on this site comes from `Islettes_Elite_Handbook_2025_2026.docx`,
which lives in the repo root and is the source of truth. If the handbook and
the website ever disagree, the handbook wins — fix the website.

---

## Contents

- [How it's put together](#how-its-put-together)
- [Updating the site](#updating-the-site)
- [Project structure](#project-structure)
- [Local development](#local-development)
- [Deployment](#deployment)
- [Adding payments later](#adding-payments-later)
- [Still to do](#still-to-do)

---

## How it's put together

This is a plain static site: HTML, CSS, and one small JavaScript file. No
framework, no build step, no backend, no accounts, no database.

```
index.html, about.html, programs.html, events.html,
gallery.html, handbook.html, payments.html, contact.html
        │
        ├── css/main.css   — the entire stylesheet
        └── js/main.js     — nav, TOC scroll-spy, gallery lightbox,
                              contact form (opens a pre-filled email)
```

Every page is complete on its own — open the HTML file and everything on
it is real. There's nothing that "loads" or depends on a service being up.

## Updating the site

There's no admin panel — updates are made by editing the HTML files
directly and pushing to `main`. A few common ones:

**Add or change an event.** `events.html` currently shows an honest "check
your twirler's folder" message instead of fake dates, since there's no
calendar source yet. To list a real event, copy the pattern used in the
"Event day, step by step" section (a `<li class="card reveal">` with a
heading and a paragraph) into a new list under "Upcoming."

**Add a photo to the gallery.** See `assets/images/README.md` — replace one
of the placeholder `<div class="photo-slot">` tiles in `gallery.html` with
a real `<figure class="gallery-item"><img ...></figure>`. The lightbox
click behaviour picks it up automatically; no JavaScript changes needed.

**Set fee amounts.** `payments.html` has four `.fee-card` articles, each
currently showing "Contact us for pricing." Once amounts are decided,
replace `<span class="fee-amount-tbd">Contact us for pricing</span>` with
the dollar figure, e.g. `$45/month`.

**Update team info, staff, or dress code.** Plain text in `about.html` and
`programs.html` — edit directly.

**Update the handbook.** `handbook.html` mirrors the current `.docx`. When
next season's handbook is ready, update both files together.

---

## Project structure

```
islettes-twirl/
├── index.html                 Home
├── about.html                 Team, staff, values
├── programs.html              The four units + dress code
├── events.html                Event-day procedures (calendar TBD)
├── gallery.html                Photos
├── handbook.html               Full 2025–26 handbook
├── payments.html                Fee schedule + accepted payment methods
├── contact.html                Contact form (mailto) + FAQ
│
├── css/main.css                Entire stylesheet. No framework.
├── js/main.js                  Nav, TOC scroll-spy, lightbox, contact form
│
├── assets/
│   ├── images/                 Logo, OG card, SVG art (see its README)
│   └── icons/                  Favicons
│
├── Islettes_Elite_Handbook_2025_2026.docx    Source of truth
├── sitemap.xml · robots.txt
└── .github/workflows/deploy.yml
```

---

## Local development

No dependencies, no install step:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Or just open any `.html` file directly in a browser — nothing here
requires a server.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes
the repo root to GitHub Pages.

```bash
git add .
git commit -m "feat: describe what changed"
git push origin main
```

To enable Pages the first time: **Settings → Pages → Source: GitHub
Actions**.

> Earlier versions of this README described a `develop` → `main` branch
> workflow. That branch was never created, so the instructions above match
> what the repo actually does. If you want a staging branch later, create
> `develop` and reinstate it.

---

## Adding payments later

The original goal for this site included accepting payments online. That
needs *something* running server-side — even the simplest option (a
[Stripe Payment Link](https://stripe.com/payments/payment-links)) is
enough, since it needs no code on this site at all: create a link in the
Stripe dashboard for each fee, then swap the "Contact us" button on that
fee's card in `payments.html` for a link to it.

For anything more (dynamic pricing, order records, a database of
events/photos editable outside of git) this site would need a real
backend. That's a meaningfully bigger project and deserves its own
decision about hosting, cost, and who maintains it — worth scoping
separately when there's a concrete need for it, rather than carrying that
complexity now.

---

## Still to do

Things that need information only the team has:

- [ ] **Fee amounts** — the handbook states the payment *schedule* but no
      dollar figures
- [ ] **Venmo handle** — currently listed as an accepted method without one
- [ ] **Social media URLs** — the footer icons were removed rather than left
      as dead `#` links; add them back when there are real accounts
- [ ] **Team photos** — see `assets/images/README.md` for how to add them
- [ ] **Practice location** — the handbook says only "WNY"
- [ ] **Event dates** — no calendar source is wired up yet; see
      [Updating the site](#updating-the-site)
- [ ] **2026–27 handbook** — the site currently reflects the 2025–26 season

---

## License

MIT — see [LICENSE](LICENSE).
