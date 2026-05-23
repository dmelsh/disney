import { AnimatePresence, motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import day from '../../data/day-may-22-2026';
import { getTheme } from '../../themes';
import { paths } from '../../hooks/useNavigation';
import { ActivityTypeIcon } from '../ui/Badge';

/**
 * Slide-in drawer with the full day outline. Used as the hamburger menu on
 * mobile and the persistent left tree on desktop (rendered inline there).
 */
export function Sidebar({
  open,
  onClose,
  variant = 'drawer',
}: {
  open?: boolean;
  onClose?: () => void;
  variant?: 'drawer' | 'inline';
}) {
  const { landId, activityId } = useParams();

  const tree = (
    <nav aria-label="Full day outline" className="px-3 py-4">
      <Link
        to={paths.day()}
        onClick={onClose}
        className={`block rounded-lg px-3 py-2 text-sm font-bold ${
          !landId
            ? 'bg-slate-900 text-white'
            : 'text-slate-800 hover:bg-slate-100'
        }`}
      >
        The Day · Overview
      </Link>

      <ol className="mt-2 space-y-1">
        {day.lands.map((land) => {
          const theme = getTheme(land.theme);
          const landActive = land.id === landId;
          return (
            <li key={land.id}>
              <Link
                to={paths.land(land.id)}
                onClick={onClose}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  landActive && !activityId
                    ? 'bg-slate-100 font-semibold text-slate-900'
                    : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span
                  aria-hidden
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ background: theme.primary }}
                />
                <span aria-hidden>{theme.emoji}</span>
                <span className="truncate">{land.name}</span>
                <span className="ml-auto text-xs text-slate-400">
                  {land.firstVisitTime}
                </span>
              </Link>

              {landActive && (
                <ul className="ml-4 mt-1 space-y-0.5 border-l border-slate-200 pl-3">
                  {land.activities.map((a) => (
                    <li key={a.id}>
                      <Link
                        to={paths.activity(land.id, a.id)}
                        onClick={onClose}
                        className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] ${
                          a.id === activityId
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <ActivityTypeIcon
                          type={a.type}
                          className="h-3.5 w-3.5 shrink-0"
                        />
                        <span className="truncate">{a.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );

  if (variant === 'inline') {
    return (
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-white lg:block">
        {tree}
      </aside>
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden no-print"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            className="fixed bottom-0 left-0 top-0 z-50 w-[84%] max-w-sm overflow-y-auto bg-white shadow-2xl lg:hidden no-print"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <span className="font-semibold text-slate-900">Jump to…</span>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {tree}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
