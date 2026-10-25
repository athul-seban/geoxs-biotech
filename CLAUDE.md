# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## What this is

Marketing site for **Geoxs Biotech Private Limited** — an early-stage Indian biotech (enzyme/microbe plastic
degradation + algae-derived bioplastics). The site's job is to turn investor / industrial-partner trust into
a "Partner With Us" enquiry. Plain static HTML/CSS/JS: **no build step, no package.json, no backend.** Part of
the `WireframeSolution` workspace of unrelated projects (see the workspace-root `CLAUDE.md`).

Read [PRODUCT.md](PRODUCT.md) (audience, brand commitments, what evidence exists) and [DESIGN.md](DESIGN.md)
("Molecular Precision" design system: colour tokens, Hanken Grotesk / Inter / JetBrains Mono / PT Serif
type ramp, spacing, components) before changing copy or visuals. They are the source of truth.

## Layout

```
index.html            # the live single-page site (sections: #top #mission #technology #model #viability #roadmap #team #contact)
css/styles.css        # all styles for the live site
js/main.js            # scroll-reveal, stat count-up, nav toggle, mailto contact form, hero molecular-network canvas
assets/               # favicons, logo.jpg, mark.svg/png, mark-watermark.svg, photos/ (4 real photos)
new-1/ … new-5/       # five ALTERNATIVE redesign prototypes, each a self-contained index.html + css/ + js/
robots.txt, sitemap.xml, .nojekyll, site.webmanifest (in assets/)
Geoxs_Biotech_Summary.pdf, Geoxs biotech.jpeg, logo.png   # source documents/brand art (PDF is not linked from the site)
.impeccable/config.json   # design-lint ignore list (see below)
```

`new-1..5` are explorations of different visual movements (Liquid Glass, Swiss-style, Dynamic-Island capsule
header, …) over the same content — **not** the live site, and each has its own CSS/JS (some JS is a copy of the
root `js/main.js`). A change to the live site does not propagate to them and vice-versa; confirm which one is
meant before editing, and never "fix" one by copying another over it.

## Commands

No tooling is required. Preview by opening `index.html`, or serve the folder (needed to test the `/new-N/`
pages and root-relative behaviour):

```bash
python -m http.server 8080      # then http://localhost:8080/ and /new-1/ … /new-5/
```

There are no tests or linters. Verify visually (the Playwright MCP is configured at the workspace root), at
mobile width as well as desktop, and with `prefers-reduced-motion` in mind (the JS honours it).

## Deployment

GitHub Pages from `origin` = `github.com/athul-seban/geoxs-biotech`, served under the **project subpath**
`https://athul-seban.github.io/geoxs-biotech/`. Consequences:

- Every asset/link must be **relative** (`assets/…`, `css/…`), never root-absolute (`/assets/…`) — a recent
  commit fixed broken photo paths for exactly this reason.
- `canonical`, `robots.txt` and `sitemap.xml` hard-code that URL (and the JSON-LD block in `index.html`); update
  all of them together if the domain changes (e.g. a custom domain).
- `.nojekyll` must stay so Pages serves the folders as-is.

## Content rules (from PRODUCT.md — these are hard constraints)

- Company name, CIN `U37100TZ2022PTC040037`, incorporation date (13 Sep 2022) and jurisdiction are fixed facts.
- The **logo mark and "GEOXS BIOTECH / PRIVATE LIMITED." wordmark are fixed** — redesign the surrounding UI, never
  the mark.
- **Never invent** pricing, customer/partner logos, testimonials, case studies, press mentions, metrics or
  urgency. None exist. Only the founder/co-founder bios, the NewGen IEDC selected-venture claim, the patent-in-
  progress and EcoAlgaForm (UK partner) are real.
- The contact form has no server by design: it validates client-side then opens the visitor's mail client via
  `mailto:contact@geoxsbiotech.com`. Don't add a form-posting service unless asked.
- Preserve the narrative arc: problem → technology → viability → roadmap → team → contact.

## Design-lint config

`.impeccable/config.json` records user-approved exceptions to the design detector (extra font sizes in the
`new-*` prototypes, the molecular-watermark background, deliberate bounce easings, scrim colours). If a lint
rule fires on one of those, the reason is documented there — add new exceptions the same way (with a reason)
rather than silently ignoring.
