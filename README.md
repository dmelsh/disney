# The Day at Disneyland — a Day Memory App

A mobile-first, single-page keepsake of one specific day at the Disneyland
Resort: **Friday, May 22, 2026**, with Dan, Andrea & Grayson. Click through the
day **Day → Land → Activity**, with each Disney "land" wearing its own theme,
and attach your own photos to bring each moment back.

Built per `Disney_Day_Memory_App_PRD.md`, with content drawn from
`Disneyland_May_22_2026_The_Day.docx`.

## Tech stack

- **Vite + React 18** (TypeScript)
- **Tailwind CSS** — per-land theming via CSS variables + arbitrary values
- **React Router v6** — `/`, `/land/:landId`, `/land/:landId/activity/:activityId`
- **Framer Motion** — route crossfades, card press, hero parallax, drawer slide
- **localStorage** — photos stored as downscaled base64, keyed `photo:{activityId}`
- **Lucide React** — icons

No backend. Pure static site.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

> Note: the app loads Google Fonts (Anton / Playfair / Space Mono / Inter) from
> the CDN. In a fully offline/sandboxed environment they fall back to system
> fonts; online they load normally.

## Photos

- On any activity screen, tap **Add photo** (or drag-and-drop on desktop).
- Images are downscaled to 1280px on the long side and JPEG-compressed (0.8)
  before being stored as base64 in `localStorage`.
- The first photo you add becomes the **hero**; tap the ★ on any photo to make it
  the hero, or the trash icon to delete (with confirmation).
- Storage is per-browser. A warning appears once stored photos exceed ~4 MB
  (localStorage caps around 5–10 MB per origin).

## Extras

- **Ambient sound** — a soft, synthesized tonal pad per land (Web Audio API, no
  copyrighted assets). Off by default; toggle it with the speaker icon in the top
  bar.
- **Share / Print** — every Day / Land / Activity screen has a Share button
  (native share sheet, or copies the link) and a print-friendly Print button.

## Deploy to Vercel

This is a static SPA. `vercel.json` already includes the SPA rewrite so deep
links (e.g. `/land/cars-land/activity/cars-rsr`) resolve to `index.html`.

```bash
# from the project root
vercel          # first run: creates the project (framework auto-detected: Vite)
vercel --prod   # promote to production
```

No manual config edits are needed — Vercel detects Vite, runs `npm run build`,
and serves `dist/`.

### Other static hosts

- **Netlify** — drag the built `dist/` folder onto netlify.app (an SPA redirect
  is recommended: `/* /index.html 200`).
- **GitHub Pages** — `npm run deploy:gh-pages` (publishes `dist/` via the
  `gh-pages` package).
- **Any static host** (Cloudflare Pages, S3 + CloudFront, …) — serve `dist/` and
  add an SPA fallback to `index.html`.

## Adding another day later

The data model is structured so future trips can be added as additional `Day`
objects. Today's day lives in `src/data/day-may-22-2026.ts`; the schema is in
`src/types.ts` and themes in `src/themes/index.ts`.

## Project layout

```
src/
  data/day-may-22-2026.ts   # the day's content (source: the Word doc)
  themes/                    # ThemeKey → Theme map + base CSS vars
  hooks/                     # useTheme, usePhotos, useNavigation, useAmbientSound
  components/
    layout/                  # TopBar, Sidebar (drawer + desktop tree), NavArrows
    day/                     # DayOverview, LandCard
    land/                    # LandDetail, LandHero
    activity/                # ActivityDetail, ActivityHero, PhotoGallery, AddPhotoButton
    ui/                      # Badge, Lightbox, ShareButton
```

## Images & audio

This is a **private, personal-use family keepsake** — not a published product.

- **Area backgrounds**: each land shows a family photo (if you've uploaded one),
  otherwise a real reference photo hotlinked from Wikimedia Commons
  (`src/data/area-images.ts`), otherwise a built-in illustrated scene. Any image
  that fails to load falls back to the illustration automatically.
- **Your photos** always take precedence over reference images.
- **Ambient sound** is synthesized in the browser (no audio files bundled).

To change a land's reference photo, edit `src/data/area-images.ts` and paste a
direct image URL (or just upload your own photo to that land in the app).
