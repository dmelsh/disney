import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Menu, Volume2, VolumeX } from 'lucide-react';
import day from '../../data/day-may-22-2026';
import { paths } from '../../hooks/useNavigation';
import { useAmbientEnabled } from '../../hooks/useAmbientSound';

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const navigate = useNavigate();
  const { landId, activityId } = useParams();
  const [ambient, setAmbient] = useAmbientEnabled();

  const land = landId ? day.lands.find((l) => l.id === landId) : undefined;
  const activity = activityId
    ? land?.activities.find((a) => a.id === activityId)
    : undefined;

  const upTo = activity && land ? paths.land(land.id) : land ? paths.day() : null;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur no-print pad-safe-top">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {upTo && (
          <button
            onClick={() => navigate(upTo)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Back up one level"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}

        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 flex-1 items-center gap-1 text-sm"
        >
          <Link
            to={paths.day()}
            className="shrink-0 font-semibold text-slate-700 hover:text-slate-900"
          >
            Day
          </Link>
          {land && (
            <>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
              <Link
                to={paths.land(land.id)}
                className={`truncate hover:text-slate-900 ${
                  activity ? 'text-slate-600' : 'font-semibold text-slate-900'
                }`}
              >
                {land.name}
              </Link>
            </>
          )}
          {activity && land && (
            <>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
              <span className="truncate font-semibold text-slate-900">
                {activity.name}
              </span>
            </>
          )}
        </nav>

        <button
          onClick={() => setAmbient(!ambient)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          aria-pressed={ambient}
          aria-label={
            ambient ? 'Turn off ambient sound' : 'Turn on ambient sound'
          }
          title={ambient ? 'Ambient sound on' : 'Ambient sound off'}
        >
          {ambient ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5 text-slate-400" />
          )}
        </button>
      </div>
    </header>
  );
}
