import type { ReactNode } from 'react';
import type { ActivityType, Priority } from '../../types';
import {
  Armchair,
  Camera,
  Drama,
  FerrisWheel,
  Footprints,
  Sparkles,
  Users,
  Utensils,
  type LucideIcon,
} from 'lucide-react';

export function Badge({
  children,
  className = '',
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

export function ParkBadge({ park }: { park: 'DCA' | 'DLP' }) {
  const label =
    park === 'DCA' ? 'Disney California Adventure' : 'Disneyland Park';
  return (
    <Badge
      title={label}
      className="bg-white/20 text-[color:var(--theme-on-primary)] ring-1 ring-white/30 backdrop-blur"
    >
      {park}
    </Badge>
  );
}

const PRIORITY_STYLES: Record<
  Exclude<Priority, 'none'>,
  { label: string; className: string }
> = {
  green: {
    label: 'Top priority',
    className: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300',
  },
  yellow: {
    label: 'Nice-to-have',
    className: 'bg-amber-100 text-amber-800 ring-1 ring-amber-300',
  },
};

export function PriorityBadge({ priority }: { priority?: Priority }) {
  if (!priority || priority === 'none') return null;
  const p = PRIORITY_STYLES[priority];
  return (
    <Badge className={p.className} title={p.label}>
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${
          priority === 'green' ? 'bg-emerald-500' : 'bg-amber-500'
        }`}
      />
      {p.label}
    </Badge>
  );
}

export const ACTIVITY_ICON: Record<ActivityType, LucideIcon> = {
  ride: FerrisWheel,
  meet: Users,
  food: Utensils,
  parade: Sparkles,
  show: Drama,
  'photo-op': Camera,
  rest: Armchair,
  transition: Footprints,
};

const ACTIVITY_LABEL: Record<ActivityType, string> = {
  ride: 'Ride',
  meet: 'Character meet',
  food: 'Food',
  parade: 'Parade',
  show: 'Show',
  'photo-op': 'Photo op',
  rest: 'Rest',
  transition: 'On the move',
};

export function ActivityTypeIcon({
  type,
  className = 'h-4 w-4',
}: {
  type: ActivityType;
  className?: string;
}) {
  const Icon = ACTIVITY_ICON[type];
  return <Icon className={className} aria-label={ACTIVITY_LABEL[type]} />;
}

export function activityTypeLabel(type: ActivityType): string {
  return ACTIVITY_LABEL[type];
}
