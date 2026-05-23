import { useEffect, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import day from '../../data/day-may-22-2026';
import { getTheme } from '../../themes';
import { useAmbientSound } from '../../hooks/useAmbientSound';
import { usePhotos } from '../../hooks/usePhotos';
import { paths, useNavigation } from '../../hooks/useNavigation';
import { ActivityHero } from './ActivityHero';
import { PhotoGallery } from './PhotoGallery';
import { ShareButton } from '../ui/ShareButton';
import { Disclosure } from '../ui/Disclosure';

export function ActivityDetail() {
  const { landId, activityId } = useParams();
  const land = day.lands.find((l) => l.id === landId);
  const activity = land?.activities.find((a) => a.id === activityId);

  // Hooks must run unconditionally — fall back to a stable id when missing.
  const manager = usePhotos(activity?.id ?? '__none__', activity?.photos ?? []);
  const { prev, next } = useNavigation(day, landId, activityId);
  useAmbientSound(land?.theme ?? null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activityId]);

  const bundledIds = useMemo(
    () => new Set((activity?.photos ?? []).map((p) => p.id)),
    [activity],
  );

  if (!land || !activity) return <Navigate to={paths.day()} replace />;

  const theme = getTheme(land.theme);
  const narrativeParas = (activity.narrative ?? '')
    .split(/\n\n+/)
    .filter(Boolean);

  return (
    <article>
      <ActivityHero
        activity={activity}
        themeKey={land.theme}
        hero={manager.hero}
      />

      <div className="mx-auto max-w-content px-5 py-8">
        {/* The short, friendly version — readable at a glance. */}
        <p className="font-hint-serif text-2xl leading-relaxed text-slate-800 sm:text-3xl">
          {activity.summary}
        </p>
        <div className="mt-3">
          <ShareButton title={`${activity.name} · ${day.title}`} />
        </div>

        {/* Photos first — the part everyone wants to touch. */}
        <PhotoGallery
          photos={manager.photos}
          manager={manager}
          bundledIds={bundledIds}
          themePrimary={theme.primary}
        />

        {/* The wall of text lives here, opt-in. */}
        {(narrativeParas.length > 0 ||
          (activity.details && activity.details.length > 0)) && (
          <div className="mt-8">
            <Disclosure
              label="Read the full story"
              openLabel="Hide the full story"
              icon="📖"
              accent={theme.primary}
            >
              <div className="space-y-4">
                {narrativeParas.map((p, i) => (
                  <p key={i} className="leading-relaxed text-slate-700">
                    {p}
                  </p>
                ))}
              </div>

              {activity.details && activity.details.length > 0 && (
                <div className="mt-6">
                  <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                    Quick facts
                  </h2>
                  <ul className="space-y-2">
                    {activity.details.map((d, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: theme.primary }}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Disclosure>
          </div>
        )}

        {/* chronological prev / next */}
        <nav className="mt-10 grid grid-cols-2 gap-3 border-t border-slate-200 pt-6">
          {prev ? (
            <Link
              to={paths.activity(prev.land.id, prev.activity.id)}
              className="group flex flex-col rounded-xl bg-white p-3 ring-1 ring-slate-200 hover:shadow-sm"
            >
              <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </span>
              <span className="mt-0.5 truncate font-semibold text-slate-800">
                {prev.activity.name}
              </span>
              <span className="truncate text-xs text-slate-400">
                {prev.land.name}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              to={paths.activity(next.land.id, next.activity.id)}
              className="group flex flex-col rounded-xl bg-white p-3 text-right ring-1 ring-slate-200 hover:shadow-sm"
            >
              <span className="flex items-center justify-end gap-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Next <ChevronRight className="h-3.5 w-3.5" />
              </span>
              <span className="mt-0.5 truncate font-semibold text-slate-800">
                {next.activity.name}
              </span>
              <span className="truncate text-xs text-slate-400">
                {next.land.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}

export default ActivityDetail;
