import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Activity, ActivityPhoto, ThemeKey } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { ActivityTypeIcon, PriorityBadge, activityTypeLabel } from '../ui/Badge';

export function ActivityHero({
  activity,
  themeKey,
  hero,
}: {
  activity: Activity;
  themeKey: ThemeKey;
  hero: ActivityPhoto | null;
}) {
  const { theme, style, fontHintClass } = useTheme(themeKey);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // soft parallax on the hero image
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <header
      ref={ref}
      style={{ ...style, background: theme.gradient }}
      className="print-hero relative overflow-hidden text-[color:var(--theme-on-primary)]"
    >
      {/* theme strip across the very top edge */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-1.5"
        style={{ background: theme.secondary }}
      />

      {hero ? (
        <div className="relative h-[42vh] min-h-[260px] w-full overflow-hidden">
          <motion.img
            src={hero.src}
            alt={hero.caption ?? activity.name}
            style={{ y }}
            className="absolute inset-0 h-[120%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      ) : (
        <div className="flex h-[34vh] min-h-[200px] w-full items-center justify-center">
          <ActivityTypeIcon
            type={activity.type}
            className="h-16 w-16 opacity-30"
          />
        </div>
      )}

      <div
        className={`px-5 ${hero ? 'absolute inset-x-0 bottom-0' : 'relative pb-8'}`}
      >
        <div className="mx-auto max-w-content pb-6">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium text-[color:var(--theme-on-primary)]/85">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 ring-1 ring-white/25">
              <ActivityTypeIcon type={activity.type} className="h-3.5 w-3.5" />
              {activityTypeLabel(activity.type)}
            </span>
            {activity.time && <span>{activity.time}</span>}
            <PriorityBadge priority={activity.priority} />
          </div>
          <h1
            className={`text-3xl leading-tight sm:text-5xl ${fontHintClass}`}
          >
            {activity.name}
          </h1>
        </div>
      </div>
    </header>
  );
}
