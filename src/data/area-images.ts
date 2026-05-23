import type { ImageCredit } from '../types';

/**
 * Real reference photos for each land, hotlinked from Wikimedia Commons.
 *
 * Priority order for an area background is: a family photo uploaded to that
 * land → the URL here → the illustrated scene. If a URL doesn't resolve, the
 * app falls back to the scene automatically (no broken images).
 *
 * These load in the viewer's browser (not at build time). To swap any image,
 * paste a new direct image URL below — the Special:FilePath form resolves a
 * Commons filename to its current file, e.g.
 *   https://commons.wikimedia.org/wiki/Special:FilePath/<Filename>?width=1600
 */

export interface AreaImage {
  url: string;
  credit?: ImageCredit;
}

function commons(filename: string, width = 1600): AreaImage {
  const enc = encodeURIComponent(filename);
  return {
    url: `https://commons.wikimedia.org/wiki/Special:FilePath/${enc}?width=${width}`,
    credit: {
      text: 'Photo: Wikimedia Commons',
      href: `https://commons.wikimedia.org/wiki/File:${enc}`,
    },
  };
}

// Keyed by land id (see src/data/day-may-22-2026.ts).
export const AREA_IMAGES: Record<string, AreaImage> = {
  'cars-land': commons('Cars Land at night.jpg'),
  'avengers-campus': commons('Avengers Campus entrance.jpg'),
  'hollywood-land': commons('Hollywood Land, Disney California Adventure.jpg'),
  'pixar-pier': commons('Pixar Pier.jpg'),
  'main-street': commons('Sleeping Beauty Castle DLR.jpg'),
  toontown: commons("Mickey's Toontown.jpg"),
  fantasyland: commons('Sleeping Beauty Castle, Disneyland.jpg'),
  tomorrowland: commons('Tomorrowland Disneyland.jpg'),
  'galaxys-edge': commons("Star Wars Galaxy's Edge Millennium Falcon.jpg"),
  'critter-country': commons('Critter Country Disneyland.jpg'),
  'new-orleans-square': commons('New Orleans Square Disneyland.jpg'),
  'parade-finale': commons('Paint the Night parade.jpg'),
};
