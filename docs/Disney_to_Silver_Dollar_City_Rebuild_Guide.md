# From Disney Day Memory to Silver Dollar City Memory

**Purpose:** (1) Record what was built for the Disneyland keepsake app, what research and decisions shaped it, and what went wrong along the way. (2) Give Claude Code a build brief to rebuild the same app for **Silver Dollar City** (Branson, MO).
**Written:** October 17, 2026 · **Owner:** Dan · **Source repo:** `dmelsh/disney`, branch `claude/festive-thompson-Nh2rX`

---

## How to use this file

1. Read **Part 1** and **Part 2** for the history and the lessons.
2. Read **Part 3** for what is reusable versus park-specific.
3. Hand **Part 4** (the Silver Dollar City brief) plus the research notes in `research_notes/Silver Dollar City fall trip/` to Claude Code to build the new app.
4. Check **Part 5** for open items still to confirm before and during the trip.

---

# PART 1: The Disney project, as built

## 1.1 What it is

A mobile-first single-page web app presenting one day at Disneyland (Friday, May 22, 2026, Dan, Andrea and Grayson) as a clickable, themed, photo-rich journey: **Day → Land → Activity**. It is a keepsake, not a planner. There is no backend, no accounts and no auth, and it deploys as a static site.

## 1.2 Inputs

| Input | Role |
|---|---|
| `Disney_Day_Memory_App_PRD.md` | Product and engineering spec: stack, data model, screens, themes, acceptance criteria, open questions (§14). |
| `Disneyland_May_22_2026_The_Day.docx` | Content source of truth: narrative, timeline table, "by the numbers", skipped items. |
| Dan's answers | Avengers Campus details (missing from the doc), title framing, extras, later feedback. |

## 1.3 Stack (as shipped)

Vite + React 18 + TypeScript, Tailwind CSS 3, React Router v6, Framer Motion, Lucide React, `localStorage` for photos. No Next.js and no state library. Deployed to Vercel as a static SPA (`vercel.json` rewrites everything to `index.html` so deep links work).

## 1.4 Information architecture and data model

- Routes: `/` (day overview), `/land/:landId`, `/land/:landId/activity/:activityId`.
- `Day { lands[] }` → `Land { id, name, park, theme, blurb, firstVisitTime, activities[], heroImage?, heroImageCredit? }` → `Activity { id, name, time, type, summary, narrative, details[], priority, photos[], heroImage?, heroImageCredit? }`.
- **Rule decided in the PRD:** a land appears once, at the time the family first entered it. All its activities are grouped there even if the family left and came back (Fantasyland was visited several times). This avoided modelling "visits".
- Navigation is a flattened list of every activity in order. The floating next/previous buttons walk that list, so they cross land boundaries correctly.
- Content lives in one module (`src/data/day-may-22-2026.ts`). Reference-image URLs live in `src/data/area-images.ts` and are attached to the lands and activities at import time.

## 1.5 Screens and behaviours that shipped

- **Day overview:** neutral hero, short clamped intro with "Read more", chronological land cards with illustrated thumbnails and a theme-coloured left stripe, and a closing section.
- **Land detail:** fully themed hero (gradient, illustrated scene, park badge, first-visit time), activity cards, and a "Continue to [next land]" button in the next land's colour.
- **Activity detail:** hero (photo or scene), one-line summary, **photos first**, then a "Read the full story" expander holding the narrative and quick facts, then previous/next cards.
- **Navigation:** sticky top bar with breadcrumb, hamburger drawer with the full day tree, persistent sidebar on desktop, floating next/previous buttons.
- **Photos:** file picker or drag-and-drop → downscaled to 1280 px on the long side, JPEG at 0.8, base64 in `localStorage` under `photo:{activityId}`. The first photo becomes the hero. The user can pick a hero and delete with a confirm step. A warning appears above 4 MB.
- **Ambient sound:** opt-in and off by default. It is synthesized with the Web Audio API (a soft chord per land), so no audio files are shipped.
- **Share and Print** buttons (native share sheet, copy-link fallback, print stylesheet).
- Accessibility: focus rings, keyboard-reachable controls, `prefers-reduced-motion` honoured.

