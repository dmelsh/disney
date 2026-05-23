import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import day from '../../data/day-may-22-2026';
import { flattenDay, paths, type FlatStop } from '../../hooks/useNavigation';
import { getTheme } from '../../themes';

const pulse = {
  scale: [1, 1.08, 1],
  transition: { duration: 0.6, repeat: Infinity, repeatDelay: 9.4 },
};

export function NavArrows() {
  const navigate = useNavigate();
  const { landId, activityId } = useParams();
  const stops = flattenDay(day);

  let currentIndex: number;
  if (activityId && landId) {
    currentIndex = stops.findIndex(
      (s) => s.land.id === landId && s.activity.id === activityId,
    );
  } else if (landId) {
    // On a land screen, "next" drills into the land's first activity.
    currentIndex = stops.findIndex((s) => s.land.id === landId) - 1;
  } else {
    currentIndex = -1; // day overview: before the first stop
  }

  const prev: FlatStop | null =
    currentIndex >= 0 ? stops[currentIndex] : null;
  const next: FlatStop | null =
    currentIndex + 1 < stops.length ? stops[currentIndex + 1] : null;

  const go = (stop: FlatStop | null) => {
    if (!stop) return;
    navigate(paths.activity(stop.land.id, stop.activity.id));
  };

  return (
    <div className="no-print">
      {prev && (
        <motion.button
          onClick={() => go(prev)}
          animate={pulse}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-5 left-4 z-20 flex items-center gap-2 rounded-full py-2.5 pl-2.5 pr-4 text-white shadow-lg ring-1 ring-black/10 pad-safe-bottom"
          style={{ background: getTheme(prev.land.theme).primary }}
          aria-label={`Previous: ${prev.activity.name}`}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="hidden max-w-[34vw] truncate text-sm font-semibold sm:inline">
            {prev.activity.name}
          </span>
        </motion.button>
      )}

      {next && (
        <motion.button
          onClick={() => go(next)}
          animate={pulse}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-5 right-4 z-20 flex items-center gap-2 rounded-full py-2.5 pl-4 pr-2.5 text-white shadow-lg ring-1 ring-black/10 pad-safe-bottom"
          style={{ background: getTheme(next.land.theme).primary }}
          aria-label={`Next: ${next.activity.name}`}
        >
          <span className="hidden max-w-[34vw] truncate text-sm font-semibold sm:inline">
            {next.activity.name}
          </span>
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
}
