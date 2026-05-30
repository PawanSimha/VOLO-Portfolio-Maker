# Product Requirements Document: VOLO Portfolio Builder

| Field | Detail |
|---|---|
| **Project Name** | VOLO Portfolio Builder |
| **Target Release** | Q2 2026 |
| **Status** | Draft |
| **Author** | Pawan Simha R |

---

## Executive Summary

VOLO is a zero-config, client-side portfolio engine that enables developers, designers, and creators to build production-grade professional portfolios in minutes without writing code or setting up build toolchains. We are building this now because the market lacks a tool that combines real-time preview, cinematic design, and local-first architecture in a single browser-based workflow — forcing creators to choose between slow custom development and generic template platforms.

---

## Problem Statement

Building a professional portfolio today requires either:
- **Hours of boilerplate setup** — wiring up frameworks (Next.js, Gatsby), configuring CI/CD, managing dependencies, and hand-rolling responsive layouts.
- **Sacrificing uniqueness** — drag-and-drop platforms (Wix, Squarespace, Carrd) produce visually generic output with locked-in hosting, poor Lighthouse scores, and limited customization.

The gap is a **portable, cinematic portfolio that ships as static HTML** — no servers, no vendor lock-in, no framework fatigue. Users want control without complexity.

---

## Target Personas

| Persona | Goal | Primary Friction |
|---|---|---|
| **Junior Developer** | Land first job by showcasing side projects and GitHub activity | Can code but lacks design skills; spends 80% of portfolio time on CSS instead of content |
| **Freelance Designer** | Win client pitches with a visually stunning, fast-loading showcase | Needs unique layouts but cannot afford custom development; existing builders feel "template-ish" |
| **Career Changer** | Transition into tech by presenting transferable skills and certifications | No portfolio-building experience; overwhelmed by technical jargon and framework choices |

---

## Success Metrics (OKRs / KPIs)

| Metric | Target | How Measured |
|---|---|---|
| **Time-to-Portfolio** | ≤ 10 minutes from first visit to download | Timer from page load to ZIP export click |
| **Lighthouse Score (generated output)** | ≥ 95 across all categories | Lighthouse CI on exported ZIP |
| **Task Success Rate** | ≥ 90% of users complete export without errors | Click-through analytics + error logging |
| **Template Adoption** | ≥ 3 templates used by 80% of users | Template selection tracking in LocalStorage |
| **User Satisfaction** | SUS score ≥ 75 | Post-export survey (System Usability Scale) |

---

## Core Features & Requirements (MoSCoW)

### P0 — Must Have (Launch Gate)

| Feature | Rationale |
|---|---|
| **Real-time Preview** | Core value proposition — users must see changes instantly |
| **Handlebars-based Template Engine** | Enables secure client-side rendering without a server |
| **ZIP Export** | Primary output mechanism — generates deployable static site |
| **16 Theme Colors** | Minimum viable customization surface |
| **Dark/Light Mode** | Essential accessibility and preference feature |
| **LocalStorage Persistence** | Allows session recovery and iterative editing |

### P1 — Should Have (V1.1)

| Feature | Rationale |
|---|---|
| **Additional Templates (3–5 layouts)** | Increases conversion by accommodating different aesthetics |
| **Image Upload for Avatar/Portfolio** | Reduces friction of hosting images externally |
| **Custom CSS Injection** | Unlocks advanced customization for power users |
| **Responsive Preview Toggle** | Ensures mobile output quality without switching devices |

### P2 — Could Have (V2.0)

| Feature | Rationale |
|---|---|
| **Live GitHub Stats Integration** | Adds social proof without manual entry |
| **Multi-language Export** | Expands TAM to non-English markets |
| **Export to GitHub Pages (direct deploy)** | Removes final deployment friction entirely |

---

## AI & Technical Constraints

| Constraint | Specification |
|---|---|
| **Rendering Engine** | Handlebars.js runtime compilation — no server-side processing |
| **Styling** | Tailwind CSS (CDN JIT mode) — styles compiled in-browser |
| **Export Format** | Self-contained single-ZIP archive — all assets inlined or relative |
| **State Persistence** | LocalStorage only — no backend, no cookies, no PII transmitted |
| **File Size Limit** | ZIP generation limited to browser memory (≈500MB effective ceiling) |
| **Browser Support** | Chrome 90+, Firefox 90+, Edge 90+, Safari 15+ — ES6+ required |
| **CDN Dependencies** | Handlebars, Tailwind, JSZip — all loaded from CDN; export ZIP contains only user data |
| **Data Privacy** | Zero server communication — all data stays in-browser; no analytics beyond Vercel page views |
| **ZIP Integrity** | SHA-256 checksum verified post-generation before download trigger |

---

## User Journey / Flow

### Primary Flow: First-Time User (Junior Developer)

1. **Landing** → User visits `index.html` — cinematic parallax page communicates product value within 3 seconds.
2. **Launch** → Clicks "Launch Builder" → navigates to `templates/template1.html`.
3. **Input** → Fills sidebar form: name, bio, skills, projects (max 6 fields visible at a time).
4. **Preview** → Iframe updates on every keystroke — no save button, no refresh.
5. **Customize** → Selects theme color (Blue → Emerald → Rose) and mode (Dark/Light).
6. **Export** → Clicks "Download" → JSZip generates ZIP → browser downloads.
7. **Deploy** → Opens `index.html` from ZIP in browser → looks identical to preview.
8. **Iterate** → Data persists in LocalStorage — can return later and continue editing.

---

## Out of Scope (Non-Goals)

- **Server-side rendering or API layer** — VOLO is 100% client-side by design; no backend will be added.
- **User accounts or authentication** — No login, no cloud saves, no multi-device sync.
- **Custom domain management or hosting** — User handles deployment independently.
- **eCommerce or payment features** — No monetization within the tool itself.
- **Real-time collaboration** — Single-user editing only.
- **Native mobile app** — Web-only; responsive for mobile browsers.

---

## Go-To-Market / Rollout Strategy

| Phase | Activities | Duration |
|---|---|---|
| **Alpha** | Internal testing of template1 + ZIP export; catch critical rendering bugs | 2 weeks |
| **Beta** | Share via GitHub + LinkedIn; collect SUS surveys; fix top-3 friction points | 4 weeks |
| **Launch** | Public GitHub release; add shields/badges; publish README + PRD; tweet/X announcement | 1 week |
| **Post-Launch** | Monitor GitHub issues; release template2 based on community feedback | Ongoing |

### Success Exit Criteria for Beta
- ≥ 50 unique export downloads
- ≥ 3 unsolicited GitHub stars or forks
- SUS score ≥ 68 (above-average threshold)
- Zero P0 bugs open > 48 hours