## 1.6 Build timeline

| Step | Commit | What happened |
|---|---|---|
| 1 | `26f9514` | Full app built from the PRD and docx. 12 lands, themes, photos, nav, extras. |
| 2 | `2305cab` | Added illustrated SVG area backgrounds and replaced the "wall of text" with summary-plus-expander. |
| 3 | `b423e37` | Added real reference photos (Wikimedia Commons hotlinks) per land, hero motion, and the photo → reference → scene fallback chain. |
| 4 | `afadc69` | Wired reference photos per activity (18 rides and attractions). |

---

# PART 2: Research and decisions, and why

## 2.1 Reading the source docx without pandoc

`pandoc` was not installed. A `.docx` is a zip, so the text was pulled straight out of `word/document.xml` with a short Python script.

- **Lesson:** a naive regex `<w:t.*?>` also matches `<w:tcPr>` and floods the output with table XML. Use `<w:t(?: [^>]*)?>(.*?)</w:t>` and treat tables as a separate pass (rows → cells).
- The timeline table in the doc was the best source for times and place names, so it was parsed row by row.

## 2.2 The "ask before you write content" gate

The PRD required asking the §14 questions before writing content. Three things surfaced:

1. **A land with no content.** Avengers Campus was in the PRD but not in the doc. Dan supplied: visited in the morning before Anna & Elsa, met Ant-Man and Iron Man. The narrative for those two was written lightly and flagged as thin.
2. **Framing decisions.** Title "The Day at Disneyland", drag-drop plus `localStorage` photos, ambient sound and print/share *on*.
3. **A tooling gap.** The structured question tool returned a choice without the free text Dan intended, so a second short question was needed. Lesson: when "Other" is the expected answer, ask for the details as their own question.

**Takeaway for the new build:** list the content gaps first and ask once, up front.

## 2.3 Key product decisions

| Decision | Choice | Why |
|---|---|---|
| Land grouping | First-entered time, grouped | Simple model, matches how people remember a day. |
| Land theme colours | PRD palette, darkened where needed | White text on the PRD's primaries failed contrast for some lands (e.g. the PRD Cars red `#C9302C` → `#A8231F` primary with the original kept in the gradient). |
| Theming mechanism | CSS variables set per page by a `useTheme` hook | One component set serves every land. |
| Photo storage | Base64 in `localStorage` | No backend, matches the earlier planner app. Costs a ~5-10 MB per-browser limit, hence downscaling and the 4 MB warning. |
| Text density | Short summary up front, "Read the full story" expander, clamped paragraphs | Dan did not want a wall of text and wanted it usable by a 5-year-old and an adult. |
| Backgrounds | Original SVG scenes per land first, real photos later | Scenes always load, work offline, and are fast. |
| Sound | Synthesized, muted by default | No asset sourcing and no autoplay problems. |
| Fallback chain | Family photo → reference photo → scene | Family photos are the truest "real view"; nothing is ever broken. |

## 2.4 The image story (the most important lesson)

1. First pass: only original illustrations, because the PRD said not to bundle Disney art.
2. Dan then asked for real web images, so the options were tested. **The sandbox could not reach any image host** (`Host not in allowlist`, HTTP 403, even for Wikimedia with a proper User-Agent).
3. Dan then lifted the IP restriction ("personal use only"). The code and README were updated.
4. Reference photos were wired as Wikimedia Commons `Special:FilePath/<filename>?width=1600` hotlinks, with an `onError` fallback to the scene.
5. **The problem:** the filenames were written from memory and **could not be verified** from the sandbox. Some will miss and fall back to illustrations.

