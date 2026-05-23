export type ThemeKey =
  | 'cars'
  | 'hollywood'
  | 'avengers'
  | 'pixar'
  | 'mainstreet'
  | 'toontown'
  | 'fantasyland'
  | 'tomorrowland'
  | 'galaxysedge'
  | 'critter'
  | 'neworleans'
  | 'parade';

export type ActivityType =
  | 'ride'
  | 'meet'
  | 'food'
  | 'parade'
  | 'show'
  | 'photo-op'
  | 'rest'
  | 'transition';

export type Priority = 'green' | 'yellow' | 'none';

export interface ActivityPhoto {
  id: string; // uuid
  src: string; // base64 data URI or '/photos/...' bundled path
  caption?: string;
  isHero?: boolean; // displays prominently at top of activity view
}

export interface Activity {
  id: string; // stable kebab-case, e.g. 'cars-land-rsr'
  name: string;
  time?: string; // '9:05 AM' — display string, not parsed
  type: ActivityType;
  summary: string; // 1-2 sentence headline
  narrative?: string; // longer paragraph (lifted from Word doc)
  details?: string[]; // bullets of factual info
  priority?: Priority; // green = top-tier, yellow = nice-to-have
  photos: ActivityPhoto[];
}

export interface Land {
  id: string; // 'cars-land', 'galaxys-edge', etc.
  name: string;
  park: 'DCA' | 'DLP';
  theme: ThemeKey;
  blurb: string; // 1 paragraph describing the land + their experience there
  firstVisitTime: string; // '8:30 AM' — used for chronological ordering
  activities: Activity[];
}

export interface Day {
  id: string; // 'may-22-2026'
  date: string; // 'Friday, May 22, 2026'
  title: string;
  intro: string; // opening paragraph (foreword from doc)
  closing: string; // closing paragraph
  lands: Land[]; // chronological by firstVisitTime
}
