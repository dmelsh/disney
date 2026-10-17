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

# PART 4: Silver Dollar City build brief

> **Evidence warning.** The official park site, Wikipedia and Wikimedia Commons were unreachable from the research sandbox. Everything below comes from web-search summaries of those pages. Treat every height, price and hour as **a lead to confirm**, and keep an "unverified" flag in the data until someone checks it. Full detail, sources and the conflict and gap tables are in `reports/Silver Dollar City fall trip.md` and `research_notes/Silver Dollar City fall trip/`.

## 4.1 What was decided with Dan, and what was assumed

**Confirmed by Dan**

| Item | Answer |
|---|---|
| Trip status | **Upcoming**, and the trip is *today* (Oct 17, 2026), in the fall. |
| Group | Dan, Andrea, Grayson (5), Emma (1.5, Dan & Andrea's child), Lauren (Dan's sister), Tessa (2.5, Dan's niece), and Dan's parents Steve and Terry. |
| Content source | Internet research (done: see the report). |
| What matters | All four: little-kid rides, big coasters, shows and crafts, food and Marvel Cave. |
| Reference images | **Research verified sources.** Do not hotlink anything that has not been confirmed to load. |
| This file | Disney retrospective plus the Silver Dollar City brief, in one file. |

**Assumed (confirm in Part 5)**

- One day, not several.
- Same build as the Disney app: Vercel, share and print, optional ambient sound (muted by default), family photos in `localStorage`.
- A separate repo or folder and a separate Vercel project.
- Title: "The Day at Silver Dollar City" until Dan picks one.

## 4.2 Product idea: plan first, keepsake after

The Disney app looked backward at a day that was over. This trip has not happened yet, so the app should have two modes on the same data:

- **Plan mode (before and during the trip).** Each activity shows who in the group can ride, based on height rules, and a status the family can tap: *to do / done / skipped*.
- **Memory mode (after the trip).** Same screens as the Disney app. Family photos, a short summary, and a "Read the full story" expander that Dan fills in afterwards.

This is a proposal, not something Dan has asked for. It is cheap to build because the Disney structure (Day → Area → Activity, photos, next/previous) is unchanged. The new parts are a `people` list, a `rules` block per ride, and a `status` field.

## 4.3 Areas (use the park's real names)

The Disney PRD guessed some land names, and the equivalent guesses for this park were **wrong**. "Craft Valley", "Craftsmen's Valley", "Wilderness Crossing" and "Hugo's Hollow" were not found as Silver Dollar City areas (Craftsman's Valley belongs to Dollywood), and Echo Hollow is an amphitheater, not an area. **Rule for any new park: take area names from the park's own map, not from memory.**

The official rides page groups attractions under these nine areas:

| Area id | Name | Notable contents (per research) | Toddler fit |
|---|---|---|---|
| `fire-district` | The Fire District | Fire in the Hole (opened 2024), Fire Wagon Frenzy, FireFall, FireHouse Play Place, measuring station | Best small-kid cluster |
| `grand-exposition` | The Grand Exposition | Late-1800s World's Fair theme: Happy Frogs, Magnificent Wave Carousel, Ladybugs, Electro Spin, Elephant March, Grand Exposition Coaster | Best gentle rides |
| `homestead-ridge` | Homestead Ridge | Homestead Animal Barnyard, Birdie's Cabin | Easy |
| `midtown` | Midtown | Grandfather's Mansion, Hugo & Mary's Carousel, craft shops (Half Dollar Holler is placed here by one source) | Second carousel |
| `valley-road` | Valley Road | Frisco Silver Dollar Line steam train, The Flooded Mine | Seated rest for grandparents |
| `wilsons-farm` | Wilson's Farm | Outlaw Run, The Giant Barn Swing, High-Low Silos | Thrill area |
| `hugos-hill-street` | Hugo's Hill Street | WildFire, American Plunge, PowderKeg, Fried Fancies | Hilly |
| `rivertown` | Rivertown | Mystic River Falls, Tom & Huck's RiverBlast, Rivertown Smokehouse | Water rides, cold in October |
| `western-outskirts` | Western Outskirts | Listed, no attractions found | Unknown |

Items to model that are not on that list:

- **Main Street / entrance plaza.** Not on the official ride list but it is where the day starts.
- **Marvel Cave.** No confirmed area. Model it as its own area or as an activity under the entrance.
- **The Plaza** (pumpkin dance party, Flanders Famed Fare). Not confirmed as an official area name.
- **Pumpkins In The City** (the after-dark festival event). Use it as the evening "finale" area, the equivalent of the Disney parade finale.
- **Daredevil Pass / Miner's Mountain Express.** Announced for 2027. Not open. Optionally add as a "coming soon" note, never as a visited activity.
- **Thunderation.** Retiring: its last day is January 2, 2027. Worth a "last chance" card.

Order areas in the order the family actually enters them, as in the Disney app (area appears at its first-visit time). The research could not source a walking order. Suggested order (inference): measuring station → Fire District → Grand Exposition → Half Dollar Holler → Frisco train → lunch → afternoon break → Plaza and pumpkins at dusk.

## 4.4 Seed data for ride eligibility

Heights below are search-summary quotes of the official pages, in inches. `companion` means a person 16 or older who meets that ride's own limits. **On rides with a maximum height, adults cannot be companions.** The kids' heights are not known: the research assumed Grayson at 42-44 in and both girls under 36 in, so **measure everyone at the Measuring Station first** and store the real numbers.

| Ride | Rule | Grayson | Tessa | Emma |
|---|---|---|---|---|
| Magnificent Wave Carousel | Under 42 in with companion | Yes | With adult | With adult (age floor unverified) |
| Happy Frogs, Up The Ladder, Fire Wagon Frenzy, Lucky's Dizzy Dogs | 36 in; under 36 with companion | Yes | With adult | With adult |
| Ladybugs / Fireman's Flyers | 36-55 in / 36-52 in | Yes | Only if 36 in+ | No |
| Grand Exposition Coaster | 42 in (sources conflict: 36 in with companion) | Yes, alone | No | No |
| Frisco steam train / Flooded Mine | 48 in; under 48 with companion (suspiciously high, verify) | With adult | Verify | Verify |
| PowderKeg | 48 in; 42 in with companion | With adult if 42 in+ | No | No |
| Mystic River Falls | 55-77 in; 40 in with companion (conflict) | With adult if 40 in+ | No | No |
| Fire in the Hole | 48 in; 36 in with companion (conflict) | With adult | No | No |
| Outlaw Run, Giant Barn Swing, FireFall, Electro Spin | 48 in | No | No | No |
| Time Traveler / WildFire | 51 in / 52 in | No | No | No |
| Thunderation | Height not found | Verify | No | No |

Suggested data shape (new fields only):

```ts
interface Person { id: string; name: string; ageLabel: string; heightIn?: number }
interface RideRules {
  minIn?: number;            // may ride alone at or above this
  minWithCompanionIn?: number;
  maxIn?: number;            // adults over this cannot ride or accompany
  source: string;            // URL of the page the number came from
  verified: boolean;         // false until a person confirmed it
}
interface Activity { /* existing fields */ rules?: RideRules; status?: 'todo' | 'done' | 'skipped' }
```

Show a small chip row per ride ("Grayson ✓", "Tessa with an adult", "Emma ✗") computed from `people` and `rules`. When `verified` is false, show a small "check on site" badge.

## 4.5 Festival, food and Marvel Cave content for the app

- **Harvest Festival presented by Humana**, Sept 11 to Oct 31, 2026. **Pumpkins In The City**, Sept 18 to Oct 31 (more than 20,000 pumpkins lit after dark; Garden of Giants; Peter & Penelope Pumpkin photo ops; pumpkin dance party in The Plaza, reportedly from about 5:30 pm). Included with admission per the park's release.
- **The three headline concerts are over** (Diamond Rio Sept 12, Aaron Tippin Sept 19, Sara Evans Sept 26). Do not list them as things to do.
- **Guest costumes are not allowed.** No haunted houses or scare zones. Oct 31 is a Saturday, the last festival day, and forecast heavy.
- **Crafts and shows:** dozens of visiting craftsmen daily (copper, jewelry, stained glass; glassblowing and blacksmithing per third parties), a Cowboy Emporium in the Carousel Barn, cowboy cooking demos ending in an afternoon chuck-wagon cook-off. No 2026 craftsman list, show schedule or parade was found.
- **Food:** cinnamon bread is the most-cited item; skillet meals; Molly's Mill (all-you-can-eat, no reservations) suits the adults; kids' meals at Wagon Works Grill, Lumbercamp, Rivertown Smokehouse, Buckshot's Skillet and Lady Liberty Dining Pavilion. The Harvest Tasting Ticket is $38 plus tax for five small items. Outside snacks and small coolers are allowed (no glass or alcohol) per the official FAQ.
- **Marvel Cave:** included with admission, about 60 minutes, roughly 500 stairs down, 60°F, reviewers say no strollers, and the park discourages it for heart, lung, back, knee or ankle problems. It is a poor fit for the grandparents and the two toddlers. Plan: a short outing for Grayson with one or two adults, and say so in the app.
- **Logistics:** ages 3 and under are free (Emma and Tessa need no ticket). Preferred parking $22, premier $67, general parking free with trams. Stroller rental about $24 single and $28 double (older pages show lower prices). ECVs need 24 hours' notice by phone (417-336-7100); wheelchairs cannot be reserved. Hours reported as about 10 am to 9 pm, with 9:30 am to 10 pm on Fridays and Saturdays (trackers only, unverified).

## 4.6 Theming

Palettes below are **design inferences from written descriptions**, not sampled from photos. Check the contrast of white text on every primary before shipping, as was done for Disney.

| Area | Mood | Primary | Secondary | Surface |
|---|---|---|---|---|
| Main Street / entrance | Aged board-and-batten, hand-painted signs | `#7A3E22` | `#C99A3B` | `#F3E7CF` |
| The Grand Exposition | Striped canopies, brass calliope | `#B3262E` | `#1F5E7A` | `#FBF4E4` |
| Rivertown | Pier timbers, river teal, lantern amber | `#2F6B6A` | `#8C5A2B` | `#E8E1D0` |
| Midtown, Valley Road, Hugo's Hill Street (craft areas) | Log cabins, forge amber | `#8A5A33` | `#D17B2C` | `#F0E2C8` |
| The Fire District | Charred timber, ember orange | `#A8321D` | `#3A2A24` | `#E9D9C0` |
| Marvel Cave and coasters | Limestone, cave dark, lantern glow | `#3B3A38` | `#C98B2E` | `#E7E0D3` |
| Frisco railway | Engine black, brass, red caboose | `#1F1F1F` | `#A64B2A` | `#EEE3CE` |
| Pumpkins In The City (evening) | Harvest night | `#2A1A12` | `#D9822B` | `#F6EBD8` |

Homestead Ridge, Wilson's Farm and Western Outskirts have no sourced description: use a neutral craft-village palette and replace it from Dan's photos. Add a shared harvest accent (pumpkin `#D9822B`, cornstalk gold `#CBA135`) across the app. Heading type suggestion: hand-painted show-card faces such as Rye, Alfa Slab One or Sancreek, with a plain serif or sans for body text.

**SVG scenes to draw** (replace the Disney set): a covered-wagon and board-walk entrance, a striped-canopy fair with a carousel and a calliope, a river pier with a paddle boat, a log-cabin craft row with a candle and anvil, a fire-station with a ladder, a cave mouth with lanterns, a steam locomotive with a red caboose, a coaster over a bluff, and a pumpkin patch at dusk with glowing jack-o'-lanterns.

## 4.7 Images: verified-only policy

What the research found, and what it could not:

- **No image was opened.** No direct `upload.wikimedia.org` URL was obtained. The Commons category for the park is small.
- **Candidate Commons files** (found as search results, licenses per search summaries, all need re-checking on the file page): WildFire (CC BY 2.0, Jeremy Thompson), Powder Keg (CC BY 2.0), Silver Dollar City Christmas wreath (CC BY 2.0, Nan Fry), and files for Outlaw Run, FireFall, Electro Spin, the Frisco No. 43 locomotive and Fire in the Hole (license not seen). Coasterpedia 2026 photos are reported as CC BY 4.0.
- **Nothing found** for the Grand Exposition, Rivertown overall, Echo Hollow, Marvel Cave entrance or a Main Street panorama.
- Official park photos should be treated as all-rights-reserved. No press room terms were found.

**Build rule:** run the Commons API `imageinfo` query from a machine with open internet to get real file URLs, licenses and authors, record how each URL was found, and add only confirmed ones to `images.ts`. Everything else falls back to the family's own photos and then to the illustrated scenes. Family photos are the best "real view" for a private keepsake and are the first link in the fallback chain.

## 4.8 Suggested screens and content defaults

- Keep the Disney screens. Add a **"Who's riding?"** chip row on ride cards in Plan mode and a people-and-heights editor behind a small settings button.
- Day overview: title, date, the seven names, a "Today at a glance" card (festival, last-weekend note, Thunderation farewell), then the area list in visiting order.
- Keep the short-summary-plus-expander pattern and the photos-first activity layout (Dan asked for no walls of text and for something a 5-year-old and an adult can both use).
- Mark every unverified number with a small badge so nobody plans a toddler's ride around a guess.

## 4.9 Starter prompt for Claude Code

> Read `docs/Disney_to_Silver_Dollar_City_Rebuild_Guide.md` (Parts 3 and 4), `reports/Silver Dollar City fall trip.md` and the notes in `research_notes/Silver Dollar City fall trip/`. Copy the Disney app into a new project, generalize `ThemeKey` and the `park` field, replace the content, themes and SVG scenes per Part 4, and add the people, rules and status features. Use only the park's real area names. Do not hotlink any image that is not confirmed to load. Keep every unverified fact flagged. Build with `npm run build`, test with Playwright, and prepare a separate Vercel project.

---

# PART 5: Open items

## 5.1 Questions for Dan

1. **One day or more?** The brief assumes one day.
2. **Title.** "The Day at Silver Dollar City", or something warmer (for example "Grayson's Harvest Day")?
3. **Heights.** What are Grayson's, Tessa's and Emma's heights? This decides most of the ride table.
4. **Steve and Terry.** Their ages (65+ discount) and whether either needs a scooter or wheelchair.
5. **Extras.** Keep ambient sound and share/print as in the Disney app?
6. **Plan mode.** Do you want the "who can ride" chips and the to-do/done/skipped status, or just the keepsake?
7. **Repo and hosting.** New repo or a folder in this one? A new Vercel project (recommended)?
8. **After the trip.** Will you send a written account or photos, or should I interview you to fill in the stories?

## 5.2 Things to check with the park (highest value first)

Today is Saturday, October 17, so several of these are urgent if the visit is today or tomorrow.

1. **ECV (scooter) rental.** Needs 24 hours' notice by phone (417-336-7100). Wheelchairs cannot be reserved.
2. **Measure the children** at the Official Measuring Station (Fireman's Landing area or FireHouse Play Place) before choosing rides.
3. **Rider Swap rule for 2026**, and whether toddlers can ride on a lap or in arms.
4. **True minimums** for the Frisco train and The Flooded Mine (48 in looks too high), and heights for Thunderation, Elephant March and Hugo & Mary's Carousel.
5. **Official hours, show times and today's ride status** (use the park app).
6. **Marvel Cave stroller and baby-carrier policy.**

The report's tables list all **30 source conflicts** (with the version to plan around) and **24 gaps**, each with where to check.

## 5.3 Files produced

| File | What it is |
|---|---|
| `docs/Disney_to_Silver_Dollar_City_Rebuild_Guide.md` | This file |
| `reports/Silver Dollar City fall trip.md` | The synthesized research report (about 45 KB, graded by evidence quality) |
| `research_notes/Silver Dollar City fall trip/park_layout_and_areas.md` | Areas and attractions |
| `research_notes/Silver Dollar City fall trip/rides_heights_toddlers.md` | Ride rules by person |
| `research_notes/Silver Dollar City fall trip/fall_festival_2026.md` | Harvest Festival and Pumpkins In The City |
| `research_notes/Silver Dollar City fall trip/food_and_marvel_cave.md` | Dining and the cave tour |
| `research_notes/Silver Dollar City fall trip/logistics_and_accessibility.md` | Tickets, parking, strollers, mobility |
| `research_notes/Silver Dollar City fall trip/imagery_and_theming.md` | Image sources and area palettes |