**Lesson for Silver Dollar City:** build the image list from filenames that were actually seen on a Commons category or file page, record how each was found, and only then hotlink. Keep the fallback chain either way. Dan chose "research verified sources" for this build.

## 2.5 Verification approach (reusable)

- `npm run build` runs `tsc --noEmit && vite build`. Type errors fail the build.
- Headless Chromium through Playwright: the global install lives at `/opt/node22/lib/node_modules/playwright`, imported as a CommonJS default (`import pw from '…/index.js'; const { chromium } = pw;`) with the browser at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
- Checks run: screenshots at 390×844 and 1280×900, console errors, photo upload then reload (persistence), the hero changing after upload, and "mapped activity requests the image / unmapped does not".
- **Benign noise:** `ERR_CERT_AUTHORITY_INVALID` for Google Fonts in the sandbox. Real browsers load them.
- A `whileInView` fade-in made full-page screenshots look empty. That is an artefact of the capture, not a bug. Scroll first, then capture.

## 2.6 Mistakes and fixes (so they are not repeated)

| Issue | Fix |
|---|---|
| `tsc -b` with a composite `tsconfig.node.json` failed (`TS6310`) | Single `tsconfig.json` that includes `vite.config.ts`; build script uses `tsc --noEmit`. |
| `.tsbuildinfo` files were staged for commit | Deleted them and added `*.tsbuildinfo` to `.gitignore` *before* the first commit. |
| `pkill -f vite` followed by more commands killed the shell (exit 144) | Run the kill and the following commands as separate calls. |
| An unused `theme` variable after a refactor | Strict `noUnusedLocals` caught it; remove dead code during the refactor. |
| Several icon names are easy to get wrong in Lucide | The PRD warned about `ParkingCircle` (use `CircleParking`). Check an icon exists before importing. |

## 2.7 Deployment

Vercel was the chosen target. The sandbox cannot reach Vercel and deployment needs the owner's login, so the steps were handed to Dan: connect `dmelsh/disney` in the Vercel dashboard (framework Vite, output `dist`), or run `vercel` and `vercel --prod` from the project root. No config edits are needed. For the new park, use a **separate Vercel project** so both sites stay live.

---

# PART 3: Reusable versus park-specific

## 3.1 Reusable as-is (copy the whole project)

`src/components/layout/*` (TopBar, Sidebar, NavArrows), `src/components/ui/*` (Badge, Lightbox, ShareButton, Disclosure, ClampText), `src/components/activity/*`, `src/components/land/*`, `src/components/day/*`, `src/hooks/usePhotos.ts`, `useNavigation.ts`, `useTheme.ts`, `useAmbientSound.ts`, `src/styles/*`, the build config and `vercel.json`.

## 3.2 Must change for a new park

| File | Change |
|---|---|
| `src/types.ts` | `ThemeKey` is a hard-coded union of Disney lands. Replace with the new park's keys or widen it to `string`. |
| `src/themes/index.ts` | New palettes, emojis and gradients for each area. |
| `src/components/scenery/LandScene.tsx` | New SVG scenes. Silver Dollar City has no castle, so write scenes for a mine and cave, a steam train, a covered bridge and barn, a craft village, a coaster, and a pumpkin patch. |
| `src/data/day-*.ts` | New content module for the trip. |
| `src/data/area-images.ts` | New, verified image list. |
| `index.html`, `README.md`, `public/favicon.svg` | Titles, text, icon. |
| `park: 'DCA' \| 'DLP'` | Silver Dollar City is one park. Rename the field (for example `zone`) or make it optional and hide the badge. |
| Photo storage keys | Use a different prefix (for example `sdc:photo:{id}`), or a different origin, so the two sites do not share keys. |

## 3.3 Recommended refactor (optional, saves work later)

Move park-specific data into `src/parks/<park>/` (`content.ts`, `themes.ts`, `scenes.tsx`, `images.ts`) and select one with a single `PARK` constant. Then a third park only needs a new folder.

---

<!--SDC-BRIEF-->
