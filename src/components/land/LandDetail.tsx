import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import day from '../../data/day-may-22-2026';
import type { Activity } from '../../types';
import { getTheme } from '../../themes';
import { useAmbientSound } from '../../hooks/useAmbientSound';
import { usePhotos } from '../../hooks/usePhotos';
import { paths } from '../../hooks/useNavigation';
import { LandHero } from './LandHero';
import {
  ActivityTypeIcon,
  PriorityBadge,
  activityTypeLabel,
} from '../ui/Badge';
import { ShareButton } from '../ui/ShareButton';

function ActivityCard({
  landId,
  activity,
  themePrimary,
}: {
  landId: string;
  activity: Activity;
  themePrimary: string;
}) {
  // Read merged photos so a user-uploaded hero shows as the card thumbnail.
  const { hero } = usePhotos(activity.id, activity.photos);

  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Link
        to={paths.activity(landId, activity.id)}
        className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
      >
        <div
          className="relative flex aspect-[16/10] items-center justify-center"
          style={{ background: `${themePrimary}14` }}
        >
          {hero ? (
            <img
              src={hero.src}
              alt={hero.caption ?? activity.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <ActivityTypeIcon
              type={activity.type}
              className="h-10 w-10 opacity-40"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <ActivityTypeIcon type={activity.type} className="h-3.5 w-3.5" />
            <span>{activityTypeLabel(activity.type)}</span>
            {activity.time && (
              <>
                <span aria-hidden>·</span>
                <span>{activity.time}</span>
              </>
            )}
          </div>
          <h3 className="mt-1 font-bold leading-snug text-slate-900">
            {activity.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
            {activity.summary}
          </p>
          <div className="mt-2">
            <PriorityBadge priority={activity.priority} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function LandDetail() {
  const { landId } = useParams();
  const land = day.lands.find((l) => l.id === landId);
  const landIndex = day.lands.findIndex((l) => l.id === landId);

  useAmbientSound(land?.theme ?? null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [landId]);

  if (!land) return <Navigate to={paths.day()} replace />;

  const theme = getTheme(land.theme);
  const nextLand =
    landIndex >= 0 && landIndex < day.lands.length - 1
      ? day.lands[landIndex + 1]
      : null;

  return (
    <article>
      <LandHero land={land} />

      <div className="mx-auto max-w-content px-5 py-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
            What we did here
          </h2>
          <ShareButton title={`${land.name} · ${day.title}`} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {land.activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              landId={land.id}
              activity={activity}
              themePrimary={theme.primary}
            />
          ))}
        </div>

        {nextLand && (
          <Link
            to={paths.land(nextLand.id)}
            className="mt-8 flex items-center justify-between rounded-2xl px-6 py-5 text-white shadow-sm transition hover:brightness-110"
            style={{ background: getTheme(nextLand.theme).primary }}
          >
            <span>
              <span className="block text-xs font-medium uppercase tracking-widest text-white/75">
                Continue to
              </span>
              <span className="text-xl font-bold">
                {getTheme(nextLand.theme).emoji} {nextLand.name}
              </span>
            </span>
            <ArrowRight className="h-6 w-6" />
          </Link>
        )}
      </div>
    </article>
  );
}

export default LandDetail;
