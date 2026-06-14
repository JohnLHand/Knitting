# Handmade™ — Project Plan

> A living document. Update the **Status**, **What we're testing**, and **Backlog** sections as we go.
> Last updated: 2026-06-13

---

## What we're building
A knitting & crochet companion **mobile app** for **Anica**, driven by pain points she's actually raised. There are two surfaces:
- **Landing page** (`/index.html`) — a marketing/branding test. Disposable scaffolding, not the product.
- **The app** (`/app/`) — the real thing. Currently a functional mobile-web prototype; a native iOS app comes later if testing justifies it.

Free tier + paid tier eventually. Still being sketched.

**The strongest differentiator:** gauge learning — over time, learn Anica's *strikkefasthed* and recommend which needle to use for a given yarn. Competitors (e.g. LooseLoop, used as reference) don't do this well.

---

## How we work
John picks this up in **micro-bursts** — sometimes 5 minutes, sometimes 30 — between other work. So the backlog below is **sorted by the time/energy a task needs**, so any spare gap can move the project forward. Grab a task that fits the window you have.

The loop: **build a small piece → John tests it / gives to Anica → fold her feedback back here → pick the next piece.**

---

## Status (where we're at)
**v1 prototype is BUILT** (not yet committed/pushed/tested by Anica). It includes:
- ✅ **Projects** — list, create, view, delete. Saved on-device (localStorage).
- ✅ **Swatch on new project** (Anica's priority #2) — photo + stitches/rows per 10 cm + yarn + **needle size**.
- ✅ **Pattern library with filtering** (Anica's priority #1) — filter by category, needle size, yarn type. Seeded with 6 sample patterns; she can add her own.
- ✅ **Gauge Lookup** (the wedge, thin version) — type a yarn, see what needle gave the right gauge in past swatches. Demonstrates the concept and starts collecting the data the full version needs.

Deliberately **not** in v1: full "learns over time & predicts for new yarns" engine, row counter, "top 5 you may also like," accounts, paid gating.

**Live URL (once pushed):** https://johnlhand.github.io/Knitting/app/

---

## What we're testing with Anica (current round)
*(Fill in after she uses v1.)*
- Does the **swatch-on-start** flow feel natural, or is it too much to enter up front?
- Is **pattern filtering** by category / needle / yarn the right set of filters? Anything missing?
- Does the **gauge lookup** concept land — does she see the value of "Handmade remembers your needle for this yarn"?
- What does she reach for first / what's confusing?

**Her feedback:**
*(paste notes here after testing)*

---

## Backlog (sorted by effort)

### ⚡ 5-minute tasks (low brain power)
- [ ] Tweak wording / labels / button text based on Anica's reactions
- [ ] Adjust colors or spacing if anything feels off-brand
- [ ] Add/remove a pattern filter option
- [ ] Add more seed patterns so the library feels fuller
- [ ] Swap in real photos of Anica's knits as sample/empty-state imagery

### 🕒 ~30-minute tasks (a focused gap)
- [ ] **Row/stitch counter** screen (her wishlist) — big +/- buttons, undo, persists per project
- [ ] Link a project to a pattern (so swatch + pattern live together)
- [ ] "Add to Home Screen" instructions baked into the app on first open
- [ ] Export/backup data (since localStorage is per-device)

### 🧠 Bigger pieces (need a real session)
- [ ] **Gauge learning v2** — once enough swatches exist, estimate a needle for a *new* yarn by weight/fiber, not just exact-match recall
- [ ] **"Top 5 patterns you may also like"** (her wishlist) — needs a recommendation rule
- [ ] Decide free vs. paid tier split for the app
- [ ] Evaluate native app path (React Native / Swift) vs. staying mobile-web
- [ ] Photo storage that scales beyond localStorage limits

---

## Done so far
- ✅ Brand/landing page test (colors from Anica's palette, her sweater in the photos)
- ✅ Product docs captured in `/docs` (use cases, branding philosophy, pain points)
- ✅ Anica's pain points & prioritized wishlist captured
- ✅ v1 functional prototype built (`/app/`)
- ✅ Edit an existing project (form reopens pre-filled, saves in place)
