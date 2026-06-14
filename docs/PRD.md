# Handmade™ — PRD (v1: Gauge-Aware Project & Pattern Companion)

> **Reverse-engineered** from the work already done (`/app` prototype, `/docs`, Anica's wishlist).
> Follows Michael's PRD guideline. **Audience: the developer building this** — it gives business, user, and product context, not implementation procedures.
> Last updated: 2026-06-14 · Status: prototype v1 built, not yet tested by Anica.

**One adaptation up front (read this):** Michael's template is written for Jabra/B2B ("what are we losing in sales per quarter", "IT admins"). Handmade™ is not that. It is a personal app John is building **for one real user — his wife, Anica** — as a design partner, with a *secondary* ambition of becoming a real crafter product (free + paid, App Store) if it earns the right. So wherever the template says "Jabra," read "this venture," and wherever it asks for sales numbers, the honest answer is **n=1 product learning**, not revenue. That framing is deliberate, not a gap.

---

## 1. Problem Statement

### Who the user is
**Anica** — an experienced, regular knitter. Knits garments (sweaters, cardigans, hats, shawls), not just swatches. Danish — she thinks in *strikkefasthed* (knitting gauge/tension). Apple household: iPhone is the primary device, iPad secondary. She is not chasing features; she wants her craft to feel **calm**.

She is, importantly, **n=1 by design**. This is not a guessed persona — the requirements below come from frustrations she actually raised. The wider "any crafter" market exists as a *later* question, not the design target today.

### The journey "as is" — how she struggles today
Across one project, Anica currently stitches her workflow together from disconnected tools:

1. **Choosing a pattern** — patterns live as PDFs, screenshots, bookmarks, and paper printouts. To find "a hat for this chunky wool" she scrolls through files with no way to filter by what matters (category, needle size, yarn).
2. **Starting a project** — she knits a gauge swatch, but the numbers live on a sticky note or in her head. Weeks later, *which needle gave that gauge?* is a guess.
3. **Knitting** — the pattern is in a PDF reader; her counts and notes are in a different app or on paper. Constant switching breaks the meditative flow that is the whole point of knitting.
4. **Counting** — a phone row-counter screen times out, the app gets backgrounded, the count resets. Place lost.
5. **Mistakes** — knitting is cumulative; one miscount cascades into hours of frogging (unraveling).
6. **Gauge, every single time** — for each new yarn she re-derives "what needle gets me to gauge?" from scratch, even when she's knit that exact yarn before. Her own past experience isn't captured anywhere she can query.

### The workarounds and what they cost
PDF reader + Notes app + a physical row counter + sticky notes + camera roll, none of which talk to each other. The cost is **lost flow, repeated rework, and re-solved gauge math** — the project information exists, it's just fragmented (see [`knitting_Pain_Points.md`](knitting_Pain_Points.md)).

### Why us, and why now
- **Why us:** John is between roles with focused time, and has a real, in-house design partner who hits these pains weekly. That's a rare, high-signal feedback loop most consumer apps never get.
- **Why now:** the one genuinely **differentiated** idea — an app that *learns Anica's gauge over time and tells her which needle to reach for* — is unserved. Competitors used as reference (e.g. LooseLoop) do counting and stash well but **don't do gauge memory/learning well**. That gap is the wedge, and the data it needs (saved swatches) only accumulates if we start capturing it now.
- **What "losing per quarter" really means here:** there is no sales line to quote. The honest leading cost of *not* building is (a) Anica keeps re-solving gauge by hand, and (b) we forgo the product learning that would tell us whether gauge-memory is a wedge worth a real app. That learning is the asset.

---

## 2. User Experience

### Journey map with Jobs To Be Done (now / later / never)

JTBD across the knitting lifecycle, color-coded by **when** we serve them. 🟢 Now · 🟡 Later · ⚪ Never (out of scope by choice).

| Stage | Job To Be Done | When |
|-------|----------------|------|
| **Discover** | "When I want a pattern for a specific yarn/need, help me **filter my saved patterns** by category, needle size, and yarn so I find the right one fast." | 🟢 **Now** |
| **Discover** | "Suggest **patterns I may also like** based on what I've made." | 🟡 Later |
| **Prep** | "When I start a make, help me **capture my swatch** (photo + gauge + yarn + needle) so it's recorded at the moment I know it." | 🟢 **Now** |
| **Prep** | "Tell me whether I have **enough yarn / the right needles** in stash before I start." | 🟡 Later |
| **Reference** | "When I pick up a yarn, **remind me which needle gave me the right gauge last time** I used it." | 🟢 **Now** (recall version) |
| **Reference** | "**Estimate** a needle for a *new* yarn I've never used, from how I knit similar yarns." | 🟡 Later (the real differentiator, v2) |
| **Knit** | "**Count my rows** without losing my place when the screen sleeps." | 🟡 Later |
| **Knit** | "Show the **pattern and my count side-by-side** so I stop app-switching." | 🟡 Later |
| **Recover** | "Help me **undo / find my place** after a miscount." | 🟡 Later (folded into the counter) |
| **Reflect** | "Track **time/yarn used** per project." | 🟡 Later |
| **Connect** | "**Follow other crafters**, social feed, profiles." | ⚪ Never (for this build) |
| **Monetize** | "Free vs. paid gating, accounts, sync." | ⚪ Never yet (decide after testing) |

### The three "Now" JTBDs, in detail

**JTBD-1 — Filter saved patterns (Anica's priority #1).**
*When* she's deciding what to make, *she wants to* narrow her pattern library by category, needle size, and yarn type, *so she can* land on the right pattern in seconds instead of scrolling files. The filters combine (AND), and the available filter values are drawn from the patterns she actually has, so she never picks a filter that returns nothing she owns. She can also add her own pattern with these same attributes.

**JTBD-2 — Capture swatch on project start (Anica's priority #2).**
*When* she begins a make, *she wants to* record a photo of her swatch plus stitches & rows per 10 cm, the yarn, and the needle size, *so that* this never-again-available information is captured at the one moment she has it. This is the up-front cost that makes JTBD-3 possible — every saved swatch is a data point for gauge recall.

**JTBD-3 — Recall the needle for a yarn (the wedge, thin version).**
*When* she's about to knit with a yarn, *she wants to* type that yarn's name and *immediately see* which needle previously got her to gauge on it (with the actual stitch/row numbers and which project), *so she* stops re-deriving gauge by hand. It is deliberately **recall, not prediction** — it only answers for yarns she's already logged. Empty at first, smarter with every swatch. It proves the concept *and* seeds the dataset the predictive v2 will need.

---

## 3. Requirements

Scoped to the three "Now" JTBDs. Concrete enough to verify against the built prototype (`/app/app.js`).

### Functional requirements

| # | Requirement | Acceptance criteria |
|---|-------------|---------------------|
| **F1** | Create a project with a swatch | Given the new-project form, when Anica enters a name and optionally a photo, stitches/10cm, rows/10cm, yarn, and needle, then a project is saved and appears in the Projects list. Name is the only hard requirement; gauge fields are optional but prompted. |
| **F2** | Swatch photo is captured and stored on-device | When a photo is added, it is downscaled (≤900px, ~0.7 JPEG quality) before storage so it fits localStorage, and renders on the project card and detail view. |
| **F3** | View / edit / delete a project | Project detail shows gauge (`{sts} × {rows} / 10 cm`), yarn, needle, and photo. Editing reopens the form pre-filled and saves in place. Delete asks for confirmation and removes it. |
| **F4** | Pattern library with combinable filters | Patterns can be filtered by **category**, **needle size**, and **yarn** simultaneously (AND logic). Clearing a filter widens results. Filter dropdowns are populated only with values present in the current pattern set. |
| **F5** | Seeded patterns on first run | The library ships with ≥6 sample patterns so filters are demonstrably functional before Anica adds anything. |
| **F6** | Add own pattern | Anica can add a pattern with name + category + needle + yarn; it enters the library and its values become available as filter options. |
| **F7** | Gauge lookup by yarn (recall) | Typing a yarn returns the needle from a matching past swatch (substring match on yarn, project must have a needle), shown with the stitch/row gauge and source project name. Yarns she's logged appear as autocomplete options. |
| **F8** | Honest empty states | With no data, gauge lookup and project/pattern lists each show a guiding empty state ("once you've saved a project…") rather than a blank or error. |
| **F9** | Persistence across sessions | All projects and patterns survive app close/reopen on the same device (localStorage). |

### Non-functional requirements

| # | Requirement | Rationale / criteria |
|---|-------------|----------------------|
| **N1** | **Offline-first, no backend** | Everything works with no network and no account. No server, no sign-in for v1. |
| **N2** | **On-device privacy** | All data (incl. photos) stays on the one device; nothing is transmitted. State this plainly to the user. |
| **N3** | **iOS Safari PWA, add-to-home-screen** | Primary target is Anica's iPhone via "Add to Home Screen"; must look and behave like an app launched from the home icon. |
| **N4** | **Calm, glanceable, one-handed** | Big touch targets, minimal chrome, fast tab switching (Projects / Patterns / Gauge). Knitting happens with busy hands. |
| **N5** | **Brand-compliant** | Colors/typography follow `brand/sweater_brand_guidelines_v2.pdf` (Magenta hero, Plum text, Helvetica). |
| **N6** | **Fast & lightweight** | Static HTML/CSS/JS, no framework, no build step. Instant load, instant interactions. |
| **N7** | **Resilient storage** | Photo downscaling must keep typical usage within localStorage limits; degrade gracefully (don't crash) if a write fails. |
| **N8** | **Disposable/iterable** | Built to be thrown away or rewritten cheaply — this is a sketch to react to, not an architecture to defend. |

---

## 4. Ideas for Solutions

*Humble framing: these are what we built to make the idea concrete and testable — not the answer. If the developer (or Anica's reactions) reveal a better shape, take it.*

**The prototype *is* the breadboard.** Rather than wireframes, v1 is a working three-tab mobile-web app (`/app/`):

- **Projects tab** — list of project cards (photo, name, yarn · needle). `+ New` opens a form: name, photo (camera or library), stitches/10cm, rows/10cm, yarn, needle. Tap a card → detail (gauge, yarn, needle, photo) with edit/delete.
- **Patterns tab** — three filter dropdowns (category / needle / yarn) above a list of pattern cards with attribute tags. `+ Add` for her own. Seeded with 6 patterns.
- **Gauge tab** — a single yarn input with autocomplete from her logged yarns; returns "**{n} mm needle** — on {yarn} (project '…') you got {sts}×{rows}/10 cm." Empty state guides her to add swatches first.

**Data model (for reference, not prescription):**
- `project = { id, name, photo (downscaled dataURL), stitches, rows, yarn, needle }`
- `pattern = { id, name, category, needle, yarn }`
- gauge lookup = filter projects where `yarn` contains the query (case-insensitive) **and** `needle` is set; return the match.

**Deliberately thin choices to revisit:** gauge is exact-recall by substring (not fuzzy, not weight/fiber-aware); "add pattern" uses sequential `prompt()` dialogs (placeholder UX); storage is single-device localStorage. All three are known debt, chosen to ship something reactable fast. The *predictive* gauge engine — estimate a needle for an unseen yarn from how she knits similar yarns — is intentionally **not** here; v1 exists to seed its data and prove anyone wants it.

---

## 5. Scope

### Appetite
**Micro-bursts, not sprints.** John advances this in 5–30 minute gaps between job-search and other work, so the backlog (`PROJECT_PLAN.md`) is sorted by *energy required*, not priority. The appetite for v1 was "a weekend's worth of evenings to get something Anica can hold" — and that's spent: v1 is built. The appetite for the *next* increment is similarly bounded: one ~30-min task at a time (row counter, project↔pattern linking, backup), with **no** commitment to the big pieces until testing justifies them. If gauge-memory doesn't land with Anica, the right move may be to stop — and that's an acceptable outcome, which is the point of keeping appetite small.

### Why these now / later / never
- **Now (filter + swatch + gauge-recall):** these are Anica's own top two priorities *plus* the thin slice of the differentiator. Together they form the smallest thing that both (a) is useful day one and (b) tests the one hypothesis that matters (is gauge-memory worth building?). Swatch capture is "now" specifically because it's the data source the wedge depends on.
- **Later (counter, side-by-side pattern, gauge v2, recommendations, backup, tiers):** all real, all wanted, but each is either bigger or *dependent on data/feedback we don't have yet*. The predictive gauge engine is the crown jewel but is correctly deferred — it's worthless without a corpus of swatches, which "now" starts collecting.
- **Never (this build) (social feed, accounts/sync, B2B):** out of scope by choice. They dilute the calm-single-user thesis and serve a market we haven't validated. Revisit only if Handmade™ graduates from "tool for Anica" to "product."

---

## 6. Assumptions & Beliefs

### A) Assumptions we'd love to test / de-risk
- **A1 — Swatch-up-front feels helpful, not burdensome.** Asking for gauge at project start might be exactly the right moment, or it might feel like a tax. *This is the #1 thing to watch in testing.*
- **A2 — Category / needle / yarn are the right filter axes.** They may be incomplete (missing fiber weight? difficulty? project size?) or over-built.
- **A3 — The gauge-recall concept lands.** Anica needs to *see the value* of "Handmade remembers your needle for this yarn" — if she shrugs, the whole wedge is in question.
- **A4 — A mobile-web PWA is good enough** that the lack of "real app" polish doesn't sour the test.

### B) Beliefs we'll just go with (for now)
- **B1 — Gauge learning is the differentiator.** We're building toward it on conviction, not yet evidence.
- **B2 — On-device, single-device, no-account is fine for v1.** The friction of sync/backup isn't worth it until the concept is validated (accepting: nothing shows on her iPad).
- **B3 — Disposable scaffolding is the right speed.** Build cheap, throw away freely.

### C) Facts (rigorously enough established)
- **C1 — Anica actually raised these pains and priorities** (`anica-feature-priorities.md`): (1) pattern filtering, (2) swatch on start, plus gauge learning, a row counter, and recommendations. These are user-sourced, not invented.
- **C2 — Competitors (e.g. LooseLoop) under-serve gauge memory/learning** — the basis for the wedge.
- **C3 — The pains are real and concrete** (`knitting_Pain_Points.md`): counter timeouts, PDF/notes split, fragmented tracking, cascading miscounts.

---

## 7. How We Could Measure Success

Leading indicators, observable in Anica's interaction with the product — **not** "did she love it," and explicitly not sales.

- **Swatch capture rate** — share of new projects saved *with* gauge + needle filled (tests A1: is up-front capture actually tolerated?).
- **Return to Gauge tab** — does she open gauge lookup *unprompted* on a later session, after data exists? (tests A3 — the single strongest signal the wedge is real.)
- **Swatch corpus growth** — count of saved swatches over time; the dataset the predictive v2 needs. Flat = the wedge starves.
- **Filter usage** — does she actually apply pattern filters, and which axes? (tests A2; unused axes are dead weight.)
- **Activation** — does she complete "Add to Home Screen" and create ≥1 real project (not a throwaway)?
- **Repeat opens across weeks** — light retention: does Handmade re-enter her routine, or get opened once out of politeness?

We may never wire telemetry for these (it's n=1 — John can just ask her). Naming them still sharpens what "working" means.

---

## FAQ

Grouped by the four risk types. Answered proactively for the developer.

### Viability — what's in it for the venture / John?
- **Q: There's no revenue. Why build this at all?** The deliverable is *product learning* plus a genuinely useful tool for his wife. If gauge-memory lands, it's a validated wedge for a real App Store product (free + paid) later. If it doesn't, we learned that cheaply.
- **Q: Why not just use LooseLoop / an existing app?** They do counting/stash; they don't do gauge *memory/learning* well. That gap is the entire reason to build rather than buy.
- **Q: When do we decide free vs. paid?** Not in v1. It's a "later" item, decided only after testing shows the concept has legs. Don't build gating now.

### Desirability — what's in it for Anica (and eventual crafters)?
- **Q: Why would she enter a swatch up front — isn't that friction?** Because it's the one moment the info is fresh and free, and it pays her back via gauge recall. Whether the trade feels worth it is assumption A1 — the thing we're testing.
- **Q: Is "remember my needle for this yarn" really valuable?** Hypothesis (B1). Knitters re-solve gauge constantly; removing that for *known* yarns should feel like relief. Assumption A3 checks it.
- **Q: Does this generalize beyond Anica?** Unknown and deliberately not the v1 question. "Any crafter" is a *later* market bet; v1 optimizes hard for n=1.

### Usability — kinks in the UX
- **Q: How does someone knit with busy hands?** Big targets, three flat tabs, glanceable gauge result, minimal typing (yarn autocomplete from logged values). One-handed is a requirement (N4).
- **Q: The "add pattern" flow uses prompt() dialogs — is that final?** No. It's placeholder UX to ship fast; replace with a proper form when it's worth the time. Known debt.
- **Q: What does she see with no data?** Guiding empty states everywhere (F8), especially Gauge, which is empty by design until swatches exist. Empty must teach, not confuse.
- **Q: Gauge matching is a case-insensitive substring on yarn name — won't "wool" over-match?** Yes, that's a known sharp edge. It's acceptable for recall at n=1; revisit (normalize yarn names, or pick from logged yarns) before any predictive version.

### Feasibility — tech / architecture
- **Q: Why localStorage and no backend?** Fastest path to something reactable, offline-first, zero infra, on-device privacy (N1/N2). Trade-off: single-device, finite storage.
- **Q: Won't photos blow the localStorage budget?** Mitigated by downscaling to ≤900px / ~0.7 quality before write (F2/N7). It's a ceiling, not a solution — "photo storage that scales" is an explicit backlog item.
- **Q: Data is single-device — what about her iPad / a lost phone?** Accepted limitation for v1 (B2). Export/backup is a "later" 30-min task; sync is further out.
- **Q: Is a PWA good enough on iOS, or do we need native?** PWA via Add-to-Home-Screen is the v1 bet (N3). "Evaluate native (React Native / Swift)" is a deliberate *later* decision, gated on whether testing justifies the investment.
- **Q: How is the predictive gauge engine (the real differentiator) supposed to work later?** Out of scope now. v1's job is to **seed its dataset** (every swatch) and prove demand. v2 would estimate a needle for an *unseen* yarn from gauge patterns across similar yarns (weight/fiber) — design it when the data and the validated appetite both exist.
- **Q: No tests, no build step — is that a problem?** Intentional (N6/N8). This is disposable scaffolding optimized for iteration speed, not a system to harden. Don't over-engineer it.
