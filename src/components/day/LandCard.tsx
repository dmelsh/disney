import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Land } from '../../types';
import { getTheme } from '../../themes';
import { paths } from '../../hooks/useNavigation';

export function LandCard({ land }: { land: Land }) {
  const theme = getTheme(land.theme);
  return (
    <Link
      to={paths.land(land.id)}
      className="group relative block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* theme accent stripe */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1.5"
        style={{ background: theme.primary }}
      />
      <div className="flex items-start gap-4 py-4 pl-6 pr-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
          style={{ background: `${theme.primary}1a` }}
          aria-hidden
        >
          {theme.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-lg font-bold text-slate-900">{land.name}</h3>
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-semibold text-white"
              style={{ background: theme.primary }}
              title={land.park === 'DCA' ? 'California Adventure' : 'Disneyland Park'}
            >
              {land.park}
            </span>
            <span className="text-sm text-slate-400">{land.firstVisitTime}</span>
          </div>

          <p className="mt-1 line-clamp-2 text-sm text-slate-600">{land.blurb}</p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              {land.activities.length}{' '}
              {land.activities.length === 1 ? 'activity' : 'activities'}
            </span>
            <span
              className="inline-flex items-center gap-1 text-sm font-semibold transition group-hover:gap-2"
              style={{ color: theme.primary }}
            >
              view <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
