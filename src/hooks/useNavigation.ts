import { useMemo } from 'react';
import type { Activity, Day, Land } from '../types';

export interface FlatStop {
  land: Land;
  activity: Activity;
  /** index in the flattened, day-long sequence */
  index: number;
}

export interface NavResult {
  /** every activity across the day, in chronological traversal order */
  stops: FlatStop[];
  current: FlatStop | null;
  prev: FlatStop | null;
  next: FlatStop | null;
}

/**
 * Flattens the day into a single ordered list of stops: iterate lands in
 * firstVisitTime order (already sorted in the data), then each land's
 * activities in array order. This matches PRD §6.2: "next" advances to the
 * next activity, or the next land's first activity at a land boundary.
 */
export function flattenDay(day: Day): FlatStop[] {
  const stops: FlatStop[] = [];
  let index = 0;
  for (const land of day.lands) {
    for (const activity of land.activities) {
      stops.push({ land, activity, index });
      index += 1;
    }
  }
  return stops;
}

export function useNavigation(
  day: Day,
  landId?: string,
  activityId?: string,
): NavResult {
  return useMemo(() => {
    const stops = flattenDay(day);
    let currentIdx = -1;

    if (landId && activityId) {
      currentIdx = stops.findIndex(
        (s) => s.land.id === landId && s.activity.id === activityId,
      );
    } else if (landId) {
      // At a land screen: treat the land's first activity as the anchor.
      currentIdx = stops.findIndex((s) => s.land.id === landId);
    }

    const current = currentIdx >= 0 ? stops[currentIdx] : null;
    const prev = currentIdx > 0 ? stops[currentIdx - 1] : null;
    const next =
      currentIdx >= 0 && currentIdx < stops.length - 1
        ? stops[currentIdx + 1]
        : null;

    return { stops, current, prev, next };
  }, [day, landId, activityId]);
}

/** Path helpers so links stay consistent across components. */
export const paths = {
  day: () => '/',
  land: (landId: string) => `/land/${landId}`,
  activity: (landId: string, activityId: string) =>
    `/land/${landId}/activity/${activityId}`,
};
