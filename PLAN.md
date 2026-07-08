# Webfolio — Project Plan

> **Instruction for Claude:** At the end of every session working on this repo, update this same file (`PLAN.md`) to reflect what changed — move completed items into the checklist as done, revise "Next actions," and bump the progress percentage. Don't create a new plan file; keep this one current. Treat it as the single source of truth for where the project stands.

## a) General work plan

Build a personal portfolio site (product designer) around an interactive envelope metaphor: a closed envelope opens to scatter six "pebble"-shaped project photos, which expand into detail cards on hover and link to full case-study pages; an arrow below the envelope expands the page into a traditional resume/portfolio layout (About, Education, Experience, Projects). Source of truth for the concept is `task.md`; the Figma file (`zmR69eT8NL7ldfO2i2I1qc`) is the visual reference, cross-checked repeatedly against real pixel offsets, asset shapes, and screenshots throughout development.

Stack: React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + React Router. No backend — static data in `src/data/`.

## b) Implementation by stages

1. **Scaffold** — Vite/React/TS/Tailwind project, design tokens (colors `#61a200`/`#b9cb9f`, fonts, shadow token), folder structure. ✅ Done.
2. **Assets & data** — downloaded and mapped Figma assets (6 pebble photos + their un-masked originals, envelope art, profile photo/mask, icons); built `projects.ts`/`education.ts`/`experience.ts`. ✅ Done.
3. **Envelope hero interaction** — closed→open toggle, pebble scatter/retract animation, hover-to-detail widget with collision-avoiding repulsion, arrow expand/collapse. ✅ Done, iterated several rounds based on visual feedback (see checklist).
4. **Resume section** — About/Education/Experience/Projects, alternating project rows, scroll-reveal on arrow click. ✅ Done.
5. **Routing & state preservation** — project detail as a modal-route overlay so returning to the hero preserves scroll position and envelope/expanded state exactly. ✅ Done.
6. **Visual QA pass** — repeated close comparison against Figma reference images and screenshots; fixed cropping, distortion, shadow/mask rendering bugs, layout collisions. ✅ Done for now, hover effect still flagged as unsatisfying by the user (see Next actions).
7. **Content pass** — replace placeholder project copy with real case-study content. ⬜ Not started.
8. **Polish pass** — asset optimization, accessibility audit, cross-browser check. ⬜ Not started.

## c) Checklist

**Scaffold & infra**
- [x] Vite + React + TS + Tailwind v4 + Framer Motion + React Router set up
- [x] Design tokens in `src/index.css` (`--color-moss`, `--color-moss-muted`, `--color-glow`, fonts, `--shadow-pebble`)
- [x] Google Fonts loaded (Edu AU VIC WA NT Guides, Alan Sans); Jost substituted for unavailable Century Gothic

**Assets & data**
- [x] 6 pebble (masked) photos + 6 original (unmasked) photos downloaded, resized/compressed, mapped to correct projects
- [x] Envelope closed/opened SVGs (now on a consistent shared frame, per user-provided replacement assets)
- [x] Profile photo + mask + "Hi" doodle assets
- [x] `projects.ts`, `education.ts`, `experience.ts` populated with real bio/education/experience copy from Figma

**Envelope hero**
- [x] Envelope closed → opened toggle (click again to re-close)
- [x] Envelope moves down on open / up on close (physical "settling" motion, not a flat crossfade)
- [x] Pebbles hidden behind envelope when closed; spring outward from the envelope on open (not just fade-in-place)
- [x] Pebble shapes render uncropped (object-contain at each photo's real aspect ratio)
- [x] Dome-shaped resting layout — all 6 pebbles at or above the envelope's level, envelope enlarged and repositioned lower, arrow grouped directly beneath it
- [x] Hover widget: photo grows and a white panel extends from it with title/description/tags (merged "photo → panel" shape per Figma reference, not a detached card)
- [x] Hard collision resolution: hovered widget vs. every other pebble, pairwise pebble-vs-pebble, and envelope-avoidance for the grow direction — no overlaps
- [x] Ambient motion: **all** pebbles drift slightly on hover, not just the ones in direct collision
- [x] Background glow strengthened/layered
- [x] Structural clip-path refactor: hover widget is a single container that morphs via CSS `clip-path` (organic collapsed shape → pill-shaped expanded card), photo locked to one edge, filter/clip-path split across parent/child to keep both the drop-shadow and hit-testing correct
- [x] Fixed "jump then settle" bug on This-To-Me/StamPuzzle hover: `growRight` (grow-toward-center vs. away-from-envelope) is now computed by one unified `computeGrowRight()` used identically for a pebble's resting and hovered state, so it can never flip (and silently snap `transformOrigin`) when hover starts/ends
- [x] (Superseded, see below) Organic-photo-cutout era: fixed a white sharp-corner artifact poking past the photo's silhouette via clip-path corner-rounding + a small outer-edge inset, tuned through several screenshot-verified rounds.
- [x] **Switched pebble source art from organic-cutout photos to baked polaroid frames.** All 6 `src/assets/pebbles/*.png` are now flat, pre-rendered polaroids (white frame + baked-in drop shadow) exported from Figma at a shared 800×937 ratio, replacing the old per-photo organic cutouts. `PebbleCluster.tsx`'s `LAYOUT` now derives width from one shared `POLAROID_RATIO` instead of a per-project ratio. `Pebble.tsx` was simplified accordingly: removed `PHOTO_CORNER_RADIUS`/`outerEdgeInset`/`SHADOW_ROOM` (all existed only to compensate for the organic silhouette not filling its own bounding box — moot now that the photo is a clean, fully-opaque rectangle) and removed the CSS `drop-shadow` filter on the wrapper (redundant with the shadow now baked into the PNG itself; keeping both doubled up visually). `collapsedClip`/`expandedClip` are now plain flush insets. Verified via Playwright screenshots: resting dome, and hover on both `growRight` directions (Bancall, Barista) — clean edges, full text, no artifacts. Kept the existing hover-straightens-to-0° behavior (user's explicit choice) even though the Figma reference itself keeps the tilt on hover.

**Resume section**
- [x] About Me (bio, portrait with correct vertical mask, "Hi" doodle at correct proportions)
- [x] Education (3 entries), Work Experience (1 entry)
- [x] Projects list, alternating image/text rows, dotted dividers, original (non-pebble) photos
- [x] Arrow click smooth-scrolls to reveal resume content; collapse scrolls back up

**Routing**
- [x] Project detail page (overview/challenge/research/development/outcome sections)
- [x] Modal-route pattern: Home never unmounts when viewing a project, so scroll position + envelope/expanded state are restored exactly on "back"

**Content**
- [ ] Real per-project copy (currently every project reuses the same Figma placeholder paragraph — "A bench that brings joy and community...")
- [ ] Real project detail page content (overview/challenge/research/development/outcome are placeholder strings per project)
- [ ] Confirm whether the 2 unused pebble photos (from the original 8) should ever appear anywhere, or stay unused

**Polish / not started**
- [ ] Accessibility audit (keyboard nav through pebbles/cards, focus states, screen-reader labels beyond the basic `aria-label`s already in place)
- [ ] Image optimization pass (several source photos are still 600–800KB; consider WebP/AVIF + responsive `srcset`)
- [ ] Cross-browser check (everything so far verified via Chromium/Playwright only)
- [ ] Production deployment setup (hosting target not yet chosen)

## d) Progress percentage

**~80%** toward a content-complete, polished v1.

- Interaction/animation system: ~97% (clip-path hover widget structurally complete; both reported hover bugs — the This-To-Me/StamPuzzle position jump and the white-corner artifact — root-caused and fixed and verified via Playwright screenshots against a true before/after)
- Visual fidelity to Figma: ~85% (many rounds of comparison and fixes; no further specific gaps reported as of last session)
- Content: ~40% (bio/education/experience are real; all project descriptions and detail-page copy are placeholders)
- Polish (a11y, perf, cross-browser, deploy): ~10% (not started)

## e) Next actions to be implemented

1. **Confirm with the user that the hover effect now feels right end-to-end** — the two specifically reported bugs (position jump, white-corner artifact) are fixed and verified, but there hasn't been a fresh round of general "does this feel right" feedback since the clip-path refactor landed.
2. **Real project copy.** Every project currently shares one placeholder summary/description and placeholder detail-page section text. Needs actual case-study writing per project (Archive Drift, This To Me, Learn and Record, Bancall, Barista, StamPuzzle).
3. **Decide on the 2 unused pebble photos** (from the original 8 in the Figma "project image original" frame) — confirm they should stay excluded, or find a use for them.
4. Once content is real: accessibility pass, image optimization, cross-browser spot-check, deployment setup.

## f) Session update instruction

At the end of each work session on this project, whoever (Claude) is working should update this file directly — not create a new one — to reflect:
- Newly completed items (move from "Next actions" / unchecked into the checklist as done)
- Any new open issues or user feedback not yet resolved
- A revised progress percentage
- A revised "Next actions" list

Keep this file as the first thing read at the start of a new session to pick up context quickly.
